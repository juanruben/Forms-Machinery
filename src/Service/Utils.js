
export function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export function validateUsername(username) {
    const regex = /^[a-z]+$/;
    return regex.test(String(username).toLowerCase());
}

export function validatePassword(password) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    return regex.test(String(password));
}
