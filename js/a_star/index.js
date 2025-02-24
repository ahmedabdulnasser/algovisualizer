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
        this.isSKeyPressed = false;
        this.isEKeyPressed = false;
        this.allowDiagonal = false;

        this.grid.addEventListener('mouseup', () => this.isMouseDown = false);
        this.grid.addEventListener('mouseleave', () => this.isMouseDown = false);
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        this.diagonalCheckbox = document.getElementById('diagonal');
        this.resetButton = document.getElementById('reset');
        this.openNodesCount = document.getElementById('open_nodes_count');
        this.closedNodesCount = document.getElementById('closed_nodes_count');
        this.pathNodesCount = document.getElementById('path_nodes_count');
        this.startButton = document.getElementById('run');

        this.diagonalCheckbox.addEventListener('change', () => {
            this.allowDiagonal = this.diagonalCheckbox.checked;
        });
        this.resetButton.addEventListener('click', () => this.resetGrid());
        this.startButton.addEventListener('click', () => this.findPath());
    
        // window.addEventListener('resize', 
        //     () => this.paintComponent()
        // );
    }

    paintComponent() {
        const gridParent = this.grid.parentNode;

        this.numCols = Math.floor(gridParent.offsetWidth / this.size) - 1;
        this.numRows = Math.floor(gridParent.offsetHeight / this.size) - 1;

        this.grid.style.setProperty('--num-cols', this.numCols);
        this.grid.style.setProperty('--num-rows', this.numRows);
        this.grid.style.setProperty('--size', this.size + 'px');

        this.squareList = [];
        this.grid.innerHTML = '';

        for (let i = 0; i < this.numCols; i++) {
            for (let j = 0; j < this.numRows; j++) {
                const square = document.createElement('div');
                square.style.width = `${this.size}px`;
                square.style.height = `${this.size}px`;
                square.dataset.Hcost = 0;
                square.dataset.Gcost = 0;
                square.dataset.Fcost = 0;
                square.dataset.type = "none";
                square.dataset.x = i;
                square.dataset.y = j;
                square.classList.add('square');
                this.grid.appendChild(square);

                square.addEventListener('mousedown', (e) => {
                    this.isMouseDown = true;
                    if (e.button === 0) {
                        if (this.isSKeyPressed && !this.start) {
                            this.toggleStartNode(square);
                        } else if (this.isEKeyPressed && !this.end) {
                            this.toggleEndNode(square);
                        } else if(square !== this.start && square !== this.end && !this.isSKeyPressed && !this.isEKeyPressed) {
                            this.toggleSquareColor(square);
                        }
                    } else if (e.button === 2) {
                        if (square !== this.start && square !== this.end) {
                            this.toggleSquareColor(square, "white");
                        } else if (square === this.start && this.start && this.isSKeyPressed) {
                            this.toggleStartNode(square);
                        } else if (square === this.end && this.end && this.isEKeyPressed) {
                            this.toggleEndNode(square);
                        }
                    }
                });

                square.addEventListener('mouseover', (e) => {
                    if (this.isMouseDown) {
                        if (e.buttons === 1) {
                            if (this.isSKeyPressed && !this.start) {
                                this.toggleStartNode(square);
                            } else if (this.isEKeyPressed && !this.end) {
                                this.toggleEndNode(square);
                            } else if (square !== this.start && square !== this.end && !this.isSKeyPressed && !this.isEKeyPressed) {
                                this.toggleSquareColor(square);
                            }
                        } else if (e.buttons === 2) {
                            if (square !== this.start && square !== this.end) {
                                this.toggleSquareColor(square, "white");
                            } else if (square === this.start && this.start && this.isSKeyPressed) {
                                this.toggleStartNode(square);
                            } else if (square === this.end && this.end && this.isEKeyPressed) {
                                this.toggleEndNode(square);
                            }
                        }
                    }
                });

                this.squareList.push(square);
            }
        }
    }

    toggleSquareColor(square, color = "black") {
        square.style.backgroundColor = color;
        square.dataset.type = square.dataset.type === "wall" ? "none" : "wall";
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

    handleKeyDown(e) {
        if (e.code === 'KeyS') {
            this.isSKeyPressed = true;
        } else if (e.code === 'KeyE') {
            this.isEKeyPressed = true;
        }
    }

    handleKeyUp(e) {
        if (e.code === 'KeyS') {
            this.isSKeyPressed = false;
        } else if (e.code === 'KeyE') {
            this.isEKeyPressed = false;
        }
    }

    toggleStartNode(square) {
        if (this.start === square) {
            square.dataset.type = "none";
            square.style.backgroundColor = "white";
            this.start = null;
        } else {
            if (this.start) {
                this.start.dataset.type = "none";
                this.start.style.backgroundColor = "white";
            }
            square.dataset.type = "start";
            square.style.backgroundColor = "green";
            this.start = square;
        }
    }

    toggleEndNode(square) {
        if (this.end === square) {
            square.dataset.type = "none";
            square.style.backgroundColor = "white";
            this.end = null;
        } else {
            if (this.end) {
                this.end.dataset.type = "none";
                this.end.style.backgroundColor = "white";
            }
            square.dataset.type = "end";
            square.style.backgroundColor = "red";
            this.end = square;
        }
    }

    resetGrid() {
        this.start = null;
        this.end = null;
        this.squareList.forEach(square => {
            square.dataset.type = "none";
            square.style.backgroundColor = "white";
        });
        this.updateNodeCounts(0, 0, 0);
    }

    updateNodeCounts(openNodes, closedNodes, pathNodes) {
        this.openNodesCount.textContent = openNodes;
        this.closedNodesCount.textContent = closedNodes;
        this.pathNodesCount.textContent = pathNodes;
    }

    findPath() {
        
    }
}

var main = new Main();