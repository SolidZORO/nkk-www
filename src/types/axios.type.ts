import { AxiosError, AxiosResponse } from 'axios';


export type IAxiosRes<T> = AxiosResponse<T>;
export type IAxiosGetError = AxiosError;
export type IAxiosPostError = AxiosError;
