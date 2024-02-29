import styled from 'styled-components';
import React, { useEffect } from 'react';
import { theme } from '../assets/themes';
import { DataTable } from '../components/DataTable';
import { useCustomers } from '../contexts/data/customers';
import { isEmpty, deepCopy } from '../utils/helpers/spells';
import { VscSmiley, VscEdit, VscChromeClose } from 'react-icons/vsc';
import { RowDataType, ColumnProps, RowType } from '../types/DataTableTypes';

export const CustomerPage: React.FC = () => {

    const { customers, refreshCustomers, loadingCustomers } = useCustomers();

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);

    useEffect(() => {
        isEmpty(customers) && refreshCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns: ColumnProps[] = [
        {
            text: 'Nom',
            value: 'full_name',
            sortable: true,
            // The first width must be huge and in a absolute unit to avoid the HTML table to be too small and apply the width of the other columns proportionally
            // The real width for this column will be the rest of the table width if the other widths are in percentage
            width: '1000px',
            maxWidth: '250px',
            // color: [
            //     { value: 'et', text: 'blue' },
            //     { value: 'quasi', text: 'red' },
            //     { value: 'et', text: 'green' }
            // ]
        },
        {
            text: 'Adresse',
            value: 'full_address',
            sortable: false,
            type: 'number',
            width: '25%',
            maxWidth: '250px',
            // color: [
            //     { value: '10', text: 'white', background: 'purple' }
            // ]
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
                { icon: <VscEdit />, onClick: (row: RowType) => console.log(row), color: theme.colors.primary },
                { icon: <VscChromeClose />, onClick: (row: RowType) => console.log(row), color: theme.colors.error }
            ],
            width: '5%',
            align: "start"
        }
    ];

    return (
        <Container>
            <DataTable
                topBar
                searchbar
                iconTopBar={<VscSmiley />}
                loading={loadingCustomers}
                buttonValueTopBar='Ajouter un client'
                hoverable
                emptyMessage={'Aucun client enregistré...'}
                columns={columns}
                data={deepCopy(customers) as RowDataType[]}
                sort={sort}
                setSort={setSort}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
            />
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