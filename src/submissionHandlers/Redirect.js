
class Redirect {

    tessituraClient;
    clientName;

    constructor(proxyUrl, tessituraClient, clientName) {
        this.proxyUrl = proxyUrl;
        this.tessituraClient = tessituraClient;
        this.clientName = clientName;
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    getFriendlyName() {
        return "URL Redirect";
    }

    handleSubmission(params, formData) {
        let url = params['URL'];
        window.location = url;
    }

    getEditFields() {
        return [
            {name: "URL"}
        ]
    }
}

export default Redirect;
