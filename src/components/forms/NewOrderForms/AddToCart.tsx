import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { theme } from "../../../assets/themes";
import { Button, Dropdown } from "../../global";
import { ProductType } from "../../../types/ProductTypes";

type AddToCartProps = {
  product: ProductType;
  productType: string;
  weightOrSize: string;
  stock: number;
};

export const AddToCart: React.FC<AddToCartProps> = ({
  productType,
  product,
  weightOrSize,
  stock,
}) => {
  const weightOrSizeLabel = productType === "clothes" ? "Taille" : "Poids";

  const [quantityOptions, setQuantityOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    setQuantityOptions(
      Array.from({ length: stock }, (_, i) => ({
        value: (i + 1).toString(),
        label: (i + 1).toString(),
      }))
    );
  }, [stock]);

  const handleAddToCart = () => {
    console.log("Add to cart", product, selectedQuantity);
    setSelectedQuantity(1);
  };

  return (
    <DetailsContainer>
      <WeightAndSize>
        <WeightOrSize>
          <Label>{weightOrSizeLabel}</Label>
          {weightOrSize}
        </WeightOrSize>
        <Stock>
          <Label>Stock</Label>
          {stock !== 0 ? stock : "Épuisé"}
        </Stock>
      </WeightAndSize>
      <AddToCartContainer>
        {stock !== 0 && (
          <Dropdown
            disabled={stock === 0}
            width="60px"
            variant="small"
            options={quantityOptions}
            value={quantityOptions.find(
              (option: { label: string }) =>
                option.label === selectedQuantity.toString()
            )}
            onChange={(option) => setSelectedQuantity(Number(option.value))}
          />
        )}
        <CartInfo>
          <Button
            disabled={stock === 0}
            widthProp="180px"
            variant="small"
            value={
              selectedQuantity > 1
                ? `Ajouter ${selectedQuantity} au panier`
                : "Ajouter au panier"
            }
            onClick={handleAddToCart}
          />
          {/* <div className="inCart">{selected ? "Dans le panier" : ""}</div> */}
        </CartInfo>
      </AddToCartContainer>
    </DetailsContainer>
  );
};

const slideIn = keyframes`
    0% {
        z-index: -4;
        display: none;
        transform: translateY(-100%);
        opacity: 0;
    }
    75% {
        display: block;
        opacity: 1;
    }
    100% {
        z-index: 4;
        transform: translateY(0);
    }
`;

const AddToCartContainer = styled.div`
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  position: relative;
`;

const WeightAndSize = styled.div`
  grid-column: 1;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 20px;
  div {
    font-size: ${theme.fonts.size.P1};
  }
`;

const WeightOrSize = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  grid-column: 1;
  flex-direction: column;
  color: ${theme.colors.greyDark};
  font-size: ${theme.fonts.size.P0}!important;
`;

const Stock = styled.div`
  grid-column: 2;
  color: ${theme.colors.greyDark};
  font-size: ${theme.fonts.size.P0}!important;
`;

const Label = styled.div`
  font-size: ${theme.fonts.size.XS}!important;
  color: ${theme.colors.greyMedium};
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  align-items: center;
  justify-content: flex-end;
  grid-column: 3;
  gap: 20px;
`;

const CartInfo = styled.div<{ $inCart?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  .inCart {
    position: absolute;
    top: 30px;
    left: 0;
    transform: translate(-50%, -50%);
    font-size: ${theme.fonts.size.XS};
    color: ${theme.colors.primary};
    width: 100%;
    text-align: center;
    animation: ${({ $inCart }) =>
      $inCart
        ? css`
            ${slideIn} 0.25s ease-out forwards
          `
        : "none"};
  }
`;
