import React, { useState, useEffect, useRef } from "react";
import { BrandType, emptyBrand } from "../../types/BrandTypes";
import styled from "styled-components";
import { Chip, Input, Textarea, Note } from "../global";
import { useModal, useToast, useDeleteAlert, useFormActions } from "../../contexts";
import { useKeyboardShortcut } from "../../hooks/system/useKeyboardShortcut";
import { TbAlertSquare } from "react-icons/tb";
import { theme } from "../../assets/themes";
import { deepCompare } from "../../utils/helpers/spells";
import { createBrand, deleteBrand, updateBrand } from "../../services/api/brands";
import {useStoreBrands} from "../../stores/useStoreBrands.ts";
import {useStoreProducts} from "../../stores/useStoreProducts.ts";

type BrandFormProps = {
    brand?: BrandType;
};

export const BrandForm: React.FC<BrandFormProps> = ({ brand }) => {
    const [brandForm, setBrandForm] = useState(brand || emptyBrand as BrandType);
    const [saving, setSaving] = useState(false);

    const { closeModal, setDisableClose } = useModal();
    const { callToast } = useToast();
    const { isOpenDeleteAlert } = useDeleteAlert();
    const { setData, setDeleteMessage, setIsDisableSave, setIsLoading, setOnDelete, setOnSave } = useFormActions();
    
    const firstInputRef = useRef<HTMLInputElement>(null);

    const { fetchBrands, loadingBrands } = useStoreBrands();
    const { fetchProducts } = useStoreProducts();

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
        //setSaving(true);
        !disableSave && await createBrand(brandForm, callToast, fetchBrands, closeModal);
        //setSaving(false);
    };

    const update = async (e: React.FormEvent) => {
        e.preventDefault();
        //setSaving(true);
        !disableSave && await updateBrand(brandForm, callToast, fetchBrands, closeModal);
        await fetchProducts();
        //setSaving(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        if (brandForm.id) {
            await update(e);
        } else {
            await save(e);
        }
        setSaving(false);
    };

    const handleDeleteBrand = async () => {
        if (brandForm.id) {
            setSaving(true);
            await deleteBrand(brand as BrandType, callToast, fetchBrands, closeModal);
            await fetchProducts();
            setSaving(false);
        }
    };

    const disableSave =
        brand
            ? deepCompare(brand as BrandType, brandForm)
            || brandForm.name.length < 3 || brandForm.address.length === 0 || brandForm.postcode.length < 5 || Number(brandForm.postcode) < 0 || brandForm.city.length === 0 || isOpenDeleteAlert
            : brandForm.name.length < 3 || brandForm.address.length === 0 || brandForm.postcode.length < 5 || Number(brandForm.postcode) < 0 || brandForm.city.length === 0 || isOpenDeleteAlert;


    useEffect(() => {
        setData(!!brand);
        setDeleteMessage(`Êtes-vous sûr de vouloir supprimer la marque ${brand?.name} ? 
        Cette action est définitive et entrainera la perte de toutes les données produits associées.`);
        setOnDelete(() => handleDeleteBrand);
        setOnSave(() => handleSave);
        setIsDisableSave(disableSave);
        setIsLoading(saving || loadingBrands);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disableSave, saving, setSaving, loadingBrands, brandForm]);

    return (
        <Container onSubmit={handleSave}>
            {brand &&
                <Note
                    message="Attention, afin de préserver l'intégrité des données produits, modifier le nom de la marque ne modifiera pas le code SKU associé."
                    icon={<TbAlertSquare />}
                    width="430px"
                    iconColor={`${theme.colors.blue}`}
                />}
            <BrandName $brand={!!brand}>
                <Input
                    name="name"
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
                name="address"
                label="Adresse"
                width="444px"
                type="text"
                placeholder="Adresse"
                value={brandForm.address || ''}
                onChange={(e) => setBrandForm({ ...brandForm, address: e.target.value } as BrandType)}
            />
            <BrandAddress>
                <Input
                    name="postcode"
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
                    name="city"
                    label="Ville"
                    width="290px"
                    type="text"
                    placeholder="Ville"
                    value={brandForm.city || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, city: e.target.value } as BrandType)}
                />
            </BrandAddress>
            <Input
                name="contact_name"
                label="Contact"
                width="444px"
                type="text"
                placeholder="Contact"
                value={brandForm.contact_name || ''}
                onChange={(e) => setBrandForm({ ...brandForm, contact_name: e.target.value } as BrandType)}
            />
            <Contact>
                <Input
                    name="contact_email"
                    label="Email"
                    width="250px"
                    type="text"
                    placeholder="Email"
                    value={brandForm.contact_email || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, contact_email: e.target.value } as BrandType)}
                />
                <Input
                    name="contact_phone"
                    label="Téléphone"
                    width="180px"
                    type="text"
                    placeholder="Téléphone"
                    value={brandForm.contact_phone || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, contact_phone: e.target.value } as BrandType)}
                />
            </Contact>
            <TextareaContainer>
                <Textarea
                    name="notes"
                    label="Notes"
                    width="444px"
                    maxWidth="400px"
                    height="100px"
                    maxHeight="400px"
                    placeholder="Notes"
                    maxLength={255}
                    value={brandForm.notes || ''}
                    onChange={(e) => setBrandForm({ ...brandForm, notes: e.target.value } as BrandType)}
                />
            </TextareaContainer>
            <input type="submit" style={{ display: 'none' }} />
        </Container>
    );
}

const Container = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    gap: 30px;
`;

const BrandName = styled.div<{ $brand: boolean }>`
    margin-top: ${({ $brand }) => $brand ? '0' : '10px'};
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

const Contact = styled.div` 
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
`;

const TextareaContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
`;