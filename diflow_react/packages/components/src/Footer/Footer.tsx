import React from 'react';
import Core from '@distate/core/dist/application/Core';

import {
  StyledFooter,
  StyledFooterLogo,
  FooterCaption,
  StyledFooterLogoCentered,
  StyledFooterCentered
} from './Footer.styles';

export type StyledFooterTypes = {
  centered?: boolean;
  hasIncreasedIndent?: boolean;
};

const caption = (
  <FooterCaption>
    © 2009—{new Date().getFullYear()}. Разработано в <a href="http://distate.ru">ООО «ДиСтэйт»</a>.
    Все права защищены.
  </FooterCaption>
);

const Footer = ({ centered = false, hasIncreasedIndent = false }: StyledFooterTypes) => {
  if (centered) {
    return (
      <StyledFooterCentered>
        <StyledFooterLogoCentered />
        {caption}
      </StyledFooterCentered>
    );
  }

  const param = Core.parameters;
  return (
    <StyledFooter hasIncreasedIndent={hasIncreasedIndent}>
      <StyledFooterLogo>
        <div>{param ? param.version : 6.6}</div>
        {caption}
      </StyledFooterLogo>
    </StyledFooter>
  );
};

export default Footer;
