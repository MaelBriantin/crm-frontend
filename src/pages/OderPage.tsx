import React, {useEffect} from 'react';
import styled from 'styled-components';
import { DataTable } from '../components/DataTable';
import { useModal } from '../contexts';
import { NewOrderActions } from '../components/forms/NewOrderForms/NewOrderActions';
import { NewOrderFormLogic } from '../components/forms/NewOrderForms/NewOrderFormLogic';
import {isEmpty} from "../utils/helpers/spells.ts";
import {useStoreOrders} from "../stores/useStoreOrders.ts";
import {ColumnProps, RowType} from "../types/DataTableTypes.ts";
import {theme} from "../assets/themes";
import {VscEye} from "react-icons/vsc";
import {Loader} from "../components/global";

export const OrderPage: React.FC = () => {

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);

    const { showModal } = useModal();

    const { orders, fetchOrders, loadingOrders } = useStoreOrders();

    const newOrder = () => {
        showModal("Nouvelle commande", <NewOrderFormLogic />, <NewOrderActions />);
    }

    useEffect(() => {
        isEmpty(orders) && fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            text: "Numéro de commande",
            value: "order_number",
            type: "number",
            sortable: true,
            width: "2000px",
        },
        {
            text: "Date de la commande",
            value: "order_date",
            sortable: true,
            width: "15%"
        },
        {
            text: "Nom du client",
            value: "customer_full_name",
            sortable: true,
            width: "20%"
        },
        {
            text: "Secteur du client",
            value: "customer_sector_name",
            sortable: true,
            width: "15%"
        },
        {
            text: "Total HT",
            value: "no_vat_total",
            type: "currency",
            sortable: true,
            width: "10%"
        },
        {
            text: "Total TTC",
            value: "vat_total",
            type: "currency",
            sortable: true,
            width: "10%"
        },
        {
            text: "Statut",
            value: "payment_status_label",
            type: "chips",
            sortable: true,
            width: "10%",
            color: [
                { value: 'Payée', text: 'white', background: theme.colors.success },
                { value: 'Non payée', text: 'white', background: theme.colors.error },
                { value: 'En attente', text: 'white', background: theme.colors.warning }
            ],
        },
        {
            text: "",
            value: "",
            type: "rowActions",
            width: "5%",
            actions: [
                { icon: <VscEye />, onClick: (row: RowType) => {console.log(row)}, color: theme.colors.primary }
            ]
        }
    ];

    return (
        <Container>
            {(isEmpty(orders) && loadingOrders)
                && <Loader transparent/>}
            {(!isEmpty(orders) || !loadingOrders)
                && <DataTable
                topBar
                searchbar
                buttonValueTopBar="Nouvelle commande"
                columns={columns as ColumnProps[]}
                onClickTopBar={newOrder}
                data={orders}
                emptyMessage={"Aucune commande enregistrée..."}
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
