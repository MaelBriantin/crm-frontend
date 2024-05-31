import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type FormActionsContextProps = {
    data: boolean;
    setData: Dispatch<SetStateAction<boolean>>;
    deleteMessage: string;
    setDeleteMessage: Dispatch<SetStateAction<string>>;
    onSave: (e: React.MouseEvent<HTMLDivElement>) => void | object;
    setOnSave: Dispatch<SetStateAction<(e: React.MouseEvent<HTMLDivElement>) => void | object>>;
    onDelete: () => void;
    setOnDelete: Dispatch<SetStateAction<() => void>>;
    isDisableSave: boolean;
    setIsDisableSave: Dispatch<SetStateAction<boolean>>;
    isDisableDelete: boolean;
    setIsDisableDelete: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const FormActionsContext = createContext<FormActionsContextProps>({
    data: false,
    setData: () => false,
    deleteMessage: '',
    setDeleteMessage: () => '',
    onSave: () => {},
    setOnSave: () => () => {},
    onDelete: () => {},
    setOnDelete: () => () => {},
    isDisableSave: false,
    setIsDisableSave: () => false,
    isDisableDelete: false,
    setIsDisableDelete: () => false,
    isLoading: false,
    setIsLoading: () => false,
});

export const FormActionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<boolean>(false);
    const [deleteMessage, setDeleteMessage] = useState<string>('');
    const [onSave, setOnSave] = useState<(e: React.MouseEvent<HTMLDivElement>) => void | object>(() => () => {});
    const [onDelete, setOnDelete] = useState<() => void>(() => () => {});
    const [isDisableSave, setIsDisableSave] = useState<boolean>(false);
    const [isDisableDelete, setIsDisableDelete] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <FormActionsContext.Provider value={{
            data,
            setData,
            deleteMessage,
            setDeleteMessage,
            onSave,
            setOnSave,
            onDelete,
            setOnDelete,
            isDisableSave,
            setIsDisableSave,
            isDisableDelete,
            setIsDisableDelete,
            isLoading,
            setIsLoading
        }}>
            {children}
        </FormActionsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormActions = () => useContext(FormActionsContext);