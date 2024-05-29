import {Dropdown, Input, Switch, Textarea} from "../../global";
import {useStoreOrders} from "../../../stores/useStoreOrders.ts";
import React, {useEffect, useState} from "react";
import {isEmpty} from "../../../utils/helpers/spells.ts";
import styled from "styled-components";
import {useNewOrderActions} from "../../../contexts";

export const OrderValidationForm: React.FC = () => {
    const {cart, paymentMethods, fetchOrderOptions, loadingOrderOptions} = useStoreOrders();

    const [paymentMethodOptions, setPaymentMethodOptions] = useState([] as { label: string, value: string }[]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({label: "", value: ""});
    const [comment, setComment] = useState("");
    const [deferredPayment, setDeferredPayment] = useState(false);
    const [yearOptions, setYearOptions] = useState([] as { label: string, value: string }[]);
    const [defferedDate, setDeferredDate] = useState({day: "", month: "", year: ""} as {
        day: string,
        month: string,
        year: string
    });

    const {setDisableNext} = useNewOrderActions();

    const {setOrderValidationForm} = useStoreOrders();
    
    const disableNext = isEmpty(cart) || !selectedPaymentMethod || (deferredPayment && (defferedDate.day === "" || defferedDate.month === "" || defferedDate.year === ""));

    useEffect(() => {
        setDeferredDate({day: "", month: "", year: String(new Date().getFullYear())})
    }, []);

    useEffect(() => {
        setDisableNext(disableNext);
    }, [cart, disableNext, setDisableNext]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 4; i++) {
            years.push({label: (currentYear + i).toString(), value: (currentYear + i).toString()});
        }
        setYearOptions(years);
    }, []);

    useEffect(() => {
        isEmpty(paymentMethods) && fetchOrderOptions();
        setPaymentMethodOptions(paymentMethods);
        setSelectedPaymentMethod(paymentMethods[0]);
    }, [fetchOrderOptions, paymentMethodOptions, paymentMethods]);

    useEffect(() => {
        setOrderValidationForm({
            payment_method: 'check',
            comment: comment,
            deferred_payment: deferredPayment,
            deferred_date: deferredPayment ? `${defferedDate.year}-${defferedDate.month}-${defferedDate.day}` : undefined,
        });
    }, [comment, deferredPayment, defferedDate, selectedPaymentMethod, setOrderValidationForm]);

    return (
        <ValidationForm>
            <Textarea
                label="Commentaires"
                placeholder="Commentaires"
                width="340px"
                maxWidth="340px"
                height="100px"
                maxHeight="200px"
                noResize
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Dropdown
                maxHeight="120px"
                loading={loadingOrderOptions}
                label="Mode de paiement"
                options={paymentMethodOptions}
                width="320px"
                onChange={(value) => setSelectedPaymentMethod(value as { label: string, value: string })}
                value={selectedPaymentMethod}
            />
            <DeferredPayment>
                <Switch
                    label={deferredPayment ? "Date d'échéance du paiement" : "Paiement différé"}
                    checked={deferredPayment}
                    labelPostSwitch
                    onChange={(e) => setDeferredPayment(e.target.checked)}
                />
                {deferredPayment && <DateGroup>
                    <Input
                        placeholder={'Jour'}
                        label={'Jour'}
                        maxNumber={31}
                        type={'number'}
                        width='55px' value={defferedDate.day}
                        onChange={(e) => setDeferredDate({...defferedDate, day: e.target.value})}
                    />
                    <div>/</div>
                    <Input
                        placeholder={'Mois'}
                        label={'Mois'}
                        maxNumber={12}
                        type={'number'}
                        width='55px' value={defferedDate.month}
                        onChange={(e) => setDeferredDate({...defferedDate, month: e.target.value})}
                    />
                    <div>/</div>
                    <Dropdown
                        maxHeight="100px"
                        label="Année"
                        openOnTop
                        options={yearOptions}
                        value={yearOptions.find((year) => year.value === defferedDate.year) || yearOptions[0]}
                        width="60px"
                        onChange={(value) => setDeferredDate({...defferedDate, year: String(value.value)})}
                    />
                </DateGroup>}
            </DeferredPayment>
        </ValidationForm>
    )
}

const ValidationForm = styled.div`
    padding-top: 10px;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;
    display: flex;
    height: 100%;
    width: 100%;
    gap: 30px;
`;

const DeferredPayment = styled.div`
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    user-select: none;
    display: flex;
    height: 100px;
    width: 340px;
    gap: 30px;
    padding: 0;
`;

const DateGroup = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 5px;
`;
