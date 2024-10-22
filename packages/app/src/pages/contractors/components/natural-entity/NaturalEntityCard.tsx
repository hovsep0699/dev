import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Icons } from '@distate/components';

import './style.css';
import { Pagination } from '../../../../common/pagination';
import { getContractorGroups, deleteContractorGroup, getPersonInfo } from '../../store/actions';
import { currentContractor as currentContractorSelector } from '../../store/selectors';
import { SubModalGroups } from './SubModalGroups';

type Props = {
  isVisible: boolean;
  hide: () => void;
  userId: number;
  contractorId: number;
};

/** Карточка контрагента ФЛ */
export const NaturalEntityCard = (props: Props) => {
  const { isVisible, hide, userId, contractorId } = props;
  const dispatch = useDispatch();

  const currentContractor = useSelector(currentContractorSelector);
  const rows = currentContractor?.groups?.rows || [];

  const { name = '', surname = '', patronymic = '', socialNumber = '', email = '' } =
    currentContractor.person || {};

  const [offset, setOffset] = React.useState();
  const [isOpenSubmodal, setIsOpenSubmodal] = React.useState(false);

  React.useEffect(() => {
    /** получение списка групп контрагента */
    contractorId && dispatch(getContractorGroups({ id: contractorId, offset, limit: 10 }));
    /** получение информации о контрагенте */
    userId && dispatch(getPersonInfo(userId));
  }, [dispatch, userId, offset, contractorId]);

  const onDeleteGroup = async (groupId: number) => {
    await dispatch(deleteContractorGroup({ groupId, contractorId }));
    await dispatch(getContractorGroups({ id: contractorId, offset, limit: 10 }));
  };

  const onAddGroup = () => {
    setIsOpenSubmodal(true);
  };

  /** обработчик закрытия модалки */
  const hideSubmodal = () => {
    setIsOpenSubmodal(!isOpenSubmodal);
    dispatch(getContractorGroups({ id: contractorId, offset, limit: 10 }));
  };

  return (
    <>
      <Modal hide={() => hide()} isVisible={isVisible}>
        <Modal.Header title={`${name} ${surname} ${patronymic}`} />
        <Modal.Body>
          <h3 className="header">Информация о физическом лице</h3>

          <table className="natural-entity-card-table">
            <tbody>
              <tr>
                <td align="right">ФИО</td>
                <td>{`${name} ${surname} ${patronymic}`}</td>
              </tr>
              <tr>
                <td align="right">СНИЛС</td>
                <td>{socialNumber}</td>
              </tr>
              <tr>
                <td align="right">Электронная почта</td>
                <td>{email}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="header">Группы контрагента</h3>

          <table className="table">
            <thead className="common-table-head">
              <tr>
                <td>Название</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {rows.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td align="right">
                    <Button
                      icon={<Icons.IconTrash fill="currentColor" />}
                      onClick={() => onDeleteGroup(item.id)}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Button
                    icon={<Icons.IconPlus fill="currentColor" />}
                    onClick={() => onAddGroup()}
                  >
                    Добавить
                  </Button>
                </td>
                <td>
                  <div className="pagination-right">
                    <Pagination
                      listLength={currentContractor?.groups?.recordsTotal}
                      setOffset={setOffset}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </Modal.Body>
      </Modal>

      <SubModalGroups contractorId={contractorId} isVisible={isOpenSubmodal} hide={hideSubmodal} />
    </>
  );
};
