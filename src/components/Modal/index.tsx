import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useModal } from '../../contexts/global/ModalContext';
import { Button } from '../global/Button';
import { theme } from '../../assets/themes';

export const Modal = () => {
    const { closeModal } = useModal();
    const [closeModalAnimation, setCloseModalAnimation] = useState(false);

    const closeModalHandler = () => {
        setCloseModalAnimation(true);
        setTimeout(() => {
            closeModal();
        }, 400);
    }

    return (
        <Container $closeModalAnimation={closeModalAnimation}>
            <ModalStructure $closeModalAnimation={closeModalAnimation}>
                <Button value='close' onClick={closeModalHandler} />
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
    from {
        transform: translate(0, 150%);
    }
    to {
        transform: translateY(0);
    }
`;

const ModalCloseAnimation = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translate(0, -150%);
    }
`;

const Container = styled.div<{ $closeModalAnimation: boolean }>`
    animation: all 250ms;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${ContainerDisplayAnimation} 400ms;
    ${({ $closeModalAnimation }) => $closeModalAnimation ? css`animation: ${ContainerCloseAnimation} 450ms;` : ''};    
`;

const ModalStructure = styled.div<{ $closeModalAnimation: boolean }>`
    animation: all 250ms ease-out;
    width: 60%;
    height: 60%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    box-shadow: ${theme.shadows.default};
    animation: ${ModalDisplayAnimation} 400ms;
    ${({ $closeModalAnimation }) => $closeModalAnimation ? css`animation: ${ModalCloseAnimation} 450ms;` : ''};
`;