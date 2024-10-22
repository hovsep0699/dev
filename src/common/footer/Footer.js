import React from 'react';
import FooterBase from './FooterBase';
import autobind from 'autobind-decorator';

class Footer extends FooterBase {
  @autobind
  renderWrapper() {
    return <footer className="footer">{this.renderLogo()}</footer>;
  }
  @autobind
  renderLogo() {
    return (
      <div className="footer-logo">
        <div className="footer-version">6.4</div>
        {this.renderCaption()}
      </div>
    ); //TODO make version actual
  }
}

export default Footer;
