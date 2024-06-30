import styled from "styled-components";
import { theme } from "../../assets/themes";
import { IoMdClose } from "react-icons/io";
import { useToast } from "../../contexts/global/ToastContext";
import { useCallback, useEffect, useRef } from "react";

export const Toast = () => {
    const { show, setShow, timer, type, message } = useToast();
    const { toastTitle, toastColor } = typeTitleColor(type);
    const timeoutRef = useRef<number | null>(null);

    const resetToastContext = useCallback(() => {
        setShow(false);
    }, [setShow]);

    const resetTimeout = useCallback(() => {
        // If the toast is currently visible and there is an existing timeout,
        // clear the existing timeout to prevent it from hiding the toast.
        if (show && timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // If the toast is still visible after clearing the timeout,
        // set a new timeout to hide the toast after the specified duration.
        if (show) {
            // Use a ref to stock the timeout and prevent clearing issues.
            timeoutRef.current = setTimeout(() => {
                resetToastContext();
            }, timer);
        }
    }, [show, timer, resetToastContext]);

    useEffect(() => {
        resetTimeout();
    });

    return (
        <ToastStyle
            $color={toastColor}
            $show={show}
            onMouseEnter={() => resetTimeout()}
        >
            <div className="toastTitle">
                <span>{toastTitle}</span>
                <IoMdClose className={'closeIcon'} onClick={resetToastContext} />
            </div>
            <div className="toastMessage">
                <span 
                    // dangerouslySetInnerHTML={{ __html: message }} 
                >{ message }</span>
            </div>
        </ToastStyle>
    );
};

const typeTitleColor = (type: string): { toastTitle: string, toastColor: string } => {
    let toastTitle = '';
    let toastColor = '';
    switch (type) {
        case 'error':
            toastTitle = 'Oups...';
            toastColor = theme.colors.error;
            break;
        case 'success':
            toastTitle = 'Validé';
            toastColor = theme.colors.success;
            break;
        default:
        case 'info':
            toastTitle = 'Information';
            toastColor = theme.colors.blue;
            break;
    }
    return {
        toastTitle,
        toastColor
    };
};


const ToastStyle = styled.div<{ $color: string, $show: boolean }>`
    z-index: 99999;
    background-color: ${theme.colors.white};
    position: fixed;
    bottom: 50px;
    right: 50px;
    min-height: 100px;
    width: 300px;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px solid ${({ $color }): string => $color};
    overflow: hidden;
    transition: all 400ms;
    transform: ${({ $show }): string => $show ? `translateX(0)` : `translateX(200%)`};
    .toastTitle{
        color: ${theme.colors.white};
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${({ $color }): string => $color};
        font-family: ${theme.fonts.family.dancing};
        font-size: ${theme.fonts.size.P3};
    }
    .closeIcon {
        padding: 10px;
        cursor: ${({ $show }): string => $show ? 'pointer' : 'default '};;
        opacity: 1;
        transition: all 100ms;
        font-size: large;
    }
    .closeIcon:hover{
        opacity: 0.75;
    }
    .toastMessage{
        text-overflow: ellipsis;
        min-height: 60px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: #f5f5f540;
        font-size: ${theme.fonts.size.P1};
    }
    .toastTitle span, .toastMessage span{
        padding: 5px 10px;
    }
    .toastMessage span{

    }
`
