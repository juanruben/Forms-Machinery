class Session {
	openSession = (token, rut, usuario, correo) => {
		localStorage.setItem('token', token)
		localStorage.setItem('rut', rut)
		localStorage.setItem('usuario', usuario)
		localStorage.setItem('correo', correo)
	}
	isAuth= () => {
		let isAuth = ("token" in localStorage)
		return isAuth
		 
	}
	getInfoUser = () => {
		return {
			token:localStorage.getItem("token"),
			rut:localStorage.getItem("rut"),
			correo:localStorage.getItem("correo"),
			usuario:localStorage.getItem("usuario"),
		}
	}
	close = () => {
		localStorage.clear()		
	}
}
export default new Session()