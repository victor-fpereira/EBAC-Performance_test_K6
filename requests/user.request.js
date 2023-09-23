import http from 'k6/http'
import { check } from "k6"
import Utils from '../utils/Utils.js';

export default class User {

    list(token) {
        let response = http.get(`${new Utils().getBaseUrl()}/users/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        check(response, {"listagem deve retornar 200": r => r.status === 200 })
    }
}