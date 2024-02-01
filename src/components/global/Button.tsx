import { styled, keyframes } from "styled-components";
import { theme } from "../../assets/themes";
import { VscLoading } from "react-icons/vsc";
import React, { RefObject, useEffect, useRef, useState } from "react";

export const Button = (props: { value: string, onClick: (e: React.MouseEvent<HTMLDivElement>) => object | void, loading?: boolean | null }) => {
    const { value, onClick, loading } = props
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

    return (
        <ButtonStyle
            $loading={loading}
            onClick={!loading ? ((e: React.MouseEvent<HTMLDivElement>) => onClick(e)) : () => { }}
        >
            <button hidden={true} />
            {!loading
                && <span ref={textRef}>{value}</span>}
            {loading
                && <span style={{ width }}><VscLoading className={'loading'} /></span>}
        </ButtonStyle>
    )

}

const LoadingKeyframe = keyframes`
    to {
        transform: rotate(360deg);
    }
`
const ButtonStyle = styled.div<{ $loading?: boolean | null }>`
    user-select: none;
    height: ${theme.materialDesign.height.default};
    background: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primary};
    /* padding: 0 ${theme.materialDesign.padding.dense}; */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${theme.materialDesign.borderRadius.default};
    ${({ $loading }): string => !$loading ? `cursor: pointer;` : 'cursor: not-allowed;'};
    color: ${theme.colors.white};
    transition: all 250ms;

    span {
        padding: 0;
        //width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 ${theme.materialDesign.padding.dense};
        font-size: ${theme.materialDesign.fontSize.dense};
        text-transform: uppercase;
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