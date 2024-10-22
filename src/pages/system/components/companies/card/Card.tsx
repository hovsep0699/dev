import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '@distate/components';
import { NavLink } from 'react-router-dom';

import { getCompanyInfo } from '../../../../contractors/store/actions';
import {
  nameCompanySelector,
  diServerIdCompanySelector,
  innCompanySelector,
  ogrnCompanySelector,
  taxAuthorityTitleCompanySelector,
  taxAuthorityCodeCompanySelector,
  addressCountryTitleCompanySelector,
  addressRegionTitleCompanySelector,
  addressPostalCodeCompanySelector,
  addressDistrictCompanySelector,
  addressCityCompanySelector,
  addressSettlementCompanySelector,
  addressStreetCompanySelector,
  addressHouseCompanySelector,
  addressBuildingCompanySelector,
  addressRoomCompanySelector,
  bankBikCompanySelector,
  bankTitleSelector,
  accountNumberCompanySelector,
  kppCompanySelector,
  tariffTitleSelector
} from '../../../store/selects';
import { Staff } from './Staff';

type Props = {
  isVisible: boolean;
  hide: () => void;
  companyId: number;
};

/** Карточка контрагента ЮЛ */
export const Card = (props: Props) => {
  const { isVisible, hide, companyId } = props;
  const dispatch = useDispatch();

  // const company = useSelector(currentCompanySelector);

  const name = useSelector(nameCompanySelector);
  const diServerId = useSelector(diServerIdCompanySelector);
  const inn = useSelector(innCompanySelector);

  const ogrn = useSelector(ogrnCompanySelector);
  const taxAuthorityTitle = useSelector(taxAuthorityTitleCompanySelector);
  const taxAuthorityCode = useSelector(taxAuthorityCodeCompanySelector);
  const addressCountryTitle = useSelector(addressCountryTitleCompanySelector);
  const addressRegionTitle = useSelector(addressRegionTitleCompanySelector);
  const addressPostalCode = useSelector(addressPostalCodeCompanySelector);

  const addressDistrict = useSelector(addressDistrictCompanySelector);
  const addressCity = useSelector(addressCityCompanySelector);
  const addressSettlement = useSelector(addressSettlementCompanySelector);
  const addressStreet = useSelector(addressStreetCompanySelector);
  const addressHouse = useSelector(addressHouseCompanySelector);
  const addressBuilding = useSelector(addressBuildingCompanySelector);
  const addressRoom = useSelector(addressRoomCompanySelector);
  const bankBik = useSelector(bankBikCompanySelector);
  const bankTitle = useSelector(bankTitleSelector);
  const accountNumber = useSelector(accountNumberCompanySelector);
  const kpp = useSelector(kppCompanySelector);
  const tariffTitle = useSelector(tariffTitleSelector);

  const address: string | undefined = [
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
  ]
    .filter(item => item)
    .join(', ');

  React.useEffect(() => {
    /** получение информации о контрагенте */
    companyId && dispatch(getCompanyInfo(companyId));
  }, [dispatch, companyId]);

  return (
    <>
      <Modal hide={() => hide()} isVisible={isVisible}>
        <Modal.Header title={name} />
        <Modal.Body>
          <table className="natural-entity-card-table">
            <tbody>
              <tr>
                <td align="right">Идентификатор ЭДО</td>
                <td>{diServerId}</td>
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
              {Boolean(address) && (
                <tr>
                  <td align="right">Адрес</td>
                  <td>{address}</td>
                </tr>
              )}
              {bankBik && bankTitle && (
                <tr>
                  <td align="right">БИК</td>
                  <td>
                    {bankBik} - {bankTitle}
                  </td>
                </tr>
              )}
              {accountNumber && (
                <tr>
                  <td align="right">Рассчетный счет</td>
                  <td>{accountNumber}</td>
                </tr>
              )}
              {tariffTitle && (
                <tr>
                  <td align="right">Тариф</td>
                  <td>{tariffTitle}</td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'center', padding: 25 }}>
            <NavLink to={`/finance/information/${companyId}`}>Финансовая информация</NavLink>
          </div>
          <Staff companyId={companyId} />
        </Modal.Body>
      </Modal>
    </>
  );
};
