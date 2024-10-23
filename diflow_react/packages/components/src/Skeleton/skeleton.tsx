import React from 'react';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
      background-position: 100% 50%;
  }
  100% {
      background-position: 0 50%;
  }
`;

const HTMLSkeleton = styled.div<any>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  margin-top: 16px;
  animation: ${loading} 1.4s ease infinite;
  background: linear-gradient(
    90deg,
    hsla(0, 0%, 74.5%, 0.2) 25%,
    hsla(0, 0%, 50.6%, 0.24) 37%,
    hsla(0, 0%, 74.5%, 0.2) 63%
  );
  background-size: 400% 100%;
`;

const fixNumber = (val: string | number) => (typeof val === 'number' ? `${val}px` : val);

export interface SkeletonProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  style,
  width = '100%',
  height = 20
}) => (
  <HTMLSkeleton
    className={className}
    style={style}
    $width={fixNumber(width)}
    $height={fixNumber(height)}
  />
);
