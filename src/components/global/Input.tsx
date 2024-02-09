import { theme } from "../../assets/themes";
import { RefObject, useEffect, useRef, useState, ReactNode, ChangeEvent, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import styled from "styled-components";
import { getVariantStyle } from "../../utils/inputUtils";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";

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
        value: string | number,
        variant?: 'large' | 'regular' | 'small',
        textColor?: string,
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    }) => {
    const {
        placeholder,
        clearable = false,
        icon,
        width,
        type = 'text',
        value,
        variant = 'regular',
        textColor = theme.colors.dark,
        onChange,
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
        operator === 'plus' ? setCount(prevCount => prevCount + 1) : setCount(prevCount => prevCount - 1);
        inputRef.current && inputRef.current.focus();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            !isNaN(Number(e.target.value)) && setCount(Number(e.target.value));
        }
        onChange(e as ChangeEvent<HTMLInputElement>);
    };

    return (
        <InputStyle $width={width} $type={type} $icon={!!icon} $variantStyle={variantStyle} $clearable={clearable}>
            {icon && <span className="icon">{icon}</span>}
            {
                (type === 'password' && hidden)
                && <Hide onMouseDown={(e) => seeHidden(e)}><FaEye /></Hide>
            }
            {
                (type === 'password' && !hidden)
                && <Hide onMouseDown={(e) => seeHidden(e)}><FaEyeSlash /></Hide>
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
                placeholder={placeholder}
                type={(type === 'password' && hidden) ? type : 'text'}
                onChange={handleChange}
                value={type === 'number' ? count : value}
                onBlur={handleBlur}
                onFocus={handleFocus}
                required={true}
            />
        </InputStyle>
    )
}

const InputStyle = styled.div<{ $width: string, $type: string, $icon: boolean, $variantStyle: VariantStyleType, $clearable: boolean }>`
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

    input {
        color: ${({ $variantStyle }) => $variantStyle.textColor};
        font-size: ${({ $variantStyle }) => $variantStyle.fontSize};
        padding-left: ${({ $icon }): string => $icon ? '35px' : '10px'};
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        font-family: 'Source Sans 3', sans-serif;
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
    background-color: ${theme.colors.greyLight};
    transition: all 250ms;
    &:hover {
        background-color: ${theme.colors.error};
        color: ${theme.colors.white};
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