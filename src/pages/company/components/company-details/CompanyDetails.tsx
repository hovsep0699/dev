import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonKinds, Icons, Input, Autocomplete } from '@distate/components';
import AutocompleteGateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';
import SecurityService from '@distate/core/dist/application/security/SecurityService';
import { editDetails, clearErrors, getCompanyDetails } from '../../store/actions';
import {
  selectKppError,
  selectOkpoError,
  selectAccountNumberError,
  selectTaxAuthorityError,
  selectBikError,
  selectName,
  selectDiServerId,
  selectInn,
  selectKpp,
  selectOkpo,
  selectOgrn,
  selectOgrnip,
  selectTaxAuthority,
  selectAccountNumber,
  selectBik,
  selectCompanyType
} from '../../store/selectors';

type AutocompleteItem = {
  label?: string;
  value?: string;
};

/** # Реквизиты компании */
export const CompanyDetails = () => {
  const companyName = useSelector(selectName);
  const diServerId = useSelector(selectDiServerId);
  const inn = useSelector(selectInn);
  const initialKpp = useSelector(selectKpp);
  const initialOkpo = useSelector(selectOkpo);
  const ogrn = useSelector(selectOgrn);
  const ogrnip = useSelector(selectOgrnip);
  const initialTaxAuthority = useSelector(selectTaxAuthority);
  const initialBik = useSelector(selectBik);
  const initialAccountNumber = useSelector(selectAccountNumber);
  const companyType = useSelector(selectCompanyType);

  const [isEditable, setIsEditable] = useState(false);
  const [kpp, setKpp] = useState<string>();
  const [okpo, setOkpo] = useState<string>();
  /** Код налогового органа */
  const [code, setCode] = useState<AutocompleteItem>();
  const [bik, setBik] = useState<AutocompleteItem>();
  /** Номер расчётного счёта */
  const [accountNumber, setAccountNumber] = useState<string>();

  const kppError = useSelector(selectKppError);
  const okpoError = useSelector(selectOkpoError);
  const accountNumberError = useSelector(selectAccountNumberError);
  const taxAuthorityError = useSelector(selectTaxAuthorityError);
  const bikError = useSelector(selectBikError);
  /** флаг незаполненных обязательных данных для регистрации */
  const hasIncopleteRole = useSelector((state: any) => state.sign.hasRoleIncomplete);

  const dispatch = useDispatch();
  const autocompleteGateway = new AutocompleteGateway();

  useEffect(() => {
    setKpp(initialKpp);
    setOkpo(initialOkpo);
    setBik({ label: initialBik, value: initialBik });
    setCode({ label: initialTaxAuthority?.code, value: initialTaxAuthority?.id });
    setAccountNumber(initialAccountNumber);
  }, [initialBik, initialTaxAuthority, initialAccountNumber, initialKpp, initialOkpo]);

  useEffect(() => {
    dispatch(getCompanyDetails());
    /** очистка старых ошибок при первом входе */
    dispatch(clearErrors());
    /** получение прав на редактирование */
    const role = SecurityService.hasRole('ROLE_COMPANY_EDITOR');
    setIsEditable(role);
  }, [dispatch]);

  const onSubmit = () => {
    const props = {
      okpo,
      accountNumber,
      bik: bik && bik.value,
      kpp: kpp && kpp,
      hasIncopleteRole,
      taxAuthority: code?.value
    };
    dispatch(editDetails(props));
  };

  /** загрузка подходящих кодов налогового органа в автокомплите */
  const codeLoad = async (raw: string, callback: any) => {
    const { rows = [] } = await autocompleteGateway.getIFNSByCode(raw);
    const dataToOptions = rows.map((item: any) => {
      return {
        value: item.id,
        label: item.code
      };
    });
    callback(dataToOptions);
  };

  /** загрузка подходящих БИК в автокомплите */
  const bikLoad = async (raw: string, callback: any) => {
    const { rows = [] } = await autocompleteGateway.getBankByBIK(raw);
    const dataToOptions = rows.map(
      (item: any): AutocompleteItem => {
        return {
          value: item.bik,
          label: item.bik
        };
      }
    );
    callback(dataToOptions);
  };

  const setKppHandler = (targetValue: string) => {
    let value = targetValue.trim();
    if (value.length <= 9 && !isNaN(+value)) {
      setKpp(value);
    }
  };

  const setOkpoHandler = (targetValue: string) => {
    let value = targetValue.trim();
    let maxLength;

    if (companyType === 'IP') {
      maxLength = 10
    } else {
      maxLength = 8
    }
    if (value.length <= maxLength && !isNaN(+value)) {
      setOkpo(value);
    }
  };

  const setAccountNumberHandler = (targetValue: string) => {
    let value = targetValue.trim();
    if (value.length <= 20 && !isNaN(+value)) {
      setAccountNumber(value);
    }
  };

  const isIp = companyType === 'IP';

  return (
    <>
      <div className="two-columns-center">
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Идентификатор участника</div>
          <div className="two-columns-center_value">{diServerId}</div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Организация</div>
          <div className="two-columns-center_value">{companyName}</div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">ИНН</div>
          <div className="two-columns-center_value">{inn}</div>
        </div>
        {!isIp && (
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">КПП *</div>
            <div className="two-columns-center_value">
              <Input
                required
                name="kpp"
                width={320}
                value={kpp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKppHandler(e.target.value)}
                error={!!kppError}
                errors={kppError}
                title="Введите 9-значный Код Причины Постановки на учет"
                disabled={!isEditable}
              />
            </div>
          </div>
        )}
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">ОКПО</div>
          <div className="two-columns-center_value">
            <Input
              width={320}
              name="okpo"
              value={okpo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOkpoHandler(e.target.value)}
              error={!!okpoError}
              errors={okpoError}
              title="Введите 8-значный код по Общероссийскому Классификатору Предприятий и Организаций"
              disabled={!isEditable}
            />
          </div>
        </div>
        {isIp ? (
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">ОГРНИП</div>
            <div className="two-columns-center_value">{ogrnip}</div>
          </div>
        ) : (
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">ОГРН</div>
            <div className="two-columns-center_value">{ogrn}</div>
          </div>
        )}
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Код налогового органа *</div>
          <div className="two-columns-center_value">
            <Autocomplete
              name="code"
              width={320}
              value={code}
              loadOptions={codeLoad}
              onChange={(e: HTMLSelectElement) => setCode(e)}
              placeholder=""
              error={!!taxAuthorityError}
              errors={taxAuthorityError}
              required
              title="Начните вводить «Код налогового органа» и выберите его из выпадающего списка"
              disabled={!isEditable}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">БИК</div>
          <div className="two-columns-center_value">
            <Autocomplete
              name="bik"
              width={320}
              value={bik}
              loadOptions={bikLoad}
              onChange={(e: HTMLSelectElement) => setBik(e)}
              placeholder=""
              error={!!bikError}
              errors={bikError}
              title="Начните вводить «Банковский идентификационный код» и выберите его из выпадающего списка"
              disabled={!isEditable}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Номер расчётного счёта</div>
          <div className="two-columns-center_value">
            <Input
              width={320}
              name="accountNumber"
              value={accountNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAccountNumberHandler(e.target.value)
              }
              error={!!accountNumberError}
              errors={accountNumberError}
              title="Введите 20-значный «Номер расчётного счёта»"
              disabled={!isEditable}
            />
          </div>
        </div>
      </div>
      <br />
      <br />
      {isEditable && (
        <Button
          icon={<Icons.IconCheck fill="currentColor" />}
          kind={ButtonKinds.Orange}
          onClick={onSubmit}
        >
          Сохранить данные компании
        </Button>
      )}
    </>
  );
};
