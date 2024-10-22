import {ServiceLocator} from "@distate/app/src/pages/POA/MCHD_ROOT/di/ServiceLocator";
import {RepresentativeManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/RepresentativeManager";
import {ApiClient} from "@distate/app/src/pages/POA/MCHD_ROOT/core/client/ApiClient";
import {CreateService} from "@distate/app/src/pages/POA/MCHD_ROOT/core/network/CreateService";
import AxiosClient from "@distate/app/src/pages/POA/MCHD_ROOT/core/client/AxiosClient";
import {BlobClient} from "@distate/app/src/pages/POA/MCHD_ROOT/core/client/BlobClient";
import {PrincipalManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/PrincipalManager";
import {CreatePresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/CreatePoa/presenter/createPresenter";
import {doveritel} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/test/testObjects";
import {SubTrustPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/SubTrust/presenter/SubTrustPresenter";
import {SectionPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/Sections/presenter/SectionPresenter";
import {DashboardPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/POADashboard/presenter/DashboardPresenter";
import {JsonCreateManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/JsonManager";
import {FormPresenter} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/components/forms/presenter/FormPresenter";
import {SubAdminManager} from "@distate/app/src/pages/POA/MCHD_ROOT/core/SubAdminManager";


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


