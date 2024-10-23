import { Schema, UISchema } from '@distate/components/src/FormSchema/typings';

export type DefaultState = {
  title: string;
  visible: boolean;
  isDialog: boolean;
  isLoading: boolean;
  schema: {
    [name: string]: {
      schema: Schema;
      uiSchema: UISchema;
      formData: any;
    };
  };
};

export type ActionInit = {};
