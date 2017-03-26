
class AddContribution {

    tessituraClient;
    clientName;

    constructor(proxyUrl, tessituraClient, clientName) {
        this.proxyUrl = proxyUrl;
        this.tessituraClient = tessituraClient;
        this.clientName = clientName;
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    getFriendlyName() {
        return "Add Contribution";
    }

    handleSubmission(compiledData, params, formData) {
        let amount = compiledData['Amount'];
        let fundId = compiledData['Fund ID'];
        return this.tessituraClient.addContribution(amount, fundId);
    }

    getEditFields() {
        return [
            {name: "Fund ID"},
            {name: "Amount"}
        ]
    }
}

export default AddContribution;
