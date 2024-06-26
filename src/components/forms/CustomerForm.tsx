import React, {useState, useEffect, useRef} from "react";
import {CustomerType} from "../../types/CustomerTypes";
import styled from "styled-components";
import {emptyCustomer} from "../../types/CustomerTypes";
import {useModal, useToast, useDeleteAlert, useFormActions} from "../../contexts";
import {createCustomer, updateCustomer, deleteCustomer} from "../../services/api/customers";
import {useKeyboardShortcut} from "../../hooks/system/useKeyboardShortcut";
import {Dropdown, Input, Textarea, Switch, Loader} from "../global";
import {deepCompare, isEmpty} from "../../utils/helpers/spells";
import {sectorDropdownOptionFormat} from "../../utils/customerUtils";
import {SectorType} from "../../types/SectorTypes";
import {DropdownOptions, DropdownValueType} from "../global/Dropdown";
import {CustomerRelationshipSelector} from "./CustomerRelationshipSelector";
import {useStoreSectors} from "../../stores/useStoreSectors.ts";
import {useStoreCustomers} from "../../stores/useStoreCustomers.ts";

type CustomerFormProps = {
    customer?: CustomerType,
};

export const CustomerForm: React.FC<CustomerFormProps> = ({customer}) => {
    const [customerForm, setCustomerForm] = useState(customer || emptyCustomer as CustomerType);
    const [saving, setSaving] = useState(false);
    const [suggestedSector, setSuggestedSector] = useState(customer
        ? sectorDropdownOptionFormat(customerForm.sector as SectorType)
        : null);
    const [inputLoading, setInputLoading] = useState(false);

    const {closeModal, setDisableClose} = useModal();
    const {callToast} = useToast();
    const {isOpenDeleteAlert} = useDeleteAlert();
    const {setDeleteMessage,
        setOnDelete,
        setData,
        setIsDisableSave,
        setOnSave,
        setIsLoading,
        setIsDisableDelete
    } = useFormActions();

    const {sectors, fetchSectors, loadingSectors} = useStoreSectors();
    const {
        fetchCustomers,
        loadingCustomers,
        loadingVisitsOptions,
        visitFrequencies,
        relationships,
        fetchVisitsOptions,
        daysOfWeek
    } = useStoreCustomers();

    const firstInputRef = useRef<HTMLInputElement>(null);

    const sectorOptions = sectors.map((sector) => {
        return sectorDropdownOptionFormat(sector);
    });
    sectorOptions.unshift({value: '0', label: 'Hors secteur'});

    const visitFrequenciesOptions = visitFrequencies.map((visitFrequency) => {
        return {value: visitFrequency.id, label: visitFrequency.label};
    });
    visitFrequenciesOptions.unshift({value: '', label: 'Aucune'});

    useEffect(() => {
        setDisableClose(saving || loadingCustomers);
    }, [saving, setDisableClose, loadingCustomers]);

    useEffect(() => {
        if (firstInputRef.current && !inputLoading) {
            setTimeout(() => {
                firstInputRef.current?.focus();
            }, 250);
        }
    }, [inputLoading]);

    useEffect(() => {
        if (isEmpty(sectors)) {
            fetchSectors();
        }
        if (isEmpty(visitFrequencies)
            || isEmpty(relationships)) {
            fetchVisitsOptions();
        }
    }, [sectors, visitFrequencies, relationships, fetchSectors, fetchVisitsOptions]);

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
    }, [customerForm, customerForm.postcode, sectors, setCustomerForm]);

    const updateRefresh = () => {
      fetchCustomers();
      fetchSectors();
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (customer) {
            setSaving(true);
            await updateCustomer(customerForm, callToast, updateRefresh, closeModal);
            setSaving(false);
        } else {
            setSaving(true);
            await createCustomer(customerForm, callToast, fetchCustomers, closeModal);
            setSaving(false);
        }
    }

    const deleteMessage = customer
        && "Êtes-vous sûr de vouloir supprimer les données concernant " + (customer && customer.full_name) + " ? Cette action est définitive et entrainera la perte de toutes les données associées."
        || "";

    const handleDelete = async () => {
        if (customer && customerForm.id) {
            setSaving(true);
            await deleteCustomer(customer as CustomerType, callToast, fetchCustomers, closeModal);
            setSaving(false);
        }
    };

    const handleVisitFrequencyChange = (e: DropdownValueType) => {
        const visitFrequency = visitFrequencies.find((visitFrequency) => visitFrequency.id === e.value);
        setCustomerForm({...customerForm, visit_frequency: visitFrequency || null});
    }

    const isSaveDisabled =
        customer && deepCompare(customer as CustomerType, customerForm)
        || customerForm.firstname.length < 3
        || customerForm.lastname.length < 3
        || customerForm.address.length < 3
        || customerForm.postcode.length < 5
        || customerForm.city.length < 3
        // || !customerForm.sector // Disabled to allow for customers outside of sectors
        || customerForm.sector && customerForm.sector.id === 0
        || saving
        || loadingCustomers
        || loadingVisitsOptions
        || loadingSectors;

    useEffect(() => {
        setData(!!customer);
        setDeleteMessage(deleteMessage);
        setOnDelete(() => handleDelete);
        setIsDisableSave(isSaveDisabled);
        setOnSave(() => handleSave);
        setIsLoading(saving || loadingCustomers);
        setIsDisableDelete(saving || loadingCustomers || loadingSectors || loadingVisitsOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaveDisabled, saving, loadingCustomers, customerForm, customer, loadingSectors, loadingVisitsOptions]);

    return (
        <Container onSubmit={handleSave}>
            {(loadingSectors || loadingVisitsOptions)
                && <Loader transparent />}
            <NameRow>
                <Input
                    ref={firstInputRef}
                    label="Prénom"
                    placeholder="Prénom"
                    type="text"
                    value={customerForm.firstname || ''}
                    onChange={(e) => setCustomerForm({...customerForm, firstname: e.target.value})}
                    width="200px"
                />
                <Input

                    label="Nom"
                    placeholder="Nom"
                    type="text"
                    value={customerForm.lastname || ''}
                    onChange={(e) => setCustomerForm({...customerForm, lastname: e.target.value})}
                    width="245px"
                />
            </NameRow>
            <AddressContainer>
                <Input
                    label="Adresse"
                    placeholder="Adresse"
                    type="text"
                    value={customerForm.address || ''}
                    onChange={(e) => setCustomerForm({...customerForm, address: e.target.value})}
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
                        onChange={(e) => setCustomerForm({...customerForm, postcode: e.target.value})}
                        width="125px"
                    />
                    <Input
                        loading={inputLoading}
                        label="Ville"
                        placeholder="Ville"
                        type="text"
                        value={customerForm.city || ''}
                        onChange={(e) => setCustomerForm({...customerForm, city: e.target.value})}
                        width="320px"
                    />
                </CityRow>
                <Dropdown
                    loading={loadingSectors}
                    placeholder="Secteur"
                    label="Secteur"
                    width="440px"
                    maxHeight="208px"
                    options={sectorOptions}
                    value={suggestedSector || undefined}
                    onChange={(e) => setCustomerForm({
                        ...customerForm,
                        sector: sectors.find((sector) => sector.id === Number(e.value)) || {id: null} as SectorType
                    })}
                    openOnBottom
                />
            </AddressContainer>
            <ContactContainer>
                <Input
                    label="Téléphone"
                    placeholder="Téléphone"
                    type="text"
                    value={customerForm.phone || ''}
                    onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})}
                    width="150px"
                />
                <Input
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={customerForm.email || ''}
                    onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
                    width="296px"
                />
            </ContactContainer>
            <VisitContainer>
                <Dropdown
                    label="Fréquence de visite"
                    placeholder="Fréquence de visite"
                    width="203px"
                    options={visitFrequenciesOptions}
                    value={customerForm.visit_frequency ? {
                        value: customerForm.visit_frequency.id,
                        label: customerForm.visit_frequency.label
                    } : undefined}
                    loading={loadingVisitsOptions}
                    onChange={(e: DropdownValueType) => handleVisitFrequencyChange(e)}
                    openOnBottom
                />
                <Dropdown
                    label="Jour de visite"
                    placeholder="Jour de visite"
                    width="203px"
                    options={daysOfWeek as DropdownOptions[]}
                    value={customerForm.visit_day ? {
                        value: customerForm.visit_day,
                        label: daysOfWeek.find(e => e.value === customerForm.visit_day)?.label
                    } as DropdownOptions : undefined}
                    onChange={(e) => setCustomerForm({
                        ...customerForm,
                        visit_day: e.value as CustomerType['visit_day']
                    })}
                    loading={loadingVisitsOptions}
                    openOnBottom
                />
            </VisitContainer>
            <Input
                label="Horaire de visite"
                placeholder="Horaire de visite"
                type="text"
                value={customerForm.visit_schedule || ''}
                onChange={(e) => setCustomerForm({...customerForm, visit_schedule: e.target.value})}
                width="460px"
            />
            <TextareaContainer $customer={!customer}>
                <Textarea
                    label="Notes"
                    placeholder="Notes"
                    value={customerForm.notes || ''}
                    onChange={(e) => setCustomerForm({...customerForm, notes: e.target.value})}
                    width="460px"
                    maxWidth="40vw"
                    height="100px"
                    maxHeight="200px"
                />
            </TextareaContainer>
            {(customer && !loadingVisitsOptions) &&
                <ActiveContainer>
                    <CustomerRelationshipSelector
                        relationships={relationships}
                        customer={customerForm}
                        setCustomer={setCustomerForm}
                    />
                    <Switch
                        label={customerForm.is_active ? 'Client actif' : 'Client inactif'}
                        checked={customerForm.is_active}
                        onChange={(e) => setCustomerForm({...customerForm, is_active: e.target.checked})}
                    />
                </ActiveContainer>}
            <input type="submit" style={{display: 'none'}}/>
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
    //width: 100%;
    gap: 30px;
`;

const NameRow = styled.div`
    margin-top: 10px;
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

const VisitContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`;

const TextareaContainer = styled.div<{ $customer: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: ${({$customer}) => $customer ? '10px' : '0'};
`;

const ActiveContainer = styled.div`
    margin-top: -10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    padding-bottom: 20px;
`;
