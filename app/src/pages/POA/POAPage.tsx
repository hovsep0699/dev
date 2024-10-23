import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {poaConfig} from "./MCHD_ROOT/di/app_component";
import {PoaRouter} from "./MCHD_ROOT/presentation/router/PoaRouter";

interface PoaPageState {
    isLoading: boolean;
}

export  class POAPage extends React.Component<RouteComponentProps, PoaPageState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { isLoading: true };

        // Ensure that dependencies are configured
        this.configure().then(()=>{});
    }
    async configure() {
        await poaConfig.configureDependencies(); // If this function is asynchronous
        this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>; // Or any loading spinner/component
        }
        return <PoaRouter />
    }
}

