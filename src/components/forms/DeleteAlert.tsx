import { Alert, Button } from "../global";
import { theme } from "../../assets/themes";

type DeleteAlertProps = {
    message: string;
    confirmAction: () => void;
    cancelAction: () => void;
    close?: boolean;
};

export const DeleteAlert: React.FC<DeleteAlertProps> = ({ message, confirmAction, cancelAction, close }) => {
    return (
        <Alert 
            close={close}
            type={'error'} 
            absolute 
            position='bottom'
        >
            <span dangerouslySetInnerHTML={{ __html: message }} />
            <Button value='Confirmer' onClick={confirmAction} variant='small' color={theme.colors.error} />
            <Button value='Annuler' onClick={cancelAction} variant='small' color={theme.colors.error} />
        </Alert>
    )
};