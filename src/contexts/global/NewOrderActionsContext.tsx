import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type NewOrderActionsContextProps = {
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
    next: () => void;
    setNext: Dispatch<SetStateAction<() => void>>;
    previous: () => void;
    setPrevious: Dispatch<SetStateAction<() => void>>;
    nextMessage: string;
    setNextMessage: Dispatch<SetStateAction<string>>;
    previousMessage: string;
    setPreviousMessage: Dispatch<SetStateAction<string>>;
}

export const NewOrderActionsContext = createContext<NewOrderActionsContextProps>({
    step: 0,
    setStep: () => 0,
    next: () => {},
    setNext: () => () => {},
    previous: () => {},
    setPrevious: () => () => {},
    nextMessage: '',
    setNextMessage: () => '',
    previousMessage: '',
    setPreviousMessage: () => '',
});

export const NewOrderActionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [step, setStep] = useState<number>(1);
    const [next, setNext] = useState<() => void>(() => () => {});
    const [previous, setPrevious] = useState<() => void>(() => () => {});
    const [nextMessage, setNextMessage] = useState<string>('');
    const [previousMessage, setPreviousMessage] = useState<string>('');

    return (
        <NewOrderActionsContext.Provider value={{
            step,
            setStep,
            next,
            setNext,
            previous,
            setPrevious,
            nextMessage,
            setNextMessage,
            previousMessage,
            setPreviousMessage,
        }}>
            {children}
        </NewOrderActionsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNewOrderActions = () => useContext(NewOrderActionsContext);