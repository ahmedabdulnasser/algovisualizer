// Sort Relevant Utils
async function visualizeSort(arr, sortFn, delayMS, domArr) {
  sortController.reset();
  await sortFn(arr, delayMS, domArr);
  sortController.play(domArr);
  sortController.pause();
}
class SortController {
  constructor() {
    this.steps = [];
    this.currentStep = 0;
    this.isPlaying = false;
    this.speed = 750; // Default speed (x1)
  }

  reset() {
    this.steps = [];
    this.currentStep = 0;
    this.isPlaying = false;
  }

  addStep(arr, idx1 = -1, idx2 = -1, isSwap = false) {
    this.steps.push({ arr: [...arr], idx1, idx2, isSwap });
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  async play(domArr) {
    this.isPlaying = true;
    while (this.currentStep < this.steps.length && this.isPlaying) {
      const { arr, idx1, idx2, isSwap } = this.steps[this.currentStep];
      await updateDOM(arr, this.speed, domArr, isSwap, idx1, idx2);
      this.currentStep++;
    }
  }

  pause() {
    this.isPlaying = false;
  }

  async next(domArr) {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      const { arr, idx1, idx2, isSwap } = this.steps[this.currentStep];
      await updateDOM(arr, this.speed, domArr, isSwap, idx1, idx2);
    }
  }

  async prev(domArr) {
    if (this.currentStep > 0) {
      this.currentStep--;
      const { arr, idx1, idx2, isSwap } = this.steps[this.currentStep];
      await updateDOM(arr, this.speed, domArr, isSwap, idx1, idx2);
    }
  }
}

const sortController = new SortController();

async function updateDOM(
  updatedArr,
  delayMs,
  domArr,
  isSwap,
  idx1 = -1,
  idx2 = -1
) {
  if (!domArr) {
    console.error("DOM element not found: domArr is null");
    return;
  }

  domArr.innerHTML = updatedArr
    .map((e, idx) => {
      return `<span class="array-element" data-idx="${idx}" data-val="${e}">${e}<span class="bar" style="background-color: ${
        idx === idx1 || idx === idx2 ? "rebeccapurple" : "gray"
      };"></span></span>`;
    })
    .join(" ");

  document.querySelectorAll(".bar").forEach((bar) => {
    let value = parseInt(bar.parentElement.dataset.val);
    bar.style.height = `${Math.max(1, Math.min(100, value + 20))}px`;
  });

  await delay(delayMs);
}

// async function updateDOM(
//   updatedArr,
//   delayMs,
//   domArr,
//   isSwap,
//   idx1 = -1,
//   idx2 = -1
// ) {
//   let element1 = document.querySelector(`span[idx="${idx1}"]`);
//   let element2 = document.querySelector(`span[idx="${idx2}"]`);

//   if (isSwap) {
//     domArr.innerHTML = `
//         ${updatedArr
//           .map((e, idx) => {
//             return idx === idx1 || idx === idx2
//               ? `<span class="array-element" data-idx="${idx}" data-val="${e}">${e}<span class="bar" style="background-color:rebeccapurple;"></span></span>`
//               : `<span class="array-element" data-idx="${idx}" data-val="${e}">${e}<span class="bar"></span></span>`;
//           })
//           .join(" ")}
//       `;
//     let bars = document.querySelectorAll(".bar");
//     bars.forEach((bar) => {
//       let elementValue = bar.parentElement.dataset.val;
//       if (elementValue <= 0) {
//         bar.style.height = "1px";
//       } else if (elementValue > 500) {
//         bar.style.height = "100px";
//       } else {
//         bar.style.height = `${parseInt(elementValue) + 20}px`;
//       }
//     });
//   }

//   await delay(delayMs);

//   if (element1 && element2) {
//     element1.style.backgroundColor = "";
//     element2.style.backgroundColor = "";
//   }
// }

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function swapArrayElements(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
function getNumbersFromInput(input) {
  return input
    .split(",")
    .map((item) => item.trim()) // Remove extra spaces
    .filter((item) => !isNaN(item) && item !== "") // Filter valid numbers
    .map(Number); // Convert to numbers
}
export {
  visualizeSort,
  updateDOM,
  swapArrayElements,
  sortController,
  getNumbersFromInput,
};
