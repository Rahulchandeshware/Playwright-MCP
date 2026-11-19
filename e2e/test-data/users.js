export const USERS = {
    validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    lockedOutUser: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },
    invalidUser: {
        username: 'invalid_user',
        password: 'invalid_password'
    }
};

export const ERROR_MESSAGES = {
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    lockedOutUser: 'Epic sadface: Sorry, this user has been locked out.'
};
