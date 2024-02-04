import React, { useEffect } from 'react';
import styled from 'styled-components';
import { deep, firstOf, isEmpty } from '../utils/helpers/spells.ts';
import { Loader } from '../components/global/Loader.tsx';
import { DataTable } from '../components/DataTable';
import { RowDataType } from '../types/DataTableTypes.ts';
import { RowType } from '../types/DataTableTypes.ts';
import { SectorType } from '../types/DataTypes.ts';
import { fetchAllSectors, fetchSectors } from '../services/api/sectors';

export const SectorPage: React.FC = () => {

    const [sectors, setSectors] = React.useState<SectorType[]>([]);

    useEffect(() => {
        const fetchSectors = async (option: string) => {
            const sectors = await fetchAllSectors(option);
            setSectors(sectors as SectorType[]);
        };
        fetchSectors('withPostcodes');
    }, []);

    const columns = [
        {
            text: 'Identifiant',
            value: 'id',
            sortable: true,
            type: 'number',
            // color: [
            //     { value: '*<5', text: 'blue' }
            // ]
        },
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
            text: 'Codes postaux',
            value: 'postcodes',
            sortable: false,
            type: 'chips',
            limit: 5, // limit the number of chips displayed if the value is an array
            // color: [
            //     { value: '*', text: 'white', background: `${theme.colors.primary}` }
            // ]
        },
    ];

    const sectorsWithPostcodes = sectors.map(sector => {
        return {
            ...sector,
            postcodes: sector.postcodes.map(postcode => postcode.postcode)
        }
    });

    // const handleClick = (row: RowType) => {
    //     console.log('click', row);
    // };

    const handleDoubleClick = async (row: RowType) => {
        const sector = await fetchSectors(row.id as SectorType['id'], 'withPostcodes');
        console.log('sector', firstOf(sector));
    };

    return (
        <Container>
            {isEmpty(sectors) && <Loader />}
            {!isEmpty(sectors) &&
                <DataTable
                    searchbar
                    columns={columns}
                    onDoubleClickOnRow={handleDoubleClick}
                    data={deep(sectorsWithPostcodes) as unknown as RowDataType[]}
                    emptyMessage={'Aucun secteur trouvé'}
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

