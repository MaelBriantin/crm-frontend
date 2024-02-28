import React, { useEffect } from 'react';
import styled from 'styled-components';
import { deepCopy, isEmpty } from '../utils/helpers/spells.ts';
import { Loader } from '../components/global/Loader.tsx';
import { DataTable } from '../components/DataTable';
import { RowDataType, RowType } from '../types/DataTableTypes.ts';
import { SectorType } from '../types/SectorTypes.ts';
import { useSectors, useModal, useAppLoading, useDeleteAlert, useToast } from '../contexts';
import { SectorForm } from '../components/forms/SectorForm.tsx';
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { VscEdit, VscChromeClose } from "react-icons/vsc";
import { theme } from '../assets/themes/index.ts';
import { deleteSector } from '../services/api/sectors/deleteSector.ts';

export const SectorPage: React.FC = () => {

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);

    const { sectors, refreshSectors, loadingSectors } = useSectors();
    const { showModal } = useModal();
    const { setAppLoading } = useAppLoading();
    const { showDeleteAlert } = useDeleteAlert();
    const { callToast } = useToast();

    useEffect(() => {
        isEmpty(sectors) && refreshSectors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteAlert = (row: RowType) => {
        const sector = sectors.find((sector: SectorType) => sector.id === row.id);
        const message = `Êtes-vous sûr de vouloir supprimer le secteur ${sector?.name} ?
        <br>Cette action est irréversible et entrainera la perte de toutes les données statistiques associées.`
        showDeleteAlert(message, () => handleDeleteSector(sector as SectorType));
    }

    const handleDeleteSector = async (sector: SectorType) => {
        await deleteSector(sector, callToast, refreshSectors);
    }


    const columns = [
        {
            text: 'Nom du secteur',
            value: 'name',
            sortable: true,
            // The first width must be huge and in a absolute unit to avoid the HTML table to be too small and apply the width of the other columns proportionally
            // The real width for this column will be the rest of the table width if the other widths are in percentage
            width: '1000px'
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
            width: '15%'
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
            width: '58%'
        },
        {
            text: '',
            value: '',
            type: 'rowActions',
            sortable: false,
            actions: [
                { icon: <VscEdit />, onClick: (row: RowType) => handleDoubleClick(row), color: theme.colors.blue },
                { icon: <VscChromeClose />, onClick: (row: RowType) => handleDeleteAlert(row), color: theme.colors.error }
            ],
            width: '2%'
        }
    ];

    const handleDoubleClick = (row: RowType) => {
        setAppLoading(true);
        const sector = sectors.find((sector: SectorType) => sector.id === row.id);
        showModal(<SectorForm sector={sector as SectorType} />, `Modifier un secteur`);
        setAppLoading(false);
    };

    const newSector = () => {
        showModal(<SectorForm />, 'Ajouter un secteur');
    };

    return (
        <Container>
            {(isEmpty(sectors) || loadingSectors) && <Loader />}
            {(!isEmpty(sectors) && !loadingSectors) &&
                <DataTable
                    topBar
                    searchbar
                    iconTopBar={<LiaMapMarkedAltSolid />}
                    buttonValueTopBar='Ajouter un secteur'
                    columns={columns}
                    onDoubleClickOnRow={handleDoubleClick}
                    onClickTopBar={newSector}
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
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
`;

