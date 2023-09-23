import http from 'k6/http'
import { check } from "k6"
import Utils from '../utils/Utils.js';


export default class Login {

    constructor() {
        this.token = ''
    }

    access(user, password) {

        const url = `${new Utils().getBaseUrl()}/login`;
        const headers = { 'Content-Type': 'application/json' };
        const body = JSON.stringify({
            username: user,
            password: password
        });

        const response = http.post(url, body, { headers });
          // Add assertions to check the response
        check(response, {'Login was successful': (res) => res.status === 201,});
        this.token = response.json('accessToken')
    }

    getToken() {
        return this.token
    }

}

module.exports = Login