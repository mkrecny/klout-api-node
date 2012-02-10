var qs = require('querystring');
var graph_conf = require('../conf/graph.js');
var request = require('request');

module.exports = {
  _req : function(url, params, cb){
      request(this._get_url(url,params), function(e, response, body){
        var data;
        try {
          var parsed = JSON.parse(body);
          data = parsed.data;
          e = parsed.e;
          data
        } catch (e){
         return cb(e); 
        }
        return cb(e, data);
      });
    },
  _get_url : function(url, params){
    var query = params ? '?'+qs.stringify(params) : '';
    return 'http://'+graph_conf.host+':'+graph_conf.port+url+query;
  },
  popular : function(params, cb){
    this._req('/popular', params, cb);
  },
  query : function(params, cb){
    params.url = escape(params.url);
    this._req('/query', params, cb);
  },
  persist : function(cb){
    this._req('/persist', null, cb);  
  },
  rebuild : function(params, cb){
    this._req('/rebuild', params, cb);
  }
};
