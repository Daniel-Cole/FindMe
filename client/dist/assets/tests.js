define('find-me-ember/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('find-me-ember/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('find-me-ember/tests/components/google-map.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/google-map.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/google-map.js should pass jshint.\ncomponents/google-map.js: line 35, col 186, Missing semicolon.\ncomponents/google-map.js: line 28, col 36, \'map\' is defined but never used.\ncomponents/google-map.js: line 47, col 179, Missing semicolon.\ncomponents/google-map.js: line 59, col 183, Missing semicolon.\ncomponents/google-map.js: line 53, col 35, \'map\' is defined but never used.\ncomponents/google-map.js: line 72, col 180, Missing semicolon.\ncomponents/google-map.js: line 66, col 36, \'map\' is defined but never used.\ncomponents/google-map.js: line 12, col 23, \'google\' is not defined.\ncomponents/google-map.js: line 17, col 22, \'google\' is not defined.\ncomponents/google-map.js: line 18, col 22, \'google\' is not defined.\ncomponents/google-map.js: line 19, col 22, \'google\' is not defined.\ncomponents/google-map.js: line 20, col 22, \'google\' is not defined.\n\n12 errors');
  });
});
define('find-me-ember/tests/components/lobby-member.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/lobby-member.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/lobby-member.js should pass jshint.');
  });
});
define('find-me-ember/tests/components/modal-list-item.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components/modal-list-item.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/modal-list-item.js should pass jshint.');
  });
});
define('find-me-ember/tests/controllers/home.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/home.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/home.js should pass jshint.\ncontrollers/home.js: line 5, col 26, Missing semicolon.\ncontrollers/home.js: line 70, col 40, Missing semicolon.\ncontrollers/home.js: line 81, col 64, \'enumerable\' is defined but never used.\ncontrollers/home.js: line 81, col 57, \'index\' is defined but never used.\ncontrollers/home.js: line 81, col 21, \'lobbies\' is defined but never used.\ncontrollers/home.js: line 152, col 33, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/home.js: line 1, col 16, \'Ember\' is not defined.\ncontrollers/home.js: line 13, col 9, \'$\' is not defined.\ncontrollers/home.js: line 50, col 13, \'$\' is not defined.\ncontrollers/home.js: line 65, col 13, \'$\' is not defined.\ncontrollers/home.js: line 75, col 13, \'$\' is not defined.\ncontrollers/home.js: line 99, col 39, \'$\' is not defined.\ncontrollers/home.js: line 115, col 27, \'$\' is not defined.\ncontrollers/home.js: line 126, col 27, \'$\' is not defined.\ncontrollers/home.js: line 136, col 13, \'$\' is not defined.\ncontrollers/home.js: line 145, col 13, \'$\' is not defined.\n\n16 errors');
  });
});
define('find-me-ember/tests/controllers/lobby.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/lobby.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/lobby.js should pass jshint.\ncontrollers/lobby.js: line 9, col 28, \'transition\' is defined but never used.\ncontrollers/lobby.js: line 17, col 21, \'data\' is defined but never used.\ncontrollers/lobby.js: line 71, col 11, \'lobbyMembers\' is defined but never used.\ncontrollers/lobby.js: line 86, col 57, Expected \'===\' and instead saw \'==\'.\ncontrollers/lobby.js: line 97, col 13, \'members\' is already defined.\ncontrollers/lobby.js: line 112, col 24, Expected \'===\' and instead saw \'==\'.\ncontrollers/lobby.js: line 122, col 31, Expected \'===\' and instead saw \'==\'.\ncontrollers/lobby.js: line 133, col 31, Expected \'===\' and instead saw \'==\'.\ncontrollers/lobby.js: line 137, col 31, Expected \'===\' and instead saw \'==\'.\ncontrollers/lobby.js: line 163, col 16, \'i\' is already defined.\ncontrollers/lobby.js: line 192, col 43, Missing semicolon.\ncontrollers/lobby.js: line 189, col 10, Don\'t make functions within a loop.\ncontrollers/lobby.js: line 216, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/lobby.js: line 216, col 50, Expected \'===\' and instead saw \'==\'.\ncontrollers/lobby.js: line 221, col 13, \'location\' is already defined.\ncontrollers/lobby.js: line 222, col 28, Expected \'===\' and instead saw \'==\'.\ncontrollers/lobby.js: line 222, col 50, Expected \'===\' and instead saw \'==\'.\ncontrollers/lobby.js: line 240, col 70, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/lobby.js: line 1, col 16, \'Ember\' is not defined.\ncontrollers/lobby.js: line 30, col 23, \'$\' is not defined.\ncontrollers/lobby.js: line 39, col 27, \'$\' is not defined.\ncontrollers/lobby.js: line 120, col 11, \'$\' is not defined.\ncontrollers/lobby.js: line 130, col 11, \'$\' is not defined.\ncontrollers/lobby.js: line 197, col 13, \'$\' is not defined.\ncontrollers/lobby.js: line 210, col 7, \'$\' is not defined.\ncontrollers/lobby.js: line 253, col 7, \'$\' is not defined.\ncontrollers/lobby.js: line 175, col 26, \'google\' is not defined.\ncontrollers/lobby.js: line 176, col 25, \'google\' is not defined.\ncontrollers/lobby.js: line 180, col 19, \'google\' is not defined.\ncontrollers/lobby.js: line 190, col 11, \'google\' is not defined.\ncontrollers/lobby.js: line 219, col 27, \'google\' is not defined.\ncontrollers/lobby.js: line 225, col 27, \'google\' is not defined.\ncontrollers/lobby.js: line 237, col 24, \'google\' is not defined.\ncontrollers/lobby.js: line 246, col 28, \'google\' is not defined.\n\n34 errors');
  });
});
define('find-me-ember/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 1, col 16, \'Ember\' is not defined.\ncontrollers/login.js: line 27, col 21, \'$\' is not defined.\n\n2 errors');
  });
});
define('find-me-ember/tests/controllers/register.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/register.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/register.js should pass jshint.\ncontrollers/register.js: line 2, col 21, \'data\' is defined but never used.\ncontrollers/register.js: line 45, col 58, Expected \'!==\' and instead saw \'!=\'.\ncontrollers/register.js: line 64, col 11, \'obj\' is defined but never used.\ncontrollers/register.js: line 1, col 16, \'Ember\' is not defined.\ncontrollers/register.js: line 85, col 21, \'$\' is not defined.\ncontrollers/register.js: line 96, col 10, \'invalidateField\' is defined but never used.\n\n6 errors');
  });
});
define('find-me-ember/tests/helpers/check-id.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/check-id.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/check-id.js should pass jshint.');
  });
});
define('find-me-ember/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('find-me-ember/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('find-me-ember/tests/helpers/lobby-id-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/lobby-id-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/lobby-id-helper.js should pass jshint.');
  });
});
define('find-me-ember/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'find-me-ember/tests/helpers/start-app', 'find-me-ember/tests/helpers/destroy-app'], function (exports, _qunit, _findMeEmberTestsHelpersStartApp, _findMeEmberTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _findMeEmberTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _findMeEmberTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('find-me-ember/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('find-me-ember/tests/helpers/ms-sec.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/ms-sec.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/ms-sec.js should pass jshint.');
  });
});
define('find-me-ember/tests/helpers/resolver', ['exports', 'find-me-ember/resolver', 'find-me-ember/config/environment'], function (exports, _findMeEmberResolver, _findMeEmberConfigEnvironment) {

  var resolver = _findMeEmberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _findMeEmberConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _findMeEmberConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('find-me-ember/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('find-me-ember/tests/helpers/start-app', ['exports', 'ember', 'find-me-ember/app', 'find-me-ember/config/environment'], function (exports, _ember, _findMeEmberApp, _findMeEmberConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _findMeEmberConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _findMeEmberApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('find-me-ember/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('find-me-ember/tests/helpers/username-color.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/username-color.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/username-color.js should pass jshint.');
  });
});
define('find-me-ember/tests/integration/components/google-map-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('google-map', 'Integration | Component | google map', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 14
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'google-map', ['loc', [null, [1, 0], [1, 14]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.4.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'google-map', [], [], 0, null, ['loc', [null, [2, 4], [4, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('find-me-ember/tests/integration/components/google-map-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/google-map-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/google-map-test.js should pass jshint.');
  });
});
define('find-me-ember/tests/integration/components/modal-list-item-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('modal-list-item', 'Integration | Component | modal list item', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 19
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'modal-list-item', ['loc', [null, [1, 0], [1, 19]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.4.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.4.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'modal-list-item', [], [], 0, null, ['loc', [null, [2, 4], [4, 24]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('find-me-ember/tests/integration/components/modal-list-item-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components/modal-list-item-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/modal-list-item-test.js should pass jshint.');
  });
});
define('find-me-ember/tests/models/lobby.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/lobby.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/lobby.js should pass jshint.');
  });
});
define('find-me-ember/tests/models/session.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models/session.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/session.js should pass jshint.');
  });
});
define('find-me-ember/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('find-me-ember/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('find-me-ember/tests/routes/lobby.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/lobby.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/lobby.js should pass jshint.');
  });
});
define('find-me-ember/tests/routes/session.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/session.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/session.js should pass jshint.');
  });
});
define('find-me-ember/tests/test-helper', ['exports', 'find-me-ember/tests/helpers/resolver', 'ember-qunit'], function (exports, _findMeEmberTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_findMeEmberTestsHelpersResolver['default']);
});
define('find-me-ember/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('find-me-ember/tests/unit/models/lobby-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('lobby', 'Unit | Model | lobby', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('find-me-ember/tests/unit/models/lobby-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models/lobby-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/lobby-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('find-me-ember/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map