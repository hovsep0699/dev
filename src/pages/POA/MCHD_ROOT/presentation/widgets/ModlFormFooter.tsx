import React from "react";
import {Box} from "grommet";
import Button, {ButtonKinds} from "../../common/Button";
import {IconCheck, IconClose} from "../../assets/icons";
import {CreatePresenterState} from "../pages/CreatePoa/presenter/createPresenterState";
import {useDialog} from "../pages/dashboard/modals/useDialog";
import {SubTrustPresenterState} from "../pages/SubTrust/presenter/SubTrustPresenterState";
import {FormPresenterState} from "../components/forms/presenter/FormPresenterState";


interface ModalFormFooterProps {
    state: CreatePresenterState | SubTrustPresenterState | FormPresenterState;
    onCancel?: () => void;
    onSave?: () => void;
}

const ModalFormFooter: React.FC<ModalFormFooterProps> = ({state, onSave, onCancel}: ModalFormFooterProps) => {
    const {hideDialog} = useDialog();
    return (
        <Box direction={"column"} margin={{top: "medium"}} pad={"medium"} height={"100%"} width={"100%"}>
            <Box direction={"column"} justify={"center"}>
                <Box direction={"row"} gap={"10px"} justify={"center"} width={"100%"}>
                    <Box direction={"column"} justify={"start"} width={"134px"}>
                        <Button
                            style={{fontWeight: "bold", fontSize: "14px"}}
                            kind={ButtonKinds.Orange}
                            disabled={state.isSubmitting}
                            icon={<IconCheck color={"white"} fill={"white"}/>}
                            onClick={(e) => {
                                if (!state.isSubmitting && state.handleSubmit != null ) {
                                    state.handleSubmit(e);
                                    if (onSave != null)
                                        onSave();
                                }
                                console.log("SSSSS: ", state.isSubmitting);

                            }}
                            children={"Сохранять"}
                        />
                    </Box>
                    <Box direction={"column"} justify={"end"} width={"134px"}>
                        <Button
                            style={{fontWeight: "bold", fontSize: "14px"}}
                            onClick={() => {
                                hideDialog();
                                if (onCancel != null)
                                    onCancel!();
                            }}
                            icon={<IconClose/>}
                            children={"Закрыть"}
                        />
                    </Box>
                </Box>
                {state.status && (
                    <Box pad={{vertical: 'small'}}>
                        <span style={{color: 'red', fontSize: '14px'}}>{state.status}</span>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default ModalFormFooter