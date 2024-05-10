import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CustomerList } from "./CustomerList";
import { ProductList } from "./ProductList";
import { useNewOrderActions } from "../../../contexts";
import { useStoreOrders } from "../../../stores/useStoreOrders";
import { CartValidation } from "./CartValidation.tsx";
import { Loader } from "../../global";

export const NewOrderFormLogic: React.FC = () => {
  const {
    step,
    setStep,
    setNextMessage,
    setPreviousMessage,
    setMaxStep,
    maxStep,
  } = useNewOrderActions();


  const { resetNewOrder, resetCart } = useStoreOrders();

  const [loadingStep, setLoadingStep] = useState(false);

  useEffect(() => {
    resetNewOrder();
    resetCart();
    setStep(1);
    setMaxStep(3);
  }, [resetCart, resetNewOrder, setMaxStep, setStep]);


  useEffect(() => {
    setLoadingStep(true);
    setTimeout(() => {
      setLoadingStep(false);
    }, 250);
  }, [step]);

  useEffect(() => {
    if (step === 1) {
      setNextMessage("Valider");
      setPreviousMessage("");
    } else if (step === 2) {
      setNextMessage("Voir le panier");
      setPreviousMessage("Retour à la sélection du client");
    } else if (step === 3) {
      setNextMessage("Valider la commande");
      setPreviousMessage("Retour à la sélection des produits");
    } else if (step === maxStep) {
      setNextMessage("");
      setPreviousMessage("Retour à la validation du panier");
    }
  }, [maxStep, setNextMessage, setPreviousMessage, step]);

  return (
    <Container>
      {loadingStep && <Loader transparent />}
      {step === 1 && <CustomerList />}
      {step === 2 && <ProductList />}
      {step === 3 && <CartValidation />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 60vh;
  width: 1200px;
`;
