
class AddConstituency {

    tessituraClient;
    clientName;

    constructor(proxyUrl, tessituraClient, clientName) {
        this.proxyUrl = proxyUrl;
        this.tessituraClient = tessituraClient;
        this.clientName = clientName;
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    getFriendlyName() {
        return "Add Constituency";
    }

    handleSubmission(compiledData, params, formData) {
        let constituency =compiledData['Constituency'];
        return this.tessituraClient.UpdateConstituency(constituency);
    }

    getEditFields() {
        return [
            {name: "Constituency"}
        ]
    }
}

export default AddConstituency;
