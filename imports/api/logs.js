import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Session } from 'meteor/session'
 
export const Logs = new Mongo.Collection('logs');

if (Meteor.isServer) {
  Meteor.publish('logs', function(limit) {
    var lim = limit || 20;
    return Logs.find({}, {limit: lim,  sort: { timestamp: -1}});
  });
} else if (Meteor.isClient) { 
  Session.setDefault('entry_limit', 20);
};

Meteor.methods({
	'logs.insert'({client_name, endpoint, status}) {
		// TODO: properly validate here and pass back an error if the validation fails
    Logs.insert({
      timestamp: new Date(),
      client_name: client_name,
      endpoint: endpoint,
      status: status
    });
    Session.set('entry_limit', Session.get('entry_limit') + 1);
  },
});
