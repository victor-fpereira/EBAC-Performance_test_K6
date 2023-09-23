import http from 'k6/http'
import { check } from "k6"
import Utils from '../utils/Utils.js';
import clientes_id from '../data/clientes_id.js'

export default class User {

    list(token) {
        let response = http.get(`${new Utils().getBaseUrl()}/produtos/${clientes_id.cliente_1}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        check(response, {"Listagem deve retornar 200": r => r.status === 200 })
    }
}