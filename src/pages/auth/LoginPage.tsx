import styled from "styled-components";
import { LoginForm } from "../../components/auth/LoginForm";

export const LoginPage = () => {
    return (
        <LoginContainer>
            <LoginForm />
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`