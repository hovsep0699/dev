import Layout from "@distate/app/src/common/Layout"
import {DialogProvider} from "../provider/DialogProvider";
import {GlobalStateProvider} from "../../mocks/context/GlobalState";
import {Route, Switch} from "react-router-dom";
import CreatePoaPage from "../pages/CreatePoa/page/CreatePoa";
import SubTrustPage from "../pages/SubTrust/page/SubTrust";
import React from "react";
import {serviceLocator} from "../../di/app_component";
import {CreatePresenter} from "../pages/CreatePoa/presenter/createPresenter";
import {SubTrustPresenter} from "../pages/SubTrust/presenter/SubTrustPresenter";
import POADashboard from "../pages/POADashboard/page/POADashboard";
import {DashboardPresenter} from "../pages/POADashboard/presenter/DashboardPresenter";

export const PoaRouter = () => {
    const createPresenter = serviceLocator.get(CreatePresenter);
    const subTrustPresenter = serviceLocator.get(SubTrustPresenter);
    const dashboardPresenter = serviceLocator.get(DashboardPresenter);
    return (
        <Layout pageMenuHeader="МЧД" topBarHeading={'МЧД'}>
            <GlobalStateProvider>
                <DialogProvider>
                    <Switch>
                        <Route path={"/POA"} render={(props)=><POADashboard presenter={dashboardPresenter}/>}  exact/>
                        <Route path={"/POA/create"} render={(props)=><CreatePoaPage presenter={createPresenter}/>}  exact/>
                        <Route path={"/POA/subtrust"} render={(props)=><SubTrustPage presenter={subTrustPresenter}/> } exact/>
                    </Switch>
                </DialogProvider>
            </GlobalStateProvider>
        </Layout>
    );
}