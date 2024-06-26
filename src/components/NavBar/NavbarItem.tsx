import React, {ReactNode} from "react"
import {styled, css, RuleSet, keyframes} from "styled-components";
import {theme} from "../../assets/themes";

type NavbarItemPropsType = {
    value: string,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => object | void,
    color?: string,
    icon: ReactNode,
    selected: boolean,
    disconnect?: boolean
    disabled?: boolean
}

export const NavbarItem = (props: NavbarItemPropsType) => {
    const {value, selected, disconnect, icon, onClick, disabled} = props;

    return (
        <NavbarItemStyle
            onClick={!disabled
                ? (e: React.MouseEvent<HTMLDivElement>) => onClick(e)
                : () => {}
            }
            $disconnect={disconnect}
            $selected={selected}
            $disabled={!!disabled}
        >
            <span className={'icon'}>{icon}</span>
            <span className={'title'}>{value}</span>
        </NavbarItemStyle>
    );
}

const FontTransition = keyframes`
    0% {
        opacity: 1;
        font-family: ${theme.fonts.family.source};
        font-size: ${theme.fonts.size.P0};
        transform: translateY(0);
    }
    25% {
        opacity: 0;
        font-family: ${theme.fonts.family.source};
        font-size: ${theme.fonts.size.P0};
        transform: translateY(100%);
    }
    50% {
        opacity: 0;
        font-family: ${theme.fonts.family.dancing};
        font-size: ${theme.fonts.size.P3};
        transform: translateY(0);
    }
    75% {
        opacity: 0;
        font-family: ${theme.fonts.family.dancing};
        font-size: ${theme.fonts.size.P3};
        transform: translateY(-100%);
    }
    100% {
        opacity: 1;
        font-family: ${theme.fonts.family.dancing};
        font-size: ${theme.fonts.size.P3};
        transform: translateY(0);
    }
`

const NavbarItemStyle = styled.div<{ $selected: boolean, $disconnect?: boolean, $disabled: boolean }>`
    opacity: ${({$disabled}): false | number => $disabled ? 0.25 : 1};
    overflow: hidden;
    font-size: ${theme.fonts.size.P0};
    user-select: none;
    width: 85%;
    height: ${theme.materialDesign.height.default};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 0px 10px;
    transition: all 250ms;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    ${({$disconnect}): false | RuleSet<object> | undefined => $disconnect && css`
        color: ${theme.colors.error};
    `};

    ${({$selected}): false | RuleSet => $selected && css`
        box-shadow: ${theme.shadows.default};
        background: white;
    `}
    .icon, .title {
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: color 250ms;
    }

    .icon {
        font-size: ${theme.fonts.size.P2};
        ${({$selected}): false | RuleSet => $selected && css`
            color: ${theme.colors.primary};
        `}
    }

    .title {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        ${({$selected}): false | RuleSet => $selected && css`
            font-family: ${theme.fonts.family.dancing};
            font-size: ${theme.fonts.size.P3};
            margin-top: 5px;
            //color: ${theme.colors.primary};
            animation: ${FontTransition} 250ms linear;
        `}
    }

    &:hover {
        ${({$disabled}): false | RuleSet => !$disabled && css`
            box-shadow: ${theme.shadows.default};
            background: white;
            cursor: pointer;
        `}
    }
`
