import React, { useState } from "react";
import { BrandType, emptyBrand } from "../../types/BrandTypes";
import styled from "styled-components";
import { Chip, Input, Textarea, Button, Note } from "../global";
import { useModal, useBrands, useToast } from "../../contexts";
import { useKeyboardShortcut } from "../../hooks/system/useKeyboardShortcut";
import { TbAlertSquare } from "react-icons/tb";
import { theme } from "../../assets/themes";
import { deepCompare, filterOutKeys } from "../../utils/helpers/spells";
import { DeleteAlert } from "./DeleteAlert";
import { DiscreteButton } from "../global/DiscreteButton";
import { deleteBrand } from "../../services/api/brands";

type BrandFormProps = {
    brand?: BrandType;
};

export const BrandForm: React.FC<BrandFormProps> = ({ brand }) => {
    const [brandForm, setBrandForm] = useState(brand || emptyBrand as BrandType);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [saving, setSaving] = useState(false);

    const { refreshBrands } = useBrands();
    const { closeModal, setDisableClose } = useModal();
    const { callToast } = useToast();

    saving || deleteAlert ? setDisableClose(true) : setDisableClose(false);

    useKeyboardShortcut({ 
        'Escape': () => {
            if (saving || deleteAlert) {
                return;
            }
            closeModal();
        } 
    });

    const save = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        !disableSave && console.log('save');
    }

    const handleDeleteSector = async () => {
        setDeleteAlert(false);
        if (brandForm.id) {
            setSaving(true);
            await deleteBrand(brand as BrandType, callToast, refreshBrands, closeModal);
            setSaving(false);
        }
    }

    const disableSave =
        deepCompare(brand as BrandType, brandForm, ['name', 'contact_name', 'contact_email', 'contact_phone', 'notes'])
        || Object.values(filterOutKeys(['notes', 'contact_email', 'contact_name', 'contact_phone'], brandForm)).some(value => value === '');

    return (
        <Container onSubmit={save}>
            {brand &&
                <Note
                    message="Attention, afin de préserver l'intégrité des données produits, modifier le nom de la marque ne modifiera pas le code SKU associé."
                    icon={<TbAlertSquare />}
                    width="430px"
                    iconColor={`${theme.colors.blue}`}
                />}
            <BrandName $brand={!!brand}>
                <Input
                    label="Nom"
                    width={`${brandForm.sku_code ? '300px' : '414px'}`}
                    type="text"
                    placeholder="Nom"
                    value={brandForm.name}
                    onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value } as BrandType)}
                />
                {
                    brandForm.sku_code &&
                    <Chip
                        text={brandForm.sku_code}
                        color={{ background: '', text: '' }}
                    />
                }
            </BrandName>
            <Input
                label="Contact"
                width="444px"
                type="text"
                placeholder="Contact"
                value={brandForm.contact_name}
                onChange={(e) => setBrandForm({ ...brandForm, contact_name: e.target.value } as BrandType)}
            />
            <Contact>
                <Input
                    label="Email"
                    width="250px"
                    type="text"
                    placeholder="Email"
                    value={brandForm.contact_email}
                    onChange={(e) => setBrandForm({ ...brandForm, contact_email: e.target.value } as BrandType)}
                />
                <Input
                    label="Téléphone"
                    width="180px"
                    type="text"
                    placeholder="Téléphone"
                    value={brandForm.contact_phone}
                    onChange={(e) => setBrandForm({ ...brandForm, contact_phone: e.target.value } as BrandType)}
                />
            </Contact>
            <Textarea
                label="Notes"
                width="444px"
                maxWidth="80vw"
                height="100px"
                maxHeight="400px"
                placeholder="Notes"
                value={brandForm.notes}
                onChange={(e: { target: { value: unknown; }; }) => setBrandForm({ ...brandForm, notes: e.target.value } as BrandType)}
            />
            <SaveAction $brand={!!brand}>
                {brand &&
                    <DiscreteButton
                        value='supprimer'
                        onClick={() => setDeleteAlert(!deleteAlert)}
                        color={`${theme.colors.error}`}
                        disabled={deleteAlert}
                    />}
                <Button
                    disabled={disableSave}
                    value='enregistrer'
                    onClick={() => console.log('save')}
                />
            </SaveAction>
            {deleteAlert &&
                <DeleteAlert
                    message='Êtes-vous sûr de vouloir supprimer cette marque ? Cette action est irréversible.'
                    confirmAction={handleDeleteSector}
                    cancelAction={() => setDeleteAlert(false)}
                />}
        </Container>
    );
}

const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    gap: 30px;
`;

const BrandName = styled.div<{ $brand: boolean }>`
    margin-top: ${({ $brand }) => $brand ? '0' : '20px'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 444px;
`;

const SaveAction = styled.div<{ $brand: boolean }>`
    gap: 10px;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: ${({ $brand }) => $brand ? 'space-between' : 'flex-end'};
    align-items: center;
`;

const Contact = styled.div` 
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`;