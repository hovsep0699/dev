import React, {CSSProperties} from 'react';
import styled from 'styled-components';
import {EdgeInsets} from "../utils/EdgeInsets";




const getAfterElement = (isShowArrow: any, positionOffset: any) => {
    if (isShowArrow) {
        return `&::before {
            content: '';
            position: absolute;
            top: ${positionOffset?.top ? positionOffset!.top! + 1 + "px" : "0px"}; /* Adjust this to position the triangle properly */
            left: ${positionOffset?.left ? positionOffset!.left! + 10 + "px" : "0px"}; /* Center the triangle horizontally with respect to popup */
            border-width: 0 10px 10px 10px;
            border-style: solid;
            
            border-color: transparent transparent rgba(0,0,0,0.2) transparent; /* Triangle color same as popup background */
        }`;
    }
    return "";
}

interface ScrollableContainerProps {
    height?: string;
    maxHeight?: string | number;
    padding?: string;
    positionOffset?: EdgeInsets;
    isShowArrow?: boolean;
}


const SingleChildScrollViewContainer = styled.div<ScrollableContainerProps>`
  overflow-y: auto;
    
    overflow-x: hidden;
  padding: ${(props) => props.padding || '0px'};
  max-height: ${(props) => props.maxHeight || '100%'};
  height: ${(props) => props.height || '100%'};
    margin-top: ${props => props.positionOffset?.top ? props.positionOffset!.top! + "px" : 0};
    box-sizing: border-box;
    margin-left: ${props => props.positionOffset?.left ? props.positionOffset!.left! + "px" : 0};
    margin-right: ${props => props.positionOffset?.right ? props.positionOffset!.right! + "px" : 0};
    margin-bottom: ${props => props.positionOffset?.bottom ? props.positionOffset!.bottom! + "px" : 0};
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    ${props => {
        console.log(props.isShowArrow);
        if (props.isShowArrow) return getAfterElement(props.isShowArrow, props.positionOffset)}};
`;


interface SingleChildScrollViewProps {
    children: React.ReactNode;
    style?: CSSProperties;
    positionOffset?: EdgeInsets;
    maxHeight?: string;
    isShowArrow?: boolean;
}

const SingleChildScrollView: React.FC<SingleChildScrollViewProps> = ({ children, isShowArrow, style, maxHeight, positionOffset }) => {
    return <SingleChildScrollViewContainer isShowArrow={isShowArrow} positionOffset={positionOffset} maxHeight={maxHeight} style={style}>{children}</SingleChildScrollViewContainer>;
};

export default SingleChildScrollView;