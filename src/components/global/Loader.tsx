import styled, { keyframes } from "styled-components";
import { AiOutlineLoading } from "react-icons/ai";
import { theme } from "../../assets/themes/index.ts";

export const Loader: React.FC<{ blurry?: boolean }> = ({ blurry = false }) => {

  return (
    <LoaderContainer $blurry={blurry}>
      <AiOutlineLoading className={'loader'} />
    </LoaderContainer>
  );

};

const Spinning = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const LoaderContainer = styled.div<{ $blurry?: boolean }>`
  position: absolute;
  top: 0; 
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $blurry }): string | false => $blurry ? `background: rgba(245, 245, 245, 0.445);` : `background: white;`};
  .loader{
    font-size: ${theme.fonts.size.P6};
    color: ${theme.colors.primary};
    animation: infinite ${Spinning} 400ms ease;
  }
`