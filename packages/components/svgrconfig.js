module.exports = {
  ext: 'tsx',
  svgoConfig: {
    plugins: [{ removeViewBox: false }]
  },
  template({ template }, opts, { imports, componentName, props, jsx, exports }) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] });
    componentName.name = componentName.name.replace(/^Svg/, 'Icon');

    return typeScriptTpl.ast`
    import React from 'react';
    const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
    export default ${componentName};
  `;
  }
};
