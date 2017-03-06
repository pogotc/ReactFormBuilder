
class CustomerServiceIssue {

    tessituraClient;

    constructor(proxyUrl, tessituraClient) {
        this.proxyUrl = proxyUrl;
        this.tessituraClient = tessituraClient;
    }

    getFriendlyName() {
        return "Customer Service Issue";
    }

    handleSubmission(params, formData) {
        params['Notes'] = this.formDataToString(formData);
        return this.tessituraClient.sendCustomerServiceIssue(params);
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

export default CustomerServiceIssue;
