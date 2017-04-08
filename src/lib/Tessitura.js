
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
        return payload;
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
            "provider": "soap"
        }
        return payload;
    }

    UpdateConstituency(constituencyNo, iN1N2Ind, cAction) {
        let params = {
            'sSessionKey': this.sessionKey,
            'iConstituencyNo': constituencyNo,
            'action': cAction || 'A',
            'iN1N2Ind': iN1N2Ind || 3
        };

        let payload = {
            "method":"UpdateConstituency",
            "params": params,
            "provider": "soap"
        }
        return payload;
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
            "provider": "soap"
        }
        return payload;
    }

    reserveTickets(perfId, priceType, numSeats, zone) {
        let priceTypes = [];
        for (var i = 0; i < numSeats; i++){ priceTypes.push(priceType);}
        let params = {
            'sWebSessionID': this.sessionKey,
            'sPriceType': priceTypes.join(","),
            'iPerformanceNumber': perfId,
            'iNumberOfSeats': numSeats,
            'iZone': zone,
            'sSpecialRequests': ''
        }
        let payload = {
            "method":"ReserveTicketsEx",
            "params": params,
            "provider": "soap"
        }
        return payload;
    }

    addOrderComment(comment, lineItemID, lineItemType, customerNo, categoryNo) {
        let params = {
            'SessionKey': this.sessionKey,
            'Comment': comment,
            'LineItemID': lineItemID,
            'LineItemType': lineItemType,
            'CustomerNo': customerNo,
            'CategoryNo': categoryNo
        }
        let payload = {
            "method":"AddOrderCommentsEx2",
            "params": params,
            "provider": "soap"
        }
        return payload;
    }
}

export default Tessitura;