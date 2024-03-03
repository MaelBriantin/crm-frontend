import styled from 'styled-components';
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { Button, Chip, Input, DiscreteButton } from '../global';
import { VscAdd, VscClose } from "react-icons/vsc";
import { theme } from '../../assets/themes';
import { createSector, deleteSector, updateSector } from '../../services/api/sectors';
import { useSectors, useToast, useModal, useDeleteAlert } from '../../contexts';
import { SectorType, emptySector } from '../../types/SectorTypes';
import { deepCompare } from '../../utils/helpers/spells';
import { useKeyboardShortcut } from '../../hooks/system/useKeyboardShortcut';

type SectorFormProps = {
    sector?: SectorType;
};

export const SectorForm: React.FC<SectorFormProps> = ({ sector }) => {
    const [sectorForm, setSectorForm] = useState(sector || emptySector as SectorType);
    const [newPostcode, setNewPostcode] = useState({ postcode: '', city: '' });
    const [saving, setSaving] = useState(false);

    const { callToast } = useToast();
    const { loadingSectors, refreshSectors } = useSectors();
    const { closeModal, setDisableClose } = useModal();
    const { showDeleteAlert, isOpenDeleteAlert } = useDeleteAlert();

    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setDisableClose(saving || loadingSectors);
    }, [saving, setDisableClose, loadingSectors]);

    useEffect(() => {
        if (firstInputRef.current) {
            setTimeout(() => {
                firstInputRef.current?.focus();
            }, 250);
        }
    }, []);

    useKeyboardShortcut({
        'Escape': () => {
            if (saving || loadingSectors || isOpenDeleteAlert) {
                return;
            }
            closeModal();
        }
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sectorForm.name !== '' && sectorForm.postcodes.length > 0) {
            setSaving(true);
            await createSector(sectorForm as SectorType, callToast, refreshSectors, closeModal);
            setSaving(false);
        }
    }

    const handleDeleteAlert = () => {
        const message = `Êtes-vous sûr de vouloir supprimer le secteur ${sector?.name} ? 
        Cette action est irréversible et entrainera la perte de toutes les données statistiques associées.`
        showDeleteAlert(message, handleDeleteSector);
    }

    const handleDeleteSector = async () => {
        if (sectorForm.id) {
            setSaving(true);
            await deleteSector({ id: sectorForm.id, name: sectorForm.name } as SectorType, callToast, refreshSectors, closeModal);
            setSaving(false);
        }
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sectorForm && sectorForm.postcodes.length > 0 && sectorForm.name !== '') {
            setSaving(true);
            await updateSector(sectorForm as SectorType, callToast, refreshSectors, closeModal);
            setSaving(false);
        }
    }

    const handleAddPostcode = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPostcode.postcode !== '' && newPostcode.city !== '') {
            if (sector?.postcodes.find(e => e.postcode === newPostcode.postcode)) {
                return;
            }
            setSectorForm({ ...sectorForm, postcodes: [...sectorForm.postcodes, newPostcode] });
            setNewPostcode({ postcode: '', city: '' });
        }
        firstInputRef.current?.focus();
    }

    const removeFromPostcodes = (postcode: string) => {
        setSectorForm({ ...sectorForm, postcodes: sectorForm.postcodes.filter(e => e.postcode !== postcode) });
    }

    const compareSectors = (sector: SectorType, sectorToUpdate: SectorType) => {
        const keysToCompare = ['name', 'postcodes'];
        return deepCompare(sector, sectorToUpdate, keysToCompare);
    }

    const disableSave =
        saving
        || sectorForm.name === ''
        || sectorForm.postcodes.length === 0
        || (sector && compareSectors(sector, sectorForm))
        || loadingSectors
        || isOpenDeleteAlert;

    const disableAddPostcode =
        saving
        || newPostcode.postcode === ''
        || newPostcode.city === ''
        || sectorForm.postcodes.find(e => e.postcode === newPostcode.postcode && e.city === newPostcode.city) !== undefined
        || newPostcode.postcode.length !== 5
        || Number(newPostcode.postcode) < 0
        || loadingSectors
        || isOpenDeleteAlert;

    return (
        <Form>
            <InputSection>
                <form onSubmit={sector ? handleUpdate : handleSave}>
                    <Input
                        name='name'
                        ref={firstInputRef}
                        label='Nom du secteur'
                        type='text'
                        placeholder='Nom du secteur'
                        width='300px'
                        value={sectorForm.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSectorForm({ ...sectorForm, name: e.target.value })}
                    />
                </form>
                <CityForm noValidate onSubmit={handleAddPostcode}>
                    <Input
                        name='postcode'
                        label='Code postal'
                        type='number'
                        noNegativeNumber
                        maxLength={5}
                        placeholder='Code postal'
                        width='150px'
                        value={newPostcode.postcode}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPostcode({ ...newPostcode, postcode: e.target.value })}
                    />
                    <Input
                        name='city'
                        label='Ville'
                        type='text'
                        placeholder='Ville'
                        width='250px'
                        value={newPostcode.city}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPostcode({ ...newPostcode, city: e.target.value })}
                    />
                    <Button
                        disabled={disableAddPostcode}
                        onClick={handleAddPostcode}
                        icon={<VscAdd />}
                    />
                </CityForm>
                <ChipContainer>
                    {sectorForm.postcodes.map((e) => (
                        <Chip
                            disabled={isOpenDeleteAlert || saving}
                            key={e.postcode + e.city}
                            endIcon={<VscClose />}
                            iconColor={theme.colors.error}
                            text={`${e.postcode} - ${e.city}`}
                            onClickOnIcon={() => removeFromPostcodes(e.postcode)}
                        />
                    ))}
                </ChipContainer>
            </InputSection>
            <SaveAction $sector={!!sector}>
                {sector &&
                    <DiscreteButton
                        value='supprimer'
                        onClick={handleDeleteAlert}
                        color={theme.colors.error}
                        disabled={isOpenDeleteAlert}
                    />}
                <Button
                    disabled={disableSave}
                    loading={loadingSectors || saving}
                    value='enregistrer'
                    onClick={sector ? handleUpdate : handleSave}
                />
            </SaveAction>
        </Form >
    );
};

const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
`;

const InputSection = styled.div`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    height: 100%;
    width: 100%;
`;

const CityForm = styled.form`
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`;

const SaveAction = styled.div<{ $sector: boolean }>`
    margin-top: 10px;
    gap: 10px;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: ${({ $sector }) => $sector ? 'space-between' : 'flex-end'};
    align-items: center;
`;

const ChipContainer = styled.div`
    margin-top: 10px;
    border: 2px solid ${theme.colors.greyLight};
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    padding: 10px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    width: 456px;
    max-height: 400px;
    overflow: auto;
`;