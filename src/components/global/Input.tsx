import { theme } from "../../assets/themes";
import { RefObject, useEffect, useRef, useState, ReactNode, ChangeEvent, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled, { css } from "styled-components";
import { getVariantStyle } from "../../utils/inputUtils";
import { VscChevronDown, VscChevronUp, VscChromeClose } from "react-icons/vsc";

type VariantStyleType = {
    fontSize: string;
    borderSize: number;
    height: string;
    textColor: string;
};

export const Input = (
    props: {
        clearable?: boolean,
        placeholder: string,
        icon?: ReactNode,
        width: string,
        type?: 'text' | 'password' | 'email' | 'search' | 'number',
        noNegativeNumber?: boolean,
        maxLength?: number,
        max?: number,
        value: string | number,
        variant?: 'large' | 'regular' | 'small',
        textColor?: string,
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        label?: string;
    }) => {
    const {
        placeholder,
        clearable = false,
        icon,
        width,
        type = 'text',
        noNegativeNumber,
        maxLength,
        max,
        value,
        variant = 'regular',
        textColor = theme.colors.dark,
        onChange,
        label
    } = props

    const inputRef: RefObject<HTMLInputElement> = useRef(null);
    const [hidden, setHidden] = useState(true)
    const [isFocused, setIsFocused] = useState(false);
    const [count, setCount] = useState(0);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    const handleBlur = useCallback(() => {
        setIsFocused(false);
    }, []);
    const seeHidden = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setHidden(!hidden)
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [hidden, inputRef]);

    useEffect(() => {
        if (type === 'password' && !isFocused) {
            setHidden(true)
        }
    }, [isFocused, setIsFocused, type]);

    useEffect(() => {
        if (type === 'number') {
            setCount(value as number);
        }
    }, [type, value]);

    const variantStyle = getVariantStyle(variant, textColor);

    const handleClear = () => {
        onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
        inputRef.current && inputRef.current.focus();
    };

    const handleCount = (operator: 'plus' | 'minus') => {
        if (String(count) === '' || count === undefined) setCount(0);
        if (noNegativeNumber
            && operator === 'minus'
            && (count === 0
                || (String(count) === '' || count === undefined)))
            return;

        operator === 'plus' && setCount(prevCount => prevCount + 1);
        operator === 'minus' && setCount(prevCount => prevCount - 1);

        inputRef.current && inputRef.current.focus();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            if (!isNaN(Number(e.target.value))) {
                if (maxLength && e.target.value.length <= maxLength) {
                    setCount(Number(e.target.value));
                }
            }
        }
        onChange(e as ChangeEvent<HTMLInputElement>);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (maxLength && e.currentTarget.value.length > maxLength) {
            e.currentTarget.value = e.currentTarget.value.slice(0, maxLength);
        }
    };

    return (
        <InputStyle $value={!!value} $label={!!label} $width={width} $type={type} $icon={!!icon} $variantStyle={variantStyle} $clearable={clearable}>
            {label &&
                <label className="label">{label}</label>
            }
            {icon && <span className="icon">{icon}</span>}
            {
                (type === 'password')
                &&
                <Hide onMouseDown={(e) => seeHidden(e)}>
                    {hidden
                        ? <FaEye />
                        : <FaEyeSlash />}
                </Hide>
            }
            {
                (clearable && value)
                && <ClearButton onClick={handleClear}><VscChromeClose /></ClearButton>
            }
            {
                (type === 'number')
                && (
                    <CountButtons $variantStyle={variantStyle}>
                        <VscChevronUp className="addButton" onClick={() => handleCount('plus')} />
                        <VscChevronDown className="removeButton" onClick={() => handleCount('minus')} />
                    </CountButtons>
                )
            }
            <input
                ref={inputRef}
                maxLength={maxLength}
                max={type === 'number' ? max : undefined}
                min={noNegativeNumber ? 0 : undefined}
                placeholder={placeholder}
                type={hidden ? type : 'text'}
                onChange={handleChange}
                value={type === 'number' ? count : value}
                onBlur={handleBlur}
                onFocus={handleFocus}
                required={true}
                onInput={handleInput}
            />
        </InputStyle>
    )
}

const InputStyle = styled.div<{ $width: string, $type: string, $icon: boolean, $variantStyle: VariantStyleType, $clearable: boolean, $label: boolean, $value: boolean }>`

    // Remove arrows from input number
    // Chrome
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    // Firefox
    input[type='number'] {
        -moz-appearance: textfield;
        appearance: textfield;
    }

    height: ${({ $variantStyle }) => $variantStyle.height};
    font-size: ${({ $variantStyle }) => $variantStyle.fontSize};
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    width: ${({ $width }) => $width};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: text;
    position: relative;
    border: solid ${theme.colors.greyMedium} ${({ $variantStyle }) => $variantStyle.borderSize}px;
    background: ${theme.colors.white};
    transition: all 400ms;

    /* ${({ $label }) => $label && css`margin-top: 20px;`}; */

    .label{
        font-size: ${theme.fonts.size.P0};
        color: ${theme.colors.greyDark};
        position: absolute;
        top: -20px;
        left: -${({ $variantStyle }) => $variantStyle.borderSize}px;
        transform: ${({ $value }) => $value ? 'translateY(0)' : 'translateY(20px)'};
        clip-path: ${({ $value }) => $value ? 'inset(0)' : 'inset(0 0 100% 0)'};
        transition: transform 0.3s, clip-path 0.3s;
        
    }

    input {
        color: ${({ $variantStyle }) => $variantStyle.textColor};
        font-size: ${({ $variantStyle }) => $variantStyle.fontSize};
        padding-left: ${({ $icon }): string => $icon ? '35px' : '10px'};
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        font-family: ${theme.fonts.family.source};
        padding-right: ${({ $type, $clearable }): string => $type === 'password' || $type === 'number' || $clearable ? ' 35px' : '10px'};
        border-radius: ${theme.materialDesign.borderRadius.default};
        background: ${theme.colors.transparent};
    }

    .icon {
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

    &:focus-within label {
        color: ${theme.colors.primary};
        /* transform: translateY(0);
        clip-path: inset(0); */
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

const ClearButton = styled.div`
    color: ${theme.colors.greyDark};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: all 250ms;
    &:hover {
        color: ${theme.colors.error};
    }
`;

const CountButtons = styled.div<{ $variantStyle: VariantStyleType }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    color: ${theme.colors.greyDark};
    font-size: ${({ $variantStyle }) => $variantStyle.fontSize};
    .addButton, .removeButton {
        cursor: pointer;
        transition: all 250ms;
    }
    .addButton {
        margin-bottom: -2.5px;
    }
    .removeButton {
        margin-top: -2.5px;
    }
    .addButton:hover, .removeButton:hover{
        color: ${theme.colors.primary};
    }
`