const util = {
    randomPriceFeed:function (length) {
        let randomPriceFeed = [];
        for (let i = 0; i < length; i++) {
            randomPriceFeed.push({
                "open": Math.random(),
                "high": Math.random(),
                "low": Math.random(),
                "close": Math.random(),
                "volume": Math.random()
            });
        }
        return randomPriceFeed;
    },
    liveRandom: function (callback,options) {
        let randomPriceFeed = [];
        let i = 0;
        let interval = setInterval(() => {
            //add a new random price to the price feed +- 0.01% to 10% of the last price always positive
            let lastPrice = randomPriceFeed.length<1 ? {
                "open": 1,
                "high": 1,
                "low": 1,
                "close": 1,
            }  : randomPriceFeed[randomPriceFeed.length - 1];
            let newPrice = {
                "open": lastPrice.close * (1 + (Math.random() * 0.2 - 0.1)),
                "high": lastPrice.close * (1 + (Math.random() * 0.2 - 0.1)),
                "low": lastPrice.close * (1 + (Math.random() * 0.2 - 0.1)),
                "close": lastPrice.close * (1 + (Math.random() * 0.2 - 0.1)),
                "volume": Math.random()
            };
            randomPriceFeed.push(newPrice);
            //run the callback function with the new price feed
            i++;//src_option, length, gamma, zl
            //console.log("Prices : ",randomPriceFeed);
                console.log("#"+i+" Last Price : ",randomPriceFeed[i-1]);
                console.log("AARMA : ",callback(randomPriceFeed,options.src_option,options.length,options.gamma,options.zl)[i-1]);
        }, 100);
    }
}

module.exports = util;