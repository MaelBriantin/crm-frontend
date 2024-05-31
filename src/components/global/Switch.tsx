import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { theme } from '../../assets/themes';
import { getVariantStyle } from '../../utils/switchUtils';

type SwitchProps = {
    vertical?: boolean;
    variant?: 'regular' | 'small';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    label?: string;
    labelPostSwitch?: boolean;
};

type VariantStyleType = {
    color: string;
    height: string;
    width: string;
    margin: string;
    sliderPosition: string;
    sliderSize: string;
    translate: string;
};

export const Switch: React.FC<SwitchProps> = ({ vertical = false, variant = 'regular', onChange, checked, label, labelPostSwitch }) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setIsChecked(!isChecked);
    };

    const variantStyle = getVariantStyle(variant, theme.colors.primary);

    return (
        <SwitchContainer>
            {(label && !labelPostSwitch) && <SwitchLabel $vertical={vertical} $isChecked={isChecked}>{label}</SwitchLabel>}
            <SwitchStyle $vertical={vertical} $isChecked={isChecked} $variantSyle={variantStyle}>
                <SwitchInput type="checkbox" checked={isChecked} onChange={(e) => handleToggle(e)} $variantStyle={variantStyle} />
                <SwitchSlider $variantStyle={variantStyle} />
            </SwitchStyle>
            {(label && labelPostSwitch) && <SwitchLabel $vertical={vertical} $isChecked={isChecked}>{label}</SwitchLabel>}
        </SwitchContainer>
    );
};

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

const SwitchStyle = styled.label<{ $vertical: boolean, $isChecked: boolean, $variantSyle: VariantStyleType }>`
    margin: ${({ $vertical, $variantSyle }): string => $vertical ? `0 -${$variantSyle.margin}px` : '0'};
    transition: all 0.2s ease-in-out;
    display: inline-block;
    position: relative;
    width: ${({ $variantSyle }): string => $variantSyle.width}px;
    height: ${({ $variantSyle }): string => $variantSyle.height}px;
    background-color: ${({ $isChecked }): string => $isChecked ? theme.colors.primary : theme.colors.greyMedium};
    border-radius: 10px;
    cursor: pointer;
    ${({ $vertical }): string => $vertical ? 'transform: rotate(90deg);' : ''};
`;

const SwitchLabel = styled.div<{ $vertical: boolean, $isChecked: boolean }>`
    user-select: none;
    color: ${({ $isChecked }): string => $isChecked ? theme.colors.primary : theme.colors.greyDark};
`;

const SwitchSlider = styled.span<{ $variantStyle: VariantStyleType }>`
    position: absolute;
    top: ${({ $variantStyle }): string => $variantStyle.sliderPosition}px;
    left:  ${({ $variantStyle }): string => $variantStyle.sliderPosition}px;
    width: ${({ $variantStyle }): string => $variantStyle.sliderSize}px;
    height: ${({ $variantStyle }): string => $variantStyle.sliderSize}px;
    background-color: ${theme.colors.white};
    border-radius: 50%;
    transition: transform 0.2s ease-in-out;
`;

const SwitchInput = styled.input<{ $variantStyle: VariantStyleType }>`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${SwitchSlider} {
        transform: translateX(${({ $variantStyle }): string => $variantStyle.translate}px);
    }
`;