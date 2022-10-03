const aarma = require('./aarma.js');
const util = require('./util.js');


let priceFeed = util.randomPriceFeed(100);
inputs = {
    "priceFeed": priceFeed,
    "src_option": "hl2",
    "length": 14,
    "gamma": 4,
    "zl": false
}

util.liveRandom(aarma.run, inputs);
