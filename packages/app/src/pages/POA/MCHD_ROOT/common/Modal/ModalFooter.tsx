import React from 'react';
import PropTypes from 'prop-types';
import { StyledModalFooter } from './Modal.styles';

const modalFooterPropTypes = {
  children: PropTypes.node.isRequired
};

type ModalFooterProps = PropTypes.InferProps<typeof modalFooterPropTypes>;

const ModalFooter = ({ children }: ModalFooterProps) => (
  <StyledModalFooter>{children}</StyledModalFooter>
);

ModalFooter.propTypes = modalFooterPropTypes;

export default ModalFooter;
