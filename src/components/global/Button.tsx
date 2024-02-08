import { styled, keyframes } from "styled-components";
import { theme } from "../../assets/themes";
import { VscLoading } from "react-icons/vsc";
import { getVariantStyle } from "../../utils/buttonUtils";
import React, { RefObject, useEffect, useRef, useState } from "react";

type VariantStyleType = {
    fontSize: string;
    borderSize: number;
    height: string;
    textColor: string;
    backgroundColor: string;
    padding: string;
};

type ButtonProps = {
    value?: string;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => object | void;
    loading?: boolean | null;
    variant?: 'regular' | 'large' | 'small';
    icon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ value, onClick, loading, variant = 'regular', icon }) => {
    const textRef: RefObject<HTMLInputElement> = useRef(null);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        if (textRef.current && !loading) {
            setTimeout(() => {
                if (textRef.current) {
                    const textWidth = textRef.current.offsetWidth;
                    setWidth(textWidth - 1);
                }
            }, 500)
        }
    }, [value, loading]);

    const variantStyle = getVariantStyle(variant, theme.colors.white, theme.colors.primary);

    return (
        <ButtonStyle
            $variantStyle={variantStyle}
            $loading={loading}
            onClick={!loading ? ((e: React.MouseEvent<HTMLDivElement>) => onClick(e)) : () => { }}
        >
            <button hidden={true} />
            {(!loading && !icon && value) &&
                <span className="textContent" ref={textRef}>{value}</span>}
            {(!loading && icon && value) &&
                <span className="textContent">{icon}{value}</span>}
            {(!loading && icon && !value) &&
                <span className="textContent iconSolo">{icon}</span>} 
            {loading && 
                <span className="textContent" style={{ width }}><VscLoading className={'loading'} /></span>}
        </ButtonStyle>
    )

}

const LoadingKeyframe = keyframes`
    to {
        transform: rotate(360deg);
    }
`
const ButtonStyle = styled.div<{ $loading?: boolean | null, $variantStyle: VariantStyleType }>`
    user-select: none;
    height: ${({ $variantStyle }) => $variantStyle.height};
    font-size: ${({ $variantStyle }) => $variantStyle.fontSize};
    background: ${theme.colors.primary};
    border: ${({ $variantStyle }) => $variantStyle.borderSize}px solid ${theme.colors.primary};
    /* padding: 0 ${theme.materialDesign.padding.dense}; */
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    ${({ $loading }): string => !$loading ? `cursor: pointer;` : 'cursor: wait;'};
    color: ${theme.colors.white};
    transition: all 250ms;

    .textContent {
        padding: 0;
        //width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 0 ${({ $variantStyle }) => $variantStyle.padding};
        font-size: ${({ $variantStyle }) => $variantStyle.fontSize};
        text-transform: uppercase;
        color: ${theme.colors.white};
    }

    .iconSolo {
        font-size: ${theme.fonts.size.P3};
    }

    &:hover .textContent{
        color: ${({ $loading }): string | false => !$loading && `${theme.colors.primary};`};
    }

    &:hover {
        color: ${({ $loading }): string | false => !$loading && `${theme.colors.primary};`};
        background: ${({ $loading }): string | false => !$loading && `${theme.colors.white};`};
    }

    .loading {
        color: ${theme.colors.white};
        font-size: x-large;
        animation: ${LoadingKeyframe} 600ms linear infinite;
    }
`