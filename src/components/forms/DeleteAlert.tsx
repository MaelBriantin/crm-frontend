import { Alert, Button } from "../global";
import { theme } from "../../assets/themes";

type DeleteAlertProps = {
    message: string;
    confirmAction: () => void;
    cancelAction: () => void;
};

export const DeleteAlert: React.FC<DeleteAlertProps> = ({ message, confirmAction, cancelAction }) => {
    return (
        <Alert 
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