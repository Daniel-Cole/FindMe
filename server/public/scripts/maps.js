var map;
var currentLatLng = {
    lat: -40.905452,
    lng: 175.006866
};
var updating = true;
var markers = {};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -40.905452,
            lng: 175.006866
        },
        zoom: 8
    });
}

/* send the current users location to the lobby */
function sendLocation() {
    if (!updating) {
        //user no longer wants to update their position
        return;
    }
    $.ajax({
        url: 'http://localhost:5000/sendLocation',
        type: 'POST',
        data: getCurrentLatLng(),
        dataType: 'JSON',
        success: function(data) {
            alert(data.text);
        },
        error: function(response) {
            alert('error: ' + response);
        }
    });
}

/* get all the locations in the lobby and plot them on the map */
function getLobbyLocations() {
    var currentLobby = 'winners';
    $.ajax({
        url: 'http://localhost:5000/getLocations/' + currentLobby,
        type: 'GET',
        success: function(data) {
            alert(data);
            updateMarkers(data);
        },
        error: function(response) {
            alert('error: ' + response);
        }
    });
}

/* If member that is user, use a different marker  */
function updateMarkers(data) {
    console.log(data);
    //the current latLng of our friend
    var coord = {
        lat: 0,
        lng: 0
    }
    var locArr = [];
    var member = '';
    var location = '';
    console.log("data length: " + data.length);
    for (var i = 0; i < data.length; i++) {
        location = data[i].location;
        member = data[i].member;
        //split here because it saves space in db
        locArr = location.split(" ");
        //set the coordinate
        coord.lat = Number(locArr[0]);
        coord.lng = Number(locArr[1]);
        if (!createMarker(member, coord)) {
            //we didn't have to create a new marker, so need to update old one...
            markers[member].setPosition(coord);
        }
    }
}

function createMarker(member, coord) {
    //check if we need a new marker if someone new has been added
    //to the lobby
    if (markers[member] != undefined) {
        return false; //we already have a marker, so just need update
    }
    //customise marker more here.
    var marker = new google.maps.Marker({
        position: coord,
        map: map,
        title: member
    });

    marker.addListener('click', function() {
        alert('This is ' + member + 's marker!')
    });

    markers[member] = marker;
    return true;
}

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var coordinates = pos.coords;
    currentLatLng.lat = coordinates.latitude;
    currentLatLng.lng = coordinates.longitude;
    console.log(currentLatLng);
};


function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

function updateCurrentLatLng() {
    navigator.geolocation.getCurrentPosition(success, error, options);
}