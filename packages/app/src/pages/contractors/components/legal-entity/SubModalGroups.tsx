import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Button, Icons } from '@distate/components';
import { Pagination } from '../../../../common/pagination';
import { getNoContractorGroups, addContractorToGroup } from '../../store/actions';
import { currentContractor as currentContractorSelector } from '../../store/selectors';

type Props = { contractorId: number; hide: () => void; isVisible: boolean };

/** Список групп, в которых еще нет пользователя */
export const SubModalGroups = ({ hide, isVisible, contractorId }: Props) => {
  const dispatch = useDispatch();
  const [offset, setOffset] = React.useState();

  React.useEffect(() => {
    isVisible && dispatch(getNoContractorGroups({ id: contractorId, offset, limit: 10 }));
  }, [contractorId, dispatch, isVisible, offset]);

  const currentContractor = useSelector(currentContractorSelector);
  const rows = currentContractor?.newGroups?.rows || [];

  /** добавление текущего контрагента в группу */
  const onAddToGroup = async (groupId: number) => {
    await dispatch(addContractorToGroup({ contractorId, groupId }));
    await dispatch(getNoContractorGroups({ id: contractorId, offset, limit: 10 }));
  };

  return (
    <Modal hide={() => hide()} isVisible={isVisible}>
      <Modal.Header title="Добавление элементов" />
      <Modal.Body>
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
                    icon={<Icons.IconPlus fill="currentColor" />}
                    onClick={() => onAddToGroup(item.id)}
                  >
                    Добавить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <div className="pagination-right">
                  <Pagination
                    listLength={currentContractor?.newGroups?.recordsTotal}
                    setOffset={setOffset}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </Modal.Body>
    </Modal>
  );
};
