/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-shake',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    shake: {
      server: 'https://ember-shake.herokuapp.com',
      threshold: 20,
      timeout: 1000
    },

    EmberENV: {
      FEATURES: {
      },
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },

    'ember-websockets': {
      socketIO: true
    },

    APP: {
    }
  };

  if (environment === 'development') {
  }

  if (environment === 'test') {
    ENV.locationType = 'none';

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
