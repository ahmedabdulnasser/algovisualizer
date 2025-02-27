import { updateDOM, swapArrayElements, sortController } from "./utils.js";
let currSpeed = document.getElementById("sort-speed");
currSpeed.value = "x1";
currSpeed.dataset.speed = 750;

document.getElementById("playBtn").addEventListener("click", () => {
  let speed = Number(currSpeed.dataset.speed) || 750;
  sortController.play(document.getElementById("previewArr"));
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  sortController.pause();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  sortController.next(document.getElementById("previewArr"));
});

document.getElementById("prevBtn").addEventListener("click", () => {
  sortController.prev(document.getElementById("previewArr"));
});

document.getElementById("incSpeed").addEventListener("click", () => {
  let speeds = { x1: 750, x2: 500, x3: 200, x99: 0 };
  if (currSpeed.value === "x1") {
    currSpeed.value = "x2";
  } else if (currSpeed.value === "x2") {
    currSpeed.value = "x3";
  } else if ((currSpeed.value = "x3")) {
    currSpeed.value = "x99";
  }
  currSpeed.dataset.speed = speeds[currSpeed.value];
  sortController.setSpeed(currSpeed.dataset.speed);
});
document.getElementById("decSpeed").addEventListener("click", () => {
  let speeds = { x1: 750, x2: 500, x3: 200, x99: 0 };
  if (currSpeed.value === "x99") {
    currSpeed.value = "x3";
  } else if (currSpeed.value === "x3") {
    currSpeed.value = "x2";
  } else if (currSpeed.value === "x2") {
    currSpeed.value = "x1";
  }
  currSpeed.dataset.speed = speeds[currSpeed.value];
  sortController.setSpeed(currSpeed.dataset.speed);
});

export async function bubbleSort(arr, delayMS, domArr) {
  sortController.reset();
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // await updateDOM(arr, delayMS, domArr, true, j, j + 1);
      if (arr[j] > arr[j + 1]) {
        // Visualize swap
        swapArrayElements(arr, j, j + 1);
        sortController.addStep(arr, j, j + 1, true);
        // await updateDOM(arr, delayMS, domArr, true, j, j + 1);
        // console.log(arr);
      } else {
        sortController.addStep(arr, j, j + 1, false);
      }
    }
  }
}
export async function selectionSort(arr, delayMS, domArr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min_idx]) {
        min_idx = j;
      }
    }

    sortController.addStep([...arr], i, min_idx, false);

    if (min_idx !== i) {
      [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }

    sortController.addStep([...arr], i, min_idx, true);
  }
}

export async function countingSort(arr, delayMS, domArr) {
  if (arr.length <= 1) {
    return arr;
  }

  let min = Math.min(...arr);
  let max = Math.max(...arr);

  let count = new Array(max - min + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  let index = 0;
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      // This is the "swap" step where we place elements into their correct positions
      arr[index++] = i + min;
      //   console.log(arr);
      count[i]--;
      await updateDOM(arr, delayMS, domArr, true, i, i + min);
    }
  }

  return arr;
}
export async function insertionSort(arr, delayMS, domArr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    await updateDOM([...arr], delayMS, domArr, true, i, i);
    while (j >= 0 && arr[j] > key) {
      let tempArr = [...arr];

      arr[j + 1] = arr[j];
      await updateDOM([...arr], delayMS, domArr, true, j, j + 1);

      j--;
    }

    arr[j + 1] = key;
    await updateDOM([...arr], delayMS, domArr, true, j + 1, i);
  }
}
