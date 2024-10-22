import React from "react";
// import {Box, TextArea} from "grommet";
// import {Input} from "../../commonComponents/Input";
// import {DatePicker} from "../../commonComponents/DatePicker";
// import Select from "../../commonComponents/Select";
// import {Label} from "../../commonComponents/CheckBox/CheckBox.styles";
// import Button, {ButtonKinds} from "../../commonComponents/Button";
// import {
//     IconCheck,
//     IconClose,
//     IconPencil,
//     IconPlus,
//     IconTrash
// } from "../../icons";
// import HierarchicalDropdown from "../CreatePoa/Individual/HierarchicalDropdown";


export  const Options = [
    { label: 'Полные', value: 'Полные' },
    { label: 'Ограниченные', value: 'Ограниченные' },
    { label: 'Other', value: 'other' },
];

const SubTrustLlc: React.FC = () => {
    return (
        // <Box direction="column" gap={"10px"} justify={'center'}>
        //     <Box direction={"row"} gap={"10px"} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Корневая машиночитаемая доверенность*
        //         </Box>
        //         <Box direction="column" justify={"end"} width={"medium"}>
        //             <Label htmlFor={"unique_number_trust"}>
        //                 Уникальный номер доверенности*
        //             </Label>
        //             <Input
        //                 type="text"
        //                 name={"unique_number_trust"}
        //                 id="unique_number_trust"
        //             />
        //         </Box>
        //        <Box direction="column" width={"small"}>
        //            <Label>
        //                Дата выдачи*
        //            </Label>
        //            <DatePicker
        //                placeholder={"Дата"} />
        //        </Box>
        //        <Box direction={"column"} width={"medium"}>
        //            <Label>
        //                Доверенность(корневая или дочерняя)
        //            </Label>
        //            <Select
        //                value={"sss"}
        //                options={Options}
        //            />
        //        </Box>
        //     </Box>
        //     <Box direction={"row"} gap={"10px"} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //         </Box>
        //         <Box direction="column" justify={"end"} width={"medium"}>
        //             <Label htmlFor={"unique_number_trust"}>
        //                 Внутренний номер доверенности*
        //             </Label>
        //             <Input
        //                 type="text"
        //                 name={"unique_number_trust"}
        //                 id="unique_number_trust"
        //             />
        //         </Box>
        //         <Box direction="column"  width={"small"}>
        //             <Label>
        //                 Дата окончания*
        //             </Label>
        //             <DatePicker
        //                 placeholder={"Дата"} />
        //         </Box>
        //         <Box direction={"column"}  width={"medium"}>
        //             <Label>
        //                 Выпущена на*
        //             </Label>
        //             <Select
        //                 value={"sss"}
        //                 options={Options}
        //             />
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} gap={"10px"} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Машиночитаемая доверенность на основе которой осуществляется передоверие*
        //         </Box>
        //         <Box direction="column" justify={"end"}  width={"medium"}>
        //             <Label htmlFor={"unique_number_trust"}>
        //                 Уникальный номер доверенности*
        //             </Label>
        //             <Input
        //                 type="text"
        //                 name={"unique_number_trust"}
        //                 id="unique_number_trust"
        //             />
        //         </Box>
        //         <Box direction="column"  width={"small"}>
        //             <Label>
        //                 Дата выдачи*
        //             </Label>
        //             <DatePicker
        //                 placeholder={"Дата"} />
        //         </Box>
        //         <Box direction={"column"}  width={"medium"}>
        //             <Label>
        //                 Доверенность(корневая или дочерняя)
        //             </Label>
        //             <Select
        //                 value={"sss"}
        //                 options={Options}
        //             />
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} gap={"10px"} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //         </Box>
        //         <Box direction="column" justify={"end"}  width={"medium"}>
        //             <Label htmlFor={"unique_number_trust"}>
        //                 Внутренний номер доверенности*
        //             </Label>
        //             <Input
        //                 type="text"
        //                 name={"unique_number_trust"}
        //                 id="unique_number_trust"
        //             />
        //         </Box>
        //         <Box direction="column"  width={"small"}>
        //             <Label>
        //                 Дата окончания*
        //             </Label>
        //             <DatePicker
        //                 placeholder={"Дата"} />
        //         </Box>
        //         <Box direction={"column"} width={"medium"}>
        //             <Label>
        //                 Выпущена на*
        //             </Label>
        //             <Select
        //                 value={"sss"}
        //                 options={Options}
        //             />
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} gap={"10px"} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Доверитель корневой доверенности
        //         </Box>
        //         <Box direction={"column"} justify={"center"} width={"medium"}>
        //             <Box direction="row" justify={"center"} style={{ fontWeight: "bold" }}>
        //                 ИП Иванов
        //             </Box>
        //         </Box>
        //         <Box direction={"column"} width={"xsmall"}>
        //             <Button>Посмотреть</Button>
        //         </Box>
        //     </Box>
        //     <Box direction={"column"} height={"xxsmall"} />
        //     <Box direction={"row"} gap={"10px"} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Тип доверенности*
        //         </Box>
        //         <Box direction={"column"} justify={"center"} width={"medium"}>
        //             <Select options={Options}>
        //
        //             </Select>
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} gap={"10px"} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Машиночитаемая Доверенность
        //         </Box>
        //         <Box direction="column" justify={"end"} width={"medium"}>
        //             <Label htmlFor={"unique_number_trust"}>
        //                 Внутренний номер доверенности*
        //             </Label>
        //             <Input
        //                 type="text"
        //                 name={"unique_number_trust"}
        //                 id="unique_number_trust"
        //             />
        //         </Box>
        //         <Box direction="column" width={"small"}>
        //             <Label>
        //                 Дата выдачи*
        //             </Label>
        //             <DatePicker
        //                 placeholder={"Дата"} />
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} gap={"10px"} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //         </Box>
        //         <Box direction="column" justify={"end"} width={"medium"}>
        //             <Label htmlFor={"unique_number_trust"}>
        //                 Внутренний номер доверенности*
        //             </Label>
        //             <Input
        //                 type="text"
        //                 name={"unique_number_trust"}
        //                 id="unique_number_trust"
        //             />
        //         </Box>
        //         <Box direction="column" width={"small"}>
        //             <Label>
        //                 Дата выдачи*
        //             </Label>
        //             <DatePicker
        //                 placeholder={"Дата"} />
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} gap={"10px"} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Предыдущий представитель*
        //         </Box>
        //         <Box direction="column" justify={"center"} width={"medium"}>
        //             “ООО “Ромашка и Лютик”
        //         </Box>
        //         <Box direction="column" width={"xsmall"}>
        //             <Button icon={<IconPencil />}>Изменить</Button>
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} style={{columnGap: "10px"}} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Руководитель Организации*
        //         </Box>
        //         <Box direction="column" justify={"center"} style={{fontWeight: "bold"}} width={"medium"}>
        //             Иванов Иван Иванович
        //         </Box>
        //         <Box direction="column" justify={"center"} width={"xsmall"}>
        //             <Button icon={<IconPencil />}>Изменить</Button>
        //         </Box>
        //         <Box direction="column" justify={"center"} width={"xsmall"}>
        //             <Button icon={<IconTrash />}>Удалить</Button>
        //         </Box>
        //         <Box direction="column" justify={"center"} width={"xsmall"}>
        //             <Button icon={<IconPlus />}>Добавить</Button>
        //         </Box>
        //         <Box direction="column" justify={"center"} width={"small"} >
        //             <Box direction="column" width={"small"}>
        //                 <Label htmlFor={"unique_number_trust"} style={{marginTop: "-29px"}}>
        //                     Тип полномочий ЕИО*
        //                 </Label>
        //                 <Select options={Options}> </Select>
        //             </Box>
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} style={{columnGap: "10px"}} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Новый представитель*
        //         </Box>
        //         <Box direction="column" justify={"center"} style={{fontWeight: "bold"}} width={"medium"}>
        //             Васильев Василий Васильевич
        //         </Box>
        //         <Box direction="column" justify={"center"} width={"xsmall"}>
        //             <Button icon={<IconPencil />}>Изменить</Button>
        //         </Box>
        //         <Box direction="column" justify={"center"} width={"xsmall"}>
        //             <Button icon={<IconTrash />}>Удалить</Button>
        //         </Box>
        //         <Box direction="column" justify={"center"} width={"xsmall"}>
        //             <Button icon={<IconPlus />}>Добавить</Button>
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} style={{columnGap: "10px"}} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Полномочия
        //         </Box>
        //         <Box direction="column" justify={"center"}  width={"medium"}>
        //             <Label>
        //                 Тип полномочий*
        //             </Label>
        //             <Select options={Options}> </Select>
        //         </Box>
        //         <Box direction="column" justify={"center"}  width={"small"}>
        //             <Label>
        //                 Тип полномочий*
        //             </Label>
        //             <Select options={Options}> </Select>
        //         </Box>
        //         <Box direction="column" justify={"center"}  width={"medium"}>
        //             <Label>
        //                 Тип полномочий*
        //             </Label>
        //             <Select options={Options}> </Select>
        //         </Box>
        //         <Box direction={"column"} justify={"center"} height={"100px"}></Box>
        //
        //     </Box>
        //     <Box direction={"row"} style={{columnGap: "10px"}} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Текстовые полномочия*
        //         </Box>
        //         <Box direction={"column"} justify={"center"}>
        //             <TextArea
        //                 placeholder={"Введите текстовые полномочия"}
        //                 size={"small"} style={{height: "90px", border: "2px solid rgba(0, 0, 0, 0.09)"}} />
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} style={{columnGap: "10px"}} justify={'stretch'}>
        //         <Box direction="column" justify={'center'} width={"medium"}>
        //             Иные сведения
        //         </Box>
        //         <Box direction={"column"} justify={"center"}>
        //           <HierarchicalDropdown />
        //         </Box>
        //     </Box>
        //     <Box direction={"row"} width={"100%"} justify={"between"}>
        //         <Box direction={"row"} style={{columnGap: "10px"}}  justify={'start'}>
        //             <Button icon={<IconCheck />} kind={ButtonKinds.Orange}>Сохранить</Button>
        //         </Box>
        //         <Box direction={"row"} style={{columnGap: "10px"}} alignSelf={"end"} justify={'end'}>
        //             <Button icon={<IconClose />}>Закрыть</Button>
        //         </Box>
        //     </Box>
        // </Box>
        <></>
    )
}

export default SubTrustLlc;