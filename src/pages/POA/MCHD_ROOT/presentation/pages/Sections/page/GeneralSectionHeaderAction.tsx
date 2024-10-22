import {Tax} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Tax";
import React from "react";
import {Box} from "grommet";
import {Label} from "@distate/app/src/pages/POA/MCHD_ROOT/common/CheckBox/CheckBox.styles";
import {RequiredField} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/RequiredField";
import {Input} from "@distate/app/src/pages/POA/MCHD_ROOT/common/Input";
import Button from "@distate/app/src/pages/POA/MCHD_ROOT/common/Button";
import {IconPlus, IconTrash} from "@distate/app/src/pages/POA/MCHD_ROOT/assets/icons";

interface GeneralSectionHeaderActionProps {
    baseWidth?: string;
    isRemovable?: boolean;
    currentTax: Tax;
    onChange: (value: string) => void;
    onAdd: () => void;
    onRemove: () => void;
    index: number;
}

const GeneralSectionHeaderAction: React.FC<GeneralSectionHeaderActionProps> = ({
                                                                                   baseWidth,
                                                                                   onChange,
                                                                                   onAdd,
                                                                                   onRemove,
                                                                                   isRemovable,
                                                                                   currentTax
                                                                               }: GeneralSectionHeaderActionProps) => {
    return (
        <Box direction={"column"} gap={"10px"} pad={{top: "small"}} justify={"center"} width={"100%"}>
            <Box direction="row" gap={"10px"} width={"100%"} justify={"start"}>
                <Box direction={"row"} width={baseWidth ?? "320px"} alignSelf={"start"}>
                    <Box direction={"column"} width={"100%"} height={"40px"} justify={"center"}>
                        <Label>
                            <RequiredField style={{lineHeight: "15px", fontSize: "14px", color: "#4d4d4f"}}
                                           required={false}
                                           content={"Код налогового органа, в отношении которого действует доверенность"}/>
                        </Label>
                    </Box>
                </Box>
                <Box direction={"column"} width={"160px"} alignSelf={"end"}>
                    <Input
                           type='text'
                           style={{fontSize: "14px", color: "#4d4d4f"}}
                           disabled={false}
                           placeholder={'Введите код'}
                           title={'Введите код длиной 4 символа'}
                           value={currentTax.value}
                           onChange={(e) => {
                               const input = e.target.value;
                               const regex = /^\d+$/;
                               if (input.length === 0 || (input.length < 5 && regex.test(input))) {
                                   onChange(input)
                               }
                           }}
                           name="Идентификатор"/>
                </Box>
                <Box direction="column" justify={"center"} width={"130px"}>
                    {isRemovable === true ? (
                        <Button
                            icon={<IconTrash/>}
                            style={{fontWeight: "bold", fontSize: "14px", color: "#212122"}}
                            onClick={() => onRemove()}
                            children={"Удалить"}
                        />
                    ) : (
                        <Button
                            icon={<IconPlus/>}
                            style={{fontWeight: "bold", fontSize: "14px", color: "#212122"}}
                            onClick={() => onAdd()}
                            children={"Добавить"}
                        />
                    )}

                </Box>
            </Box>
        </Box>
    )
}

export default GeneralSectionHeaderAction;