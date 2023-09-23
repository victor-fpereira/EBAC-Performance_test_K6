import { group } from 'k6';

import Login from '../requests/login.request.js'
import User from '../requests/user.request.js'
import usuarios from '../data/usuarios.js';

export const options = {
  stages: [
    { duration: '15s', target: 100 },
    { duration: '10s', target: 50 },
    { duration: '5s', target: 25 },
    { duration: '2s', target: 12 },
    { duration: '1s', target: 6 }
  ],

  thresholds: {
    http_req_duration: ['p(99) < 2000']
  }
}

export default function () {

  let login = new Login()
  let user = new User()

  group('login and get token', () => {
    login.access(usuarios.username, usuarios.password)
  })

  group('list users', () => {
    user.list(login.getToken())
  })
}
