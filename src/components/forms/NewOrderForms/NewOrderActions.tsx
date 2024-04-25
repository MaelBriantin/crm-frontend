import React from "react";
import styled from "styled-components";
import { DiscreteButton, Button } from "../../global";
import { theme } from "../../../assets/themes";
import { useNewOrderActions } from "../../../contexts";

type NewOrderActionsProps = {
  //
};

export const NewOrderActions: React.FC<NewOrderActionsProps> = () => {
  const { step, setStep, nextMessage, previousMessage } = useNewOrderActions();

  return (
    <Container $step={step}>
      <DiscreteButton
        value={previousMessage}
        onClick={() => setStep(step - 1)}
        color={theme.colors.primary}
      />

      <Button
        value={nextMessage}
        onClick={() => setStep(step + 1)}
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
