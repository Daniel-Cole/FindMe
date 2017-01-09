import DS from 'ember-data';

export default DS.Model.extend({
	lobbyName: DS.attr('string'),
	owner: DS.attr('string'), 
	authenticated: DS.attr('boolean')
});
