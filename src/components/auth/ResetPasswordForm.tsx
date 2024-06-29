import styled from "styled-components";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, DiscreteButton, Input, Note } from "../global";
import { useState, ChangeEvent } from "react";
import { theme } from "../../assets/themes/index.ts";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { resetPassword } from "../../services/api/auth/resetPassword.ts";
import { useToast } from "../../contexts/index.ts";

export const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const { callToast } = useToast();
  const navigate = useNavigate();

  const location = useLocation();

  const { token, email } = location.state || {};

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordConfirmation = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirmation(e.target.value);
  };

  const containElement = (element: string, password: string) => {
    switch (element) {
      case "number":
        return /\d/.test(password);
      case "letter":
        return /[a-zA-Z]/.test(password);
      case "uppercase":
        return /[A-Z]/.test(password);
      case "special":
        return /[!@#$%&*]/.test(password);
      case "length":
        return password.length >= 12;
      default:
        return false;
    }
  };

  const requirements = [
    { label: "Un chiffre", check: "number" },
    { label: "Une lettre", check: "letter" },
    { label: "Une majuscule", check: "uppercase" },
    {
      label: "Un caractère spécial parmi : ! @ # $ % & *",
      check: "special",
    },
    { label: "12 caractères", check: "length" },
  ];

  const isValidatePassword =
    passwordConfirmation === password &&
    password !== "" &&
    requirements.every((req) => containElement(req.check, password));

  const resetPasswordRequest = () => {
    resetPassword(
      {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      },
      callToast,
      setLoading,
      navigate,
    );
  };

  return (
    <LoginFormStyle>
      <div className={"welcome"}>Enregistrer un nouveau mot de passe</div>
      <Note
        message={`Modification de mot de passe demandée pour le compte associé à l'adresse email : ${email}`}
        width="380px"
        icon={<VscAccount />}
        iconColor={theme.colors.primary}
      />
      <div className={"sentence"}>
        Pour être considéré comme valide, votre nouveau mot de passe doit être
        composé au minimum de :
      </div>
      <div className={"sentence"}>
        <ul>
          {requirements.map((req, index) => (
            <li key={index}>
              {containElement(req.check, password) ? (
                <IoIosCheckmarkCircle className={"checkIcon"} />
              ) : (
                <MdRadioButtonUnchecked />
              )}{" "}
              {req.label}
            </li>
          ))}
        </ul>
      </div>
      <div className={"input"}>
        <Input
          variant="large"
          textColor={theme.colors.greyDark}
          placeholder={"Nouveau mot de passe"}
          label={"Nouveau mot de passe"}
          icon={<RiLockPasswordFill />}
          width={"400px"}
          type={"password"}
          value={password}
          onChange={handleChangePassword}
        />
        <Input
          variant="large"
          textColor={theme.colors.greyDark}
          placeholder={"Confirmation du nouveau mot de passe"}
          label={"Confirmation du nouveau mot de passe"}
          icon={<RiLockPasswordFill />}
          width={"400px"}
          type={"password"}
          value={passwordConfirmation}
          onChange={handleChangePasswordConfirmation}
        />
      </div>
      <div className={"button"}>
        <Button
          widthProp="400px"
          variant="large"
          value={"Enregistrer le nouveau mot de passe"}
          onClick={resetPasswordRequest}
          loading={loading}
          disabled={!isValidatePassword}
        />
        <DiscreteButton
          value="Retour à l'accueil"
          color={theme.colors.primary}
          onClick={() => {
            navigate("/home");
          }}
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
  width: 400px;
  border-radius: ${theme.materialDesign.borderRadius.default};
  box-shadow: ${theme.shadows.default};
  background: white;
  gap: 30px;
  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2px;
  }
  .welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: ${theme.fonts.family.source};
    font-size: ${theme.fonts.size.P3};
  }
  .sentence {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: justify;
    color: ${theme.colors.greyDark};
    font-family: ${theme.fonts.family.source};
    font-size: ${theme.fonts.size.P0};
  }
  .input {
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    gap: 30px;
  }
  .checkIcon {
    color: ${theme.colors.success};
  }
  .button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;
