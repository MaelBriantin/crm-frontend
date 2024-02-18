import styled, { keyframes } from "styled-components";
import { AiOutlineLoading } from "react-icons/ai";
import { theme } from "../../assets/themes/index.ts";

export const Loader: React.FC<{ transparent?: boolean }> = ({ transparent = false }) => {

  return (
    <LoaderContainer $transparent={transparent}>
      <AiOutlineLoading className={'loader'} />
    </LoaderContainer>
  );

};

const Spinning = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const LoaderContainer = styled.div<{ $transparent?: boolean }>`
  position: absolute;
  z-index: 9999;
  top: 0; 
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $transparent }): string | false => $transparent ? `background: rgba(0, 0, 0, 0);` : `background: white;`};
  .loader{
    font-size: ${theme.fonts.size.P6};
    color: ${theme.colors.primary};
    animation: infinite ${Spinning} 400ms ease;
  }
`