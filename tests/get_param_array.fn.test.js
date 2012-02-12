var klout = require('../index.js')('ss7nn7ehm33cxga6ppp3jubx');

var each_has_key = function(params_objs, key){
  var result = true;
  params_objs.forEach(function(po){
    if (!po.hasOwnProperty(key)){
      result = false;
    }
  });
  return result;
};

var each_has_val = function(params_objs, key, chunks){
  var result = true;
  params_objs.forEach(function(po, i){
    if (po[key] !== chunks[i].join(',')){
      result = false;
    }
  });
  return result;
};

var unchunked = [1,2,3,4,5,6,7,8,9,10,11,12]

var  unchunked_len = unchunked.length; //will be passing by ref and mutating

var chunk_size = 5;

var key = 'foo';

var chunks = klout._get_chunks(unchunked, chunk_size); 

var params_array = klout._get_params_array(chunks, key);

// should be chunks.length params objs 
// each one should have a 'key' prop that 
// chunk[i].join(',')

if ((params_array.length === chunks.length)
    && (each_has_key(params_array, key))
    && (each_has_val(params_array, key, chunks))){
      console.log('PASS', chunks, 'produced', params_array);
    } else {
      console.log('FAIL', chunks, 'produced', params_array);
    }
