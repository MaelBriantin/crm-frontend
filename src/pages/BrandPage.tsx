import { useEffect, useState } from 'react';
import { useBrands } from '../contexts';
import { isEmpty } from '../utils/helpers/spells';
import { DataTable } from '../components/DataTable';
import { Loader } from '../components/global/Loader';
import { RowDataType } from '../types/DataTableTypes';
import styled from 'styled-components';
import { deepCopy } from '../utils/helpers/spells';
import { VscJersey } from "react-icons/vsc";

export const BrandPage = () => {

    const [sort, setSort] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<boolean>(true);

    const { refreshBrands, brands } = useBrands();

    useEffect(() => {
        isEmpty(brands) && refreshBrands();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            text: 'Marque',
            value: 'name',
            sortable: true,
            width: '1000px'
        },
        {
            text: 'Contact',
            value: 'contact_name',
            sortable: true,
            width: '25%'
        },
        {
            text: 'Email',
            value: 'contact_email',
            sortable: true,
            width: '20%'
        },
        {
            text: 'Téléphone',
            value: 'contact_phone',
            sortable: false,
            width: '20%'
        },
        {
            text: 'Code SKU',
            value: 'sku_code',
            sortable: true,
            width: '10%',
            type: 'chips',
        },
    ];

    return (
        <Container>
            {isEmpty(brands) &&
                <Loader />}
            {!isEmpty(brands) &&
                <DataTable
                    topBar
                    searchbar
                    iconTopBar={<VscJersey />}
                    onClickTopBar={() => { }}
                    hoverable
                    columns={columns}
                    data={deepCopy(brands) as RowDataType[]}
                    sort={sort}
                    setSort={setSort}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
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
