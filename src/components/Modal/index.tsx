import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useModal } from '../../contexts/global/ModalContext';
import { theme } from '../../assets/themes';
import { VscChromeClose } from "react-icons/vsc";

type ModalProps = {
    height?: string;
    width?: string;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    disableClose?: boolean;
};

export const Modal: React.FC<ModalProps> = ({ height, width, title, children, disableClose }) => {

    const { isOpen, closeModal, startCloseAnimation, setStartCloseAnimation } = useModal();

    useEffect(() => {
        if (startCloseAnimation) {
            setTimeout(() => {
                setStartCloseAnimation(false);
            }, 225);
        }
    }
        , [startCloseAnimation, setStartCloseAnimation]);

    return (
        <Container $closeModalAnimation={startCloseAnimation} $isOpen={isOpen}>
            <ModalStructure $closeModalAnimation={startCloseAnimation} $style={{ height, width }}>
                <ModalTitle>
                    <span className='title'>{title}</span>
                    <CloseButton $disableClose={disableClose} onClick={!disableClose ? closeModal : () => {}} >
                        <VscChromeClose />
                    </CloseButton>
                </ModalTitle>
                <ModalContent>
                    {children}
                </ModalContent>
            </ModalStructure>
        </Container>
    );

};

const ContainerDisplayAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const ContainerCloseAnimation = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const ModalDisplayAnimation = keyframes`
    0% {
        transform: translate(0, 250%);
    }
    75% {
        transform: translate(0, -10%);
    }
    100% {
        transform: translate(0);
    }
`;

const ModalCloseAnimation = keyframes`
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translate(0, 10%);
    }
    100% {
        transform: translate(0, -250%);
    }
`;

const Container = styled.div<{ $closeModalAnimation: boolean, $isOpen: boolean }>`
    display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: all 250ms;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    animation: ${ContainerDisplayAnimation} 200ms;
    ${({ $closeModalAnimation }) => $closeModalAnimation ? css`animation: ${ContainerCloseAnimation} 250ms;` : ''};    
    backdrop-filter: blur(5px);
`;

const ModalStructure = styled.div<{ $closeModalAnimation: boolean, $style: { height: string | undefined, width: string | undefined } }>`
    padding: 20px;
    animation: all 250ms ease-out;
    width: ${({ $style }) => $style.width};
    height: ${({ $style }) => $style.height};
    max-height: 80%;
    overflow: auto;
    background: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    box-shadow: ${theme.shadows.default};
    animation: ${ModalDisplayAnimation} 200ms;
    ${({ $closeModalAnimation }) => $closeModalAnimation ? css`animation: ${ModalCloseAnimation} 250ms;` : ''};
`;

const ModalTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
    font-size: ${theme.fonts.size.P2};
    color: ${theme.colors.greyDark};
    background: ${theme.colors.white};
    .title {
        ${theme.fonts.size.P3};
        text-transform: uppercase;
    }
`;

const CloseButton = styled.div<{ $disableClose: boolean | undefined }>`
    color: ${theme.colors.greyDark};
    font-size: ${theme.fonts.size.P2};
    ${({ $disableClose }) => !$disableClose && css`
    &:hover {
        cursor: pointer;
        color: ${theme.colors.error};
    }
    `};
`;

const ModalContent = styled.div`
    width: 100%;
    /* height: 90%; */
    display: flex;
    justify-content: center;
    align-items: center;
`;