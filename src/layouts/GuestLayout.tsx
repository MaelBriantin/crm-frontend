import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Toast } from "../components/global/Toast";

export const GuestLayout = () => {
    return (
        <GuestLayoutStyle >
            <Outlet />
            <Toast />
        </GuestLayoutStyle>
    );
};

const GuestLayoutStyle = styled.div`
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: whitesmoke;
`;