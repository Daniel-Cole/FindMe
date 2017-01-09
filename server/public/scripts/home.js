function joinLobby() {
    //open up a pop-upbox to display all the lobbys to the user
    var lobbyName = document.getElementById('lobby-name-join').value;
    var owner = document.getElementById('owner-name-join').value;
    var password = document.getElementById('lobby-password-join').value;

    $.ajax({
        url: 'http://localhost:5000/joinLobby',
        type: 'POST',
        data: {
            "lobbyName": lobbyName,
            "owner": owner,
            "password": password,
            "token": localStorage.loginToken
        },
        dataType: 'JSON',
        success: function(data) {
            alert(data.message);
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });
}

function createLobby() {
    //open up a popbox with options to create a lobby
    var lobbyName = document.getElementById('lobby-name-create').value;
    var password = document.getElementById('lobby-password-create').value;
    $.ajax({
        url: 'http://localhost:5000/createLobby',
        type: 'POST',
        data: {
            "lobbyName": lobbyName,
            "password": password,
            "token": localStorage.loginToken
        },
        dataType: 'JSON',
        success: function(data) {
            alert(data.message);
        },
        error: function(data) {
            alert(data.message);
        }
    });
}

//view all the lobbies this user is a part of and aren't expired
function displayLobbies() {
    //reset the list as we are going to repopulate it with our lobbies
    document.getElementById('lobbyList').innerHTML = '';
    $.ajax({
        url: 'http://localhost:5000/getLobbies',
        type: 'POST',
        data: {
            "token": localStorage.loginToken
        },
        dataType: 'JSON',
        success: function(data) {
            console.log('data: ' + data);
            for (var i = 0; i < data.length; i++) {
                var lobbyName = data[i].lobbyName;
                var owner = data[i].owner;
                /*
                 $("#lobbyList").append("<li class='list-group-item'>" +
                    lobbyName + " | " + owner + "</li>");
*/
                $("#lobbyList").append("<li class='list-group-item' onclick='goToLobby(this);'>" +
                    lobbyName + " | " + owner + "</li>");

            }
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });
}

/* open up the lobby page */
function goToLobby(listObject) {
    var text = $(listObject).text();
    var split = text.split('|');
    var lobbyName = split[0].trim();
    var owner = split[1].trim();
    console.log(lobbyName);
    console.log(owner);

    //now we have lobby and owner we can attempt to go that that lobby
}