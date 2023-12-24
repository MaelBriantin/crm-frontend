import styled from "styled-components";
import { useAuthMiddleware } from "../hooks/useAuthMiddleware";
import { Loader } from "../components/global/Loader.tsx";

export const LoadingPage = () => {
    useAuthMiddleware();
    return (
        <LoaderContainer>
            <Loader />
        </LoaderContainer>
    );
};

const LoaderContainer = styled.div`
  height: 100%;
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`