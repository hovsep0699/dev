import React from 'react';
import styled from 'styled-components';
import { IconCheck } from '@distate/components/dist/icons';
import { ButtonKinds } from '@distate/components/dist/Button';
import { FormSchema } from '@distate/components/dist/FormSchema';

import Layout from '../../common/Layout';
import { TableUniversalInvoice } from '../../common/TableUniversalInvoice';

import { UniversalInvoiceSkeleton } from './universal-invoice.skeleton';
import { useCreateDocument } from './hooks/use-create-document';
import { HTMLButtonTrue } from './page.styles';
import { useDocument } from './hooks/use-document';

const HTMLForm = styled(FormSchema)`
  max-width: 900px;
`;

export interface UniversalInvoiceProps {}

export const UniversalInvoicePage: React.FC<UniversalInvoiceProps> = () => {
  const {
    title,
    schema,
    formData,
    uischema,
    isLoading,
    tableData,
    setFormData,
    setTableData
  } = useDocument();
  const { errors, isLoadingCreate, createDocument } = useCreateDocument();
  const { table: errorTable, ...errorForm } = errors;

  const onSubmitForm = () => {
    createDocument({ tableData, formData });
  };

  if (isLoading) {
    return <UniversalInvoiceSkeleton />;
  }

  return (
    <Layout title={title} isLoading={isLoadingCreate}>
      <HTMLForm
        schema={schema}
        errorSchema={errorForm}
        formData={formData}
        uiSchema={uischema}
        onChange={setFormData}
        children={null}
      />
      <TableUniversalInvoice onChange={setTableData} values={tableData} errors={errorTable} />
      <HTMLButtonTrue
        kind={ButtonKinds.Primary}
        icon={<IconCheck style={{ fill: 'currentcolor' }} />}
        onClick={onSubmitForm}
      >
        Создать корректировку
      </HTMLButtonTrue>
    </Layout>
  );
};
