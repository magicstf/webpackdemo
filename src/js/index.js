/*
* @Author: tengfeisu
* @Date:   2016-07-13 15:42:27
* @Last Modified by:   tengfeisu
* @Last Modified time: 2016-07-13 18:17:53
*/

'use strict';
var aModule = require('../less/main.less');
console.log(aModule);
require.ensure(['./a'],function(require){
    var aModule = require('./a');
},'tips');

