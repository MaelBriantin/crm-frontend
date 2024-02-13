import { useEffect } from 'react';
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
  }

  export const Modal: React.FC<ModalProps> = ({ height, width, title, children }) => {

    const { isOpen, closeModal, startCloseAnimation, setStartCloseAnimation } = useModal();

    useEffect(() => {
        if (startCloseAnimation) {
            setTimeout(() => {
                setStartCloseAnimation(false);
            }, 425);
        }
    }
    , [startCloseAnimation, setStartCloseAnimation]);

    return (
        <Container $closeModalAnimation={startCloseAnimation} $isOpen={isOpen}>
            <ModalStructure $closeModalAnimation={startCloseAnimation} $style={{ height, width }}>
                <ModalTitle>
                    <span className='title'>{ title }</span>
                    <CloseButton onClick={closeModal} >
                        <VscChromeClose/>
                    </CloseButton>
                </ModalTitle>
                <ModalContent>
                    { children }
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
    animation: ${ContainerDisplayAnimation} 400ms;
    ${({ $closeModalAnimation }) => $closeModalAnimation ? css`animation: ${ContainerCloseAnimation} 450ms;` : ''};    
`;

const ModalStructure = styled.div<{ $closeModalAnimation: boolean, $style: {height: string | undefined, width: string | undefined} }>`
    padding: 20px;
    animation: all 250ms ease-out;
    width: ${({ $style }) => $style.width};
    height: ${({ $style }) => $style.height};
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

const ModalTitle = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    font-size: ${theme.fonts.size.P2};
    color: ${theme.colors.greyDark};
    .title {
        ${theme.fonts.size.P3};
        text-transform: uppercase;
    }
`;

const CloseButton = styled.div`
    color: ${theme.colors.greyDark};
    font-size: ${theme.fonts.size.P2};
    cursor: pointer;
    &:hover {
        color: ${theme.colors.error};
    }
`;

const ModalContent = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
`;