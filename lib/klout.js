var request = require('request');
var qs = require('querystring');

module.exports = {
  _req : function(url, params, cb){
      params.key = this.api_key;
      var url = this._get_url(url,params);
      request(url, function(e, response, body){
        return cb(e, JSON.parse(body));
      });
    },
  _get_url : function(url, params){
    var query = params ? '?'+qs.stringify(params) : '';
    return 'http://api.klout.com/1/'+url+'.json'+query;
  },
  scores : function(params, cb){
    this._req('klout', params, function(e, data){
      return cb(e, data.users);
    });
  },
  users : function(params, cb){
    this._req('users/show', params, function(e, data){
      return cb(e, data.users);
    });
  },
  topics : function(params, cb){
    this._req('users/topics', params, function(e, data){
      return cb(e, data.users);
    });
  }
  
};
