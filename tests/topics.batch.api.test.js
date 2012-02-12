var klout = require('../index.js')('ss7nn7ehm33cxga6ppp3jubx');

var log_returned = function(returned){
  returned.forEach(function(r){
    console.log('got', r.twitter_screen_name);
  });
};

var params = {
  users : ['mkrecny','sztul', 'reece', 'spinosa', 'amycao', 'mezdef', 'ckurdziel', 'bfeld', 'fredwilson', 'mg', 'omgal', 'antirez', 'ryah', 'kirbysayshi']
};
var req_len = params.users.length;
console.log('requesting data for', params.users.length, 'people');
klout.topics(params, function(e, data){
  console.log(data);
  console.log('e:', e);
  if (data.length === req_len){
    console.log('PASS');
  } else {
    console.log('FAIL, missed some people')
    log_returned(data, params.users);
  }
  console.log('received data for', data.length, 'people');
  process.exit();
});
