
class Email {

    tessituraClient;
    clientName;

    constructor(proxyUrl, tessituraClient, clientName) {
        this.tessituraClient = tessituraClient;
        this.clientName = clientName;
    }

    getFriendlyName() {
        return "Email";
    }

    handleSubmission(compiledData, options, formData) {

        let payload = {
            "method":"sendemail",
            "params": {
                "body": this.formDataToString(formData)
            },
            "id": options._formid
        };
        return payload;
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