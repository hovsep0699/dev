// src/AxiosClient.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {ServiceLocator} from "../../di/ServiceLocator";
import {BlobClient} from "./BlobClient";
import autobind from "autobind-decorator";

class AxiosClient {
    private client: AxiosInstance;
    private blobClient: BlobClient;


    public static getInstance(): AxiosClient {
        return ServiceLocator.getInstance().get(AxiosClient);
    }

    constructor(blobClient: BlobClient) {
        this.client = axios.create({
            timeout: 10000,
        });
        this.blobClient = blobClient;
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.delete = this.delete.bind(this);

        // Setup interceptors
        this.setupInterceptors();
    }

    @autobind
    private setupInterceptors() {
        this.client.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                config.headers['X-Requested-With'] = `XMLHttpRequest`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log("RESPONSE BODY::: ", response.data);
                console.log("STATUS:::: ", response.status)
                this.blobClient.collectResponse(response);
                return response;
            },
            (error) => {
                if (error.response) {
                    console.log("STATUS:::: ", error.response.status);
                    console.log("ERROR BODY:::: ", error.response.data);
                    this.blobClient.collectResponse(error.response);
                }
                else {
                    console.log("ERROR BODY::: is null");
                }
                return Promise.reject(error);
            }
        );
    }

    @autobind
    public async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        const response = await this.client.get<T>(url, { params });
        return response.data;
    }

    @autobind
    public async post<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.post<T>(url, data);
        return response.data;
    }

    @autobind
    public async delete<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.delete<T>(url, {
            data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        return response.data;
    }
}

export default AxiosClient;
