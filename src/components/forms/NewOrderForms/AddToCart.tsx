import React, {useEffect, useState, ChangeEvent} from "react";
import styled, {css, keyframes} from "styled-components";
import {theme} from "../../../assets/themes";
import {Button, Dropdown, Input} from "../../global";
import {ProductType} from "../../../types/ProductTypes";
import {DropdownOptions} from "../../global/Dropdown";
import {useStoreOrders} from "../../../stores/useStoreOrders";

type AddToCartProps = {
    bottomLine?: boolean;
    product: ProductType;
    productType: string;
    weightOrSize: string;
    stock: number;
};

export const AddToCart: React.FC<AddToCartProps> = ({
                                                        bottomLine,
                                                        productType,
                                                        product,
                                                        weightOrSize,
                                                        stock,
                                                    }) => {
    const weightOrSizeLabel = productType === "clothes" ? "Taille" : "Poids";
    const [maxQuantity, setMaxQuantity] = useState(1);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [sizeOptions, setSizeOptions] = useState<DropdownOptions[]>([]);
    const [selectedSize, setSelectedSize] = useState<DropdownOptions | null>(
        null
    );
    const [inCart, setInCart] = useState<number>(0);
    const [sizeInCart, setSizeInCart] = useState<number>(0);
    const [sizeStock, setSizeStock] = useState<number>(0);
    const [maxNumber, setMaxNumber] = useState<number>(0);

    const {cart, addToCart} = useStoreOrders();

    useEffect(() => {
        const max = productType === "clothes" ? maxQuantity - sizeInCart : maxQuantity - inCart;
        setMaxNumber(max > 0 ? max : 0);
        max === 0 && setSelectedQuantity(0);
    }, [inCart, maxQuantity, productType, sizeInCart]);

    useEffect(() => {
        const inCartQuantity = cart.reduce(
            (acc, item) =>
                item.product_id === Number(product.id) &&
                item.product_type === productType
                    ? acc + item.quantity
                    : acc,
            0
        );
        const inCartSizeQuantity = cart.reduce(
            (acc, item) =>
                item.product_id === Number(product.id) &&
                item.product_type === productType &&
                item.size_id === Number(selectedSize?.value)
                    ? acc + item.quantity
                    : acc,
            0
        );
        setInCart(inCartQuantity);
        setSizeInCart(inCartSizeQuantity);
    }, [cart, product.id, productType, selectedSize?.value]);

    useEffect(() => {
        if (productType === "clothes" && product.product_sizes) {
            const newSizes = product.product_sizes
                .filter((size) => size.stock !== 0)
                .map((size) => ({
                    value: String(size.id || 0),
                    label: size.size || "",
                }));

            setSizeOptions(newSizes);
            setSelectedSize(newSizes[0] || null);
        }
    }, [product.product_sizes, productType]);

    useEffect(() => {
        if (selectedSize) {
            const size = product.product_sizes?.find(
                (size) => size.id === Number(selectedSize.value)
            );
            setSizeStock(size?.stock || 0);
            setSelectedQuantity(1);
        }
    }, [selectedSize, product.product_sizes]);

    useEffect(() => {
        const maxQuantity = productType === "clothes" ? sizeStock : stock;
        setMaxQuantity(maxQuantity);
    }, [productType, sizeStock, stock]);

    const handleAddToCart = () => {
        const orderedProduct = {
            product_id: Number(product.id),
            product_type: productType as "clothes" | "default",
            quantity: selectedQuantity,
        };
        productType === "clothes" &&
        selectedSize &&
        Object.assign(orderedProduct, {size_id: Number(selectedSize.value)});
        addToCart(orderedProduct);
        setSelectedQuantity(1);
    };

    const disable = selectedQuantity === 0
        || selectedQuantity > maxNumber
        || stock === 0
        || productType === "clothes" && sizeStock === 0
        || productType === "default" && stock === 0;

    const inCartMessage = () => {
        if (productType === "clothes" && sizeInCart > 0) {
            if (maxNumber === 0) {
                return 'Tous les articles de cette taille sont dans le panier'
            } else {
                return `${sizeInCart} ${
                    sizeInCart > 1 ? "articles" : "article"
                } de cette taille dans le panier`;
            }
        }
        if (productType === "default" && inCart > 0) {
            if (maxNumber === 0) {
                return 'Tous les articles sont dans le panier'
            } else {
                return `${inCart} ${
                    inCart > 1 ? "articles" : "article"
                } dans le panier`;
            }
        }
    }
    return (
        <DetailsContainer>
            <WeightAndSize
                $clothes={productType === "clothes" && sizeOptions.length !== 0}
            >
                <WeightOrSize>
                    <Label>{weightOrSizeLabel}</Label>
                    {productType === "default" && weightOrSize}
                    {productType === "clothes" && sizeOptions.length !== 0 && (
                        <Dropdown
                            openOnTop={bottomLine}
                            disabled={sizeOptions.length === 0}
                            width="80px"
                            variant="small"
                            maxHeight="105px"
                            options={sizeOptions || []}
                            value={sizeOptions[0]}
                            onChange={(option) => setSelectedSize(option as DropdownOptions)}
                        />
                    )}
                    {productType === "clothes" &&
                        sizeOptions.length === 0 &&
                        "Indisponible"}
                </WeightOrSize>
                <Stock $clothes={productType === "clothes" && sizeOptions.length !== 0}>
                    <Label>Stock</Label>
                    <span className="stockCount">
            {stock !== 0
                ? productType === "clothes"
                    ? sizeStock
                    : stock
                : "Épuisé"}
          </span>
                </Stock>
            </WeightAndSize>
            <AddToCartContainer>
                {(stock !== 0 && maxNumber !== 0) && (
                    <Input
                        placeholder={""}
                        width="100px"
                        variant="small"
                        type={"number"}
                        showNumberButtons
                        noNegativeNumber
                        maxNumber={maxNumber}
                        showMaxNumber={maxNumber !== 0}
                        value={selectedQuantity}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSelectedQuantity(Number(e.target.value))
                        }
                    />
                )}
                <CartInfo>
                    <Button
                        disabled={disable}
                        widthProp="180px"
                        variant="small"
                        value={
                            selectedQuantity > 1
                                ? `Ajouter ${selectedQuantity} au panier`
                                : "Ajouter au panier"
                        }
                        onClick={handleAddToCart}
                    />
                    {inCart > 0 && (
                        <span className="inCart">
                        {inCartMessage()}
                        </span>
                    )
                    }
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

const WeightAndSize = styled.div<{ $clothes?: boolean }>`
    grid-column: 1;
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 20px;
    margin-bottom: ${({$clothes}) => ($clothes ? "12px" : "0")};
        /* div {
    font-size: ${theme.fonts.size.P0};
  } */
`;

const WeightOrSize = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
    grid-column: 1;
    color: ${theme.colors.greyDark};
    font-size: ${theme.fonts.size.P0} !important;
`;

const Stock = styled.div<{ $clothes?: boolean }>`
    grid-column: 2;
    color: ${theme.colors.greyDark};
    font-size: ${theme.fonts.size.P0} !important;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: ${({$clothes}) => ($clothes ? "5px" : "0")};
    margin-bottom: ${({$clothes}) => ($clothes ? "5px" : "0")};
`;

const Label = styled.div`
    font-size: ${theme.fonts.size.XS} !important;
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
        top: 31px;
        left: 50%;
        transform: translateX(-50%);
        font-size: ${theme.fonts.size.XS};
        color: ${theme.colors.primary};
        width: 100%;
        text-align: center;
        animation: ${({$inCart}) =>
                $inCart
                        ? css`
                            ${slideIn} 0.25s ease-out forwards
                        `
                        : "none"};
    }
`;
