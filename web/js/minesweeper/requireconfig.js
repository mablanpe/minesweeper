requirejs.config({
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        jquery: 'lib/jquery-2/dist/jquery',
        underscore: 'lib/lodash/dist/lodash',
        backbone: 'lib/backbone/backbone',
        marionette: 'lib/backbone.marionette/lib/core/backbone.marionette',
        "backbone.wreqr": 'lib/backbone.wreqr/lib/backbone.wreqr',
        "backbone.babysitter": 'lib/backbone.babysitter/lib/backbone.babysitter',
        text: 'lib/requirejs-text/text',
        bootstrap: 'lib/bootstrap/dist/js/bootstrap',
        socketio: 'lib/socket.io-client/socket.io'
    },

    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    }
});