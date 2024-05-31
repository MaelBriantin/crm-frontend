import styled from "styled-components";
import {theme} from "../../assets/themes";
import React from "react";


type DetailRowProps = {
    label: string;
    value: string;
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
    return (
        <Row>
            <Label>{label}</Label>
            <Value>{value}</Value>
        </Row>
    );
}

const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const Label = styled.div`
    width: auto;
    color: ${theme.colors.greyMedium};
    font-weight: ${theme.fonts.weights.bold};
`;

const Value = styled.div`

`;