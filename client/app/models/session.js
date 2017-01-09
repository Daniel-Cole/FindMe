import DS from 'ember-data';

export default DS.Model.extend({
	lobbyName: DS.attr('string'),
	owner: DS.attr('string'), 
	lobbyMembers: DS.attr()
});
