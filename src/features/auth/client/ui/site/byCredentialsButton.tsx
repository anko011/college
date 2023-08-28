import {useState} from "react";
import {IconLogin} from "@tabler/icons-react";
import {ActionButton} from "@/share/client/components/site/actionButton";
import {Modal} from "@/share/client/components/site/modal";
import {AuthByCredentialsForm} from "./form";

export const AuthByCredentialsButton = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }

    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    return (
        <>
            <Modal isOpen={isOpenModal} onCloseModal={handleCloseModal}>
                <AuthByCredentialsForm/>
            </Modal>

            <ActionButton onClick={handleOpenModal}>
                <IconLogin/>
            </ActionButton>
        </>
    )
}