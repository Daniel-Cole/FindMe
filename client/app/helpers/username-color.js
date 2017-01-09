import Ember from 'ember';
export default Ember.Helper.helper(function(args) {
	var colorIndex = (args[0]);
	return args[1][colorIndex];
});