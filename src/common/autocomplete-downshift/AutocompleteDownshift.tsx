import React, { useState } from 'react';
import Downshift from 'downshift';
import { Input } from '@distate/components';
import './style.css';

type Props = {
  /** функция загрузки списка элементов
   * срабатывает при изменении в инпута */
  loadOptions: Function;
  /** обработчик выбора нового значения */
  onChange: Function;
  /** маппинг полученных данных */
  mapData: Function;
  /** значение инпута */
  initialInputValue?: string;
  errors?: string[];
  error?: boolean;
  /** вывод стрелки и бордера */
  hasArrow?: boolean;
  placeholder?: string;
};

export const AutocompleteDownshift = (props: Props) => {
  const {
    loadOptions,
    onChange,
    mapData,
    initialInputValue = '',
    errors,
    error,
    hasArrow,
    placeholder
  } = props;

  const [items, setItems] = useState([]);

  const onInputValueChange = async (value: string) => {
    const response = await loadOptions(value);
    const mappedData = await mapData(response);
    setItems(mappedData);
  };

  return (
    <div
      className={`downshift-custom ${error ? 'error' : ''} ${hasArrow ? 'downshift-arrow' : ''}`}
    >
      <Downshift
        onChange={el => onChange(el)}
        initialInputValue={initialInputValue}
        onInputValueChange={onInputValueChange}
        itemToString={item => (item ? item.label : '')}
      >
        {({ getInputProps, getMenuProps, getLabelProps, isOpen, getItemProps }) => {
          return (
            <div>
              <div className="downshift-input">
                <Input {...getInputProps()} placeholder={placeholder} autocomplete={false} />
                {hasArrow && (
                  <div className="downshift-icon">
                    <svg
                      height="20"
                      width="20"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                      className="css-6q0nyr-Svg"
                    >
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                  </div>
                )}
              </div>
              {errors?.length ? (
                <label className="ds-field-name bottom color-danger" {...getLabelProps()}>
                  {errors[0]}
                </label>
              ) : null}
              <ul className="ac_results ac_results__custom" {...getMenuProps()}>
                {isOpen
                  ? items.map((item: any) => (
                      <li
                        {...getItemProps({
                          key: item.value,
                          item
                        })}
                      >
                        {item.label}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
};
