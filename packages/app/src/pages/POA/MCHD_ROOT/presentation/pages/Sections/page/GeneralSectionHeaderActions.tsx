import React from "react";
import {SectionPresenter} from "../presenter/SectionPresenter";
import ObservableComponent from "../../../observableComponent/observableComponent";
import {SectionPresenterState} from "../presenter/SectionPresenterState";
import GeneralSectionHeaderAction from "./GeneralSectionHeaderAction";
import {Tax} from "../../../../domain/model/Tax";
import {SectionPresenterViewModel} from "../presenter/SectionPresenterViewModel";

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