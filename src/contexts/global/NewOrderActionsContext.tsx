import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type NewOrderActionsContextProps = {
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
    disableNext: boolean;
    setDisableNext: Dispatch<SetStateAction<boolean>>;
    disablePrevious: boolean;
    setDisablePrevious: Dispatch<SetStateAction<boolean>>;
    nextMessage: string;
    setNextMessage: Dispatch<SetStateAction<string>>;
    previousMessage: string;
    setPreviousMessage: Dispatch<SetStateAction<string>>;
}

export const NewOrderActionsContext = createContext<NewOrderActionsContextProps>({
    step: 0,
    setStep: () => 0,
    nextMessage: '',
    setNextMessage: () => '',
    previousMessage: '',
    setPreviousMessage: () => '',
    disableNext: false,
    setDisableNext: () => false,
    disablePrevious: false,
    setDisablePrevious: () => false,
});

export const NewOrderActionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [step, setStep] = useState<number>(1);
    const [nextMessage, setNextMessage] = useState<string>('');
    const [previousMessage, setPreviousMessage] = useState<string>('');
    const [disableNext, setDisableNext] = useState<boolean>(false);
    const [disablePrevious, setDisablePrevious] = useState<boolean>(false);

    return (
        <NewOrderActionsContext.Provider value={{
            step,
            setStep,
            nextMessage,
            setNextMessage,
            previousMessage,
            setPreviousMessage,
            disableNext,
            setDisableNext,
            disablePrevious,
            setDisablePrevious,
        }}>
            {children}
        </NewOrderActionsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNewOrderActions = () => useContext(NewOrderActionsContext);