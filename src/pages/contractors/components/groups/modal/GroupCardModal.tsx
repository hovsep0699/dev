import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Button, ButtonKinds, Icons } from '@distate/components';

import { SubModal } from './SubModal';
import { SubModalLegalEntityTable } from './SubModalLegalEntityTable';
import { SubModalNaturalEntityTable } from './SubModalNaturalEntityTable';
import { SubModalEmployeeTable } from './SubModalEmployeeTable';
import {
  getLegalEntityGroup,
  getNaturalEntityGroup,
  getEmployeeGroup,
  removeFromGroup,
  removeEmployeeFromGroup,
  removeGroup,
  setAddedGroupLegalEntity,
  setAddedGroupNaturalEntity,
  setAddedGroupEmployee
} from '../../../store/actions';
import {
  legalEntityInfoAdded,
  naturalEntityInfoAdded,
  employeeEntityInfoAdded,
  group
} from '../../../store/selectors';
import { RelationStatus } from '../../../helpers/contractors.typings';
import { Pagination } from '../../../../../common/pagination';
import { AddedLegalEntityFilter, AddedNaturalEntityFilter, AddedEmployeeFilter } from './filters';
import { arrToString } from '../../../helpers/contractors.helpers';
import { TruncateText } from '../../../../../common/truncate-text';
import { getExternalTypeToString } from '../../../../../helpers/heplers';

interface Props {
  isVisible: boolean;
  setIsVisible: Function;
  onHide: Function;
  id: number;
  title: string;
}

export const GroupCardModal = (props: Props) => {
  const dispatch = useDispatch();
  const groupOffset = useSelector(group).offset;
  const legalEntityInfo = useSelector(legalEntityInfoAdded);
  /** список добавленных ЮЛ */
  const legalEntityList = legalEntityInfo?.rows || [];
  const isEmptyLegalEntity = legalEntityList.length === 0;

  const naturalEntityInfo = useSelector(naturalEntityInfoAdded);
  /** список добавленных ФЛ */
  const naturalEntityList = naturalEntityInfo?.rows || [];
  const isEmptyNaturalEntity = naturalEntityList.length === 0;

  const employeeInfo = useSelector(employeeEntityInfoAdded);
  /** список добавленных Сотрудников */
  const employeeList = employeeInfo?.rows || [];
  const isEmptyEmployee = employeeList.length === 0;

  const { isVisible, setIsVisible, onHide, id, title } = props;
  const [isSubModalOpen, setIsSubModalOpen] = React.useState(false);
  const [subModalContent, setSubModalContent] = React.useState<ReactElement>();

  const [offsetLegalEntity, setOffsetLegalEntity] = React.useState(false);
  const [offsetNaturalEntity, setOffsetNaturalEntity] = React.useState(false);
  const [offsetEmployee, setOffsetEmployee] = React.useState(false);

  enum GroupUsersType {
    LegalEntity = 'legalEntity',
    NaturalEntity = 'naturalEntity',
    Employee = 'employee'
  }

  /** запись в стор значения пагинации ЮЛ */
  React.useEffect(() => {
    dispatch(setAddedGroupLegalEntity({ offset: offsetLegalEntity }));
  }, [dispatch, offsetLegalEntity]);

  /** запись в стор значения пагинации ФЛ*/
  React.useEffect(() => {
    dispatch(setAddedGroupNaturalEntity({ offset: offsetNaturalEntity }));
  }, [dispatch, offsetNaturalEntity]);

  /** запись в стор значения пагинации Сотрудников */
  React.useEffect(() => {
    dispatch(setAddedGroupEmployee({ offset: offsetEmployee }));
  }, [dispatch, offsetEmployee]);

  const onAdd = (usersType: GroupUsersType) => {
    // dispatch(getGroupContractorsInfo(id));
    if (usersType === GroupUsersType.LegalEntity) {
      dispatch(getLegalEntityGroup({ id, offset: offsetLegalEntity }));
      setSubModalContent((<SubModalLegalEntityTable groupId={id} />) as ReactElement);
    }
    if (usersType === GroupUsersType.NaturalEntity) {
      dispatch(getNaturalEntityGroup({ id, offset: offsetNaturalEntity }));
      setSubModalContent((<SubModalNaturalEntityTable groupId={id} />) as ReactElement);
    }
    if (usersType === GroupUsersType.Employee) {
      dispatch(getEmployeeGroup({ id, offset: offsetEmployee }));
      setSubModalContent((<SubModalEmployeeTable groupId={id} />) as ReactElement);
    }
    setIsSubModalOpen(true);
  };

  /** удаление ЮЛ и ФЛ */
  const onRemove = (contractorId: number) => {
    dispatch(removeFromGroup({ groupId: id, contractorId }));
  };

  /** удаление сотрудника */
  const onRemoveEmployee = (contractorId: number) => {
    dispatch(removeEmployeeFromGroup({ groupId: id, contractorId }));
  };

  /** удаление группы */
  const onRemoveGroup = () => {
    dispatch(removeGroup({ id, offset: groupOffset }));
    setIsVisible(false);
  };

  return (
    <>
      <Modal hide={() => onHide()} isVisible={isVisible}>
        <Modal.Header title={`Группа ${title}`} />
        <Modal.Body>
          <h3 className="header">Юридические лица</h3>
          <table className="table">
            <thead className="common-table-head">
              <tr>
                <td>Название</td>
                <td>Статус</td>
                <td>ИНН</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {isEmptyLegalEntity && (
                <tr>
                  <td>Список пуст.</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              {legalEntityList.map(item => {
                const {
                  id,
                  name,
                  status,
                  inn,
                  contractorId,
                  externalType,
                  externalOperator,
                  network
                } = item;

                const typeToStr = getExternalTypeToString(externalType, externalOperator, network);
                const title = name + typeToStr;

                return (
                  <tr key={id}>
                    <td>{title.length > 1 && <TruncateText text={title} />}</td>
                    <td>{status === RelationStatus.Active ? 'активный' : 'заблокированный'}</td>
                    <td>{inn}</td>
                    <td>
                      <Button
                        icon={<Icons.IconTrash fill="currentColor" />}
                        onClick={() => onRemove(contractorId)}
                      >
                        Удалить
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Button
                    icon={<Icons.IconPlus fill="currentColor" />}
                    onClick={() => onAdd(GroupUsersType.LegalEntity)}
                  >
                    Добавить
                  </Button>
                </td>
                <td colSpan={3}>
                  <div className="pagination-right">
                    <AddedLegalEntityFilter id={id} />
                    <Pagination
                      listLength={legalEntityInfo?.recordsTotal}
                      setOffset={setOffsetLegalEntity}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>

          <h3 className="header">Физические лица</h3>
          <table className="table">
            <thead className="common-table-head">
              <tr>
                <td>ФИО</td>
                <td>Статус</td>
                <td>СНИЛС</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {isEmptyNaturalEntity && (
                <tr>
                  <td>Список пуст.</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              {naturalEntityList.map(item => {
                const { id, surname, name, patronymic, status, socialNumber, contractorId } = item;
                const fio = arrToString([surname, name, patronymic]);

                return (
                  <tr key={id}>
                    <td>{fio && <TruncateText text={fio} />}</td>
                    <td>{status === RelationStatus.Active ? 'активный' : 'заблокированный'}</td>
                    <td>{socialNumber}</td>
                    <td>
                      <Button
                        icon={<Icons.IconTrash fill="currentColor" />}
                        onClick={() => onRemove(contractorId)}
                      >
                        Удалить
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Button
                    icon={<Icons.IconPlus fill="currentColor" />}
                    onClick={() => onAdd(GroupUsersType.NaturalEntity)}
                  >
                    Добавить
                  </Button>
                </td>
                <td colSpan={3}>
                  <div className="pagination-right">
                    <AddedNaturalEntityFilter id={id} />
                    <Pagination
                      listLength={naturalEntityInfo?.recordsTotal}
                      setOffset={setOffsetNaturalEntity}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>

          <h3 className="header">Сотрудники</h3>
          <table className="table">
            <thead className="common-table-head">
              <tr>
                <td>ФИО</td>
                <td>Статус</td>
                <td>Должность</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {isEmptyEmployee && (
                <tr>
                  <td>Список пуст.</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              {employeeList.map(item => {
                const { surname, name, patronymic, status, position, id } = item;
                const fio = arrToString([surname, name, patronymic]);

                return (
                  <tr key={id}>
                    <td>{fio && <TruncateText text={fio} />}</td>
                    <td>{status === RelationStatus.Active ? 'активный' : 'заблокированный'}</td>
                    <td>{position}</td>
                    <td>
                      <Button
                        icon={<Icons.IconTrash fill="currentColor" />}
                        onClick={() => onRemoveEmployee(id)}
                      >
                        Удалить
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Button
                    icon={<Icons.IconPlus fill="currentColor" />}
                    onClick={() => onAdd(GroupUsersType.Employee)}
                  >
                    Добавить
                  </Button>
                </td>
                <td colSpan={3}>
                  <div className="pagination-right">
                    <AddedEmployeeFilter id={id} />
                    <Pagination
                      listLength={employeeInfo?.recordsTotal}
                      setOffset={setOffsetEmployee}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            icon={<Icons.IconTrash fill="currentColor" />}
            onClick={onRemoveGroup}
            kind={ButtonKinds.Danger}
          >
            Удалить группу
          </Button>
        </Modal.Footer>
      </Modal>

      <SubModal
        isVisible={isSubModalOpen}
        onHide={() => setIsSubModalOpen(false)}
        render={(data: string) => subModalContent}
      />
    </>
  );
};
