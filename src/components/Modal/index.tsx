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
    actions?: React.ReactNode;
    disableClose?: boolean;
};

export const Modal: React.FC<ModalProps> = ({ height, width, title, children, disableClose, actions }) => {

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
                    <CloseButton $disableClose={disableClose} onClick={!disableClose ? closeModal : () => { }} >
                        <VscChromeClose />
                    </CloseButton>
                </ModalTitle>
                <ModalContent $actions={!!actions}>
                    {children}
                </ModalContent>
                {actions && 
                <Actions>
                    { actions }
                </Actions>}
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
    background: rgba(0, 0, 0, 0.25);
    animation: ${ContainerDisplayAnimation} 250ms ease-in-out forwards;
    ${({ $closeModalAnimation }) => $closeModalAnimation ? css`animation: ${ContainerCloseAnimation} 250ms;` : ''};    
    backdrop-filter: blur(2px);
`;

const ModalStructure = styled.div<{ $closeModalAnimation: boolean, $style: { height: string | undefined, width: string | undefined } }>`
    padding: 10px;
    animation: all 250ms ease-out;
    width: ${({ $style }) => $style.width};
    height: ${({ $style }) => $style.height};
    max-height: 80%;
    background: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    background: ${theme.colors.white};
    box-shadow: ${theme.shadows.default};
    animation: ${ModalDisplayAnimation} 200ms;
    ${({ $closeModalAnimation }) => $closeModalAnimation ? css`animation: ${ModalCloseAnimation} 250ms;` : ''};
`;

const ModalTitle = styled.div`
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    border-radius: ${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded} 0 0;
    // padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    /* margin-bottom: 10px; */
    font-size: ${theme.fonts.size.P2};
    color: ${theme.colors.greyDark};
    // background: ${theme.colors.white};
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

const ModalContent = styled.div<{$actions: boolean}>`
    padding: 20px 0;
    margin: 10px 20px;
    ${({$actions}) => !$actions && css`margin-bottom: 0;`};
    width: 100%;
    /* height: 90%; */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    /* box-shadow: inset 0px 0px 10px 0px rgba(0,0,0,0.1); */
    /* border-bottom: solid 1px ${theme.colors.greyLight};
    border-top: solid 1px ${theme.colors.greyLight}; */
    outline: solid 1px ${theme.colors.greyLight};
    background: ${theme.colors.white};
    border-radius: ${theme.materialDesign.borderRadius.rounded};
`;

const Actions = styled.div`  
    background: ${theme.colors.white};
    border-radius: 0 0 ${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded};
    padding: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;