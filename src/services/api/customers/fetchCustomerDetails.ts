import { CustomerDetailsType } from "../../../types/CustomerTypes.ts";
import { fetchAPI, handleAPIResponse } from "../fetchApi.config.ts";

export const fetchCustomerDetails = async (customerId: number) => {
  let customerDetailsResponse: CustomerDetailsType[] = [];

  try {
    const response = await fetchAPI<null, CustomerDetailsType[]>(
      `/api/customers/${customerId}`,
    );
    handleAPIResponse<CustomerDetailsType>(
      response,
      (order) => {
        customerDetailsResponse = order as CustomerDetailsType[];
      },
      (error) => {
        console.error(error.message);
      },
    );
  } catch (error) {
    console.error(error);
  }
  return customerDetailsResponse;
};
