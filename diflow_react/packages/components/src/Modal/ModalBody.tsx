import React from 'react';
import PropTypes from 'prop-types';
import { StyledModalBody } from './Modal.styles';

const modalBodyPropTypes = {
  overflow: PropTypes.bool
};

type ModalBodyProps = PropTypes.InferProps<typeof modalBodyPropTypes> & {
  children: React.ReactNode;
};

const ModalBody = ({ children }: ModalBodyProps) => <StyledModalBody>{children}</StyledModalBody>;

ModalBody.propTypes = modalBodyPropTypes;

export default ModalBody;
