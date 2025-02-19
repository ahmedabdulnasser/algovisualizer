// Sort Relevant Utils
async function visualizeSort(arr, sortFn, delayMS, domArr) {
  await sortFn(arr, delayMS, domArr);
}
async function updateDOM(
  updatedArr,
  delayMs,
  domArr,
  isSwap,
  idx1 = -1,
  idx2 = -1
) {
  let element1 = document.querySelector(`span[idx="${idx1}"]`);
  let element2 = document.querySelector(`span[idx="${idx2}"]`);

  if (isSwap) {
    domArr.innerHTML = `
        ${updatedArr
          .map((e, idx) => {
            return idx === idx1 || idx === idx2
              ? `<span idx="${idx}" style="background-color: red;">${e}</span>`
              : `<span idx="${idx}">${e}</span>`;
          })
          .join(" ")}
      `;
  }
  // else {
  //   if (element1 && element2) {
  //     element1.style.backgroundColor = "red";
  //     element2.style.backgroundColor = "red";
  //   }
  // }

  await delay(delayMs);

  if (element1 && element2) {
    element1.style.backgroundColor = "";
    element2.style.backgroundColor = "";
  }
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
//             ${updatedArr
//               .map((e, idx) => {
//                 return idx === idx1 || idx === idx2
//                   ? `<span idx="${idx}" style="background-color: red;">${e}</span>`
//                   : `<span idx="${idx}">${e}</span>`;
//               })
//               .join(" ")}
//     `;
//   } else {
//     if (element1 && element2) {
//       element1.style.backgroundColor = "red";
//       element2.style.backgroundColor = "red";
//     }
//   }
//   if (element1 && element2) {
//     element1.style.backgroundColor = "";
//     element2.style.backgroundColor = "";
//   }
//   await delay(delayMs);

// }
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function swapArrayElements(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

export { visualizeSort, updateDOM, swapArrayElements };
