import React, { FC } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@distate/components/dist/Skeleton';

const HTMLWrapper = styled.div`
  padding: 12px;
  min-height: 600px;
`;

export const PageOperatorSkeleton: FC = () => (
  <HTMLWrapper>
    <Skeleton height={40} />
    <Skeleton height={40} />
    <Skeleton height={40} />
  </HTMLWrapper>
);

export const PageOperatorCompanySkeleton: FC = () => <Skeleton height={40} />;
