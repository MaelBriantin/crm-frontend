import React, { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';
import { DeleteAlert } from '../../components/forms/DeleteAlert'; // Assurez-vous que le chemin d'importation est correct

type DeleteAlertContextType = {
    showDeleteAlert: (message: string, confirmAction: () => void) => void;
    closeAlert: () => void;
    confirmAction: () => void;
    setConfirmAction: Dispatch<SetStateAction<() => void>>;
    cancelAction: () => void;
    setCancelAction: Dispatch<SetStateAction<() => void>>;
    isOpenDeleteAlert: boolean;
    setIsOpenDeleteAlert: Dispatch<SetStateAction<boolean>>;
}

const DeleteAlertContext = createContext<DeleteAlertContextType>({
    showDeleteAlert: () => {},
    closeAlert: () => {},
    confirmAction: () => {},
    setConfirmAction: () => {},
    cancelAction: () => {},
    setCancelAction: () => {},
    isOpenDeleteAlert: false,
    setIsOpenDeleteAlert: () => {},
});

const DeleteAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
    const [cancelAction, setCancelAction] = useState<() => void>(() => {});

    const closeAlert = () => {
        setIsOpenDeleteAlert(false);
    };

    const showDeleteAlert = (message: string, confirm: () => void) => {
        setMessage(message);
        setConfirmAction(() => confirm);
        setIsOpenDeleteAlert(true);
    };

    return (
        <DeleteAlertContext.Provider value={{ showDeleteAlert, closeAlert, confirmAction, setConfirmAction, cancelAction, setCancelAction, isOpenDeleteAlert, setIsOpenDeleteAlert }}>
            {children}
            {isOpenDeleteAlert && <DeleteAlert 
                            confirmAction={confirmAction} 
                            cancelAction={() => setIsOpenDeleteAlert(false)} 
                            message={message}  />}
        </DeleteAlertContext.Provider>
    );
};

export { DeleteAlertContext, DeleteAlertProvider };

// eslint-disable-next-line react-refresh/only-export-components
export const useDeleteAlert = () => useContext(DeleteAlertContext);