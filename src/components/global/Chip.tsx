import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../assets/themes';

type ChipProps = {
    text: string;
    color?: { background: string | undefined; text: string | undefined; } | undefined;
    highlight?: (string | number | undefined)[];
};

export const Chip: React.FC<ChipProps> = ({ text, color, highlight }) => {

    const setHighlight = (text: string, highlight: (string | number | undefined)[] | undefined): boolean => {
        if (highlight) {
            for (let i = 0; i < highlight.length; i++) {
                if (text.includes(String(highlight[i])) && highlight[i] !== '') {
                    return true;
                }
            }
        }
        return false;
    }

    return (
        <ChipContainer
            $background={color?.background ?? ''}
            $highlight={setHighlight(text, highlight)}
        >
            <ChipText $text={color?.text ?? ''} dangerouslySetInnerHTML={{ __html: text }} />
        </ChipContainer>
    );
};

const ChipContainer = styled.div<{ $background: string, $highlight: boolean }>`
    display: inline-flex;
    width: fit-content;
    padding: 4px 8px;
    border-radius: 16px;
    background-color: ${({ $background }): string => $background ? $background : '#e0e0e0'};
    margin-right: 8px;
    ${({ $highlight }) => $highlight && css`outline: ${theme.colors.primary} solid 1px;`};
`;

const ChipText = styled.span<{ $text: string }>`
    font-size: 14px;
    color: ${({ $text }): string => $text ? $text : `${theme.colors.dark}`};
`;
