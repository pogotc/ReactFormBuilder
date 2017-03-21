import axios from 'axios';

class Tessitura {

    proxyUrl;
    sessionKey;

    constructor(proxyUrl, sessionKey){
        this.proxyUrl = proxyUrl;
        this.sessionKey = sessionKey;
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

    addAttribute(keywordId, value) {
        let params = {
            'sWebSessionId': this.sessionKey,
            'cAction': 'A',
            'iKeywordNumber': keywordId,
            'sOldKeyValue': '',
            'sNewKeyValue': value,
            'cAccountName': '3'
        };

        let payload = {
            "method":"UpdateConstituentAttributes",
            "params": params,
            "id": null
        }

        return axios.post(this.proxyUrl, payload);
    }

    addContribution(amount, fund, accountMethod, upgrade, renew) {
        let params = {
            'sWebSessionID': this.sessionKey,
            'Amount': amount,
            'Fund': fund,
            'AccountMethod': accountMethod || 0,
            'Upgrade': upgrade || "false",
            'Renew': renew || "false"
        }
        let payload = {
            "method":"AddContribution",
            "params": params,
            "id": null
        }
        return axios.post(this.proxyUrl, payload);
    }
}

export default Tessitura;