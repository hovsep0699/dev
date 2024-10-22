import React, { Component, useEffect, useState } from "react";
import { Box } from "grommet";
import Button from "../../../common/Button";
import Modal from "../../../common/Modal";
import {configureDependencies, serviceLocator} from "../../../di/app_component";
import {CreatePresenter} from "../../../presentation/pages/CreatePoa/presenter/createPresenter";
import GlobalVariadicForm from "../../../presentation/components/forms/GlobalVariadicForm";

type ModalWrapperProps = {
    children: React.ReactNode;
};

type ModalWrapperState = {
    isModalOpen: boolean;
};

class ModalWrapper extends Component<ModalWrapperProps, ModalWrapperState> {
    constructor(props: ModalWrapperProps) {
        super(props);
        this.state = { isModalOpen: false };
        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);
    }

    toggle() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    hide() {
        this.setState({ isModalOpen: false });
    }

    render() {
        // Pass the hide and isVisible props to the Modal component
        const modal = React.cloneElement(this.props.children as React.ReactElement, {
            hide: this.hide,
            isVisible: this.state.isModalOpen
        });

        return (
            <Box align="center" margin="xlarge">
                <Button onClick={this.toggle}>Toggle Modal</Button>
                {this.state.isModalOpen && modal}
            </Box>
        );
    }
}


const ModalForm = ({defaultValues , fields , options , handleSubmit, closeModal ,isModalOpen } :any) => {
    const createPresenter = serviceLocator.get(CreatePresenter);
    const title = 'TitleЗаголовок модального окна';
    const content = "lorem ipsum";

    useEffect(() => {
        configureDependencies()
        const modalPortalTarget = document.createElement('div');
        modalPortalTarget.setAttribute('id', 'modals');
        document.body.appendChild(modalPortalTarget);
    }, []);
    const [num, setNum] = useState(0);
    let a = 0;

    return (
        <>

            <Modal hide={()=>closeModal()}  isVisible={isModalOpen} >
                <Modal.Header title={"hello"} />
                <Modal.Body>
                <GlobalVariadicForm isSubmitting={true} onStateChange={createPresenter.onFormStateChange} defaultValues={defaultValues ?? ''}  initialFields={fields} formTypes={options} handleSubmit={handleSubmit} close={()=>closeModal()}/>
                </Modal.Body>
             </Modal>

            </>
    );
};

export default ModalForm;



// /* Тарифы */
// export const POAPage: React.FC<RouteComponentProps> = () => {
//     return (
//         <Layout pageMenuHeader="Тарифы" topBarHeading={'Тарифы'}>
//                 <Switch>
//                     <Route path={"/"} component={POADashboard} />
//                 </Switch>
//         </Layout>
//     );
// };

