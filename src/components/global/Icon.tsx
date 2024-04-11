import styled, {css} from "styled-components";
import React, {ReactNode} from "react";
import {theme} from "../../assets/themes";

type IconProps = {
    icon: ReactNode;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => object | void;
    variant?: 'small' | 'regular';
    color?: string;
    disabled?: boolean;
}

export const Icon: React.FC<IconProps> = ({
                                              icon,
                                              onClick,
                                              variant = 'regular',
                                              color = `${theme.colors.primary}`,
                                              disabled
                                          }) => {

    const colorStyle = disabled ? theme.colors.greyMedium : color;

    return (
        <Container
            $variant={variant}
            $color={colorStyle}
            onClick={!disabled ? onClick : () => {}}
            $disabled={disabled}
        >
            <div className={'icon'}>
                {icon}
            </div>
        </Container>
    );
};

const Container = styled.div<{ $variant: string, $color: string, $disabled: boolean | undefined }>`
    opacity: ${({$disabled}) => $disabled ? 0.5 : 1};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({$variant}) => $variant === 'small' ? '18px' : '24px'};
    height: ${({$variant}) => $variant === 'small' ? '18px' : '24px'};
    border-radius: 100%;
    outline: ${({$variant}) => $variant === 'small' ? '2px' : '2px'} ${theme.colors.greyMedium} solid;
    transition: all 250ms;

    .icon {
        transition: all 250ms;
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: ${({$variant}) => $variant === 'small' ? `${theme.fonts.size.XS}` : `${theme.fonts.size.P0}`};
        transform: translate(-45%, -40%);
        color: ${theme.colors.greyMedium}
    }

    &:hover {
        cursor: ${({$disabled}) => $disabled ? 'default' : 'pointer'};
        outline: ${({$variant, $color}) => $variant === 'small' ? `2px ${$color}` : `2px ${$color}`} solid;
    }

    &:hover .icon {
        ${({$disabled, $color}) => !$disabled && css`
            color: ${$color};`
        };
    }
`;