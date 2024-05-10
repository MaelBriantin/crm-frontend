import React, { useState, useRef, useEffect } from "react";
import { styled, keyframes } from "styled-components";
import { VscChevronDown, VscLoading } from "react-icons/vsc";
import { theme } from "../../assets/themes";
import { getVariantStyle } from "../../utils/dropdownUtils";

type DropdownProps = {
  options: DropdownOptions[];
  variant?: "large" | "regular" | "small";
  onChange: (selected: DropdownValueType) => void;
  defaultValue?: DropdownValueType;
  value?: DropdownValueType;
  width?: string;
  maxHeight?: string;
  openOnTop?: boolean;
  openOnBottom?: boolean;
  label?: string;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
};

export type DropdownValueType = {
  value: string | number;
  label: string;
};

export type DropdownOptions = {
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

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  variant = "regular",
  onChange,
  defaultValue,
  value,
  width = "200px",
  openOnTop = false,
  openOnBottom = false,
  label,
  placeholder,
  maxHeight,
  disabled,
  loading,
}) => {
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
  const [selectedOption, setSelectedOption] =
    useState<DropdownValueType | null>(defaultValue || null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    value && setSelectedOption(value);
  }, [value]);

  const toggling = () => !loading && !disabled && setIsOpen(!isOpen);

  const onOptionClicked = (selectedElement: DropdownOptions) => () => {
    setSelectedOption(selectedElement as DropdownValueType);
    setIsOpen(false);

    onChange(selectedElement as DropdownValueType);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const variantStyle = getVariantStyle(variant) as VariantStyleType;

  return (
    <DropdownContainer
      $width={width}
      ref={dropdownRef}
      $variantStyle={variantStyle}
    >
      <DropdownHeader
        $disabled={disabled}
        $selectedOption={!!selectedOption && selectedOption.label !== ""}
        onClick={toggling}
        $isOpen={isOpen}
        $openOnBottom={openOnBottom}
        $openOnTop={openOnTop}
        $variantStyle={variantStyle}
      >
        {label && (
          <Label
            $selectedOption={!!selectedOption && selectedOption.label !== ""}
            $isOpen={isOpen}
          >
            {label}
          </Label>
        )}
        {(!disabled && selectedOption && (
          <span className="headerText">{selectedOption.label}</span>
        )) || <span className="headerText">{placeholder}</span>}
        {/* {disabled && ' '} */}
        {!loading && <VscChevronDown className={"dropdownIcon"} />}
        {loading && <VscLoading className={"loadingIcon"} />}
      </DropdownHeader>
      {isOpen && (
        <DropdownListContainer
          $maxHeight={maxHeight}
          $openOnTop={openOnTop}
          $openOnBottom={openOnBottom}
          $variantStyle={variantStyle}
        >
          <DropdownList>
            {options.map((option) => (
              <ListItem
                onClick={onOptionClicked(option)}
                key={Math.random()}
                $variantStyle={variantStyle}
              >
                {option.label}
              </ListItem>
            ))}
          </DropdownList>
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div<{
  $width: string;
  $variantStyle: VariantStyleType;
}>`
  font-size: ${({ $variantStyle }) =>
    $variantStyle.fontSize}; // variant dependent
  width: ${({ $width }) => $width};
  user-select: none;
  position: relative;
  color: ${theme.colors.greyDark};
  background-color: ${theme.colors.white};
  margin-right: calc(
    ${({ $variantStyle }) => $variantStyle.padding * 2}px +
      ${({ $variantStyle }) => $variantStyle.borderSize * 2}px
  ); // variant dependent
`;

const inputLoading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const DropdownHeader = styled.div<{
  $isOpen: boolean;
  $openOnTop: boolean;
  $openOnBottom: boolean;
  $variantStyle: VariantStyleType;
  $selectedOption: boolean;
  $disabled: boolean | undefined;
}>`
  background-color: ${theme.colors.white};
  padding: ${({ $variantStyle }) =>
    $variantStyle.padding}px; // variant dependent
  height: calc(
    ${({ $variantStyle }) => $variantStyle.height} -
      ${({ $variantStyle }) => $variantStyle.padding * 2}px
  ); // variant dependent
  border: solid ${({ $variantStyle }) => $variantStyle.borderSize}px
    ${({ $isOpen }) =>
      $isOpen
        ? theme.colors.primary
        : theme.colors.greyMedium}; // variant dependent
  transition: all 0.1s ease-in-out;
  width: 100%;
  border-radius: ${theme.materialDesign.borderRadius.rounded};
  line-height: 1.2;
  border-radius: ${({ $isOpen, $openOnTop }) =>
    $openOnTop &&
    $isOpen &&
    `0 0 ${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded}`};
  border-radius: ${({ $isOpen, $openOnBottom }) =>
    $openOnBottom &&
    $isOpen &&
    `${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded} 0 0`};
  display: flex;
  justify-content: ${({ $disabled }) =>
    $disabled ? "flex-end" : "space-between"};
  align-items: center;
  cursor: pointer;
  color: ${({ $selectedOption }) =>
    $selectedOption ? theme.colors.dark : theme.colors.greyDark};
  .headerText {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 80%;
  }
  .dropdownIcon {
    color: ${({ $isOpen }) => ($isOpen ? theme.colors.primary : "inherit")};
    transition: transform 0.1s ease-in-out;
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }
  &:hover .dropdownIcon {
    color: ${theme.colors.primary};
  }
  .loadingIcon {
    color: ${theme.colors.primary};
    animation: ${inputLoading} 1s infinite;
  }
`;

const Label = styled.div<{
  $isOpen: boolean;
  $selectedOption: boolean | undefined;
}>`
  transform: ${({ $selectedOption }) =>
    $selectedOption ? "translateY(-28px)" : "translateY(0)"};
  clip-path: ${({ $selectedOption }) =>
    $selectedOption ? "inset(0)" : "inset(0 0 100% 0)"};
  opacity: ${({ $selectedOption }) => ($selectedOption ? 1 : 0)};
  position: absolute;
  left: 0;
  font-size: ${theme.fonts.size.P0};
  color: ${({ $isOpen }) =>
    $isOpen ? theme.colors.primary : theme.colors.greyDark};
  transition: all 0.25s ease-in-out;
`;

const DropdownListContainer = styled.div<{
  $openOnTop: boolean;
  $openOnBottom: boolean;
  $variantStyle: VariantStyleType;
  $maxHeight: string | undefined;
}>`
  width: calc(
    100% + ${({ $variantStyle }) => $variantStyle.padding * 2}px
  ); // variant dependent
  border: solid ${({ $variantStyle }) => $variantStyle.borderSize}px
    ${theme.colors.primary}; // variant dependent
  border-top: ${({
    $openOnBottom,
    $variantStyle,
  }: {
    $openOnBottom: boolean;
    $variantStyle: VariantStyleType;
  }) =>
    $openOnBottom
      ? "none"
      : `${$variantStyle.borderSize}px solid ${theme.colors.primary}`}; // variant dependent
  border-bottom: ${({
    $openOnTop,
    $variantStyle,
  }: {
    $openOnTop: boolean;
    $variantStyle: VariantStyleType;
  }) =>
    $openOnTop
      ? "none"
      : `${$variantStyle.borderSize}px solid ${theme.colors.primary}`}; // variant dependent
  position: absolute;
  z-index: 9999;
  top: ${({ $openOnTop }) => ($openOnTop ? "auto" : "100%")};
  bottom: ${({ $openOnBottom }) => ($openOnBottom ? "auto" : "100%")};
  background-color: #fff;
  border-radius: ${theme.materialDesign.borderRadius.rounded};
  border-radius: ${({ $openOnTop }) =>
    $openOnTop &&
    `${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded} 0 0`};
  border-radius: ${({ $openOnBottom }) =>
    $openOnBottom &&
    `0 0 ${theme.materialDesign.borderRadius.rounded} ${theme.materialDesign.borderRadius.rounded}`};
  max-height: ${({ $maxHeight }) => ($maxHeight ? $maxHeight : "150px")};
  overflow-y: auto;
`;

const DropdownList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const ListItem = styled.li<{ $variantStyle: VariantStyleType }>`
  padding: ${({ $variantStyle }) =>
    $variantStyle.padding}px; // variant dependent
  cursor: pointer;
  color: ${theme.colors.dark};
  &:hover {
    background-color: #f0f0f0;
  }
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
