export default Ember.Controller.extend({
  init: function() {
    this.set('colorsDict', []);
    this.set('colors', ["#b22d2d", "#ff2200", "#400900", "#e6bbac", "#662900", "#ff8c40"]);
    this.set('updating', true);
    this.set('updateInterval', 10000);
    this.updateLocation();
  },
  willTransition: function(transition){
    console.log('moving away m9');
  },
  success: function(data) {
    console.log('Updated position' + data);
    //now update map
    this.send('updateSession',false);
  },
  failure: function(data) {
    this.set('updating', false);
    alert('failed to update your location');
  },
  updateLocation: function() {
    if (!this.get('updating')) {
      console.log('no longer updating position');
      return;
    }
    //usition every 5 seconds.
    var obj = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(data) {
        var request = $.post("/rest/sessions?lobbyToken=" + obj.get('lobbyToken'), {
          'lat': data.coords.latitude,
          'lng': data.coords.longitude
        });
        request.then(obj.success.bind(obj), obj.failure.bind(obj));
      }, obj.failure.bind(obj));
      setInterval(function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(data) {
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
    updateSession: function(init) {
      //use glyphicon glyphicon-cog for settings
      //use glyphicon glyphicon-align-justify for menu
      var obj = this;
      obj.set('members', []);
      //pass through the lobby hash with this.get('lobbyHash');
      //lobbyHash is passed to this controller from the 
      //home controller
      var lobbyMembers = this.store.queryRecord('session', {
        lobbyToken: this.get('lobbyToken')
      }).then(function(session) {
        console.log(session.get('lobbyName'));
        obj.set('members', session.get('lobbyMembers'));
        obj.send('updateMap', init);
      });
    },
    checkHash: function() {
      console.log('check Hash: ' + this.get('lobbyToken'));
    },
    toggleMember: function(username) {
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
    defineButtonAction: function(actionType, element, map) {
      //map will get passed with first map button create
      console.log('here');
      var obj = this;
      if (map !== undefined) {
        this.set('map', map);
      }
      if (actionType == 'options') {
        element.addEventListener('click', function() {
          console.log('options');
          //bring out sidebar
          obj.set('modalTitle', 'Lobby options');
          obj.set('displayMemberModal', false);
          obj.set('modalOptions', true);
          obj.set('modalSearch', false);
          $('#lobbyModal').modal();
        });
      } else if (actionType == 'search') {
        element.addEventListener('click', function() {
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
        element.addEventListener('click', function() {
          obj.send('centerMe');
        });
      } else if (actionType == 'refresh') {
        element.addEventListener('click', function() {
          obj.send('updateMap', true);
        });
      }
    },
    updateMap: function(init) {
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
          },
        });

        //javascriptttt yayyy
        (function(marker, member, obj) {
          google.maps.event.addListener(marker, 'click', function() {
            //this is where we want to open up a small modal
            obj.set('memberModal', member)
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
    centerMe: function(id) {
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
    viewAll: function() {
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
    transitionTo: function(route) {
      $('#lobbyModal').modal('hide');
      this.transitionToRoute(route);
    }
  }
});