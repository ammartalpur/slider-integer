const range = require("range-slider-ui")
const integer = require("input-integer-ui")


module.exports = range_slider_integer;

function range_slider_integer(opts) {
  const state = {};

  const el = document.createElement("div");
  const shadow = el.attachShadow({ mode: "closed" });

  // Set up static structure with innerHTML
  shadow.innerHTML = `
    <style>${get_theme()}</style>
    <div class="rsi">
    </div>
  `;

  // Dynamic DOM elements
  const range_slider = range(opts, protocol);
  const input_integer = integer(opts, protocol);
  const value_shower = document.createElement("span");

  // Insert dynamic components into .dynamic-slot
  const slot = shadow.querySelector(".rsi");
  slot.append(range_slider, input_integer, value_shower);

  return el;

  function protocol(message, notify) {
    const { from } = message;
    state[from] = { value: 0, notify };
    return listen;
  }

  function listen(message) {
    const { from, type, data } = message;
    state[from].value = data;
    if (type === "update") {
      let notify;
      if (from === "range-0") notify = state["input-integer-0"].notify;
      else if (from === "input-integer-0") notify = state["range-0"].notify;
      notify({ type, data });
      value_shower.textContent = data;
    }
  }

  function get_theme() {
    return `
      .rsi {
        padding: 5%;
        display: grid;
        grid-template-columns: 8fr 1fr;
        align-items: center;
        justify-items: center;
      }
    `;
  }
}
