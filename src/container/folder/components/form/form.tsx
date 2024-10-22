import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Button, ButtonKinds, Icons, InputField } from '@distate/components';

import { HTMLContainer } from './form.style';
import { FormSubmitAction } from '../../helpers/folder.typings';
import { Flash } from '../../../../common/flash/Flash';
import { UPDATE_FOLDER, CREATE_FOLDER } from '../../../../common/Lbl';

export interface IForm {
  defaultValue?: FormSubmitAction;
  onSubmit?: (values: FormSubmitAction) => void;
  dark?: boolean;
}

const HandleError = React.memo(({ errors }: any) => {
  const { folderName } = errors;

  if (folderName) {
    Flash.error('Значение не должно быть пустым');
  }

  return null;
});

export const FolderForm: React.FC<IForm> = ({ dark, onSubmit, defaultValue = {} }) => {
  const { id } = defaultValue;
  const Icon = id ? Icons.IconReload : Icons.IconPlus;
  const Title = id ? UPDATE_FOLDER : CREATE_FOLDER;

  const handleSubmit = (values: FormSubmitAction, { setSubmitting, resetForm }: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
    resetForm(defaultValue);
    setSubmitting(false);
  };

  return (
    <HTMLContainer>
      <Formik
        validationSchema={Yup.object({
          title: Yup.string().required()
        })}
        initialValues={{
          title: '',
          visible: true,
          ...defaultValue
        }}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form>
            <HandleError errors={errors} />
            <InputField name="title" label={dark ? '' : 'Введите имя папки'} hideErrors />
            <Button type="submit" kind={ButtonKinds.Secondary} icon={<Icon fill={'#fff'} />}>
              {Title}
            </Button>
          </Form>
        )}
      </Formik>
    </HTMLContainer>
  );
};
