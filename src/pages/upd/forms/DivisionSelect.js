import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './ArrayGroup.module.css';
import { Option, Select } from 'informed';

const DivisionSelect = ({ DomainVO, options, selected, returnState, isVisible }) => {
  const [errors, setErrors] = useState([]);

  const validate = value => {
    const [option] = options.filter(option => option.title === value);
    if (option) {
      returnState(option);
      setErrors([]);
    } else {
      setErrors(['Неверное подразделение продавца']);
    }
  };

  return (
    <li style={{ display: isVisible ? 'block' : 'none' }}>
      <div className={classNames('group', styles.alignTop)}>
        <div className={classNames('ds-field-name', 'leftside', 'required')}>
          <span>{DomainVO.name}</span>
        </div>
      </div>

      <div className="group" style={{ width: '466px', marginLeft: 0 }}>
        <Select
          field={DomainVO.field}
          initialValue={selected?.title}
          style={{ width: '466px' }}
          className={classNames('ds-select')}
          validate={validate}
          validateOnChange
          validateOnBlur
        >
          {options.length > 0 &&
            options.map(option => (
              <Option value={option.title} key={option.id}>
                {option.title}
              </Option>
            ))}
        </Select>
        <span className="ds-field-name bottom error">
          {errors.length > 0 && errors[errors.length - 1]}
        </span>
      </div>
    </li>
  );
};

export default DivisionSelect;
