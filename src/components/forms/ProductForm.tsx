import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Dropdown, Input, Textarea, Text, Loader } from "../global";
import { ProductType, emptyProduct } from "../../types/ProductTypes.ts";
import { useStoreProducts } from "../../stores/useStoreProducts";
import { deepCompare, isEmpty } from "../../utils/helpers/spells";
import {
  roundPrice,
  validateProductForm,
} from "../../utils/productUtils";
import { useFormActions, useModal, useToast } from "../../contexts";
import { useStoreBrands } from "../../stores/useStoreBrands";
import { useKeyboardShortcut } from "../../hooks/system/useKeyboardShortcut";
import { theme } from "../../assets/themes";
import { ProductSizeForm } from "./ProductSizeForm.tsx";
import {
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../services/api/products";

type ProductFormProps = {
  product?: ProductType;
};

export const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const [productForm, setProductForm] = useState(
    product || (emptyProduct as ProductType)
  );
  const [vatPrice, setVatPrice] = useState("");
  const [totalProductSizeStock, setTotalProductSizeStock] = useState(0);
  const [saving, setSaving] = useState(false);

  const {
    productOptions,
    fetchProductOptions,
    loadingProducts,
    productTypes,
    vatRates,
    measurementUnits,
    loadingOptions,
    fetchProducts,
  } = useStoreProducts();
  const { brandsOptions, fetchBrands, loadingBrands } = useStoreBrands();

  const { closeModal } = useModal();
  const { callToast } = useToast();
  const {
    setData,
    setIsDisableSave,
    setOnSave,
    setDeleteMessage,
    setIsLoading,
    setOnDelete,
    setIsDisableDelete,
  } = useFormActions();

  const firstInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut({
    Escape: () => {
      closeModal();
    },
  });

  useEffect(() => {
    const editing = product ? deepCompare(productForm, product as ProductType) : false;
    setIsDisableSave(
      !validateProductForm(productForm) ||
        saving ||
        loadingOptions ||
        loadingBrands ||
        editing
      );
  }, [
    loadingBrands,
    loadingOptions,
    product,
    productForm,
    saving,
    setIsDisableSave,
  ]);

  useEffect(() => {
    if (productForm.product_type === "default") {
      setProductForm((prevProductForm) => ({
        ...prevProductForm,
        product_sizes: [],
      }));
    }
    if (productForm.product_type === "clothes") {
      setProductForm((prevProductForm) => ({
        ...prevProductForm,
        stock: 0,
        measurement_quantity: 0,
        measurement_unit: null,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForm.product_type]);

  useEffect(() => {
    if (productForm.product_type === "clothes") {
      setProductForm((prevProductForm) => ({
        ...prevProductForm,
        stock: totalProductSizeStock,
      }));
    }
  }, [totalProductSizeStock, productForm.product_type]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await createProduct(productForm, callToast, fetchProducts, closeModal);
    setSaving(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProduct(productForm, callToast, fetchProducts, closeModal);
    setSaving(false);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (product) {
      handleUpdate(e);
    } else {
      handleSave(e);
    }
    setSaving(false);
  };

  useEffect(() => {
    if (firstInputRef.current && !loadingOptions && !loadingBrands) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 250);
    }
  }, [loadingBrands, loadingOptions]);

  useEffect(() => {
    isEmpty(productOptions) && fetchProductOptions();
    isEmpty(brandsOptions) && fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set default values for the product form
  useEffect(() => {
    if (!product) {
      const defaultProductType = productTypes.find((e) => e.value === "default")
        ?.value as string;
      setProductForm((prevProductForm) => ({
        ...prevProductForm,
        product_type: defaultProductType,
        vat_rate: vatRates.find((e) => e.value === "20")?.value as string,
      }));
      if (productForm.product_type === "clothes") {
        setProductForm((prevProductForm) => ({
          ...prevProductForm,
          stock: totalProductSizeStock,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, productTypes]);

  // handle the vat price
  useEffect(() => {
    if (product?.selling_price == 0 || product?.selling_price === undefined) {
      setVatPrice("0.00");
      setProductForm((prevProductForm) => ({
        ...prevProductForm,
        selling_price_with_vat: 0,
      }));
    }
    if (productForm.selling_price && productForm.vat_rate) {
      const multiplication =
        Number(productForm.selling_price) *
        (Number(productForm.vat_rate) / 100);
      const priceWithVat = roundPrice(
        productForm.selling_price + multiplication
      );
      setVatPrice(String(priceWithVat));
      setProductForm((prevProductForm) => ({
        ...prevProductForm,
        selling_price_with_vat: priceWithVat,
      }));
    }
  }, [product?.selling_price, productForm.selling_price, productForm.vat_rate]);

  const productSizeTotal = React.useCallback(() => {
    let total = 0;
    if (productForm.product_sizes) {
      productForm.product_sizes.forEach((s) => {
        const stock = s.stock || 0;
        total += stock;
      });
    }
    setTotalProductSizeStock(total);
    return total;
  }, [productForm.product_sizes, setTotalProductSizeStock]);

  const handleDelete = async () => {
    if (product && !saving) {
      setSaving(true);
      await deleteProduct(product, callToast, fetchProducts, closeModal);
      setSaving(false);
    }
  };

  React.useEffect(() => {
    productSizeTotal();
    setData(!!product);
    setIsDisableDelete(!product || saving || loadingOptions || loadingBrands);
    setDeleteMessage(`Êtes-vous sûr de vouloir supprimer le produit ${product?.name} ?
    Cette action est définitive et entrainera la perte de toutes les données associées.`);
    setOnSave(() => onSave);
    setOnDelete(() => handleDelete);
    setIsLoading(saving || loadingProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    product,
    validateProductForm,
    productForm,
    productSizeTotal,
    setIsDisableSave,
    setOnSave,
    setData,
    saving,
    loadingOptions,
    loadingBrands,
    loadingProducts,
  ]);

  return (
    <Container>
      {loadingOptions && <Loader transparent />}
      <LeftContainer>
        <NameContainer>
          <Input
            ref={firstInputRef}
            name="name"
            label="Nom du produit"
            type="text"
            placeholder="Nom du produit"
            width="396px"
            value={productForm.name || ""}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
          />
        </NameContainer>
        <BrandContainer>
          <Input
            name="reference"
            label="Reference"
            type="text"
            placeholder="Reference"
            width="100px"
            value={productForm.reference || ""}
            onChange={(e) =>
              setProductForm({ ...productForm, reference: e.target.value })
            }
          />
          <Dropdown
            loading={loadingOptions}
            openOnBottom
            placeholder="Marque"
            label="Marque"
            options={brandsOptions || []}
            value={
              brandsOptions.find(
                (e) => Number(e.value) === productForm.brand_id
              ) || undefined
            }
            onChange={(e) =>
              setProductForm({
                ...productForm,
                brand_id: Number(e.value),
              })
            }
            width="300px"
          />
        </BrandContainer>
        <PriceContainer>
          <Input
            name="price"
            label="Prix HT"
            symbol="€"
            type="number"
            noNegativeNumber
            placeholder="Prix HT"
            maxLength={10}
            width="115px"
            value={productForm.selling_price || ""}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                selling_price: Number(e.target.value),
              })
            }
          />
          <Dropdown
            openOnBottom
            loading={loadingBrands}
            placeholder="TVA"
            openOnTop
            width="60px"
            label="TVA"
            options={vatRates || []}
            value={
              vatRates.find(
                (e) => String(e.value) === String(productForm.vat_rate)
              ) || undefined
            }
            onChange={(e) =>
              setProductForm({ ...productForm, vat_rate: e.value })
            }
          />
          <Text
            text={String(vatPrice)}
            symbol="€"
            width="60px"
            label="Prix TTC"
          />
        </PriceContainer>
        <Textarea
          name="description"
          label="Description"
          placeholder="Description"
          width="396px"
          height="100px"
          maxHeight="200px"
          maxWidth="90%"
          value={productForm.description || ""}
          onChange={(e) =>
            setProductForm({ ...productForm, description: e.target.value })
          }
        />
      </LeftContainer>
      <Divider />
      <RightContainer>
        {!product && (
          <Dropdown
            loading={loadingOptions}
            openOnBottom
            placeholder="Type de produit"
            label="Type de produit"
            options={productTypes || []}
            value={
              productTypes.find((e) => e.value === productForm.product_type) ||
              undefined
            }
            onChange={(e) =>
              setProductForm({
                ...productForm,
                product_type: String(e.value),
              })
            }
            maxHeight="200px"
            width="200px"
          />
        )}
        {product && (
          <Text
            label="Type de produit"
            text={
              String(
                productTypes.find((e) => e.value === productForm.product_type)
                  ?.label
              ) || ""
            }
            maxWidth="200px"
          />
        )}
        {productForm.product_type && productForm.product_type === "default" && (
          <MeasurementContainer>
            <Input
              name="measurement_quantity"
              label="Quantité"
              type="number"
              maxLength={10}
              placeholder="Quantité"
              width="120px"
              value={productForm.measurement_quantity || ""}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  measurement_quantity: Number(e.target.value),
                })
              }
            />
            <Dropdown
              loading={loadingOptions}
              openOnBottom
              placeholder="Unité de mesure"
              label="Unité de mesure"
              options={measurementUnits}
              value={
                measurementUnits.find(
                  (e) => e.value === productForm.measurement_unit
                ) || undefined
              }
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  measurement_unit: String(e.value),
                })
              }
              width="160px"
            />
          </MeasurementContainer>
        )}
        {productForm.product_type && productForm.product_type === "clothes" && (
          <ProductSizeForm
            productForm={productForm}
            setProductForm={setProductForm}
          />
        )}
        <StockContainer>
          {productForm.product_type === "default" && (
            <Input
              name="stock"
              label={"Stock actuel"}
              type="number"
              placeholder={"Stock actuel"}
              width="120px"
              value={productForm.stock || ""}
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  stock: Number(e.target.value),
                })
              }
            />
          )}
          {productForm.product_type === "clothes" && (
            <Text
              label={"Stock total"}
              text={String(totalProductSizeStock)}
              width="125px"
            />
          )}
          <Input
            name="stock_alert"
            label="Alerte de stock"
            type="number"
            placeholder="Alerte de stock"
            width="120px"
            value={productForm.alert_stock || ""}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                alert_stock: Number(e.target.value),
              })
            }
          />
        </StockContainer>
      </RightContainer>
    </Container>
  );
};

const Container = styled.form`
  position: relative;
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  gap: 20px;
`;

const LeftContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
`;

const RightContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
`;

const Divider = styled.div`
  width: 2px;
  border-radius: ${theme.materialDesign.borderRadius.rounded};
  height: 100%;
  background-color: ${theme.colors.greyLight};
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MeasurementContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
