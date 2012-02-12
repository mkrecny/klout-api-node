var klout = require('../index.js')('ss7nn7ehm33cxga6ppp3jubx');

var params = {
  users : ['mkrecny','sztul']
};

klout.topics(params, function(e, data){
  if (data.length==2 && !e){
    console.log('PASS: got', data.length, "users' topics");
  } else {
    console.log('FAIL: error', e, data);
  }
  process.exit();
});
