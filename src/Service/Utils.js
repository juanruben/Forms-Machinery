
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

export function validateEmailList(emails) {
    const array = emails.split(',');
    for (let i = 0; i < array.length; i += 1) {
        const email = array[i].trim();
        if (!validateEmail(email)) {
            return false;
        }
    }
    return true;
}

export function dateToLocale(value) {
    const [date, time] = value.split(' ');
    let [year, month, day] = date.split('-');
    let [hh, mm, ss] = time.split(':');
    const d = new Date(Date.UTC(year, month - 1, day, hh, mm, ss));

    year = d.getFullYear();

    month = d.getMonth() + 1;
    month = (month < 10) ? (`0${month}`) : month;

    day = d.getDate();
    day = (day < 10) ? (`0${day}`) : day;

    hh = d.getHours();
    hh = (hh < 10) ? (`0${hh}`) : hh;

    mm = d.getMinutes();
    mm = (mm < 10) ? (`0${mm}`) : mm;

    ss = d.getSeconds();
    ss = (ss < 10) ? (`0${ss}`) : ss;

    return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
}
