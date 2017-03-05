import axios from 'axios';

class FormManager {

    proxyUrl;
    s3UrlBase;

    constructor(proxyUrl){
        this.proxyUrl = proxyUrl;
        this.s3UrlBase = "https://s3-eu-west-1.amazonaws.com/made-dev/formbuilder/made1/";
        this.prepareData = this.prepareData.bind(this);
    }

    fetchById(id) {
        let url = this.getUrlFromId(id);
        return axios.get(url);
    }

    parseIdFromUrl(url) {
        return url.replace(this.s3UrlBase, '').replace(".json", "");
    }

    getUrlFromId(id) {
        return this.s3UrlBase + id + ".json";
    }

    fetchAll() {
        let payload = {
            "method":"getforms",
            "params": {},
            "id": null
        }
        return axios.post(this.proxyUrl, payload)
            .then((response) => {
                let fetchRequests = response.data.result.map((url) => {
                    let id = url.replace(this.s3UrlBase, '').replace(".json", "");
                    return this.fetchById(id);
                });
                return axios.all(fetchRequests);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    createNewForm() {
        return this.save(this.generateNewFormId(), {
            "name": "Untitled Form",
            "fields": [],
            "submissionHandlers": [
                {name: "Email", options: {to: "steve.ellis@mademedia.co.uk"}},
                {name: "CustomerServiceIssue", options: {}}
            ]
        });
    }

    generateNewFormId() {
        return Math.floor(Math.random() * 9999999);
    }

    save(id, data) {
        let payload = {
            "method":"updateform",
            "params": {
                "data": this.prepareData(data)
            },
            "id": id
        }
        return axios.post(this.proxyUrl, payload);
    }

    prepareData(data) {
        let dataCopy = JSON.parse(JSON.stringify(data));
        dataCopy.fields = dataCopy.fields.map((field) => {
            field.isSelected = false;
            return field;
        });
        return dataCopy;
    }
}

export default FormManager;