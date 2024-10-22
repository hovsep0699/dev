import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icons, ButtonKinds } from '@distate/components';
import { getSelectedTariffFlow, updateTariffFlow } from '../../store/actions';
import { selectedTariffFlowSelector, currentIsPromotionSelector } from '../../store/selects';
import { DocumentFlowItem } from './DocumentFlowItem';

type Props = {
  tariffId: number;
};

type FlowItem = {
  cost: number;
  flow_id: number;
  id: number;
  system_name: string;
  title: string;
};

export type EditedFlowItem = {
  tariffId: number;
  flowId: number;
  cost: number;
};

/** блок карточки тарифа - Документооборот */
export const DocumentFlow = (props: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const { tariffId } = props;

  const dispatch = useDispatch();

  const flow = useSelector(selectedTariffFlowSelector);
  const isPromotion = useSelector(currentIsPromotionSelector);

  useEffect(() => {
    dispatch(getSelectedTariffFlow(tariffId));
    setIsEditing(false);
  }, [dispatch, tariffId]);

  const [editedFlow, setEditedFlow] = useState<EditedFlowItem[]>([]);

  const onSave = () => {
    dispatch(updateTariffFlow(editedFlow));
    setIsEditing(false);
  };

  return (
    <div className="tariff-card-block" style={{ marginTop: 15 }}>
      <span className="tariff-info-title">Документооборот</span>

      <div className="tariff-card-flow-wrapper">
        {flow?.map((item: FlowItem) => {
          const { id, title, cost, flow_id } = item;

          return (
            <div key={id} className="tariff-card-flow-row">
              <div>{title}</div>
              <div className="tariff-card-flow-cost">
                {isEditing ? (
                  <DocumentFlowItem
                    cost={cost}
                    flowId={flow_id}
                    setEditedFlow={setEditedFlow}
                    tariffId={tariffId}
                  />
                ) : (
                  <div>
                    {(Number(cost) / 100).toFixed(2)} {isPromotion ? 'док.' : 'р.'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '20px 0' }}>
        <div style={{ padding: '20px 0' }}>
          {isEditing ? (
            <>
              <Button
                icon={<Icons.IconSave fill="currentColor" />}
                kind={ButtonKinds.LightGreen}
                onClick={onSave}
                style={{ marginRight: 5 }}
              >
                Сохранить
              </Button>

              <Button
                icon={<Icons.IconClose fill="currentColor" />}
                kind={ButtonKinds.Danger}
                onClick={() => setIsEditing(false)}
              >
                Отмена
              </Button>
            </>
          ) : (
            <Button
              icon={<Icons.IconPencil fill="currentColor" />}
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
