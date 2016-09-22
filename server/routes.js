/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

    // Insert routes below
    // app.use('/api/wp', require('./api/wp'));
    app.use('/api/contact', require('./api/contact'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets|form-builder)/*')
        .get(errors[404]);

    app.route('/about')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/about.html');
        });

    // All other routes should redirect to the index.html
    app.route('/')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });

    app.route('/*')
        .get(errors[404]);

};
