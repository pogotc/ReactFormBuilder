
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

    getEditFields(referenceData) {
        let attributesData = referenceData['Attributes'] || [];
        let attributes = [];
        attributes = attributesData.map((attribute) => {
            return {value: attribute.Id, label: attribute.Description};
        }).sort((a, b) => {
            return a.label > b.label ? 1 : -1;
        });
        attributes.unshift({value: "", label: "--Select--"});


        return [
            {name: "Keyword ID", choices: attributes},
            {name: "Value"}
        ]
    }
}

export default AddAttribute;
