import {ServiceLocator} from "../../di/ServiceLocator";
import AxiosClient from "./AxiosClient";
import autobind from "autobind-decorator";

export class ApiClient {

    private axiosClient: AxiosClient;

    constructor(axiosClient: AxiosClient) {
        this.axiosClient = axiosClient;
    }

    public static getInstance(): ApiClient {
        return ServiceLocator.getInstance().get(ApiClient);
    }

    @autobind
    public async sendGet<T>(url: any, params: any): Promise<T> {
        return this.axiosClient.get<T>(url, { params });
    }

    @autobind
    public async sendPost<T>(url: any, params: any): Promise<T> {
        if (params) {
            return this.axiosClient.post<T>(url, { params });
        }
        return this.axiosClient.post<T>(url);
    }

    @autobind
    public async sendDelete<T>(url: any, params: any): Promise<T> {
        return this.axiosClient.delete<T>(url, params);
    }

    @autobind
    public async sendPostJSON<T>(url: any, json: any): Promise<T> {
        return this.axiosClient.post<T>(url, json);
    }

    @autobind
    public async sendPostFormData<T>(url: any, formData: any): Promise<T> {
        return this.axiosClient.post<T>(url, formData);
    }

    @autobind
    public async sendDeleteFormData<T>(url: any, data: any): Promise<T> {
        return this.axiosClient.delete<T>(url, {data});
    }

}
