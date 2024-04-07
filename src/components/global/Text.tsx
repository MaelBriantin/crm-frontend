import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../assets/themes';

type TextProps = {
    text: string;
    symbol?: string;
    width?: string;
    label?: string;
};

export const Text: React.FC<TextProps> = ({
    text,
    symbol,
    width,
    label
}) => {
    return (
        <TextView
            $value={!!text}
            $symbol={!!symbol}
            $width={width ?? ''}
        >
            {text}
            {symbol && <div className='symbol'>{symbol}</div>}
            {label && <div className='label'>{label}</div>}
        </TextView>
    )
};

const TextView = styled.div<{ $symbol: boolean, $width: string, $value: boolean }>`
position: relative;
font-weight: 500;
height: ${theme.materialDesign.height.medium};
display: flex;
align-items: center;
justify-content: center;
/* padding: ${({ $symbol }) => $symbol ? '6px' : '8px'} 10px; */
padding: 0px 8px;
border-radius: ${theme.materialDesign.borderRadius.rounded};
background-color: ${theme.colors.white};
border: solid 2px ${theme.colors.greyMedium};
font-size: ${theme.fonts.size.P0};
${({ $width }) => $width && css`
    min-width: ${$width};
    justify-content: space-between;
`}

    .symbol {
        margin-left: 5px;
        font-size: ${theme.fonts.size.P2};
        color: ${theme.colors.greyDark};
    }

    .label {
        user-select: none;
        font-size: ${theme.fonts.size.P0};
        color: ${theme.colors.greyDark};
        position: absolute;
        top: -20px;
        left: -2px;
        transform: translateY(0);
        transition: transform 0.3s, clip-path 0.3s;
    }

`;