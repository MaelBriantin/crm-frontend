import React, { useEffect } from "react";
import { useModal, useNewOrderActions } from "../../../contexts";
import styled from "styled-components";
import { Input, SelectableList } from "../../global";
import { useStoreCustomers } from "../../../stores/useStoreCustomers";
import { useStoreOrders } from "../../../stores/useStoreOrders";
import { CustomerType } from "../../../types/CustomerTypes";
import { isEmpty } from "../../../utils/helpers/spells";

export const CustomerList: React.FC = () => {
  const { setSubTitle } = useModal();
  const { setDisableNext } = useNewOrderActions();

  const { customers, fetchCustomers } = useStoreCustomers();
  const { newOrder, addCustomer } = useStoreOrders();

  const [selected, setSelected] = React.useState<number[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [filteredCustomers, setFilteredCustomers] =
    React.useState<CustomerType[]>(customers);

  useEffect(() => {
    newOrder.customer_id ? setSelected([newOrder.customer_id]) : setSelected([]);
  }, [newOrder.customer_id]);

  useEffect(() => {
    isEmpty(customers) && fetchCustomers();
  }, [customers, fetchCustomers]);

  useEffect(() => {
    setFilteredCustomers(
      customers.filter((customer) =>
        customer.full_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, customers]);

  useEffect(() => {
    selected.length > 0 && addCustomer(selected[0]);
  }, [addCustomer, selected, setSelected]);

  const disableNext = selected.length === 0 || isEmpty(customers);

  useEffect(() => {
    setSubTitle("Sélection du client");
    setDisableNext(disableNext);
  }, [disableNext, setDisableNext, setSubTitle]);

  const attributeList: { label: string; key: keyof CustomerType, type?: 'subtitle' | 'title' }[] = [
    {
      key: "full_name",
      label: "Nom",
    },
    {
      key: 'full_address',
      label: 'Adresse',
      type: "subtitle",
    },
  ];

  return (
    <CustomerListContainer>
      <Input
        width="400px"
        label="Recherche par nom"
        placeholder="Rechercher un client par nom"
        clearable
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SelectableList
        loading={isEmpty(customers)}
        selectKey="id"
        data={filteredCustomers}
        attributeList={attributeList}
        selected={selected}
        setSelected={setSelected}
      />
    </CustomerListContainer>
  );
};

const CustomerListContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15px;
`;
