import React from 'react';
import styled from 'styled-components';

import { HTMLLabel, HTMLLabelName, HTMLContent, HTMLRequerid } from './style';

const HTMLContainer = styled.div<any>(({ $width }) => {
  return {
    width: $width || '100%',
    display: 'flex',
    padding: '2px 0'
  };
});

export interface ITemplateBaseProps {
  label?: string;
  title?: string;
  align?: string;
  required: boolean;
  className?: string;
  uiSchema?: Record<string, any>;
  content: React.ReactNode;
}

const TemplateBase: React.FC<ITemplateBaseProps> = ({
  className,
  align,
  label,
  content,
  uiSchema = {},
  required
}) => {
  const { width } = uiSchema;
  return (
    <>
      <HTMLContainer className={className} $width={width}>
        {label !== undefined && (
          <HTMLLabel>
            <HTMLLabelName>
              {required ? <HTMLRequerid>*</HTMLRequerid> : null}
              {label}
            </HTMLLabelName>
          </HTMLLabel>
        )}
        <HTMLContent $align={align}>{content}</HTMLContent>
      </HTMLContainer>
    </>
  );
};

export { TemplateBase };
