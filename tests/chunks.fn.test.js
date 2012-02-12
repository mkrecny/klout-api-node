var klout = require('../index.js')('ss7nn7ehm33cxga6ppp3jubx');

var unchunked = [1,2,3,4,5,6,7,8,9,10,11,12]

var  unchunked_len = unchunked.length; //will be passing by ref and mutating

var chunk_size = 5;


var chunks = klout._get_chunks(unchunked, chunk_size); 

if ((chunks.length === Math.ceil(unchunked_len/chunk_size))
   && chunks[chunks.length-1].length===unchunked_len%chunk_size){
  console.log('PASS', 'produced', chunks);
} else {
  console.log('FAIL', 'produced', chunks);
}
process.exit();
