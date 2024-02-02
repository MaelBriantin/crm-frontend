import { theme } from "../../assets/themes";
import { RefObject, useEffect, useRef, useState, ReactNode, ChangeEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";
import { getVariantStyle } from "../../utils/inputUtils";

type VariantStyleType = {
    fontSize: string;
    borderSize: number;
    height: string;
    textColor: string;
};

export const Input = (
    props: {
        placeholder: string,
        icon?: ReactNode,
        width: number,
        type?: string,
        value: string | number,
        variant?: 'large' | 'regular' | 'small',
        textColor?: string,
        onInput: (e: ChangeEvent<HTMLInputElement>) => void;
    }) => {
    const {
        placeholder,
        icon,
        width,
        type = 'text',
        value,
        variant = 'regular',
        textColor = theme.colors.dark,
        onInput,
    } = props

    const passwordRef: RefObject<HTMLInputElement> = useRef(null);
    const [hidden, setHidden] = useState(true)
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    const seeHidden = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setHidden(!hidden)
        if (passwordRef.current) {
            passwordRef.current.focus();
        }
    }
    useEffect(() => {
        if (type === 'password' && !isFocused) {
            setHidden(true)
        }
    }, [isFocused, setIsFocused, type]);

    const variantStyle = getVariantStyle(variant, textColor);

    return (
        <InputStyle $width={width} $password={type === 'password'} $icon={!!icon} $variantStyle={variantStyle}>
            {icon && <span>{icon}</span>}
            {
                (type === 'password' && hidden)
                && <Hide onMouseDown={(e) => seeHidden(e)}><FaEye /></Hide>
            }
            {
                (type === 'password' && !hidden)
                && <Hide onMouseDown={(e) => seeHidden(e)}><FaEyeSlash /></Hide>
            }
            <input
                ref={passwordRef}
                placeholder={placeholder}
                type={(type === 'password' && hidden) ? type : 'text'}
                onInput={(e: ChangeEvent<HTMLInputElement>) => onInput(e as ChangeEvent<HTMLInputElement>)}
                value={value}
                onBlur={handleBlur}
                onFocus={handleFocus}
                required={true}
            />
        </InputStyle>
    )
}

const InputStyle = styled.div<{ $width: number, $password: boolean, $icon: boolean, $variantStyle: VariantStyleType }>`
    height: ${({ $variantStyle }) => $variantStyle.height};
    font-size: ${({ $variantStyle }) => $variantStyle.fontSize};
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    width: ${({ $width }) => $width}px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: text;
    position: relative;
    border: solid ${theme.colors.greyMedium} ${({ $variantStyle }) => $variantStyle.borderSize}px;
    background: ${theme.colors.white};
    transition: all 400ms;

    input {
        color: ${({ $variantStyle }) => $variantStyle.textColor};
        font-size: ${({ $variantStyle }) => $variantStyle.fontSize};
        padding-left: ${({ $icon }): string => $icon ? '35px' : '10px'};
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        font-family: 'Source Sans 3', sans-serif;
        padding-right: ${({ $password }): string => $password ? ' 35px' : '10px'};
        border-radius: ${theme.materialDesign.borderRadius.default};
        background: ${theme.colors.transparent};
    }

    span {
        color: ${theme.colors.greyDark};
        font-size: ${({ $variantStyle }) => $variantStyle.fontSize};
        position: absolute;
        top: 50%;
        transform: translateY(-45%);
        left: 10px;
    }

    &:focus-within {
        border: ${theme.colors.primary} solid ${({ $variantStyle }) => $variantStyle.borderSize}px;
        color: ${theme.colors.primary};
    }
`
const Hide = styled.div`
    color: ${theme.colors.greyDark};
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-45%);
    right: 10px;
`