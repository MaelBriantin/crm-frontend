import React from "react";
import styled from "styled-components";
import {ProductType} from "../../../types/ProductTypes";
import {theme} from "../../../assets/themes";
import {AddToCart} from "./AddToCart";
import {InCart} from "./InCart.tsx";
import {OrderedProduct} from "../../../stores/useStoreOrders.ts";

type ProductCardProps = {
    product: ProductType;
    productCart?: OrderedProduct;
    isLastIndex: boolean;
    productLength: number;
    cartContext?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
                                                            product,
                                                            productCart,
                                                            isLastIndex,
                                                            productLength,
                                                            cartContext,
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
        <Card $isLastIndex={isLastIndex} $cardContext={cartContext || false}>
            <InfoContainer>
                <Reference>{reference}</Reference>
                <Name>{name}</Name>
                <BrandName>{brand_name}</BrandName>
            </InfoContainer>
            <PriceContainer>
                <Price>{selling_price} € HT</Price>
                <VatPrice>{selling_price_with_vat} €</VatPrice>
            </PriceContainer>
            {!cartContext &&
                (<AddToCart
                    bottomLine={isLastIndex && productLength > 4}
                    product={product}
                    productType={String(product_type)}
                    weightOrSize={`${measurement_quantity} ${measurement_unit}`}
                    stock={stock}
                />)}
            {cartContext && productCart &&
                <InCart
                    productCart={productCart}
                />
            }
        </Card>
    );
};

const Card = styled.div<{ $isLastIndex: boolean, $cardContext: boolean }>`
    line-height: 1.2;
    display: grid;
    grid-template-columns: 30% 15% 55%;
    position: relative;
    align-items: center;
    padding: ${({$cardContext}) => $cardContext ? "1rem 1rem" : "2rem 1.5rem"};
    border-bottom: 1px solid ${theme.colors.greyLight};
    background-color: ${theme.colors.white};
    transition: all 0.25s;

    &:hover {
        background-color: ${theme.colors.greyUltraLight};
    }
`;

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
