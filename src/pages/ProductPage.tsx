import React, { useEffect } from "react";
import { VscEdit, VscChromeClose } from "react-icons/vsc";
import { theme } from "../assets/themes";
import { useModal, useAppLoading, useToast, useDeleteAlert } from "../contexts";
import { useStoreProducts } from "../stores/useStoreProducts";
import { isEmpty, deepCopy } from "../utils/helpers/spells";
import { DataTable } from "../components/DataTable";
import { ColumnProps, RowDataType, RowType } from "../types/DataTableTypes";
import { ProductForm, FormActions } from "../components/forms";
import { useKeyboardShortcut } from "../hooks/system/useKeyboardShortcut";
import { Loader } from "../components/global";
import styled from "styled-components";
import { ProductType } from "../types/ProductTypes";
import { deleteProduct } from "../services/api/products";

export const ProductPage: React.FC = () => {
  const [sort, setSort] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<boolean>(true);

  const { showModal } = useModal();
  const { setAppLoading } = useAppLoading();
  const { callToast } = useToast();
  const { showDeleteAlert } = useDeleteAlert();

  const { products, fetchProducts, loadingProducts, setLoadingProducts } =
    useStoreProducts();

  useKeyboardShortcut({ "Control+Alt+n": () => newProduct() });

  useEffect(() => {
    isEmpty(products) && fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newProduct = () => {
    showModal("Nouveau produit", <ProductForm />, <FormActions />);
  };

  const handleEditProduct = (row: RowType) => {
    setAppLoading(true);
    const product = products.find(
      (product: ProductType) => product.id === row.id
    );
    showModal(
      `Modifier un produit`,
      <ProductForm product={product as ProductType} />,
      <FormActions />
    );
    setAppLoading(false);
  };

  const handleDeleteAlert = (row: RowType) => {
    const product = products.find(
      (product: ProductType) => product.id === row.id
    );
    const message = `Êtes-vous sûr de vouloir supprimer le secteur ${product?.name} ? 
    Cette action est irréversible et entrainera la perte de toutes les données statistiques associées.`;
    showDeleteAlert(message, () => handleDeleteProduct(product as ProductType));
  };

  const handleDeleteProduct = async (product: ProductType) => {
    setAppLoading(true);
    setLoadingProducts(true);
    await deleteProduct(product, callToast, fetchProducts);
    setLoadingProducts(false);
    setAppLoading(false);
  };

  const columns: ColumnProps[] = [
    {
      text: "Référence",
      value: "reference",
      sortable: true,
      type: "chips",
      width: "5%",
      maxWidth: "100px",
    },
    {
      text: "Nom du produit",
      value: "name",
      sortable: true,
      width: "2000px",
    },
    {
      text: "Type de produit",
      value: "product_type_label",
      sortable: true,
      width: "20%",
    },
    {
      text: "Marque",
      value: "brand.name",
      sortable: true,
      width: "20%",
    },
    {
      text: "Prix HT",
      value: "selling_price",
      type: "currency",
      sortable: true,
      width: "10%",
      maxWidth: "200px",
    },
    {
      text: "Prix TTC",
      value: "selling_price_with_vat",
      type: "currency",
      sortable: true,
      width: "10%",
      maxWidth: "200px",
    },
    {
      text: "Stock total",
      value: "stock",
      type: "number",
      sortable: true,
      width: "10%",
      maxWidth: "200px",
    },
    {
      text: "",
      value: "",
      type: "rowActions",
      sortable: false,
      actions: [
        {
          icon: <VscEdit />,
          onClick: (row: RowType) => handleEditProduct(row),
          color: theme.colors.primary,
        },
        {
          icon: <VscChromeClose />,
          onClick: (row: RowType) => handleDeleteAlert(row),
          color: theme.colors.error,
        },
      ],
      width: "5%",
      maxWidth: "100px",
      align: "start",
    },
  ];

  return (
    <Container>
      {isEmpty(products) && loadingProducts && <Loader transparent />}
      {(!isEmpty(products) || !loadingProducts) && (
        <DataTable
          topBar
          searchbar={!!products.length}
          buttonValueTopBar="Nouveau produit"
          columns={columns}
          onDoubleClickOnRow={handleEditProduct}
          onClickTopBar={newProduct}
          data={deepCopy(products) as unknown as RowDataType[]}
          emptyMessage={"Aucun produit trouvé"}
          sort={sort}
          setSort={setSort}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 90%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
