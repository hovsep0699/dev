import React, { useState } from 'react';
import { Autocomplete } from '@distate/components/dist/Autocomplete';
import FieldWrap from '../../../common/form/components/FieldWrap';
import AutocompleteGateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';
import { getExternalTypeToString } from '../../../helpers/heplers'

const ParticipantAC = props => {
  const { handleACSelectedItem, handleCompanyInfo } = props;
  const errorMsg = '';
  const showErrorMsg = !errorMsg;

  const autocompleteGateway = new AutocompleteGateway();

  /** для сохранения значения текущего типа пользователя ЮЛ\ФЛ */
  const [contractorRows, setContractorRows] = useState([]);
  /** контрагент, для отображения в селекте */
  const [contractorValue, setContractorValue] = useState();
   
  /** преобразование ответа сервера в массив для опций селекта контрагента */
  const contractorDataToOptions = (data) => {
    setContractorRows(data);

    return data.map(item => {
      const {companyExternalType, companyExternalOperator, companyNetwork, id, name, type} = item;
      /** получение типа контрагента */
      const contractorTypeStr = getExternalTypeToString(companyExternalType, companyExternalOperator, companyNetwork);
      /** если это компания */
      if (type === 'division') {
        return { value: id, label: name + contractorTypeStr };
      }
      /** если это ФЛ */
      return {
        value: id,
        label: `${name}`
      };
    });
  };

  /** загрузка подходящих контрагентов в автокомплите */
  const contractorLoad = async (str, callback) => {
    const res = await autocompleteGateway.getParticipant({ recipient: str });
    handleCompanyInfo(res)
    const { rows = [] } = res;
    callback(contractorDataToOptions(rows));
  };

  const onContractorChange = (e) => {
    setContractorValue(e);
    /** получение информации о выбранном контрагенте */
    const currentPersonInfo = contractorRows.find(item => item.id === e?.value);
    handleACSelectedItem(currentPersonInfo)
    handleCompanyInfo(currentPersonInfo)
  };

  return (
    <FieldWrap errorMsg={errorMsg}>
      <Autocomplete
        value={contractorValue}
        loadOptions={contractorLoad}
        onChange={(e) => onContractorChange(e)}
        placeholder="Введите сведения об участнике"
        width={320}
      />
      {showErrorMsg && <span className="ds-field-name bottom error">{errorMsg}</span>}
    </FieldWrap>
  );
};

export default ParticipantAC;
