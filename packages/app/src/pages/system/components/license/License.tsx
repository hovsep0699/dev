import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '@distate/components/dist/FormSchema';
import { getLicenseInfo } from '../../store/actions';
import { licenseTitleSeletor, licenseValidUntilSeletor } from '../../store/selects';
import { Button, ButtonKinds, Icons } from '@distate/components';

/** Система - Лицензия */
export const License = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLicenseInfo());
  }, [dispatch]);

  const title = useSelector(licenseTitleSeletor);
  const validUntil = useSelector(licenseValidUntilSeletor);

  /** сервер передает время в секундах - перевод в мс */
  const date = new Date(validUntil * 1000);
  const formatDate = dateFormat(date, 'yyyy-MM-dd');

  return (
    <>
      <div style={{ padding: 25, lineHeight: 2 }}>
        <h1>{title}</h1>
        <h3>Ваша лицензия истекает: {validUntil && formatDate}</h3>

        <Button
          kind={ButtonKinds.LightGreen}
          icon={<Icons.IconCheck fill="currentColor" />}
          style={{ marginTop: 10 }}
          onClick={() => window.open('https://www.distate.ru/o-kompanii/documents/', '_blank')}
        >
          Продлить
        </Button>
      </div>
      <hr />
    </>
  );
};
