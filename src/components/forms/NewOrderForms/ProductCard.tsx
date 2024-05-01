import React from "react";
import styled from "styled-components";
import { ProductType } from "../../../types/ProductTypes";
import { theme } from "../../../assets/themes";
import { AddToCart } from "./AddToCart";

type ProductCardProps = {
  product: ProductType;
  isLastIndex: boolean;
  productLength: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLastIndex,
  productLength,
}) => {
  const {
    name,
    selling_price,
    selling_price_with_vat,
    reference,
    brand_name,
    stock,
    measurement_quantity,
    measurement_unit,
    product_type,
  } = product;

  return (
    <Card $isLastIndex={isLastIndex}>
      <InfoContainer>
        <Reference>{reference}</Reference>
        <Name>{name}</Name>
        <BrandName>{brand_name}</BrandName>
      </InfoContainer>
      <PriceContainer>
        <Price>{selling_price} € HT</Price>
        <VatPrice>{selling_price_with_vat} € TTC</VatPrice>
      </PriceContainer>
      <AddToCart
        bottomLine={isLastIndex && productLength > 4}
        product={product}
        productType={String(product_type)}
        weightOrSize={`${measurement_quantity} ${measurement_unit}`}
        stock={stock}
      />
    </Card>
  );
};

const Card = styled.div<{ $isLastIndex: boolean }>`
  display: grid;
  grid-template-columns: 35% 20% 45%;
  position: relative;
  align-items: center;
  padding: 2rem 1.5rem;
  border-bottom: 1px solid ${theme.colors.greyLight};
  background-color: ${theme.colors.white};
  transition: all 0.25s;
  &:hover {
    background-color: ${theme.colors.greyUltraLight};
  }
`;

// const SizeDivider = styled.div`
//   width: 100%;
//   height: 1px;
//   background-color: ${theme.colors.greyLight};
// `;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;
  grid-column: 1;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-column: 2;
`;

const Reference = styled.div`
  font-size: ${theme.fonts.size.S};
  font-style: italic;
  color: ${theme.colors.greyMedium};
`;

const Name = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  font-size: ${theme.fonts.size.P1};
`;

const BrandName = styled.div`
  font-size: ${theme.fonts.size.S};
  color: ${theme.colors.greyDark};
`;

const VatPrice = styled.div`
  font-size: ${theme.fonts.size.P0};
  color: "inherit";
`;

const Price = styled.div`
  font-size: ${theme.fonts.size.S};
  color: ${theme.colors.greyDark};
`;
