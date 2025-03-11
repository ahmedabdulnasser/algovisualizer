import { Utils } from "./utils.js";

class Visualize {
    static async slidingWindow() {
        const renderBtn = document.getElementById("render-btn");
        const randomBtn = document.getElementById("random-btn");
        const playBtn = document.getElementById("playBtn");

        Utils.callEventHandlers();

        playBtn.addEventListener("click", async () => {
            Utils.isStopped = false;
            renderBtn.disabled = true;
            randomBtn.classList.add("disabled");

            const arr = document.querySelectorAll(".array-element");
            const currSumElement = document.getElementById("currSum");
            const maxSumElement = document.getElementById("maxSum");
            const resultPopup = document.querySelector(".popup");
            const result = document.getElementById("result");

            const windowSize = Number(
                document.getElementById("window-size-input").value || 3
            );
            let maxSum = -Infinity; // Initialize maxSum to track the maximum sum found

            // Clear all highlights before starting/resuming the loop
            arr.forEach((el) => el.classList.remove("highlight"));
            for (
                let i = Utils.currentIndex;
                i <= arr.length - windowSize;
                i++
            ) {
                if (Utils.isStopped) {
                    // Save the current index and exit the loop if visualization is stopped
                    Utils.currentIndex = i;
                    break;
                }

                let currentSum = 0;
                // Highlight the current window
                for (let j = i; j < i + windowSize; j++) {
                    arr[j].classList.add("highlight");
                    currentSum += Number(arr[j].textContent); // Calculate the sum of the current window
                }

                // Update the current sum and max sum in the UI
                currSumElement.textContent = `Current Sum: ${currentSum}`;

                if (currentSum > maxSum) {
                    maxSum = currentSum;
                    maxSumElement.textContent = `Max Sum: ${maxSum}`;

                    // Add the "found" class to currSumElement
                    currSumElement.classList.remove("not-found");
                    currSumElement.classList.add("found");
                    await Utils.delay(Utils.currentSpeed);
                    currSumElement.classList.remove("found");

                    await Utils.delay(Utils.currentSpeed);

                    maxSumElement.classList.add("highlight");
                    await Utils.delay(Utils.currentSpeed);
                    maxSumElement.classList.remove("highlight");
                } else {
                    // Add the "not-found" class to currSumElement
                    currSumElement.classList.remove("found");
                    await Utils.delay(Utils.currentSpeed);
                    currSumElement.classList.add("not-found");
                }
                // Wait for a short duration to visualize the step
                await Utils.delay(Utils.currentSpeed);

                // Remove the highlight from the current window
                if (!Utils.isStopped) {
                    for (let j = i; j < i + windowSize; j++) {
                        arr[j].classList.remove("highlight");
                    }
                }
                // Update the current index
                Utils.currentIndex = i + 1;
            }
            if (!Utils.isStopped) {
                // Only show the result popup if the visualization was not stopped
                // currSumElement.classList.remove("not-found");
                resultPopup.style.display = "flex";
                result.innerHTML = `${maxSum}`;
                Utils.currentIndex = 0; // Reset the current index after completion
            }

            renderBtn.disabled = false;
            randomBtn.classList.remove("disabled");
        });
    }

    static async linearSearch() {
        const renderBtn = document.getElementById("render-btn");
        const randomBtn = document.getElementById("random-btn");
        const playBtn = document.getElementById("playBtn");

        //!
        Utils.callEventHandlers();
        //!

        playBtn.addEventListener("click", async () => {
            Utils.isStopped = false;
            renderBtn.disabled = true;
            randomBtn.classList.add("disabled");

            const arr = document.querySelectorAll(".array-element");
            const currElement = document.getElementById("currElement");
            const targetValue = document.getElementById("targetValue");
            const resultPopup = document.querySelector(".popup");
            const result = document.getElementById("result");

            const target = Number(
                document.getElementById("target-input-field").value
            );
            if (target === 0) {
                alert("You Should enter a number before search!");
                return;
            }
            targetValue.textContent = `Target: ${target}`;

            let foundIndex = -1;

            arr.forEach((el) => el.classList.remove("highlight", "found"));

            for (let i = Utils.currentIndex; i < arr.length; i++) {
                if (Utils.isStopped) {
                    Utils.currentIndex = i;
                    break;
                }

                // Highlight current element
                arr[i].classList.add("highlight");
                currElement.textContent = `Current Element: ${arr[i].textContent}`;
                currElement.classList.add("highlight");
                await Utils.delay(Utils.currentSpeed);
                currElement.classList.remove("highlight");
                await Utils.delay(Utils.currentSpeed);

                // Check if current element matches target
                if (Number(arr[i].textContent) === target) {
                    foundIndex = i;
                    arr[i].classList.add("found");
                    break;
                } else {
                    arr[i].classList.add("visited");
                }

                await Utils.delay(Utils.currentSpeed);

                if (!Utils.isStopped) {
                    arr[i].classList.remove("highlight");
                }
                Utils.currentIndex = i + 1;
            }
            await Utils.delay(2000);

            if (!Utils.isStopped) {
                resultPopup.style.display = "flex";
                result.innerHTML =
                    foundIndex !== -1
                        ? `Found at index ${foundIndex}`
                        : "Target not found";
                Utils.currentIndex = 0;
            }

            renderBtn.disabled = false;
            randomBtn.classList.remove("disabled");
        });
    }

    static async prefixSum() {
        const renderBtn = document.getElementById("render-btn");
        const randomBtn = document.getElementById("random-btn");
        const playBtn = document.getElementById("playBtn");
        const previewArr = document.getElementById("previewArr");
        const prefixSumArray = document.getElementById("prefixSumArray");

        // Initialize prefix array display
        const initPrefixArray = () => {
            prefixSumArray.innerHTML = "";
            const mainElements = previewArr.querySelectorAll(".array-element");
            mainElements.forEach(() => {
                const el = document.createElement("div");
                el.className = "array-element prefix-element";
                el.textContent = "0";
                prefixSumArray.appendChild(el);
            });
        };

        // Set default values
        // document.getElementById("left").value = 0;
        // document.getElementById("right").value = 4;

        renderBtn.onclick = () => {
            Utils.renderArr(false);
            initPrefixArray();
        };

        randomBtn.onclick = () => {
            Utils.renderArr(true);
            initPrefixArray();
        };

        playBtn.addEventListener("click", async () => {
            Utils.isStopped = false;
            const mainElements = previewArr.querySelectorAll(".array-element");
            const prefixElements =
                prefixSumArray.querySelectorAll(".prefix-element");
            const left = parseInt(document.getElementById("left").value) || 0;
            const right = parseInt(document.getElementById("right").value) || 4;

            // Validation
            if (left < 0 || right >= mainElements.length || left > right) {
                alert("Invalid indices! 0 ≤ left ≤ right < array length");
                return;
            }

            let runningSum = 0;
            let rangeSum = 0;

            // Reset all elements
            mainElements.forEach((el) =>
                el.classList.remove("highlight", "found", "visited")
            );
            prefixElements.forEach((el) => {
                el.classList.remove("highlight", "found");
                el.textContent = "0";
            });

            // Highlight initial range
            mainElements[left].classList.add("mark");
            mainElements[right].classList.add("mark");

            for (let i = 0; i < mainElements.length; i++) {
                if (Utils.isStopped) break;

                // Highlight current elements
                mainElements[i].classList.add("highlight");
                prefixElements[i].classList.add("highlight");

                // Update sums
                runningSum += parseInt(mainElements[i].textContent);
                prefixElements[i].textContent = runningSum;

                // Track range sum
                if (i >= left && i <= right) {
                    rangeSum += parseInt(mainElements[i].textContent);
                }

                // Update status

                const currStep = document.getElementById("currentStep");
                currStep.textContent = `Step ${i + 1}/${mainElements.length}`;

                currStep.classList.add("highlight");
                await Utils.delay(Utils.currentSpeed);
                currStep.classList.remove("highlight");

                const currSum = document.getElementById("currentSum");
                currSum.textContent = `Running Sum: ${runningSum}`;

                currSum.classList.add("highlight");
                await Utils.delay(Utils.currentSpeed);
                currSum.classList.remove("highlight");

                await Utils.delay(Utils.currentSpeed);

                // Update element states
                mainElements[i].classList.remove("highlight");
                // mainElements[i].classList.add("visited");

                prefixElements[i].classList.remove("highlight");
                prefixElements[i].classList.add(
                    i <= right ? "found" : "visited"
                );
            }

            if (!Utils.isStopped) {
                // Calculate using prefix sum formula
                const leftVal =
                    left > 0
                        ? parseInt(prefixElements[left - 1].textContent)
                        : 0;
                const rightVal = parseInt(prefixElements[right].textContent);
                const result = rightVal - leftVal;

                // Highlight formula elements
                if (left > 0) prefixElements[left - 1].classList.add("found");
                prefixElements[right].classList.add("found");

                document.querySelector(".popup").style.display = "flex";
                document.getElementById("result").innerHTML = `
                    <span class="formula">
                        prefix[${right}] ${
                    left > 0 ? `- prefix[${left - 1}]` : ""
                } = ${result}
                    </span><br>

                    [${Array.from(prefixElements)
                        .slice(left, right + 1)
                        .map((el) => el.textContent)
                        .join(", ")}]
                `;
            }
        });

        Utils.callEventHandlers();
        Utils.renderArr();
        initPrefixArray();
    }
}

export { Visualize };
