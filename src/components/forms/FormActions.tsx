import styled from 'styled-components';
import { theme } from '../../assets/themes';
import { DiscreteButton, Button } from '../global';
import { useDeleteAlert, useFormActions } from '../../contexts';
import React from 'react';

type FormActionsProps = {
    data: boolean;
};

export const FormActions: React.FC<FormActionsProps> = ({ data }) => {

    const { showDeleteAlert, isOpenDeleteAlert } = useDeleteAlert();

    const { loadingData, disableSave, saveMethod, updateMethod, deleteMethod, deleteMessage, saving } = useFormActions();

    const handleDeleteAlert = () => {
        showDeleteAlert(deleteMessage, deleteMethod);
    };

    return (
        <SaveAction $data={!!data}>
            {data &&
                <DiscreteButton
                    value='supprimer'
                    onClick={handleDeleteAlert}
                    color={theme.colors.error}
                    disabled={isOpenDeleteAlert}
                />}
            <Button
                disabled={disableSave}
                loading={loadingData || saving}
                value='enregistrer'
                onClick={data ? updateMethod : saveMethod}
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

