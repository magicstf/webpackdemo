webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(34);
	
	var Hello = React.createClass({
	  displayName: 'Hello',
	
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      'Hello ',
	      this.props.name
	    );
	  }
	});
	
	ReactDOM.render(React.createElement(Hello, { name: 'World' }), document.getElementById('app'));

/***/ }
]);
//# sourceMappingURL=main.js.map