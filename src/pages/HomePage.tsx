import { useNavigate } from "react-router-dom";
import { theme } from "../assets/themes/index.ts";
import { Button } from "../components/global/Button.tsx";
import { fetchAPI } from "../services/api/fetchApi.config.ts";
import styled from "styled-components";

export const HomePage = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <Welcome>Welcome !</Welcome>
            <Button value={'Déconnexion'} onClick={async (e) => {
                e.preventDefault();
                try {
                    fetchAPI('/logout', 'POST')
                    navigate('/login');
                } catch (e) {
                    console.error(e);
                }
            }} />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

const Welcome = styled.div`
    font-size: ${theme.fonts.size.P4};
    font-family: ${theme.fonts.family.dancing};
`