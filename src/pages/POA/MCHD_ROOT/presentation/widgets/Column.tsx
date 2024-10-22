import React from 'react';
import styled from 'styled-components';
import {EdgeInsets} from "../utils/EdgeInsets";


interface ColumnProps {
    crossAxisAlignment?: 'start' | 'center' | 'end' | 'stretch';
    mainAxisAlignment?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    padding?: EdgeInsets;
    gap?: string;
    height?: string;
    width?: string;
    fullWidth?: boolean;
    fullHeight?: boolean;
    children: React.ReactNode;
}

const ColumnContainer = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  width: ${props => props.fullWidth ? '100%' : props.width ?? "auto"};
  height: ${props => props.fullHeight ? '100%' : props.height ?? "auto"};
  align-items: ${props => {
      if (props.crossAxisAlignment == "start") return 'flex-start';
      if (props.crossAxisAlignment == "end") return 'flex-end';
      return props.crossAxisAlignment || 'stretch'
  }};
  justify-items: ${props => {
        if (props.crossAxisAlignment == "start") return 'flex-start';
        if (props.crossAxisAlignment == "end") return 'flex-end';
        return props.crossAxisAlignment || 'stretch'
    }};;
  justify-content: ${props => {
      if (props.crossAxisAlignment == "start") return 'flex-start';
      if (props.crossAxisAlignment == "end") return 'flex-end';
      return props.mainAxisAlignment || 'center';
  }};
  gap: ${props => props.gap || '0px'};
  ${props => {
        if (!props.padding) return "";
        if (props.padding.top) return `padding-top: ${props.padding.top + "px"}`
        if (props.padding.left) return `padding-left: ${props.padding.left + "px"}`
        if (props.padding.right) return `padding-right: ${props.padding.right + "px"}`
        if (props.padding.bottom) return `padding-bottom: ${props.padding.bottom + "px"}`
    }};
`;

const Column: React.FC<ColumnProps> = ({ crossAxisAlignment, mainAxisAlignment, gap, padding, children }) => {
    return (
        <ColumnContainer padding={padding} crossAxisAlignment={crossAxisAlignment} mainAxisAlignment={mainAxisAlignment} gap={gap}>
            {children}
        </ColumnContainer>
    );
};

export default Column;
