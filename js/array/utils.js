class Utils {
    static isStopped = false;
    static currentIndex = 0;
    static currentSpeed = 1000;

    static renderArr(isRandom) {
        const previewArr = document.getElementById("previewArr");
        previewArr.innerHTML = "";
        this.currentIndex = 0;

        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        if (typeof isRandom !== "undefined") {
            if (!isRandom) {
                arr = Utils.getUserInputArr();
            } else {
                arr = [];
                for (let i = 0; i < 10; i++) {
                    arr.push(Math.floor(Math.random() * 101));
                }
            }
        }
        for (const el of arr) {
            if (isNaN(el)) {
                alert("Please enter array values first!");
                return;
            }
            const div = document.createElement("div");
            div.textContent = el;
            div.classList.add("array-element");
            previewArr.appendChild(div);
        }
    }
    static initPrefixArray() {
        const previewArr = document.getElementById("previewArr");
        const prefixSumArray = document.getElementById("prefixSumArray");

        prefixSumArray.innerHTML = "";
        const mainElements = previewArr.querySelectorAll(".array-element");

        mainElements.forEach(() => {
            const el = document.createElement("div");
            el.className = "array-element prefix-element";
            el.textContent = "0";
            prefixSumArray.appendChild(el);
        });
    }
    static restart() {
        const restartBtn = document.getElementById("playAgainBtn");
        restartBtn.addEventListener("click", () => {
            window.location.reload();
        });
    }

    static stop = () => {
        Utils.isStopped = true;
    };

    static controlSpeed(query) {
        const speedValue = document.getElementById("speedValue");

        // Define the speed multipliers
        const speedMultipliers = [0.5, 1, 1.5, 2, 2.5, 3];
        const baseDelay = 1000; // 1 second base delay

        // Find the current multiplier index
        let currentMultiplierIndex = speedMultipliers.indexOf(
            baseDelay / Utils.currentSpeed
        );

        // If current speed is not in the multipliers array, default to 1x
        if (currentMultiplierIndex === -1) {
            currentMultiplierIndex = 1; // Default to 1x
            Utils.currentSpeed =
                baseDelay / speedMultipliers[currentMultiplierIndex];
        }

        if (query === "inc") {
            // Increase speed (decrease delay)
            currentMultiplierIndex = Math.min(
                speedMultipliers.length - 1,
                currentMultiplierIndex + 1
            );
        }

        if (query === "dec") {
            // Decrease speed (increase delay)
            currentMultiplierIndex = Math.max(0, currentMultiplierIndex - 1);
        }

        // Update the current speed based on the selected multiplier
        Utils.currentSpeed =
            baseDelay / speedMultipliers[currentMultiplierIndex];
        speedValue.textContent = `${speedMultipliers[currentMultiplierIndex]}x`;
    }

    static getUserInputArr = () => {
        const input = document.getElementById("arr-input").value.trim();

        if (!input) {
            alert("Please enter comma-separated array values!");
            return [];
        }

        const arr = input.split(",").map((el) => el.trim());

        const isValid = arr.every((el) => !isNaN(el) && el !== "");
        if (!isValid) {
            alert(
                "Invalid input! Please enter only numbers separated by commas."
            );
            return [];
        }

        // Convert to numbers and return
        return arr.map((el) => parseInt(el));
    };

    static callEventHandlers() {
        const renderBtn = document.getElementById("render-btn");
        const randomBtn = document.getElementById("random-btn");
        const pauseBtn = document.getElementById("pauseBtn");
        const speedDecBtn = document.getElementById("decSpeed");
        const speedIncBtn = document.getElementById("incSpeed");

        renderBtn.onclick = () => Utils.renderArr(false);
        randomBtn.onclick = () => Utils.renderArr(true);
        pauseBtn.onclick = () => Utils.stop();
        speedDecBtn.onclick = () => Utils.controlSpeed("dec");
        speedIncBtn.onclick = () => Utils.controlSpeed("inc");

        Utils.restart();
    }

    static async delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

export { Utils };
