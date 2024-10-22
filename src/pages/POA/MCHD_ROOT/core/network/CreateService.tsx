import {ApiClient} from "@distate/app/src/pages/POA/MCHD_ROOT/core/client/ApiClient";
import {ApiConstants} from "@distate/app/src/pages/POA/MCHD_ROOT/core/client/ApiConstants";
import autobind from "autobind-decorator";

export class CreateService {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    @autobind
    createPOA(formdata: any) {
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