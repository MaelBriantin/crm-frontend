import styled, { keyframes } from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, DiscreteButton, Input } from "../global";
import { useState, ChangeEvent, useEffect } from "react";
import { theme } from "../../assets/themes/index.ts";
import { useNavigate } from "react-router-dom";
import { useLoginService } from "../../hooks/auth/useLogin.ts";
import { validateEmail } from "../../utils/helpers/spells.ts";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSalutation, setSelectedSalutation] = useState("");
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

  useEffect(() => {
    const salutations = ["Bonjour !", "Hey !", "Salut !", "Bienvenue !"];

    setSelectedSalutation(
      salutations[Math.floor(Math.random() * salutations.length)],
    );
  }, []);

  const isValidateLoginForm =
    email !== "" && password !== "" && validateEmail(email);

  return (
    <LoginFormStyle>
      <div className={"welcome"}>
        {selectedSalutation || "Bonjour !"}
        <Hello>👋</Hello>
      </div>
      <div className={"input"}>
        <Input
          variant="large"
          textColor={theme.colors.greyDark}
          placeholder={"Email"}
          icon={<MdAlternateEmail />}
          width={"400px"}
          type={"email"}
          value={email}
          onChange={handleChangeEmail}
        />
        <Input
          variant="large"
          textColor={theme.colors.greyDark}
          placeholder={"Mot de passe"}
          icon={<RiLockPasswordFill />}
          width={"400px"}
          type={"password"}
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <div className={"button"}>
        <Button
          widthProp="400px"
          variant="large"
          value={"Connexion"}
          disabled={!isValidateLoginForm}
          onClick={login}
          loading={loading}
        />
        <DiscreteButton
          value="Mot de passe oublié"
          color={theme.colors.primary}
          onClick={() => navigate("/forgot-password")}
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
  padding: 40px;
  //height: 400px;
  width: 400px;
  border-radius: ${theme.materialDesign.borderRadius.default};
  box-shadow: ${theme.shadows.default};
  background: white;
  gap: 30px;
  .welcome {
    margin: 20px 0;
    width: 100%;
    word-break: break-word;
    display: flex;
    gap: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-family: ${theme.fonts.family.dancing};
    font-size: ${theme.fonts.size.P5};
  }
  .emoji {
    width: 100%;
    word-break: break-word;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: ${theme.fonts.family.dancing};
    font-size: ${theme.fonts.size.P4};
    margin-bottom: 10px;
  }
  .input {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    gap: 30px;
  }
  .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

const Wave = keyframes`
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(14deg);
  }
  20% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(14deg);
  }
  40% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(10deg);
  }
  60% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const Hello = styled.div`
  display: inline-block;
  animation: ${Wave} 1s ease-in-out infinite;
`;
