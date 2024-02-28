import React, { useState, useEffect, useRef } from "react";
import { BrandType, emptyBrand } from "../../types/BrandTypes";
import styled from "styled-components";
import { Chip, Input, Textarea, Button, Note } from "../global";
import { useModal, useBrands, useToast, useDeleteAlert } from "../../contexts";
import { useKeyboardShortcut } from "../../hooks/system/useKeyboardShortcut";
import { TbAlertSquare } from "react-icons/tb";
import { theme } from "../../assets/themes";
import { deepCompare } from "../../utils/helpers/spells";
import { DiscreteButton } from "../global/DiscreteButton";
import { createBrand, deleteBrand, updateBrand } from "../../services/api/brands";

type BrandFormProps = {
    brand?: BrandType;
};

export const BrandForm: React.FC<BrandFormProps> = ({ brand }) => {
    const [brandForm, setBrandForm] = useState(brand || emptyBrand as BrandType);
    const [saving, setSaving] = useState(false);

    const { refreshBrands, loadingBrands } = useBrands();
    const { closeModal, setDisableClose } = useModal();
    const { callToast } = useToast();
    const { showDeleteAlert, isOpenDeleteAlert } = useDeleteAlert();
    
    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setDisableClose(saving || loadingBrands);
    }, [saving, setDisableClose, loadingBrands]);

    useEffect(() => {
        if (firstInputRef.current) {
            setTimeout(() => {
                firstInputRef.current?.focus();
            }, 250);
        }
    }, []);

    useKeyboardShortcut({
        'Escape': () => {
            if (saving || loadingBrands || isOpenDeleteAlert) {
                return;
            }
            closeModal();
        }
    });

    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        !disableSave && await createBrand(brandForm, callToast, refreshBrands, closeModal);
        setSaving(false);
    }

    const update = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        !disableSave && await updateBrand(brandForm, callToast, refreshBrands, closeModal);
        setSaving(false);
    }

    const handleDeleteBrand = async () => {
        if (brandForm.id) {
            setSaving(true);
            await deleteBrand(brand as BrandType, callToast, refreshBrands, closeModal);
            setSaving(false);
        }
    }

    const handleDeleteAlert = () => {
        const message = `Êtes-vous sûr de vouloir supprimer la marque ${brand?.name} ?
        <br>Cette action est définitive et entrainera la perte de toutes les données produits associées.`
        showDeleteAlert(message, handleDeleteBrand);
    }

    const disableSave =
        brand
            ? deepCompare(brand as BrandType, brandForm)
            || brandForm.name.length < 3 || brandForm.address.length === 0 || brandForm.postcode.length < 5 || Number(brandForm.postcode) < 0 || brandForm.city.length === 0 || isOpenDeleteAlert
            : brandForm.name.length < 3 || brandForm.address.length === 0 || brandForm.postcode.length < 5 || Number(brandForm.postcode) < 0 || brandForm.city.length === 0 || isOpenDeleteAlert;

    return (
        <Container onSubmit={brand ? update : save}>
            {brand &&
                <Note
                    message="Attention, afin de préserver l'intégrité des données produits, modifier le nom de la marque ne modifiera pas le code SKU associé."
                    icon={<TbAlertSquare />}
                    width="430px"
                    iconColor={`${theme.colors.blue}`}
                />}
            <BrandName $brand={!!brand}>
                <Input
                    ref={firstInputRef}
                    label="Nom"
                    width={`${brandForm.sku_code != '' ? '350px' : '444px'}`}
                    type="text"
                    placeholder="Nom"
                    value={brandForm.name || ''}
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
                label="Adresse"
                width="444px"
                type="text"
                placeholder="Adresse"
                value={brandForm.address || ''}
                onChange={(e) => setBrandForm({ ...brandForm, address: e.target.value } as BrandType)}
            />
            <BrandAddress>
                <Input
                    label="Code postal"
                    width="140px"
                    type="number"
                    noNegativeNumber
                    maxLength={5}
                    placeholder="Code postal"
                    value={brandForm.postcode || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, postcode: e.target.value } as BrandType)}
                />
                <Input
                    label="Ville"
                    width="290px"
                    type="text"
                    placeholder="Ville"
                    value={brandForm.city || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, city: e.target.value } as BrandType)}
                />
            </BrandAddress>
            <Input
                label="Contact"
                width="444px"
                type="text"
                placeholder="Contact"
                value={brandForm.contact_name || ''}
                onChange={(e) => setBrandForm({ ...brandForm, contact_name: e.target.value } as BrandType)}
            />
            <Contact>
                <Input
                    label="Email"
                    width="250px"
                    type="text"
                    placeholder="Email"
                    value={brandForm.contact_email || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, contact_email: e.target.value } as BrandType)}
                />
                <Input
                    label="Téléphone"
                    width="180px"
                    type="text"
                    placeholder="Téléphone"
                    value={brandForm.contact_phone || ''}
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
                maxLength={255}
                value={brandForm.notes || ''}
                onChange={(e: { target: { value: unknown; }; }) => setBrandForm({ ...brandForm, notes: e.target.value } as BrandType)}
            />
            <SaveAction $brand={!!brand}>
                {brand &&
                    <DiscreteButton
                        value='supprimer'
                        onClick={handleDeleteAlert}
                        color={`${theme.colors.error}`}
                        disabled={isOpenDeleteAlert}
                    />}
                <Button
                    loading={saving || loadingBrands}
                    disabled={disableSave}
                    value='enregistrer'
                    onClick={brand ? update : save}
                />
            </SaveAction>
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

const BrandAddress = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
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