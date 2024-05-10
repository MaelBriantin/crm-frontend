import React from "react";
import styled from "styled-components";
import { DiscreteButton, Button } from "../../global";
import { theme } from "../../../assets/themes";
import { useNewOrderActions } from "../../../contexts";

type NewOrderActionsProps = {
  //
};

export const NewOrderActions: React.FC<NewOrderActionsProps> = () => {
  const { step, setStep, nextMessage, previousMessage, disableNext, disablePrevious, maxStep, finalStepMethod } = useNewOrderActions();

  const handleNext = () => {
    if (step < maxStep) {
      setStep(step + 1);
    }
  }

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
        onClick={step === maxStep ? finalStepMethod : handleNext}
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
