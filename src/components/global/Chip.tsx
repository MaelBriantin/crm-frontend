import React from 'react';
import styled from 'styled-components';

type ChipProps = {
    text: string;
    color?: {background: string, text: string};
}

export const Chip: React.FC<ChipProps> = ({ text, color }) => {
    return (
        <ChipContainer $background={color?.background ?? ''}>
            <ChipText $text={color?.text ?? ''}>{text}</ChipText>
        </ChipContainer>
    );
};

const ChipContainer = styled.div<{$background: string}>`
    display: inline-flex;
    width: fit-content;
    padding: 4px 8px;
    border-radius: 16px;
    background-color: ${({$background}): string => $background ? $background : '#e0e0e0'};
    margin-right: 8px;
`;

const ChipText = styled.span<{$text: string}>`
    font-size: 14px;
    color: ${({$text}): string => $text ? $text : '#333333'};
`;
