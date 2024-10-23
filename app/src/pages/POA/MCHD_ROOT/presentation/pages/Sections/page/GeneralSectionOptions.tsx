import React from "react";
import {Box} from "grommet";
import Button from "@distate/app/src/pages/POA/MCHD_ROOT/common/Button";
import {IconPencil, IconPlus, IconTrash} from "@distate/app/src/pages/POA/MCHD_ROOT/assets/icons";
import {RequiredField} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/RequiredField";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";


interface GeneralSectionOptions {
    sectionData: any;
    baseWidth?: string;
    onShowForm: any;
    onEdit: any;
    onRemove: any;
    sectionTitle: string | React.ReactNode;
    isRequired?: boolean;
    expandedWidth?: string;
    builder?: (index: number, principl: any) => React.ReactNode;
    getInn?: (section: any) => string;
    presenter: SectionPresenter;
}

const GeneralSectionOptions: React.FC<GeneralSectionOptions> = ({
    sectionData,
    presenter,
    builder,
    baseWidth,
    getInn,
    onShowForm,
    onEdit,
    onRemove,
    sectionTitle,
    isRequired
}: GeneralSectionOptions) => {
    return (
        <Box direction="column" justify='center' margin={{top: "10px"}} width={"100%"}>
            {sectionData.length === 0 && (
                <Box direction='row' gap={"10px"} justify='start' width="100%">
                    <Box direction="column" justify="center" width={baseWidth ?? "320px"}>
                        <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} content={sectionTitle}
                                       required={isRequired}/>
                        {/*<h4>{sectionTitle}{isRequired ? <span style={{color: "red"}} >"*" <span/> : ""}</h4>*/}
                    </Box>
                    <Box direction='row'>
                        <Button icon={<IconPlus/>} style={{fontWeight: "bold"}} onClick={onShowForm}
                                children="Добавить"/>
                    </Box>
                </Box>
            )}

            {sectionData.map((section: any, index: number) => {
                console.log("ssssssssssssssssssss")
                console.log(section);
                return (
                    <Box key={index} direction={"column"} justify="center" gap={"10px"} margin={{top: "10px"}} width={"100%"}>
                        <Box direction='row' gap={"10px"} justify='start' width="100%" key={index}>
                            <Box direction="column" gap='10px' justify="center" width={baseWidth ?? "320px"}>
                                <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} content={sectionTitle}
                                               required={isRequired}/>
                            </Box>
                            <Box direction={"column"} width={`calc(100% - ${baseWidth ?? "320px"})`}>
                                <Box direction="row" gap="10px" width={"100%"} justify={"center"}>
                                    <Box direction={"column"} gap="10px" width={"471px"} height={"40px"}
                                         justify="start">
                                        <Box direction="column" width={"100%"} height={"100%"} justify={"center"}>
                                            <Box direction={"row"} width={"100%"} pad={{left: "small"}}
                                                 justify={"start"}>
                                                <span
                                                    style={{fontWeight: "bold"}}>{getInn ? getInn(section) : section.inn}</span>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box direction='row' gap={"10px"} width={`calc(100% - 481px)`} justify={"start"}>
                                        <Box direction={'column'}  width={"130px"}>
                                            <Button icon={<IconPencil/>} style={{fontWeight: "bold"}}
                                                    children='Изменить' onClick={(e) => {
                                                onEdit(e, index, section);
                                            }}/>
                                        </Box>
                                        {index !== 0 ? (
                                        <Box direction={'column'} width={"130px"}>

                                                <Button icon={<IconTrash/>} style={{fontWeight: "bold"}} children='Удалить'
                                                        onClick={() => onRemove(index)}/>
                                        </Box>
                                        ) : (
                                            <Box direction={'column'} width={"130px"}>
                                            {index === 0 &&
                                                <Button icon={<IconPlus/>} style={{fontWeight: "bold"}}
                                                        children='Добавить' onClick={(e) => onShowForm(e)}/>}
                                        </Box>
                                        )}

                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        {builder ? builder(index, section) : <></>}
                    </Box>
                )
            })}
        </Box>
    )
}






export default GeneralSectionOptions;