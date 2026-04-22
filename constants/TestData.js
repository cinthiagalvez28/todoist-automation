require('dotenv').config();

module.exports = {
    URLS: {
        BASE_URL: process.env.BASE_URL,
        PRODUCTS: '/inventory.html',
        SHOPPING_CART: '/cart.html',
        YOUR_INFORMATION: '/checkout-step-one.html',
        OVERVIEW: '/checkout-step-two.html',
        COMPLETE: 'checkout-complete.html'
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
        },
        YOUR_INFORMATION: {
            ERROR: {
                FIRST_NAME_IS_REQUIRED: 'Error: First Name is required',
                LAST_NAME_IS_REQUIRED: 'Error: Last Name is required',
                POSTAL_CODE_IS_REQUIRED: 'Error: Postal Code is required'
            }
        },
        COMPLETE:{
            HEADER:'Thank you for your order!',
            TEXT: 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
        }
    },
    PRODUCT_NAMES: [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt'
    ],
    DEFAULT_TIMEOUT: 15000
};