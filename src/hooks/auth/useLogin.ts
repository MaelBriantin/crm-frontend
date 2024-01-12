import { useContext, useState } from "react";
import { fetchAPI, handleAPIResponse } from "../../services/api/fetchApi.config";
import { firstOf } from "../../utils/helpers/spells";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { NavigateFunction } from "react-router-dom";
import { ToastContext } from "../../contexts/global/ToastContext";

export const useLoginService = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const { callToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const loginService = async (email: string, password: string, navigate: NavigateFunction) => {
    if (email !== '' && password !== '') {
      setLoading(true);
      try {
        await fetchAPI('/sanctum/csrf-cookie');
        const response = await fetchAPI<{ email: string, password: string }, AuthUser[]>('/login', 'POST', {
          email,
          password,
        });
        handleAPIResponse<AuthUser>(
          response,
          (userData) => {
            setUser(firstOf(userData) as AuthUser);
            setIsAuthenticated(true);
            navigate('/home');
          },
          (error) => {
            setUser(null);
            setIsAuthenticated(false);
            callToast('error', error.message, 5000);
          }
        );
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        callToast('error', 'Une erreur inconnue s\'est produite. Veuillez réessayer ultérieurement.');
      } finally {
        setLoading(false);
      }
    } else {
      callToast('error', 'Veuillez entrer un email et un mot de passe.', 4000);
      setLoading(false);
    }
  };

  return { loginService, loading };
};