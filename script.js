const keys = document.querySelectorAll(".key");

const keyBG = document.querySelector(".keys");

const reset = document.querySelector(".reset");

const digits = document.querySelectorAll(".screen span");

const theme = document.querySelector(".theme h1");

const specialKey = document.querySelectorAll(".theme-color");

const equal = document.querySelector(".theme-color-2");

const body = document.querySelector("body");

const screen = document.querySelector(".screen");

const input = document.querySelector("input");

const slider = document.querySelector(".slider");

const sliderRound = document.querySelector(".slider.round");

const base = document.querySelector(".default");

const themeNumber = document.querySelectorAll(".number");

const themeLabel = document.querySelector(".theme-label");

let str = "";
let first_zero = 0;
let number = [];

keys.forEach((key) => {
  key.addEventListener("click", function () {
    if (
      key.innerText === "=" ||
      key.innerText === "+" ||
      key.innerText === "x" ||
      key.innerText === "/" ||
      key.innerText === "-" ||
      key.innerText === "."
    ) {
      if (
        (key.innerText === "+" || key.innerText === "-") &&
        number.length === 0
      ) {
        number.push(key.innerText);
        document.querySelector(".default").innerText = key.innerText;
        first_zero++;
      } else if (number.length !== 0 || key.innerText === ".") {
        const operator = document.createElement("span");
        operator.innerText = key.innerText;

        if (key.innerText === "." && first_zero === 0) {
          number.push("0");
          first_zero++;
        }
        if (!(key.innerText === "=")) {
          screen.appendChild(operator);
          number.push(key.innerText);
        }
        if (key.innerText === "x") {
          let index = number.indexOf("x");
          number[index] = "*";
        }
        if (key.innerText === "=") {
          let result = Math.round(eval(number.join("")) * 100) / 100;
          const resultSpan = document.createElement("span");
          resultSpan.innerText = result;
          while (screen.hasChildNodes()) {
            screen.removeChild(screen.firstChild);
            number.pop();
          }
          number.push(result.toString());
          screen.appendChild(resultSpan);
          resultSpan.classList.add("default");
        }
      }
    } else if (key.innerText === "DEL") {
      if (number.length > 1) screen.removeChild(screen.lastChild);
      else {
        document.querySelector(".default").innerText = 0;
        first_zero = 0;
      }
      number.pop();
    } else if (key.innerText === "RESET") {
      while (screen.hasChildNodes()) {
        screen.removeChild(screen.firstChild);
      }

      while (number.length !== 0) number.pop();

      const intialSpan = document.createElement("span");
      intialSpan.innerText = 0;
      screen.appendChild(intialSpan);
      intialSpan.classList.add("default");
      first_zero = 0;
    } else {
      str = key.innerText;
      if (str.startsWith("0") && first_zero === 0 && number.length === 0) {
        document.querySelector(".default").innerText = str;
      } else if (
        !str.startsWith("0") &&
        first_zero === 0 &&
        number.length === 0
      ) {
        document.querySelector(".default").innerText = str;
        number.push(str);
        first_zero++;
      } else {
        const newDigit = document.createElement("span");
        newDigit.innerText = str;
        screen.appendChild(newDigit);
        number.push(str);
        newDigit.classList.add("digit");
      }
    }
  });
});

let value = "first";
themeNumber.forEach((number) => {
  number.addEventListener("click", function () {
    if (number.innerText == 1) {
      input.classList.remove(value);
      input.classList.add("first");
      value = "first";
      themeNumber.forEach((number) => (number.style.color = "#ffff"));
      sliderRound.style.backgroundColor = "#252d44";
    } else if (number.innerText == 2) {
      input.classList.remove(value);
      input.classList.add("second");
      value = "second";
      themeNumber.forEach(
        (number) => (number.style.color = "hsl(60, 10%, 19%)")
      );
      sliderRound.classList.add("slider-bg-2");
      sliderRound.style.backgroundColor = "#d6cdc7";
    } else if (number.innerText == 3) {
      input.classList.remove(value);
      input.classList.add("third");
      value = "third";
      themeNumber.forEach(
        (number) => (number.style.color = "hsl(52, 100%, 62%)")
      );
      sliderRound.classList.add("slider-bg-3");
      sliderRound.style.backgroundColor = "#17062a";
      slider.style.color = "#95fcf7";
    }
    input.checked = true;
    changeTheme(number.innerText);
  });
});

function changeTheme(value) {
  body.classList.add(`body-theme-${value}`);
  screen.classList.add(`screen-${value}`);
  keyBG.classList.add(`keys-${value}`);
  keys.forEach((k) => k.classList.add(`key-${value}`));
  specialKey.forEach((sk) => sk.classList.add(`theme-color-bg-${value}`));
  equal.classList.add(`theme-color-2-bg-${value}`);
  themeLabel.classList.add(`theme-label-${value}`);
  theme.classList.add(`h1-${value}`);
  if (value == 1) {
    removeTheme(2);
    removeTheme(3);
  }
  value == 2 ? removeTheme(3) : removeTheme(2);
}

function removeTheme(value) {
  body.classList.remove(`body-theme-${value}`);
  screen.classList.remove(`screen-${value}`);
  keyBG.classList.remove(`keys-${value}`);
  keys.forEach((k) => k.classList.remove(`key-${value}`));
  specialKey.forEach((sk) => sk.classList.remove(`theme-color-bg-${value}`));
  equal.classList.remove(`theme-color-2-bg-${value}`);
  themeLabel.classList.remove(`theme-label-${value}`);
  theme.classList.remove(`h1-${value}`);
  sliderRound.classList.remove(`slider-bg-${value}`);
}
