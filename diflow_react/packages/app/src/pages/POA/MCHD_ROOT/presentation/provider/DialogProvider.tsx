import React, {ReactNode, useEffect} from 'react';
import dialogManager from "../pages/dashboard/modals/DialogManager";
import {Presenter} from "../presenter/presenter";
import ObservableComponent from "../observableComponent/observableComponent";
import {state} from "../presenter/BasicState";
import autobind from "autobind-decorator";
import {compareArraysBase} from "../../utils/json_hepler";
import {BaseDialog} from "../../domain/model/dialog";
import {CreatePresenterViewModel} from "../pages/CreatePoa/presenter/createPresenterViewModel";

interface DialogProviderProps {
    children: ReactNode;
}

class DialogViewModel {
    dialogs?: BaseDialog[] | null;
}

class DialogState implements state<DialogState, DialogViewModel> {
    dialogs: BaseDialog[];

    constructor(dialogs?: BaseDialog[] | null) {
        this.dialogs = dialogs ?? [];
    }
    @autobind
    initial(): DialogState {
        return new DialogState(
            []
        )
    }
    @autobind
    copyWith({dialogs}: DialogViewModel): DialogState {
        return new DialogState(dialogs ?? this.dialogs);
    }
    @autobind
    compare(other: DialogState): boolean {
        return compareArraysBase<BaseDialog>(this.dialogs, other.dialogs);
    }
}

export const DialogProvider: React.FC<DialogProviderProps> = ({children}) => {
    const presenter: Presenter<DialogViewModel, DialogState> = new Presenter<DialogViewModel, DialogState>(new DialogState(dialogManager.getDialogsModel()));
    // const [dialogs, setDialogs] = useState<ReactNode[]>(dialogManager.getDialogs());
    //
    useEffect(() => {
        const updateDialog = (newDialog: ReactNode | null) => {
            const oldState = presenter.getState();
            presenter.setState(oldState.copyWith({dialogs: dialogManager.getDialogsModel()}));
            // presenter.setState(presenter.getState().copyWith(dialogs: dialogManager.getDialogsModel());
            // setDialogs(dialogManager.getDialogs());
        };

        dialogManager.subscribe(updateDialog);

        return () => {
            dialogManager.unsubscribe(updateDialog);
        };
    }, []);

    return (
        <ObservableComponent<DialogViewModel, DialogState, Presenter<DialogViewModel, DialogState>>
            builder={(state: DialogState) => (
                <>
                    {children}
                    {state.dialogs.map((dialog: BaseDialog) => dialog.dialog)}
                </>

            )}
            create={() => presenter}
            buildWhen={(oldState, newState)=>{
                return oldState !== newState;
            }}
        >

        </ObservableComponent>
    );
};