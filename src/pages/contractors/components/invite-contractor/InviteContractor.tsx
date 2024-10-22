import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SecurityService from '@distate/core/dist/application/security/SecurityService';
import Core from '@distate/core/dist/application/Core';

import { INDIVIDUAL } from '../../../../common/Lbl';

import { selectSearch } from '../../store/selectors';
import { Button, ButtonKinds } from '@distate/components';
import './style.css';
import { clearSearchContractors } from '../../store/actions';
import { ChooseTable } from './ChooseTable';
import { ContractorTypes, DestinationType } from '../../helpers/contractors.typings';
import { ChooseDestinationButtons } from './ChooseDestinationButtons';
import {
  IndividualForm,
  DestinationLocalForm,
  DestinationRoamingForm,
  DestinationLocalRoamingForm,
  Destination1CHubForm
} from './forms';

/* Страница поиска контрагентов */
export const InviteContractor: React.FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const searchContractors = useSelector(selectSearch);

  /** признак того, что пользователь - ФЛ */
  const isCompany = !!Core.company;

  const [contractorType, setContractorType] = React.useState<ContractorTypes>(
    ContractorTypes.legal_entity
  );
  const [destinationType, setDestinationType] = React.useState<DestinationType>(
    DestinationType.Local
  );

  React.useEffect(() => {
    dispatch(clearSearchContractors());
  }, [contractorType, destinationType, dispatch]);

  const visible = React.useMemo(() => {
    return SecurityService.hasDocumentRole();
  }, []);

  /* Возвращает форму в зависимости от выбранного типа контрагента и назначения */
  function getCurrentForm() {
    if (contractorType === ContractorTypes.natural_entity) {
      return <IndividualForm />;
    } else if (!isCompany) {
      /** если пользователь - ФЛ */
      return <DestinationLocalForm />;
    } else {
      switch (destinationType) {
        case DestinationType.Local:
          return <DestinationLocalForm />;
        case DestinationType.Roaming:
          return <DestinationRoamingForm />;
        case DestinationType.LoaclRoaming:
          return <DestinationLocalRoamingForm />;
        case DestinationType.Hub1c:
          return <Destination1CHubForm />;
        default:
          return null;
      }
    }
  }

  const renderBody = () => {
    if (!visible) {
      return <p>Недостаточно прав для отображения документов.</p>;
    }

    return (
      <div className="find-contractors">
        <div className="find-contractors-buttons">
          <div className="find-contractors-buttons-first-line">
            <Button
              onClick={() => setContractorType(ContractorTypes.legal_entity)}
              kind={
                contractorType === ContractorTypes.legal_entity
                  ? ButtonKinds.Primary
                  : ButtonKinds.Secondary
              }
            >
              Юридическое лицо / ИП
            </Button>
            <Button
              onClick={() => setContractorType(ContractorTypes.natural_entity)}
              kind={
                contractorType === ContractorTypes.natural_entity
                  ? ButtonKinds.Primary
                  : ButtonKinds.Secondary
              }
            >
              {INDIVIDUAL}
            </Button>
          </div>
          {/** если выбран пункт ЮЛ и пользователь не ФЛ */
          contractorType === ContractorTypes.legal_entity && isCompany && (
            <ChooseDestinationButtons
              destinationType={destinationType}
              setDestinationType={setDestinationType}
            />
          )}
          {getCurrentForm()}

          {/** Если есть результат поиска */}
          {Object.keys(searchContractors).length !== 0 ? (
            <ChooseTable contractorType={contractorType} destinationType={destinationType} />
          ) : null}
        </div>
      </div>
    );
  };

  return <>{renderBody()}</>;
};
