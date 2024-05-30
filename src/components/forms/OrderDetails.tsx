import React, {useEffect} from "react";
import {OrderDetailsType, OrderedProductType, OrderType} from "../../types/OrderTypes.ts";
import styled from "styled-components";
import {firstOf} from "../../utils/helpers/spells.ts";
import {fetchOrderDetails} from "../../services/api/orders/fetchOrderDetails.ts";
import {Loader} from "../global";
import {DetailGroup} from "./DetailGroup.tsx";
import {ProductDetailTable} from "./ProductDetailTable.tsx";

type OrderDetailsProps = {
    order: OrderType;
}
export const OrderDetails: React.FC<OrderDetailsProps> = ({order}) => {

    const [orderDetails, setOrderDetails] = React.useState<OrderDetailsType | null>(null);

    useEffect(() => {
        fetchOrderDetails(order.id).then((orderDetails) => {
            setOrderDetails(firstOf(orderDetails));
        });
    }, [order.id]);

    useEffect(() => {
        console.log(orderDetails);
    }, [orderDetails]);

    const customerDetailsMap = [
        {label: "Nom", value: orderDetails?.customer.full_name},
        {label: "", value: ""},
        {label: "Adresse", value: orderDetails?.customer_address},
        {label: "Code postal - Ville", value: orderDetails?.customer_city},
        {label: "", value: ""},
        {label: "Téléphone", value: orderDetails?.customer.phone || "Non renseigné"},
        {label: "Email", value: orderDetails?.customer.email || "Non renseigné"},
        {label: "", value: ""},
        {label: "Secteur", value: orderDetails?.sector.name},
    ];

    const orderDetailsMap = [
        {label: "Numéro de commande", value: orderDetails?.order_number},
        {label: "Date de commande", value: orderDetails?.order_date},
        {label: "", value: ""},
        {label: "Moyen de paiement", value: orderDetails?.payment_method_label},
        {label: "Statut du paiement", value: orderDetails?.payment_status_label},
    ];

    (orderDetails && !orderDetails.is_paid)
        && orderDetailsMap.push({label: "Date de paiement différé", value: orderDetails?.deferred_date});


    return (
        <DetailsContainer $loading={!orderDetails}>
            {
                !orderDetails &&
                    <Loader transparent />
            }
            {
                orderDetails &&
                <>
                    <InfoContainer>
                        <DetailGroup
                            label={'Informations Commande'}
                            arrayValues={orderDetailsMap}
                        />
                        <DetailGroup
                            label={'Informations Client'}
                            arrayValues={customerDetailsMap}
                        />
                    </InfoContainer>
                    <ProductDetailTable
                        orderedProductsList={orderDetails.ordered_products as OrderedProductType[]}
                    />
                </>
            }
        </DetailsContainer>
    );
}

const DetailsContainer = styled.div<{ $loading: boolean }>`
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    height: ${({$loading}) => $loading ? '100px' : 'auto'};
    width: ${({$loading}) => $loading ? '100px' : 'auto'};
    //min-height: 100px;
    //width: 50vw;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    //padding: 20px;
    //width: 100%;
`;