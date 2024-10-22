import React from 'react';
import PropTypes from 'prop-types';
import { StyledIconClose, StyledModalHeader, CloseBtn } from './Modal.styles';

const modalHeaderPropTypes = {
  onClickCloseBtn: PropTypes.func,
  title: PropTypes.string
};

type ModalHeaderProps = PropTypes.InferProps<typeof modalHeaderPropTypes>;

const ModalHeader = ({ onClickCloseBtn, title }: ModalHeaderProps) => {
  return (
    <>
      {title && <StyledModalHeader>{title}</StyledModalHeader>}
      <CloseBtn onClick={(e)=> onClickCloseBtn ? onClickCloseBtn(e) : null}>
        <StyledIconClose />
      </CloseBtn>
    </>
  );
};

ModalHeader.propTypes = modalHeaderPropTypes;
ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
