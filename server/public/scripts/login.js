var util = require("util");

function loginUser() {
    var username = document.getElementById('usernameField').value;
    var password = document.getElementById('passwordField').value;
    //send ajax post request here
    $.ajax({
        url: 'http://localhost:5000/login',
        type: 'POST',
        data: {
            "username": username,
            "password": password
        },
        dataType: 'JSON',
        success: function(data) {
            console.log(data);
            alert(data.message);
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("loginToken", data.token);
                //redirect to homepage
                console.log('login success');
            } else {
                alert('Web storage only supported in HTML5');
            }

        },
        error: function(data) {
            alert(data.responseJSON.message);
            if (typeof(Storage) !== "undefined") {
                //if attempt attempt to login fails then reset token.
                localStorage.setItem("loginToken", '');
            } else {
                alert('Web storage only supported in HTML5');
            }
        }
    });
}