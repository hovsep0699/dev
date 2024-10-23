import {ApiClient} from "../client/ApiClient";
import {ApiConstants} from "../client/ApiConstants";
import autobind from "autobind-decorator";

export class CreateService {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    @autobind
    public createPOA(formdata: any): void {
        this.apiClient.sendPostFormData(ApiConstants.createPOA, formdata)
            .then((response) => {
                console.log("res::::: ", response);

                // const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
                //
                // const link = document.createElement('a');
                // link.href = URL.createObjectURL(blob);
                // link.download = 'response.json';
                //
                // link.click();
            })
            .catch((error) => {
                console.log("ERROR::: : ", error);

            });
    }
}