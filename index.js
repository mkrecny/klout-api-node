var Klout = require('./lib/klout.js');

module.exports = function(api_key){
  var properties = {
    api_key :{
      value : api_key,
      enumerable : true
    }
  }
  return Object.create(Klout, properties);
};
