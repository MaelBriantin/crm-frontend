import { fetchAPI, handleAPIResponse } from "../fetchApi.config";
import { APIResponseFormat } from "../../../types/FetchTypes";
import { CallToastProps } from "../../../contexts/global/ToastContext";

type ResetPasswordType = {
  status: string;
};
type ResetPassordPropsType = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};
export const resetPassword = async (
  props: ResetPassordPropsType,
  callToast: CallToastProps,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: (path: string) => void
) => {
  const {email, token, password, password_confirmation} = props;
  try {
    setLoading(true);
    const response: APIResponseFormat<ResetPasswordType> = await fetchAPI(
      `/reset-password`,
      "POST",
      {
        email,
        token,
        password,
        password_confirmation,
      },
    );
    handleAPIResponse<ResetPasswordType>(
      response,
      async () => {
        callToast(
          "success",
          "Mot de passe modifié avec succès 👌",
        );
        setLoading(false);
        navigate('/');
      },
      (error) => {
        error.message === "This password reset token is invalid." &&
          callToast(
            "error",
            "Vous n'êtes pas autorisé à effectuer cette action. Si vous êtes arrivé ici par un lien de réinitialisation, veuillez vous assurer que celui-ci n'est pas périmé (les liens ont une durée de vie de soixante minutes) ou qu'il n'a pas déjà été utilisé.",
            12000
          );
        error.message === "Please wait before retrying." &&
          callToast(
            "info",
            "Merci de patienter quelques instans avant de renouveler votre demande.",
          );
        setLoading(false);
      },
    );
  } catch (error) {
    console.error(error);
  }
};
