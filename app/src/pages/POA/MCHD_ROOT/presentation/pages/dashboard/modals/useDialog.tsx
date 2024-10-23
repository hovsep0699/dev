import dialogManager from './DialogManager';
import React, {CSSProperties} from "react";
import Modal from '../../../../common/Modal/Modal';
import {AlignmentType} from "./Dialog";
import ReactDOM from "react-dom";
import {EdgeInsets} from "../../../utils/EdgeInsets";


export interface OpenDialogProps {
    content?: React.ReactNode | string;
    overlayColor?: string;
    dialogContainerStyle?: CSSProperties;
    titleCentered?: boolean;
    footer?: React.ReactNode | string;
    actions?: React.ReactNode;
    isScrollable?: boolean | true;
    title?: React.ReactNode | string;
    dialogTitle?: string;
    alignment?: "start" | "center" | "end" | AlignmentType;
    position?: "absolute" | "relative" | "fixed";
    positionOffset?: EdgeInsets;
    maxWidth?: string;
    minHeight?: string;
    shouldOpenMultiple?: boolean | null;
    shouldCloseMultiple?: boolean | null;
    width?: string;
    height?: string;
    minWidth?: string;
    maxHeight?: string;
    isShowArrow?: boolean;
    relativeTo?: React.RefObject<HTMLElement>
}

export const useDialog = () => {
    const showDialog = (dialog: React.ReactNode) => {
        console.log("sssssss")
        // const body = document.querySelector("body");
        // dialogManager.subscribe((dialog)=> ReactDOM.render(dialog, body));
        dialogManager.showDialog(dialog);
        // ReactDOM.createPortal(dialog, document.getElementById('modals') as HTMLElement);
    };

    const hideDialog = () => {
        dialogManager.hideDialog();
    };

    const hideAllDialogs = () => {
        dialogManager.hideAllDialogs();
    }

    const hideDialogtest = (callback: any) => {
        dialogManager.hideDialog();
        callback();
    };

    const openDialog = (openDialogProps: OpenDialogProps, event: any) => {
        showDialog(
            <Modal hide={openDialogProps.shouldCloseMultiple ? hideAllDialogs : hideDialog} width={openDialogProps.width} isVisible={true} zIndex={300}>
                <Modal.Header onClickCloseBtn={openDialogProps.shouldCloseMultiple ? hideAllDialogs : hideDialog} title={openDialogProps.dialogTitle} />
                <Modal.Body>
                {openDialogProps.content}
                </Modal.Body>
                {openDialogProps.footer ? (
                    <Modal.Footer>
                        {openDialogProps.footer}
                    </Modal.Footer>) : <></>
                }
            </Modal>
        )
    };

    return { showDialog, hideDialog, openDialog, hideDialogtest, hideAllDialogs};
};
