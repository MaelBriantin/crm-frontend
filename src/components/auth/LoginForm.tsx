import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, DiscreteButton, Input } from "../global";
import { useState, ChangeEvent } from "react";
import { theme } from "../../assets/themes/index.ts";
import { useNavigate } from "react-router-dom";
import { useLoginService } from "../../hooks/auth/useLogin.ts";

export const LoginForm = () => {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("azerty");
  const { loginService, loading } = useLoginService();
  const navigate = useNavigate();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const login = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    loginService(email, password, navigate);
  };

  return (
    <LoginFormStyle>
      <div className={"welcome"}>Bonjour !</div>
      <div className={"input"}>
        <Input
          variant="large"
          textColor={theme.colors.greyDark}
          placeholder={"Email"}
          icon={<MdAlternateEmail />}
          width={"300px"}
          type={"email"}
          value={email}
          onChange={handleChangeEmail}
        />
        <Input
          variant="large"
          textColor={theme.colors.greyDark}
          placeholder={"Mot de passe"}
          icon={<RiLockPasswordFill />}
          width={"300px"}
          type={"password"}
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <div className={"button"}>
        <Button
          variant="large"
          value={"Connexion"}
          onClick={login}
          loading={loading}
        />
        <DiscreteButton
          value="Mot de passe oublié ?"
          color={theme.colors.primary}
          onClick={() => {}}
        />
      </div>
    </LoginFormStyle>
  );
};

const LoginFormStyle = styled.form`
  font-size: ${theme.fonts.size.XXS};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 400px;
  width: 400px;
  border-radius: ${theme.materialDesign.borderRadius.default};
  box-shadow: ${theme.shadows.default};
  background: white;
  .welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: ${theme.fonts.family.dancing};
    font-size: xxx-large;
  }
  .input {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
  .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;
