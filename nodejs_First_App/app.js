
// function sayHello(name) {
//     console.log('Hello ' + name);
// }

//sayHello('Mosh');

// console.log(window);  //global object

// setTimeout()
// clearTimeout()

// setInterval()
// clearInterval()

//Javascript objects


// var message = '';
// console.log(globalThis.message);

//***ADDED to THE GLOBAL SCOPE */


// window.sayHello();



//need modularity to avoid global scope pollution
//use modules to encapsulate code

//modules are private by default
//use exports to make them public

// const log = require('./logger.js');

// log('message');

const path = require('path');

var pathObj = path.parse(__filename);
console.log(pathObj);
