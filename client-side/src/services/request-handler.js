const hostname = 'https://chaty-11.herokuapp.com/'

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