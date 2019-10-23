class Session {
	openSession = (token, rut, nombre, telefono, email, perfil) => {
		localStorage.setItem('token', token)
		localStorage.setItem('rut', rut)
		localStorage.setItem('nombre', nombre)
		localStorage.setItem('telefono', telefono)
		localStorage.setItem('email', email)
		localStorage.setItem('perfil', perfil)
	}
	isAuth= () => {
		let isAuth = ("token" in localStorage)
		return isAuth
		 
	}
	getInfoUser = () => {
		return {
			token:localStorage.getItem("token"),
			rut:localStorage.getItem("rut"),
			nombre:localStorage.getItem("nombre"),
			telefono:localStorage.getItem("telefono"),
			email:localStorage.getItem("email"),
			perfil:localStorage.getItem("perfil"),
		}
	}
	close = () => {
		localStorage.clear()		
	}
}
export default new Session()