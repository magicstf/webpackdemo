/*
* @Author: tengfeisu
* @Date:   2016-07-08 15:57:03
* @Last Modified by:   tengfeisu
* @Last Modified time: 2016-07-08 18:35:39
*/

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
  render: function render() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(
  <Hello name="World" />,
  document.getElementById('AppRoot')
);
