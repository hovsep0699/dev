import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconCheck } from '@distate/components/dist/icons';
import { ButtonKinds } from '@distate/components/dist/Button';
import { FormSchema } from '@distate/components/dist/FormSchema';

import Layout from '../../common/Layout';
import SaveDocumentModal from '../documents/modals/SaveDocumentModal';
import { TableUniversalCorrection } from '../../common/TableUniversalCorrection';

import { schemaFooter, uischemaFooter } from './helpers/schema.ucd';
import { CorrectionDocumentSkeleton } from './universal-correction-document.skeleton';
import { useUCDCreate } from './hooks/use-ucd-create';
import { useUCD } from './hooks/use-ucd';
import { HTMLButtonTrue } from './page.styles';

const HTMLForm = styled(FormSchema)`
  max-width: 900px;
`;

export interface UniversalCorrectionDocumentProps {}

export const UniversalCorrectionDocumentPage: React.FC<UniversalCorrectionDocumentProps> = () => {
  const [visible, setVisible] = useState(false);
  const { isLoadingCreate, createErrors, createUCD } = useUCDCreate();
  const {
    rawUCD,
    title,
    schema,
    uischema,
    formData,
    isLoading,
    formTable,
    formTableDefault,
    setFormData,
    setFormTable
  } = useUCD();

  useEffect(() => {
    if (createErrors.length) {
      setVisible(true);
    }
  }, [createErrors]);

  const onSubmitForm = () => createUCD({ UCD: rawUCD, formData, formTable });
  const onSaveCancel = () => setVisible(false);
  const onSaveForce = () => {
    setVisible(false);
    createUCD({ UCD: rawUCD, formData, formTable, force: true });
  };

  if (isLoading) return <CorrectionDocumentSkeleton />;

  const {
    basisDocuments,
    transferDocuments,
    operationInformation,
    additionalInformation,
    ...formDataMain
  } = formData;

  const formDataFooter = {
    basisDocuments,
    transferDocuments,
    operationInformation,
    additionalInformation
  };

  return (
    <Layout title={title} isLoading={isLoadingCreate}>
      <HTMLForm
        schema={schema}
        formData={formDataMain}
        uiSchema={uischema}
        errorSchema={createErrors}
        onChange={setFormData}
        children={null}
      />
      <TableUniversalCorrection
        values={formTable}
        errors={createErrors}
        onChange={setFormTable}
        defaultValue={formTableDefault}
      />
      <HTMLForm
        schema={schemaFooter}
        formData={formDataFooter}
        uiSchema={uischemaFooter}
        errorSchema={createErrors}
        onChange={setFormData}
        children={null}
      />
      <HTMLButtonTrue
        kind={ButtonKinds.Primary}
        icon={<IconCheck style={{ fill: 'currentcolor' }} />}
        onClick={onSubmitForm}
        toogleTheme
      >
        Создать корректировку
      </HTMLButtonTrue>
      <SaveDocumentModal visible={visible} hide={onSaveCancel} agree={onSaveForce} />
    </Layout>
  );
};
