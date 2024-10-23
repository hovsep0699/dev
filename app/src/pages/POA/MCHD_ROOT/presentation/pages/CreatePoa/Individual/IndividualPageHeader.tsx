import { Box } from 'grommet'
import React from 'react'
import {RequiredField} from "../../../components/RequiredField";
import {Label} from "../../../../common/CheckBox/CheckBox.styles";
import {genderOptions} from "../../../constants/SelectionConstants";
import Select from "../../../../common/Select";
import {Input} from "../../../../common/Input";

function IndividualPageHeader({baseWidth}: any) {
    const [value, setValue] = React.useState(genderOptions[0]);

  return (
        <Box direction={"column"} justify={"center"} width="100%" gap="10px">
            <Box direction="row" gap={"10px"} width={"100%"} align='center'>
                <Box direction={"column"} width={baseWidth ?? "320px"} justify={"center"} >
                    <Label>
                        <RequiredField required={true} content={"Тип доверенности"} />
                    </Label>
                </Box>
                <Box direction={"column"} width={"50%"} justify={"center"} >
                    <Select options={genderOptions} />
                </Box>
            </Box>
                <Box direction="row" width="100%" gap="10px">
                    <Box direction={"column"} width={baseWidth ?? "320px"} justify={"center"} >
                        <Label>
                            <RequiredField required={true} content={"Машиночитаемая Доверенность"} />
                        </Label>
                    </Box>
                        <Box direction={"column"} width={"340px"} justify={"center"} >
                            <Box direction={"column"} width={"100%"} justify={"center"} >
                                <Label>
                                    <RequiredField required={true} content={"Внутренний номер доверенности"} />
                                </Label>
                            </Box>
                            <Box direction={"column"} width={"340px"} justify={"center"} >
                                <Input
                                    type='text'
                                    disabled={false}
                                    // value={value}
                                    // onChange={(e) => setValue(e.target.value)}
                                    required={true}
                                    placeHolder="Введите номеdddddр"
                                    title='Введите строку длиной до 50 символов'
                                    name="Внутренний номер доверенности"
                                />
                            </Box>
                        </Box>
                        <Box direction="column" width={"120px"}  gap="10px">
                            <Box direction={"column"} width={"100%"} justify={"center"} >
                                <Label>
                                    <RequiredField required={true} content={"Дата выдачи"} />
                                </Label>
                            </Box>
                            <Box direction={"column"} width={"120px"} justify={"center"} >
                                <Input
                                    disabled={false}
                                    placeHolder="Дата выдачи"
                                    name="Дата выдачи"
                                    type="date"
                                />
                            </Box>

                            {/* <DateInput /> */}
                        </Box>

                </Box>
                <Box direction="row" width="100%" gap="10px">
                    <Box direction={"column"} width={baseWidth ?? "320px"} justify={"center"} ></Box>
                    <Box direction={"column"} width={"340px"} justify={"center"} >
                        <Box direction={"column"} width={"100%"} justify={"center"} >
                            <Label>
                                <RequiredField required={true} content={"Дополнительный идентификатор"} />
                            </Label>
                        </Box>
                        <Box direction={"column"} width={"100%"} justify={"center"} >
                            <Input
                                type='text'
                                disabled={false}
                                // value={value}
                                // onChange={(e) => setValue(e.target.value)}
                                placeHolder="Введите номер"
                                name="Дополнительный идентификатор"
                            />
                        </Box>
                    </Box>
                    <Box direction="column" width={"120px"}  gap="10px">
                        <Box direction={"column"} width={"100%"} justify={"center"} >
                            <Label>
                                <RequiredField required={true} content={"Дата окончания"} />
                            </Label>
                        </Box>
                        <Box direction={"column"} width={"100%"} justify={"center"} >
                            <Input
                                disabled={false}
                                placeHolder="Дата выдачи"
                                name="Дата выдачи"
                                type="date"
                            />
                        </Box>

                        {/* <DateInput /> */}
                    </Box>
                </Box>

            <Box direction="row" gap={"10px"} width="100%" >
                <Box direction={"column"} justify={"center"} width={baseWidth ?? "340px"}>
                    <Label>
                        <RequiredField required={true} content={"Право передоверия"} />
                    </Label>
                </Box>
                <Box direction={"column"} justify={"center"} width={"50%"}>
                    <Select  options={genderOptions} required={true} onChange={setValue}  value={value}  />
                </Box>

            </Box>
    </Box>
  )
}

export default IndividualPageHeader