import styled from 'styled-components';
import { theme } from '../../assets/themes';
import { DiscreteButton, Button } from '../global';
import {useDeleteAlert, useFormActions} from '../../contexts';
import React from 'react';

type FormActionsProps = {
    //
};

export const FormActions: React.FC<FormActionsProps> = () => {

    const { showDeleteAlert, isOpenDeleteAlert } = useDeleteAlert();
    const { deleteMessage, onDelete, isLoading, onSave, data, isDisableSave, isDisableDelete } = useFormActions();

    const handleDeleteAlert = () => {
        deleteMessage && onDelete && showDeleteAlert(deleteMessage, onDelete);
    };

    return (
        <SaveAction $data={data}>
            {data &&
                <DiscreteButton
                    value='supprimer'
                    onClick={handleDeleteAlert}
                    color={theme.colors.error}
                    disabled={isOpenDeleteAlert || isDisableDelete}
                />}
            <Button
                disabled={isDisableSave}
                loading={isLoading}
                value="Enregistrer"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => onSave(e)}
            />
        </SaveAction>
    );
};

const SaveAction = styled.div<{ $data: boolean }>`
    gap: 10px;
    width: 100%;
    display: flex;
    justify-content: ${({ $data }) => $data ? 'space-between' : 'flex-end'};
    align-items: center;
`;

