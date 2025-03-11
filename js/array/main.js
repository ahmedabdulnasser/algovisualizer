import { Utils } from "./utils.js";
import { Visualize } from "./algorithms.js";

document.addEventListener("DOMContentLoaded", () => {
    Utils.renderArr();
    if (document.title.startsWith("S")) {
        Visualize.slidingWindow();
    }
    if (document.title.startsWith("L")) {
        console.log("linear");
        Visualize.linearSearch();
    }
    if (document.title.startsWith("P")) {
        Visualize.prefixSum();
    }
});
