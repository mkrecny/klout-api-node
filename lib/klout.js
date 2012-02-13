var request = require('request');
var qs = require('querystring');

module.exports = {
  //max num users per req
  _chunk_size : 5, 
  _req_interval : 150,
  _req : function(url, params, cb){
    params.key = this.api_key;
    var url = this._get_url(url,params);
    request(url, function(e, response, body){
      var data;
      try {
        data = JSON.parse(body)
      } catch (e){
        return cb(e);
      }
      if (body.error){
        return cb(body.error);
      }
      return cb(e, data);
    });
  },
  _batch_req : function(url, params, key, cb){
    var self = this;
    //collapse chunks into an arg
    var chunks = this._get_chunks(params.users, this._chunk_size); 
    var param_array = this._get_params_array(chunks, key);
    var uncompleted_reqs = param_array.length;
    var results = {users:[]};
    var _cb = function(e, data){
      uncompleted_reqs -= 1;
      if (e) {console.log('ERROR', e)}
      if (self.log_status) console.log('uncompleted reqs', uncompleted_reqs);
      if (!e){
      	results.users = results.users.concat(data.users);
      }
      if (!uncompleted_reqs){
        return cb(e, results);
      }
    };
    setInterval(function(){
      if (param_array.length){
        self._req(url, param_array.shift(), _cb);
      }
    }, this._req_interval);
  },
  _user_req : function(url, params, cb){
    var req_method_name = '_batch_req';
    var _cb = function(e, data){
      return cb(e, data.users);
    };
    if (params.users.length < this._chunk_size){
      params.users = params.users.join(',');
      this._req(url, params, _cb);
    } else {
      this._batch_req(url, params, 'users', _cb); 
    }
  },
  _get_params_array : function(chunks, key){
    var param_array = [];
    chunks.forEach(function(chunk){
      var param_obj = {};
      param_obj[key] = chunk.join(',');
      param_array.push(param_obj); 
    });
    return param_array;
  },
  _get_chunks : function(unchunked, chunk_size) {
    var chunks = [];
    while(unchunked.length){
      chunks.push(unchunked.splice(0, chunk_size));
    }
    return chunks;
  },
  _get_url : function(url, params){
    var query = params ? '?'+qs.stringify(params) : '';
    return 'http://api.klout.com/1/'+url+'.json'+query;
  },
  scores : function(params, cb){
    this._user_req('klout', params, cb); 
  },
  users : function(params, cb){
    this._user_req('users/show', params, cb); 
  },
  topics : function(params, cb){
    this._user_req('users/topics', params, cb); 
  }
};
