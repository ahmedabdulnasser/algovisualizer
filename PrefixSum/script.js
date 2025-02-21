const arrCells = document.querySelectorAll(".arr-div");
const prefixSumCells = document.querySelectorAll(".prefix-sum-div");
const randomizeBtn = document.getElementById("randomize");
const startBtn = document.getElementById("start");

randomizeBtn.addEventListener("click", () => {
    const arr = Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 100)
    );
    arr.forEach((num, idx) => {
        arrCells[idx].textContent = num;
    });
});

startBtn.addEventListener("click", async () => {
    const processDiv = document.querySelector(".process");
    const leftLimit = parseInt(document.getElementById("left").value);
    const RightLimit = parseInt(document.getElementById("right").value);

    const arr = Array.from(arrCells).map((cell) => parseInt(cell.textContent));

    let prefixSum = 0;
    let result = RightLimit - (leftLimit - 1);
    prefixSumCells[leftLimit].classList.add("curr");
    prefixSumCells[RightLimit].classList.add("curr");

    for (let idx = 0; idx < arr.length; idx++) {
        // Update the process div to show the current step
        processDiv.style.display = "flex";
        processDiv.classList.add("curr");
        processDiv.textContent = `Step ${idx + 1}: Adding ${
            arr[idx]
        } to ${prefixSum}`;

        // Add the 'curr' class to highlight the current cell
        arrCells[idx].classList.add("curr");

        // Wait for 1 second before proceeding
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update the prefix sum
        prefixSum += arr[idx];
        prefixSumCells[idx].textContent = prefixSum;

        if (idx === result) {
            prefixSumCells[idx].classList.add("found");
        }
        // Remove the 'curr' class and add the 'visited' class
        arrCells[idx].classList.remove("curr");
        arrCells[idx].classList.add("visited");
    }

    // Final message when the process is complete
    processDiv.classList.remove("curr");
    processDiv.classList.add("found");
    processDiv.textContent = `Process complete! Result: ${prefixSumCells[result].textContent}`;

    await new Promise((resolve) => setTimeout(resolve, 5000));
    arrCells.forEach((cell) => {
        cell.classList.remove("curr", "visited");
    });
    prefixSumCells.forEach((cell) => {
        cell.classList.remove("curr", "visited", "found");
        cell.textContent = "";
    });
    processDiv.style.display = "none";
});
