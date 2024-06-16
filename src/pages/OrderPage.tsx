import React, {useEffect} from 'react';
import styled from 'styled-components';
import { DataTable } from '../components/DataTable';
import { useModal } from '../contexts';
import { NewOrderActions } from '../components/forms/NewOrderForms/NewOrderActions';
import { NewOrderFormLogic } from '../components/forms/NewOrderForms/NewOrderFormLogic';
import {isEmpty} from "../utils/helpers/spells.ts";
import {useStoreOrders} from "../stores/useStoreOrders.ts";
import {ColumnProps, RowDataType, RowType} from "../types/DataTableTypes.ts";
import {theme} from "../assets/themes";
import {VscEye} from "react-icons/vsc";
import {Loader} from "../components/global";
import {OrderDetails} from "../components/forms/OrderDetails.tsx";
import {OrderType} from "../types/OrderTypes.ts";
import {OrderDetailsActions} from "../components/forms/OrderDetailsActions.tsx";
import {useStoreOrderDetails} from "../stores/useStoreOrderDetails.ts";
import {useKeyboardShortcut} from "../hooks/system/useKeyboardShortcut.tsx";

export const OrderPage: React.FC = () => {

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);

    const { showModal, closeModal } = useModal();

    const { orders, fetchOrders, loadingOrders } = useStoreOrders();
    const { setOrderDetails, loadingOrderDetails } = useStoreOrderDetails();

    const newOrder = () => {
        showModal("Nouvelle commande", <NewOrderFormLogic />, <NewOrderActions />);
    }

    useKeyboardShortcut(
        {
            'Escape': () => {
                if (loadingOrders || loadingOrderDetails) {
                    return;
                }
                closeModal();
            }
        }
    );

    const orderDetails = (row: RowType) => {
        const findOrder = orders.find(order => order.id === row.id) as OrderType;
        setOrderDetails(findOrder.id);
        showModal(
            `Détails de la commande ${findOrder?.order_number}`,
            <OrderDetails isPaid={findOrder?.is_paid} />,
            findOrder?.is_paid ? null : <OrderDetailsActions />
        );
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
            text: "Secteur",
            value: "sector.name",
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
                { value: 'Payé', text: 'white', background: theme.colors.success },
                { value: 'Impayé', text: 'white', background: theme.colors.error },
                { value: 'Différé', text: 'white', background: theme.colors.warning }
            ],
        },
        {
            text: "",
            value: "",
            type: "rowActions",
            width: "5%",
            actions: [
                { icon: <VscEye />, onClick: (row: RowType) => orderDetails(row), color: theme.colors.primary }
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
                onDoubleClickOnRow={orderDetails}
                data={orders as unknown as RowDataType[]}
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
