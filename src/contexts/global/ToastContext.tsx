import { createContext, useContext, useState, Dispatch, SetStateAction, } from "react";

interface ToastContextValue {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    timer: number;
    setTimer: Dispatch<SetStateAction<number>>;
    type: string;
    setType: Dispatch<SetStateAction<string>>;
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
    callToast: (type: string, message: string, duration?: number) => void;
};

export interface ToastProviderProps {
    children: React.ReactNode;
};


export const ToastContext = createContext<ToastContextValue>({
    show: false,
    setShow: () => { },
    timer: 10000,
    setTimer: () => { },
    type: '',
    setType: () => { },
    message: '',
    setMessage: () => { },
    callToast: () => { }
});

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [show, setShow] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(10000);
    const [type, setType] = useState<string>('error');
    const [message, setMessage] = useState<string>('');

    /**
     * Display a toast with the specified parameters.
     *
     * @param {string} type - The type of the toast (error, success, info).
     * @param {string} message - The message to be displayed in the toast.
     * @param {number} duration - The duration of the toast display in milliseconds (default is 10,000 milliseconds).
     */
    const callToast = (type: string, message: string, duration?: number) => {
        
        setShow(true);
        setType(type);
        setMessage(message);
        duration
            ? setTimer(duration)
            : setTimer(10000);
    };

    const toastContextValue: ToastContextValue = {
        show,
        setShow,
        timer,
        setTimer,
        type,
        setType,
        message,
        setMessage,
        callToast
    };

    return (
        <ToastContext.Provider value={toastContextValue}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);