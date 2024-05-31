import {Dropdown, Input, Note, Switch} from "../../global";
import {useStoreOrders} from "../../../stores/useStoreOrders.ts";
import React, {useEffect, useState} from "react";
import {isEmpty} from "../../../utils/helpers/spells.ts";
import styled from "styled-components";
import {useNewOrderActions} from "../../../contexts";
import {theme} from "../../../assets/themes";
import {BsCalendarDate, BsQuestionDiamond} from "react-icons/bs";

export const OrderValidationForm: React.FC = () => {
    const {cart, paymentMethods, fetchOrderOptions, loadingOrderOptions} = useStoreOrders();

    const [paymentMethodOptions, setPaymentMethodOptions] = useState([] as { label: string, value: string }[]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({label: "", value: ""});
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
            payment_method: selectedPaymentMethod?.value || paymentMethods[0]?.value,
            comment: '',
            deferred_payment: deferredPayment,
            deferred_date: deferredPayment ? `${defferedDate.year}-${defferedDate.month}-${defferedDate.day}` : undefined,
        });
    }, [deferredPayment, defferedDate, paymentMethods, selectedPaymentMethod, setOrderValidationForm]);

    return (
        <ValidationForm>
            {/*<Textarea*/}
            {/*    label="Commentaires"*/}
            {/*    placeholder="Commentaires"*/}
            {/*    width="340px"*/}
            {/*    maxWidth="340px"*/}
            {/*    height="100px"*/}
            {/*    maxHeight="200px"*/}
            {/*    noResize*/}
            {/*    value={comment}*/}
            {/*    onChange={(e) => setComment(e.target.value)}*/}
            {/*/>*/}
            <Dropdown
                // maxHeight="120px"
                loading={loadingOrderOptions}
                label="Moyen de paiement"
                options={paymentMethodOptions}
                width="315px"
                onChange={(value) => setSelectedPaymentMethod(value as { label: string, value: string })}
                value={selectedPaymentMethod}
            />
            <DeferredPayment>
                <Note
                    width="320px"
                    message="Paiement différé ?"
                    iconColor={theme.colors.green}
                    icon={<BsQuestionDiamond />}
                        children={
                    <SwitchContainer>
                        <Switch
                            label={deferredPayment ? "Oui" : "Non"}
                            checked={deferredPayment}
                            onChange={(e) => setDeferredPayment(e.target.checked)}
                        />
                    </SwitchContainer>
                }
            />
                {deferredPayment &&
                    <DeferredPaymentDate $animation={deferredPayment}>
                        <Note
                            width="320px"
                            message=""
                            iconColor={theme.colors.green}
                            icon={<BsCalendarDate />}
                            children={
                                <DateGroup>
                                    <Input
                                        variant={'small'}
                                        placeholder={'Jour'}
                                        maxNumber={31}
                                        type={'number'}
                                        width='55px' value={defferedDate.day}
                                        onChange={(e) => setDeferredDate({...defferedDate, day: e.target.value})}
                                    />
                                    <div>/</div>
                                    <Input
                                        variant={'small'}
                                        placeholder={'Mois'}
                                        maxNumber={12}
                                        type={'number'}
                                        width='55px' value={defferedDate.month}
                                        onChange={(e) => setDeferredDate({...defferedDate, month: e.target.value})}
                                    />
                                    <div>/</div>
                                    <Dropdown
                                        variant={'small'}
                                        maxHeight="100px"
                                        options={yearOptions}
                                        value={yearOptions.find((year) => year.value === defferedDate.year) || yearOptions[0]}
                                        width="60px"
                                        onChange={(value) => setDeferredDate({...defferedDate, year: String(value.value)})}
                                    />
                                </DateGroup>
                            }
                        />
                    </DeferredPaymentDate>
                }
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
    gap: 10px;
    padding: 0;
`;

const DeferredPaymentDate = styled.div<{ $animation: boolean }>`
    opacity: ${({$animation}) => $animation ? 1 : 0};
    transition: opacity 0.5s;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    display: flex;
    gap: 30px;
`;

const DateGroup = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 5px;
`;

const SwitchContainer = styled.div`
    justify-content: flex-end;
    align-items: center;
    display: flex;
    width: 175px;
`;