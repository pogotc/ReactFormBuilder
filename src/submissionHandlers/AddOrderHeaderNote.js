
class AddOrderHeaderNote {

    tessituraClient;
    clientName;

    constructor(proxyUrl, tessituraClient, clientName) {
        this.proxyUrl = proxyUrl;
        this.tessituraClient = tessituraClient;
        this.clientName = clientName;
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    getFriendlyName() {
        return "Add Order Header Note";
    }

    handleSubmission(compiledData, params, formData) {
        let comment = compiledData['Comment']
        let lineItemID = 0;
        let lineItemType = "O";
        let customerNo = 0;
        let categoryNo = 0;

        return this.tessituraClient.addOrderComment(comment, lineItemID, lineItemType, customerNo, categoryNo);
    }

    getEditFields() {
        return [
            {name: "Comment"}
        ]
    }
}

export default AddOrderHeaderNote;
