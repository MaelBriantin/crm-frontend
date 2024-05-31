export type FetchAPIOptions = {
    method: string;
    headers: {
        "Accept": string;
        "X-XSRF-TOKEN": string;
        "Content-Type": string;
    };
    credentials: string;
    body?: string | null;
}

export type APIResponseError = {
    message: string;
    errors: object;
}

export type APIResponseFormat<T> = {
    data: T[] | null;
    error: APIResponseError | null;
}