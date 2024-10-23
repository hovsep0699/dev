import React, {useEffect, useRef} from "react";
import {
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContainer,
    ModalFooter,
    ModalHeader,
    ModalTitle
} from "@distate/app/src/pages/POA/MCHD_ROOT/presentation/pages/dashboard/modals/GeneralModal.styles"


interface GeneralModalProps {
    isOpen: boolean;
    onClose: () => void;

    title?: React.ReactNode | string;
    footer?: React.ReactNode;
    children?: React.ReactNode[];
}

const GeneralModal: React.FC<GeneralModalProps> = ({isOpen, onClose, title, footer, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Close modal when the ESC key is pressed
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <ModalBackdrop isOpen={isOpen} onClick={onClose}>
            <ModalContainer ref={modalRef} onClick={(e) => e.stopPropagation()}>
                {title && (
                    <ModalHeader>
                        <ModalTitle>{title}</ModalTitle>
                        <ModalCloseButton onClick={onClose} aria-label="Close modal">
                            &times;
                        </ModalCloseButton>
                    </ModalHeader>
                )}
                <ModalBody>{children}</ModalBody>
                {footer && <ModalFooter>{footer}</ModalFooter>}
            </ModalContainer>
        </ModalBackdrop>
    );
};

export default GeneralModal;