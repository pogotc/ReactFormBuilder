import axios from 'axios';

class Auth {

    proxyUrl;

    constructor() {
        this.checkAuthorisation = this.checkAuthorisation.bind(this);
        this.validateOnEnter = this.validateOnEnter.bind(this);
    }

    init(proxyUrl) {
        this.proxyUrl = proxyUrl;
    }

    authenticate(username, password, callback) {
        let payload = {
            "method":"authenticate",
            "params":{
                "username": username,
                "password": password
            },
            "id":null
        }
        axios.post(this.proxyUrl, payload)
            .then((response) => {
                let result = response.data.result;
                let cookieUsername = username + ":" + result['time'];
                let cookieSignature = result['signature'];
                this.createCookie("u", cookieUsername);
                this.createCookie("sig", cookieSignature);
                callback(true);
            })
            .catch((err) => {
                callback(false);
            });;
    }

    checkAuthorisation() {
        let payload = {
            "method":"authorise",
            "params":{},
            "id":null
        }
        let config = {
            auth: this.getAuthHeader()
        }
        return axios.post(this.proxyUrl, payload, config);
    }

    validateOnEnter(nextState, transition, callback) {
        this.checkAuthorisation()
            .then((response) => {
                if (response.data.result === "authorised") {
                    callback();
                } else {
                    transition("/login");    
                    callback();
                }
            })
            .catch((err) => {
                transition("/login");
                callback();
            });
    }

    getAuthHeader() {
        return {
            username: this.getCookie('u'),
            password: this.getCookie('sig')
        }
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    createCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/;";
    }
}


export default new Auth();