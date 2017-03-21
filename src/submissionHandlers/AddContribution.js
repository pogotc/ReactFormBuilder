
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

    handleSubmission(params, formData) {
        let amount = params['Amount'];
        let fundId = params['Fund ID'];
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
