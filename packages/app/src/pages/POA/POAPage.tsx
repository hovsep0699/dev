import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {configureDependencies} from "./MCHD_ROOT/di/app_component";
import {PoaRouter} from "./MCHD_ROOT/presentation/router/PoaRouter";


export  class POAPage extends React.Component<RouteComponentProps, {}> {
    constructor(props: RouteComponentProps) {
        super(props);
        configureDependencies();
    }

    render() {
        return <PoaRouter />
    }
}

