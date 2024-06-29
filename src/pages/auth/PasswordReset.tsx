import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "../../components/global";

export const PasswordReset: React.FC = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = window.location.pathname.split("/")[2];
  const email = query.get("email");

  useEffect(() => {
    if (token && email) {
      navigate("/reset-password", { state: { token, email } });
    }
  }, [navigate, token, email]);

  return <Loader />
};
