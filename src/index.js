const range = require("input-integer_01");
const slider = require("range-slider-ui");

module.exports = function range_slider_integer(opts, protocol) {
  const el = document.createElement("div");
  const shadow = el.attachShadow({ mode: "closed" });
  const sliderElement = slider(opts, example_protocol);
  const rangeElement = range(opts, options);
  const output = document.createElement("div");
  output.innerText = 0;
  shadow.append(sliderElement, rangeElement, output);
  return el;
  function options(message) {
    const { type, data } = message;

    output.innerText = data;
  }
  function example_protocol(source, listen) {
    return function notify(message) {
      if (message.type == "update") {
        output.innerText = message.data;
      }

      return;
    };
  }
};
