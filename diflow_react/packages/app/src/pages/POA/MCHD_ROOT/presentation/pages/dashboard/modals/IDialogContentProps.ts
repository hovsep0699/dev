import React from "react";

export interface IDialogContentProps {
    hideDialog?: () => void;
    showDialog?: () => void;
    children?: React.ReactNode;
}
