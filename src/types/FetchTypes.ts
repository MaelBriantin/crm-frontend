type FetchAPIOptions = {
    method: string;
    headers: {
        "Accept": string;
        "X-XSRF-TOKEN": string;
        "Content-Type": string;
    };
    credentials: string;
    body?: string | null;
}

type APIResponseError = {
    message: string;
    errors: object;
}

type APIResponseFormat<T> = {
    data: T[] | null;
    error: APIResponseError | null;
}