import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { VscChevronDown } from "react-icons/vsc";
import { theme } from '../../assets/themes';
import { getVariantStyle } from '../../utils/dropdownUtils';

type DropdownProps = {
    options: DropdownOptions[];
    variant?: 'large' | 'regular' | 'small';
    onChange: (selected: DropdownValueType) => void;
    defaultValue?: DropdownValueType;
    width?: number;
    openOnTop?: boolean;
    openOnBottom?: boolean;
};

export type DropdownValueType = {
    value: string | number;
    label: string;
};

type DropdownOptions = {
    value: string;
    label: string;
};

type VariantStyleType = {
    padding: number;
    paddingPlus: number;
    fontSize: string;
    borderSize: number;
    height: string;
};

export const Dropdown: React.FC<DropdownProps> = ({ options, variant = 'regular', onChange, defaultValue, width = 200, openOnTop = false, openOnBottom = false }) => {

    if (openOnBottom) {
        openOnTop = false;
    }
    if (openOnTop) {
        openOnBottom = false;
    }
    if ((openOnBottom && openOnTop) || (!openOnBottom && !openOnTop)) {
        openOnBottom = true;
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<DropdownValueType>(defaultValue || options[0]);
    const dropdownRef = useRef(null);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (selectedElement: DropdownOptions) => () => {
        setSelectedOption(selectedElement as DropdownValueType);
        setIsOpen(false);

        onChange(selectedElement as DropdownValueType);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const variantStyle = getVariantStyle(variant) as VariantStyleType;

    return (
        <DropdownContainer $width={width} ref={dropdownRef} $variantStyle={variantStyle} >
            <DropdownHeader onClick={toggling} $isOpen={isOpen} $openOnBottom={openOnBottom} $openOnTop={openOnTop} $variantStyle={variantStyle} >
                    { selectedOption && selectedOption.label || "Select..." }
                    <VscChevronDown className={'dropdownIcon'} />
                </DropdownHeader>
                {isOpen && (
                    <DropdownListContainer $openOnTop={openOnTop} $openOnBottom={openOnBottom} $variantStyle={variantStyle} >
                        <DropdownList>
                            {options.map(option => (
                                <ListItem onClick={onOptionClicked(option)} key={Math.random()} $variantStyle={variantStyle} >
                                    {option.label}
                                </ListItem>
                            ))}
                        </DropdownList>
                    </DropdownListContainer>
                )}
            </DropdownContainer>
    );
};

const DropdownContainer = styled.div<{ $width: number, $variantStyle: VariantStyleType }>`
    font-size: ${({ $variantStyle }) => $variantStyle.fontSize}; // variant dependent
    width: ${({ $width }) => $width}px;
    user-select: none;
    position: relative;
    color: ${theme.colors.dark};
    background-color: ${theme.colors.white};
    margin-right: calc(${({ $variantStyle }) => $variantStyle.padding * 2}px + ${({ $variantStyle }) => $variantStyle.borderSize * 2}px); // variant dependent
`;

const DropdownHeader = styled.div<{ $isOpen: boolean, $openOnTop: boolean, $openOnBottom: boolean, $variantStyle: VariantStyleType }>`
    background-color: ${theme.colors.white};
    padding: ${({ $variantStyle }) => $variantStyle.padding}px; // variant dependent
    height: calc(${({ $variantStyle }) => $variantStyle.height} - ${({ $variantStyle }) => $variantStyle.padding * 2}px); // variant dependent
    border: solid ${({ $variantStyle }) => $variantStyle.borderSize}px ${({ $isOpen }) => $isOpen ? theme.colors.primary : theme.colors.greyMedium}; // variant dependent
    transition: all 0.1s ease-in-out;
    width: 100%;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    border-radius: ${({ $isOpen, $openOnTop }) => ($openOnTop && $isOpen) && `0 0 ${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded}`};
    border-radius: ${({ $isOpen, $openOnBottom }) => ($openOnBottom && $isOpen) && `${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded} 0 0`};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .dropdownIcon{
        color: ${({ $isOpen }) => $isOpen ? theme.colors.primary : 'inherit'};
        transition: transform 0.1s ease-in-out;
        transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
    &:hover .dropdownIcon{
        color: ${theme.colors.primary};
    }
`;

const DropdownListContainer = styled.div<{ $openOnTop: boolean, $openOnBottom: boolean, $variantStyle: VariantStyleType }>`
    width: calc(100% + ${({ $variantStyle }) => $variantStyle.padding * 2}px); // variant dependent
    border: solid ${({ $variantStyle }) => $variantStyle.borderSize}px ${theme.colors.greyMedium}; // variant dependent
    border-top: ${({ $openOnBottom, $variantStyle }: { $openOnBottom: boolean, $variantStyle: VariantStyleType }) => $openOnBottom ? 'none' : `${$variantStyle.borderSize}px solid ${theme.colors.greyMedium}`}; // variant dependent
    border-bottom: ${({ $openOnTop, $variantStyle }: { $openOnTop: boolean, $variantStyle: VariantStyleType }) => $openOnTop ? 'none' : `${$variantStyle.borderSize}px solid ${theme.colors.greyMedium}`}; // variant dependent
    position: absolute; 
    z-index: 99;
    top: ${({ $openOnTop }) => $openOnTop ? 'auto' : '100%'};
    bottom: ${({ $openOnBottom }) => $openOnBottom ? 'auto' : '100%'};
    background-color: #fff;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    border-radius: ${({ $openOnTop }) => $openOnTop && `${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded} 0 0`};
    border-radius: ${({ $openOnBottom }) => $openOnBottom && `0 0 ${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded}`};
`;

const DropdownList = styled.ul`
    padding: 0;
    margin: 0;
    list-style-type: none;
`;

const ListItem = styled.li<{ $variantStyle: VariantStyleType }>`
    padding: ${({ $variantStyle }) => $variantStyle.padding}px; // variant dependent
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;