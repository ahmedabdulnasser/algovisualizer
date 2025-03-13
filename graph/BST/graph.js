var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
document.getElementById("algorithm").appendChild(svg);
svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
var nodes = [];
var edges = [];
var texts = [];
var red = 1;
var gap = red * 3; // New gap variable controlling the horizontal spacing between circles
var circle;
var text;
var line;
var sq = 1;
var height = 0;
let speeds = { x1: 750, x2: 500, x3: 200, x99: 0 };
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let renderBtn = document.getElementById("render-btn");
let incSpeedBtn = document.getElementById("incSpeed");
let decSpeedBtn = document.getElementById("decSpeed");
let currSpeed = document.getElementById("sort-speed");
currSpeed.value = "x1";
currSpeed.dataset.speed = 750;

var defaultColor = "rgba(41, 128, 185, 0.8)";
var exploreColor = "rgba(192, 57, 43, 1)";
var pause = 0;
var traverserOrder = document.getElementById("visit-order");
traverserOrder.innerHTML = "";
let delayTime = 750;

playBtn.addEventListener("click", () => {
  pause = 0;
});
pauseBtn.addEventListener("click", () => {
  pause = 1;
});
incSpeedBtn.addEventListener("click", speedup);
decSpeedBtn.addEventListener("click", speeddown);

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
// function resume() {
//   pause = 0;
// }

// function stop() {
//   pause = 1;
// }

function add() {
  let n = parseInt(document.getElementById("size").value);
  if (!n) return;
  insert(n);
}

async function svgExtend() {
  const box = svg.getBBox();
  const sidePadding = red * 11;
  const topPadding = red * 0.5;
  let viewBoxX = box.x - sidePadding;
  let viewBoxY = box.y - topPadding;
  let boxWidth = box.width + sidePadding * 2;
  let boxHeight = box.height + topPadding;
  viewBoxY *= 0.8;
  svg.setAttribute(
    "viewBox",
    `${viewBoxX} ${viewBoxY} ${boxWidth} ${boxHeight}`
  );

  svg.setAttribute("preserveAspectRatio", "xMidYMin meet");

  let parent = svg.parentNode;
  let parentWidth = parent.clientWidth;
  if (parentWidth == 0) parentWidth = 1000;
  let aspectRatio = boxWidth / boxHeight;

  svg.setAttribute("width", "100%");
  svg.setAttribute("height", `${parentWidth / aspectRatio}px`);
}

function disableButtons() {
  let b = document.getElementsByTagName("button");
  for (let button in b) {
    button.disabled = true;
  }
}

function enableButtons() {
  let b = document.getElementsByTagName("button");
  for (let button in b) {
    button.disabled = false;
  }
}

async function delay(ms) {
  while (pause) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reorder() {
  // Reorder nodes level by level and add a gap between them
  for (let i = 1; ; i++) {
    let prevx = -1000;
    for (let j = (1 << (i - 1)) + 1; j < 1 << i; j++) {
      if (j >= nodes.length) return;
      if (nodes[j - 1]) prevx = parseInt(nodes[j - 1].getAttribute("cx"));
      if (!nodes[j]) continue;
      let cx = parseInt(nodes[j].getAttribute("cx"));
      if (Math.abs(cx - prevx) < gap) cx = prevx + gap;
      console.log(cx + " " + j);
      nodes[j].setAttribute("cx", cx);
      texts[j].setAttribute("x", cx);
      if (edges[j]) edges[j].setAttribute("x2", cx);
    }
  }
}

async function insert(x) {
  console.log("insert" + x + " " + nodes.length);
  let ind = 1;
  while (nodes[ind]) {
    var value = document.getElementById(ind + "-text");
    value = parseInt(value.textContent);
    nodes[ind].setAttribute("stroke", "red");
    nodes[ind].setAttribute("stroke-width", "2");
    if (ind > 1) {
      nodes[ind >> 1].setAttribute("stroke", "black");
      nodes[ind].setAttribute("stroke-width", "2");
    }
    if (x == value) {
      console.log("already exist");
      return;
    }
    if (x > value) ind = (ind << 1) + 1;
    else ind = ind << 1;
    await delay(delayTime);
  }
  if (ind >> 1) nodes[ind >> 1].setAttribute("stroke", "black");

  if (ind == 1) {
    // Create the root node
    circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "100");
    circle.setAttribute("cy", "0");
    circle.setAttribute("r", red);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", defaultColor);

    text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", 100);
    text.setAttribute("y", 0);
    text.setAttribute("text-anchor", "middle"); // centers text horizontally
    text.setAttribute("dominant-baseline", "middle"); // centers text vertically
    text.setAttribute("id", ind + "-text");
    height = 20;
    text.textContent = x;
    // Improved text styling with updated color
    text.style.fontFamily = "Arial, sans-serif";
    text.style.fontSize = 0.6 * red + "px";
    text.style.fontWeight = "bold";
    text.style.fill = "white";

    svg.appendChild(circle);
    svg.appendChild(text);
    nodes[ind] = circle;
    circle.setAttribute("vector-effect", "non-scaling-stroke");
  } else {
    // Create a child node with added horizontal gap
    let parent = nodes[ind >> 1];
    if (!nodes[ind >> 1]) {
      console.log("Fl" + " " + ind);
    }
    console.log((ind + " - " + ind) >> 1);
    console.log(ind);
    circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    if (ind & 1) {
      circle.setAttribute("cx", parseInt(parent.getAttribute("cx")) + gap);
    } else {
      circle.setAttribute("cx", parseInt(parent.getAttribute("cx")) - gap);
    }
    height = Math.max(height, parseInt(parent.getAttribute("cy")) + 80);
    sq *= 2;
    circle.setAttribute("cy", parseInt(parent.getAttribute("cy")) + red * 5);
    circle.setAttribute("r", red);
    circle.setAttribute("fill", defaultColor);
    circle.setAttribute("stroke", "black");

    line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", parseInt(parent.getAttribute("cx")));
    line.setAttribute("x2", parseInt(circle.getAttribute("cx")));
    line.setAttribute("y1", parseInt(parent.getAttribute("cy")) + red);
    line.setAttribute("y2", parseInt(circle.getAttribute("cy")) - red);
    line.setAttribute("id", ind + "-line");
    line.setAttribute("stroke", "black");

    circle.setAttribute("vector-effect", "non-scaling-stroke");
    line.setAttribute("vector-effect", "non-scaling-stroke");
    console.log(circle.getAttribute("cx") + " " + circle.getAttribute("cy"));

    text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", circle.getAttribute("cx"));
    text.setAttribute("y", circle.getAttribute("cy"));
    text.setAttribute("text-anchor", "middle"); // centers text horizontally
    text.setAttribute("dominant-baseline", "middle"); // centers text vertically
    text.setAttribute("id", ind + "-text");
    text.textContent = x;
    // Improved text styling with updated color
    text.style.fontFamily = "Arial, sans-serif";
    text.style.fontSize = 0.6 * red + "px";
    text.style.fontWeight = "bold";
    text.style.fill = "white";

    svg.appendChild(circle);
    svg.appendChild(line);
    svg.appendChild(text);
    nodes[ind] = circle;
    edges[ind] = line;
  }

  texts[ind] = text;
  await svgExtend();
  await reorder();
}
function setTrace(text) {
  if (traverserOrder)
  {
    traverserOrder.innerHTML = '';
    if (text)
    addTraversedNode(text);
  }
}
async function postorder(ind) {
  let left = ind << 1;
  let right = left + 1;
  if (nodes[left] !== undefined) await postorder(left);
  if (nodes[right] !== undefined) await postorder(right);
  nodes[ind].setAttribute("fill", exploreColor);
  texts[ind].setAttribute("fill", "#FFD700");
  if (ind > 1) {
    edges[ind].setAttribute("stroke-dasharray", "7,5");
    edges[ind].setAttribute("stroke", "green");
    edges[ind].setAttribute("stroke-width", "2");
  }

  // console.log(ind);

  await addTraversedNode(texts[ind].textContent);
  await delay(delayTime * 3);
  if (ind > 1) {
    edges[ind].setAttribute("stroke-dasharray", "none");
    edges[ind].setAttribute("stroke", "black");
  }

  texts[ind].setAttribute("fill", "black");
  nodes[ind].setAttribute("fill", "grey");
}

async function addTraversedNode(value) {
  let div = document.createElement("div");
  let p = document.createElement("p");
  p.innerHTML = value;
  div.appendChild(p);
  traverserOrder.appendChild(div);
}

async function inorder(ind) {
  let left = ind << 1;
  let right = left + 1;
  if (nodes[left]) await inorder(left);
  nodes[ind].setAttribute("fill", exploreColor);
  texts[ind].setAttribute("fill", "#FFD700");
  if (ind > 1) {
    edges[ind].setAttribute("stroke-dasharray", "7,5");
    edges[ind].setAttribute("stroke", "green");
    edges[ind].setAttribute("stroke-width", "2");
  }
  await delay(delayTime * 3);
  nodes[ind].setAttribute("fill", "grey");
  await addTraversedNode(texts[ind].textContent);
  texts[ind].setAttribute("fill", "black");
  if (ind > 1) {
    edges[ind].setAttribute("stroke", "black");
    edges[ind].setAttribute("stroke-dasharray", "none");
  }

  texts[ind].setAttribute("fill", "black");
  if (nodes[right]) await inorder(right);
}

async function preorder(ind) {
  // console.log(texts[ind].textContent);
  nodes[ind].setAttribute("fill", exploreColor);
  texts[ind].setAttribute("fill", "#FFD700");
  if (ind == 1) {
    traverserOrder.innerHTML = "";
    addTraversedNode("Pre-order Traverse (root - left - right): ");
  }
  if (ind > 1) {
    edges[ind].setAttribute("stroke-dasharray", "7,5");
    edges[ind].setAttribute("stroke", "green");
    edges[ind].setAttribute("stroke-width", "2");
  }
  await delay(delayTime * 3);
  let left = ind << 1;
  let right = left + 1;
  nodes[ind].setAttribute("fill", "grey");
  await addTraversedNode(texts[ind].textContent);
  texts[ind].setAttribute("fill", "black");
  if (ind > 1) {
    edges[ind].setAttribute("stroke", "black");
    edges[ind].setAttribute("stroke-dasharray", "none");
  }

  texts[ind].setAttribute("fill", "black");
  if (nodes[left] !== undefined) await preorder(left);
  if (nodes[right] !== undefined) await preorder(right);
}

function clearEffects() {
  for (let node of nodes) {
    if (node) {
      node.setAttribute("fill", defaultColor);
    }
  }
  for (let edge of edges) {
    if (edge) edge.setAttribute("stroke", "black");
  }
}

async function search(ind, value) {
  if (!value && value != 0) {
    value = document.getElementById("search-input").value;
    value = parseInt(value);
    if (!value && value != 0) {
      return;
    }
  }

  if (!nodes[ind]) {
    alert("not found");
    return;
  }
  let v = parseInt(texts[ind].textContent);
  if (v == value) {
    nodes[ind].setAttribute("fill", "green");
    // alert("found");
    return;
  }
  nodes[ind].setAttribute("fill", exploreColor);
  await delay(delayTime * 4);
  nodes[ind].setAttribute("fill", "grey");
  if (v > value) {
    await search(ind * 2, value);
  } else {
    await search(ind * 2 + 1, value);
  }
}

async function build(n) {
  while (n--) {
    let x = parseInt(prompt());
    await insert(x);
    await reorder();
    await delay(delayTime);
  }
}

async function removeAll() {
  for (let i = 0; i < nodes.length; i++) {
    if (edges[i]) svg.removeChild(edges[i]);
    if (nodes[i]) svg.removeChild(nodes[i]);
    if (texts[i]) svg.removeChild(texts[i]);
  }
  nodes = [];
  edges = [];
  texts = [];
}

async function balanceTree(first, last) {
  if (last != undefined && first >= last) return;
  if (!last) {
    console.log(last);
    await inorder(1);
    await removeAll();

    var divs = traverserOrder.children;
    last = divs.length;
  }
  let mid = (first + last) >> 1;
  traverserOrder.children[mid].firstChild.style.backgroundColor = 'red';
  console.log(first, last);
  await delay(delayTime);
  let v = parseInt(traverserOrder.children[mid].firstChild.innerHTML);
  traverserOrder.children[mid].firstChild.style.opacity = '0';
  
  if (mid == 1)console.log('node ' + v);
  await insert(v);
  await balanceTree(first, mid);
  await balanceTree(mid + 1, last);
}
function debug()
{
    
  let lst = [80, 60, 40, 20, 70, 30, 50];
  for (let j of lst)insert(j);

}
//build(n);