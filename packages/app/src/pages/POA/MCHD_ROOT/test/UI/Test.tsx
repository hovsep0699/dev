import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Layout from "@distate/app/src/common/Layout";


/* Тарифы */
export const Test: React.FC<RouteComponentProps> = () => {
    console.log("pinnnnngggggggggggggg")
    return (
        <Layout pageMenuHeader="Тарифы" topBarHeading={'Тарифы'}>
            <div style={{height: "500px"}}>Test</div>
        </Layout>
    );
};
