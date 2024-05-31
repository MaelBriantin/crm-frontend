import React from 'react';
import styled from 'styled-components';
import { theme } from '../../assets/themes';

type NoteProps = {
    message: string;
    icon: React.ReactNode;
    width: string;
    iconColor: string;
    children?: React.ReactNode;
};

export const Note: React.FC<NoteProps> = ({ message, icon, iconColor, width, children }) => {
    return (
        <NoteContainer $width={width} $iconColor={iconColor}>
            <div className='noteIcon'>{icon}</div>
            <span className='message'>{message}</span>
            {children}
        </NoteContainer>
    );
};

const NoteContainer = styled.div<{$width: string, $iconColor: string}>`
    width: ${({ $width }) => $width};
    gap: 10px;
    padding: 10px;
    background: ${theme.colors.greyLight};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    .noteIcon{
        font-size: ${theme.fonts.size.P1};
        color: ${({ $iconColor }) => $iconColor};
    }
    .message{
        font-size: ${theme.fonts.size.S};
    }
`;