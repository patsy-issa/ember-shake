/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    babel: {
      optional: ['es7.decorators', 'es7.functionBind']
    },
    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  app.import('bower_components/shake.js/shake.js');

  return app.toTree();
};
