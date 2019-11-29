
export function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export function validateUsername(username) {
    const regex = /^[a-z0-9]+$/;
    return regex.test(username);
}

export function validatePassword(password) {
    // Al menos: un número, una minúscula, una mayúscula y seis caracteres
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    return regex.test(String(password));
}

export function encode(value) {
    return btoa(btoa(btoa(value)));
}

export function decode(value) {
    return atob(atob(atob(value)));
}

export function formatRut(rut) {
    if (rut) {
        return rut.replace(/[.-]/g, '').replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
    }
    return '';
}

export function unformatRut(rut) {
    return rut ? rut.replace(/\./g, '') : '';
}

export function validateRut(rutValue) {
    const rut = unformatRut(rutValue);
    const rexp = new RegExp(/^([0-9])+-([kK0-9])+$/);
    if (rut.match(rexp)) {
        const RUT = rut.split('-');
        const elRut = RUT[0].split('');
        let factor = 2;
        let suma = 0;
        let dv;
        for (let i = (elRut.length - 1); i >= 0; i--) {
            factor = factor > 7 ? 2 : factor;
            suma += parseInt(elRut[i]) * parseInt(factor++);
        }
        dv = 11 - (suma % 11);
        if (dv === 11) {
            dv = 0;
        } else if (dv === 10) {
            dv = 'k';
        }

        if (dv.toString() === RUT[1].toLowerCase()) {
            return true;
        }
        return false;
    }
    return false;
}

export function formatPhone(phone) {
    if (phone) {
        return phone.replace(/[.-]/g, '').replace(/^(\d{3})(\d{4})(\d{4})$/, '($1) $2 $3');
    }
    return '';
}

export function unformatPhone(phone) {
    return phone ? phone.replace(/[^0-9.]/g, '') : '';
}
