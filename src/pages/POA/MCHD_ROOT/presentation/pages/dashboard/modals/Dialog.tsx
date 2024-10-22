// Dialog.tsx
import React, {CSSProperties} from 'react';
import {
    DialogActionsContainer,
    DialogContainer,
    DialogOverlay
} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/dialog.styles";
import {Box} from "grommet";
import SingleChildScrollView from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/widgets/SingleChildScrollView";
import {EdgeInsets} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/utils/EdgeInsets";



export enum AlignmentType {
    left = "start",
    center = "center",
    right = "end"
}

interface DialogProps {
    title?: React.ReactNode | string;
    titleCentered?: boolean;
    content?: React.ReactNode;
    actions?: React.ReactNode;
    isScrollable?: boolean | true;
    onClose?: () => void;
    overlayColor?: string;
    alignment?: "start" | "end" | "center" | AlignmentType;
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;
    dialogContainerStyle?: CSSProperties;
    position?: "absolute" | "relative" | "fixed";
    positionOffset?: EdgeInsets;
    isShowArrow?: boolean;
}

const BuildDialogOverlayContainer = ({
  title,
  content,
  actions,
  width,
  height,
  maxWidth,
  titleCentered,
  alignment,
  dialogContainerStyle,
  isScrollable,
  isShowArrow,
  maxHeight
}: DialogProps) => {
    console.log("VVVVVVVVVVVVVVVVVVVV")
    if (isScrollable) {
        return  <SingleChildScrollView maxHeight={maxHeight} isShowArrow={isShowArrow}>
            <DialogContainer
                style={dialogContainerStyle}
                width={width}
                height={height}
                maxWidth={maxWidth}
                isShowArrow={isShowArrow}
                maxHeight={maxHeight}
                onClick={(e) => e.stopPropagation()}
            >
                {/*{!title && !content ? (<></>) : (*/}
                {isScrollable ? (
                    <SingleChildScrollView maxHeight={maxHeight} style={{display: "flex", flexDirection: "column", justifyContent: alignment}}>
                        <Box direction={"column"} width={"100%"} justify={alignment} align={alignment}>
                            <Box direction={"row"} justify={titleCentered ? "center" : "start"} align={alignment}>
                                {title ? title : <></>}
                            </Box>
                            {content ? content : <></>}
                        </Box>

                    </SingleChildScrollView>
                ) : (
                    <Box direction={"column"} width={"100%"} justify={alignment} align={alignment}>
                        <Box direction={"row"} justify={titleCentered ? "center" : "start"} align={alignment}>
                            {title ? title : <></>}
                        </Box>
                        {content ? content : <></>}
                    </Box>
                )}

                {/*)}*/}
                {actions ? (
                    <DialogActionsContainer>
                        {actions ? actions : <></>}
                    </DialogActionsContainer>
                ) : (<></>)}

            </DialogContainer>
        </SingleChildScrollView>

    }
    return (
            <DialogContainer
                style={dialogContainerStyle}
                width={width}
                height={height}
                isShowArrow={isShowArrow}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                onClick={(e) => e.stopPropagation()}
            >
                {/*{!title && !content ? (<></>) : (*/}
                {isScrollable ? (
                    <SingleChildScrollView maxHeight={maxHeight} style={{display: "flex", flexDirection: "column", justifyContent: alignment}}>
                        <Box direction={"column"} width={"100%"} justify={alignment} align={alignment}>
                            <Box direction={"row"} justify={titleCentered ? "center" : "start"} align={alignment}>
                                {title ? title : <></>}
                            </Box>
                            {content ? content : <></>}
                        </Box>

                    </SingleChildScrollView>
                ) : (
                    <Box direction={"column"} width={"100%"} justify={alignment} align={alignment}>
                        <Box direction={"row"} justify={titleCentered ? "center" : "start"} align={alignment}>
                            {title ? title : <></>}
                        </Box>
                        {content ? content : <></>}
                    </Box>
                )}

                {/*)}*/}
                {actions ? (
                    <DialogActionsContainer>
                        {actions ? actions : <></>}
                    </DialogActionsContainer>
                ) : (<></>)}

            </DialogContainer>
    );
}


const Dialog: React.FC<DialogProps> = ({
      title,
      content,
      alignment,
      overlayColor,
      actions,
      onClose,
      isScrollable,
      isShowArrow,
      titleCentered,
      width,
      maxWidth,
      dialogContainerStyle,
      height,
      position,
      positionOffset,
      maxHeight
}) => {
    return <DialogOverlay
            position={position}
            onClick={onClose}
            overlayColor={overlayColor}
            alignment={alignment}
        >
            {isScrollable ?
                <SingleChildScrollView isShowArrow={isShowArrow} maxHeight={"80vh"} positionOffset={positionOffset}>
                    <BuildDialogOverlayContainer
                        isShowArrow={isShowArrow}
                        dialogContainerStyle={dialogContainerStyle}
                        alignment={alignment}
                        titleCentered={titleCentered}
                        width={width}
                        height={height}
                        maxHeight={maxHeight}
                        maxWidth={maxWidth}
                        title={title}
                        content={content}
                        actions={actions}
                    />
                </SingleChildScrollView>
                :
                <BuildDialogOverlayContainer
                    dialogContainerStyle={dialogContainerStyle}
                    titleCentered={titleCentered}
                    isShowArrow={isShowArrow}
                    alignment={alignment}
                    positionOffset={positionOffset}
                    title={title}
                    maxHeight={maxHeight}
                    maxWidth={maxWidth}
                    height={height}
                    width={width}
                    content={content}
                    actions={actions}
                />}
        </DialogOverlay>
        // document.body
    // )
};

export default Dialog;
