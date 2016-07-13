'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
require('../styles/index.css');
var Hello = React.createClass({
  render: function render() {
    return <div>Hello  world  {this.props.name}</div>;
  }
});

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('app')
);
