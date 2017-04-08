import axios from 'axios';
let Auth = require('../Auth').default;

class FormManager {

    proxyUrl;
    s3UrlBase;

    constructor(proxyUrl, s3base, clientName){
        this.proxyUrl = proxyUrl;
        this.s3UrlBase = s3base + "/" + clientName
        this.prepareData = this.prepareData.bind(this);
        this.parseIdFromUrl = this.parseIdFromUrl.bind(this);
    }

    fetchById(id) {
        let url = this.getUrlFromId(id);
        return axios.get(url);
    }

    parseIdFromUrl(url) {
        return url.replace(this.s3UrlBase + "/", '').replace(".json", "");
    }

    getUrlFromId(id) {
        return this.s3UrlBase + "/" + id + ".json";
    }

    fetchAll() {
        let payload = {
            "method":"getforms",
            "params": {},
            "id": null
        }
        let config = {
            auth: Auth.getAuthHeader()
        }
        return axios.post(this.proxyUrl, payload, config)
            .then((response) => {
                let fetchRequests = response.data.result.map((url) => {
                    let id = this.parseIdFromUrl(url);
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
            "submissionHandlers": []
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
        let config = {
            auth: Auth.getAuthHeader()
        }
        return axios.post(this.proxyUrl, payload, config);
    }

    getReferenceData() {
        let payload = {
            "method": "getreferencedata",
            "params": {},
	        "id": null
        }
        let config = {
            auth: Auth.getAuthHeader()
        }
        return axios.post(this.proxyUrl, payload, config);
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