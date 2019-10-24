import Network from './Network';

class Api {
  async functionPOST(data) {
    return await Network.post('ruta', data);
  }

  async Login(data) {
    const response = await Network.get('ruta', data);
    if (response) {
      return response;
    }
  }

  async RecuperarContrasenia(data) {
    const response = await Network.get('ruta', data);
    if (response) {
      return response;
    }
  }
}

export default (new Api());
