import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, ButtonKinds, Icons } from '@distate/components';
import { getEmployeeInfo, changeEmployeeInfo } from '../../store/actions';
import { employeeSelector, employeeErrorsSelector } from '../../store/selectors';

/** Кабинет - Пользователь */
export const Employee = () => {
  const employee = useSelector(employeeSelector);
  const errors = useSelector(employeeErrorsSelector);

  const [surname, setSurname] = useState(employee?.surname);
  const [name, setName] = useState(employee?.name);
  const [patronymic, setPatronymic] = useState(employee?.patronymic);
  const [position, setPosition] = useState(employee?.position);
  const [email, setEmail] = useState(employee?.email);
  const [password, setPassword] = useState<string>();
  const [secondPassword, setSecondPassword] = useState<string>();
  const [passwordCompare, setPasswordCompare] = useState<any>();

  // const [errors, setErrors] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeInfo());
  }, [dispatch]);

  useEffect(() => {
    setSurname(employee?.surname);
    setName(employee?.name);
    setPatronymic(employee?.patronymic);
    setPosition(employee?.position);
    setEmail(employee?.email);
  }, [employee]);

  /** кнопка - Сохранить данные пользователя */
  const onSave = () => {
    if (password !== secondPassword) {
      setPasswordCompare(['Пароли не совпадают.']);
      return false;
    } else {
      setPasswordCompare(undefined);
    }

    dispatch(
      changeEmployeeInfo({
        name,
        surname,
        patronymic,
        position,
        email,
        password
      })
    );
  };

  return (
    <>
      <div className="two-columns-center">
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Фамилия</div>
          <div className="two-columns-center_value">
            <Input
              value={surname}
              onChange={e => setSurname(e.target.value)}
              width={320}
              error={errors?.person?.surname}
              errors={errors?.person?.surname}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Имя</div>
          <div className="two-columns-center_value">
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              width={320}
              error={errors?.person?.name}
              errors={errors?.person?.name}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Отчество</div>
          <div className="two-columns-center_value">
            <Input
              value={patronymic}
              onChange={e => setPatronymic(e.target.value)}
              width={320}
              error={errors?.person?.patronymic}
              errors={errors?.person?.patronymic}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Должность</div>
          <div className="two-columns-center_value">
            <Input
              value={position}
              onChange={e => setPosition(e.target.value)}
              width={320}
              error={errors?.position}
              errors={errors?.position}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Email</div>
          <div className="two-columns-center_value">
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              width={320}
              error={errors?.email}
              errors={errors?.email}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Пароль</div>
          <div className="two-columns-center_value">
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              width={320}
              placeholder="Введите новый пароль"
              type="password"
              error={errors?.password}
              errors={errors?.password}
            />
          </div>
        </div>
        <div className="two-columns-center_row">
          <div className="two-columns-center_name">Повторите пароль</div>
          <div className="two-columns-center_value">
            <Input
              value={secondPassword}
              onChange={e => setSecondPassword(e.target.value)}
              width={320}
              placeholder="Повторите новый пароль"
              type="password"
              error={passwordCompare}
              errors={passwordCompare}
            />
          </div>
        </div>
      </div>
      <hr />
      <Button
        kind={ButtonKinds.Orange}
        icon={<Icons.IconCheck fill="currentColor" />}
        onClick={onSave}
      >
        Сохранить данные пользователя
      </Button>
    </>
  );
};
