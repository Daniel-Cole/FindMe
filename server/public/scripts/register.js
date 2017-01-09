//need to run a quick check to make sure all fields are valid
function registerUser() {
    //need to check fields
    var username = document.getElementById('usernameField').value;
    var password = document.getElementById('passwordField').value;
    var email = document.getElementById('emailField').value;
    var securityQuestion = document.getElementById('questionField').value;
    var securityAnswer = document.getElementById('answerField').value;
    //send ajax post request here
    $.ajax({
        url: 'http://localhost:5000/register',
        type: 'POST',
        data: {
            "username": username,
            "password": password,
            "email": email,
            "securityQuestion": securityQuestion,
            "securityAnswer": securityAnswer
        },
        dataType: 'JSON',
        success: function(data) {
            alert(data.text);
        },
        error: function(response) {
            alert('error: ' + response);
        }
    });
}