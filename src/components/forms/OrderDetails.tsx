import React from "react";
import {OrderedProductType} from "../../types/OrderTypes.ts";
import styled from "styled-components";
import {Loader, Note, Switch} from "../global";
import {DetailGroup} from "./DetailGroup.tsx";
import {ProductDetailTable} from "./ProductDetailTable.tsx";
import {TbCoinEuro} from "react-icons/tb";
import {theme} from "../../assets/themes";
import {useStoreOrderDetails} from "../../stores/useStoreOrderDetails.ts";

type OrderDetailsProps = {
    isPaid?: boolean;
}
export const OrderDetails: React.FC<OrderDetailsProps> = ({ isPaid = true }) => {

    const {orderDetails, isOrderPaid, setIsOrderPaid, loadingOrderDetails} = useStoreOrderDetails();

    const customerDetailsMap = [
        {
            label: "Nom",
            value: orderDetails?.customer_full_name !== orderDetails?.customer?.full_name
                ? `${orderDetails?.customer_full_name} (${orderDetails?.customer?.full_name})`
                : orderDetails?.customer_full_name
        },
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
        {
            label: `Statut du paiement au ${new Date().toLocaleDateString('fr-FR')}`,
            value: orderDetails?.payment_status_label
        },
    ];

    (orderDetails && !orderDetails.is_paid)
        && orderDetailsMap.push({label: "Date de paiement différé", value: orderDetails?.deferred_date});

    (orderDetails && orderDetails.is_paid)
        && orderDetailsMap.push({label: "Date de paiement", value: orderDetails?.paid_at});


    return (
        <DetailsContainer $loading={loadingOrderDetails}>
            {
                loadingOrderDetails &&
                    <Loader transparent />
            }
            {
                !loadingOrderDetails &&
                <GlobalContainer>
                    <Details>
                        <InfoContainer>
                            {
                                (!isPaid && !loadingOrderDetails) &&
                                <Note
                                    message={'Confirmer le paiement de la commande ?'}
                                    width={'400px'}
                                    icon={<TbCoinEuro/>}
                                    iconColor={theme.colors.green}
                                    children={
                                        <SwitchContainer>
                                            <Switch
                                                label={isOrderPaid ? 'Oui' : 'Non'}
                                                checked={isOrderPaid}
                                                onChange={() => setIsOrderPaid(!isOrderPaid)}
                                            />
                                        </SwitchContainer>
                                    }
                                />
                            }
                            <DetailGroup
                                label={'Informations Commande'}
                                arrayValues={orderDetailsMap}
                                width={'400px'}
                            />
                            {!customerContext && 
                              <DetailGroup
                                label={'Informations Client'}
                                arrayValues={customerDetailsMap}
                                width={'400px'}
                            />}
                        </InfoContainer>
                        <ProductContainer>
                            <ProductDetailTable
                                orderedProductsList={orderDetails?.ordered_products as OrderedProductType[]}
                            />
                            <DetailGroup
                                label={'Total de la commande'}
                                arrayValues={[
                                    {label: "Total HT", value: `${orderDetails?.no_vat_total} €`},
                                    {label: "Total TTC", value:  `${orderDetails?.vat_total} €`},
                                ]}
                                width={'250px'}
                            />
                        </ProductContainer>
                    </Details>
                </GlobalContainer>
            }
        </DetailsContainer>
    );
}

const DetailsContainer = styled.div<{ $loading: boolean }>`
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    //transition: all 0.3s ease-in-out;
    height: ${({$loading}) => $loading ? '100px' : '100%'};
    width: ${({$loading}) => $loading ? '100px' : 'auto'};
    //min-height: 100px;
    //width: 50vw;
`;

const GlobalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    padding: 20px;
    width: 100%;
`;

const SwitchContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    width: 120px;
`;

const Details = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 20px
`;

const ProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
    gap: 20px;
`;
