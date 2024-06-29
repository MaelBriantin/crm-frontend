import { fetchAPI, handleAPIResponse } from "../fetchApi.config";
import { APIResponseFormat } from "../../../types/FetchTypes";
import { CallToastProps } from "../../../contexts/global/ToastContext";

type ForgotPasswordType = {
  status: string;
};

export const forgotPassword = async (
  email: string,
  callToast: CallToastProps,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    const response: APIResponseFormat<ForgotPasswordType> = await fetchAPI(
      `/forgot-password`,
      "POST",
      { email },
    );
    handleAPIResponse<ForgotPasswordType>(
      response,
      async () => {
        callToast(
          "success",
          "Un email contenant un lien de réinitialisation vient d'être envoyé à l'adresse indiquée 👍",
        );
        setLoading(false);
      },
      (error) => {
        error.message === "We can't find a user with that email address." &&
          callToast(
            "error",
            "Il semblerait qu'aucun compte ne soit associé à cette email.",
          );
        error.message === "Please wait before retrying." &&
          callToast(
            "info",
            "Merci de patienter quelques instants avant de renouveler votre demande.",
          );
        setLoading(false);
      },
    );
  } catch (error) {
    console.error(error);
  }
};
