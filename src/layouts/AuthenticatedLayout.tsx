import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Toast } from "../components/global/Toast";
import { Navbar } from "../components/global/Navbar";
import { theme } from "../assets/themes";
import { ShowNavbarButton } from "../components/global/ShowNavbarButton";
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
    height: 98%;
    width: 100%;
    margin: 0 0.5%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: ${theme.materialDesign.borderRadius.default};
    box-shadow: ${theme.shadows.default};
`