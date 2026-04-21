require('dotenv').config();

module.exports = {
    URLS: {
        BASE_URL: process.env.BASE_URL,
        PRODUCTS: '/inventory.html',
        SHOOPING_CART: '/cart.html'
    },
    USER_CREDENTIALS: {
        VALID_USER: {
            USERNAME: process.env.USERNAME,
            PASSWORD: process.env.PASSWORD
        },
        INVALID_USER: {
            USERNAME: 'usuario_invalido',
            PASSWORD: 'prueba1234'
        }
    },
    MESSAGES: {
        LOGIN: {
            ERROR: {
                PASSWORD_IS_REQUIRED: 'Epic sadface: Password is required',
                USERNAME_IS_REQUIRED: 'Epic sadface: Username is required',
                USERNAME_AND_PASSWORD_DOES_NOT_MATCH: 'Epic sadface: Username and password do not match any user in this service'
            }
        }
    },
    PRODUCT_NAMES: [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt'
    ],
    DEFAULT_TIMEOUT: 15000
};