import React from 'react';
import {
  Button,
  ButtonKinds,
  Icons,
  InputField,
  CheckboxField
} from '@distate/components';
import changeIconFill from '../../../utils/changeIconFill';
import { CREATE_FOLDER, UPDATE_FOLDER } from '../../Lbl';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import Flash from '../../flash/Flash';
import { connect } from 'react-redux';
import createFolder from '../actions/createFolder';
import editFolder from '../actions/editFolder';

type FolderFormFieldsTypes = {
  folderName: string;
  showFolder: boolean;
};

type FormWrapperProps = {
  dark: boolean;
};

const FormWrapper = styled.div<FormWrapperProps>`
  padding-left: ${({ theme, dark }) => !dark && theme.main.sizes.padding};
  padding-right: ${({ theme, dark }) => !dark && theme.main.sizes.padding};
`;

const StyledIconPlus = changeIconFill(Icons.IconPlus);
const StyledIconReload = changeIconFill(Icons.IconReload);

function FoldersForm({ createFolder, editFolder, editFolderData, dark }: any) {
  const validate = (values: FolderFormFieldsTypes) => {
    const errors = {} as FolderFormFieldsTypes;
    if (!values.folderName) {
      const errorMsg: string = 'Значение не должно быть пустым';
      errors.folderName = errorMsg;
      Flash.error(errorMsg);
    }
    return errors;
  };

  const handleSubmit = (
    values: FolderFormFieldsTypes,
    { setSubmitting }: { setSubmitting: any }
  ) => {
    const { folderName, showFolder } = values;
    if (editFolderData) {
      editFolder(editFolderData.id, showFolder, folderName);
    } else {
      createFolder(folderName, showFolder);
    }
    setSubmitting(false);
  };

  return (
    <FormWrapper dark={dark}>
      <Formik
        initialValues={{
          folderName: editFolderData?.title || '',
          showFolder: true
        }}
        validate={validate}
        validateOnBlur
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        <Form>
          <InputField name="folderName" label={!dark ? 'Введите имя папки' : ''} hideErrors />
          <CheckboxField name="showFolder" label="Показывать в списке" dark={dark} />
          {editFolderData ? (
            <Button type="submit" kind={ButtonKinds.Secondary} icon={<StyledIconReload />}>
              {UPDATE_FOLDER}
            </Button>
          ) : (
            <Button type="submit" kind={ButtonKinds.Secondary} icon={<StyledIconPlus />} fullWidth>
              {CREATE_FOLDER}
            </Button>
          )}
        </Form>
      </Formik>
    </FormWrapper>
  );
}

const mapDispatchToProps = {
  createFolder,
  editFolder
};

export default connect(null, mapDispatchToProps)(FoldersForm);
