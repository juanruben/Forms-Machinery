import Network from './Network';

class Api {
    static async functionPOST(data) {
        const response = await Network.post('ruta', data);
        if (response) {
            return response;
        }
        return null;
    }

    static async Login(data) {
        const response = await Network.post('ruta', data);
        if (response) {
            return response;
        }
        return null;
    }

    static async RecuperarContrasenia(data) {
        const response = await Network.get('ruta', data);
        if (response) {
            return response;
        }
        return null;
    }
}

export default Api;
