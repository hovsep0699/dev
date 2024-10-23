import React from 'react';
import { useDispatch } from 'react-redux';

import { actionVisible, actionTitle, actionSchema } from '../../store/actions';
import { Schema, UISchema } from '@distate/components/src/FormSchema/typings';

export interface IFilterDialogProps {
  title: string;
  schema: Schema;
  uiSchema?: UISchema;
  formData?: any;
}

const FilterDialog: React.FC<IFilterDialogProps> = ({ title, schema, uiSchema, formData }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionVisible({ visible: true }));
    dispatch(actionTitle({ title }));
    dispatch(actionSchema({ schema: { topbar: { schema, uiSchema, formData } } }));
    return () => {
      dispatch(actionVisible({ visible: false }));
    };
  }, [dispatch, title, formData, schema, uiSchema]);

  return null;
};

export { FilterDialog };
