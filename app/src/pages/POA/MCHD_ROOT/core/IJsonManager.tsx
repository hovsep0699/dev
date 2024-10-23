import {SectionPresenter} from "../presentation/pages/Sections/presenter/SectionPresenter";

export  abstract class IJsonManager<P> {
    abstract toFlatJson(): Record<string, any>;
    protected readonly presenter: P;
    protected readonly sectionPresenter: SectionPresenter;
    public constructor(presenter: P, sectionPresenter: SectionPresenter) {
        this.presenter = presenter;
        this.sectionPresenter = sectionPresenter;
    }
}