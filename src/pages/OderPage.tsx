import React from 'react';
import styled from 'styled-components';
import { DataTable } from '../components/DataTable';
import { useModal } from '../contexts';

export const OrderPage: React.FC = () => {

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);

    const { showModal } = useModal();

    const newOrder = () => {
        showModal("Nouvelle commande", <div />);
    }

    const columns = [
        {
            text: "Numéro",
            value: "id",
            sortable: true,
            width: "2000px",
        },
        {
            text: "Date",
            value: "date",
            sortable: true,
        },
        {
            text: "Client",
            value: "customer",
            sortable: true,
        },
        {
            text: "Produits",
            value: "products",
            sortable: true,
        },
        {
            text: "Total",
            value: "total",
            sortable: true,
        },
        {
            text: "Statut",
            value: "status",
            sortable: true,
        },
    ];

    return (
        <Container>
            <DataTable 
               topBar
               searchbar
               buttonValueTopBar="Nouvelle commande"
               columns={columns}
               onClickTopBar={newOrder}
               data={[]}
               emptyMessage={"Aucune commande trouvée"}
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