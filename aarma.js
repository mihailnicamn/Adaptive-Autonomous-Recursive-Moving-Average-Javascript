const ta = require('./ta.js');

const aarma_meta = {
    "name": "aarma",
    "description": "Adaptive Average Range Moving Average",
    "params": {
        "lenght": {
            "name": "Length",
            "description": "Length of the moving average",
            "type": "integer",
            "default": 14
        },
        "gamma": {
            "name": "Gamma",
            "description": "Gamma",
            "type": "integer",
            "default": 2
        },
        "zl": {
            "name": "ZeroLag",
            "description": "ZeroLag",
            "type": "boolean",
            "default": false
        }
    }
}

const ama = (x, er, ma) => {
    return er * x + (1 - er) * ta.nz(ma[1], x);
}
/* pine code
length = input(14),gamma = input(3.),src = input(close)
//----
er = abs(change(src,length))/sum(abs(change(src)),length)
ama(x)=>
    a = 0.
    a := er*x+(1-er)*nz(a[1],x)
//----
ma = 0.
d = cum(abs(src - nz(ma[1],src)))/bar_index * gamma
ma := ama(ama(src > nz(ma[1],src) + d ? src + d : src < nz(ma[1],src) - d ? src - d : nz(ma[1],src)))
//----
css = ma > ma[1] ? #2196f3 : ma < ma[1] ? #ff1100 : na
plot(ma,color=fixnan(css),linewidth=2,transp=0)
*/
//js function to calculate aarma
const aarma = (priceFeed, src_option, length, gamma, zl) => {
    let prices = ta.parse(priceFeed);
    let ma = [];
    for (let i = 0; i < prices.length; i++) {
        let src_input = ta.src(prices, src_option);
        let src = zl ? parseFloat(src_input[0] + ta.change(src_input, length / 2)[0]) : src_input[0];
        let er = ta.abs(ta.change(src_input, length))[0] / ta.sum(ta.abs(ta.change(src_input,1)), length)[0];
        let d = ta.cum(ta.abs(src_input[0] - ta.nz(ma[1], src))) / ta.bar_index(src_input) * gamma;
        ma.push(ama(ama(src_input[0] > ta.nz(ma[1], src) + d ? src + d : src < ta.nz(ma[1], src) - d ? src - d : ta.nz(ma[1], src), er, ma), er, ma));
    }
    return ma;
}

module.exports = {
    run: aarma,
    info: aarma_meta
}