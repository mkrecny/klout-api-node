var klout = require('../index.js')('some_api_key');
var expected = 'http://api.klout.com/1/klout.json?key=some_api_key';
var params = {
  key : 'some_api_key'
};
var url = klout._get_url('score', params);
if (expected === url){
  console.log('PASS: expected', expected, 'got', url);
} else {
  console.log('PASS: expected', expected, 'got', url);
}
