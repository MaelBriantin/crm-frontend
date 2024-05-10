import {useStoreOrders} from "../../../stores/useStoreOrders.ts";
import {ProductCard} from "./ProductCard.tsx";
import {ProductType} from "../../../types/ProductTypes.ts";
import {isEmpty} from "../../../utils/helpers/spells.ts";
import {useEffect, useState} from "react";
import {useStoreProducts} from "../../../stores/useStoreProducts.ts";
import {theme} from "../../../assets/themes";
import styled from "styled-components";
import {useModal} from "../../../contexts";
import {cartTotal} from "../../../utils/newOrderUtils.ts";
import {OrderValidationForm} from "./OrderValidationForm.tsx";

export const CartValidation = () => {

    const {setSubTitle} = useModal();
    const {cart} = useStoreOrders();
    const {products} = useStoreProducts();

    const [vatTotal, setVatTotal] = useState(0);
    const [noVatTotal, setNoVatTotal] = useState(0);

    useEffect(() => {
        if (!isEmpty(cart)) {
            setVatTotal(cartTotal(products, cart, true));
            setNoVatTotal(cartTotal(products, cart, false));
        }
        if (isEmpty(cart)) {
            setVatTotal(0);
            setNoVatTotal(0);
        }
    }, [cart, products]);

    useEffect(() => {
        setSubTitle("Validation de la commande");
    }, [setSubTitle]);

    return (
        <CartValidationContainer>
            <CartList>
                {!isEmpty(cart) &&
                    cart.map((product, index) => (
                        <ProductCard
                            key={index}
                            product={products.find((p: ProductType) => Number(p.id) === product.product_id) as ProductType}
                            productCart={product}
                            isLastIndex={index === cart.length - 1}
                            productLength={cart.length}
                            cartContext
                        />
                    ))}
            </CartList>
            <Validation>
                <Total>
                    {vatTotal !== 0 && <TotalTitle>Total de la commande</TotalTitle>}
                    {vatTotal !== 0 && <VatTotal>{vatTotal} € <Label>TTC</Label></VatTotal>}
                    {vatTotal !== 0 && <NoVatTotal>{noVatTotal} € <Label>HT</Label></NoVatTotal>}
                    {vatTotal === 0 && <VatTotal>Votre panier est vide</VatTotal>}
                </Total>
                <OrderValidationForm />
            </Validation>
        </CartValidationContainer>
    );
}

const CartValidationContainer = styled.div`
    justify-content: space-between;
    align-items: flex-start;
    display: flex;
    height: 100%;
    width: 100%;
`;

const CartList = styled.div`
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    border: 2px solid ${theme.colors.greyMedium};
    justify-content: flex-start;
    flex-direction: column;
    overflow: auto;
    display: flex;
    height: 100%;
    width: 80%;
`;

const Validation = styled.div`
    justify-content: space-between;
    height: calc(100% - 20px);
    align-items: flex-start;
    width: calc(38% - 20px);
    max-width: calc(38% - 20px);
    flex-direction: column;
    overflow: auto;
    display: flex;
    padding: 10px; 
    gap: 80px;
`;

const Total = styled.div`
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
    display: flex;
    width: 100%;
    height: 20%;
    gap: 10px;
`;

const TotalTitle = styled.div`
    font-size: ${theme.fonts.size.P2};
    color: ${theme.colors.greyDark};
    justify-content: flex-end;
    text-transform: uppercase;
    align-items: center;
    display: flex;
    width: 100%;
`;

const VatTotal = styled.div`
    font-size: ${theme.fonts.size.P3};
    justify-content: flex-end;
    align-items: center;
    display: flex;
    width: 100%;
    gap: 5px;
`;

const Label = styled.div`
    font-size: ${theme.fonts.size.XS};
    color: ${theme.colors.greyMedium};
`;

const NoVatTotal = styled.div`
    font-size: ${theme.fonts.size.P2};
    color: ${theme.colors.greyMedium};
    justify-content: flex-end;
    align-items: center;
    display: flex;
    width: 100%;
    gap: 5px;
`;