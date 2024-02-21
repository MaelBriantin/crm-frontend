import styled, { css } from 'styled-components';
import { theme } from '../../assets/themes';
import React from 'react';

type TextareaProps = {
    width?: string;
    maxWidth?: string;
    height?: string;
    maxHeight?: string;
    placeholder: string;
    noResize?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Textarea: React.FC<TextareaProps> = ({
    width,
    maxWidth,
    height,
    maxHeight,
    placeholder,
    noResize,
    value,
    onChange,
}) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    return (
        <StyledTextarea
            ref={textareaRef}
            $width={width}
            $maxWidth={maxWidth}
            $height={height}
            $maxHeight={maxHeight}
            $noResize={noResize}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

const StyledTextarea = styled.textarea<{
    $width: string | undefined,
    $height: string | undefined,
    $maxWidth: string | undefined,
    $maxHeight: string | undefined,
    $noResize: boolean | undefined,
}>`
  min-width: ${({ $width }) => `calc(${$width} - 20px)`};
  ${({ $maxWidth }) => $maxWidth && css`max-width: ${$maxWidth}`};
  min-height: ${({ $height }) => $height ? $height : theme.materialDesign.height.medium};
  ${({ $maxHeight }) => $maxHeight && css`max-height: ${$maxHeight}`};
  padding: 0 10px;
  font-size: 16px;
  font-family: ${theme.fonts.family.source};
  font-size: ${theme.fonts.size.P0};
  border-radius: ${theme.materialDesign.borderRadius.rounded};
  border: 2px solid ${theme.colors.greyMedium};
  padding-top: 10px;
  ${({ $noResize }) => $noResize && css`resize: none;`};
  &:focus {
    outline: none;
    border: 2px solid ${theme.colors.primary}!important;
  }
`;