export default Ember.Controller.extend({
  success: function(data) {
    console.log('registration success!');
    this.set('isProcessing', false);
    this.transitionToRoute('home');
  },

  failure: function(data) {
    console.log('registration failure!');
    this.set('registerFailed', true);
    this.set('isProcessing', false);
    console.log('SERVER RESPONSE: ' + data);
    console.log(JSON.parse(data.responseText));
    this.set('failedMessage', JSON.parse(data.responseText).message);
  },

  validateUser: function(username) {
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

  validatePassword: function(password, passwordConfirmation) {
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

    register: function() {
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
      var request = $.post("/rest/register",
        this.getProperties("username", "password", "email", "securityQuestion", "securityAnswer"));
      request.then(this.success.bind(this), this.failure.bind(this));

    },
    dosomething: function() {
      console.log('changed me!');
    }
  }
});

function invalidateField() {

}