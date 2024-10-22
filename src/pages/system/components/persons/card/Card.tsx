import React from 'react';
import { Modal } from '@distate/components';
import { CardItemParams } from '../Persons';

type Props = {
  isVisible: boolean;
  hide: () => void;
  personInfo: CardItemParams;
};

/** Карточка контрагента ЮЛ */
export const Card = (props: Props) => {
  const { isVisible, hide, personInfo } = props;

  const { fio, socialNumber, activationStatus, email } = personInfo;

  return (
    <>
      <Modal hide={() => hide()} isVisible={isVisible}>
        <Modal.Header title="Карточка физического лица" />
        <Modal.Body>
          <table className="natural-entity-card-table">
            <tbody>
              <tr>
                <td align="right">ФИО</td>
                <td>{fio}</td>
              </tr>
              <tr>
                <td align="right">СНИЛС</td>
                <td>{socialNumber}</td>
              </tr>
              <tr>
                <td align="right">Статус</td>
                <td>{activationStatus}</td>
              </tr>
              <tr>
                <td align="right">Электронная почта</td>
                <td>{email}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};
