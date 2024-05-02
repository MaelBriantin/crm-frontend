import React, { useEffect } from "react";
import {useModal, useNewOrderActions} from "../../../contexts";
import { ProductCard } from "./ProductCard";
import { useStoreProducts } from "../../../stores/useStoreProducts";
import { isEmpty } from "../../../utils/helpers/spells";
import { Loader, Input } from "../../global";
import styled from "styled-components";
import { theme } from "../../../assets/themes";
import {useStoreOrders} from "../../../stores/useStoreOrders.ts";

export const ProductList: React.FC = () => {
  const { setSubTitle } = useModal();
  const { setDisableNext } = useNewOrderActions();
  const { products, fetchProducts } = useStoreProducts();
  const [search, setSearch] = React.useState<string>("");
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const { cart } = useStoreOrders();

  const disableNext = isEmpty(cart);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.reference.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  useEffect(() => {
    isEmpty(products) && fetchProducts();
  }, [products, fetchProducts]);

  useEffect(() => {
    setSubTitle("Sélection des produits");
    setDisableNext(disableNext);
  }, [disableNext, setSubTitle]);

  return (
    <Container>
      <Input
        width="400px"
        label="Recherche par nom ou référence"
        placeholder="Rechercher un produit par nom ou référence"
        clearable
        type="text"
        value={search}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setSearch(e.target.value)
        }
      />
      <ProductListContainer>
        {isEmpty(products) && <Loader transparent />}
        {!isEmpty(products) &&
          filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              isLastIndex={index === filteredProducts.length - 1}
              productLength={filteredProducts.length}
            />
          ))}
      </ProductListContainer>
    </Container>
  );
};

const ProductListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  border: 1px solid ${theme.colors.greyLight};
  border-radius: ${theme.materialDesign.borderRadius.rounded};
  overflow: auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
`;
