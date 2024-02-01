import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { VscChevronDown } from "react-icons/vsc";
import { theme } from '../../assets/themes';

type DropdownProps = {
    options: DropdownOptions[];
    handleSelectChange: (selected: string) => void;
    defaultValue?: string | number | null;
    width?: number;
    openOnTop?: boolean;
    openOnBottom?: boolean;
}

type DropdownOptions = {
    value: string;
    label: string;
};

export const Dropdown: React.FC<DropdownProps> = ({ options, handleSelectChange, defaultValue, width = 200, openOnTop = false, openOnBottom = false }) => {
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
    const [selectedOption, setSelectedOption] = useState<string | number | null>(defaultValue || null);
    const dropdownRef = useRef(null);

    const toggling = () => setIsOpen(!isOpen);

    const onOptionClicked = (selectedElement: DropdownOptions) => () => {
        setSelectedOption(selectedElement.label);
        setIsOpen(false);

        handleSelectChange(selectedElement.value);
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

    return (
        <DropdownContainer $width={width} ref={dropdownRef}>
            <DropdownHeader onClick={toggling} $isOpen={isOpen} $openOnBottom={openOnBottom} $openOnTop={openOnTop} >
                {selectedOption || "Select..."}
                <VscChevronDown className={'dropdownIcon'} />
            </DropdownHeader>
            {isOpen && (
                <DropdownListContainer $openOnTop={openOnTop} $openOnBottom={openOnBottom}>
                    <DropdownList>
                        {options.map(option => (
                            <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                                {option.label}
                            </ListItem>
                        ))}
                    </DropdownList>
                </DropdownListContainer>
            )}
        </DropdownContainer>
    );
};

const DropdownContainer = styled.div<{ $width: number }>`
    width: ${({ $width }) => $width}px;
    user-select: none;
    position: relative;
`;

const DropdownHeader = styled.div<{ $isOpen: boolean, $openOnTop: boolean, $openOnBottom: boolean }>`
    transition: all 0.1s ease-in-out;
    padding: 10px;
    width: 100%;
    height: calc(${theme.materialDesign.height.default} - 20px); // 20px to cover the padding of the DropdownHeader
    border: solid 2px ${({ $isOpen }) => $isOpen ? theme.colors.primary : theme.colors.greyMedium};
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

const DropdownListContainer = styled.div<{ $openOnTop: boolean, $openOnBottom: boolean }>`
    position: absolute;
    z-index: 99;
    top: ${({ $openOnTop }) => $openOnTop ? 'auto' : '100%'};
    bottom: ${({ $openOnBottom }) => $openOnBottom ? 'auto' : '100%'};
    width: calc(100% + 20px); // 100% plus 20px to cover the padding of the DropdownList
    background-color: #fff;
    border: solid 2px ${theme.colors.greyMedium};
    border-top: ${({ $openOnBottom }) => $openOnBottom ? 'none' : `2px solid ${theme.colors.greyMedium}`};
    border-bottom: ${({ $openOnTop }) => $openOnTop ? 'none' : `2px solid ${theme.colors.greyMedium}`};
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    border-radius: ${({ $openOnTop }) => $openOnTop && `${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded} 0 0`};
    border-radius: ${({ $openOnBottom }) => $openOnBottom && `0 0 ${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded}`};
`;

const DropdownList = styled.ul`
    padding: 0;
    margin: 0;
    list-style-type: none;
`;

const ListItem = styled.li`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;