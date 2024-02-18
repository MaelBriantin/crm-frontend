import styled from 'styled-components';
import { Input } from '../global';
import { useState, ChangeEvent, useEffect } from 'react';
import { Button, Chip } from '../global';
import { useModal } from '../../contexts';
import { VscAdd, VscClose } from "react-icons/vsc";
import { theme } from '../../assets/themes';
import { createSector, deleteSector } from '../../services/api/sectors';
import { PostcodeType, SectorType } from '../../types/SectorTypes';
import { useSectors } from '../../contexts';
import { useToast } from '../../contexts';
import { updateSector } from '../../services/api/sectors';
import { MdDeleteOutline } from "react-icons/md";
import { deepCompare } from '../../utils/helpers/spells';
import { DeleteAlert } from './DeleteAlert';

type SectorFormProps = {
    sector?: SectorType;
};

export const SectorForm: React.FC<SectorFormProps> = ({ sector }) => {
    const [sectorName, setSectorName] = useState(sector?.name || '');
    const [allPostcodes, setAllPostcodes] = useState<PostcodeType[]>(sector?.postcodes || []);
    const [postcode, setPostcode] = useState({ postcode: '', city: '' });
    const [saving, setSaving] = useState(false);
    const [sectorToUpdate] = useState<SectorType | null>(sector || null);
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
        if (sectorName !== '' && allPostcodes.length > 0) {
            setSaving(true);
            await createSector({ name: sectorName, postcodes: allPostcodes } as SectorType, callToast, refreshSectors, closeModal);
            setSaving(false);
        }
    }

    const handleDeleteSector = async () => {
        setDeleteAlert(false);
        if (sectorToUpdate) {
            setSaving(true);
            await deleteSector({ id: sectorToUpdate.id, name: sectorName } as SectorType, callToast, refreshSectors, closeModal);
            setSaving(false);
        }
    }

    const handleUpdate = async () => {
        if (sectorToUpdate && allPostcodes.length > 0 && sectorName !== '') {
            setSaving(true);
            const sector = { id: sectorToUpdate.id, name: sectorName, postcodes: allPostcodes } as SectorType;
            await updateSector(sector as SectorType, callToast, refreshSectors, closeModal);
            setSaving(false);
        }
    }

    const handleAddPostcode = (e: React.FormEvent) => {
        e.preventDefault();
        if (postcode.postcode !== '' && postcode.city !== '') {
            const newPostcode: PostcodeType = { postcode: postcode.postcode, city: postcode.city };
            if (allPostcodes.find(e => e.postcode === newPostcode.postcode)) {
                return;
            }
            setAllPostcodes(prevPostcodes => [...prevPostcodes, newPostcode]);
            setPostcode({ postcode: '', city: '' });
        }
    }

    const removeFromPostcodes = (postcode: string) => {
        setAllPostcodes(prevPostcodes => prevPostcodes.filter(e => e.postcode !== postcode));
    }

    const compareEditSectorAndSector = (sector: SectorType, sectorToUpdate: SectorType) => {
        const keysToCompare = ['name', 'postcodes'];
        return deepCompare(sector, sectorToUpdate, keysToCompare);
    }

    const disableSave =
        sectorName === ''
        || allPostcodes.length === 0
        || deleteAlert
        || compareEditSectorAndSector({ name: sectorName, postcodes: allPostcodes } as SectorType, sectorToUpdate as SectorType);

    const disableAddPostcode =
        postcode.postcode === ''
        || postcode.city === ''
        || allPostcodes.find(e => e.postcode === postcode.postcode) !== undefined
        || postcode.postcode.length !== 5
        || deleteAlert;

    const disableDelete = deleteAlert;

    return (
        <Form>
            <InputSection>
                <Input
                    type='text'
                    placeholder='Nom du secteur'
                    width='300px'
                    value={sectorName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSectorName(e.target.value)}
                />
                <CityForm noValidate onSubmit={handleAddPostcode}>
                    <Input
                        type='number'
                        noNegativeNumber
                        maxLength={5}
                        placeholder='Code postal'
                        width='125px'
                        value={postcode.postcode}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPostcode({ ...postcode, postcode: e.target.value })}
                    />
                    <Input
                        type='text'
                        placeholder='Ville'
                        width='225px'
                        value={postcode.city}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPostcode({ ...postcode, city: e.target.value })}
                    />
                    <Button
                        disabled={disableAddPostcode}
                        onClick={handleAddPostcode}
                        icon={<VscAdd />}
                    />
                </CityForm>
                <ChipContainer>
                    {allPostcodes.map((e) => (
                        <Chip
                            disabled={disableDelete}
                            key={e.postcode}
                            endIcon={<VscClose />}
                            iconColor={theme.colors.error}
                            text={`${e.postcode} - ${e.city}`}
                            onClickOnIcon={() => removeFromPostcodes(e.postcode)}
                        />
                    ))}
                </ChipContainer>
                {/* <PostcodesDisplay>

                </PostcodesDisplay> */}
            </InputSection>
            <SaveAction $sector={sector !== undefined}>
                {sector && <Button
                    disabled={disableDelete}
                    color={theme.colors.error}
                    value='supprimer ce secteur'
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
    /* height: 400px;
    width: 400px; */
    gap: 20px;
`;

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    height: 100%;
    width: 100%;
`;

const CityForm = styled.form`
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
    // margin-top: 10px;
    justify-content: ${({ $sector }) => $sector ? 'space-between' : 'flex-end'};
    align-items: flex-end;
`;

const ChipContainer = styled.div`
    border: 2px solid ${theme.colors.greyLight};
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    padding: 10px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    width: 480px;
    max-height: 400px;
    overflow: scroll;
`;