import React, { Component } from 'react';
import ProcessorCertificateListItem from '../components/certificate/ProcessorCertificateListItem';
import CertificateList from '../components/certificate/CertificateList';
import NoCert from '../components/certificate/NoCert';
import { Loading } from '@distate/components';
import PluginError from '../components/certificate/PluginError';
import classNames from 'classnames';
import Flash from '../../../common/flash/Flash';
import DiError from '@distate/core/dist/application/error/Error';
import { CERT_DISABLED_HINT, CERT_IS_OUTDATED_HINT } from '../../../common/Lbl';
import Certificate from '@distate/core/dist/domain/common/Certificate';
import {
  INIT,
  LIST_CERTS,
  CERT_INFO,
  CERT_IDS,
  CERT_INFO_ALL
} from '@distate/core/dist/application/certificate/get/Steps';
import { assert } from 'chai';
import { CERTS_ERR, PLUGIN_ERR } from '../../../common/Lbl';

class CertFormBase extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      currentCertIndex: 0,
      selectedCertificate: null,
      certificates: [],
      isLoading: true,
      certificateError: '',
      errorMsg: ''
    };

    this.getCertByIndex = (certificates, index) => {
      if (certificates.length === 0) return '';
      if (index >= certificates.length) return '';
      if (index < 0) return '';
      return certificates[index];
    };
    this.getCertIndexByThumb = (certificates, thumbprint) => {
      let certIndex = 0;
      certificates.forEach((value, index) => {
        if (value.thumbprint === thumbprint) {
          certIndex = index;
        }
      });
      return certIndex;
    };

    this.renderCertificates = this.renderCertificates.bind(this);
    this.handlePluginError = this.handlePluginError.bind(this);
    this.selectCertificate = this.selectCertificate.bind(this);
    this.handleCertsFromService = this.handleCertsFromService.bind(this);
    this.listKeyDown = this.listKeyDown.bind(this);

    this.submitBtnClasses = classNames({
      'ds-button': true,
      'color-primary': true,
      'height-large': true,
      'width-fluid-full': true
    });
  }
  resetCertificates() {
    this.setState({ currentCertIndex: 0, isLoading: true });
  }
  handleCertsFromService(certificates) {
    if (this._isMounted) {
      this.setState({
        certificates,
        selectedCertificate: this.getCertByIndex(certificates, this.state.currentCertIndex),
        isLoading: false,
        certificateError: ''
      });
    }
  }
  listKeyDown(event) {
    let index = this.state.currentCertIndex;

    switch (event.key) {
      case 'Up':
      case 'ArrowUp':
        index--;
        break;
      case 'Down':
      case 'ArrowDown':
        index++;
        break;
      default:
        return;
    }

    let cert = this.getCertByIndex(this.state.certificates, index);
    if (cert) {
      this.setState({
        currentCertIndex: index,
        selectedCertificate: cert
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  selectCertificate(event) {
    const currentCertIndex = this.getCertIndexByThumb(
      this.state.certificates,
      event.currentTarget.dataset.id
    );
    this.setState({
      selectedCertificate: this.state.certificates[currentCertIndex],
      currentCertIndex: currentCertIndex
    });
  }
  getCertificateDisabledHint(certificate) {
    assert.instanceOf(certificate, Certificate);
    if (certificate.isOutdated) {
      return CERT_IS_OUTDATED_HINT;
    } else if (!certificate.isActive) {
      return CERT_DISABLED_HINT;
    } else {
      return '';
    }
  }
  renderCertificates() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.certificates.length) {
      const certs = this.state.certificates.map(certificate => {
        const disabledHint = this.getCertificateDisabledHint(certificate);
        const isActive = !disabledHint;
        const isSelected = certificate.thumbprint === this.state.selectedCertificate.thumbprint;

        return ProcessorCertificateListItem.getTransformation(
          certificate,
          isSelected,
          this.selectCertificate,
          isActive,
          disabledHint
        );
      });
      return <CertificateList listKeyDown={this.listKeyDown}>{certs}</CertificateList>;
    }
    if (this.state.certificateError) {
      return (
        <PluginError
          errorText={this.state.certificateError}
          showLink={this.state.certificateError === INIT}
        />
      );
    }
    return this.renderNoCert();
  }
  renderNoCert() {
    return <NoCert />;
  }
  handleErrorStep(error, defaultMessage) {
    switch (error.jsError.step) {
      case INIT:
        let errorMsg = defaultMessage;
        if (error.jsError.pluginName) {
          errorMsg += ` ${error.jsError.pluginName}`;
        }
        return errorMsg;
      case LIST_CERTS:
        return null;
      case CERT_IDS:
      case CERT_INFO:
      case CERT_INFO_ALL:
        return CERTS_ERR;
      default:
        return defaultMessage;
    }
  }
  handlePluginError(error) {
    let errorMsg = PLUGIN_ERR;

    if (error instanceof DiError) {
      if (error.jsError.step) {
        errorMsg = this.handleErrorStep(error, errorMsg);
      }
      if (!error.jsError.pluginName) {
        Flash.error(error);
      }
    }
    this.setState({ isLoading: false, certificateError: errorMsg });
  }
  render() {
    return <span>Must be rendered in subclass</span>;
  }
}

export default CertFormBase;
