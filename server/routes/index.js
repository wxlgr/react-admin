
const menu = require('./menu');
const main = require('./main');
const area = require('./area');
const upload = require('./upload');
const user = require('./user');

const product = require('./product');
const overview = require('./overview');

module.exports = function (app) {
    app.use('/api/menu', menu)
    app.use('/api/main', main)
    app.use('/api/area', area)
    app.use('/api/upload', upload)
    app.use('/api/user', user)
    app.use('/api/product', product)
    app.use('/api/overview', overview)
}