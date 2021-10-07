import { AxiosError, AxiosResponse } from 'axios';

export type IFetcherRes<T> = AxiosResponse<T>;
export type IFetcherError = AxiosError;
export type IMutError = AxiosError;
