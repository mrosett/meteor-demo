import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Logs } from '../api/logs.js'

import Entry from './Entry.jsx';
 
// App component - represents the whole app
class App extends Component {
  
  handleSubmit(event) {
    event.preventDefault();
    const client_name = ReactDOM.findDOMNode(this.refs.client_name).value.trim();
    const endpoint = ReactDOM.findDOMNode(this.refs.endpoint).value.trim();
    const status = ReactDOM.findDOMNode(this.refs.status).value.trim();
    
    // TODO: Move validation to the meteor function.
    if (client_name != '' && endpoint!= '' && status != '') {
      Meteor.call('logs.insert', {
        timestamp: new Date(),
        client_name: client_name,
        endpoint: endpoint,
        status: status
      }); 

      ReactDOM.findDOMNode(this.refs.client_name).value = ''
      ReactDOM.findDOMNode(this.refs.endpoint).value = ''
      ReactDOM.findDOMNode(this.refs.status).value = ''
    }
  }

  loadMore(event) {
    event.preventDefault();
    Session.set('entry_limit', Session.get('entry_limit') + 20);
  }

  renderLogs() {
    return this.props.logs.map((entry) => (
      <Entry key={entry._id} entry={entry} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>API Logs</h1>
          <form className="new-entry" onSubmit={this.handleSubmit.bind(this)} >
            <input type="text" ref="client_name" placeholder="Client Name" />
            <input type="text" ref="endpoint" placeholder="Endpoint" />
            <input type="text" ref="status" placeholder="Status" />
            <input type="submit" ref="submit"/>
          </form>
        </header>
        <table>
          <tbody>
            <tr>
              <th>timestamp</th>
              <th>client_name</th>
              <th>endpoint</th>
              <th>status</th>
            </tr>
            {this.renderLogs()}
          </tbody>
        </table>
        <form className="load-more" onSubmit={this.loadMore.bind(this)} >
            <input type="submit" ref="load-more" value="Load more"/>
        </form>
      </div>
    );
  }
}

App.propTypes = {
  logs: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Deps.autorun(function() {
    Meteor.subscribe('logs', Session.get('entry_limit'));
  });
  return {
    logs: Logs.find({}, { sort: { timestamp: -1 } }).fetch(),
  }
}, App);