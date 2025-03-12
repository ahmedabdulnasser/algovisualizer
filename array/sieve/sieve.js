var parent = document.getElementById("parent");
var divs = [];
var cells;
var primes;
var delayTime = 400;
var pause = 0;
var logs = document.getElementById("logs");
let speeds = { x1: 750, x2: 500, x3: 200, x99: 0 };
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let renderBtn = document.getElementById("render-btn");
let incSpeedBtn = document.getElementById("incSpeed");
let decSpeedBtn = document.getElementById("decSpeed");
let currSpeed = document.getElementById("sort-speed");
currSpeed.value = "x1";
currSpeed.dataset.speed = 750;

playBtn.addEventListener("click", () => {
  pause = 0;
});
pauseBtn.addEventListener("click", () => {
  pause = 1;
});
renderBtn.addEventListener("click", play);
incSpeedBtn.addEventListener("click", speedup);
decSpeedBtn.addEventListener("click", speeddown);

function play() {
  primes = document.getElementById("primes_area");
  numbersArea = document.getElementById("parent");
  cells = document.getElementsByClassName("cell");
  //   containerSection = document.getElementById("col2");
  //   containerSection.style.height = "100vh";
  primes.innerHTML = numbersArea.innerHTML = "";
  console.log(primes);
  let N = parseInt(document.getElementById("size").value);
  if (isFinite(N) == false || !N) return;
  //   var form = document.getElementById("form");
  //   form.style.display = "none";
  drawGrid(N);
  sieve(N);
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
function max() {
  delayTime = 0;
}
function drawGrid(n) {
  for (let i = 1; i <= n; i++) {
    var div = document.createElement("div");
    divs[i] = [];
    div.classList.add("cell");
    if (i > 1) div.classList.add("prime");
    div.innerHTML = i;
    parent.appendChild(div);
  }
}
async function delay(ms) {
  while (pause) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sieve(n) {
  cells[0].classList.add("not_prime");
  logs.innerHTML = "";
  for (let i = 2; i <= n; i++) {
    cells[i - 1].classList.add("select-outer");
    cells[i - 2].classList.remove("select-outer");
    if (cells[i - 1].classList.contains("prime")) {
      logs.innerHTML += `<span style="color: red;">${i} is prime!</span>`;
      logs.innerHTML += "<br>";
      logs.innerHTML += `Marking multiples of ${i} as not prime.....`;
      logs.innerHTML += "<br>";
      let d = document.createElement("div");
      d.innerHTML = i;
      divs[i] = [i];
      d.classList.add("primeElement");

      primes.appendChild(d);
      for (let j = i + i; j <= n; j += i) {
        let li = document.createElement("li");
        if (divs[j]) divs[j].push(i);
        else divs[j] = [i];
        cells[j - 1].classList.remove("prime");
        cells[j - 1].classList.add("not_prime");
        cells[j - 1].classList.add("select");
        await delay(delayTime);
        cells[j - 1].classList.remove("select");
      }
    } else await delay(delayTime);
  }
}
function closeLogs() {
  logs.style.display = "none";
  var cbtn = document.getElementById("cbtn");
  cbtn.style.display = "none";
}
