import { theme } from "../../assets/themes";
import { RefObject, useEffect, useRef, useState, ReactNode, ChangeEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from "styled-components";

export const Input = (
    props: {
        placeholder: string,
        icon?: ReactNode,
        width: number,
        type: string,
        value: string,
        onInput: (e: ChangeEvent<HTMLInputElement>) => void;
    }) => {
    const {
        placeholder,
        icon,
        width,
        type,
        value,
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
    }, [isFocused, setIsFocused]);

    return (
        <InputStyle $width={width} $password={type === 'password'} $icon={!!icon}>
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

const InputStyle = styled.div<{ $width: number; $password: boolean; $icon: boolean }>`
    width: ${({ $width }) => $width}px;
    height: ${theme.materialDesign.height.default};
    border-radius: ${theme.materialDesign.borderRadius.default};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.colors.greyDark};
    cursor: text;
    position: relative;
    border: solid 2px ${theme.colors.greyMedium};
    background: ${theme.colors.white};
    transition: all 400ms;
    font-size: ${theme.fonts.size.P1};

    input {
        color: ${theme.colors.greyDark};
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        font-size: ${theme.fonts.size.P1};
        font-family: 'Source Sans 3', sans-serif;
        padding-left: ${({ $icon }):string => $icon ? '35px' : '10px'};
        padding-right: ${({ $password }): string => $password ? ' 35px' : '10px'};
        border-radius: ${theme.materialDesign.borderRadius.default};
        background: ${theme.colors.transparent};
    }

    span {
        position: absolute;
        top: 50%;
        transform: translateY(-45%);
        left: 10px;
    }

    &:focus-within {
        border: ${theme.colors.primary} 2px solid;
        color: ${theme.colors.primary};
    }
`
const Hide = styled.div`
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-45%);
    right: 10px;
`