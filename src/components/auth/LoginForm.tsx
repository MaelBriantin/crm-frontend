import styled from "styled-components";
import { Input } from "../global/Input.tsx";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "../global/Button.tsx";
import { useState, ChangeEvent } from "react";
import { fetchAPI, handleAPIResponse } from "../../services/api/fetchApi.config.ts";
import { theme } from "../../assets/themes/index.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext.tsx";
import { useToast } from "../../contexts/global/ToastContext.tsx";


export const LoginForm = () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('azerty');
    const [loading, setLoading] = useState(false);
    const { setUser, setIsAuthenticated } = useAuth();
    const { callToast } = useToast();
    const navigate = useNavigate();

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const login = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (email !== '' && password !== '') {
            setLoading(true);
            try {
                await fetchAPI('/sanctum/csrf-cookie');
                const response = await fetchAPI<{ email: string, password: string }, AuthUser>('/login', 'POST', {
                    email,
                    password,
                });
                handleAPIResponse<AuthUser>(
                    response,
                    (userData) => {
                        setUser(userData);
                        setIsAuthenticated(true);
                        callToast('success', 'Connexion réussie.');
                        navigate('/home');
                    },
                    (error) => {
                        setUser(null);
                        setIsAuthenticated(false);
                        callToast('error', error.message);
                    }
                );
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
            } finally {
                setLoading(false);
            }
        } else {
            console.error('Veuillez entrer un email et un mot de passe.');
            setLoading(false);
        }
    };

    return (
        <LoginFormStyle>
            <div className={'welcome'}>Bonjour !</div>
            <div className={'input'}>
                <Input placeholder={'Email'} icon={<MdAlternateEmail />} width={300} type={'email'} value={email} onInput={(handleChangeEmail)} />
                <Input placeholder={'Mot de passe'} icon={<RiLockPasswordFill />} width={300} type={'password'} value={password} onInput={handleChangePassword} />
            </div>
            <div className={'button'}>
                <Button value={'Connexion'} onClick={login} loading={loading} />
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
  box-shadow: ${theme.shadows.card};
  background: whitesmoke;
  .welcome{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: ${theme.fonts.family.dancing};
    font-size: xxx-large;
  }
  .input{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
  .button{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`