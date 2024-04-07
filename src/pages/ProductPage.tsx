import React, {useEffect} from 'react';
import { useModal } from '../contexts';
import { useStoreProducts } from '../stores/useStoreProducts';
import { isEmpty } from '../utils/helpers/spells';
import { DataTable } from '../components/DataTable';
import { ColumnProps, RowDataType } from '../types/DataTableTypes';
import { deepCopy } from '../utils/helpers/spells';
import styled from 'styled-components';
import { ProductForm, FormActions } from '../components/forms/';


export const ProductPage: React.FC = () => {
    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);

    const { showModal } = useModal();

    const {products, fetchProducts, loadingProducts} = useStoreProducts();

    useEffect(() => {
        isEmpty(products) && fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const newProduct = () => {
        showModal(
            <ProductForm/>,
            'Nouveau produit',
            <FormActions/>
        );
    };

    const columns: ColumnProps[] = [
        {
            text: 'Nom du produit',
            value: 'name',
            sortable: true,
            width: '2000px',
            maxWidth: '450px',
        },
        {
            text: 'Prix',
            value: 'price',
            sortable: true,
            width: '200px',
            maxWidth: '200px',
        },
        {
            text: 'Stock',
            value: 'stock',
            sortable: true,
            width: '200px',
            maxWidth: '200px',
        },
        {
            text: 'Actions',
            value: 'actions',
            sortable: false,
            width: '5%',
            maxWidth: '100px',
            align: "start"
        },
    ];

    return (
        <Container>
            {/* {(isEmpty(products) || loadingProducts) && <Loader transparent />} */}
            {(!isEmpty(products) || !loadingProducts) && 
            <DataTable
                topBar
                searchbar={!!products.length}
                buttonValueTopBar='Nouveau produit'
                columns={columns}
                onDoubleClickOnRow={() => {}}
                onClickTopBar={newProduct}
                data={deepCopy(products) as unknown as RowDataType[]}
                emptyMessage={'Aucun produit trouvé'}
                sort={sort}
                setSort={setSort}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
            />}
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