import { selectionSort } from "../../js/sort-algorithms.js";
import { visualizeSort, getNumbersFromInput } from "../../js/utils.js";

let domArr = document.getElementById("previewArr");
let arrInput = document.getElementById("arr-input");
let renderBtn = document.getElementById("render-btn");
const validationRegex = /^\s*-?\d+(\s*,\s*-?\d+)*\s*$/; //Comma-separated numbers regex
let testArr = [23, 2, 10, 1, 2, 20, -1, -50, 1, 2, 33, 9999];
let renderedArray = [];

renderBtn.addEventListener("click", () => {
  let userInput = arrInput.value;
  console.log(userInput);

  if (validationRegex.test(userInput)) {
    renderedArray = getNumbersFromInput(userInput);
    arrInput.style.outline = "";
    visualizeSort(renderedArray, selectionSort, 750, domArr);
  } else {
    arrInput.style.outline = "1px solid red";
    throw "Wrong array input. Please make sure you have entered comma-separated numbers.";
  }
});
if (renderedArray.length <= 0) renderedArray = [...testArr];

visualizeSort(renderedArray, selectionSort, 750, domArr);
