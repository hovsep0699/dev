import colors from './colors';

const stylesFactor = 4;
const animationTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
const { greyMedium, orange, blue, yellow, red, green, greyBold, contracts, ...rest } = colors;

let primary = orange;
if (process.env.REACT_APP_FEATURE === 'contracts') {
  primary = contracts;
}

const themeColors = {
  default: greyMedium,
  primary: primary,
  secondary: blue,
  warning: yellow,
  danger: red,
  orange: orange,
  success: green,
  disabled: greyBold,
  borderColor: '#d7d7d7',
  lightGreen: '#7dda71',
  dark: '#626265'
};

class Size {
  constructor(factor) {
    this.borderRadius = `${factor / 2}px`;
    this.fieldWidth = `${factor * 80}px`;
    this.fieldWidthHalf = `${parseInt(this.fieldWidth) / 2}px`;
    this.padding = `${factor * 4}px`;
    this.menuWidth = `${factor * 52 + parseInt(this.padding) * 2}px`;
    this.lineHeight = {
      default: `${factor * 10}px`,
      small: `${factor * 8}px`,
      large: `${factor * 12}px`
    };
    this.mainMenuWidth = `${parseInt(this.padding) * 3 + parseInt(this.lineHeight.default)}px`;
  }
}

const theme = {
  main: {
    factor: stylesFactor,
    sizes: new Size(stylesFactor),
    color: {
      ...themeColors,
      ...rest
    },
    notification: {
      background: 'rgba(232, 84, 18, 0.7)'
    },
    animation: {
      standart: `0.6s ${animationTimingFunction}`,
      fast: `0.3s ${animationTimingFunction}`,
      slow: `0.9s ${animationTimingFunction}`
    },
    shadow: {
      standart: '0 2px 5px 0 rgba(0,0,0, 0.26), 0 2px 10px 0 rgba(0,0,0, 0.06)',
      inset: 'inset 0 2px 5px 0 rgba(0,0,0, 0.26), inset 0 2px 10px 0 rgba(0,0,0, 0.06)',
      low: '0 1px 1px 0 rgba(0,0,0, 0.26), 0 1px 0 0 rgba(0,0,0, 0.06)',
      lowInset: 'inset 0 1px 2px 0 rgba(0,0,0, 0.26), inset 0 1px 4px 0 rgba(0,0,0, 0.06)',
      layer: '0 8px 17px 0 rgba(0,0,0, 0.2), 0 6px 20px 0 rgba(0,0,0, 0.19)',
      hover: '0 3px 10px rgba(0,0,0, 0.23), 0 3px 10px rgba(0,0,0, 0.16)',
      active: '0 6px 10px rgba(0,0,0, 0.23), 0 10px 30px rgba(0,0,0, 0.19)',
      selected: `0 0 6px rgba(${themeColors.primary}, 0.23), 0 10px 20px rgba(${themeColors.primary}, 0.19)`
    },
    icon: {
      size: {
        default: `${stylesFactor * 4}px`,
        small: `${stylesFactor * 3}px`,
        large: `${stylesFactor * 6}px`
      },
      font: "normal normal normal 14px/1 'themify'",
      color: {
        standart: colors.darkBold,
        grey: colors.darkLight,
        light: colors.light
      }
    },
    font: {
      family: {
        default: 'Roboto, Arial, "Helvetica Neue"'
      },
      size: {
        default: `${stylesFactor * 3.5}px`,
        small: `${stylesFactor * 3}px`,
        large: `${stylesFactor * 4}px`,
        h1: `${stylesFactor * 6}px`,
        h2: `${stylesFactor * 6}px`,
        h3: `${stylesFactor * 5}px`,
        h4: `${stylesFactor * 4.5}px`,
        h5: `${stylesFactor * 4}px`,
        h6: `${stylesFactor * 3.5}px`
      },
      weight: {
        h1: 300,
        h2: 300,
        h3: 300,
        h4: 400,
        h5: 500,
        h6: 500
      },
      color: {
        black: colors.darkBold,
        dark: colors.darkNormal,
        grey: colors.darkLight,
        white: colors.white,
        light: colors.light
      }
    }
  },
  dark: {
    notification: {
      background: 'rgba(0, 0, 0, 0.7)'
    }
  }
};

export default theme;
