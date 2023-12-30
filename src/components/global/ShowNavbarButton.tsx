import { styled, keyframes } from "styled-components";
import { theme } from "../../assets/themes";
import { PiButterflyThin } from "react-icons/pi";
import { Dispatch, SetStateAction } from "react";


type ShowNavbarButtonType = {
    showNavbar: boolean;
    setShowNavbar: Dispatch<SetStateAction<boolean>>;
}

export const ShowNavbarButton = (props: ShowNavbarButtonType) => {
    const { showNavbar, setShowNavbar } = props;

    return (
        <NavbarButtonStyle $showNavbar={showNavbar} onClick={() => { setShowNavbar(!showNavbar) }}>
            <PiButterflyThin className="logo" />
        </NavbarButtonStyle>
    );
};

const ShowMenu = keyframes`
    0% {
        opacity: 0;
    }
    75% {
        opacity: 0;
    }
    80%{
        opacity: 0.25;
        transform: scale(0.45);
    }
    90%{
        opacity: 0.5;
        transform: scale(1.1);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`

const NavbarButtonStyle = styled.div<{ $showNavbar: boolean }>`
    cursor: pointer;
    height: 45px;
    width: 45px;
    position: absolute;
    z-index: 999;
    transition: all 450ms;
    top: 20px;
    left: 25px;
    display: ${({ $showNavbar }): string => $showNavbar ? 'none' : 'flex'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    animation: ${ShowMenu} 600ms linear;
    background: whitesmoke;
    border-radius: ${theme.borderRadius.circle};
    box-shadow: ${theme.shadows.default};
    .logo{
        font-size: ${theme.fonts.size.P4};
        transition: all 450ms;
        opacity: 0.25;
    }
    &:hover .logo{
        opacity: 1;
        color: ${theme.colors.primary};
        transform: rotate(-20deg);
    }
`