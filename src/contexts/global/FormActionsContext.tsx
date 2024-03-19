import React, { createContext, useContext, useState, FormEvent, Dispatch, SetStateAction } from 'react';

interface FormActionsContextProps {
    loadingData: boolean;
    setLoadingData: (value: boolean) => void;
    disableSave: boolean;
    setDisableSave: (value: boolean) => void;
    saving: boolean;
    setSaving: (value: boolean) => void;
    saveMethod: (e: React.FormEvent) => void;
    setSaveMethod: (method: (e: React.FormEvent) => void) => void;
    updateMethod: (e: FormEvent<Element>) => void;
    setUpdateMethod: Dispatch<SetStateAction<(e: FormEvent<Element>) => void>>;
    deleteMethod: () => void;
    setDeleteMethod: (method: () => void) => void;
    deleteMessage: string;
    setDeleteMessage: (message: string) => void;
}

export const FormActionsContext = createContext<FormActionsContextProps>({
    loadingData: false,
    setLoadingData: () => { },
    disableSave: false,
    setDisableSave: () => { },
    saving: false,
    setSaving: () => { },
    saveMethod: () => { },
    setSaveMethod: () => { },
    updateMethod: () => { },
    setUpdateMethod: () => { },
    deleteMethod: () => { },
    setDeleteMethod: () => { },
    deleteMessage: '',
    setDeleteMessage: () => { },
});

export const FormActionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loadingData, setLoadingData] = useState(false);
    const [disableSave, setDisableSave] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveMethod, setSaveMethod] = useState<(e: React.FormEvent) => void>(() => () => {});

    const [updateMethod, setUpdateMethod] = useState<(e: FormEvent<Element>) => void>(() => () => {});
    const [deleteMethod, setDeleteMethod] = useState(() => () => {});
    const [deleteMessage, setDeleteMessage] = useState('');

    return (
        <FormActionsContext.Provider value={{
            loadingData,
            setLoadingData,
            disableSave,
            setDisableSave,
            saving,
            setSaving,
            saveMethod,
            setSaveMethod,
            updateMethod,
            setUpdateMethod,
            deleteMethod,
            setDeleteMethod,
            deleteMessage,
            setDeleteMessage,
        }}>
            {children}
        </FormActionsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormActions = () => useContext(FormActionsContext);