import React, {useState} from "react";
import GeneralModal from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/GeneralModal";

interface ShowGeneralModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
    footer?: React.ReactNode;
    children?: React.ReactNode[];
}

const ShowGeneralModal: React.FC<ShowGeneralModalProps> = ({isOpen, onClose, title, footer, children}) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(isOpen ?? true);

    return (
        <GeneralModal
            isOpen={modalIsOpen}
            onClose={()=> {
                setModalIsOpen(false);
                if (onClose) onClose();
            }
        }
            title={title}
            footer={footer} >
            {children}
        </GeneralModal>
    );
}

export default ShowGeneralModal;