import styled from 'styled-components';

export interface IStyledFooter {
  hasIncreasedIndent?: boolean;
}

export const StyledFooter = styled.footer<IStyledFooter>`
  font-family: Roboto, Arial, 'Helvetica Neue';
  position: absolute;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  margin-left: ${({ theme, hasIncreasedIndent }) =>
    parseInt(theme.main.sizes.mainMenuWidth) +
    (hasIncreasedIndent ? parseInt(theme.main.sizes.menuWidth) : 0)}px;
  padding-left: ${({ theme }) => parseInt(theme.main.sizes.padding) * 2}px;
  height: ${({ theme }) =>
    parseInt(theme.main.sizes.lineHeight.default) + parseInt(theme.main.sizes.padding) * 3}px;
  line-height: 1.2;
`;

export const StyledFooterCentered = styled.div`
  display: block;
  position: fixed;
  bottom: ${({ theme }) => theme.main.sizes.padding};
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

export const StyledFooterLogo = styled.div`
  position: absolute;
  box-sizing: content-box;
  top: ${({ theme }) => parseInt(theme.main.sizes.padding) / 2}px;
  bottom: 0;
  margin: ${({ theme }) => parseInt(theme.main.sizes.padding) / 2}px 0 0;
  padding-top: 25px;
  padding-left: 35px;
  background: url(/bundles/diflowcore/images/f-logo-dark.png) 0 0 no-repeat;
  width: 400px;
  height: 25px;
  font-size: 11px;
  color: ${({ theme }) => theme.main.font.color.black};
`;

export const StyledFooterLogoCentered = styled.div`
  display: block;
  margin: auto;
  width: 150px;
  height: 40px;
  background: url(/bundles/diflowcore/images/f-logo-dark.png) center no-repeat;
`;

export const FooterCaption = styled.p`
  box-sizing: border-box;
  color: ${({ theme }) => theme.main.color.darkLight};
  font-size: ${({ theme }) => theme.main.font.size.small};
  font-weight: 400;
  margin: 0;
`;
