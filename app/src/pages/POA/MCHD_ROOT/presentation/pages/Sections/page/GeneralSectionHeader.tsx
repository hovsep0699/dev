import React, {useEffect} from "react";
import {Box} from "grommet";
import {Label} from "@distate/app/src/pages/POA/MCHD_ROOT/common/CheckBox/CheckBox.styles";
import Select from "@distate/app/src/pages/POA/MCHD_ROOT/common/Select";
import {Input} from "@distate/app/src/pages/POA/MCHD_ROOT/common/Input";
import GeneralSectionHeaderActions from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/page/GeneralSectionHeaderActions";

import Button from "@distate/app/src/pages/POA/MCHD_ROOT/common/Button";
import {useDialog} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/useDialog";
import ObservableComponent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/observableComponent/observableComponent";
import {reTrustOptions, typeOptions} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/SelectionConstants";
import {RequiredField} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/RequiredField";
import {AttorneyDetails} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/AttorneyDetails";
import {initialDetails} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/constants/details/initialAttorneyDetails";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";
import {SectionPresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenterState";
import {DatePickerNew} from "@distate/app/src/pages/POA/MCHD_ROOT/common/date-picker-new";
import {SectionPresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenterViewModel";




interface GeneralSectionHeaderProps {
    baseWidth?: string;
    presenter: SectionPresenter;
    rootAttorney?: string;
    machineReadable?: string;
    isCreatePage?: boolean;
}


interface AttorneyDetailsPageProps {
    presenter: SectionPresenter;
    baseWidth?: string;
    details?: AttorneyDetails[];
}

const AttorneyDetailsPage: React.FC<AttorneyDetailsPageProps> = ({
                                                                     baseWidth,
                                                                     details
                                                                 }: AttorneyDetailsPageProps) => {
    return (
        <Box direction={"column"} width={"100%"}>
            {details?.map((detail: AttorneyDetails) => (
                <Box direction="row" gap={"10px"} width={"calc(100% - 320px)"}>
                    <Box direction={"column"} justify={"center"} width={baseWidth ?? "340px"}>
                        <Label>
                            <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} required={false}
                                           content={detail.label}/>
                        </Label>
                    </Box>
                    <Box direction={"column"} justify={"center"} width={"471px"}>
                        {detail.value}
                    </Box>
                </Box>
            ))}

        </Box>
    )
}



const GeneralSectionHeader: React.FC<GeneralSectionHeaderProps> = ({
                                                                       baseWidth,
                                                                       presenter,
                                                                       isCreatePage,
                                                                       rootAttorney,
                                                                       machineReadable
                                                                   }: GeneralSectionHeaderProps) => {
    const {openDialog} = useDialog();
    useEffect(() => {
        presenter.onAttorneyTypeChange(typeOptions[0])
        // presenter.on
    }, []);

    const showDetails = (e: any) => {
        openDialog({
            alignment: "center",
            content: <AttorneyDetailsPage
                presenter={presenter}
                details={initialDetails}
                baseWidth={"400px"}
            />,
            position: "fixed",
            maxHeight: "90%",
            width: "800px",
            dialogTitle: "ООО “Тест”",
            title: 'ООО “Тест”',
        }, e)
    }

    return (
        <ObservableComponent<SectionPresenterViewModel, SectionPresenterState, SectionPresenter>
            builder={(state: SectionPresenterState) => {
                return (
                    <Box direction={"column"} width="100%" gap="10px">
                        <Box direction="row" gap={"10px"} width={"100%"} justify={"start"}>
                            <Box direction={"row"} width={baseWidth ?? "320px"} alignSelf={"start"}>
                                <Box direction={"column"} width={"100%"} height={"40px"} justify={"center"}>
                                    <Label>
                                        <RequiredField width="100%" style={{fontSize: "14px", color: "#4d4d4f"}}
                                                       required={true} content={"Тип доверенности"}/>
                                    </Label>
                                </Box>
                            </Box>
                            <Box direction={"column"} width={"471px"} alignSelf={"end"}>
                                <Select
                                    placeholder={""}
                                    value={state.selectedAttorneyType}
                                    onChange={(e: any) => presenter.onAttorneyTypeChange(e)} width={"471px"}
                                    options={typeOptions}
                                />
                            </Box>
                        </Box>
                        <Box direction="row" gap={"10px"} width="100%">
                            <Box direction={"column"} margin={{top: "25px"}} width={baseWidth ?? "320px"}
                                 justify={"center"}>
                                <Label>
                                    <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} required={true}
                                                   content={"Машиночитаемая Доверенность"}/>
                                </Label>
                            </Box>
                            <Box direction={"row"} pad={{left: "2px"}} gap={"10px"} width={"calc(100% - 320px)"}>
                                <Box direction={"column"} width={"340px"} justify={"center"}>
                                    <Box direction={"column"} width={"100%"} justify={"center"}>
                                        <Label>
                                            <RequiredField
                                                style={{fontSize: "12px", fontStyle: "italic", color: "#4d4d4f"}}
                                                required={false} content={"Внутренний номер доверенности"}/>
                                        </Label>
                                    </Box>
                                    <Box direction={"column"} width={"100%"} justify={"center"}>
                                        <Input
                                            type='text'
                                            autocomplete={false}
                                            onChange={(e)=>presenter.onInfoChanged(state.info.copyWith(
                                                {internalNumber: e.target.value}))}
                                            value={state.info.internalNumber}
                                            disabled={false}
                                            placeHolder="Введите номер"
                                            title={"Введите строку длиной до 50 символов"}
                                            name="Внутренний номер доверенности"
                                        />
                                    </Box>
                                </Box>
                                <Box direction="column" width={"120px"}>
                                    <Box direction={"column"} width={"100%"} justify={"center"}>
                                        <Label>
                                            <RequiredField
                                                style={{fontSize: "12px", fontStyle: "italic", color: "#4d4d4f"}}
                                                required={false} content={"Дата выдачи"}/>
                                        </Label>
                                    </Box>
                                    <Box direction={"column"} width={"120px"} justify={"center"}>
                                        <DatePickerNew
                                            // value={state.selectedInternalStartDate ?? undefined}
                                            value={state.info.issuedAt}
                                            onChange={(value?: Date | null)=>presenter.onInfoChanged(state.info.copyWith(
                                                {issuedAt: value}))}
                                            // className={`ds-input date ${styles.input} ${errorClasses}`}
                                            title="Введите дату в формате dd.mm.yyyy"
                                            placeholder="Дата"
                                        />
                                        {/*<DatePicker*/}
                                        {/*    title={"Введите дату в формате dd.mm.yyyy"}*/}
                                        {/*    placeholder={"Дата"}/>*/}
                                    </Box>
                                </Box>
                                <Box direction="column" width={"120px"}>
                                    <Box direction={"column"} width={"100%"} justify={"center"}>
                                        <Label>
                                            <RequiredField
                                                style={{fontSize: "12px", fontStyle: "italic", color: "#4d4d4f"}}
                                                required={false} content={"Дата окончания"}/>
                                        </Label>
                                    </Box>
                                    <Box direction={"column"} width={"120px"} justify={"center"}>
                                        <DatePickerNew
                                            // value={state.selectedInternalStartDate ?? undefined}
                                            value={state.info.expireAt}
                                            onChange={(value?: Date | null)=>presenter.onInfoChanged(state.info.copyWith(
                                                {expireAt: value}))}
                                            // className={`ds-input date ${styles.input} ${errorClasses}`}
                                            title="Введите дату в формате dd.mm.yyyy"
                                            placeholder="Дата"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        {state.selectedAttorneyType.value !== typeOptions[1].value ? (
                        <Box direction="row" gap={"10px"} width="100%">
                            <Box direction={"column"} width={baseWidth ?? "320px"} justify={"center"}>
                                <Label>
                                    <RequiredField
                                        required={false}
                                        style={{fontSize: "14px", color: "#4d4d4f"}}
                                        content={"Дополнительный идентификатор"}
                                    />
                                </Label>
                            </Box>
                            <Box direction={"row"} pad={{left: "2px"}} gap={"10px"} width={"calc(100% - 320px)"}>
                                <Box direction={"column"} width={"340px"} justify={"center"}>
                                    <Box direction={"column"} width={"100%"} justify={"center"}>
                                        <Label>
                                            <RequiredField required={false} content={""}/>
                                        </Label>
                                    </Box>
                                    <Box direction={"column"} width={"100%"} justify={"center"}>
                                        <Input
                                            autocomplete={false}
                                            style={{fontSize: "14px", color: "#4d4d4f"}}
                                            type='text'
                                            title={`Введите строку длиной до 50 символов"`}
                                            value={`${state.info.additionalNumber}`}
                                            onChange={(e) => presenter.onInfoChanged(state.info.copyWith(
                                                {additionalNumber: e.target.value}))}
                                            placeHolder={"Введите дополнительный идентификатор"}
                                            name={"externalId"}
                                        />
                                    </Box>

                                </Box>

                            </Box>
                        </Box>
                    ) : (<></>)}
                        {isCreatePage ? (<></>) : (
                            <React.Fragment>
                                <Box direction="row" gap={"10px"} width={"calc(100% - 320px)"}>
                                    <Box direction={"column"} justify={"center"} width={baseWidth ?? "340px"}>
                                        <Label>
                                            <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} required={false}
                                                           content={"Корневая машиночитаемая доверенность"}/>
                                        </Label>
                                    </Box>
                                    <Box direction={"column"} justify={"center"} width={"471px"}>
                                        {rootAttorney}
                                    </Box>

                                </Box>
                                <Box direction="row" gap={"10px"} width={"calc(100% - 320px)"}>
                                    <Box direction={"column"} justify={"center"} width={baseWidth ?? "340px"}>
                                        <Label>
                                            <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} required={false}
                                                           content={"Машиночитаемая доверенность на основе которой осуществляется передоверие"}/>
                                        </Label>
                                    </Box>
                                    <Box direction={"column"} justify={"center"} width={"471px"}>
                                        {machineReadable}
                                    </Box>
                                </Box>
                                <Box direction={"row"} gap={"6px"} pad={{top: "6px", bottom: "6px"}} width={"100%"}
                                     justify={'stretch'}>
                                    <Box direction="column" justify={'center'} width={"320px"}>
                                        <RequiredField style={{fontSize: "14px", color: "#4d4d4f"}} required={true}
                                                       content={"Доверитель корневой доверенности"}/>
                                    </Box>
                                    <Box direction={"column"} justify={"center"}>
                                        <Box direction="row" width={"471px"} justify={"center"}
                                             style={{fontWeight: "bold"}}>
                                            ИП Иванов
                                        </Box>
                                    </Box>
                                    <Box direction={"column"} width={"130px"}>
                                        <Button style={{fontWeight: "bold"}}
                                                onClick={(e) => showDetails(e)}>Посмотреть</Button>
                                    </Box>
                                </Box>
                            </React.Fragment>
                        )}

                        <Box direction="row" gap={"10px"} width={"calc(100% - 320px)"}>
                            <Box direction={"column"} justify={"center"} width={baseWidth ?? "340px"}>
                                <Label>
                                    <RequiredField
                                        style={{fontSize: "14px", color: "#4d4d4f"}}
                                        required={true}
                                        content={"Право передоверия"}
                                    />
                                </Label>
                            </Box>
                            <Box direction={"column"} justify={"center"} width={"471px"}>
                                <Select
                                    width={"471px"}
                                    options={reTrustOptions}
                                    required={true}
                                    onChange={(e: any) => {
                                        // console.log(e);
                                        presenter.onRetrustSelectionChanaged(e)
                                        console.log(state.retrustSelected);
                                    }}
                                    value={state.retrustSelected}/>
                            </Box>

                        </Box>
                        {state.selectedAttorneyType.value === typeOptions[1].value ? (
                            <Box direction={"column"} gap={"10px"} width={"100%"}>
                                <Box direction="row" gap={"10px"} width={"100%"} justify={"start"}>
                                    <Box direction={"row"} width={baseWidth ?? "320px"} alignSelf={"start"}>
                                        <Box direction={"column"} width={"100%"} height={"40px"} justify={"center"}>
                                            <Label>
                                                <RequiredField
                                                    style={{lineHeight: "15px", fontSize: "14px", color: "#4d4d4f"}}
                                                    required={true}
                                                    content={"Код налогового органа, куда предоставляется доверенность"}/>
                                            </Label>
                                        </Box>
                                    </Box>
                                    <Box direction={"column"} width={"160px"} alignSelf={"end"}>
                                        <Input type='text'
                                               style={{fontSize: "14px", color: "#4d4d4f"}}
                                               disabled={false}
                                               value={state.info.taxAuthority}
                                               onChange={(e)=> {
                                                   const input = e.target.value;
                                                   const regex = /^\d+$/;
                                                   if (input.length === 0 || (input.length < 5 && regex.test(input))) {
                                                       presenter.onInfoChanged(state.info.copyWith(
                                                           {taxAuthority: e.target.value}))
                                                   }
                                               }}
                                               placeholder={'Введите код'}
                                               title={'Введите код длиной 4 символа'}
                                               name="Идентификатор"/>
                                    </Box>
                                </Box>

                                <GeneralSectionHeaderActions
                                    presenter={presenter}
                                    baseWidth={baseWidth}

                                />
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Box>
                )
            }}
            create={() => presenter}
            // buildWhen={(oldState: SectionPresenterState, newState: SectionPresenterState) => {
            //     // console.log("YYYYY::: ", oldState instanceof SectionPresenterState);
            //     return !oldState.compare(newState);
            // }}
        />
    )
}

export default GeneralSectionHeader;