import styled from 'styled-components';
import React, { useEffect } from 'react';
import { theme } from '../assets/themes';
import { DataTable } from '../components/DataTable';
import { useCustomers } from '../contexts/data/customers';
import { isEmpty, deepCopy } from '../utils/helpers/spells';
import { VscSmiley, VscEdit, VscChromeClose } from 'react-icons/vsc';
import { RowDataType, ColumnProps, RowType } from '../types/DataTableTypes';
import { Loader } from '../components/global';
import { CustomerForm } from '../components/forms/CustomerForm';
import { useModal, useDeleteAlert, useToast, useSectors } from '../contexts';
import { CustomerType } from '../types/CustomerTypes';
import { deleteCustomer } from '../services/api/customers';
import { useKeyboardShortcut } from '../hooks/system/useKeyboardShortcut';

export const CustomerPage: React.FC = () => {

    const { customers, refreshCustomers, loadingCustomers, getVisitsOptions } = useCustomers();
    const { refreshSectors } = useSectors();

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);

    const { showModal } = useModal();
    const { showDeleteAlert } = useDeleteAlert();
    const { callToast } = useToast();


    useEffect(() => {
        if(isEmpty(customers)) {
            getVisitsOptions();
            refreshSectors();
            refreshCustomers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const newCustomer = () => {
        showModal(<CustomerForm />, 'Nouveau client');
    }

    const editCustomer = (row: RowType) => {
        const customer = customers.find((customer: CustomerType) => customer.id === row.id);
        showModal(
            <CustomerForm customer={customer as CustomerType} />, 
            'Modifier les informations d\'un client');
    }

    useKeyboardShortcut({ 'Control+Alt+n': () => newCustomer() });

    const handleDeleteCustomer = async (customer: CustomerType) => {
        await deleteCustomer(customer, callToast, refreshCustomers);
    }

    const handleDeleteAlert = (row: RowType) => {
        const customer = customers.find((customer: CustomerType) => customer.id === row.id);
        const message = `Êtes-vous sûr de vouloir supprimer les données concernant ${customer && customer.full_name} ?
        Cette action est définitive et entrainera la perte de toutes les données associées.`
        showDeleteAlert(message, () => handleDeleteCustomer(customer as CustomerType));
    }

    const columns: ColumnProps[] = [
        {
            text: 'Nom',
            value: 'full_name',
            sortable: true,
            width: '1000px',
            //maxWidth: '250px',
        },
        {
            text: 'Adresse',
            value: 'full_address',
            sortable: false,
            type: 'number',
            width: '35%',
            maxWidth: '250px',
        },
        {
            text: 'Secteur',
            value: 'sector_name',
            sortable: true,
            type: 'number',
            width: '10%',
        },
        {
            text: 'Email',
            value: 'email',
            sortable: true,
            type: 'number',
            width: '15%',
        },
        {
            text: 'Téléphone',
            value: 'phone',
            sortable: true,
            type: 'number',
            width: '15%',
        },
        {
            text: '',
            value: '',
            type: 'rowActions',
            sortable: false,
            actions: [
                { icon: <VscEdit />, onClick: (row: RowType) => editCustomer(row), color: theme.colors.primary },
                { icon: <VscChromeClose />, onClick: (row: RowType) => handleDeleteAlert(row), color: theme.colors.error }
            ],
            width: '5%',
            align: "start"
        }
    ];

    return (
        <Container>
            {(isEmpty(customers) || loadingCustomers) && <Loader transparent />}
            {(!isEmpty(customers) || !loadingCustomers) && 
            <DataTable
                topBar
                searchbar={!!customers.length}
                iconTopBar={<VscSmiley />}
                onClickTopBar={newCustomer}
                onDoubleClickOnRow={(row: RowType) => editCustomer(row)}
                buttonValueTopBar='Nouveau client'
                hoverable
                // emptyMessage={'Aucun client enregistré...'}
                columns={columns}
                data={deepCopy(customers) as RowDataType[]}
                sort={sort}
                setSort={setSort}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                disabledRow={(row: RowType) => row.is_active === false}
            />}
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    width: 90%;
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
`;