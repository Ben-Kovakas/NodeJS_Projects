
    console.log(__filename);
    console.log(__dirname);
    
    var url =  'http://mylogger.io/log';
    
    function log(message) {
        //send an HTTP request
        console.log(message);
    }
    
    module.exports = log;



//all of this is wrapped in a function called the wrapper function 