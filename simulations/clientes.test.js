import { group } from 'k6';

import Login from '../requests/login.request.js'
import User from '../requests/user.request.js'
import usuarios from '../data/usuarios.js';

export const options = {
  stages: [
    { duration: '1s', target: 10 },
    { duration: '5s', target: 2000 },
    { duration: '18s', target: 10 },
    { duration: '5s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99) < 1000']
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
