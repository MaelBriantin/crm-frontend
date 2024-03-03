import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../assets/themes';

type ChipProps = {
    text: string;
    color?: { background: string | undefined; text: string | undefined; } | undefined;
    highlight?: (string | number | undefined)[];
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    iconColor?: string;
    onClickOnChip?: () => void;
    onClickOnIcon?: () => void;
    variant?: 'regular' | 'small';
    disabled?: boolean;
};

export const Chip: React.FC<ChipProps> = ({ text, color, highlight, startIcon, endIcon, onClickOnChip, onClickOnIcon, iconColor, variant = 'regular', disabled }) => {

    const setHighlight = (text: string, highlight: (string | number | undefined)[] | undefined): boolean => {
        if (highlight) {
            for (let i = 0; i < highlight.length; i++) {
                if (text.toLowerCase().includes(String(highlight[i]).toLowerCase()) && highlight[i] !== '') {
                    return true;
                }
            }
        }
        return false;
    }

    return (
        <ChipContainer
            $variant={variant}
            $background={color?.background ?? ''}
            $highlight={setHighlight(text, highlight)}
        >
            {startIcon &&
                <Icon $disabled={disabled} onClick={!disabled ? onClickOnIcon : () => {}} $iconColor={iconColor}>{startIcon}</Icon>}
            <ChipText 
                $text={color?.text ?? ''} 
                onClick={onClickOnChip} 
                // dangerouslySetInnerHTML={{ __html: text }} 
            >{ text }</ChipText>
            {endIcon &&
                <Icon $disabled={disabled} onClick={!disabled ? onClickOnIcon : () => {}} $iconColor={iconColor}>{endIcon}</Icon>}
        </ChipContainer>
    );
};

const ChipContainer = styled.div<{ $background: string, $highlight: boolean, $variant: string }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: fit-content;
    padding: 4px 8px;
    border-radius: 16px;
    font-size: ${({ $variant }): string => $variant === 'small' ? `${theme.fonts.size.S}` : `${theme.fonts.size.P0}`};
    background-color: ${({ $background }): string => $background ? $background : '#e0e0e0'};
    margin-right: 8px;
    ${({ $highlight }) => $highlight && css`outline: ${theme.colors.primary} solid 1px;`};
`;

const ChipText = styled.span<{ $text: string }>`
    color: ${({ $text }): string => $text ? $text : `${theme.colors.dark}`};
`;

const Icon = styled.div<{ $iconColor: string | undefined, $disabled: boolean | undefined }>`
    animation: all 0.25s;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: ${({ $iconColor }): string => $iconColor ? $iconColor : `${theme.colors.dark}`};
    &:hover {
        ${({ $disabled }) => !$disabled && css`
        background-color: ${theme.colors.white};
        cursor: pointer;
        `};
    }
`;
