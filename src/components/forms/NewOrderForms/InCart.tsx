import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {theme} from "../../../assets/themes";
import {Input} from "../../global";
import {OrderedProduct, useStoreOrders} from "../../../stores/useStoreOrders.ts";
import {useStoreProducts} from "../../../stores/useStoreProducts.ts";
import {ProductType} from "../../../types/ProductTypes.ts";

type InCartProps = {
    productCart: OrderedProduct;
};

export const InCart: React.FC<InCartProps> = ({productCart}) => {

    const [stock, setStock] = useState(0);
    const [conditioning, setConditioning] = useState('');
    const [product, setProduct] = useState({} as OrderedProduct);

    useEffect(() => {
        setProduct(productCart);
    }, [productCart]);

    const {products} = useStoreProducts();
    const {updateCartQuantity, removeFromCart, cart} = useStoreOrders();


    useEffect(() => {   
        console.log(cart);
    }, [cart]);

    useEffect(() => {
        if (product.product_id && product.product_type !== 'clothes') {
            const storeProduct = products.find((p) => Number(p.id) === product.product_id) as ProductType;
            setStock(storeProduct.stock);
            setConditioning(`${storeProduct.measurement_quantity} ${storeProduct.measurement_unit}`);
        }
    }, [product.product_id, product.product_type, products]);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity === 0) {
            handleRemoveFromCart();
            return;
        }
        const size_id = product.size ? Number(product.size.id) : null;
        const product_id = product.product_id;
        updateCartQuantity(product_id, size_id, newQuantity);
    }

    const handleRemoveFromCart = () => {
        const size_id = product.size ? product.size.id : null;
        removeFromCart(product.product_id, Number(size_id));
    }

    return (
        <InCartContainer>
            <WeightOrSize>
                <Label>
                    {product.product_type === 'clothes' ? 'Taille' : 'Poids'}
                </Label>
                <Size>
                    {product.size ? `${product.size.size}` : conditioning}
                </Size>
            </WeightOrSize>
            <EditQuantity>
                <Input
                    variant={'small'}
                    type='number'
                    showMaxNumber
                    maxNumber={product.product_type === 'clothes' && product.size
                        ? product.size.stock
                        : stock
                    }
                    maxMessage={'En stock :'}
                    noNegativeNumber
                    showNumberButtons
                    placeholder={''}
                    width={'100px'}
                    value={product.ordered_quantity}
                    onChange={
                        (e: { target: { value: React.SetStateAction<string> } }) => {
                            handleQuantityChange(Number(e.target.value));
                        }
                    }
                />
                <RemoveFromCartButton onClick={handleRemoveFromCart}>
                    Supprimer
                </RemoveFromCartButton>
            </EditQuantity>
        </InCartContainer>
    );
}

const InCartContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
    height: 100%;
`;

const WeightOrSize = styled.div`
    width: 50%;
    height: 100%;
    grid-column: 1;
    font-size: ${theme.fonts.size.P0};
    color: ${theme.colors.greyDark};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
`;

const Label = styled.div`
    font-size: ${theme.fonts.size.XS} !important;
    color: ${theme.colors.greyMedium};
`;

const Size = styled.div`
    max-width: 100%;
    line-height: 1.1;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
`;

const RemoveFromCartButton = styled.div`
    color: ${theme.colors.error};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: ${theme.fonts.size.XS};
    transition: width 0.25s;
    opacity: 0.75;
    &:hover {
        text-decoration: underline;
        opacity: 1;
    }
`;

const EditQuantity = styled.div`
    grid-column: 2;
    font-size: ${theme.fonts.size.P0};
    color: ${theme.colors.greyDark};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`;
