const jwt = require('express-jwt');

module.exports = jwt({ secret: process.env.HASH_SECRET, algorithms: ['HS256'] });