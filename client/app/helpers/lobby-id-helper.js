import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(id) {
  return id; 
});