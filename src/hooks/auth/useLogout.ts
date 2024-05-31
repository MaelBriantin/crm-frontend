import { useContext } from "react";
import { fetchAPI } from "../../services/api/fetchApi.config";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { NavigateFunction } from "react-router-dom";

export const useLogoutService = () => {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const logoutService = async (navigate: NavigateFunction) => {
    try {
      await fetchAPI('/logout', 'POST');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  return { logoutService };
};