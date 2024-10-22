import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '@distate/components';
import { Button, ButtonKinds, Icons } from '@distate/components';
import { deleteDivision, doHeadDivision, updateCompanyDivision } from '../../../store/actions';
import { DivisionForm } from '../DivisionForm';
import { CompanyDivision } from '../../../helpers/company.typings';
import { DivisionStaff } from './DivisionStaff';
import { ConfirmDelete } from './ConfirmDelete';

type Props = {
  hide: () => void;
  isVisible: boolean;
  divisionProps: CompanyDivision & { id: number };
};

/** модалка карточки подразделения */
export const ModalDivisionCard = (props: Props) => {
  const { isVisible, hide, divisionProps } = props;

  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteDivision({ divisionId: divisionProps.id, hide }));
  }

  const doHead = () => {
    dispatch(doHeadDivision({ divisionId: divisionProps.id }));
  }

  return (
    <>
      <Modal hide={hide} isVisible={isVisible}>
        <Modal.Header title="Карточка подразделения" />
        <Modal.Body>
          <DivisionForm
            onAction={updateCompanyDivision}
            hide={hide}
            {...divisionProps}
          />
          <DivisionStaff divisionId={divisionProps.id}/>
          <div style={{ marginTop: 10 }}>
            <Button
              kind={ButtonKinds.Danger}
              onClick={() => setIsVisibleConfirm(true)}
              icon={<Icons.IconTrash fill="currentColor" />}
            >
              Удалить подразделение
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              kind={ButtonKinds.Secondary}
              onClick={doHead}
            >
              Назначить главным
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <ConfirmDelete
        isVisible={isVisibleConfirm}
        hide={() => setIsVisibleConfirm(false)}
        onDelete={onDelete}
      />
    </>
  );
};
