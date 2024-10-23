import {ServiceLocator} from "../../di/ServiceLocator";
import AxiosClient from "./AxiosClient";
import autobind from "autobind-decorator";

export class ApiClient {

    private axiosClient: AxiosClient;

    constructor(axiosClient: AxiosClient) {
        this.axiosClient = axiosClient;
    }

    public static getInstance() {
        return ServiceLocator.getInstance().get(ApiClient);
    }

    @autobind
    sendGet<T>(url: any, params: any) {
        return this.axiosClient.get<T>(url, { params });
    }

    @autobind
    sendPost<T>(url: any, params: any) {
        if (params) {
            return this.axiosClient.post<T>(url, { params });
        }
        return this.axiosClient.post<T>(url);
    }

    @autobind
    sendDelete<T>(url: any, params: any) {
        return this.axiosClient.delete<T>(url, params);
    }

    @autobind
    sendPostJSON<T>(url: any, json: any) {
        return this.axiosClient.post<T>(url, json);
    }

    @autobind
    sendPostFormData<T>(url: any, formData: any) {
        return this.axiosClient.post<T>(url, formData);
    }

    @autobind
    sendDeleteFormData<T>(url: any, data: any) {
        return this.axiosClient.delete<T>(url, {data});
    }

}
