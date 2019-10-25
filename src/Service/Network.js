import { baseUrlApi } from '../config';
import Session from './Session';

/**
 * Este recurso realiza peticiones a la API y retorna datos resueltos
 */

class Networking {
  constructor() {
    this.endpoint = '';
    this.headers = {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: Session.getInfoUser().token,
      },
    };
  }

  async get(endpoint, data = {}) {
    const qs = this.encodeQueryString(data);
    this.endpoint = endpoint + ((qs !== '') ? (`?${qs}`) : '');
    this.headers.method = 'GET';
    return this.send();
  }

  async post(endpoint, data = {}) {
    this.endpoint = endpoint;
    this.headers.method = 'POST';
    this.headers.body = Networking.fromData(data);
    return this.send();
  }

  async send() {
    const endpoint = baseUrlApi + this.endpoint;
    const response = await fetch(endpoint, this.headers);
    const result = await response.json();
    if (result) {
      return result;
    }
    return null;
  }

  static fromData(data) {
    let body = '';
    if (typeof data['form-data'] === 'boolean') {
      body = new FormData();

      data.forEach((name) => {
        if (name !== 'form-data') {
          body.append(name, data[name]);
        }
      });
    } else {
      body = JSON.stringify(data);
    }
    return body;
  }

  static encodeQueryStringFromArray(name, params, index) {
    const keys = Object.keys(params);
    return keys.length
      ? keys
        .map((key) => `${name}[${index}][${encodeURIComponent(key)}]=${
          encodeURIComponent(params[key])}`)
        .join('&')
      : '';
  }

  static encodeQueryString(filters) {
    let url = '';
    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key])) {
        filters[key].map((item) => {
          if (item !== null) {
            url += `${key}=${item}&`;
          }
          return true;
        }, this);
      } else if (filters[key]) {
        url += `${key}=${filters[key]}&`;
      }
    }, this);
    return url.substring(0, url.length - 1);
  }
}

const Network = new Networking();

export default Network;
