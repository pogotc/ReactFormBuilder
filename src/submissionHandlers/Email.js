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

    getFriendlyName() {
        return "Email";
    }

    handleSubmission(options, formData) {
        let proxyUrl = this.proxyUrl + "/formbuilder/" + this.clientName;

        let payload = {
            "method":"sendemail",
            "params": {
                "body": this.formDataToString(formData)
            },
            "id": "3612105" //@TODO - refactor this
        };

        return axios.post(proxyUrl, payload);
    }

    getEditFields() {
        return [
            {name: "to"}
        ]
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