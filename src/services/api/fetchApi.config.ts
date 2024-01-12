import { getCookie } from "../../utils/helpers/getCookie";

/**
 * Makes an HTTP request using the Fetch API and processes the response.
 *
 * @template D - The type of data being sent in the request body.
 * @template T - The type of the expected JSON response.
 * 
 * @param {string} url - The URL for the API endpoint.
 * @param {string} [method='GET'] - The HTTP method for the request.
 * @param {D | null} [data=null] - The data to be sent in the request body (if applicable).
 * 
 * @returns {Promise<APIResponseFormat<T>>} A promise resolving to the formatted API response.
 * 
 * @throws Will throw an error if the HTTP request fails or if there is an issue processing the response.
 */
export const fetchAPI = async <D extends object | null, T extends object | null>(
  url: string,
  method: string = 'GET',
  data: D | null = null
): Promise<{ data: T | null; error: null | APIResponseError }> => {
  const baseURL: string = import.meta.env.VITE_API_URL as string;
  const xsrfToken: string = decodeURIComponent(getCookie('XSRF-TOKEN'));
  try {
    const options: FetchAPIOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': xsrfToken
      },
      credentials: 'include',
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(baseURL + url, options as RequestInit);

    const contentType = response.headers.get('Content-Type');

    if (contentType && contentType.includes('application/json')) {

      const responseData = await response.json() as T;

      return { 
        data: response.ok ? responseData : null, 
        error: response.ok ? null : responseData as APIResponseError 
      };

    }

    return { data: null, error: null };

  } catch (error) {
    console.error('Fetching failure:', error);
    throw error;
  }
};

/**
 * Handles the API response and calls the appropriate callback based on the response status.
 *
 * @template T - The type of the expected JSON response.
 *
 * @param {APIResponseFormat<T>} response - The API response.
 * @param {Function} onSuccess - The callback function to be called on successful response.
 * @param {Function} onError - The callback function to be called on error response.
 *
 * @returns {void}
 */
export const handleAPIResponse = <T>(response: APIResponseFormat<T>, onSuccess: (data: T[]) => void, onError: (error: APIResponseError) => void) => {
    if (response.data && !response.error) {
      onSuccess(response.data);
    } 
    if (!response.data && response.error){
      onError(response.error);
    }
  };