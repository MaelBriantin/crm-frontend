import {theme} from "../../assets/themes";
import React, {
    RefObject,
    useEffect,
    useRef,
    useState,
    ReactNode,
    ChangeEvent,
    useCallback,
    forwardRef,
    useImperativeHandle
} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import styled, {css, keyframes} from "styled-components";
import {getVariantStyle} from "../../utils/inputUtils";
import {VscAdd, VscChromeClose, VscChromeMinimize, VscLoading} from "react-icons/vsc";

type VariantStyleType = {
    fontSize: string;
    borderSize: number;
    height: string;
    textColor: string;
};

export const Input = forwardRef((
    props: {
        name?: string,
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
        loading?: boolean;
        symbol?: string;
        showNumberButtons?: boolean;
        maxNumber?: number;
        showMaxNumber?: boolean;
    }, ref) => {
    const {
        name,
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
        label,
        loading,
        symbol,
        showNumberButtons,
        maxNumber,
        showMaxNumber
    } = props

    const inputRef: RefObject<HTMLInputElement> = useRef(null);
    const [hidden, setHidden] = useState(true)
    const [isFocused, setIsFocused] = useState(false);
    const [count, setCount] = useState(null as number | null);

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

    useImperativeHandle(ref, () => ({
        focus: () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }));

    const variantStyle = getVariantStyle(variant, textColor);

    const handleClear = () => {
        onChange({target: {value: ''}} as ChangeEvent<HTMLInputElement>);
        inputRef.current && inputRef.current.focus();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            const valueAsNumber = Number(e.target.value);
            if (!isNaN(valueAsNumber)) {
                if (noNegativeNumber && valueAsNumber < 0 && valueAsNumber !== 0) {
                    return;
                }
                if (maxNumber && valueAsNumber > maxNumber) {
                    return;
                }
                if (maxLength && e.target.value.length <= maxLength) {
                    setCount(valueAsNumber);
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

    const handlePlusClick = () => {
        if (count !== null) {
            if (noNegativeNumber && count < 0) {
                setCount(0);
                onChange({target: {value: 0}} as unknown as ChangeEvent<HTMLInputElement>);
                return;
            }
            if (maxNumber && count >= maxNumber) {
                setCount(maxNumber);
                onChange({target: {value: maxNumber}} as unknown as ChangeEvent<HTMLInputElement>);
                return;
            }
            setCount(count + 1);
            onChange({target: {value: count + 1}} as unknown as ChangeEvent<HTMLInputElement>);
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleMinusClick = () => {
        if (count !== null) {
            if (noNegativeNumber && count <= 0) {
                setCount(0);
                onChange({target: {value: 0}} as unknown as ChangeEvent<HTMLInputElement>);
                return;
            }
            setCount(count - 1);
            onChange({target: {value: count - 1}} as unknown as ChangeEvent<HTMLInputElement>);
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <InputStyle
            $value={!!value || !!count || (type === 'number' && value === 0)}
            $label={!!label} $width={width}
            $type={type} $icon={!!icon}
            $variantStyle={variantStyle}
            $clearable={clearable}
            $symbol={!!symbol}
        >
            {label &&
                <label className="label">{label}</label>
            }
            {
                (type === 'number' && showNumberButtons) &&
                <MinusIcon onClick={handleMinusClick}  $focus={isFocused}>
                    <VscChromeMinimize className={'minusClick'}/>
                </MinusIcon>
            }
            {icon && <span className="icon">{icon}</span>}
            {
                (type === 'password')
                &&
                <Hide onMouseDown={(e) => seeHidden(e)}>
                    {hidden
                        ? <FaEye/>
                        : <FaEyeSlash/>}
                </Hide>
            }
            {
                (clearable && value)
                && <ClearButton onClick={handleClear}><VscChromeClose/></ClearButton>
            }
            {
                loading &&
                <LoadingIcon>
                    <VscLoading/>
                </LoadingIcon>
            }
            {
                symbol &&
                <Symbol $type={type} className="symbol">{symbol}</Symbol>
            }
            <input
                name={name}
                ref={inputRef}
                maxLength={maxLength}
                max={type === 'number' ? max : undefined}
                min={noNegativeNumber ? 0 : undefined}
                placeholder={placeholder}
                type={hidden ? type : 'text'}
                onChange={handleChange}
                value={type === 'number' ? (count ?? '') : value}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onInput={handleInput}
            />
            {
                (type === 'number' && showNumberButtons) &&
                <PlusIcon onClick={handlePlusClick} $focus={isFocused}>
                    <VscAdd className={'plusClick'}/>
                </PlusIcon>
            }
            {
                (type === 'number' && maxNumber && showMaxNumber) &&
                <MaxNumber className="symbol">Max: {maxNumber}</MaxNumber>
            }
        </InputStyle>
    )
});

const MaxNumber = styled.div`
    cursor: default;
    color: ${theme.colors.greyDark};
    font-size: ${theme.fonts.size.XS};
    position: absolute;
    bottom: -50%;
    transform: translateY(50%);
    right: 0;
`

const MinusIcon = styled.div<{
    $focus: boolean
}>`
    user-select: none;
    color: ${theme.colors.greyDark};
    font-size: ${theme.fonts.size.P0};
    padding: 0 2px;
    background: ${theme.colors.greyLight};
    border-right: ${({$focus}) => $focus ? theme.colors.primary : theme.colors.greyMedium} solid 1px;
    border-radius: 3px 0 0 3px;
    height: ${theme.materialDesign.height.mini};
    max-width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 250ms;

    &:hover {
        color: ${theme.colors.white};
        cursor: pointer;
        background: ${theme.colors.primary};
    }

    &:active .minusClick {
        transform: scale(0.8);
    }
`

const PlusIcon = styled.div<{
    $focus: boolean
}>`
    user-select: none;
    color: ${theme.colors.greyDark};
    font-size: ${theme.fonts.size.P0};
    padding: 0 2px;
    background: ${theme.colors.greyLight};
    border-left: ${({$focus}) => $focus ? theme.colors.primary : theme.colors.greyMedium} solid 1px;
    border-radius: 0 3px 3px 0;
    height: ${theme.materialDesign.height.mini};
    max-width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 250ms;

    &:hover {
        color: ${theme.colors.white};
        cursor: pointer;
        background: ${theme.colors.primary};
    }

    &:active .plusClick {
        transform: scale(0.8);
    }
`

const InputStyle = styled.div<{
    $width: string,
    $type: string,
    $icon: boolean,
    $variantStyle: VariantStyleType,
    $clearable: boolean,
    $label: boolean,
    $value: boolean,
    $symbol: boolean
}>`

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

    min-height: ${({$variantStyle}) => $variantStyle.height};
    max-height: ${({$variantStyle}) => $variantStyle.height};
    font-size: ${({$variantStyle}) => $variantStyle.fontSize};
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    min-width: ${({$width}) => $width};
    max-width: ${({$width}) => $width};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: text;
    position: relative;
    border: solid ${theme.colors.greyMedium} ${({$variantStyle}) => $variantStyle.borderSize}px;
    background: ${theme.colors.white};
    transition: all 400ms;

        /* ${({$label}) => $label && css`margin-top: 20px;`}; */

    .label {
        user-select: none;
        font-size: ${theme.fonts.size.P0};
        color: ${theme.colors.greyDark};
        position: absolute;
        top: -20px;
        left: -${({$variantStyle}) => $variantStyle.borderSize}px;
        transform: ${({$value}) => $value ? 'translateY(0)' : 'translateY(20px)'};
        clip-path: ${({$value}) => $value ? 'inset(0)' : 'inset(0 0 100% 0)'};
        transition: transform 0.3s, clip-path 0.3s;

    }

    input {
        color: ${({$variantStyle}) => $variantStyle.textColor};
        font-size: ${({$variantStyle}) => $variantStyle.fontSize};
        padding-left: ${({$icon}): string => $icon ? '35px' : '10px'};
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        font-family: ${theme.fonts.family.source};
        padding-right: ${({$type, $clearable, $symbol}): string =>
                ($type === 'password' || $clearable) && $symbol
                        ? ' 42px'
                        : ($type === 'password' || $clearable)
                                ? ' 35px'
                                : '10px'};
        border-radius: ${theme.materialDesign.borderRadius.default};
        background: ${theme.colors.transparent};
    }

    .icon {
        color: ${theme.colors.greyDark};
        font-size: ${({$variantStyle}) => $variantStyle.fontSize};
        position: absolute;
        top: 50%;
        transform: translateY(-45%);
        left: 10px;
    }

    &:focus-within {
        border: ${theme.colors.primary} solid ${({$variantStyle}) => $variantStyle.borderSize}px;
        color: ${theme.colors.primary};
    }

    &:focus-within label {
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
    transition: all 250ms;

    &:hover {
        color: ${theme.colors.error};
    }
`;

const inputLoading = keyframes`
    0% {
        transform: translateY(-50%) rotate(0deg);
    }
    100% {
        transform: translateY(-50%) rotate(360deg);
    }
`;

const LoadingIcon = styled.div`
    color: ${theme.colors.primary};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    animation: ${inputLoading} 1s infinite;
`;

const Symbol = styled.div<{ $type: string, }>`
    color: ${theme.colors.greyDark};
    font-size: ${theme.fonts.size.P2};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
        // right: ${({$type}) => $type === 'number' || $type === 'password' ? '30px' : '10px'};
    right: ${({$type}) => $type === 'number' || $type === 'password' ? '10px' : '10px'};
`