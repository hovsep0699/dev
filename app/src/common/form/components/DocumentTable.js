import React from 'react';
import { ArrayField } from 'informed';
import { LEFT, RIGHT } from '../../Placement';
import Behavior from '../parameters/Behavior';
import Appearance from '../parameters/Appearance';
import classNames from 'classnames';
import { capitalize } from '../../../utils/StringUtil';
import get from 'get-value';
import TotalCostBeforeTax from '@distate/core/dist/domain/documents/upd/vo/total/TotalCostBeforeTax';
import TotalCostAfterTax from '@distate/core/dist/domain/documents/upd/vo/total/TotalCostAfterTax';
import TotalAmountOfTax from '@distate/core/dist/domain/documents/upd/vo/total/TotalAmountOfTax';
import { format as formatMoney } from '../../../utils/MoneyUtil';
import { del } from 'object-path-immutable';

class DocumentTable {
  static createTDClasses(formApi = null, field = '', customClasses = ['input']) {
    if (!formApi) return classNames(customClasses);
    const { getError, getTouched, getValue } = formApi;
    const res = {};
    if (field) {
      res.error = getError(field);
      res.success = !getError(field) && getTouched(field) && getValue(field);
    }
    return classNames(res, customClasses);
  }

  constructor(GroupDomainVO, styles, behavior, behaviours, appearances, errors) {
    this._groupDomainVO = GroupDomainVO;
    this._styles = styles;
    this._behavior = behavior;
    this._behaviours = behaviours;
    this._appearances = appearances;
    this._errors = errors;
  }

  createTableHead() {
    return (
      <React.Fragment>
        <colgroup>
          <col></col>
          {this._groupDomainVO.VOs.map(vo => {
            if (this._widths[vo.field]) {
              return <col width={this._widths[vo.field]} key={`${vo.field}`}></col>;
            } else {
              return <col key={`${vo.field}`}></col>;
            }
          })}
        </colgroup>
        <thead>
          <tr>
            <th>№</th>
            {this._groupDomainVO.VOs.map(vo => {
              const noCaption = get(this._appearances[vo.field], 'noCaption');
              return <th key={`${vo.field}`}>{!noCaption && vo.name}</th>;
            })}
            <th colSpan="2"></th>
          </tr>
        </thead>
      </React.Fragment>
    );
  }

  createRow(createElementsMap, index, add, remove, key, fields, totals = {}) {
    const clone = () => {
      // TODO реализовать клонирование ячейки
      add();
    };
    const onTotalChange = DomainVO => () => {
      let aggregatedResult;
      if (fields.length) {
        const values = fields.map(({ field }) => {
          return this._formAPI.getValue(`${field}.${DomainVO.field}`);
        });
        aggregatedResult = formatMoney(totals[DomainVO.field].domain.calculate(...values));
        this._formAPI.setValue(totals[DomainVO.field].domain.field, aggregatedResult);
      }
    };
    return (
      <tr className="tr-good" key={key}>
        <td className={this._styles.center}>
          <span>{index + 1}</span>
        </td>
        {/* this._groupDomainVO.VOs - массив функций-конструкторов */}
        {this._groupDomainVO.VOs.map(DomainVO => {
          if (!createElementsMap[DomainVO.field]) {
            throw new Error(`Забыли задать конфигурацию для поля ${DomainVO.field} в таблице`);
          }
          const {
            scope,
            dataAttributeSelector,
            componentStateAdditionalDataConfig,
            modalBuilder,
            showErrorMsg,
            onChange = () => {},
            customFieldName
          } = this._behaviours[DomainVO.field] || {};
          const fieldScope = scope || DomainVO.field;
          const field = `${this._groupDomainVO.field}[${index}].${fieldScope}`;
          const inputBuilder = createElementsMap[DomainVO.field].build;
          const customClasses = ['input'];
          const error = get(this._errors, `[${index}].${DomainVO.field}.errors[0]`);
          if (error) customClasses.push('error');
          const tdClasses = DocumentTable.createTDClasses(this._formAPI, field, customClasses);
          const initialFieldDomainValue = this._component.props.id ? undefined : '';

          return (
            <td className={tdClasses} key={`${key}_${DomainVO.field}`}>
              {inputBuilder(
                this._groupDomainVO,
                DomainVO,
                index,
                new Behavior({
                  initialFieldDomain: { value: initialFieldDomainValue },
                  onChange: totals[DomainVO.field]
                    ? onTotalChange(DomainVO)
                    : event => onChange(index, event?.target?.value),
                  scope: fieldScope,
                  dataAttributeSelector,
                  componentStateAdditionalDataConfig,
                  modalBuilder,
                  showErrorMsg,
                  index,
                  customFieldName
                }),
                new Appearance({
                  customClasses: '',
                  align: LEFT,
                  width: 'auto'
                })
              )()}
            </td>
          );
        })}
        <td className="table-clone">
          <button
            type="button"
            className="ds-button icon-clone solid"
            onClick={() => clone()}
          ></button>
        </td>
        <td className="table-remove">
          <button
            type="button"
            className="ds-button icon-delete solid"
            onClick={() => remove()}
          ></button>
        </td>
      </tr>
    );
  }

  groupRows(createElementsMap, fields, add, totals) {
    const removeRow = index => () => {
      const isLastRowLeft = index === 0 && fields.length === 1;
      if (isLastRowLeft) {
        this._groupDomainVO.VOs.forEach(DomainVO => {
          const fieldBehaviour = this._behaviours[DomainVO.field];
          const scope =
            fieldBehaviour && fieldBehaviour.scope ? fieldBehaviour.scope : DomainVO.field;
          const fieldToClear = `${this._groupDomainVO.field}[0].${scope}`;
          const blankValue = DomainVO.options ? DomainVO.options[0].value : '';
          if (this._formAPI.getValue(fieldToClear)) {
            this._formAPI.setValue(`${TotalCostBeforeTax.field}`, '');
            this._formAPI.setValue(`${TotalCostAfterTax.field}`, '');
            this._formAPI.setValue(`${TotalAmountOfTax.field}`, '');
            this._formAPI.setValue(fieldToClear, blankValue);
          }
        });
      } else {
        fields[index].remove();
        const componentState = del(this._componentState, `${this._groupDomainVO.field}.${index}`);
        this._component.setState(componentState);
        const { onChange } = this._behavior;
        if (onChange) onChange(index, true);
      }
    };

    return fields.map((field, index) => {
      return this.createRow(
        createElementsMap,
        index,
        add,
        removeRow(index),
        field.key,
        fields,
        totals
      );
    });
  }

  createTableContent(createElementsMap, footerConfig) {
    let totals = {};
    Object.entries(createElementsMap).forEach(([key, value]) => {
      if (value.aggregatedBy) {
        totals[key] = value.aggregatedBy;
      }
    });
    return (
      <ArrayField field={this._groupDomainVO.field}>
        {({ add, fields }) => (
          <React.Fragment>
            <tbody>{this.groupRows(createElementsMap, fields, add, totals)}</tbody>
            {this.createTableFooter(footerConfig, fields, add, this._groupDomainVO.field, totals)}
          </React.Fragment>
        )}
      </ArrayField>
    );
  }

  createTableFooter(footerConfig, fields, add, key, total) {
    const createFooterColumns = () => {
      const result = [];
      let colspanAcc = 0;
      const createEmptyTd = (colspan, label, index) => (
        <td
          key={`empty_${key}_${index}`}
          colSpan={colspan}
          align={RIGHT}
          className={this._styles.paddingRight}
        >
          {label}
        </td>
      );

      const labels = [...footerConfig.labels];
      const initValues = footerConfig.initialFieldDomain?.value;

      this._groupDomainVO.VOs.forEach((vo, index) => {
        if (index < 1) return;
        if (total[vo.field]) {
          if (colspanAcc > 0) {
            result.push(createEmptyTd(colspanAcc, labels.shift(), index));
            colspanAcc = 0;
          }
          result.push(
            <td key={`total_${key}_${index}`}>
              {total[vo.field].build(
                total[vo.field].domain,
                new Behavior({
                  initialFieldDomain: {
                    value: get(initValues, `total${capitalize(vo.field)}`)
                  }
                })
              )}
            </td>
          );
        } else {
          colspanAcc++;
        }
      });
      if (colspanAcc > 0) {
        result.push(createEmptyTd(colspanAcc));
        colspanAcc = 0;
      }
      return result;
    };
    return (
      <tfoot key={key}>
        <tr>
          <td className="table-add" colSpan="2">
            <button type="button" className="ds-button icon-add" onClick={() => add()}>
              Добавить запись
            </button>
          </td>
          {createFooterColumns()}
          <td className="table-add" colSpan="2"></td>
        </tr>
      </tfoot>
    );
  }
  create(createElementsMap, footerConfig, tableAppearance, formState, formAPI, component) {
    this._formState = formState;
    this._formAPI = formAPI;
    this._component = component;
    this._componentState = component.state;
    this._widths = {};
    Object.keys(tableAppearance).forEach(
      field => (this._widths[field] = tableAppearance[field].width)
    );

    const showTableErrorMsg = this._formAPI.getError(this._groupDomainVO.field);
    return (
      <React.Fragment>
        <br />
        {showTableErrorMsg && (
          <label className="ds-field-name top color-danger width-auto">
            Проверьте правильность заполнения таблицы
          </label>
        )}
        <table className="table-editor">
          {this.createTableHead()}
          {this.createTableContent(createElementsMap, footerConfig)}
        </table>
      </React.Fragment>
    );
  }
}


export default DocumentTable;
