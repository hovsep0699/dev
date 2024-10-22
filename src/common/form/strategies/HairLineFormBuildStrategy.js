import FormBuildStrategy from './FormBuildStrategy';
import React from 'react';

class HairLineFormBuildStrategy extends FormBuildStrategy {
  build(
    { groupDomainVO, builderMap, builder, appearance, behaviors, appearances, buildedFields },
    isVisible = false
  ) {
    const visibleStyle = { display: isVisible ? 'block' : 'none' };
    if (groupDomainVO.VOs) {
      const noCaption = appearance?.noCaption;
      return groupDomainVO.VOs.map((DomainVO, index) => {
        const showGroupHeader = index === 0 && groupDomainVO.VOs.length > 1 && !noCaption;
        return (
          <React.Fragment>
            {showGroupHeader && (
              <React.Fragment>
                <hr style={visibleStyle} />
                <h3 style={visibleStyle}>{groupDomainVO.name}</h3>
              </React.Fragment>
            )}
            {this.build(
              {
                groupDomainVO: DomainVO,
                builderMap,
                builder,
                behaviors,
                appearances,
                buildedFields
              },
              isVisible
            )}
          </React.Fragment>
        );
      });
    } else {
      const groupField = groupDomainVO.field;
      const buildElement = builderMap[groupField];
      buildedFields.push(groupField);
      return (
        buildElement && (
          <li style={visibleStyle}>
            {buildElement.call(
              builder,
              groupDomainVO,
              behaviors[groupField],
              appearances[groupField]
            )}
          </li>
        )
      );
    }
  }
}

export default HairLineFormBuildStrategy;
