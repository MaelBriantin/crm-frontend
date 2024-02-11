import styled from "styled-components";
import { Outlet } from "react-router-dom";

export const GuestLayout = () => {
    return (
        <GuestLayoutStyle >
            <Outlet />
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