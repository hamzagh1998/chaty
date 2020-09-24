const hostname = 'http://127.0.0.1:3000/'

export default class RequestHandler {
  static getHandler(uri, token) {
    return fetch(hostname+uri, {
      method: 'GET',
      headers: {
                'Content-Type': 'application/json', 
                'Authorization': token
               }
    })
      .then(res => res.json())
  }
  static deleteHandler(uri, token) {
    return fetch(hostname+uri, {
      method: 'Delete',
      headers: {
                'Content-Type': 'application/json', 
                'Authorization': token
              }
    })
      .then(res => res.json())
  }
  static postHandler(uri, payload, token=null) {
    return fetch(hostname+uri, {
      method: 'POST',
      headers: {
                'Content-Type': 'application/json',
                'Authorization': token
               },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
  }
}