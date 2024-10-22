import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Skeleton } from '@distate/components/dist/Skeleton';

import Layout from '../../common/Layout';
import { CREATE_INVOICE, EDIT_INVOICE } from '../../common/Lbl';

const HTMLSkeleton = styled(Skeleton)`
  margin-bottom: 18px;
`;

const HTMLField = styled.div`
  display: flex;
`;

const skeletonField = () => (
  <HTMLField>
    <HTMLSkeleton width={960} height={42} />
  </HTMLField>
);

export interface CorrectionDocumentSkeletonProp {}

export const CorrectionDocumentSkeleton: FC<CorrectionDocumentSkeletonProp> = () => {
  const { id } = useParams();
  return (
    <Layout title={id ? EDIT_INVOICE : CREATE_INVOICE}>
      {skeletonField()}
      <HTMLSkeleton width={660} height={42} style={{ marginLeft: 330 }} />
      {skeletonField()}
      {skeletonField()}
      {skeletonField()}
      <HTMLSkeleton width={660} height={42} />
      <HTMLSkeleton width={660} height={42} />
      <HTMLSkeleton width={660} height={42} />
      <HTMLSkeleton width={660} height={42} />
      {skeletonField()}
      {skeletonField()}
      <HTMLSkeleton width={1480} height={230} />
    </Layout>
  );
};
