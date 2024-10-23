import theme from './theme';
import colors from './colors';
import { tint, darken } from 'polished';

const tableStyles = `
  color: ${theme.main.font.color.black};
  font-weight: 500;
  border-top: 2px solid ${theme.main.color.borderColor};
  border-bottom: 2px solid ${theme.main.color.borderColor};
  padding: ${parseInt(theme.main.sizes.padding) / 2}px;
  text-transform: uppercase;
  font-size: ${theme.main.font.size.small};
  line-height: ${parseInt(theme.main.sizes.lineHeight.default) / 2}px;
  vertical-align: bottom;

  span {
    font-size: ${theme.main.font.size.small};
    line-height: ${parseInt(theme.main.sizes.lineHeight.default) / 2}px;
  }
`;

const grommetTheme = {
  global: {
    font: {
      size: theme.main.font.size.default,
      height: 'normal',
      family: theme.main.font.family.default
    },
    focus: {
      border: {
        color: 'none'
      }
    }
  },
  accordion: {
    hover: {
      heading: {
        color:'#b6b6b6'
      }
    },
    icons: {
      color: '#b6b6b6'
    },
    border: {
      color: '#b6b6b6'
    },
    panel: {
      border: {
        size: 'large',
        style: 'double',
        // color: '#b6b6b6'
      }
    }
  },
  anchor: {
    textDecoration: 'underline',
    fontWeight: 400,
    color: {
      light: colors.darkBlue
    },
    hover: {
      textDecoration: 'underline',
      extend: `
        color: ${tint(0.1, colors.darkBlue)};
      `
    },
    extend: `
      border-color: transparent;
      outline-color: transparent;
      box-shadow: none;

      &:active {
        color: ${tint(0.1, theme.main.color.secondary)};
      }

      &:visited {
        color: ${darken(0.5, colors.greyBolder)};

        &:hover {
          color: ${tint(0.1, colors.darkBlue)};
        }

        &:active {
          color: ${tint(0.1, theme.main.color.secondary)};
        }
      }
    `
  },
  table: {
    header: {
      extend: tableStyles
    },
    body: {
      extend: `
        padding: ${parseInt(theme.main.sizes.padding) / 2}px;
        color: ${theme.main.font.color.black};
        font-size: ${theme.main.font.size.default};
        line-height: normal;
        font-weight: 400;

        span {
          line-height: normal;
        }
      `
    },
    footer: {
      extend: `
        ${tableStyles}

        span {
          font-weight: 500;
        }
    `
    }
  }
};

export default grommetTheme;
