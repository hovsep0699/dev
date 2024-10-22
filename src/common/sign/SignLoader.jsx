import React, { Component } from 'react';
import SignService from '@distate/core/dist/application/sign/SignService';
import SecurityService from '@distate/core/dist/application/security/SecurityService';
import DocumentsService from '@distate/core/dist/application/documents/common/DocumentsService';
import Core from '@distate/core/dist/application/Core';
import SignFullPageLoader from './SignFullPageLoader';
import SignProcessBar from './SignProcessBar';

class SignLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 0,
      total: 0,
      documentTitle: '',
      isAutoMode: true,
      documentsList: []
    };
  }

  componentDidMount() {
    this.setSignMode();
    SignService.events.subscribe('checkSigningList', this.updateDocumentsList);
    SignService.events.subscribe('startSignProcess', this.handleSignProcessStart); //TODO change events to startSignReceiptsProcess
    SignService.events.subscribe('startSignProcessIteration', this.handleSignProcessIteration);
    SignService.events.subscribe('endSignProcess', this.handleSignProcessEnd);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isAutoMode !== prevState.isAutoMode) {
      if (!this.state.isAutoMode) {
        this.updateDocumentsList();
      }
    }
  }

  componentWillUnmount() {
    SignService.events.unsubscribe('checkSigningList', this.updateDocumentsList);
    SignService.events.unsubscribe('startSignProcess', this.handleSignProcessStart);
    SignService.events.unsubscribe('startSignProcessIteration', this.handleSignProcessIteration);
    SignService.events.unsubscribe('endSignProcess', this.handleSignProcessEnd);
  }

  setSignMode() {
    const isAutoMode = SecurityService.hasRole('ROLE_RECEIPTS_AUTOSIGNING');
    this.setState({ isAutoMode });
  }

  updateDocumentsList = async () => {
    const documents = await SignService.getReceiptsForSigningList();
    this.setState({ total: documents.length, documentsList: documents });
  };

  handleSignProcessStart = data => {
    if (data.total) {
      this.setState({ total: data.total });
    }
  };

  handleSignProcessIteration = data => {
    if (data.counter) {
      this.setState({
        currentCount: data.counter,
        documentTitle: this.createDocumentTitle(data)
      });
    }
  };

  handleSignProcessEnd = () => {
    if (this.state.isAutoMode) {
      this.setState({ total: 0, currentCount: 0, documentTitle: '' });
    } else {
      this.setState({ currentCount: 0, documentTitle: '' }, this.updateDocumentsList);
    }
  };

  startManualSigning = async () => {
    const res = await Core.startReceiptsManualSigning(this.state.documentsList);
    if (res.isAborted) this.handleSignProcessEnd();
  };

  abortManualSigning = () => {
    SignService.events.notify('abortSigning');
  };

  createDocumentTitle(data) {
    const document = data.documentToSign;
    const flowTypeTitle = DocumentsService.getTitle(document.flow_group);
    const docTypeTitle = document.type_title ? ` - ${document.type_title}` : '';
    return `${flowTypeTitle}${docTypeTitle}`;
  }

  render() {
    const { currentCount, total, documentTitle } = this.state;
    if (this.state.isAutoMode) {
      return (
        <SignFullPageLoader
          currentCount={currentCount}
          total={total}
          documentTitle={documentTitle}
        />
      );
    } else {
      return (
        <SignProcessBar
          currentCount={currentCount}
          total={total}
          documentTitle={documentTitle}
          abortHandler={this.abortManualSigning}
          signHandler={this.startManualSigning}
        />
      );
    }
  }
}

export default SignLoader;
