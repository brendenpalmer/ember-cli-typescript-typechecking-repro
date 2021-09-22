'use strict';

const path = require('path');
const fs = require('fs');
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const Funnel = require('broccoli-funnel');

module.exports = function (defaults) {
  const overrides = {
    name: 'dummy',
    configPath: './tests/dummy/config/environment',
    trees: {
      app: path.resolve(__dirname, 'tests/dummy/app'),
      public: path.resolve(__dirname, 'tests/dummy/public'),
      styles: path.resolve(__dirname, 'tests/dummy/app/styles'),
      templates: path.resolve(__dirname, 'tests/dummy/app/templates'),
      tests: new Funnel(path.resolve(__dirname, 'tests'), {
        exclude: [/^dummy/],
      }),
      vendor: null,
    },
    jshintrc: {
      tests: './tests',
      app: './tests/dummy',
    },
  };

  if (!fs.existsSync('tests/dummy/app')) {
    overrides.trees.app = null;
    overrides.trees.styles = null;
    overrides.trees.templates = null;
  }

  if (fs.existsSync('tests/dummy/vendor')) {
    overrides.trees.vendor = 'tests/dummy/vendor';
  }

  let app = new EmberAddon(defaults, overrides);

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
