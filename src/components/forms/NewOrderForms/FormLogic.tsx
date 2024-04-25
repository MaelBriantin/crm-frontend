import React, { useEffect } from "react";
import styled from "styled-components";
import { CustomerList } from "./CustomerList";
import { ProductList } from "./ProductList";
import { useNewOrderActions } from "../../../contexts";

export const FormLogic: React.FC = () => {
  const { step, setStep, setNextMessage, setPreviousMessage } = useNewOrderActions();

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  useEffect(() => {
    if (step === 1) {
      setNextMessage("Aller aux produits");
      setPreviousMessage("");
    } else if (step === 2) {
      setNextMessage("Vérifier le panier");
      setPreviousMessage("Retour aux clients");
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  width: 600px;
`;
