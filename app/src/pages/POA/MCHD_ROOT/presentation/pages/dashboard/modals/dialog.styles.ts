import styled from "styled-components";
import {EdgeInsets} from "../../../utils/EdgeInsets";

interface  DialogOverlayProps {
    overlayColor?: string;
    alignment?: "start" | "center" | "end";
    position?: "fixed" | "absolute" | "relative";
    positionOffset?: EdgeInsets
}

export const DialogOverlay = styled.div<DialogOverlayProps>`
  position: ${props => props.position ?? "fixed"};
  width: 100%;
  height: 100%;
  top: ${props => props.positionOffset?.top ? props.positionOffset!.top! + "px" : 0};
  box-sizing: border-box;
  left: ${props => props.positionOffset?.left ? props.positionOffset!.left! + "px" : 0};
  right: ${props => props.positionOffset?.right ? props.positionOffset!.right! + "px" : 0};
  bottom: ${props => props.positionOffset?.bottom ? props.positionOffset!.bottom! + "px" : 0};
  background: ${props =>props.overlayColor ?? "rgba(0, 0, 0, 0.5)"};
  display: flex;
  justify-content: ${props => {
      if (props.alignment === "start") {
          return "flex-start";
      }
      if (props.alignment === "end") {
          return "flex-end";
      }
      return "center";
}};
  align-items:  ${props => {
      if (props.alignment === "start") {
          return "flex-start";
      }
      if (props.alignment === "end") {
          return "flex-end";
      }
      return "center";
  }};
`;

interface DialogContainerProps {
    maxWidth?: number | string;
    maxHeight?: number | string;
    minWidth?: number | string;
    positionOffset?: EdgeInsets;
    minHeight?: number | string;
    width?: number | string;
    height?: number | string;
    isShowArrow?: boolean;
}


export const DialogContainer = styled.div<DialogContainerProps>`
  background: #fff;
  border-radius: 8px;
    position: relative;
  max-width: ${props => props.maxWidth ?? "100%"};
    ${props => {
        if (props.minHeight) {
            if (typeof props.minHeight === "number") {
                return "min-height: " + props.minHeight + "px";
            }
            return "min-height: " + props.minHeight;
        }
    }};
    ${props => {
        if (props.minWidth) {
            if (typeof props.minWidth === "number") {
                return "min-width: " + props.minWidth + "px";
            }
            return "min-width: " + props.minWidth;
        }
    }};
    ${props => {
        if (props.maxWidth) {
            if (typeof props.maxWidth === "number") {
                return "max-width: " + props.maxWidth + "px";
            }
            return "max-width: " + props.maxWidth;
        }   
    }};
    ${props => {
        if (props.maxHeight) {
            if (typeof props.maxHeight === "number") {
                return "max-height: " + props.maxHeight + "px";
            }
            return "max-height: " + props.maxHeight;
        }
    }};
  width: ${props => props.width ?? "max-content"};
  //max-height: ${props => props.maxHeight ?? "max-content"};
  margin-top: ${props => props.positionOffset?.top ? props.positionOffset!.top! + "px" : 0};
  box-sizing: border-box;
  margin-left: ${props => props.positionOffset?.left ? props.positionOffset!.left! + "px" : 0};
  margin-right: ${props => props.positionOffset?.right ? props.positionOffset!.right! + "px" : 0};
  margin-bottom: ${props => props.positionOffset?.bottom ? props.positionOffset!.bottom! + "px" : 0};
  height: ${props => props.height ?? "max-content"};
  padding: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
    //transform: translate(-50% ,-50%);
  flex-direction: column;
   
 
`;

export const DialogActionsContainer = styled.div`
  display: flex;
    flex-direction: column;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const DialogButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;

  &:hover {
    background: #0056b3;
  }
`;