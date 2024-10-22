import React from 'react';
import Behavior from '../parameters/Behavior';
import autobind from 'autobind-decorator';
import Appearance from '../parameters/Appearance';
import styles from '../../../common/styles/global.module.css';

class FormBuildStrategy {
  constructor(onChange) {
    this._onChange = onChange;
  }
  build() {}
  buildHelpersElements(
    { groupDomainVO, helpersBuilderMap, builder, behavior, behaviors, appearances, buildedFields },
    isVisible
  ) {
    const formScope = behavior.scope;
    const helperElements = Object.keys(helpersBuilderMap);
    return helperElements.map(field => {
      const behavior = new Behavior({
        ...behaviors[field].getObject(),
        scope: formScope
      });
      let customClasses = appearances[field].customClasses;
      if (!isVisible) {
        customClasses = `${customClasses} ${styles.invisible}`;
      }
      buildedFields.push(field);
      return helpersBuilderMap[field].call(
        builder,
        groupDomainVO,
        behavior,
        new Appearance({
          ...appearances[field],
          customClasses
        })
      );
    });
  }
  @autobind
  onChange(selectedOption) {
    this._selectedOption = selectedOption;
    this._onChange(selectedOption);
  }
  buildRadioGroup({ groupDomainVO, behavior }) {
    if (!this._selectedOption) {
      if (behavior?.initialFieldDomain?.value?.isSame) {
        this._selectedOption = groupDomainVO.options[1].value;
      } else if (behavior?.initialFieldDomain?.value?.consignor) {
        this._selectedOption = groupDomainVO.options[2].value;
      } else {
        this._selectedOption = groupDomainVO.options[0].value;
      }
      this._onChange(this._selectedOption);
    }

    const radioBtns = groupDomainVO.options.map(option => {
      return (
        <label className="group" style={{ paddingTop: 10, paddingBottom: 10 }}>
          <div className="ds-radio">
            <input
              type="radio"
              id={option.title}
              name={option.title}
              value={option.value}
              checked={this._selectedOption === option.value}
              onChange={e => this.onChange(e.target.value)}
            />
            <span></span>
          </div>
          {option.title}
        </label>
      );
    });
    return <li>{radioBtns}</li>;
  }
}

export default FormBuildStrategy;
