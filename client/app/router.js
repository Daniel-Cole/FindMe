import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function() {
	this.route('welcome', {
		path: '/'
	});
	this.route('login');
	this.route('register');
	this.route('home');
	this.route('lobby');
	this.route('recover-account');
});

export default Router;