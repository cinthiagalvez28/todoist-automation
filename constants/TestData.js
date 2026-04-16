require('dotenv').config();

module.exports = {
  URLS: {
    BASE_URL: process.env.BASE_URL,
    LOGIN: '/auth/login',
    TODAY: '/app/today'
  },
  USER_CREDENTIALS: {
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD
  }
};