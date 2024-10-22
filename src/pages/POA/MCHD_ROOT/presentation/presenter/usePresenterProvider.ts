import {serviceLocator} from "../../di/app_component";
import {CreatePresenter} from "../pages/CreatePoa/presenter/createPresenter";

export const usePresenterProvider = () => {
    const getPresenter = () => serviceLocator.get(CreatePresenter);
    return {getPresenter};
}
