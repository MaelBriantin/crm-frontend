import styled from "styled-components";
import { Loader } from "../global";
import { DetailGroup } from "./DetailGroup.tsx";
import { useStoreCustomers } from "../../stores/useStoreCustomers.ts";
import { isEmpty } from "../../utils/helpers/spells.ts";
import { useEffect, useState } from "react";
import { useStoreOrderDetails } from "../../stores/useStoreOrderDetails.ts";
import { ProductDetailTable } from "./ProductDetailTable.tsx";
import { OrderedProductType } from "../../types/OrderTypes.ts";
import { theme } from "../../assets/themes/index.ts";
type CustomerDetailsProps = {
  //
};

export const CustomerDetails: React.FC<CustomerDetailsProps> = () => {
  const { customerDetails, loadingCustomerDetails } = useStoreCustomers();
  const { setOrderDetails, orderDetails, loadingOrderDetails, resetOrderDetails } =
    useStoreOrderDetails();

  const [showingOrderDetails, setShowingOrderDetails] = useState(false);

  const showOrderDetails = (orderId: number) => {
    setOrderDetails(orderId);
    setShowingOrderDetails(true);
  };

  useEffect(() => {
    resetOrderDetails();
  }, [resetOrderDetails]);

  const customerDetailsMap = [
    {
      label: "Nom",
      value: customerDetails.full_name,
    },
    { label: "", value: "" },
    { label: "Adresse", value: customerDetails.address },
    { label: "Code postal - Ville", value: customerDetails.city },
    { label: "", value: "" },
    { label: "Téléphone", value: customerDetails.phone || "Non renseigné" },
    { label: "Email", value: customerDetails.email || "Non renseigné" },
    { label: "", value: "" },
    { label: "Secteur", value: customerDetails.sector?.name || "Hors secteur" },
  ];
  const averageOrderAmountDetailsMap = [
    {
      label: "Total HT",
      value: `${customerDetails.no_vat_average_order_amount} €`,
    },
    {
      label: "Total TTC",
      value: `${customerDetails.vat_average_order_amount} €`,
    },
  ];
  const orderListMap = customerDetails.orders.map((order) => {
    return {
      label: (
        <OrderDetailsLink
          $selected={order.id == orderDetails?.id}
          onClick={() => showOrderDetails(order.id)}
        >
          {order.order_number}
        </OrderDetailsLink>
      ),
      value: order.order_date,
    };
  });

  const orderDetailsMap = [
    { label: "Numéro de commande", value: orderDetails?.order_number },
    { label: "Date de commande", value: orderDetails?.order_date },
    { label: "", value: "" },
    { label: "Moyen de paiement", value: orderDetails?.payment_method_label },
    {
      label: `Statut du paiement au ${new Date().toLocaleDateString("FR-fr")}`,
      value: orderDetails?.payment_status_label,
    },
    orderDetails?.is_paid ? 
    {
      label: "",
      value: "",
    } : 
      { 
        label: "Date de paiment différé",
        value: orderDetails?.deferred_date
        },
    {
      label: "",
      value: "",
    },
    {
      label: "Total TTC",
      value: `${orderDetails?.vat_total} €`,
    },
    {
      label: "Total HT",
      value: `${orderDetails?.no_vat_total} €`,
    },
  ];

  return (
    <DetailsContainer $loading={loadingCustomerDetails}>
      {loadingCustomerDetails && <Loader />}
      {!loadingCustomerDetails && (
        <GlobalContainer>
          <Details>
            <InfoContainer>
              <DetailGroup
                label={"Informations générales"}
                arrayValues={customerDetailsMap}
                width={"400px"}
              />
              {!isEmpty(orderListMap) && (
                <DetailGroup
                  label={"Montant moyen des commandes"}
                  arrayValues={averageOrderAmountDetailsMap}
                  width={"400px"}
                />
              )}
              {!isEmpty(orderListMap) && (
                <DetailGroup
                  label={"Historique des commandes"}
                  arrayValues={orderListMap}
                  width={"400px"}
                />
              )}
            </InfoContainer>
          </Details>
        </GlobalContainer>
      )}
      {showingOrderDetails && !loadingOrderDetails && (
        <OrderDetailsContainer>
          <DetailGroup
            label={"Détail de la commande"}
            arrayValues={orderDetailsMap}
            width={"400px"}
          />
          <ProductDetailTable
            orderedProductsList={
              orderDetails?.ordered_products as OrderedProductType[]
            }
          />
        </OrderDetailsContainer>
      )}
      {showingOrderDetails && loadingOrderDetails && <Loader transparent />}
    </DetailsContainer>
  );
};

const DetailsContainer = styled.div<{ $loading: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: ${({ $loading }) => ($loading ? "100px" : "100%")};
  width: ${({ $loading }) => ($loading ? "100px" : "auto")};
  //min-height: 100px;
  //width: 50vw;
  gap: 20px;
`;

const GlobalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const OrderDetailsLink = styled.div<{ $selected: boolean }>`
  user-select: none;
  color: ${({ $selected }) => ($selected ? theme.colors.primary : "inherit")};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const OrderDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  gap: 20px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
`;
