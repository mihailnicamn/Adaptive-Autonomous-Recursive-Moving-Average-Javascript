const ta = {
    nz: (x, y) => {
        //x is an array of values
        //Replaces NaN values with zeros (or given value) in a series.
        //if x is an array
        if (Array.isArray(x)) {
            for (let i = 0; i < x.length; i++) {
                if (isNaN(x[i])) {
                    x[i] = y;
                }
            }
            return x;
        }
        //if x is a number
        else {
            if (isNaN(x)) {
                return y;
            }
            else {
                return x;
            }
        }
    },
    abs: (x) => {
        //x is an array of values
        //Replaces NaN values with zeros (or given value) in a series.
        //if x is an array
        if (Array.isArray(x)) {
            for (let i = 0; i < x.length; i++) {
                x[i] = Math.abs(x[i]);
            }
            return x;
        }
        //if x is a number
        else {
            return Math.abs(x);
        }
    },
    sum: (x, y) => {
        //x is an array of values
        //y is the length of the array to sum
        //return array of sums
        let sum = 0;
        let arr = [];
        for (let i = 0; i < x.length - y; i++) {
            sum = 0;
            for (let j = 0; j < y; j++) {
                sum += parseFloat(x[i + j]);
            }
            arr.push(sum);
        }
        return arr;
    },
    change: (x, y) => {
        //x is an array of values
        //y value to its value y periods ago
        //return array of changes
        let arr = [];
        for (let i = 0; i < x.length - y; i++) {
            arr.push(x[i] - x[i + y]);
        }
        return arr;
    },
    cum: (x) => {
        //x is an array of values
        let sum = 0;
        for (let i = 0; i < x.length; i++) {
            sum += x[i];
        }
        return sum;
    },
    bar_index: (x) => {
        return x.length;
    },
    parse(x) {
        return x.reverse();
    },
    src: (x,y) => {
        if (y == "close") {
            return x.map((x) => x.close);
        }
        else if (y == "open") {
            return x.map((x) => x.open);
        }
        else if (y == "high") {
            return x.map((x) => x.high);
        }
        else if (y == "low") {
            return x.map((x) => x.low);
        }
        else if (y == "hl2") {
            return x.map((x) => (x.high + x.low) / 2);
        }
        else if (y == "hlc3") {
            return x.map((x) => (x.high + x.low + x.close) / 3);
        }
        else if (y == "ohlc4") {
            return x.map((x) => (x.high + x.low + x.close + x.open) / 4);
        }
        else if (y == "hlcc4") {
            return x.map((x) => (x.high + x.low + x.close + x.close) / 4);
        }else{
            return x;
        }

    },

}

module.exports = ta;