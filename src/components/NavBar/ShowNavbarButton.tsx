import { styled } from "styled-components";
import { theme } from "../../assets/themes";
import { Dispatch, SetStateAction } from "react";


type ShowNavbarButtonType = {
    showNavbar: boolean;
    setShowNavbar: Dispatch<SetStateAction<boolean>>;
}

export const ShowNavbarButton = (props: ShowNavbarButtonType) => {
    const { showNavbar, setShowNavbar } = props;

    return (
        <NavbarButtonStyle $showNavbar={showNavbar} onClick={() => { setShowNavbar(!showNavbar) }}>
            <div className="top" />
            <div className="bottom" />
        </NavbarButtonStyle>
    );
};

const NavbarButtonStyle = styled.div<{ $showNavbar: boolean }>`
    display: flex;
    height: 30px;
    width: 30px;
    position: absolute;
    z-index: 999;
    transition: all 450ms;
    top: 50vh;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top, .bottom {
        width: 4px;
        border-radius: ${theme.borderRadius.round};;
        height: 50%;
        transition: all 150ms;
        background-color: ${theme.colors.greyLight};	
    }
    .top {
        transform: translateY(2px);
    }
    .bottom {
        transform: translateY(-2px);
    }
    &:hover {
        cursor: pointer;
    }
    &:hover .top {
        background: ${theme.colors.primary};
        transform: ${({ $showNavbar }): string => $showNavbar ? 'rotate(45deg) translateY(4.5px)' : 'rotate(-45deg) translateY(4.5px)'};
        //margin-bottom: 5px;
    }
    &:hover .bottom {
        background: ${theme.colors.primary};
        transform: ${({ $showNavbar }): string => $showNavbar ? 'rotate(-45deg) translateY(-4.5px)' : 'rotate(45deg) translateY(-4.5px)'};
        //margin-top: 5px;
    }
`;
