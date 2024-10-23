import React from 'react';
import { Overlay, Loader, Container, Spinner } from './Loading.styles';

export interface ILoading {
  className?: string;
  isRelative?: boolean;
  height?: string | number;
}

const Loading = ({ className, isRelative = true, height = '64px' }: ILoading) => (
  <Overlay
    className={className}
    isRelative={isRelative}
    style={{ height: isRelative ? height : 'auto' }}
  >
    <Loader>
      <Container>
        <Spinner />
      </Container>
    </Loader>
  </Overlay>
);

export default Loading;
