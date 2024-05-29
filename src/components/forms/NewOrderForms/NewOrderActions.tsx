import React from "react";
import styled from "styled-components";
import {DiscreteButton, Button} from "../../global";
import {theme} from "../../../assets/themes";
import {useModal, useNewOrderActions, useToast} from "../../../contexts";
import {useStoreOrders} from "../../../stores/useStoreOrders.ts";
import {createOrder} from "../../../services/api/orders";
import {useStoreProducts} from "../../../stores/useStoreProducts.ts";

type NewOrderActionsProps = {
    //
};

export const NewOrderActions: React.FC<NewOrderActionsProps> = () => {
    const {step, setStep, nextMessage, previousMessage, disableNext, disablePrevious, maxStep} = useNewOrderActions();
    const {cart, newOrder, fetchOrders, orderValidationForm} = useStoreOrders();
    const {fetchProducts} = useStoreProducts();

    const {callToast} = useToast();
    const {closeModal} = useModal();

    const refreshData = async () => {
        fetchOrders();
        fetchProducts();
    }

    const saveOrder = () => {
        const order = {
            customer_id: newOrder.customer_id,
            payment_method: orderValidationForm.payment_method,
            products: cart,
        };
        orderValidationForm.deferred_payment && Object.assign(order, {deferred_date: orderValidationForm.deferred_date});
        orderValidationForm.comment && Object.assign(order, {comment: orderValidationForm.comment});
        createOrder(order, callToast, refreshData, closeModal);
    }

    const handleNext = () => {
        if (step === maxStep) {
            saveOrder();
        } else if (step < maxStep) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    return (
        <Container $step={step}>
            <DiscreteButton
                disabled={disablePrevious}
                value={previousMessage}
                onClick={handlePrevious}
                color={theme.colors.primary}
            />
            <Button
                disabled={disableNext}
                value={nextMessage}
                onClick={handleNext}
            />
        </Container>
    );
};

const Container = styled.div<{ $step: number }>`
    gap: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
