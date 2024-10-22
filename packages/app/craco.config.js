module.exports = {
  babel: {
    plugins: [
      ['@babel/plugin-proposal-optional-chaining'],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      ['babel-plugin-styled-components', { displayName: true }]
    ]
  },
  style: {
    postcss: {
      plugins: [
        require('postcss-increase-specificity')({
          repeat: 5
        })
      ]
    }
  }
};
