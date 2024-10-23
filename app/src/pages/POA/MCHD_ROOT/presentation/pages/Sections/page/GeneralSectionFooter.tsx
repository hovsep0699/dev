import React, {CSSProperties} from "react";
import {
    powerOfAttonomyType,
    powersDeltsType,
    powersSubTrustType,
    reTrustOptions,
    typeOptions
} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/SelectionConstants";

import ObservableComponent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/observableComponent/observableComponent";
import {SectionPresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenterState";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";
import {Box} from "grommet";
import {RequiredField} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/RequiredField";
import {Label} from "@distate/app/src/pages/POA/MCHD_ROOT/common/CheckBox/CheckBox.styles";
import Select from "@distate/app/src/pages/POA/MCHD_ROOT/common/Select";
import HierarchicalDropdown from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/Individual/HierarchicalDropdown";
import {Textarea} from "@distate/app/src/common/textarea/Textarea";
import {SelectionType} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/SelectionType";
import {mockPowersData} from "@distate/app/src/pages/POA/MCHD_ROOT/mocks/data/dropdownData";
import {SectionPresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenterViewModel";

interface GeneralSectionsFooterProps {
    presenter: SectionPresenter;
    labelStyle?: CSSProperties;
    baseWidth?: string;
}


export const GeneralSectionsFooter: React.FC<GeneralSectionsFooterProps> = ({
                                                                                labelStyle,
                                                                                presenter,
                                                                                baseWidth
                                                                            }: GeneralSectionsFooterProps) => {

    return (
        <ObservableComponent<SectionPresenterViewModel, SectionPresenterState, SectionPresenter>
            builder={(state: SectionPresenterState) => (
                <React.Fragment>
                    <Box direction={"row"} gap={"10px"} justify={'stretch'}>
                        <Box direction={"column"} justify={"center"} margin={{top: "30px"}}>
                            <Box direction="column" justify={'center'} gap={"10px"} width={baseWidth ?? "320px"}>
                                <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} required={true}
                                               content={"Полномочия"}/>
                            </Box>
                        </Box>
                        <Box direction={"row"} gap={"10px"} justify={"center"}>
                            <Box direction="column" justify={"center"} width={"220px"}>
                                <Label style={labelStyle}>
                                    <RequiredField style={{fontSize: "12px", fontStyle: "italic", color: "#4d4d4f"}}
                                                   required={false} content={"Тип полномочий"}/>
                                </Label>
                                <Select
                                    placeholder={"Выбрать"}
                                    options={powerOfAttonomyType}
                                    value={state.powers.type}
                                    onChange={(e: SelectionType) => {
                                        presenter.onPowersChange(state.powers.copyWith(
                                        {type: e}))
                                    }}
                                />
                            </Box>
                            <Box direction="column" justify={"center"} width={"220px"}>
                                <Label style={labelStyle}>
                                    <RequiredField style={{fontSize: "12px", fontStyle: "italic", color: "#4d4d4f"}}
                                                   required={false} content={"Полномочия осуществляются"}/>
                                </Label>
                                <Select
                                    placeholder={"Выбрать"}
                                    options={powersDeltsType}
                                    value={state.powers.exercised}
                                    onChange={(e: SelectionType) => presenter.onPowersChange(
                                        state.powers.copyWith(
                                            {exercised: e}))
                                    }
                                />
                            </Box>
                            {state.retrustSelected !== reTrustOptions[0] ? (
                                <Box direction="column" justify={"center"} width={"200px"}>
                                    <Label style={labelStyle}>
                                        <RequiredField style={{fontSize: "12px", fontStyle: "italic", color: "#4d4d4f"}}
                                                       required={false} content={"При передоверии полномочия"}/>
                                    </Label>
                                    <Select
                                        placeholder={"Выбрать"}
                                        options={powersSubTrustType}
                                        value={state.powers.reDelegatingAuthority}
                                        onChange={(e: SelectionType) => presenter.onPowersChange(
                                            state.powers.copyWith(
                                                {reDelegatingAuthority: e}))
                                        }
                                    />
                                </Box>
                            ) : (<></>)}
                        </Box>


                        <Box direction={"column"} justify={"center"} height={"100px"}></Box>

                    </Box>
                    {state.powers.type && state.powers.type.value === powerOfAttonomyType[1].value ? (
                        <Box direction={"row"} style={{columnGap: "10px"}} justify={'stretch'}>
                            <Box direction="column" justify={'center'} gap={"10px"} width={baseWidth ?? "320px"}>
                                <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} required={true}
                                               content={"Машиночитаемые полномочия"}/>
                            </Box>
                            <Box direction={"column"} gap={"10px"} width={"680px"} height={"40px"} justify={"center"}
                                 pad={{bottom: "10px"}}>
                                <HierarchicalDropdown data={mockPowersData}/>
                            </Box>
                        </Box>
                    ) : (
                        <Box direction={"row"} style={{columnGap: "10px"}} justify={'stretch'}>
                            <Box direction="column" justify={'center'} gap={"10px"} width={baseWidth ?? "320px"}>
                                <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} required={true}
                                               content={"Текстовые полномочия"}/>
                            </Box>
                            <Box direction={"column"} justify={"center"}>
                                <Textarea
                                    value={state.powers.textPowers}
                                    placeholder={"Введите текстовые полномочия"}
                                    title={"Введите строку длиной до 10000 символов"}
                                    style={{
                                        fontSize: "12px",
                                        resize: "none",
                                        height: "90px",
                                        minHeight: "90px",
                                        width: "658px",
                                        border: "2px solid rgba(0, 0, 0, 0.09)"
                                    }}
                                    onChange={(e: any) => {
                                        presenter.onPowersChange(state.powers.copyWith(
                                            {textPowers: e.target.value}));
                                    }
                                }/>
                            </Box>
                        </Box>
                    )}
                    {state.selectedAttorneyType !== typeOptions[1] ? (
                        <Box direction={"column"} gap={"10px"} pad={{top: "small"}} justify={"center"}>
                            <Box direction={"row"} style={{columnGap: "10px"}} justify={'stretch'}>
                                <Box direction="column" justify={'center'} width={baseWidth ?? "320px"} gap={"10px"}>
                                    <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} required={false}
                                                   content={"Иные сведения"}/>
                                </Box>
                                <Box direction={"column"} justify={"center"}>
                                    <Textarea
                                        value={state.info.otherInformation}
                                        placeholder={"Введите иные сведения"}
                                        title={"Введите строку длиной до 5000 символов"}
                                        style={{
                                            fontSize: "12px",
                                            resize: "none",
                                            height: "50px",
                                            minHeight: "50px",
                                            width: "658px",
                                            border: "2px solid rgba(0, 0, 0, 0.09)"
                                        }}
                                        onChange={(e: any) => {
                                            presenter.onInfoChanged(state.info.copyWith(
                                                {otherInformation: e.target.value}))
                                        }
                                    }/>
                                </Box>
                            </Box>
                        </Box>
                    ) : (<></>)}
                </React.Fragment>
            )}
            create={() => presenter}
        />
    )
}

export default GeneralSectionsFooter;