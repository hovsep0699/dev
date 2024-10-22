import React from 'react';
import Autocomplete from '../../../common/autocomplete/Autocomplete';
import FieldWrap from '../../../common/form/components/FieldWrap';
import TextInput from '../../../common/form/components/TextInput';
import AutocompleteService from '@distate/core/dist/application/autocomplete/AutocompleteService';
import Measurement from '@distate/core/dist/domain/documents/upd/vo/measurement/Measurement';
import classNames from 'classnames';

const MeasurementAutocomplete = ({
  initialValue,
  onValueChange,
  hasLabel,
  labelAlign,
  isRequired,
  wrapperClasses,
  errorMsg
}) => {
  const acService = AutocompleteService[Measurement.field];

  const handleItemSelect = ajaxResponseValues => selectedValue => {
    if (selectedValue !== '') {
      const selectedItem = ajaxResponseValues.rows.find(
        item => item[acService.field] === selectedValue
      );
      onValueChange(selectedItem);
    } else {
      onValueChange('');
    }
  };

  return (
    <FieldWrap
      label={Measurement.name}
      labelAlign={labelAlign}
      hasLabel={hasLabel}
      errorMsg={errorMsg}
      isRequired={isRequired}
      customClasses={wrapperClasses}
    >
      <Autocomplete
        doAjax={acService.request}
        formatAjaxRes={res => res.rows.map(row => row[acService.field])}
        handleItemSelect={handleItemSelect}
        width={240}
      >
        <TextInput
          DomainVO={Measurement}
          initialValue={initialValue}
          customClasses={classNames({
            error: errorMsg
          })}
        />
      </Autocomplete>
    </FieldWrap>
  );
};

export default MeasurementAutocomplete;
