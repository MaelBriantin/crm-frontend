import { theme } from "../assets/themes/index.ts";
import styled from "styled-components";

export const HomePage = () => {
    return (
        <Container>
            <Welcome>Accueil</Welcome>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
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