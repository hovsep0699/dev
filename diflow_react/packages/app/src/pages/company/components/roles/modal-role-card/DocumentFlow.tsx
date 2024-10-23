import React, { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionPanel, Box } from 'grommet';
import { Button, Icons, ButtonKinds } from '@distate/components';
import { getDocumentFlowRoles, saveDocumentFlowRoles } from '../../../store/actions';
import { selectDocumentFlowRoles } from '../../../store/selectors';
import { FlowCheckBox } from './FlowCheckBox';
import { DeletionConfirmation } from './DeletionConfirmation';

type FlowElement = {
  enabled: boolean;
  role: {
    description: string;
    id: number;
    systemName: string;
    title: string;
  };
};

type Props = {
  id: number;
  roleCardHide: Function;
};
/** Документооборот - карточка роли */
export const DocumentFlow = (props: Props) => {
  const { id, roleCardHide } = props;

  const dispatch = useDispatch();
  const flow: any = useSelector(selectDocumentFlowRoles);
  const [checked, setChecked] = useState<number[]>([]);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  /** возвращает список всех отмеченных id */
  const getAllChecked = (flow: any): number[] => {
    const allChecked: number[] = [];
    for (let key in flow) {
      flow[key].forEach((item: FlowElement) => {
        item?.enabled && allChecked.push(item.role.id);
      });
    }
    return allChecked;
  };

  /** получение всех отмеченных id */
  useEffect(() => {
    const allChecked = getAllChecked(flow);
    setChecked(allChecked);
  }, [flow, id]);

  useEffect(() => {
    id && dispatch(getDocumentFlowRoles({ groupId: id }));
  }, [dispatch, id]);

  const accordions: ReactElement[] = [];

  /** Возвращает строку - первая буква заглавная */
  const firstLetter = (text: string): string => {
    const textArr = text.split('');
    textArr[0] = textArr[0].toUpperCase();
    return textArr.join('');
  };

  for (let key in flow) {
    accordions.push(
      <Accordion key={key} multiple={false} focusIndicator={false}>
        <AccordionPanel label={<Box>{firstLetter(key)}</Box>} style={{ background: '#f3f3f3' }}>
          {flow[key].map((item: FlowElement) => {
            const { enabled, role } = item;
            const { title, id } = role;
            return (
              <FlowCheckBox
                key={id}
                enabled={enabled}
                title={title}
                id={id}
                checked={checked}
                setChecked={setChecked}
              />
            );
          })}
        </AccordionPanel>
      </Accordion>
    );
  }

  /** сохранить изменения */
  const onSave = () => {
    dispatch(saveDocumentFlowRoles({ groupId: id, roolsId: checked }));
  };

  return (
    <div>
      <h3 className="header">Документооборот</h3>
      {accordions.map((item: ReactElement) => item)}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
        <Button
          icon={<Icons.IconTrash fill="currentColor" />}
          kind={ButtonKinds.Danger}
          onClick={() => setIsVisibleConfirm(true)}
        >
          Удалить роль
        </Button>
        <Button
          icon={<Icons.IconSave fill="currentColor" />}
          kind={ButtonKinds.LightGreen}
          onClick={onSave}
        >
          Обновить роль
        </Button>
      </div>
      <DeletionConfirmation
        isVisible={isVisibleConfirm}
        hide={() => setIsVisibleConfirm(false)}
        id={id}
        roleCardHide={roleCardHide}
      />
    </div>
  );
};
