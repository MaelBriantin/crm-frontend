import styled from "styled-components";
import { Outlet } from "react-router-dom";

export const AuthenticatedLayout = () => {
    return (
        <AuthenticatedLayoutStyle >
            <Outlet />
        </AuthenticatedLayoutStyle>
    );
};

const AuthenticatedLayoutStyle = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`;