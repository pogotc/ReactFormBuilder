
class AddAttribute {

    tessituraClient;
    clientName;

    constructor(proxyUrl, tessituraClient, clientName) {
        this.proxyUrl = proxyUrl;
        this.tessituraClient = tessituraClient;
        this.clientName = clientName;
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    getFriendlyName() {
        return "Add Attribute";
    }

    handleSubmission(compiledData, params, formData) {
        let keywordID =compiledData['Keyword ID'];
        let value = compiledData['Value'];
        return this.tessituraClient.addAttribute(keywordID, value);
    }

    getEditFields() {
        return [
            {name: "Keyword ID"},
            {name: "Value"}
        ]
    }
}

export default AddAttribute;
