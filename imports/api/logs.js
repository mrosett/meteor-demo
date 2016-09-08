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
		Logs.insert({
      timestamp: new Date(),
      client_name: client_name,
      endpoint: endpoint,
      status: status
    });
  },
});

/*Logs.attachSchema(new SimpleSchema({
  timestamp: {
    type: Date,
    label: "Timestamp"
  },
  client_name: {
    type: String,
    label: "Client Name"
  },
  endpoint: {
  	type: String,
  	label: "Endpoint"
  },
  status: {
  	type: String,
  	label: "Status",
  	allowedValues: ["success", "failure"]
  }
}));*/