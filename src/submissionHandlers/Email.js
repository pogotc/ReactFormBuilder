import axios from 'axios';

class Email {

    proxyUrl;
    tessituraClient;
    clientName;

    constructor(proxyUrl, tessituraClient, clientName) {
        this.proxyUrl = proxyUrl;
        this.tessituraClient = tessituraClient;
        this.clientName = clientName;
    }

    handleSubmission(options, formData) {
        let proxyUrl = this.proxyUrl + "/formbuilder/" + this.clientName;

        let payload = {
            "method":"sendemail",
            "params": {
                "body": this.formDataToString(formData)
            },
            "id": "3612105"
        };

        return axios.post(proxyUrl, payload);
    }

    formDataToString(formData) {
        let dataParts = [];
        for (let fieldName in formData) {
            if (formData.hasOwnProperty(fieldName)) {
                dataParts.push(fieldName + ": " + formData[fieldName]);
            }
        }
        return dataParts.join("\n");
    }
}

export default Email;