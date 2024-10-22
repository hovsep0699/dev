import React from 'react';
import AutocompleteGateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';

import { Autocomplete } from '../../Autocomplete';
import { Context } from '../context';

const AutocompleteService = new AutocompleteGateway();

const loadOptions = (inputValue: string, callback: any) => {
  AutocompleteService.getContractor({ recipient: inputValue })
    .then(({ rows = [] }: any) => {
      callback(
        rows.map((row: any) => {
          const { id, type, company, person } = row;

          let label = company;
          if (person) {
            label = Object.values(person).join(' ');
          }

          return { label, value: { id, type } };
        })
      );
    })
    .catch(() => {
      callback([]);
    });
};

const AutocompleteContractorWidget: React.FC<any> = ({
  required,
  name,
  label,
  options,
  formValue
}) => {
  const { enumOptions = [], placeholder = '' } = options;
  const { onChange } = React.useContext(Context);

  const handleOnChange = (options: any) => {
    // let val;
    // if (Array.isArray(options)) {
    //   val = options.map(option => option.value);
    // } else if (isObject(options) && options.hasOwnProperty('value')) {
    //   val = options.value;
    // } else {
    //   val = options;
    // }

    onChange({ [name]: options });
  };

  return (
    <Autocomplete
      label={label}
      value={formValue}
      placeholder={placeholder}
      defaultOptions={enumOptions}
      required={required}
      loadOptions={loadOptions}
      onChange={handleOnChange}
    />
  );
};

export { AutocompleteContractorWidget };
