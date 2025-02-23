// function paintComponent() {
//     const grid = document.getElementById('grid');
//     const girds_parent = grid.parentNode;
//     const size = 20; 

//     const numCols = Math.floor(girds_parent.offsetWidth / size) - 1;
//     const numRows = Math.floor(girds_parent.offsetHeight / size) -1;

//     grid.style.setProperty('--num-cols', numCols);
//     grid.style.setProperty('--num-rows', numRows);

//     grid.innerHTML = '';

//     for (let i = 0; i < numRows; i++) {
//         for (let j = 0; j < numCols; j++) {
//             const square = document.createElement('div');
//             square.style.width = size + 'px';
//             square.style.height = size + 'px';
//             square.classList.add('square');
//             grid.appendChild(square);
//         }
//     }
// }

// paintComponent();

// window.addEventListener('resize', paintComponent);

class Main {
    constructor() {
        this.grid = document.getElementById('grid');
        this.size = 60;
        this.squareList = [];
        this.start = null;
        this.end = null;
        this.paintComponent();
        this.isMouseDown = false;
        this.grid.addEventListener('mouseup', () => this.isMouseDown = false);
        this.grid.addEventListener('mouseleave', () => this.isMouseDown = false);
        // window.addEventListener('resize', 
        //     () => this.paintComponent()
        // );
    }

    paintComponent() {
        const gridParent = this.grid.parentNode;

        const numCols = Math.floor(gridParent.offsetWidth / this.size) - 1;
        const numRows = Math.floor(gridParent.offsetHeight / this.size) - 1;

        this.grid.style.setProperty('--num-cols', numCols);
        this.grid.style.setProperty('--num-rows', numRows);
        this.grid.style.setProperty('--size', this.size + 'px');

        this.squareList = [];
        this.grid.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 1; j++) {
                const square = document.createElement('div');
                square.style.width = `${this.size}px`;
                square.style.height = `${this.size}px`;
                square.dataset.clicked = "false";
                square.dataset.Hcost = 0;
                square.dataset.Gcost = 0;
                square.dataset.Fcost = 0;
                square.classList.add('square');
                this.grid.appendChild(square);
                this.drawCosts(square);

                square.addEventListener('mousedown', (e) => {
                    this.isMouseDown = true;
                    if (e.button === 0) {
                        this.toggleSquareColor(square);
                    } else if (e.button === 2) {
                        this.toggleSquareColor(square, "white");
                    }
                });

                square.addEventListener('mouseover', (e) => {
                    if (this.isMouseDown) {
                        if (e.buttons === 1) {
                            this.toggleSquareColor(square);
                        } else if (e.buttons === 2) {
                            this.toggleSquareColor(square, "white");
                        }
                    }
                });

                this.squareList.push(square);
            }
        }
    }

    toggleSquareColor(square, color="black") {
        square.style.backgroundColor = color;
        square.dataset.clicked = square.dataset.clicked === "true" ? "false" : "true";
    }

    drawCosts(square) {
        const Hcost = document.createElement('p');
        Hcost.classList.add('hcost');
        Hcost.textContent = square.dataset.Hcost;
        square.appendChild(Hcost);

        const Gcost = document.createElement('p');
        Gcost.classList.add('gcost');
        Gcost.textContent = square.dataset.Gcost;
        square.appendChild(Gcost);

        const Fcost = document.createElement('p');
        Fcost.classList.add('fcost');
        Fcost.textContent = square.dataset.Fcost;
        square.appendChild(Fcost);
    }
}

var main = new Main();