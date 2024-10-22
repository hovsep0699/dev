const path = require('path');

const pathToInlineSvg = path.resolve(__dirname, '../src/icons');

module.exports = {
  stories: ['../src/**/*.stories.*'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-backgrounds'
  ],
  webpackFinal: async config => {
    const rules = config.module.rules;

    // add typescript support
    rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-react',
          '@babel/preset-typescript'
        ],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  }
};
