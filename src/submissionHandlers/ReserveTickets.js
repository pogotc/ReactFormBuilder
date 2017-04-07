
class ReserveTickets {

    tessituraClient;
    clientName;

    constructor(proxyUrl, tessituraClient, clientName) {
        this.proxyUrl = proxyUrl;
        this.tessituraClient = tessituraClient;
        this.clientName = clientName;
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    getFriendlyName() {
        return "Reserve Tickets";
    }

    handleSubmission(compiledData) {
        let perfId = compiledData['Performance Id'];
        let numSeats = compiledData['Number of seats'];
        let priceType = compiledData['Price Type'];
        let zone = compiledData['Zone'];
        return this.tessituraClient.reserveTickets(perfId, priceType, numSeats, zone);
    }

    getEditFields() {
        return [
            {name: "Number of seats"},
            {name: "Performance Id"},
            {name: "Price Type"},
            {name: "Zone"}
        ]
    }
}

export default ReserveTickets;
