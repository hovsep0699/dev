import React from 'react';
import autobind from "autobind-decorator";
import Dialog from "./Dialog";
import {BaseDialog} from "../../../../domain/model/dialog";

interface DialogModelProps {
    dialog?: React.ReactNode | null;
    isVisible?: boolean | null;
}

export class DialogModel {
    public dialog: React.ReactNode | null;
    public isVisible: boolean;
    constructor(dialog: React.ReactNode | null, isVisible: boolean) {
        this.dialog = dialog;
        this.isVisible = isVisible;
    }
    @autobind
    copyWith({
            dialog,
            isVisible,
             }: DialogModelProps): DialogModel {
        return new DialogModel(dialog ?? this.dialog, isVisible ?? this.isVisible);
    }
}

export class DialogManager {
    private dialogs: DialogModel[];
    private dialog?: React.ReactNode | null;
    private listeners: Array<(dialog: React.ReactNode | null) => void>;
    constructor(){
        this.listeners = [];
        this.dialogs = [];
        this.dialog = null;
    }

    @autobind
    public isVisible(): boolean {
        let isVisible = false;
        this.dialogs.forEach((dialog: DialogModel) => {
            isVisible = isVisible || dialog.isVisible;
        })
        return isVisible;
    }

    @autobind
    public getDialogBy(index: number): DialogModel {
        return this.dialogs[index];
    }


    @autobind
    public setIsVisible(isVisible: boolean): void {
        this.dialogs.map((dialog)=>{
            dialog.isVisible = isVisible;
            return dialog;
        })
        // this._isVisible = isVisible;
    }

    @autobind
    public showDialog(dialog: React.ReactNode) {
        this.dialogs.push(new DialogModel(dialog, true));
        this.dialog = dialog;
        this.notify();
    }

    @autobind
    public hideDialog() {
        this.dialogs.pop();
        this.dialog = this.getDialog();
        this.notify();
    }

    @autobind
    public hideAllDialogs() {
        this.dialogs = [];
        this.dialog = null;
        this.notify();
    }

    @autobind
    public getDialog(): React.ReactNode | null {
        return this.dialogs.length <= 0 ? null : this.dialogs[this.dialogs.length - 1].dialog;
    }

    @autobind
    public getDialogs(): React.ReactNode[] {
        return this.dialogs.map((dialog)=>dialog.dialog);
    }

    @autobind
    public getDialogsModel(): BaseDialog[] {
        return this.getDialogs().map((dialog)=>new BaseDialog(dialog));
}

    @autobind
    public subscribe(callback: (dialog: React.ReactNode | null) => void) {
        this.listeners.push(callback);
        callback(this.dialog); // Immediately notify the subscriber of the current dialog
    }

    @autobind
    public unsubscribe(callback: (dialog: React.ReactNode | null) => void) {
        const indexToRemove = this.listeners.indexOf(callback);
        if (indexToRemove > -1) {
            this.listeners.splice(indexToRemove, 1);
        }
    }

    @autobind
    private notify() {
            this.listeners.forEach(callback => callback(this.dialog));
    }
}

const dialogManager = new DialogManager();
export default dialogManager;
