import React from 'react';
import get from 'lodash.get';
import styled from 'styled-components';

import { HTMLRequerid, HTMLTitle, HTMLLabel, HTMLLabelName } from './style';

const HTMLContainer = styled.div<any>(({ $width }) => {
  return {
    display: 'flex',
    width: $width,
    paddingTop: 2,
    paddingBottom: 3,
    marginLeft: -3,
    marginRight: -3
  };
});

const HTMLItem = styled.div(() => {
  return {
    paddingLeft: 3,
    paddingRight: 3
  };
});

export interface ITemplateGroupProps {
  label?: string;
  title?: string;
  className?: string;
  required: boolean;
  uiSchema?: Record<string, string>;
  content: React.ReactNode;
  groupProps?: { type: string; width: string[]; fields: string[] };
}

const TemplateGroup: React.FC<ITemplateGroupProps> = React.memo(
  ({ title, className, label, content, required, groupProps }) => {
    const childs = React.Children.toArray(content);
    const width = 100 / childs.length;

    return (
      <>
        {title && <HTMLTitle>{title}</HTMLTitle>}
        <HTMLContainer className={className}>
          {label !== undefined && (
            <HTMLLabel>
              <HTMLLabelName>
                {required ? <HTMLRequerid>*</HTMLRequerid> : null}
                {label}
              </HTMLLabelName>
            </HTMLLabel>
          )}
          {childs.map((child, i) => {
            const uiWidth = get(groupProps, ['width', i]);

            return (
              <HTMLItem key={i} style={{ width: uiWidth || `${width}%` }}>
                {child}
              </HTMLItem>
            );
          })}
        </HTMLContainer>
      </>
    );
  }
);

export { TemplateGroup };
