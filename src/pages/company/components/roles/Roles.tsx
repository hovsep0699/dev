import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonKinds, Icons, Input } from '@distate/components';

import { Pagination, PaginationLimit } from '../../../../common/pagination';
import { getStaffRoles } from '../../store/actions';
import { selectStaffRoleRows, selectStaffRoleRecordsTotal } from '../../store/selectors';
import { EditRoleTitleForm } from './EditRoleTitleForm';
import { CreateRoleForm } from './CreateRoleForm';
import { ModalRoleCard } from './modal-role-card';

/** Роли сотрудников */
export const Roles = () => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchTitle, setSearchTitle] = useState<string>();
  const [editingTitleId, setEditingTitleId] = useState<number>();
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isVisibleCard, setIsVisibleCard] = useState(false);
  const [currentRole, setCurrentRole] = useState({});

  const dispatch = useDispatch();

  const roles = useSelector(selectStaffRoleRows);
  const recordsTotal = useSelector(selectStaffRoleRecordsTotal);

  useEffect(() => {
    dispatch(
      getStaffRoles({ props: { offset, limit } })
    );
  }, [dispatch, limit, offset]);

  const onSearch = () => {
    dispatch(
      getStaffRoles({ props: { offset, limit, title: searchTitle } })
    );
  }

  const onOpenModal = (role: {title: string, id: number}) => {
    setCurrentRole(role);
    setIsVisibleCard(true);
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
        <div style={{ display: 'flex'}}>
          <Input width={400} onChange={(e) => setSearchTitle(e.target.value)} value={searchTitle} />
          <Button onClick={onSearch} icon={<Icons.IconSearch fill="currentColor" />}>
            Поиск
          </Button>
        </div>
        <PaginationLimit setLimit={setLimit} limit={limit} />
      </div>

      <table className="table">
        <thead className="common-table-head">
          <tr>
            <td colSpan={2}>Название</td>
          </tr>
        </thead>
        <tbody>
          {
            roles?.map(role => {
              const { id, title } = role;
              return (
                <tr key={id}>
                  {
                    editingTitleId === id ? <EditRoleTitleForm title={title} id={id} setEditingTitleId={setEditingTitleId} /> : (
                      <>
                        <td>{title}</td>
                        <td align="right">
                          <Button
                            kind={ButtonKinds.Secondary}
                            onClick={() => onOpenModal(role)}
                          >
                            Редактировать роль
                          </Button>
                          <Button
                            icon={<Icons.IconPencil fill="currentColor" />}
                            onClick={() => setEditingTitleId(id)}
                            style={{ marginLeft: '10px' }}
                          >
                            Изменить заголовок
                          </Button>
                        </td>
                      </>
                    )
                  }
                  
                </tr>
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            {isOpenCreateForm ? <CreateRoleForm setIsOpenCreateForm={setIsOpenCreateForm}/> : (
              <td>
                <Button
                  icon={<Icons.IconPlus fill="currentColor" />}
                  onClick={() => setIsOpenCreateForm(true)}
                >
                  Добавить роль
                </Button>
              </td>
            )}
            <td align="right">
              <Pagination listLength={recordsTotal} setOffset={setOffset} limit={limit} />
            </td>
          </tr>
        </tfoot>
      </table>

      <ModalRoleCard
        isVisible={isVisibleCard}
        hide={() => setIsVisibleCard(false)}
        currentRole={currentRole as never}
      />
    </>
  )
}
