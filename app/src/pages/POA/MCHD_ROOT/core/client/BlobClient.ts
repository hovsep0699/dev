import {AxiosResponse} from "axios";
import autobind from "autobind-decorator";

export class BlobClient {

    @autobind
    public collectResponse(response: AxiosResponse<Response>): void {
        const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'response.json';

        link.click();
    }
}