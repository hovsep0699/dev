import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonKinds, Icons, Input, Autocomplete } from '@distate/components';
import AutocompleteGateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';
import { setAddress, clearErrors, getCompanyDetails } from '../../store/actions';
import {
  selectPostalCodeErrors,
  selectRegionErrors,
  selectDistrictErrors,
  selectCityErrors,
  selectSettlementErrors,
  selectStreetErrors,
  selectHouseErrors,
  selectBuildingErrors,
  selectRoomErrors,
  selectPostalCode,
  selectRegionId,
  selectRegionTitle,
  selectDistrict,
  selectCity,
  selectSettlement,
  selectStreet,
  selectHouse,
  selectBuilding,
  selectRoom
} from '../../store/selectors';

type AutocompleteItem = {
  label?: string;
  value?: string;
};

/** # Юридический адрес */
export const Address = () => {
  const autocompleteGateway = new AutocompleteGateway();
  const dispatch = useDispatch();

  const postalCodeSelector = useSelector(selectPostalCode);
  const regionIdSelector = useSelector(selectRegionId);
  const regionTitleSelector = useSelector(selectRegionTitle);
  const settlementSelector = useSelector(selectSettlement);
  const districtSelector = useSelector(selectDistrict);
  const citySelector = useSelector(selectCity);
  const streetSelector = useSelector(selectStreet);
  const houseSelector = useSelector(selectHouse);
  const buildingSelector = useSelector(selectBuilding);
  const roomSelector = useSelector(selectRoom);

  /** Индекс */
  const [postalCode, setPostalCode] = useState<string>();
  /** Район */
  const [district, setDistrict] = useState<any>();
  /** Город */
  const [city, setCity] = useState<string>();
  /** Населенный пункт */
  const [settlement, setSettlement] = useState<string>();
  /** Улица */
  const [street, setStreet] = useState<string>();
  /** Дом */
  const [house, setHouse] = useState<string>();
  /** Корпус */
  const [building, setBuilding] = useState<string>();
  /** Офис/квартира */
  const [room, setRoom] = useState<string>();
  /** Регион */
  const [region, setRegion] = useState<AutocompleteItem>();

  /** ошибки поля Индекс */
  const postalCodeErrors = useSelector(selectPostalCodeErrors);
  /** ошибки поля Регион */
  const regionErrors = useSelector(selectRegionErrors);
  /** ошибки поля Район */
  const districtErrors = useSelector(selectDistrictErrors);
  /** ошибки поля Город */
  const cityErrors = useSelector(selectCityErrors);
  /** ошибки поля Населенный пункт */
  const settlementErrors = useSelector(selectSettlementErrors);
  /** ошибки поля Улица */
  const streetErrors = useSelector(selectStreetErrors);
  /** ошибки поля Дом */
  const houseErrors = useSelector(selectHouseErrors);
  /** ошибки поля Корпус */
  const buildingErrors = useSelector(selectBuildingErrors);
  /** ошибки поля Офис\квартира */
  const roomErrors = useSelector(selectRoomErrors);

  useEffect(() => {
    postalCodeSelector && setPostalCode(postalCodeSelector);
    regionTitleSelector &&
      regionIdSelector &&
      setRegion({
        label: regionTitleSelector,
        value: regionIdSelector
      });
    districtSelector && setDistrict(districtSelector);
    citySelector && setCity(citySelector);
    settlementSelector && setSettlement(settlementSelector);
    streetSelector && setStreet(streetSelector);
    houseSelector && setHouse(houseSelector);
    buildingSelector && setBuilding(buildingSelector);
    roomSelector && setRoom(roomSelector);
  }, [
    postalCodeSelector,
    regionTitleSelector,
    regionIdSelector,
    districtSelector,
    citySelector,
    settlementSelector,
    streetSelector,
    houseSelector,
    buildingSelector,
    roomSelector
  ]);

  useEffect(() => {
    dispatch(getCompanyDetails());
    /** очистка старых ошибок при первом входе */
    dispatch(clearErrors());
  }, [dispatch]);

  /** загрузка подходящих регионов в автокомплите */
  const regionLoad = async (regionStr: string, callback: any) => {
    const { rows = [] } = await autocompleteGateway.getRegionByTitle(regionStr);
    const dataToOptions = rows.map((item: any) => {
      return {
        value: item.id,
        label: item.title
      };
    });
    callback(dataToOptions);
  };

  /** Отправка формы */
  const sendFormHandler = () => {
    const formData = {
      postalCode,
      region,
      district,
      city,
      settlement,
      street,
      house,
      building,
      room
    };
    dispatch(setAddress(formData));
  };

  return (
    <>
      <div className="two-columns-center">
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Индекс</div>
          <div className="two-columns-center_value">
            <Input
              value={postalCode}
              name="postalCode"
              width={320}
              title="Введите 6-значный код"
              placeholder="Введите индекс"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostalCode(e.target.value)}
              error={!!postalCodeErrors}
              errors={postalCodeErrors}
              maxLength={6}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Регион *</div>
          <div className="two-columns-center_value">
            <Autocomplete
              name="region"
              width={320}
              value={region}
              loadOptions={regionLoad}
              onChange={(e: HTMLSelectElement) => setRegion(e)}
              error={!!regionErrors}
              errors={regionErrors}
              required
              title="Начните вводить название региона и выберите его из выпадающего списка"
              placeholder="Введите регион"
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Район</div>
          <div className="two-columns-center_value">
            <Input
              width={320}
              name="district"
              value={district}
              error={!!districtErrors}
              errors={districtErrors}
              title="Введите район"
              placeholder="Введите район"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDistrict(e.target.value)}
            />
          </div>
        </div>

        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Город</div>
          <div className="two-columns-center_value">
            <Input
              width={320}
              name="city"
              value={city}
              error={!!cityErrors}
              errors={cityErrors}
              title="Введите город"
              placeholder="Введите город"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Населённый пункт</div>
          <div className="two-columns-center_value">
            <Input
              width={320}
              name="settlement"
              value={settlement}
              error={!!settlementErrors}
              errors={settlementErrors}
              title="Введите населённый пункт"
              placeholder="Введите населённый пункт"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettlement(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Улица</div>
          <div className="two-columns-center_value">
            <Input
              width={320}
              name="street"
              value={street}
              error={!!streetErrors}
              errors={streetErrors}
              title="Введите улицу"
              placeholder="Введите улицу"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Дом</div>
          <div className="two-columns-center_value">
            <Input
              width={320}
              name="house"
              value={house}
              error={!!houseErrors}
              errors={houseErrors}
              title="Введите дом"
              placeholder="Введите дом"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHouse(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Корпус</div>
          <div className="two-columns-center_value">
            <Input
              width={320}
              name="building"
              value={building}
              error={!!buildingErrors}
              errors={buildingErrors}
              title="Введите корпус"
              placeholder="Введите корпус"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBuilding(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Офис/квартира</div>
          <div className="two-columns-center_value">
            <Input
              width={320}
              name="room"
              value={room}
              placeholder="Укажите номер"
              error={!!roomErrors}
              errors={roomErrors}
              title="Введите офис/квартиру"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
            />
          </div>
        </div>
      </div>
      <br />
      <br />
      <Button
        icon={<Icons.IconCheck fill="currentColor" />}
        kind={ButtonKinds.Orange}
        onClick={sendFormHandler}
      >
        Сохранить юридический адрес
      </Button>
    </>
  );
};
