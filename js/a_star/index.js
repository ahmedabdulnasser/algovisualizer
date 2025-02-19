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
        this.squareList = [];
        this.start = undefined;
        this.end = undefined;
        this.paintComponent();
        this.isMouseDown = false;
        this.grid.addEventListener('mouseup', () => this.isMouseDown = false);
        this.grid.addEventListener('mouseleave', () => this.isMouseDown = false);
        window.addEventListener('resize', 
            () => this.paintComponent()
        );
    }

    paintComponent() {
        const girds_parent = this.grid.parentNode;
        const size = 20; 

        const numCols = Math.floor(girds_parent.offsetWidth / size) - 1;
        const numRows = Math.floor(girds_parent.offsetHeight / size) -1;

        this.grid.style.setProperty('--num-cols', numCols);
        this.grid.style.setProperty('--num-rows', numRows);

        this.squareList = [];
        this.grid.innerHTML = '';

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                const square = document.createElement('div');
                square.style.width = size + 'px';
                square.style.height = size + 'px';
                square.dataset.clicked = "false";
                square.classList.add('square');
                this.grid.appendChild(square);
                square.addEventListener('click',function() {
                    if (square.dataset.clicked === "false") {
                        square.style.backgroundColor = 'black';
                        square.dataset.clicked = "true";
                    } else {
                        square.style.backgroundColor = 'white';
                        square.dataset.clicked = "false";
                    }
                });
                square.addEventListener('mousedown', () => {
                    this.isMouseDown = true;
                    this.toggleSquareColor(square);
                });

                square.addEventListener('mouseover', () => {
                    if (this.isMouseDown) {
                        this.toggleSquareColor(square);
                    }
                });

                square.addEventListener('click', () => {
                    this.toggleSquareColor(square);
                });
                this.squareList.push(square);
            }
        }
    }

    toggleSquareColor(square, from_color="white" ,to_color="black") {
        const isClicked = square.dataset.clicked === "true";
        square.style.backgroundColor = isClicked ? from_color : to_color;
        square.dataset.clicked = !isClicked;
    }
}

var main = new Main();