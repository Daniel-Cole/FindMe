export default Ember.Controller.extend({
    passwordLengthObserver: function(data) {
        console.log(data);
        var self = this;
        console.log(self)
        console.log("changing....");
    }.observes('lobby-password'),

    success: function(data) {
        console.log('attempting to join new lobby');
        var lobbyToken = data.lobbyToken;
        console.log(lobbyToken);
        $('#myModal').modal('hide');
        this.set('isProcessing', false);
        //transition to route and pass hash to new controller
        this.transitionToRoute('/lobby').then(function(newRoute) {
            newRoute.controller.set('lobbyToken', lobbyToken);
            newRoute.controller.send('updateSession', true);
        });
    },
    failure: function(data) {
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

        createLobbyModal: function() {
            this.set("modalTitle", "Create a Lobby");
            this.set('joinLobby', false);
            this.set('viewingLobbies', false);
            this.set('joiningLobby', false);
            this.set('settingPreferences', false);
            this.set('addingFriends', false);
            this.set("creatingLobby", true);
            $('#myModal').modal();
        },
        viewLobbiesModal: function() {
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
        joinLobbyModal: function() {
            console.log("joinin lob yo");
            this.set("modalTitle", "Join a lobby");
            this.set('joinLobby', true)
            this.set('creatingLobby', false);
            this.set("viewingLobbies", false);
            this.set('settingPreferences', false);
            this.set('addingFriends', false);
            $('#myModal').modal();
        },
        joinLobby: function(id) {
            //need to get lobbyOwner and lobbyName
            var obj = this;
            this.store.findAll('lobby').then(function(result) {
                var lobbies = result.map(function(item, index, enumerable) {
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
        joinLobbySpecified: function() {
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
        createLobby: function() {
            console.log("attempting to create lobby: ");

            this.setProperties({
                createFailed: false,
                isProcessing: true
            });

            var request = $.post("/rest/createLobby", this.getProperties('lobbyName', 'password'));
            request.then(this.success.bind(this), this.failure.bind(this));
        },
        addFriends: function() {
            console.log("add friends");
            this.set('viewingLobbies', false);
            this.set('joiningLobby', false);
            this.set("creatingLobby", false);
            this.set('settingPreferences', false);
            this.set('addingFriends', true);
            $('#myModal').modal();
        },
        preferences: function() {
            console.log("preferences");
            this.set('viewingLobbies', false);
            this.set('joiningLobby', false);
            this.set("creatingLobby", false);
            this.set('settingPreferences', true);
            this.set('addingFriends', false);
            $('#myModal').modal();
        },
        logout: function() {
            console.log("logout");
        },
        setSelectedLobby: function(lobbyID, authenticated, activeLobbyID, activeLobbyAuth) {
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