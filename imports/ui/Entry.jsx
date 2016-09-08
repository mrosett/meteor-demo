import React, { Component, PropTypes } from 'react';
 
// Entry component - represents a log item
export default class Entry extends Component {
  render() {
    return (
      <tr>
	      <td>{this.props.entry.timestamp.toString()}</td>
		    <td>{this.props.entry.client_name}</td>
				<td>{this.props.entry.endpoint}</td>
				<td>{this.props.entry.status}</td>
			</tr>
    );
  }
}

