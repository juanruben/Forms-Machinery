import Network from './Network';

class Api {

    
	async functionPOST(data) {
		return await Network.post('ruta',data)
	}
	
    async functionGET(data) {
		let response = await Network.get('ruta',data)
		if (response) {
			return response;
		}
	}
}

export default (new Api())