import axios from 'axios';

class Tessitura {

    proxyUrl;
    sessionKey = "G1NGO0RSW10NU3EX2134XL78CRI1NO1XSW21D9WN37A9I1DUWV97F0AUSF3VA354";

    constructor(proxyUrl){
        this.proxyUrl = proxyUrl;
    }

    sendCustomerServiceIssue(params) {
        params['sSessionKey'] = this.sessionKey;
        let payload = {
            "method":"AddCustomerServiceIssue",
            "params": params,
            "id": null
        }

        return axios.post(this.proxyUrl, payload);
    }
}

export default Tessitura;