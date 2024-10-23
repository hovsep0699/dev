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
import {Representative} from "../domain/model/Representative";


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
        const principalManager: PrincipalManager = serviceLocator.get<PrincipalManager>(PrincipalManager);
        const representativeManager: RepresentativeManager = serviceLocator.get<RepresentativeManager>(RepresentativeManager);
         console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS:::: ", principalManager instanceof PrincipalManager)
        serviceLocator.registerSingleton(
            CreatePresenter,
            principalManager,
            representativeManager
        );
        serviceLocator.registerSingleton(
            SubTrustPresenter,
            principalManager,
            representativeManager
        );
        serviceLocator.registerSingleton(
            SectionPresenter,
            principalManager,
            representativeManager
        );
        serviceLocator.registerSingleton(
            FormPresenter,
            principalManager,
            representativeManager,
            serviceLocator.get(SubAdminManager)
        );
        serviceLocator.registerSingleton(
            DashboardPresenter,
            principalManager,
            representativeManager
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
        const representatives: Representative[] = new Array<Representative>();
        const principalAdmins: PrincipalAdmin[] = new Array<PrincipalAdmin>();
        serviceLocator.registerSingleton(RepresentativeManager, representatives);
        serviceLocator.registerSingleton(PrincipalManager, new Array<Principal>(new Principal(principalAdmins, doveritel)));
        serviceLocator.registerSingleton(SubAdminManager);

    }

    private async _configureJsonManager() {
        serviceLocator.registerSingleton(JsonCreateManager,
            serviceLocator.get(CreatePresenter),
            serviceLocator.get(SectionPresenter));
    }
}

export const poaConfig = PoaConfig.getInstance();




