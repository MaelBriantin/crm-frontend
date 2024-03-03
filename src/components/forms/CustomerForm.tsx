import { useState, useEffect, useRef } from "react";
import { CustomerType } from "../../types/CustomerTypes";
import styled from "styled-components";
import { emptyCustomer } from "../../types/CustomerTypes";
import { useCustomers, useModal, useToast, useDeleteAlert, useSectors } from "../../contexts";
import { createCustomer, updateCustomer, deleteCustomer } from "../../services/api/customers";
import { useKeyboardShortcut } from "../../hooks/system/useKeyboardShortcut";
import { Dropdown, Input, Textarea, Button, DiscreteButton, Switch, Note } from "../global";
import { deepCompare, isEmpty } from "../../utils/helpers/spells";
import { sectorDropdownOptionFormat } from "../../utils/customerUtils";
import { theme } from "../../assets/themes";
import { SectorType } from "../../types/SectorTypes";
import { CiSquareCheck } from "react-icons/ci";

type CustomerFormProps = {
    customer?: CustomerType;
};

export const CustomerForm: React.FC<CustomerFormProps> = ({ customer }) => {
    const [customerForm, setCustomerForm] = useState(customer || emptyCustomer as CustomerType);
    const [saving, setSaving] = useState(false);
    const [suggestedSector, setSuggestedSector] = useState(customer
        ? sectorDropdownOptionFormat(customerForm.sector as SectorType)
        : null);
    const [inputLoading, setInputLoading] = useState(false);

    const { refreshCustomers, loadingCustomers } = useCustomers();
    const { sectors, refreshSectors } = useSectors();
    const { closeModal, setDisableClose } = useModal();
    const { callToast } = useToast();
    const { showDeleteAlert, isOpenDeleteAlert } = useDeleteAlert();

    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isEmpty(sectors) && refreshSectors();
    }, [sectors, refreshSectors])

    const sectorOptions = sectors.map((sector) => {
        return sectorDropdownOptionFormat(sector);
    });
    sectorOptions.unshift({ value: '0', label: 'Hors secteur' });

    useEffect(() => {
        setDisableClose(saving || loadingCustomers);
    }, [saving, setDisableClose, loadingCustomers]);

    useEffect(() => {
        if (firstInputRef.current) {
            setTimeout(() => {
                firstInputRef.current?.focus();
            }, 250);
        }
    }, []);

    useKeyboardShortcut({
        'Escape': () => {
            if (saving || loadingCustomers || isOpenDeleteAlert) {
                return;
            }
            closeModal();
        }
    });

    useEffect(() => {
        const findMatchingSector = (postcode: string) => {
            setInputLoading(true);
            const sector = sectors.find((sector) =>
                sector.postcodes.some((postcodeObj) => postcodeObj.postcode === postcode)
            );
            if (sector) {
                setSuggestedSector(sectorDropdownOptionFormat(sector));
                setCustomerForm((prevCustomerForm) => ({
                    ...prevCustomerForm,
                    sector,
                    city: sector.postcodes.find((postcodeObj) => postcodeObj.postcode === postcode)?.city || ''
                }));
            }
            setInputLoading(false);
        };

        if (!customerForm.sector && customerForm.postcode && customerForm.postcode.length === 5) {
            findMatchingSector(customerForm.postcode);
        }
    }, [customerForm, customerForm.postcode, sectors]);

    const save = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        !disableSave && await createCustomer(customerForm, callToast, refreshCustomers, closeModal);
        setSaving(false);
    };

    const update = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        !disableSave && await updateCustomer(customerForm, callToast, refreshCustomers, closeModal);
        setSaving(false);
    };

    const handleDeleteCustomer = async () => {
        if (customerForm.id) {
            setSaving(true);
            await deleteCustomer(customer as CustomerType, callToast, refreshCustomers, closeModal);
            setSaving(false);
        }
    }

    const handleDeleteAlert = () => {
        const message = `Êtes-vous sûr de vouloir supprimer les données concernant ${customer && customer.full_name} ?
        Cette action est définitive et entrainera la perte de toutes les données associées.`
        showDeleteAlert(message, handleDeleteCustomer);
    };

    const disableSave =
        customer && deepCompare(customer as CustomerType, customerForm)
        || customerForm.firstname.length < 3
        || customerForm.lastname.length < 3
        || customerForm.address.length < 3
        || customerForm.postcode.length < 5
        || customerForm.city.length < 3
        || !customerForm.sector
        || customerForm.sector && customerForm.sector.id === 0
        || saving
        || loadingCustomers;

    return (
        <Container onSubmit={customer ? update : save}>
            <NameRow>
                <Input
                    ref={firstInputRef}
                    label="Prénom"
                    placeholder="Prénom"
                    type="text"
                    value={customerForm.firstname || ''}
                    onChange={(e) => setCustomerForm({ ...customerForm, firstname: e.target.value })}
                    width="200px"
                />
                <Input

                    label="Nom"
                    placeholder="Nom"
                    type="text"
                    value={customerForm.lastname || ''}
                    onChange={(e) => setCustomerForm({ ...customerForm, lastname: e.target.value })}
                    width="245px"
                />
            </NameRow>
            <AddressContainer>
                <Input
                    label="Adresse"
                    placeholder="Adresse"
                    type="text"
                    value={customerForm.address || ''}
                    onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                    width="460px"
                />
                <CityRow>
                    <Input
                        label="Code Postal"
                        placeholder="Code Postal"
                        type="number"
                        noNegativeNumber
                        maxLength={5}
                        value={customerForm.postcode || ''}
                        onChange={(e) => setCustomerForm({ ...customerForm, postcode: e.target.value })}
                        width="125px"
                    />
                    <Input
                        loading={inputLoading}
                        label="Ville"
                        placeholder="Ville"
                        type="text"
                        value={customerForm.city || ''}
                        onChange={(e) => setCustomerForm({ ...customerForm, city: e.target.value })}
                        width="320px"
                    />
                </CityRow>
                <Dropdown
                    loading={inputLoading}
                    placeholder="Secteur"
                    label="Secteur"
                    width="440px"
                    maxHeight="208px"
                    options={sectorOptions}
                    value={suggestedSector || undefined}
                    onChange={(e) => setCustomerForm({ ...customerForm, sector: sectors.find((sector) => sector.id === Number(e.value)) || { id: null } as SectorType })}
                    openOnBottom
                />
            </AddressContainer>
            <ContactContainer>
                <Input
                    label="Téléphone"
                    placeholder="Téléphone"
                    type="text"
                    value={customerForm.phone || ''}
                    onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                    width="150px"
                />
                <Input
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={customerForm.email || ''}
                    onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                    width="296px"
                />
            </ContactContainer>
            <Textarea
                label="Notes"
                placeholder="Notes"
                value={customerForm.notes || ''}
                onChange={(e) => setCustomerForm({ ...customerForm, notes: e.target.value })}
                width="460px"
                maxWidth="40vw"
                height="100px"
                maxHeight="200px"
            />
            {customer && 
            <ActiveContainer>
                <Note
                    width="300px"
                    message='Les clients inactifs ne seront pas pris en compte dans les statistiques de leurs secteurs.'
                    iconColor={theme.colors.blue}
                    icon={<CiSquareCheck />}
                />
                <Switch
                    label={customerForm.is_active ? 'Client actif' : 'Client inactif'}
                    checked={customerForm.is_active}
                    onChange={(e) => setCustomerForm({ ...customerForm, is_active: e.target.checked })}
                    />
            </ActiveContainer>}
            <SaveAction $customer={!!customer}>
                {customer &&
                    <DiscreteButton
                        value='supprimer'
                        onClick={handleDeleteAlert}
                        color={`${theme.colors.error}`}
                        disabled={isOpenDeleteAlert}
                    />}
                <Button
                    loading={saving || loadingCustomers}
                    disabled={disableSave}
                    value='enregistrer'
                    onClick={customer ? update : save}
                />
            </SaveAction>
        </Container>
    )
};

const Container = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    gap: 30px;
`;

const NameRow = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`;

const AddressContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 30px;
    width: 100%;
`;

const CityRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`;

const ContactContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`;

const ActiveContainer = styled.div`
    margin-top: -10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
`;

const SaveAction = styled.div<{ $customer: boolean }>`  
    gap: 10px;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: ${({ $customer }) => $customer ? 'space-between' : 'flex-end'};
    align-items: center;
`;