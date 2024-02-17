import React, { useEffect } from 'react';
import styled from 'styled-components';
import { deepCopy, isEmpty, firstOf } from '../utils/helpers/spells.ts';
import { Loader } from '../components/global/Loader.tsx';
import { DataTable } from '../components/DataTable';
import { RowDataType, RowType } from '../types/DataTableTypes.ts';
import { SectorType } from '../types/SectorTypes.ts';
import { fetchSectors } from '../services/api/sectors';
import { useSectors, useModal, useAppLoading } from '../contexts';
import { SectorForm } from '../components/forms/SectorForm.tsx';

export const SectorPage: React.FC = () => {

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);

    const { sectors, refreshSectors, loadingSectors } = useSectors();
    const { showModal } = useModal();
    const { setAppLoading } = useAppLoading();

    useEffect(() => {
        refreshSectors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            text: 'Nom du secteur',
            value: 'name',
            sortable: true,
            // color: [
            //     { value: 'et', text: 'blue' },
            //     { value: 'quasi', text: 'red' },
            //     { value: 'et', text: 'green' }
            // ]
        },
        {
            text: 'Nombre de communes',
            value: 'postcodes_count',
            sortable: true,
            type: 'number',
            // color: [
            //     { value: '10', text: 'white', background: 'purple' }
            // ]
        },
        {
            text: 'Communes',
            value: 'postcodes_list',
            sortable: false,
            type: 'chips',
            limit: 5,
        }
    ];

    const handleDoubleClick = async (row: RowType) => {
        setAppLoading(true);
        const sector = await fetchSectors(row.id as SectorType['id'], 'withPostcodes');
        showModal(<SectorForm sector={firstOf(sector) as SectorType} />, `Modifier le secteur "${firstOf(sector)?.name}"`);
        setAppLoading(false);
    };

    return (
        <Container>
            {(isEmpty(sectors) || loadingSectors) && <Loader />}
            {(!isEmpty(sectors) && !loadingSectors) &&
                <DataTable
                    searchbar
                    columns={columns}
                    onDoubleClickOnRow={handleDoubleClick}
                    data={deepCopy(sectors) as unknown as RowDataType[]}
                    emptyMessage={'Aucun secteur trouvé'}
                    sort={sort}
                    setSort={setSort}
                    sortDirection={sortDirection}
                    setSortDirection={setSortDirection}
                />
            }
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
`;

