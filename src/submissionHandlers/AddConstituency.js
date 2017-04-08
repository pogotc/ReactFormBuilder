
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

    getEditFields(referenceData) {
        let constituenciesData = referenceData['ConstituencyTypes'] || [];
        let constituencies = [];
        constituencies = constituenciesData.map((constituency) => {
            return {value: constituency.Id, label: constituency.Description};
        }).sort((a, b) => {
            return a.label > b.label ? 1 : -1;
        });
        constituencies.unshift({value: "", label: "--Select--"});

        return [
            {name: "Constituency", choices: constituencies}
        ]
    }
}

export default AddConstituency;
