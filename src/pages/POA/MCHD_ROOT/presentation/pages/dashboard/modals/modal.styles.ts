import styled from "styled-components";


 export interface ModalWrapperProps {
    top: string;
    left?: string;

  }

export const ModalWrapper = styled.div<ModalWrapperProps>`
  position: absolute;
  overflow-y: auto;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  // border: 1px solid #ddd;
  transform: translate(-50%, -50%);
  // padding: 20px;
    width: 500px;
    background-color: ${({color})=>color ?? 'white' };
    height: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1500;
`;