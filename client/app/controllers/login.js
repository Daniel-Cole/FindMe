export default Ember.Controller.extend({
  success: function(data) {
    document.cookie = "token=" + data.token;
    this.set('isProcessing', false);
    this.transitionToRoute('login');
  },

  failure: function(data) {
    this.set('loginFailed', true);
    this.set('isProcessing', false);
    this.set('failedMessage', JSON.parse(data.responseText).message);
  },

  actions: {

    loginFailed: false,
    isProcessing: false,
    failedMessage: "",

    login: function() {

      this.setProperties({
        loginFailed: false,
        isProcessing: true
      });

      var request = $.post("/rest/login", this.getProperties("username", "password"));
      request.then(this.success.bind(this), this.failure.bind(this));

    }
  }

});