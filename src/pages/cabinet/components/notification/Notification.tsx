import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationSetting, changeNotificationSetting } from '../../store/actions';
import { notificationSettingRowSelector } from '../../store/selectors';
import { CheckBox, Button, ButtonKinds, Icons } from '@distate/components';
import './style.css';

/** Кабинет - Оповещения */
export const Notification = () => {
  const dispatch = useDispatch();

  const initialNotificationList = useSelector(notificationSettingRowSelector);
  const [notificationList, setNotificationList] = useState<[]>();

  useEffect(() => {
    dispatch(getNotificationSetting());
  }, [dispatch]);

  useEffect(() => {
    setNotificationList(initialNotificationList);
  }, [initialNotificationList]);

  /** обработка чекбоксов кроме первого */
  const onChangeCheckBox = (e: any, id: number) => {
    e.preventDefault();
    const newArr = notificationList?.map((item: any) => {
      if (item.type_id === id) {
        return { ...item, email: !item.email };
      }
      return item;
    });
    setNotificationList(newArr as never);
  };

  /** чекбокс "Выбрать все" */
  const onChangeAll = (e: any, checkedAll?: boolean) => {
    e.preventDefault();

    if (checkedAll) {
      const newArr = notificationList?.map((item: any) => {
        return { ...item, email: false };
      });
      setNotificationList(newArr as never);
    } else {
      const newArr = notificationList?.map((item: any) => {
        return { ...item, email: true };
      });
      setNotificationList(newArr as never);
    }
  };

  const onSave = () => {
    const resultArr = notificationList?.map((item: any) => ({
      typeId: item.type_id,
      isEnabled: item.email
    }));

    dispatch(changeNotificationSetting(resultArr));
  };

  const checkedAll = notificationList?.every((item: any) => item.email);

  return (
    <>
      <div className="check-list-element" onClick={e => onChangeAll(e, checkedAll)}>
        <div className="check-list-element__left-block">
          {<CheckBox defaultValue={checkedAll} />}
        </div>
        <div className="check-list-element__right-block">
          <span className="check-list-element__title">Выбрать всё</span>
          <small className="check-list-element__description">Подписаться на все оповещения.</small>
        </div>
      </div>
      {notificationList?.map((item: any) => {
        const { type_id, title, comment, email } = item;

        return (
          <div
            key={type_id}
            className="check-list-element"
            onClick={e => onChangeCheckBox(e, type_id)}
          >
            <div className="check-list-element__left-block">
              {<CheckBox defaultValue={email} onChange={() => true} />}
            </div>
            <div className="check-list-element__right-block">
              <span className="check-list-element__title">{title}</span>
              <small className="check-list-element__description">{comment}</small>
            </div>
          </div>
        );
      })}

      <Button
        kind={ButtonKinds.Orange}
        icon={<Icons.IconCheck fill="currentColor" />}
        onClick={onSave}
        style={{ marginTop: 20 }}
      >
        Сохранить изменения
      </Button>
    </>
  );
};
