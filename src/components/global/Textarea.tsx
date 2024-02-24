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
    label?: string;
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
    label,
    onChange,
}) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.addEventListener('focus', () => setIsFocused(true));
            textarea.addEventListener('blur', () => setIsFocused(false));
        }
        return () => {
            if (textarea) {
                textarea.removeEventListener('focus', () => setIsFocused(true));
                textarea.removeEventListener('blur', () => setIsFocused(false));
            }
        };
    }, []);


    return (
        <TextareaContainer>
            {label && <Label $focusOnTextarea={isFocused} $value={!!value}>{label}</Label>}
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
        </TextareaContainer>
    );
};

const TextareaContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: -18px;
`;

const Label = styled.label<{ $value: boolean, $focusOnTextarea: boolean }>`
    font-size: ${theme.fonts.size.P0};
    ${({ $focusOnTextarea }) => $focusOnTextarea ? css`color: ${theme.colors.primary};` : css`color:${theme.colors.greyDark}`};
    transform: ${({ $value }) => $value ? 'translateY(0)' : 'translateY(25px)'};
    clip-path: ${({ $value }) => $value ? 'inset(0)' : 'inset(0 0 100% 0)'};
    transition: transform 0.3s, clip-path 0.3s;
`;

const StyledTextarea = styled.textarea<{
    value: string,
    $width: string | undefined,
    $height: string | undefined,
    $maxWidth: string | undefined,
    $maxHeight: string | undefined,
    $noResize: boolean | undefined,
}>`
  transition: border 0.3s;
  z-index: 999;
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