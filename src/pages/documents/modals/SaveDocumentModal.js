import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../common/modal/Modal';
import Button, { PRIMARY } from '../../../common/Button';
import {
  CANCEL,
  SAVE,
  SAVE_DOC_WITH_ERRORS,
  SAVE_DOC_WITH_ERRORS_QUESTION
} from '../../../common/Lbl';

const SaveDocumentModal = props => {
  return (
    <Modal isVisible={props.visible} hide={props.hide} className="small">
      <Modal.Header />
      <Modal.Body>
        <div className="popup-label save"></div>
        <div className="title">{SAVE_DOC_WITH_ERRORS}</div>
        <div className="second_title">{SAVE_DOC_WITH_ERRORS_QUESTION}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button colorClass={PRIMARY} iconClass="icon-accept" className="left" onClick={props.agree}>
          {SAVE}
        </Button>
        <Button iconClass="icon-close" className="left" onClick={props.hide}>
          {CANCEL}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

SaveDocumentModal.propTypes = {
  visible: PropTypes.bool,
  agree: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired
};

export default SaveDocumentModal;
