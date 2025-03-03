import {
  bubbleSort,
  countingSort,
  insertionSort,
  selectionSort,
} from "./sort-algorithms.js";
import { visualizeSort } from "./utils.js";
let arr = [23, 2, 10, 1, 2, 20, -1, -50, 1, 2, 33, 9999];
let domArr = document.getElementsByClassName("previewArr")[0];

visualizeSort(arr, selectionSort, 200, domArr);
