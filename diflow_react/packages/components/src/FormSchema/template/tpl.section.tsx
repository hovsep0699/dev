import React from 'react';
import styled from 'styled-components';

import { HTMLTitle } from './style';

const HTMLContainer = styled.div<any>(({ $align, $border }) => {
  let alignItems = 'flex-start';
  switch ($align) {
    case 'center':
      alignItems = 'center';
      break;
    case 'right':
      alignItems = 'flex-end';
      break;
  }

  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems,
    paddingTop: 2,
    paddingBottom: 16,
    width: '100%',
    margin: '16px -3px',
    borderBottom: $border ? '1px solid #d7d7d7' : 0
  };
});

export interface ITemplateSectionProps {
  className?: string;
  content: React.ReactNode;
  groupProps?: { type: string; title: string; align: string; border: boolean; fields: string[] };
}

const TemplateSection: React.FC<ITemplateSectionProps> = React.memo(
  ({ className, content, groupProps = {} }) => {
    const childs = React.Children.toArray(content);
    const { align = 'left', border = true, title } = groupProps;

    return (
      <>
        {title && <HTMLTitle $align={align}>{title}</HTMLTitle>}
        <HTMLContainer className={className} $align={align} $border={border}>
          {childs}
        </HTMLContainer>
      </>
    );
  }
);

export { TemplateSection };
