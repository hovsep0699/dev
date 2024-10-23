import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Icons } from '@distate/components';

import './style.css';
import { Pagination } from '../../../../common/pagination';
import { getContractorGroups, deleteContractorGroup, getCompanyInfo } from '../../store/actions';
import { currentContractor as currentContractorSelector } from '../../store/selectors';
import { SubModalGroups } from './SubModalGroups';
import { addressToString } from '../../helpers/contractors.helpers';
import { DestinationType } from '../../helpers/contractors.typings';

type Props = {
  isVisible: boolean;
  hide: () => void;
  userId: number;
  contractorId: number;
};

/** Карточка контрагента ЮЛ */
export const LegalEntityCard = (props: Props) => {
  const { isVisible, hide, userId, contractorId } = props;
  const dispatch = useDispatch();

  const currentContractor = useSelector(currentContractorSelector);
  const rows = currentContractor?.groups?.rows || [];

  const {
    name,
    fnsUid,
    inn,
    kpp,
    ogrn,
    taxAuthorityCode,
    taxAuthorityTitle,
    addressIsStrict,
    addressLooselyTypedAddress,
    addressCountryTitle,
    addressRegionTitle,
    addressPostalCode,
    addressDistrict,
    addressCity,
    addressSettlement,
    addressStreet,
    addressHouse,
    addressBuilding,
    addressRoom,
    bankBik,
    bankTitle,
    accountNumber,
    externalType,
    externalOperator,
    network
  } = currentContractor.company || {};

  const [offset, setOffset] = React.useState();
  const [isOpenSubmodal, setIsOpenSubmodal] = React.useState(false);

  const address: string | undefined = addressIsStrict
    ? addressToString([
        addressCountryTitle,
        addressPostalCode,
        addressRegionTitle,
        addressDistrict,
        addressCity,
        addressSettlement,
        addressStreet,
        addressHouse,
        addressBuilding,
        addressRoom
      ])
    : addressLooselyTypedAddress;

  React.useEffect(() => {
    /** получение списка групп контрагента */
    contractorId && dispatch(getContractorGroups({ id: contractorId, offset, limit: 10 }));
    /** получение информации о контрагенте */
    userId && dispatch(getCompanyInfo(userId));
  }, [dispatch, userId, offset, contractorId]);

  const onDeleteGroup = async (groupId: number) => {
    await dispatch(deleteContractorGroup({ groupId, contractorId }));
    await dispatch(getContractorGroups({ id: contractorId, offset, limit: 10 }));
  };

  const onAddGroup = () => {
    setIsOpenSubmodal(true);
  };

  /** обработчик закрытия модалки */
  const hideSubmodal = () => {
    setIsOpenSubmodal(!isOpenSubmodal);
    dispatch(getContractorGroups({ id: contractorId, offset, limit: 10 }));
  };

  return (
    <>
      <Modal hide={() => hide()} isVisible={isVisible}>
        <Modal.Header title={name} />
        <Modal.Body>
          <h3 className="header">Информация о компании</h3>

          <table className="natural-entity-card-table">
            <tbody>
              <tr>
                <td align="right">Идентификатор ЭДО</td>
                <td>{fnsUid}</td>
              </tr>
              <tr>
                {/** у ИП нет КПП */}
                <td align="right">ИНН{kpp && '/КПП'}</td>
                <td>
                  {inn}
                  {kpp && ` / ${kpp}`}
                </td>
              </tr>
              {ogrn && (
                <tr>
                  <td align="right">ОГРН</td>
                  <td>{ogrn}</td>
                </tr>
              )}
              {taxAuthorityCode && taxAuthorityTitle && (
                <tr>
                  <td align="right">Код налогового органа</td>
                  <td>
                    {taxAuthorityCode && taxAuthorityCode + ' '}
                    {taxAuthorityTitle && taxAuthorityTitle + ' '}
                  </td>
                </tr>
              )}
              {address && (
                <tr>
                  <td align="right">Адрес</td>
                  <td>{address}</td>
                </tr>
              )}
              {bankBik && bankTitle && (
                <tr>
                  <td align="right">Банк</td>
                  <td>
                    {bankBik && bankBik + ' '}
                    {bankTitle && bankTitle}
                  </td>
                </tr>
              )}
              {accountNumber && (
                <tr>
                  <td align="right">Рассчетный счет</td>
                  <td>{accountNumber}</td>
                </tr>
              )}
              {externalType === DestinationType.LoaclRoaming && (
                <tr>
                  <td align="right">Тип</td>
                  <td>Локальный роуминг{' ' + network && network}</td>
                </tr>
              )}
              {externalType === DestinationType.Hub1c && (
                <tr>
                  <td align="right">Тип</td>
                  <td>1С-ЭДО{' ' + externalOperator && externalOperator}</td>
                </tr>
              )}
              {externalType === DestinationType.Roaming && (
                <tr>
                  <td align="right">Тип</td>
                  <td>Роуминг{' ' + externalOperator && externalOperator}</td>
                </tr>
              )}
            </tbody>
          </table>

          <h3 className="header">Группы контрагента</h3>

          <table className="table">
            <thead className="common-table-head">
              <tr>
                <td>Название</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {rows.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td align="right">
                    <Button
                      icon={<Icons.IconTrash fill="currentColor" />}
                      onClick={() => onDeleteGroup(item.id)}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Button
                    icon={<Icons.IconPlus fill="currentColor" />}
                    onClick={() => onAddGroup()}
                  >
                    Добавить
                  </Button>
                </td>
                <td>
                  <div className="pagination-right">
                    <Pagination
                      listLength={currentContractor?.groups?.recordsTotal}
                      setOffset={setOffset}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </Modal.Body>
      </Modal>

      <SubModalGroups contractorId={contractorId} isVisible={isOpenSubmodal} hide={hideSubmodal} />
    </>
  );
};
