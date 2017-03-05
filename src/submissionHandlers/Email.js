import axios from 'axios';

class Email {

    proxyUrl;

    constructor(proxyUrl) {
        this.proxyUrl = proxyUrl;
    }

    handleSubmission(options, formData) {
        let payload = {
            "method":"sendemail",
            "params": {
                "body": this.formDataToString(formData)
            },
            "id": "3612105"
        };

        return axios.post(this.proxyUrl, payload);
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