module.exports.validateRegisterInput = (
    email,
    password,
    confirmPassword
) => {
    const errors = {};

    if(email.trim() === '') {
        errors.email = 'Email is required';
    } else {
        const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if(!email.match(emailRegEx)) {
            errors.email = 'Email must be a valid email address';
        }
    }

    if(password === '') {
        errors.password = 'Password is required';
    } else if(password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (email, password) => {
    const errors = {};

    if(email.trim() === '') {
        errors.email = 'Email is required';
    }

    if(password.trim() === '') {
        errors.password = 'Password is required';
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}