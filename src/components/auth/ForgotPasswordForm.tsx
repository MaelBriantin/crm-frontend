import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { Button, DiscreteButton, Input } from "../global";
import { useState, ChangeEvent } from "react";
import { theme } from "../../assets/themes/index.ts";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helpers/spells.ts";
import { useToast } from "../../contexts/index.ts";
import { forgotPassword } from "../../services/api/auth/forgotPassword.ts";


export const ForgotPasswordForm = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const isValidatedEmail = validateEmail(email);

  const {callToast} = useToast();

  const forgotPasswordRequest = async() => {
    forgotPassword(email, callToast, setLoading);
  };

    return (
      <LoginFormStyle>
        <div className={"welcome"}>Vous avez oublié votre mot de passe ?</div>
        <div className={"sentence"}>
          Ne vous en faites pas, cela arrive... Renseignez l'adresse email
          associée à votre compte utilisateur et si nous trouvons une
          correspondance, nous vous enverrons un email avec un lien pour
          réinitialiser votre mot de passe.
        </div>
        <div className={"sentence"}>
          Pour vous éviter à nouveau ce désagrément, vous pouvez peut-être
          utiliser un gestionnaire de mot de passe 😉
        </div>
        <div className={"input"}>
          <Input
            variant="large"
            icon={<MdAlternateEmail />}
            textColor={theme.colors.greyDark}
            placeholder={"Email du compte utilisateur"}
            width={"400px"}
            type={"email"}
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className={"button"}>
          <Button
            widthProp="400px"
            variant="large"
            value={"Envoyer le lien"}
            onClick={forgotPasswordRequest}
            loading={loading}
            disabled={!isValidatedEmail}
          />
          <DiscreteButton
            value="Retour au formulaire de connexion"
            color={theme.colors.primary}
            onClick={() => navigate("/login")}
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
