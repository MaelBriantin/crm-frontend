import React from 'react';
import styled from 'styled-components';
import { theme } from '../../assets/themes';

type DiscreteButtonProps = {
    value: string;
    icon?: string;
    onClick: () => void;
    color: string;
    disabled?: boolean;
};

export const DiscreteButton: React.FC<DiscreteButtonProps> = ({ value, icon, onClick, color, disabled }) => {
    const handleClick = disabled ? undefined : onClick;

    return (
        <DiscreteButtonContainer
            $color={color}
        >
            <DiscreteContent
                $disabled={disabled}
                onClick={handleClick} >
                {icon && icon}
                {value}
            </DiscreteContent>
        </DiscreteButtonContainer>
    );
};


const DiscreteButtonContainer = styled.div<{ $color: string }>`
    padding: 0 ${theme.materialDesign.padding.default};
    user-select: none;
    color: ${({ $color }) => $color};  
    height: ${theme.materialDesign.height.medium};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DiscreteContent = styled.div<{ $disabled: boolean | undefined }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-transform: uppercase;
    font-size: ${theme.fonts.size.S};
    cursor: ${({ $disabled }) => $disabled ? 'default' : 'pointer'};
    transition: opacity 0.1s;
    opacity: 1;
    opacity: ${({ $disabled }) => $disabled ? 0.7 : 1};
    &:hover {
        opacity: 0.7;
    }
`;


