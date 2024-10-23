import React from "react";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";
import ObservableComponent from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/observableComponent/observableComponent";
import {SectionPresenterState} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenterState";
import GeneralSectionHeaderAction from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/page/GeneralSectionHeaderAction";
import {Tax} from "@distate/app/src/pages/POA/MCHD_ROOT/domain/model/Tax";
import {SectionPresenterViewModel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenterViewModel";

interface GeneralSectionHeaderActionsProps {
    baseWidth?: string;
    presenter: SectionPresenter;
}


const GeneralSectionHeaderActions: React.FC<GeneralSectionHeaderActionsProps> = ({
        baseWidth,
        presenter,
    }: GeneralSectionHeaderActionsProps) => {

    const handleAdd = (index: number) => {
        const state = presenter.getState();
        const prevTaxes = state.info.validForTaxAuthorities;
        const tax = new Tax(index.toString(), "");
        presenter.onInfoChanged(state.info.copyWith({validForTaxAuthorities: [ tax, ...prevTaxes]}));
    }

    const handleRemove = (index: number, isRemovable: boolean) => {
        const state = presenter.getState();
        if (isRemovable && state.info.validForTaxAuthorities?.length !== 1) {
            const updatedTaxes: Tax[] = [...presenter.getState().info.validForTaxAuthorities];
            updatedTaxes.splice(index, 1);
            presenter.onInfoChanged(state.info.copyWith({validForTaxAuthorities: updatedTaxes}));
        }
    }

    const handleChange = (value: string, index: number) => {
        const state = presenter.getState();
        console.log(value);
        const prevTaxes = state.info.validForTaxAuthorities;
        const updatedTax = prevTaxes.map((tax, elemIndex) => {
                const currentTax = new Tax(elemIndex.toString(), value);
                return index === elemIndex ? currentTax : tax;
            }
        );
        presenter.onInfoChanged(state.info.copyWith({validForTaxAuthorities: updatedTax}));
    }

    return (
        <ObservableComponent<SectionPresenterViewModel, SectionPresenterState, SectionPresenter>
            builder={(state: SectionPresenterState)=> (
                <>
                    {state.info.validForTaxAuthorities.map((tax: any, index: number) => (
                        <GeneralSectionHeaderAction
                            currentTax={tax}
                            onAdd={() => handleAdd(index)}
                            onChange={(value)=>handleChange(value, index)}
                            onRemove={()=>handleRemove(index, index !== 0)}
                            key={index}
                            baseWidth={baseWidth}
                            index={index}
                            isRemovable={index !== 0}
                        />
                    ))}
                </>
            )}
            create={()=>presenter}
            buildWhen={(oldState, newState)=>{
                return !oldState.compare(newState)
            }}
        />
    );
}

export default GeneralSectionHeaderActions;