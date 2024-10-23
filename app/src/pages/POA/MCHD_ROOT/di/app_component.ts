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
import autobind from "autobind-decorator";
import {Principal} from "../domain/model/Principal";
import {PrincipalAdmin} from "../domain/model/PrincipalAdmin";


export const serviceLocator = ServiceLocator.getInstance();

export class PoaConfig {
    private static instance?: PoaConfig | null;
    private isFinishInitialized: boolean;

    private constructor() {
        this.isFinishInitialized = false;
    }

    @autobind
    public isInitialized(): boolean {
        return this.isFinishInitialized;
    }

    public static getInstance(): PoaConfig {
        if (!PoaConfig.instance) {
            PoaConfig.instance = new PoaConfig();
        }
        return PoaConfig.instance
    }

    @autobind
     public async configureDependencies(){
        await this._configureBlob();
        await this._configureManagers();
        await this._configureNetworkClient();
        await this._configurePresenters();
        await this._configureJsonManager()
        this.isFinishInitialized = true;
    }
     private async _configurePresenters() {
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

    private async _configureNetworkClient()  {
        serviceLocator.registerSingleton(AxiosClient, serviceLocator.get(BlobClient));
        serviceLocator.registerSingleton(ApiClient, serviceLocator.get(AxiosClient));
        serviceLocator.registerSingleton(CreateService, serviceLocator.get(ApiClient));
    }

    private async _configureBlob() {
        serviceLocator.registerSingleton(BlobClient);
    }

    private async _configureManagers(){
        serviceLocator.registerSingleton(RepresentativeManager, new Array<RepresentativeManager>());
        serviceLocator.registerSingleton(PrincipalManager, new Array<Principal>(new Principal(new Array<PrincipalAdmin>(), doveritel)));
        serviceLocator.registerSingleton(SubAdminManager);

    }

    private async _configureJsonManager() {
        serviceLocator.registerSingleton(JsonCreateManager,
            serviceLocator.get(CreatePresenter),
            serviceLocator.get(SectionPresenter));
    }
}

export const poaConfig = PoaConfig.getInstance();




