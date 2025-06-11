const range_slider_integer = require("../src/index");

let opts = { min: 0, max: 100 };
let rsi = range_slider_integer(opts);
document.body.append(rsi);
