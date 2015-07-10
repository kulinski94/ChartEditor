// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Candle', {
	code : {type : String},
    time : {type : String},
    bid_open : {type : String},
    bid_high: {type : String},
    bid_close : {type : String},
    bid_low : {type : String},
    volume : {type : String}
});