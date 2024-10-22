import React from 'react';
import styled from 'styled-components';
import {EdgeInsets} from "../utils/EdgeInsets";

interface RowProps {
    crossAxisAlignment?: 'start' | 'center' | 'end' | 'stretch';
    mainAxisAlignment?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
    padding?: EdgeInsets;
    gap?: number;
    width?: string;
    height?: string;
    fullWidth?: boolean;
    fullHeight?: boolean;
    children: React.ReactNode;
}

const RowContainer = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  width: ${props => props.fullWidth ? '100%' : props.width ?? "100%"};
  height: ${props => props.fullHeight ? '100%' : props.height ?? "100%"};
  align-items:  ${props => {
      if (props.crossAxisAlignment == "start") return 'flex-start';
      if (props.crossAxisAlignment == "end") return 'flex-end';
      return props.crossAxisAlignment || 'stretch'
  }};
  justify-items:${props => {
        if (props.crossAxisAlignment == "start") return 'flex-start';
        if (props.crossAxisAlignment == "end") return 'flex-end';
        return props.crossAxisAlignment || 'stretch'
  }};
  justify-content: ${props => {
        if(props.mainAxisAlignment == "start") return "flex-start";
        if(props.mainAxisAlignment == "end") return  "flex-end";
        return props.mainAxisAlignment || 'flex-start';
    }};
  gap: ${props => props.gap ? `${props.gap + "px"}` : '0px'};
  ${props => {
      if (!props.padding) return "";
      if (props.padding.top) return `padding-top: ${props.padding.top + "px"}`
      if (props.padding.left) return `padding-left: ${props.padding.left + "px"}`
      if (props.padding.right) return `padding-right: ${props.padding.right + "px"}`
      if (props.padding.bottom) return `padding-bottom: ${props.padding.bottom + "px"}`
  }};
`;

const Row: React.FC<RowProps> = ({ mainAxisAlignment, crossAxisAlignment, gap, padding, children }) => {
    return (
        <RowContainer padding={padding} crossAxisAlignment={crossAxisAlignment} mainAxisAlignment={mainAxisAlignment} gap={gap}>
            {children}
        </RowContainer>
    );
};

export default Row;
