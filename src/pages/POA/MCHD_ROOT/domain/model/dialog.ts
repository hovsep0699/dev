import {IModelBase} from "./IModel";
import React from "react";
import autobind from "autobind-decorator";

interface BaseDialogProps {
    dialog?: React.ReactNode | null;
}

export class BaseDialog implements IModelBase<BaseDialog, BaseDialogProps> {
    dialog: React.ReactNode | null;
    constructor(dialog: React.ReactNode | null) {
        this.dialog = dialog ?? null;
    }
    @autobind
    copyWith(dialog: React.ReactNode | null) {
        return new BaseDialog(dialog);
    }

    @autobind
    compare(other: BaseDialog) {
        return this.dialog === other.dialog;
    }
}