import React, { ReactNode } from 'react';
import styled from 'styled-components';

type AlignmentProps = {
    children: ReactNode;
    align: 'left' | 'center' | 'right';
};

const alignmentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
};

const AlignmentContainer = styled.div<{ align: 'left' | 'center' | 'right' }>`
  display: flex;
  justify-content: ${props => alignmentMap[props.align]};
`;

const Alignment: React.FC<AlignmentProps> = ({ children, align }) => {
    return <AlignmentContainer align={align}>{children}</AlignmentContainer>;
};

export default Alignment;
