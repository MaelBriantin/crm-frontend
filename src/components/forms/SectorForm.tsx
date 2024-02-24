import styled from 'styled-components';
import { useState, ChangeEvent, useEffect } from 'react';
import { Button, Chip, Input } from '../global';
import { VscAdd, VscClose } from "react-icons/vsc";
import { theme } from '../../assets/themes';
import { createSector, deleteSector, updateSector } from '../../services/api/sectors';
import { useSectors, useToast, useModal } from '../../contexts';
import { MdDeleteOutline } from "react-icons/md";
import { DeleteAlert } from './DeleteAlert';
import { SectorType, emptySector } from '../../types/SectorTypes';
import { deepCompare } from '../../utils/helpers/spells';

type SectorFormProps = {
    sector?: SectorType;
};

export const SectorForm: React.FC<SectorFormProps> = ({ sector }) => {
    const [sectorForm, setSectorForm] = useState(sector || emptySector as SectorType);
    const [newPostcode, setNewPostcode] = useState({ postcode: '', city: '' });
    const [saving, setSaving] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);

    const { callToast } = useToast();

    const { loadingSectors, refreshSectors } = useSectors();

    const { closeModal, setDisableClose } = useModal();

    useEffect(() => {
        if (deleteAlert) {
            setDisableClose(true);
        }
        if (!deleteAlert) {
            setDisableClose(false);
        }
    }, [deleteAlert, setDisableClose]);

    const handleSave = async () => {
        if (sectorForm.name !== '' && sectorForm.postcodes.length > 0) {
            setSaving(true);
            await createSector(sectorForm as SectorType, callToast, refreshSectors, closeModal);
            setSaving(false);
        }
    }

    const handleDeleteSector = async () => {
        setDeleteAlert(false);
        if (sectorForm.id) {
            setSaving(true);
            await deleteSector({ id: sectorForm.id, name: sectorForm.name } as SectorType, callToast, refreshSectors, closeModal);
            setSaving(false);
        }
    }

    const handleUpdate = async () => {
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
    }

    const removeFromPostcodes = (postcode: string) => {
        setSectorForm({ ...sectorForm, postcodes: sectorForm.postcodes.filter(e => e.postcode !== postcode) });
    }

    const compareSectors = (sector: SectorType, sectorToUpdate: SectorType) => {
        const keysToCompare = ['name', 'postcodes'];
        return deepCompare(sector, sectorToUpdate, keysToCompare);
    }        

    const disableSave =
        sectorForm.name === ''
        || sectorForm.postcodes.length === 0
        || (sector && compareSectors(sector, sectorForm))
        || deleteAlert;

    const disableAddPostcode =
        newPostcode.postcode === ''
        || newPostcode.city === ''
        || sectorForm.postcodes.find(e => e.postcode === newPostcode.postcode && e.city === newPostcode.city) !== undefined
        || newPostcode.postcode.length !== 5
        || Number(newPostcode.postcode) < 0
        || deleteAlert;

    const disableDelete = deleteAlert;

    return (
        <Form>
            <InputSection>
                <Input
                    label='Nom du secteur'
                    type='text'
                    placeholder='Nom du secteur'
                    width='300px'
                    value={sectorForm.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSectorForm({ ...sectorForm, name: e.target.value })}
                />
                <CityForm noValidate onSubmit={handleAddPostcode}>
                    <Input
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
                            disabled={disableDelete}
                            key={e.postcode+e.city}
                            endIcon={<VscClose />}
                            iconColor={theme.colors.error}
                            text={`${e.postcode} - ${e.city}`}
                            onClickOnIcon={() => removeFromPostcodes(e.postcode)}
                        />
                    ))}
                </ChipContainer>
            </InputSection>
            <SaveAction $sector={sector !== undefined}>
                {sector && <Button
                    disabled={disableDelete}
                    color={theme.colors.error}
                    value='supprimer'
                    icon={<MdDeleteOutline />}
                    onClick={() => setDeleteAlert(!deleteAlert)}
                />}
                <Button
                    disabled={disableSave}
                    loading={loadingSectors || saving}
                    value='enregistrer'
                    onClick={sector ? handleUpdate : handleSave}
                />
            </SaveAction>
            {deleteAlert &&
                <DeleteAlert
                    message='Êtes-vous sûr de vouloir supprimer ce secteur ? Cette action est irréversible.'
                    confirmAction={handleDeleteSector}
                    cancelAction={() => setDeleteAlert(false)}
                />}
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
    gap: 10px;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: ${({ $sector }) => $sector ? 'space-between' : 'flex-end'};
    align-items: flex-end;
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