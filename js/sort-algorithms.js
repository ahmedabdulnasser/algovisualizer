import { updateDOM, swapArrayElements } from "./utils.js";
export async function bubbleSort(arr, delayMS, domArr) {
  let n = arr.length;
  // show initial array
  //   await updateDOM(arr, delayMS, domArr, true, -1, -1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      await updateDOM(arr, delayMS, domArr, true, j, j + 1);
      if (arr[j] > arr[j + 1]) {
        // Visualize swap
        swapArrayElements(arr, j, j + 1);
        await updateDOM(arr, delayMS, domArr, true, j, j + 1);
        console.log(arr);
      }
    }
  }
}
export async function selectionSort(arr, delayMS, domArr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    // Assume the current position holds
    // the minimum element
    let min_idx = i;

    // Iterate through the unsorted portion
    // to find the actual minimum
    for (let j = i + 1; j < n; j++) {
      //   await updateDOM(arr, delayMS, domArr, true, j, min_idx);
      if (arr[j] < arr[min_idx]) {
        // Update min_idx if a smaller element is found
        min_idx = j;
      }
    }

    // Move minimum element to its
    // correct position
    let temp = arr[i];
    arr[i] = arr[min_idx];
    arr[min_idx] = temp;
    console.log(arr[i], arr[min_idx]);
    await updateDOM(arr, delayMS, domArr, true, i, min_idx);
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

    // Highlight current element being inserted
    await updateDOM([...arr], delayMS, domArr, true, i, i);

    while (j >= 0 && arr[j] > key) {
      // Make a copy of the array for visualization
      let tempArr = [...arr];

      // Shift element
      arr[j + 1] = arr[j];

      // Show the shift using the actual array state
      await updateDOM([...arr], delayMS, domArr, true, j, j + 1);

      j--;
    }

    // Place the key in its correct position
    arr[j + 1] = key;

    // Show final placement
    await updateDOM([...arr], delayMS, domArr, true, j + 1, i);
  }
}
// export async function insertionSort(arr, delayMS, domArr) {
//   for (let i = 1; i < arr.length; i++) {
//     let key = arr[i];
//     let j = i - 1;
//     await updateDOM(arr, delayMS, domArr, false, j, j + 1);
//     while (j >= 0 && arr[j] > key) {
//       arr[j + 1] = arr[j];
//       j--;
//       //   console.log(arr);
//     }
//     arr[j + 1] = key;
//     // console.log(arr);
//     await updateDOM(arr, delayMS, domArr, true, j, j + 1);
//   }
// }
// export async function insertionSort(arr, delayMS, domArr) {
//   for (let i = 1; i < arr.length; i++) {
//     let currentElement = arr[i];
//     let j = i - 1;

//     // Create a temporary array copy for shifting elements
//     let tempArr = [...arr];

//     // Shift elements that are greater than currentElement
//     while (j >= 0 && arr[j] > currentElement) {
//       tempArr[j + 1] = tempArr[j];
//       j--;
//     }

//     // Only perform the actual array update and visualization
//     // if the element needs to move
//     if (j + 1 !== i) {
//       // Update the actual array all at once
//       for (let k = i; k > j + 1; k--) {
//         arr[k] = arr[k - 1];
//       }
//       arr[j + 1] = currentElement;
//       await updateDOM(arr, delayMS, domArr);
//       console.log(arr);
//     }
//   }
// }
