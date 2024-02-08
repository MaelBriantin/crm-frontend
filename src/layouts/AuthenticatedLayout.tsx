import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Toast } from "../components/global/Toast";
import { Navbar } from "../components/NavBar";
import { theme } from "../assets/themes";
import { ShowNavbarButton } from "../components/NavBar/ShowNavbarButton";
import { useState } from "react";

export const AuthenticatedLayout = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    return (
        <AuthenticatedLayoutStyle>
            <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
            <OutletContainer>
                <Outlet />
                <ShowNavbarButton showNavbar={showNavbar} setShowNavbar={setShowNavbar} />
            </OutletContainer>
            <Toast />
        </AuthenticatedLayoutStyle>
    );
};

const AuthenticatedLayoutStyle = styled.div`
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: whitesmoke;
`;

const OutletContainer = styled.div`
    position: relative;
    transition: all 250ms;
    z-index: 99;
    height: 98vh;
    width: 100vw;
    margin: 0 0.5vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: ${theme.materialDesign.borderRadius.default};
    box-shadow: ${theme.shadows.default};
`