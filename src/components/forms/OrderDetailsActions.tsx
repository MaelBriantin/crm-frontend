import {Button} from "../global";
import styled from "styled-components";
import {useStoreOrderDetails} from "../../stores/useStoreOrderDetails.ts";
import {confirmOrderPayment} from "../../services/api/orders/confirmOrderPayment.ts";
import {OrderDetailsType} from "../../types/OrderTypes.ts";
import {useModal} from "../../contexts";
import {useStoreOrders} from "../../stores/useStoreOrders.ts";
import {useEffect, useState} from "react";

export const OrderDetailsActions = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const { loadingOrderDetails, isOrderPaid, orderDetails  } = useStoreOrderDetails();
    const { fetchOrders } = useStoreOrders();

    const {closeModal, setDisableClose} = useModal();

    useEffect(() => {
        setDisableClose(loading)
    }, [loading, setDisableClose]);

    const confirmOrderPaymentFunction = async () => {
        setLoading(true)
        await confirmOrderPayment(orderDetails?.id as OrderDetailsType['id']);
        await fetchOrders();
        closeModal();
        setLoading(false)
    }

    return (
        <Container>
            { !loadingOrderDetails &&
                <Button
                onClick={confirmOrderPaymentFunction}
                value={"Enregistrer"}
                disabled={!isOrderPaid}
                loading={loading}
                />
            }
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;