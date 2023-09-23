import http from 'k6/http'
import { check } from "k6"
import Utils from '../utils/Utils.js';
import produtos_id from '../data/produtos_id.js'

export default class User {

    list(token) {
        let response = http.get(`${new Utils().getBaseUrl()}/produtos/${produtos_id.mouse_gamer}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        check(response, {"Listagem deve retornar 200": r => r.status === 200 })
    }
}