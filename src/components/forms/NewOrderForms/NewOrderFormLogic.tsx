import React, { useEffect } from "react";
import styled from "styled-components";
import { CustomerList } from "./CustomerList";
import { ProductList } from "./ProductList";
import { useNewOrderActions } from "../../../contexts";
import { useStoreOrders } from "../../../stores/useStoreOrders";

export const NewOrderFormLogic: React.FC = () => {
  const { step, setStep, setNextMessage, setPreviousMessage } =
    useNewOrderActions();

  const { resetNewOrder } = useStoreOrders();

  useEffect(() => {
    resetNewOrder();
    setStep(1);
  }, [resetNewOrder, setStep]);

  useEffect(() => {
    if (step === 1) {
      setNextMessage("Valider");
      setPreviousMessage("");
    } else if (step === 2) {
      setNextMessage("Voir le panier");
      setPreviousMessage("Retour à la sélection du client");
    }
  }, [setNextMessage, setPreviousMessage, step]);

  return (
    <Container>
      {step === 1 && <CustomerList />}
      {step === 2 && <ProductList />}
    </Container>
  );
};

const Container = styled.div`
  height: 60vh;
  width: 1000px;
`;
