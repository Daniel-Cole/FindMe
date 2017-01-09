"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('find-me-ember/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].RESTAdapter.extend({
		namespace: 'rest'
	});
});
define('find-me-ember/app', ['exports', 'ember', 'find-me-ember/resolver', 'ember-load-initializers', 'find-me-ember/config/environment'], function (exports, _ember, _findMeEmberResolver, _emberLoadInitializers, _findMeEmberConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _findMeEmberConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _findMeEmberConfigEnvironment['default'].podModulePrefix,
    Resolver: _findMeEmberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _findMeEmberConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('find-me-ember/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'find-me-ember/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _findMeEmberConfigEnvironment) {

  var name = _findMeEmberConfigEnvironment['default'].APP.name;
  var version = _findMeEmberConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('find-me-ember/components/google-map', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        insertMap: (function () {
            var options = {
                center: new window.google.maps.LatLng(-41.294123, 174.777737),
                zoom: 15,
                disableDefaultUI: true
            };
            var map = new google.maps.Map(document.getElementsByClassName('map-canvas')[0], options);
            var mapOptionsControl = this.createOptionsControl(map);
            var mapSearchControl = this.createSearchControl(map);
            var mapCenterControl = this.createCenterControl(map);
            var mapRefreshControl = this.createRefreshControl(map);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(mapOptionsControl);
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapSearchControl);
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(mapCenterControl);
            map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(mapRefreshControl);

            //create a search icon in center to search for people
            //create a center icon on right
            //glyphicon glyphicon-screenshot
            //glyphicon glyphicon-search
        }).on('didInsertElement'),

        createOptionsControl: function createOptionsControl(map) {
            // Create a div to hold the control.
            var controlDiv = document.createElement('div');
            // Set CSS for the control border
            var controlUI = document.createElement('div');
            controlUI.style.marginTop = '5px';
            controlUI.style.marginLeft = '5px';
            controlUI.innerHTML = '<button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-align-justify" aria-hidden="true"></span></button>';
            controlDiv.appendChild(controlUI);

            this.sendAction('action', 'options', controlUI);

            return controlDiv;
        },
        createSearchControl: function createSearchControl(map) {
            var controlDiv = document.createElement('div');
            // Set CSS for the control border
            var controlUI = document.createElement('div');
            controlUI.style.marginTop = '5px';
            controlUI.innerHTML = '<button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>';
            controlDiv.appendChild(controlUI);
            this.sendAction('action', 'search', controlUI, map);

            return controlDiv;
        },
        createCenterControl: function createCenterControl(map) {
            var controlDiv = document.createElement('div');
            // Set CSS for the control border
            var controlUI = document.createElement('div');
            controlUI.style.marginTop = '5px';
            controlUI.style.marginRight = '5px';
            controlUI.innerHTML = '<button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-screenshot" aria-hidden="true"></span></button>';
            controlDiv.appendChild(controlUI);

            this.sendAction('action', 'center', controlUI);

            return controlDiv;
        },
        createRefreshControl: function createRefreshControl(map) {
            var controlDiv = document.createElement('div');
            // Set CSS for the control border
            var controlUI = document.createElement('div');
            controlUI.style.marginBottom = '5px';
            controlUI.style.marginRight = '5px';
            controlUI.innerHTML = '<button type="button" class="btn btn-default" aria-label="Left Align"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>';
            controlDiv.appendChild(controlUI);

            this.sendAction('action', 'refresh', controlUI);

            return controlDiv;
        }
    });
});
define('find-me-ember/components/lobby-member', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('find-me-ember/components/modal-list-item', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('find-me-ember/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('find-me-ember/controllers/home', ['exports'], function (exports) {
    exports['default'] = Ember.Controller.extend({
        passwordLengthObserver: (function (data) {
            console.log(data);
            var self = this;
            console.log(self);
            console.log("changing....");
        }).observes('lobby-password'),

        success: function success(data) {
            console.log('attempting to join new lobby');
            var lobbyToken = data.lobbyToken;
            console.log(lobbyToken);
            $('#myModal').modal('hide');
            this.set('isProcessing', false);
            //transition to route and pass hash to new controller
            this.transitionToRoute('/lobby').then(function (newRoute) {
                newRoute.controller.set('lobbyToken', lobbyToken);
                newRoute.controller.send('updateSession', true);
            });
        },
        failure: function failure(data) {
            this.set('loginFailed', true);
            this.set('isProcessing', false);
            this.set('failedMessage', JSON.parse(data.responseText).message);
        },

        actions: {
            createFailed: false,
            isProcessing: false,
            failedMessage: "",
            modalTitle: "",
            creatingLobby: false,
            viewingLobbies: false,
            modalVisible: false,
            addingFriends: false,
            settingPreferences: false,
            lobbies: [],
            diplayPassword: false,
            activeLobbyID: -1,
            activeLobbyAuth: false,

            createLobbyModal: function createLobbyModal() {
                this.set("modalTitle", "Create a Lobby");
                this.set('joinLobby', false);
                this.set('viewingLobbies', false);
                this.set('joiningLobby', false);
                this.set('settingPreferences', false);
                this.set('addingFriends', false);
                this.set("creatingLobby", true);
                $('#myModal').modal();
            },
            viewLobbiesModal: function viewLobbiesModal() {
                this.set("modalTitle", "Viewing your Lobbies");
                this.set('joinLobby', false);
                this.set('joiningLobby', false);
                this.set('creatingLobby', false);
                this.set("viewingLobbies", true);
                this.set('settingPreferences', false);
                this.set('addingFriends', false);
                this.set('activeLobbyID', -1);
                this.set('activeLobbyAuth', false);
                //this will get all the lobbies that the user is currently
                //authenticated into
                this.set('lobbies', this.store.findAll('lobby'));
                $('#myModal').modal();
            },
            joinLobbyModal: function joinLobbyModal() {
                console.log("joinin lob yo");
                this.set("modalTitle", "Join a lobby");
                this.set('joinLobby', true);
                this.set('creatingLobby', false);
                this.set("viewingLobbies", false);
                this.set('settingPreferences', false);
                this.set('addingFriends', false);
                $('#myModal').modal();
            },
            joinLobby: function joinLobby(id) {
                //need to get lobbyOwner and lobbyName
                var obj = this;
                this.store.findAll('lobby').then(function (result) {
                    var lobbies = result.map(function (item, index, enumerable) {
                        var lobbyToJoin;
                        if (item.get('id') === id) {
                            var auth = item.get('authenticated');
                            if (auth) {
                                lobbyToJoin = {
                                    'lobbyName': item.get('lobbyName'),
                                    'owner': item.get('owner')
                                };
                            } else {
                                lobbyToJoin = {
                                    'lobbyName': item.get('lobbyName'),
                                    'owner': item.get('owner'),
                                    'password': document.getElementById('lobby-' + id + '-password').value
                                };
                            }
                            console.log("Attempting to join lobby: " + lobbyToJoin);
                            //if user isn't authenticated then we need the password
                            var request = $.post("/rest/joinLobby", lobbyToJoin);
                            request.then(obj.success.bind(obj), obj.failure.bind(obj));
                            return;
                        }
                    });
                });
            },
            joinLobbySpecified: function joinLobbySpecified() {
                var lobbyName = this.getProperties('lobbyName').lobbyName;
                var owner = this.getProperties('lobbyOwner').lobbyOwner;
                var password = this.getProperties('password').password;
                var lobbyToJoin = {
                    'lobbyName': lobbyName,
                    'owner': owner,
                    'password': password
                };
                var request = $.post("/rest/joinLobby", lobbyToJoin);
                request.then(this.success.bind(this), this.failure.bind(this));
            },
            createLobby: function createLobby() {
                console.log("attempting to create lobby: ");

                this.setProperties({
                    createFailed: false,
                    isProcessing: true
                });

                var request = $.post("/rest/createLobby", this.getProperties('lobbyName', 'password'));
                request.then(this.success.bind(this), this.failure.bind(this));
            },
            addFriends: function addFriends() {
                console.log("add friends");
                this.set('viewingLobbies', false);
                this.set('joiningLobby', false);
                this.set("creatingLobby", false);
                this.set('settingPreferences', false);
                this.set('addingFriends', true);
                $('#myModal').modal();
            },
            preferences: function preferences() {
                console.log("preferences");
                this.set('viewingLobbies', false);
                this.set('joiningLobby', false);
                this.set("creatingLobby", false);
                this.set('settingPreferences', true);
                this.set('addingFriends', false);
                $('#myModal').modal();
            },
            logout: function logout() {
                console.log("logout");
            },
            setSelectedLobby: function setSelectedLobby(lobbyID, authenticated, activeLobbyID, activeLobbyAuth) {
                //deselect previous lobby
                if (activeLobbyID != -1) {
                    //deselect an element
                    if (activeLobbyAuth) {
                        document.getElementById('lobby-' + activeLobbyID).setAttribute("class", "list-group-item modal-list-item modal-list-item-auth");
                    } else {
                        this.set('displayPassword', false);
                        document.getElementById('lobby-' + activeLobbyID).setAttribute("class", "list-group-item modal-list-item modal-list-item-no-auth");
                    }
                }

                this.set('activeLobbyID', lobbyID);
                this.set('activeLobbyAuth', authenticated);
                //select selected lobby
                if (authenticated) {
                    document.getElementById('lobby-' + lobbyID).setAttribute("class", "list-group-item modal-list-item modal-list-item-auth");
                    this.set('displayPassword', false);
                } else {
                    //we need to display password field
                    document.getElementById('lobby-' + lobbyID).setAttribute("class", "list-group-item modal-list-item modal-list-item-no-auth");
                    this.set('displayPassword', true);
                }
            }
        }

    });
});
define('find-me-ember/controllers/lobby', ['exports'], function (exports) {
  exports['default'] = Ember.Controller.extend({
    init: function init() {
      this.set('colorsDict', []);
      this.set('colors', ["#b22d2d", "#ff2200", "#400900", "#e6bbac", "#662900", "#ff8c40"]);
      this.set('updating', true);
      this.set('updateInterval', 10000);
      this.updateLocation();
    },
    willTransition: function willTransition(transition) {
      console.log('moving away m9');
    },
    success: function success(data) {
      console.log('Updated position' + data);
      //now update map
      this.send('updateSession', false);
    },
    failure: function failure(data) {
      this.set('updating', false);
      alert('failed to update your location');
    },
    updateLocation: function updateLocation() {
      if (!this.get('updating')) {
        console.log('no longer updating position');
        return;
      }
      //usition every 5 seconds.
      var obj = this;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (data) {
          var request = $.post("/rest/sessions?lobbyToken=" + obj.get('lobbyToken'), {
            'lat': data.coords.latitude,
            'lng': data.coords.longitude
          });
          request.then(obj.success.bind(obj), obj.failure.bind(obj));
        }, obj.failure.bind(obj));
        setInterval(function () {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (data) {
              var request = $.post("/rest/sessions?lobbyToken=" + obj.get('lobbyToken'), {
                'lat': data.coords.latitude,
                'lng': data.coords.longitude
              });
              request.then(obj.success.bind(obj), obj.failure.bind(obj));
            }, obj.failure.bind(obj));
          }
        }, obj.get('updateInterval'));
      } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
      }
    },
    actions: {
      loginFailed: false,
      isProcessing: false,
      failedMessage: "",
      members: [],
      hiddenMembers: [],
      map: [],
      markers: [],
      modalOptions: false,
      modalSearch: false,
      modalTitle: '',
      //add
      updateSession: function updateSession(init) {
        //use glyphicon glyphicon-cog for settings
        //use glyphicon glyphicon-align-justify for menu
        var obj = this;
        obj.set('members', []);
        //pass through the lobby hash with this.get('lobbyHash');
        //lobbyHash is passed to this controller from the
        //home controller
        var lobbyMembers = this.store.queryRecord('session', {
          lobbyToken: this.get('lobbyToken')
        }).then(function (session) {
          console.log(session.get('lobbyName'));
          obj.set('members', session.get('lobbyMembers'));
          obj.send('updateMap', init);
        });
      },
      checkHash: function checkHash() {
        console.log('check Hash: ' + this.get('lobbyToken'));
      },
      toggleMember: function toggleMember(username) {
        if (this.get('hiddenMembers') === undefined) {
          this.set('hiddenMembers', []);
        }
        if (this.get('hiddenMembers').indexOf(username) == -1) {
          //this means we haven't already hidden this member
          //so let's hide the fucker
          var members = this.get('hiddenMembers');
          members.push(username);
          this.set('hiddenMembers', members);
          document.getElementById('lobby-member-list-' + username).setAttribute("class", "list-group-item disabled modal-list-item");
          document.getElementById('lobby-member-button-' + username).innerHTML = 'Show';
          this.send('updateMap');
        } else {
          var index = this.get('hiddenMembers').indexOf(username);
          var members = this.get('hiddenMembers');
          members.splice(index, index + 1);
          this.set('hiddenMembers', members);
          document.getElementById('lobby-member-list-' + username).setAttribute("class", "list-group-item modal-list-item");
          document.getElementById('lobby-member-button-' + username).innerHTML = 'Hide';
          this.send('updateMap');
        }
      },
      defineButtonAction: function defineButtonAction(actionType, element, map) {
        //map will get passed with first map button create
        console.log('here');
        var obj = this;
        if (map !== undefined) {
          this.set('map', map);
        }
        if (actionType == 'options') {
          element.addEventListener('click', function () {
            console.log('options');
            //bring out sidebar
            obj.set('modalTitle', 'Lobby options');
            obj.set('displayMemberModal', false);
            obj.set('modalOptions', true);
            obj.set('modalSearch', false);
            $('#lobbyModal').modal();
          });
        } else if (actionType == 'search') {
          element.addEventListener('click', function () {
            console.log('search');
            //display the list of users in a modal
            obj.set('modalTitle', 'Viewing lobby members');
            obj.set('displayMemberModal', false);
            obj.set('modalOptions', false);
            obj.set('modalSearch', true);
            $('#lobbyModal').modal();
            //here we could probably update the colors?
          });
        } else if (actionType == 'center') {
            element.addEventListener('click', function () {
              obj.send('centerMe');
            });
          } else if (actionType == 'refresh') {
            element.addEventListener('click', function () {
              obj.send('updateMap', true);
            });
          }
      },
      updateMap: function updateMap(init) {
        var obj = this;
        if (this.get('markers') === undefined) {
          this.set('markers', []);
        }
        var markers = this.get('markers');
        //need to clear all markers from map
        if (markers.length > 0) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
        }

        //clear all current markers
        this.set('markers', []);
        markers = [];

        var members = this.get('members');

        var hiddenMembers = this.get('hiddenMembers');
        for (var i = 0; i < members.length; i++) {
          if (hiddenMembers !== undefined) {
            if (hiddenMembers.indexOf(members[i].username) >= 0) {
              continue;
            }
          }
          //first member is self
          // can get marker with marker.get('username')
          var latLng = members[i].location;

          //doesn't want to take my lat/lng combo....
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: this.get('map'),
            username: members[i].username,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: this.get('colors')[i],
              fillOpacity: 1,
              strokeWeight: 1
            }
          });

          //javascriptttt yayyy
          (function (marker, member, obj) {
            google.maps.event.addListener(marker, 'click', function () {
              //this is where we want to open up a small modal
              obj.set('memberModal', member);
              obj.set('displayMemberModal', true);
              obj.set('modalSearch', false);
              obj.set('modalOptions', false);
              obj.set('modalTitle', 'Viewing lobby member');
              $('#lobbyModal').modal();
            });
          })(marker, members[i], obj);
          //add markers
          markers.push(marker);
          this.set('markers', markers);
          //now for each marker we need to set bounds
        }
        if (init) {
          this.send('viewAll');
        }
      },
      centerMe: function centerMe(id) {
        $('#lobbyModal').modal('hide');
        var map = this.get('map');

        if (id === undefined) {
          //update this to use google maps one
          var location = this.get('members')[0].location;
          if (location.lat == -1 || location.lng == -1) {
            return;
          }
          map.setCenter(new google.maps.LatLng(location.lat, location.lng));
        } else {
          var location = this.get('members')[id].location;
          if (location.lat == -1 || location.lng == -1) {
            return;
          }
          map.setCenter(new google.maps.LatLng(location.lat, location.lng));
        }
        map.setZoom(15);
      },
      viewAll: function viewAll() {
        //zoom out enough to see all users on current map
        var members = this.get('members');

        if (this.get('hiddenMembers') === undefined) {
          this.set('hiddenMembers', []);
        }

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < members.length; i++) {
          //need to check if the member is hidden
          if (this.get('hiddenMembers').indexOf(members[i].username) != -1) {
            continue;
          }
          //first member is self
          var latLng = members[i].location;
          //doesn't want to take my lat/lng combo....
          var myLatLng = new google.maps.LatLng(latLng.lat, latLng.lng);
          bounds.extend(myLatLng);
        }
        var map = this.get('map');
        map.fitBounds(bounds);
      },
      transitionTo: function transitionTo(route) {
        $('#lobbyModal').modal('hide');
        this.transitionToRoute(route);
      }
    }
  });
});
define('find-me-ember/controllers/login', ['exports'], function (exports) {
  exports['default'] = Ember.Controller.extend({
    success: function success(data) {
      document.cookie = "token=" + data.token;
      this.set('isProcessing', false);
      this.transitionToRoute('login');
    },

    failure: function failure(data) {
      this.set('loginFailed', true);
      this.set('isProcessing', false);
      this.set('failedMessage', JSON.parse(data.responseText).message);
    },

    actions: {

      loginFailed: false,
      isProcessing: false,
      failedMessage: "",

      login: function login() {

        this.setProperties({
          loginFailed: false,
          isProcessing: true
        });

        var request = $.post("/rest/login", this.getProperties("username", "password"));
        request.then(this.success.bind(this), this.failure.bind(this));
      }
    }

  });
});
define('find-me-ember/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('find-me-ember/controllers/register', ['exports'], function (exports) {
  exports['default'] = Ember.Controller.extend({
    success: function success(data) {
      console.log('registration success!');
      this.set('isProcessing', false);
      this.transitionToRoute('home');
    },

    failure: function failure(data) {
      console.log('registration failure!');
      this.set('registerFailed', true);
      this.set('isProcessing', false);
      console.log('SERVER RESPONSE: ' + data);
      console.log(JSON.parse(data.responseText));
      this.set('failedMessage', JSON.parse(data.responseText).message);
    },

    validateUser: function validateUser(username) {
      if (username === undefined) {
        this.set('registerFailedUsername', true);
        this.set('isProcessing', false);
        this.set('failedMessageUsername', 'please enter a username');
        return;
      }
      if (username.length < 4) {
        this.set('registerFailedUsername', true);
        this.set('isProcessing', false);
        this.set('failedMessageUsername', 'Username must be atleast 4 characters long');
        return;
      }
    },

    validatePassword: function validatePassword(password, passwordConfirmation) {
      if (password === undefined) {
        this.set('registerFailedPassword', true);
        this.set('isProcessing', false);
        this.set('failedMessagePassword', 'please enter a password');
        return;
      }
      if (password.length < 6) {
        this.set('registerFailedPassword', true);
        this.set('isProcessing', false);
        this.set('failedMessagePassword', 'password must be atleast 6 characters long');
        return;
      }
      if (passwordConfirmation === undefined || password != passwordConfirmation) {
        this.set('registerFailedPassword', true);
        this.set('isProcessing', false);
        this.set('failedMessagePassword', 'passwords do not match');
        return;
      }
    },

    actions: {

      registerFailed: false,
      registerFailedUsername: false,
      registerFailedPassword: false,
      registerFailedEmail: false,
      isProcessing: false,
      failedMessage: "",

      register: function register() {
        var obj = this;

        this.setProperties({
          registerFailed: false,
          registerFailedUsername: false,
          registerFailedPassword: false,
          registerFailedEmail: false,
          isProcessing: true
        });

        /*
        $.when(this.validateUser(obj.getProperties("username").username)).then(function() {
          //validate password 
          obj.validatePassword(obj.getProperties("password").password, obj.getProperties("passwordConfirmation").passwordConfirmation);
        }).then(function() {
          //validate Q & A
        }).then(function() {
          //send to server
        });
        */
        console.log('sending registration request to server');
        var request = $.post("/rest/register", this.getProperties("username", "password", "email", "securityQuestion", "securityAnswer"));
        request.then(this.success.bind(this), this.failure.bind(this));
      },
      dosomething: function dosomething() {
        console.log('changed me!');
      }
    }
  });

  function invalidateField() {}
});
define('find-me-ember/helpers/check-id', ['exports', 'ember'], function (exports, _ember) {

  var eq = function eq(params) {
    return params[0] === params[1];
  };

  exports['default'] = _ember['default'].Helper.helper(eq);
});
define('find-me-ember/helpers/lobby-id-helper', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Handlebars.makeBoundHelper(function (id) {
    return id;
  });
});
define('find-me-ember/helpers/ms-sec', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Helper.helper(function (ms) {
		return ms / 1000;
	});
});
define('find-me-ember/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('find-me-ember/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('find-me-ember/helpers/username-color', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Helper.helper(function (args) {
		var colorIndex = args[0];
		return args[1][colorIndex];
	});
});
define('find-me-ember/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'find-me-ember/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _findMeEmberConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_findMeEmberConfigEnvironment['default'].APP.name, _findMeEmberConfigEnvironment['default'].APP.version)
  };
});
define('find-me-ember/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('find-me-ember/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('find-me-ember/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('find-me-ember/initializers/export-application-global', ['exports', 'ember', 'find-me-ember/config/environment'], function (exports, _ember, _findMeEmberConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_findMeEmberConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _findMeEmberConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_findMeEmberConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('find-me-ember/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('find-me-ember/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('find-me-ember/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("find-me-ember/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('find-me-ember/models/lobby', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		lobbyName: _emberData['default'].attr('string'),
		owner: _emberData['default'].attr('string'),
		authenticated: _emberData['default'].attr('boolean')
	});
});
define('find-me-ember/models/session', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].Model.extend({
		lobbyName: _emberData['default'].attr('string'),
		owner: _emberData['default'].attr('string'),
		lobbyMembers: _emberData['default'].attr()
	});
});
define('find-me-ember/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('find-me-ember/router', ['exports', 'ember', 'find-me-ember/config/environment'], function (exports, _ember, _findMeEmberConfigEnvironment) {

	var Router = _ember['default'].Router.extend({
		location: _findMeEmberConfigEnvironment['default'].locationType
	});

	Router.map(function () {
		this.route('welcome', {
			path: '/'
		});
		this.route('login');
		this.route('register');
		this.route('home');
		this.route('lobby');
		this.route('recover-account');
	});

	exports['default'] = Router;
});
define('find-me-ember/routes/lobby', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.store.findAll('lobby');
		}
	});
});
define('find-me-ember/routes/session', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.store.findAll('session');
		}
	});
});
define('find-me-ember/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("find-me-ember/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "find-me-ember/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" HEADER ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-12 header");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("FindMe");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" HEADER END ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" CONTENT ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-12 content");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" CONTENT END ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" FOOTER ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-12 footer");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        var el3 = dom.createTextNode("about");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" FOOTER END ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [8]), 1, 1);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [9, 0], [9, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("find-me-ember/templates/components/google-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "find-me-ember/templates/components/google-map.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "map-canvas");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [2, 0], [2, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("find-me-ember/templates/components/lobby-member", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 6
          }
        },
        "moduleName": "find-me-ember/templates/components/lobby-member.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "lobby-member-list");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode(" last updated: ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" seconds ago ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
        return morphs;
      },
      statements: [["content", "member.username", ["loc", [null, [2, 5], [2, 24]]]], ["inline", "ms-sec", [["get", "member.lastUpdated", ["loc", [null, [3, 27], [3, 45]]]]], [], ["loc", [null, [3, 18], [3, 47]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("find-me-ember/templates/components/modal-list-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "find-me-ember/templates/components/modal-list-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("find-me-ember/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.2",
            "loc": {
              "source": null,
              "start": {
                "line": 28,
                "column": 28
              },
              "end": {
                "line": 30,
                "column": 28
              }
            },
            "moduleName": "find-me-ember/templates/home.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "alert alert-info");
            var el2 = dom.createTextNode("Attempting to join lobby");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
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
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.2",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 28
              },
              "end": {
                "line": 33,
                "column": 28
              }
            },
            "moduleName": "find-me-ember/templates/home.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "alert alert-danger control-alert");
            var el2 = dom.createTextNode("Join lobby failed: ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["content", "failedMessage", ["loc", [null, [32, 97], [32, 114]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 20
            },
            "end": {
              "line": 64,
              "column": 20
            }
          },
          "moduleName": "find-me-ember/templates/home.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("                            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "control-group");
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "control-label");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("label");
          var el5 = dom.createTextNode("Lobby Name:");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "controls");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "control-group");
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "control-label");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("label");
          var el5 = dom.createTextNode("Owner:");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "controls");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "control-group");
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "control-label");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("label");
          var el5 = dom.createTextNode("Lobby Password:");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "controls");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "fill-width");
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("button");
          dom.setAttribute(el3, "type", "submit");
          dom.setAttribute(el3, "class", "btn btn-margin-top btn-margin-bottom btn-primary btn-lg fill-width");
          var el4 = dom.createTextNode("\n                                    Join Lobby\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element7 = dom.childAt(fragment, [1]);
          var element8 = dom.childAt(element7, [10, 1]);
          var morphs = new Array(7);
          morphs[0] = dom.createElementMorph(element7);
          morphs[1] = dom.createMorphAt(element7, 1, 1);
          morphs[2] = dom.createMorphAt(element7, 2, 2);
          morphs[3] = dom.createMorphAt(dom.childAt(element7, [4, 3]), 1, 1);
          morphs[4] = dom.createMorphAt(dom.childAt(element7, [6, 3]), 1, 1);
          morphs[5] = dom.createMorphAt(dom.childAt(element7, [8, 3]), 1, 1);
          morphs[6] = dom.createElementMorph(element8);
          return morphs;
        },
        statements: [["element", "action", ["joinLobbySpecified", true], ["on", "submit"], ["loc", [null, [27, 30], [27, 78]]]], ["block", "if", [["get", "isProcessing", ["loc", [null, [28, 34], [28, 46]]]]], [], 0, null, ["loc", [null, [28, 28], [30, 35]]]], ["block", "if", [["get", "loginFailed", ["loc", [null, [31, 34], [31, 45]]]]], [], 1, null, ["loc", [null, [31, 28], [33, 35]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "lobbyName", ["loc", [null, [39, 50], [39, 59]]]]], [], []], "type", "text"], ["loc", [null, [39, 36], [39, 73]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "lobbyOwner", ["loc", [null, [47, 50], [47, 60]]]]], [], []], "type", "text"], ["loc", [null, [47, 36], [47, 74]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [55, 50], [55, 58]]]]], [], []], "type", "password"], ["loc", [null, [55, 36], [55, 76]]]], ["element", "bindAttr", [], ["disabled", "isProcessing"], ["loc", [null, [59, 129], [59, 165]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.2",
            "loc": {
              "source": null,
              "start": {
                "line": 69,
                "column": 28
              },
              "end": {
                "line": 71,
                "column": 28
              }
            },
            "moduleName": "find-me-ember/templates/home.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "alert alert-info");
            var el2 = dom.createTextNode("Attempting to create lobby");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
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
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.2",
            "loc": {
              "source": null,
              "start": {
                "line": 72,
                "column": 28
              },
              "end": {
                "line": 74,
                "column": 28
              }
            },
            "moduleName": "find-me-ember/templates/home.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "alert alert-danger control-alert");
            var el2 = dom.createTextNode("Create lobby failed: ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["content", "failedMessage", ["loc", [null, [73, 99], [73, 116]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 67,
              "column": 20
            },
            "end": {
              "line": 97,
              "column": 20
            }
          },
          "moduleName": "find-me-ember/templates/home.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("form");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("                            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "control-group");
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "control-label");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("label");
          var el5 = dom.createTextNode("Lobby Name:");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "controls");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "control-group");
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "control-label");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("label");
          var el5 = dom.createTextNode("Lobby Password:");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "controls");
          var el4 = dom.createTextNode("\n                                    ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                            ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "fill-width");
          var el3 = dom.createTextNode("\n                                ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("button");
          dom.setAttribute(el3, "type", "submit");
          dom.setAttribute(el3, "class", "btn btn-margin-top btn-margin-bottom btn-primary btn-lg fill-width");
          var el4 = dom.createTextNode("\n                                    Create Lobby\n                                ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n                            ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element5 = dom.childAt(fragment, [1]);
          var element6 = dom.childAt(element5, [8, 1]);
          var morphs = new Array(6);
          morphs[0] = dom.createElementMorph(element5);
          morphs[1] = dom.createMorphAt(element5, 1, 1);
          morphs[2] = dom.createMorphAt(element5, 2, 2);
          morphs[3] = dom.createMorphAt(dom.childAt(element5, [4, 3]), 1, 1);
          morphs[4] = dom.createMorphAt(dom.childAt(element5, [6, 3]), 1, 1);
          morphs[5] = dom.createElementMorph(element6);
          return morphs;
        },
        statements: [["element", "action", ["createLobby"], ["on", "submit"], ["loc", [null, [68, 30], [68, 66]]]], ["block", "if", [["get", "isProcessing", ["loc", [null, [69, 34], [69, 46]]]]], [], 0, null, ["loc", [null, [69, 28], [71, 35]]]], ["block", "if", [["get", "loginFailed", ["loc", [null, [72, 34], [72, 45]]]]], [], 1, null, ["loc", [null, [72, 28], [74, 35]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "lobbyName", ["loc", [null, [80, 50], [80, 59]]]]], [], []], "type", "text"], ["loc", [null, [80, 36], [80, 73]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [88, 50], [88, 58]]]]], [], []], "type", "password"], ["loc", [null, [88, 36], [88, 76]]]], ["element", "bindAttr", [], ["disabled", "isProcessing"], ["loc", [null, [92, 129], [92, 165]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.4.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 106,
                    "column": 12
                  },
                  "end": {
                    "line": 110,
                    "column": 12
                  }
                },
                "moduleName": "find-me-ember/templates/home.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("            ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("br");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n            ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("hr");
                dom.setAttribute(el1, "align", "left");
                dom.setAttribute(el1, "width", "50%");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n            ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("button");
                dom.setAttribute(el1, "type", "button");
                dom.setAttribute(el1, "class", "btn btn-lg btn-default modal-list-button");
                var el2 = dom.createTextNode(" Join ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element3 = dom.childAt(fragment, [5]);
                var morphs = new Array(1);
                morphs[0] = dom.createElementMorph(element3);
                return morphs;
              },
              statements: [["element", "action", ["joinLobby", ["get", "activeLobbyID", ["loc", [null, [109, 104], [109, 117]]]]], [], ["loc", [null, [109, 83], [109, 119]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 103,
                  "column": 32
                },
                "end": {
                  "line": 113,
                  "column": 32
                }
              },
              "moduleName": "find-me-ember/templates/home.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                                    ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "id", "leftDiv");
              var el2 = dom.createTextNode("\n                                        ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("a");
              dom.setAttribute(el2, "href", "#");
              dom.setAttribute(el2, "class", "list-group-item modal-list-item modal-list-item-auth");
              var el3 = dom.createElement("h3");
              var el4 = dom.createComment("");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("owner: ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("b");
              var el4 = dom.createComment("");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("          ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n                                    ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element4 = dom.childAt(fragment, [1, 1]);
              var morphs = new Array(5);
              morphs[0] = dom.createAttrMorph(element4, 'id');
              morphs[1] = dom.createElementMorph(element4);
              morphs[2] = dom.createMorphAt(dom.childAt(element4, [0]), 0, 0);
              morphs[3] = dom.createMorphAt(dom.childAt(element4, [2]), 0, 0);
              morphs[4] = dom.createMorphAt(element4, 4, 4);
              return morphs;
            },
            statements: [["attribute", "id", ["concat", ["lobby-", ["get", "lobby.id", ["loc", [null, [105, 125], [105, 133]]]]]]], ["element", "action", ["setSelectedLobby", ["get", "lobby.id", ["loc", [null, [105, 165], [105, 173]]]], true, ["get", "activeLobbyID", ["loc", [null, [105, 179], [105, 192]]]], ["get", "activeLobbyAuth", ["loc", [null, [105, 193], [105, 208]]]]], [], ["loc", [null, [105, 137], [105, 210]]]], ["content", "lobby.lobbyName", ["loc", [null, [105, 215], [105, 234]]]], ["content", "lobby.owner", ["loc", [null, [105, 249], [105, 264]]]], ["block", "if", [["subexpr", "check-id", [["get", "lobby.id", ["loc", [null, [106, 28], [106, 36]]]], ["get", "activeLobbyID", ["loc", [null, [106, 37], [106, 50]]]]], [], ["loc", [null, [106, 18], [106, 51]]]]], [], 0, null, ["loc", [null, [106, 12], [110, 19]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        var child1 = (function () {
          var child0 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.4.2",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 117,
                      "column": 10
                    },
                    "end": {
                      "line": 124,
                      "column": 11
                    }
                  },
                  "moduleName": "find-me-ember/templates/home.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("hr");
                  dom.setAttribute(el1, "width", "50%");
                  dom.setAttribute(el1, "align", "left");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n           ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("label");
                  var el2 = dom.createTextNode(" password:");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode(" \n           ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("br");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n           ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("input");
                  dom.setAttribute(el1, "class", "modal-list-input");
                  dom.setAttribute(el1, "type", "password");
                  dom.setAttribute(el1, "maxLength", "20");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n           ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("br");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n           ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("button");
                  dom.setAttribute(el1, "type", "button");
                  dom.setAttribute(el1, "class", "btn btn-lg btn-default modal-list-button");
                  var el2 = dom.createTextNode(" Join ");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element0 = dom.childAt(fragment, [7]);
                  var element1 = dom.childAt(fragment, [11]);
                  var morphs = new Array(2);
                  morphs[0] = dom.createAttrMorph(element0, 'id');
                  morphs[1] = dom.createElementMorph(element1);
                  return morphs;
                },
                statements: [["attribute", "id", ["concat", ["lobby-", ["get", "lobby.id", ["loc", [null, [121, 86], [121, 94]]]], "-password"]]], ["element", "action", ["joinLobby", ["get", "activeLobbyID", ["loc", [null, [123, 103], [123, 116]]]]], [], ["loc", [null, [123, 82], [123, 118]]]]],
                locals: [],
                templates: []
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.4.2",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 116,
                    "column": 10
                  },
                  "end": {
                    "line": 125,
                    "column": 11
                  }
                },
                "moduleName": "find-me-ember/templates/home.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
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
              statements: [["block", "if", [["subexpr", "check-id", [["get", "lobby.id", ["loc", [null, [117, 26], [117, 34]]]], ["get", "activeLobbyID", ["loc", [null, [117, 35], [117, 48]]]]], [], ["loc", [null, [117, 16], [117, 49]]]]], [], 0, null, ["loc", [null, [117, 10], [124, 18]]]]],
              locals: [],
              templates: [child0]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 113,
                  "column": 32
                },
                "end": {
                  "line": 127,
                  "column": 32
                }
              },
              "moduleName": "find-me-ember/templates/home.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                                    ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("a");
              dom.setAttribute(el1, "href", "#");
              dom.setAttribute(el1, "class", "list-group-item modal-list-item modal-list-item-no-auth");
              var el2 = dom.createElement("h3");
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("owner: ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("b");
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment(" check to see if password needs to be displayed ");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("          ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element2 = dom.childAt(fragment, [1]);
              var morphs = new Array(5);
              morphs[0] = dom.createAttrMorph(element2, 'id');
              morphs[1] = dom.createElementMorph(element2);
              morphs[2] = dom.createMorphAt(dom.childAt(element2, [0]), 0, 0);
              morphs[3] = dom.createMorphAt(dom.childAt(element2, [2]), 0, 0);
              morphs[4] = dom.createMorphAt(element2, 6, 6);
              return morphs;
            },
            statements: [["attribute", "id", ["concat", ["lobby-", ["get", "lobby.id", ["loc", [null, [114, 124], [114, 132]]]]]]], ["element", "action", ["setSelectedLobby", ["get", "lobby.id", ["loc", [null, [114, 164], [114, 172]]]], false, ["get", "activeLobbyID", ["loc", [null, [114, 179], [114, 192]]]], ["get", "activeLobbyAuth", ["loc", [null, [114, 193], [114, 208]]]]], [], ["loc", [null, [114, 136], [114, 210]]]], ["content", "lobby.lobbyName", ["loc", [null, [114, 215], [114, 234]]]], ["content", "lobby.owner", ["loc", [null, [114, 249], [114, 264]]]], ["block", "if", [["get", "displayPassword", ["loc", [null, [116, 16], [116, 31]]]]], [], 0, null, ["loc", [null, [116, 10], [125, 18]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.2",
            "loc": {
              "source": null,
              "start": {
                "line": 102,
                "column": 28
              },
              "end": {
                "line": 128,
                "column": 28
              }
            },
            "moduleName": "find-me-ember/templates/home.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
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
          statements: [["block", "if", [["get", "lobby.authenticated", ["loc", [null, [103, 38], [103, 57]]]]], [], 0, 1, ["loc", [null, [103, 32], [127, 39]]]]],
          locals: ["lobby"],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 100,
              "column": 20
            },
            "end": {
              "line": 130,
              "column": 20
            }
          },
          "moduleName": "find-me-ember/templates/home.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "list-group");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("                        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "lobbies", ["loc", [null, [102, 36], [102, 43]]]]], [], 0, null, ["loc", [null, [102, 28], [128, 37]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 131,
              "column": 20
            },
            "end": {
              "line": 136,
              "column": 20
            }
          },
          "moduleName": "find-me-ember/templates/home.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode(" adding friends m9 ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn-lg btn-default");
          var el2 = dom.createTextNode(" Send Request\n                        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "friend", ["loc", [null, [133, 38], [133, 44]]]]], [], []], "placeholder", "username"], ["loc", [null, [133, 24], [133, 69]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 137,
              "column": 20
            },
            "end": {
              "line": 139,
              "column": 20
            }
          },
          "moduleName": "find-me-ember/templates/home.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode(" prefs m9 ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 148,
            "column": 32
          }
        },
        "moduleName": "find-me-ember/templates/home.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "middle-column");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "form-center");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createTextNode(" Welcome to FindMe ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment(" All these options should bring up a modal that can be interacted with ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width btn-lg-bot-margin");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "btn-primary btn-lg");
        var el5 = dom.createTextNode(" Join Lobby");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width btn-lg-bot-margin");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "btn-primary btn-lg");
        var el5 = dom.createTextNode(" Create Lobby ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width btn-lg-bot-margin");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "btn-primary btn-lg");
        var el5 = dom.createTextNode(" View Lobbies ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width btn-lg-bot-margin");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "btn-primary btn-lg disabled");
        var el5 = dom.createTextNode(" Add Friends ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width btn-lg-bot-margin");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "btn-primary btn-lg");
        var el5 = dom.createTextNode(" Preferences ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width btn-lg-bot-margin");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "class", "btn-primary btn-lg");
        var el5 = dom.createTextNode(" Logout ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modalContainer");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Modal ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal fade");
        dom.setAttribute(el2, "id", "myModal");
        dom.setAttribute(el2, "role", "dialog");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "modal-dialog");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" Modal content");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-content");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "modal-header");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "button");
        dom.setAttribute(el6, "class", "close");
        dom.setAttribute(el6, "data-dismiss", "modal");
        var el7 = dom.createTextNode("×");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h4");
        dom.setAttribute(el6, "class", "modal-title");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "modal-body");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" JOIN LOBBY MODAL ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" END LOBBY JOIN MODAL ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" CREATE LOBBY MODAL ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" CREATE LOBBY MODAL END ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" VIEWING LOBBY MODAL ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "modal-footer");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "button");
        dom.setAttribute(el6, "class", "btn btn-default");
        dom.setAttribute(el6, "data-dismiss", "modal");
        var el7 = dom.createTextNode("Close");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" END VIEWING LOBBY MODAL ");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element9 = dom.childAt(fragment, [0, 1]);
        var element10 = dom.childAt(element9, [7, 0]);
        var element11 = dom.childAt(element9, [9, 0]);
        var element12 = dom.childAt(element9, [11, 0]);
        var element13 = dom.childAt(element9, [13, 0]);
        var element14 = dom.childAt(element9, [15, 0]);
        var element15 = dom.childAt(element9, [17, 0]);
        var element16 = dom.childAt(fragment, [2, 3, 1, 3]);
        var element17 = dom.childAt(element16, [3]);
        var morphs = new Array(12);
        morphs[0] = dom.createElementMorph(element10);
        morphs[1] = dom.createElementMorph(element11);
        morphs[2] = dom.createElementMorph(element12);
        morphs[3] = dom.createElementMorph(element13);
        morphs[4] = dom.createElementMorph(element14);
        morphs[5] = dom.createElementMorph(element15);
        morphs[6] = dom.createMorphAt(dom.childAt(element16, [1, 3]), 0, 0);
        morphs[7] = dom.createMorphAt(element17, 3, 3);
        morphs[8] = dom.createMorphAt(element17, 9, 9);
        morphs[9] = dom.createMorphAt(element17, 15, 15);
        morphs[10] = dom.createMorphAt(element17, 16, 16);
        morphs[11] = dom.createMorphAt(element17, 17, 17);
        return morphs;
      },
      statements: [["element", "action", ["joinLobbyModal"], [], ["loc", [null, [6, 80], [6, 107]]]], ["element", "action", ["createLobbyModal"], [], ["loc", [null, [7, 80], [7, 109]]]], ["element", "action", ["viewLobbiesModal"], [], ["loc", [null, [8, 80], [8, 109]]]], ["element", "action", ["addFriends"], [], ["loc", [null, [9, 89], [9, 112]]]], ["element", "action", ["preferences"], [], ["loc", [null, [10, 80], [10, 104]]]], ["element", "action", ["logout"], [], ["loc", [null, [11, 80], [11, 99]]]], ["content", "modalTitle", ["loc", [null, [22, 44], [22, 58]]]], ["block", "if", [["get", "joinLobby", ["loc", [null, [26, 26], [26, 35]]]]], [], 0, null, ["loc", [null, [26, 20], [64, 27]]]], ["block", "if", [["get", "creatingLobby", ["loc", [null, [67, 26], [67, 39]]]]], [], 1, null, ["loc", [null, [67, 20], [97, 27]]]], ["block", "if", [["get", "viewingLobbies", ["loc", [null, [100, 26], [100, 40]]]]], [], 2, null, ["loc", [null, [100, 20], [130, 27]]]], ["block", "if", [["get", "addingFriends", ["loc", [null, [131, 26], [131, 39]]]]], [], 3, null, ["loc", [null, [131, 20], [136, 27]]]], ["block", "if", [["get", "settingPreferences", ["loc", [null, [137, 26], [137, 44]]]]], [], 4, null, ["loc", [null, [137, 20], [139, 27]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("find-me-ember/templates/lobby", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 20
            },
            "end": {
              "line": 17,
              "column": 20
            }
          },
          "moduleName": "find-me-ember/templates/lobby.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn btn-default disabled");
          var el2 = dom.createTextNode(" Hide\n                        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "lobby-member", [], ["member", ["subexpr", "@mut", [["get", "memberModal", ["loc", [null, [14, 46], [14, 57]]]]], [], []]], ["loc", [null, [14, 24], [14, 59]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 20
            },
            "end": {
              "line": 25,
              "column": 20
            }
          },
          "moduleName": "find-me-ember/templates/lobby.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn btn-lg btn-primary btn-margin-bottom fill-width");
          var el2 = dom.createTextNode(" Home\n                        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn btn-lg btn-primary btn-margin-bottom fill-width");
          var el2 = dom.createTextNode(" Preferences\n                        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "btn btn-lg btn-primary btn-margin-bottom fill-width");
          var el2 = dom.createTextNode(" Logout\n                        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element6 = dom.childAt(fragment, [1]);
          var element7 = dom.childAt(fragment, [5]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element6);
          morphs[1] = dom.createElementMorph(element7);
          return morphs;
        },
        statements: [["element", "action", ["transitionTo", "/home"], [], ["loc", [null, [19, 92], [19, 125]]]], ["element", "action", ["transitionTo", "/"], [], ["loc", [null, [23, 92], [23, 121]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.4.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 30,
                  "column": 36
                },
                "end": {
                  "line": 31,
                  "column": 36
                }
              },
              "moduleName": "find-me-ember/templates/lobby.hbs"
            },
            isEmpty: true,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
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
            "fragmentReason": false,
            "revision": "Ember@2.4.2",
            "loc": {
              "source": null,
              "start": {
                "line": 28,
                "column": 28
              },
              "end": {
                "line": 45,
                "column": 28
              }
            },
            "moduleName": "find-me-ember/templates/lobby.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "list-group-item modal-list-item");
            var el2 = dom.createTextNode("\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("                                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            var el3 = dom.createTextNode("\n                                        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("button");
            dom.setAttribute(el3, "class", "btn btn-default");
            var el4 = dom.createTextNode(" Show on map\n                                        ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                                        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("button");
            dom.setAttribute(el3, "class", "btn btn-default disabled");
            var el4 = dom.createTextNode(" Navigate\n                                        ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                                        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("button");
            dom.setAttribute(el3, "class", "btn btn-default");
            var el4 = dom.createTextNode(" Hide\n                                        ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                                    ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment(" Need to draw the fucking circle with the right color ");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                                    ");
            dom.appendChild(el1, el2);
            dom.setNamespace("http://www.w3.org/2000/svg");
            var el2 = dom.createElement("svg");
            dom.setAttribute(el2, "class", "map-circle");
            dom.setAttribute(el2, "height", "80");
            dom.setAttribute(el2, "width", "80");
            var el3 = dom.createTextNode("\n                                        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("circle");
            dom.setAttribute(el3, "class", "circle");
            dom.setAttribute(el3, "cx", "40");
            dom.setAttribute(el3, "cy", "40");
            dom.setAttribute(el3, "r", "30");
            dom.setAttribute(el3, "stroke", "black");
            dom.setAttribute(el3, "stroke-width", "3");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n                                    ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n                                ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1]);
            var element2 = dom.childAt(element1, [3]);
            var element3 = dom.childAt(element2, [1]);
            var element4 = dom.childAt(element2, [5]);
            var element5 = dom.childAt(element1, [7, 1]);
            var morphs = new Array(6);
            morphs[0] = dom.createAttrMorph(element1, 'id');
            morphs[1] = dom.createMorphAt(element1, 1, 1);
            morphs[2] = dom.createElementMorph(element3);
            morphs[3] = dom.createAttrMorph(element4, 'id');
            morphs[4] = dom.createElementMorph(element4);
            morphs[5] = dom.createAttrMorph(element5, 'fill');
            return morphs;
          },
          statements: [["attribute", "id", ["concat", ["lobby-member-list-", ["get", "member.username", ["loc", [null, [29, 100], [29, 115]]]]]]], ["block", "lobby-member", [], ["member", ["subexpr", "@mut", [["get", "member", ["loc", [null, [30, 59], [30, 65]]]]], [], []]], 0, null, ["loc", [null, [30, 36], [31, 53]]]], ["element", "action", ["centerMe", ["get", "member.id", ["loc", [null, [33, 92], [33, 101]]]]], [], ["loc", [null, [33, 72], [33, 103]]]], ["attribute", "id", ["concat", ["lobby-member-button-", ["get", "member.username", ["loc", [null, [37, 98], [37, 113]]]]]]], ["element", "action", ["toggleMember", ["get", "member.username", ["loc", [null, [37, 141], [37, 156]]]]], [], ["loc", [null, [37, 117], [37, 158]]]], ["attribute", "fill", ["subexpr", "username-color", [["get", "member.id", ["loc", [null, [42, 141], [42, 150]]]], ["get", "colors", ["loc", [null, [42, 151], [42, 157]]]]], [], ["loc", [null, [42, 124], [42, 159]]]]]],
          locals: ["member"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 20
            },
            "end": {
              "line": 47,
              "column": 20
            }
          },
          "moduleName": "find-me-ember/templates/lobby.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1, "class", "list-group");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("                        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "members", ["loc", [null, [28, 36], [28, 43]]]]], [], 0, null, ["loc", [null, [28, 28], [45, 37]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.4.2",
            "loc": {
              "source": null,
              "start": {
                "line": 63,
                "column": 12
              },
              "end": {
                "line": 64,
                "column": 12
              }
            },
            "moduleName": "find-me-ember/templates/lobby.hbs"
          },
          isEmpty: true,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
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
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 61,
              "column": 4
            },
            "end": {
              "line": 66,
              "column": 4
            }
          },
          "moduleName": "find-me-ember/templates/lobby.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          dom.setAttribute(el1, "class", "list-group-item");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'id');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "id", ["concat", ["lobby-member-list-", ["get", "member.username", ["loc", [null, [62, 60], [62, 75]]]]]]], ["block", "lobby-member", [], ["member", ["subexpr", "@mut", [["get", "member", ["loc", [null, [63, 35], [63, 41]]]]], [], []]], 0, null, ["loc", [null, [63, 12], [64, 29]]]]],
        locals: ["member"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 67,
            "column": 5
          }
        },
        "moduleName": "find-me-ember/templates/lobby.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-md-2");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode(" checkHash ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" Modal ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "lobbyModal");
        dom.setAttribute(el2, "class", "modal fade");
        dom.setAttribute(el2, "role", "dialog");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "modal-dialog");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment(" Modal content");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-content");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "modal-header");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "button");
        dom.setAttribute(el6, "class", "close");
        dom.setAttribute(el6, "data-dismiss", "modal");
        var el7 = dom.createTextNode("×");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("h4");
        dom.setAttribute(el6, "class", "modal-title");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "modal-body");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "modal-footer");
        var el6 = dom.createTextNode("\n                    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "type", "button");
        dom.setAttribute(el6, "class", "btn btn-default");
        dom.setAttribute(el6, "data-dismiss", "modal");
        var el7 = dom.createTextNode("Close");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n                ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode(" updateSession ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode(" Lobby members: ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "list-group");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element8 = dom.childAt(fragment, [0]);
        var element9 = dom.childAt(element8, [1]);
        var element10 = dom.childAt(element8, [5, 1, 3]);
        var element11 = dom.childAt(element10, [3]);
        var element12 = dom.childAt(fragment, [2]);
        var morphs = new Array(8);
        morphs[0] = dom.createElementMorph(element9);
        morphs[1] = dom.createMorphAt(dom.childAt(element10, [1, 3]), 0, 0);
        morphs[2] = dom.createMorphAt(element11, 1, 1);
        morphs[3] = dom.createMorphAt(element11, 2, 2);
        morphs[4] = dom.createMorphAt(element11, 3, 3);
        morphs[5] = dom.createElementMorph(element12);
        morphs[6] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[7] = dom.createMorphAt(dom.childAt(fragment, [10]), 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["checkHash"], [], ["loc", [null, [2, 12], [2, 34]]]], ["content", "modalTitle", ["loc", [null, [10, 44], [10, 58]]]], ["block", "if", [["get", "displayMemberModal", ["loc", [null, [13, 26], [13, 44]]]]], [], 0, null, ["loc", [null, [13, 20], [17, 27]]]], ["block", "if", [["get", "modalOptions", ["loc", [null, [18, 26], [18, 38]]]]], [], 1, null, ["loc", [null, [18, 20], [25, 27]]]], ["block", "if", [["get", "modalSearch", ["loc", [null, [26, 26], [26, 37]]]]], [], 2, null, ["loc", [null, [26, 20], [47, 27]]]], ["element", "action", ["updateSession"], [], ["loc", [null, [56, 8], [56, 34]]]], ["inline", "google-map", [], ["action", "defineButtonAction"], ["loc", [null, [57, 0], [57, 42]]]], ["block", "each", [["get", "members", ["loc", [null, [61, 12], [61, 19]]]]], [], 3, null, ["loc", [null, [61, 4], [66, 13]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("find-me-ember/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 8
            },
            "end": {
              "line": 7,
              "column": 8
            }
          },
          "moduleName": "find-me-ember/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-info");
          var el2 = dom.createTextNode("Attempting to login");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 8
            },
            "end": {
              "line": 10,
              "column": 8
            }
          },
          "moduleName": "find-me-ember/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-danger control-alert");
          var el2 = dom.createTextNode("Login failed: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "failedMessage", ["loc", [null, [9, 72], [9, 89]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 12
            },
            "end": {
              "line": 35,
              "column": 12
            }
          },
          "moduleName": "find-me-ember/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode(" Unable to access your account? ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 8
            },
            "end": {
              "line": 39,
              "column": 8
            }
          },
          "moduleName": "find-me-ember/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode(" Create an account ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 6
          }
        },
        "moduleName": "find-me-ember/templates/login.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "middle-column");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "class", "form");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode(" Login to FindMe ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "control-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "control-label");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Username:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "controls");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "control-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "control-label");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Password:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "controls");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "btn btn-margin-top btn-margin-bottom btn-primary btn-lg fill-width");
        var el5 = dom.createTextNode("\n                Log in!\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width link-text");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [12, 1]);
        var morphs = new Array(8);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0, 5, 5);
        morphs[2] = dom.createMorphAt(element0, 6, 6);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [8, 3]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [10, 3]), 1, 1);
        morphs[5] = dom.createElementMorph(element1);
        morphs[6] = dom.createMorphAt(dom.childAt(element0, [14]), 1, 1);
        morphs[7] = dom.createMorphAt(element0, 16, 16);
        return morphs;
      },
      statements: [["element", "action", ["login"], ["on", "submit"], ["loc", [null, [2, 23], [2, 53]]]], ["block", "if", [["get", "isProcessing", ["loc", [null, [5, 14], [5, 26]]]]], [], 0, null, ["loc", [null, [5, 8], [7, 15]]]], ["block", "if", [["get", "loginFailed", ["loc", [null, [8, 14], [8, 25]]]]], [], 1, null, ["loc", [null, [8, 8], [10, 15]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "username", ["loc", [null, [16, 30], [16, 38]]]]], [], []], "type", "text"], ["loc", [null, [16, 16], [16, 52]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [24, 30], [24, 38]]]]], [], []], "type", "password"], ["loc", [null, [24, 16], [24, 56]]]], ["element", "bindAttr", [], ["disabled", "isProcessing"], ["loc", [null, [28, 109], [28, 145]]]], ["block", "link-to", ["recover-account"], [], 2, null, ["loc", [null, [33, 12], [35, 24]]]], ["block", "link-to", ["register"], [], 3, null, ["loc", [null, [37, 8], [39, 20]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("find-me-ember/templates/recover-account", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "find-me-ember/templates/recover-account.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode(" ahh you fucking twat  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
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
  })());
});
define("find-me-ember/templates/register", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 8
            },
            "end": {
              "line": 7,
              "column": 8
            }
          },
          "moduleName": "find-me-ember/templates/register.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-info");
          var el2 = dom.createTextNode("Attempting to register");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 8
            },
            "end": {
              "line": 10,
              "column": 8
            }
          },
          "moduleName": "find-me-ember/templates/register.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-danger control-alert");
          var el2 = dom.createTextNode("Registration failed: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "failedMessageEmail", ["loc", [null, [9, 79], [9, 101]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 8
            },
            "end": {
              "line": 13,
              "column": 8
            }
          },
          "moduleName": "find-me-ember/templates/register.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-danger control-alert");
          var el2 = dom.createTextNode("Registration failed: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "failedMessageEmail", ["loc", [null, [12, 79], [12, 101]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 8
            },
            "end": {
              "line": 16,
              "column": 8
            }
          },
          "moduleName": "find-me-ember/templates/register.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-danger control-alert");
          var el2 = dom.createTextNode("Registration failed: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "failedMessageUsername", ["loc", [null, [15, 79], [15, 104]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 8
            },
            "end": {
              "line": 19,
              "column": 8
            }
          },
          "moduleName": "find-me-ember/templates/register.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "alert alert-danger control-alert");
          var el2 = dom.createTextNode("Registration failed: ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "failedMessagePassword", ["loc", [null, [18, 79], [18, 104]]]]],
        locals: [],
        templates: []
      };
    })();
    var child5 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 74,
              "column": 12
            },
            "end": {
              "line": 76,
              "column": 12
            }
          },
          "moduleName": "find-me-ember/templates/register.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          var el2 = dom.createTextNode(" Login ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 79,
            "column": 6
          }
        },
        "moduleName": "find-me-ember/templates/register.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "middle-column");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        dom.setAttribute(el2, "class", "form");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode(" Sign up to FindMe ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "control-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "control-label");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Email address:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "controls");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "control-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "control-label");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Username:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "controls");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "control-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "control-label");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Password:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "controls");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "control-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "control-label");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Confirm password:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "controls");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "control-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "control-label");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Security question:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "controls");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "control-group");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "control-label");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("label");
        var el6 = dom.createTextNode("Security answer:");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "controls");
        var el5 = dom.createTextNode("\n                ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "submit");
        dom.setAttribute(el4, "class", "btn btn-margin-top btn-margin-bottom btn-primary btn-lg fill-width");
        var el5 = dom.createTextNode("\n                Register!\n            ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fill-width link-text");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [23, 1]);
        var morphs = new Array(14);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0, 5, 5);
        morphs[2] = dom.createMorphAt(element0, 6, 6);
        morphs[3] = dom.createMorphAt(element0, 7, 7);
        morphs[4] = dom.createMorphAt(element0, 8, 8);
        morphs[5] = dom.createMorphAt(element0, 9, 9);
        morphs[6] = dom.createMorphAt(dom.childAt(element0, [11, 3]), 1, 1);
        morphs[7] = dom.createMorphAt(dom.childAt(element0, [13, 3]), 1, 1);
        morphs[8] = dom.createMorphAt(dom.childAt(element0, [15, 3]), 1, 1);
        morphs[9] = dom.createMorphAt(dom.childAt(element0, [17, 3]), 1, 1);
        morphs[10] = dom.createMorphAt(dom.childAt(element0, [19, 3]), 1, 1);
        morphs[11] = dom.createMorphAt(dom.childAt(element0, [21, 3]), 1, 1);
        morphs[12] = dom.createElementMorph(element1);
        morphs[13] = dom.createMorphAt(dom.childAt(element0, [25]), 1, 1);
        return morphs;
      },
      statements: [["element", "action", ["register"], ["on", "submit"], ["loc", [null, [2, 23], [2, 56]]]], ["block", "if", [["get", "isProcessing", ["loc", [null, [5, 14], [5, 26]]]]], [], 0, null, ["loc", [null, [5, 8], [7, 15]]]], ["block", "if", [["get", "registerFailed", ["loc", [null, [8, 14], [8, 28]]]]], [], 1, null, ["loc", [null, [8, 8], [10, 15]]]], ["block", "if", [["get", "registerFailedEmail", ["loc", [null, [11, 14], [11, 33]]]]], [], 2, null, ["loc", [null, [11, 8], [13, 15]]]], ["block", "if", [["get", "registerFailedUsername", ["loc", [null, [14, 14], [14, 36]]]]], [], 3, null, ["loc", [null, [14, 8], [16, 15]]]], ["block", "if", [["get", "registerFailedPassword", ["loc", [null, [17, 14], [17, 36]]]]], [], 4, null, ["loc", [null, [17, 8], [19, 15]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [25, 30], [25, 35]]]]], [], []], "type", "email"], ["loc", [null, [25, 16], [25, 50]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "username", ["loc", [null, [33, 30], [33, 38]]]]], [], []], "type", "text"], ["loc", [null, [33, 16], [33, 52]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [41, 30], [41, 38]]]]], [], []], "type", "password"], ["loc", [null, [41, 16], [41, 56]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "passwordConfirmation", ["loc", [null, [49, 30], [49, 50]]]]], [], []], "type", "password"], ["loc", [null, [49, 16], [49, 68]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "securityQuestion", ["loc", [null, [57, 30], [57, 46]]]]], [], []], "type", "text"], ["loc", [null, [57, 16], [57, 60]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "securityAnswer", ["loc", [null, [65, 30], [65, 44]]]]], [], []], "type", "text"], ["loc", [null, [65, 16], [65, 58]]]], ["element", "bindAttr", [], ["disabled", "isProcessing"], ["loc", [null, [69, 109], [69, 145]]]], ["block", "link-to", ["login"], [], 5, null, ["loc", [null, [74, 12], [76, 24]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  })());
});
define("find-me-ember/templates/welcome", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 8
            },
            "end": {
              "line": 6,
              "column": 8
            }
          },
          "moduleName": "find-me-ember/templates/welcome.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "btn btn-primary btn-lg btn-margin-bottom");
          var el2 = dom.createTextNode("Login");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 4
            },
            "end": {
              "line": 10,
              "column": 4
            }
          },
          "moduleName": "find-me-ember/templates/welcome.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("a");
          dom.setAttribute(el1, "class", "btn btn-primary btn-lg");
          var el2 = dom.createTextNode("Register");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
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
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 58,
            "column": 365
          }
        },
        "moduleName": "find-me-ember/templates/welcome.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Welcome to FindMe");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "href", "#introduction");
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode(" Introduction");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "href", "#how-it-works");
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode(" How it works ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("a");
        dom.setAttribute(el1, "href", "#use-cases");
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode(" Use cases ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "id", "introduction");
        var el2 = dom.createTextNode(" Introduction ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    This application has been built with the purpose of ensuring that you can split up as a group and know where they are without having to constantly communicate with them.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    Now, I know you might be worried about having your location tracked, especially by others, but this application has been designed to ensure that your location is only shared with those who you want it to be shared with.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    *FindMe will never hold onto any more than one location update at a time.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    *FindMe encrypts your location as it is sent and also in the server so that not even the server admin can see what location was sent in without first decrypting it.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    *FindMe will only broadcast your location inside a password secured lobby which you have to be invited to join by a friend\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    *FindMe allows you to have complete control over when and if you broadcast your location within a lobby\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" HOW IT WORKS");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "id", "how-it-works");
        var el2 = dom.createTextNode(" How it works: ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    1. Register and choose a unique username which others can find you with. (You'll need to tell your friends your username for them to be able to add you)\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    2. After you have registered you can find friends by searching their username and sending them a friend request.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    3. Once you have added a friend(s) you can then create a lobby and add as many friends as you like to the lobby.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    4. Inside the lobby menu you can set your preferences such as: stop broadcasting location, set intervals between broadcasts, lobby expiration and password.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode("\n    5. In the lobby map page you can see where others in your lobby are as well as show/hiding certain people in the lobby.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" USE CASES");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        dom.setAttribute(el1, "id", "use-cases");
        var el2 = dom.createTextNode(" Use cases: ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode(" Teachers: Coordinating a large school trip to a large bird sanctuary can be difficult. The coordinator can add all the supervisors of each individual group to a FindMe lobby and then keep track of where everyone is at a particular time. ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        dom.setAttribute(el1, "class", "paragraph-wrap");
        var el2 = dom.createTextNode(" Friends: Going to hit the town for a big night out? Sick of getting seperated and not able to find your friends again and they always seem to never answer the phone or when they do the club is just too damn loud to be able to hear them? FindMe eliminates this problem and allows you to just open the app to see where your friends are ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["block", "link-to", ["login"], [], 0, null, ["loc", [null, [4, 8], [6, 20]]]], ["block", "link-to", ["register"], [], 1, null, ["loc", [null, [8, 4], [10, 16]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('find-me-ember/config/environment', ['ember'], function(Ember) {
  var prefix = 'find-me-ember';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("find-me-ember/app")["default"].create({"name":"find-me-ember","version":"0.0.0+ec4a772c"});
}

/* jshint ignore:end */
//# sourceMappingURL=find-me-ember.map