import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '@distate/components';
import {
  selectEmployeeName,
  selectEmployeeSurname,
  selectEmployeePatronymic,
  selectEmployeePosition,
  selectEmployeeEmail,
  selectEmployeeCreatedAt,
  selectEmployeeStatus,
  selectEmployeeId
} from '../../store/selectors';
import { joinNoEmptyValues } from '../../../../helpers/heplers';
import { EmployeeRoles } from './EmployeeRoles';
import { EmployeeCertificate } from './EmployeeCertificate';
import { EmployeeDivision } from './EmployeeDivision';
import { EmployeeContractorGroups } from './EmployeeContractorGroups';
import { EmployeeCardToolButtons } from './EmployeeCardToolButtons';

type Props = { hide: () => void; isVisible: boolean };

/** модалка - карточка сотрудника */
export const EmployeeCard = (props: Props) => {
  const name = useSelector(selectEmployeeName);
  const surname = useSelector(selectEmployeeSurname);
  const patronymic = useSelector(selectEmployeePatronymic);
  const position = useSelector(selectEmployeePosition);
  const email = useSelector(selectEmployeeEmail);
  const createdAt = useSelector(selectEmployeeCreatedAt);
  const status = useSelector(selectEmployeeStatus);
  const id = useSelector(selectEmployeeId);

  const fio = joinNoEmptyValues([surname, name, patronymic]);

  const { isVisible, hide } = props;

  return (
    <Modal hide={() => hide()} isVisible={isVisible}>
      <Modal.Header title="Карточка сотрудника" />

      <Modal.Body>
        <div className="two-columns-center">
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">ФИО</div>
            <div className="two-columns-center_value">{fio}</div>
          </div>
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">Должность</div>
            <div className="two-columns-center_value">{position}</div>
          </div>
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">Email</div>
            <div className="two-columns-center_value">{email}</div>
          </div>
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">Зарегистрирован</div>
            <div className="two-columns-center_value">{createdAt}</div>
          </div>
          <div className="two-columns-center_row">
            <div className="two-columns-center_name">Статус</div>
            <div className="two-columns-center_value">{status}</div>
          </div>
        </div>

        <EmployeeRoles id={id!} />
        <EmployeeCertificate id={id!} />
        <EmployeeDivision id={id!} />
        <EmployeeContractorGroups id={id!} />
        <EmployeeCardToolButtons id={id!} />
      </Modal.Body>
    </Modal>
  );
};
