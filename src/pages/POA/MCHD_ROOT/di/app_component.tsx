import {ServiceLocator} from "./ServiceLocator";
import {RepresentativeManager} from "../core/RepresentativeManager";
import {ApiClient} from "../core/client/ApiClient";
import {CreateService} from "../core/network/CreateService";
import AxiosClient from "../core/client/AxiosClient";
import {BlobClient} from "../core/client/BlobClient";
import {PrincipalManager} from "../core/PrincipalManager";
import {CreatePresenter} from "../presentation/pages/CreatePoa/presenter/createPresenter";
import {doveritel} from "../presentation/pages/test/testObjects";
import {SubTrustPresenter} from "../presentation/pages/SubTrust/presenter/SubTrustPresenter";
import {SectionPresenter} from "../presentation/pages/Sections/presenter/SectionPresenter";
import {DashboardPresenter} from "../presentation/pages/POADashboard/presenter/DashboardPresenter";
import {JsonCreateManager} from "../core/JsonManager";
import {FormPresenter} from "../presentation/components/forms/presenter/FormPresenter";
import {SubAdminManager} from "../core/SubAdminManager";


export const serviceLocator = ServiceLocator.getInstance();
export const configureDependencies = () => {
    _configureBlob();
    _configureManagers();
    _configureNetworkClient();
    _configurePresenters();
    _configureJsonManager()
}

const _configurePresenters = () => {
    serviceLocator.registerSingleton(
        CreatePresenter,
        serviceLocator.get(PrincipalManager),
        serviceLocator.get(RepresentativeManager)
    );
    serviceLocator.registerSingleton(
        SubTrustPresenter,
        serviceLocator.get(PrincipalManager),
        serviceLocator.get(RepresentativeManager)
    );
    serviceLocator.registerSingleton(
        SectionPresenter,
        serviceLocator.get(PrincipalManager),
        serviceLocator.get(RepresentativeManager)
    );
    serviceLocator.registerSingleton(
        FormPresenter,
        serviceLocator.get(PrincipalManager),
        serviceLocator.get(RepresentativeManager),
        serviceLocator.get(SubAdminManager)
    );
    serviceLocator.registerSingleton(
        DashboardPresenter,
        serviceLocator.get(PrincipalManager),
        serviceLocator.get(RepresentativeManager)
    );
}

const _configureNetworkClient = () => {
    serviceLocator.registerSingleton(AxiosClient, serviceLocator.get(BlobClient));
    serviceLocator.registerSingleton(ApiClient, serviceLocator.get(AxiosClient));
    serviceLocator.registerSingleton(CreateService, serviceLocator.get(ApiClient));
}

const _configureBlob = () => {
    serviceLocator.registerSingleton(BlobClient);
}

const _configureManagers = () => {
    serviceLocator.registerSingleton(RepresentativeManager, []);
    serviceLocator.registerSingleton(PrincipalManager, [doveritel]);
    serviceLocator.registerSingleton(SubAdminManager, []);

}

const _configureJsonManager = () => {
    serviceLocator.registerSingleton(JsonCreateManager,
        serviceLocator.get(CreatePresenter),
        serviceLocator.get(SectionPresenter));
}


