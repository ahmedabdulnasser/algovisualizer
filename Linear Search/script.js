const cells = document.querySelectorAll(".div");
const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", async () => {
    const target = parseInt(document.getElementById("q").value);
    const searchFor = document.querySelector(".search");
    const currIndex = document.querySelector(".index");
    const result = document.querySelector(".result");

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.add("curr");
        searchFor.innerHTML = target;
        currIndex.innerHTML = i;

        await new Promise((resolve) => setTimeout(resolve, 1000));
        cells[i].classList.remove("curr");

        if (parseInt(cells[i].innerHTML) === target) {
            cells[i].classList.remove("curr");
            cells[i].classList.add("found");
            result.innerHTML = i;
            break;
        } else {
            cells[i].classList.add("visited");
        }
    }
    if (result.innerHTML === "") {
        result.innerHTML = -1;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
    searchFor.innerHTML = "";
    currIndex.innerHTML = "";
    result.innerHTML = "";

    cells.forEach((cell) => {
        cell.classList.remove("visited");
        cell.classList.remove("curr");
        cell.classList.remove("found");
    });
});
