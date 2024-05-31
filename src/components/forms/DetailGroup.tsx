import {DetailRow} from "./DetailRow.tsx";
import React from "react";
import {theme} from "../../assets/themes";
import styled from "styled-components";

type DetailGroupProps = {
    arrayValues: {label: string, value: string | number | undefined}[];
    label?: string;
    width?: string;
}
export const DetailGroup: React.FC<DetailGroupProps> = ({arrayValues, label, width}) => {
    return (
        <Container>
            <Label>
                {label}
            </Label>
            <GroupDetail $width={width}>
                {arrayValues.map((detail, index) => (
                    <DetailRow key={index} label={detail.label} value={String(detail.value)}/>
                ))}
            </GroupDetail>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    //padding: 20px;
`;

const Label = styled.div`
    color: ${theme.colors.greyMedium};
    font-weight: ${theme.fonts.weights.bold};
    font-size: ${theme.fonts.size.P0};
`;

const GroupDetail = styled.div<{ $width?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: ${({$width}) => $width ? $width : '100%'};
    padding: 10px;
    margin-right: 10px;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    outline: 1px solid ${theme.colors.greyLight};
`;