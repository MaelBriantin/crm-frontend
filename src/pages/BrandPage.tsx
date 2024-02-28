import { useEffect, useState } from 'react';
import { useBrands, useDeleteAlert, useModal, useToast } from '../contexts';
import { isEmpty } from '../utils/helpers/spells';
import { DataTable } from '../components/DataTable';
import { Loader } from '../components/global/Loader';
import { RowDataType, RowType } from '../types/DataTableTypes';
import styled from 'styled-components';
import { deepCopy } from '../utils/helpers/spells';
import { VscJersey } from "react-icons/vsc";
import { BrandForm } from '../components/forms/BrandForm';
import { BrandType } from '../types/BrandTypes';
import { VscEdit, VscChromeClose } from "react-icons/vsc";
import { theme } from '../assets/themes';
import { deleteBrand } from '../services/api/brands';
import { useKeyboardShortcut } from '../hooks/system/useKeyboardShortcut';

export const BrandPage = () => {

    const [sort, setSort] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<boolean>(true);

    const { showModal } = useModal();
    const { refreshBrands, brands, loadingBrands } = useBrands();
    const { showDeleteAlert } = useDeleteAlert();
    const { callToast } = useToast();

    useEffect(() => {
        isEmpty(brands) && refreshBrands();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const newBrand = () => {
        showModal(<BrandForm />, 'Ajouter une marque');
    }

    useKeyboardShortcut({ 'Control+Alt+n': () => newBrand() });

    const editBrand = (row: RowType) => {
        const brand = brands.find((brand: BrandType) => brand.id === row.id);
        showModal(<BrandForm brand={brand as BrandType} />, 'Modifier une marque');
    }

    const handleDeleteAlert = (row: RowType) => {
        const brand = brands.find((brand: BrandType) => brand.id === row.id);
        const message = `Êtes-vous sûr de vouloir supprimer la marque ${brand?.name} ?
        <br>Cette action est définitive et entrainera la perte de toutes les données produits associées.`
        showDeleteAlert(message, () => handleDeleteSector(brand as BrandType));
    }

    const handleDeleteSector = async (brand: BrandType) => {
        await deleteBrand(brand, callToast, refreshBrands);
    }

    const columns = [
        {
            text: 'Code SKU',
            value: 'sku_code',
            sortable: true,
            width: '10%',
            type: 'chips',
        },
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
            width: '18%'
        },
        {
            text: '',
            value: '',
            type: 'rowActions',
            sortable: false,
            actions: [
                { icon: <VscEdit />, onClick: (row: RowType) => editBrand(row), color: theme.colors.primary },
                { icon: <VscChromeClose />, onClick: (row: RowType) => handleDeleteAlert(row as BrandType), color: theme.colors.error }
            ],
            width: '2%'
        }
    ];

    return (
        <Container>
            {(isEmpty(brands) || loadingBrands) && <Loader transparent />}
            {(!isEmpty(brands)) &&
                <DataTable
                    topBar
                    searchbar
                    iconTopBar={<VscJersey />}
                    buttonValueTopBar='Ajouter une marque'
                    onClickTopBar={newBrand}
                    onDoubleClickOnRow={editBrand}
                    hoverable
                    emptyMessage={'Aucune marque trouvée'}
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
