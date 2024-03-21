import { Alert, Button } from "../global";
import { theme } from "../../assets/themes";
import { useDeleteAlert } from "../../contexts";
import { useState } from "react";

type DeleteAlertProps = {
    message: string;
    confirmAction: () => void;
    cancelAction: () => void;
};

export const DeleteAlert: React.FC<DeleteAlertProps> = ({ message, confirmAction, cancelAction }) => {

    const [close, setClose] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const { setIsOpenDeleteAlert } = useDeleteAlert();

    const handleConfirm = () => {
        setClose(true);
        setConfirmed(true);
        setTimeout(() => {
            confirmAction();
            setIsOpenDeleteAlert(false);
        }, 150);
    }

    const handleClose = () => {
        setClose(true);
        setTimeout(() => {
            cancelAction();
            setIsOpenDeleteAlert(false);
        }, 150);
    }

    return (
        <Alert
            close={close}
            type={'error'}
            absolute
            position='bottom'
        >
            <span>{ message }</span>
            <Button loading={confirmed} value='Confirmer' onClick={handleConfirm} variant='small' color={theme.colors.error} />
            <Button value='Annuler' onClick={handleClose} variant='small' color={theme.colors.error} />
        </Alert>
    )
};