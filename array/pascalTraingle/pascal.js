var pascal = [];
var algorithm = document.getElementById("algorithm");
algorithm.innerHTML = "";
let pause = 0;
let delayTime = 750;
let speeds = { x1: 750, x2: 500, x3: 200, x99: 0 };
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let renderBtn = document.getElementById("render-btn");
let incSpeedBtn = document.getElementById("incSpeed");
let decSpeedBtn = document.getElementById("decSpeed");
let currSpeed = document.getElementById("sort-speed");
currSpeed.value = "x1";
currSpeed.dataset.speed = 750;
incSpeedBtn.addEventListener("click", speedup);
decSpeedBtn.addEventListener("click", speeddown);
function stop() {
  pause = 1;
}
function resume() {
  pause = 0;
}
function speedup() {
  if (currSpeed.value === "x1") {
    currSpeed.value = "x2";
  } else if (currSpeed.value === "x2") {
    currSpeed.value = "x3";
  } else if ((currSpeed.value = "x3")) {
    currSpeed.value = "x99";
  }
  delayTime = currSpeed.dataset.speed = speeds[currSpeed.value];
}
function speeddown() {
  if (currSpeed.value === "x99") {
    currSpeed.value = "x3";
  } else if (currSpeed.value === "x3") {
    currSpeed.value = "x2";
  } else if (currSpeed.value === "x2") {
    currSpeed.value = "x1";
  }
  delayTime = currSpeed.dataset.speed = speeds[currSpeed.value];
}
async function delay(ms) {
  while (pause) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function RemoveAll() {
  algorithm.innerHTML = "";
  pascal = [];
  let p = document.getElementById("result");
  if (p) p.innerHTML = "";
}
async function draw(rows) {
  RemoveAll();
  if (!rows) {
    rows = document.getElementById("rows-number").value;
    rows = parseInt(rows);
  }
  if (!rows) return;
  for (let i = 0; i <= rows; i++) {
    var div = document.createElement("div");
    algorithm.appendChild(div);
    pascal[i] = [];
    for (let j = 0; j <= i; j++) {
      var p = document.createElement("p");
      if (j == 0 || j == i) pascal[i][j] = 1;
      else {
        pascal[i][j] = pascal[i - 1][j - 1] + pascal[i - 1][j];
        algorithm.childNodes[i - 1].childNodes[j - 1].classList.add("select");
        algorithm.childNodes[i - 1].childNodes[j].classList.add("select");
      }
      p.innerHTML = pascal[i][j];
      div.appendChild(p);
      p.classList.add("main-select");
      await delay(delayTime);
      if (j && i && j != i) {
        algorithm.childNodes[i - 1].childNodes[j - 1].classList.remove(
          "select"
        );
        algorithm.childNodes[i - 1].childNodes[j].classList.remove("select");
      }
      p.classList.remove("main-select");
    }
  }
}
async function calcBolynomial(x, y, n) {
  if (!x && x != 0) {
    x = document.getElementById("x").value;
    x = parseInt(x);
  }
  if (!y && y != 0) {
    y = document.getElementById("y").value;
    y = parseInt(y);
  }

  if (!n && n != 0) {
    n = document.getElementById("n").value;
    n = parseInt(n);
  }
  if ((!y && y != 0) || (!x && x != 0) || (!n && n != 0)) {
    console.log(x, y, n);
    return;
  }
  await draw(n);
  let p = document.getElementById("result");
  let ty = y,
    tx = x;
  (x = 1), (y = 1);
  for (let i = 0; i < n; i++) x *= tx;
  let ans = 0;
  for (let i = 0; i <= n; i++) {
    ans += pascal[n][i] * x * y;
    p.innerHTML += `<span>${pascal[n][i]} </span> * ${tx} <sup> ${
      n - i
    } </sup> * ${ty} <sup>${i}</sup>`;
    if (i < n) p.innerHTML += " + ";
    else p.innerHTML += ` = ${ans}`;
    p.classList.add("gold-span");
    algorithm.childNodes[n].childNodes[i].classList.add("consider");
    x /= tx;
    y *= ty;
    await delay(delayTime);
    p.classList.remove("gold-span");
    algorithm.childNodes[n].childNodes[i].classList.remove("consider");
  }
}
