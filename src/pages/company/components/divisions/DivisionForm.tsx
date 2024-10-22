import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, CheckBox, Button, ButtonKinds, Icons, Autocomplete } from '@distate/components';
import AutocompleteGateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';
import { selectCreateDivisionError } from '../../store/selectors';

type AutocompleteItem = {
  label?: string;
  value?: string;
};

type Props = {
  /** диспатч для отправки формы */
  onAction: any;
  id?: number;
  title?: string;
  kpp?: string;
  classificationNumber?: string;
  visible?: boolean;
  region?: string;
  regionTitle?: string;
  postalCode?: string;
  district?: string;
  city?: string;
  street?: string;
  building?: string;
  house?: string;
  room?: string;
  settlement?: string;
  phone?: string;
  email?: string;
  hide?: Function;
  isVisible?: boolean;
};

/** форма подразделения */
export const DivisionForm = (props: Props) => {
  const dispatch = useDispatch();
  const { hide, id } = props;

  const [title, setTitle] = useState<string | undefined>(props.title);
  const [titleError, setTitleError] = useState<string[]>();
  const [kpp, setKpp] = useState<string | undefined>(props.kpp);
  const [kppError, setKppError] = useState<string[]>();
  /** ОКПО */
  const [classificationNumber, setClassificationNumber] = useState<string | undefined>(
    props.classificationNumber
  );
  const [classificationNumberError, setClassificationNumberError] = useState<string[]>();
  const [visible, setVisible] = useState<boolean | undefined>(props.visible || false);
  const [region, setRegion] = useState<AutocompleteItem>({value: props.region, label: props.regionTitle});
  const [regionError, setRegionError] = useState<string[]>();
  const [regionId, setRegionId] = useState<string | undefined>(props.region);
  /** индекс */
  const [postalCode, setPostalCode] = useState<string | undefined>(props.postalCode);
  const [postalCodeError, setPostalCodeError] = useState<string[]>();
  /** район */
  const [district, setDistrict] = useState<string | undefined>(props.district);
  const [city, setCity] = useState<string | undefined>(props.city);
  const [street, setStreet] = useState<string | undefined>(props.street);
  /** корпус */
  const [building, setBuilding] = useState<string | undefined>(props.building);
  const [house, setHouse] = useState<string | undefined>(props.house);
  const [room, setRoom] = useState<string | undefined>(props.room);
  /** населенный пункт */
  const [settlement, setSettlement] = useState<string | undefined>(props.settlement);
  const [phone, setPhone] = useState<string | undefined>(props.phone);
  const [email, setEmail] = useState<string | undefined>(props.email);
  const [emailError, setEmailError] = useState<string[]>();

  const errors = useSelector(selectCreateDivisionError);

  /** установка ошибок с сервера */
  useEffect(() => {
    const postalCodeRespErr = errors?.address?.postalCode;
    const regionRespErr = errors?.address?.region;
    const titleRespErr = errors?.title;
    const kppRespErr = errors?.kpp;
    const classificationNumberRespErr = errors?.classificationNumber;

    postalCodeRespErr && setPostalCodeError(postalCodeRespErr);
    regionRespErr && setRegionError(regionRespErr);
    titleRespErr && setTitleError(titleRespErr);
    kppRespErr && setKppError(kppRespErr);
    classificationNumberRespErr && setClassificationNumberError(classificationNumberRespErr);
  }, [errors]);


  /** загрузка подходящих значений в автокомплит */
  const codeLoad = async (raw: string, callback: any) => {
    const autocompleteGateway = new AutocompleteGateway();
    const { rows = [] } = await autocompleteGateway.getRegionByTitle(raw);
    const dataToOptions = rows.map((item: any) => {
      return {
        value: item.id,
        label: item.title
      };
    });
    callback(dataToOptions);
  };

  const onChangeRegion = (e: HTMLSelectElement) => {
    setRegion(e);
    setRegionId(e.value);
  };

  const validate = (): boolean => {
    let isVnvalid = true;
    /** Показывать подразделения контрагентам */
    if (visible) {
      /** не заполнено КПП */
      if (!kpp?.trim().length) {
        setKppError(['Значение не должно быть пустым.']);
        isVnvalid = false;
      }
    } else {
      setKppError(undefined);
    }
    /** не заполнено название */
    if (!title?.trim().length) {
      setTitleError(['Значение не должно быть пустым.']);
      isVnvalid = false;
    } else {
      setTitleError(undefined);
    }
    /** не заполнен регион */
    if (!regionId) {
      setRegionError(['Значение не должно быть пустым.']);
      isVnvalid = false;
    } else {
      setRegionError(undefined);
    }
    /** не заполнен индекс */
    if (!postalCode?.trim().length) {
      setPostalCodeError(['Значение не должно быть пустым.']);
      isVnvalid = false;
    } else {
      setPostalCodeError(undefined);
    }
    /** проверка email на корректность*/
    if (email) {
      // eslint-disable-next-line no-useless-escape
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,9})$/;
      const validEmail = reg.test(email);
      validEmail ? setEmailError(undefined) : setEmailError(['Некорректный e-mail']);
    }

    return isVnvalid;
  };

  const onSave = () => {
    if (!validate()) {
      return;
    }

    dispatch(
      props.onAction({
        id,
        title,
        kpp,
        classificationNumber,
        visible,
        region: regionId,
        postalCode,
        district,
        city,
        street,
        building,
        house,
        room,
        settlement,
        phone,
        email,
        hide
      })
    );
  };

  const postalCodeChangeHandler = (str: string) => {
    if (str.length > 6) {
      return;
    }
    setPostalCode(str);
  };

  const kppChangeHandler = (str: string) => {
    if (str.length > 9) {
      return;
    }
    setKpp(str);
  };

  const okpoChangeHandler = (str: string) => {
    if (str.length > 8) {
      return;
    }
    setClassificationNumber(str);
  };

  return (
    <div>
      <h3>Информация о подразделении</h3>
      <div className="two-columns-center">
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Название</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите название подразделения"
              value={title}
              onChange={e => setTitle(e.target.value)}
              error={!!titleError}
              errors={titleError}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className={visible ? 'two-columns-center_name required' : 'two-columns-center_name'}>
            КПП
          </div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите КПП"
              value={kpp}
              onChange={e => kppChangeHandler(e.target.value)}
              error={!!kppError}
              errors={kppError}
              type="number"
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">ОКПО</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите ОКПО"
              value={classificationNumber}
              onChange={e => okpoChangeHandler(e.target.value)}
              error={!!classificationNumberError}
              errors={classificationNumberError}
              type="number"
            />
          </div>
        </div>
      </div>

      <hr />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CheckBox
          label="Показывать подразделения контрагентам"
          checked={visible}
          onChange={() => setVisible(!visible)}
        />
      </div>

      <h3 className="header">Контакты</h3>
      <div className="two-columns-center">
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">E-mail</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!!emailError}
              errors={emailError}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Телефон</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите номер телефона"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      <h3 className="header">Адрес подразделения</h3>

      <div className="two-columns-center">
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Индекс</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите индекс"
              required
              value={postalCode}
              onChange={e => postalCodeChangeHandler(e.target.value)}
              error={!!postalCodeError}
              errors={postalCodeError}
              type="number"
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name required">Регион</div>
          <div className="two-columns-center_value">
            <Autocomplete
              name="code"
              width={300}
              value={region}
              loadOptions={codeLoad}
              onChange={(e: HTMLSelectElement) => onChangeRegion(e)}
              placeholder="Введите регион"
              required
              error={!!regionError}
              errors={regionError}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Район</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите район"
              value={district}
              onChange={e => setDistrict(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Город</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите город"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Населенный пункт</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите населенный пункт"
              value={settlement}
              onChange={e => setSettlement(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Улица</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите улицу"
              value={street}
              onChange={e => setStreet(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Дом</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите дом"
              value={house}
              onChange={e => setHouse(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Корпус</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите строение"
              value={building}
              onChange={e => setBuilding(e.target.value)}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Офис/квартира</div>
          <div className="two-columns-center_value">
            <Input
              width={300}
              placeholder="Введите номер офиса или квартиры"
              value={room}
              onChange={e => setRoom(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button
        kind={ButtonKinds.Orange}
        onClick={onSave}
        icon={<Icons.IconCheck fill="currentColor" />}
      >
        Сохранить
      </Button>
    </div>
  );
};
