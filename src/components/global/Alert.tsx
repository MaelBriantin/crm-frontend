import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { theme } from '../../assets/themes';

export type AlertType = 'error' | 'success';

export type AlertContentTypes = {
    type: 'error' | 'success';
    absolute?: boolean;
    position?: 'top' | 'bottom';
    children?: React.ReactNode;
}

export const Alert: React.FC<AlertContentTypes> = ({ type, absolute, position = 'top', children }) => {
    const [show, setShow] = React.useState<boolean>(true);
    const [openAnimation, setOpenAnimation] = React.useState<boolean>(true);
    const [closeAnimation, setCloseAnimation] = React.useState<boolean>(false);
    
    useEffect(() => {
        if (show) {
            setOpenAnimation(true);
            setCloseAnimation(false);
        } else {
            setCloseAnimation(true);
            setTimeout(() => {
                setOpenAnimation(false);
                setShow(false);
            }, 250);
        }
    }, [show]);

    return (
        <AlertStyle $type={type} $absolute={{ absolute, position }} $animation={{ openAnimation, closeAnimation }}>
            { children }
        </AlertStyle>
    );
}

const AbsoluteContainerDisplayAnimationTop = keyframes`
    from {
        transform: translate(-50%, -100%);
        opacity: 0;
    }
    to {
        transform: translate(-50%, 0);
        opacity: 1;
    }
`;

const AbsoluteContainerDisplayAnimationBottom = keyframes`
    from {
        transform: translate(-50%, 100%);
        opacity: 0;
    }
    to {
        transform: translate(-50%, 0);
        opacity: 1;
    }
`;

const ContainerDisplayAnimationTop = keyframes`
    from {
        transform: translate(0, -100%);
        opacity: 0;
    }
    to {
        transform: translate(0, 0);
        opacity: 1;
    }
`;

const ContainerDisplayAnimationBottom = keyframes`
    from {
        transform: translate(0, 100%);
        opacity: 0;
    }
    to {
        transform: translate(0, 0);
        opacity: 1;
    }
`;


const AlertStyle = styled.div<{ $type: string, $absolute: { absolute: boolean | undefined, position: string }, $animation: { openAnimation: boolean, closeAnimation: boolean } }>`
    display: flex;
    ${({ $absolute }) => $absolute?.absolute && css`
    position: absolute;
    ${$absolute.position === 'top' ? 'top: 2vh;' : 'bottom: 2vh;'};
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    `};
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px;
    margin: 10px 0;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    background-color: ${({ $type }) => $type === 'error' ? theme.colors.error : theme.colors.success};
    color: ${theme.colors.white};
    font-size: ${theme.fonts.size.P0};
    text-align: center;

    ${({ $animation, $absolute }) =>
        $animation.openAnimation && $absolute.absolute
            ? css`animation: ${$absolute.position === 'top' ? AbsoluteContainerDisplayAnimationTop : AbsoluteContainerDisplayAnimationBottom} 250ms ease-in-out forwards;`
            : $animation.closeAnimation && $absolute.absolute
                ? css`animation: ${$absolute.position === 'top' ? AbsoluteContainerDisplayAnimationTop : AbsoluteContainerDisplayAnimationBottom} 250ms ease-in-out reverse forwards;`
                : ''};

    ${({ $animation, $absolute }) =>
        $animation.openAnimation && !$absolute.absolute
        ? css`animation: ${$absolute.position === 'top' ? ContainerDisplayAnimationTop : ContainerDisplayAnimationBottom} 250ms ease-in-out forwards;`
            : $animation.closeAnimation && $absolute.absolute
                ? css`animation: ${$absolute.position === 'top' ? ContainerDisplayAnimationTop : ContainerDisplayAnimationBottom} 250ms ease-in-out reverse forwards;`
                : ''};

    transition: all 250ms;
`;
