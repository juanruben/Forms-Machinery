import { baseUrlApi } from '../config';
import Session from './Session';

/**
 * Este recurso realiza peticiones a la API y retorna datos resueltos
 */

class Networking {
    constructor () {
		this.endpoint = ''
		this.headers = {
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': Session.getTokenUser().token
			}
		}
	}
	
    async get(endpoint,data={}) {
		let qs = this.encodeQueryString(data);
        this.endpoint = endpoint+ ((qs !== '') ? ('?' + qs) : '')
		this.headers.method = 'GET'
		return this.send()
	}

    async post(endpoint,data={}) {
		this.endpoint = endpoint
		this.headers.method = 'POST'
		this.headers.body = this.fromData(data)
		return this.send()
	}

    async send() {
		let endpoint = this.endpoint.includes('.php') ? baseUrlApi + this.endpoint: BaseURLVoyager + this.endpoint
		let response = await fetch(endpoint, this.headers)
        let result = await response.json()
		if (result) {
			return result;
		}
		return null
	}
	
    fromData(data){
		let body = '';
		if (typeof data['form-data'] === 'boolean'){
			body = new FormData()
			for(var name in data) {
				if(name!=='form-data'){
				    body.append(name, data[name])
				}
			}
		}else{
			body = JSON.stringify(data)
        }
		return body;
    }

	encodeQueryStringFromArray(name, params, index) {
		const keys = Object.keys(params)
		return keys.length
		? keys
		.map(key => name + '[' + index + '][' + encodeURIComponent(key) + ']='
		+ encodeURIComponent(params[key]))
		.join("&")
		: ""
	}
	
	encodeQueryString(filters){
		var url = '';
		Object.keys(filters).forEach(function(key) {
			if (Array.isArray(filters[key])) {
				filters[key].map(function (item, index) {
					if(item!==null){
						url +=key+'='+item+'&'
					}
					return true
				},this);
			}
			else {
				if (filters[key]) {
					url += `${key}=${filters[key]}&`
				}
			}
		},this)
		return url.substring(0, url.length-1);
	}
}

var Network = new Networking();

export default Network