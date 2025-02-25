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

        for (let y = 0; y < this.numRows; y++) {
            for (let x = 0; x < this.numCols; x++) {
                const square = document.createElement('div');
                square.style.width = `${this.size}px`;
                square.style.height = `${this.size}px`;
                square.dataset.Hcost = 0;
                square.dataset.Gcost = 0;
                square.dataset.Fcost = 0;
                square.dataset.type = "none";
                square.dataset.x = x;
                square.dataset.y = y;
                square.classList.add('square');
                this.grid.appendChild(square);

                square.addEventListener('mousedown', (e) => {
                    this.isMouseDown = true;
                    if (e.button === 0) {
                        if (this.isSKeyPressed && !this.start) {
                            this.toggleStartNode(square);
                        } else if (this.isEKeyPressed && !this.end) {
                            this.toggleEndNode(square);
                        } else if (square !== this.start && square !== this.end && !this.isSKeyPressed && !this.isEKeyPressed) {
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
        if (!this.start || !this.end) {
            alert("Please set both a start and an end node.");
            return;
        }

        const gridArray = [];
        for (let y = 0; y < this.numRows; y++) {
            const row = [];
            for (let x = 0; x < this.numCols; x++) {
                row.push("open");
            }
            gridArray.push(row);
        }

        for (const square of this.squareList) {
            const x = parseInt(square.dataset.x);
            const y = parseInt(square.dataset.y);
            if (square.dataset.type === "wall") {
                gridArray[y][x] = "wall";
            }
        }

        const astar = new Astar(
            gridArray,
            { x: parseInt(this.start.dataset.x), y: parseInt(this.start.dataset.y) },
            { x: parseInt(this.end.dataset.x), y: parseInt(this.end.dataset.y) },
            this.allowDiagonal
        );

        const path = astar.findPath();

        if (path) {
            for (const node of path) {
                const square = this.squareList[node.y * this.numCols + node.x];
                if (square !== this.start && square !== this.end) {
                    square.style.backgroundColor = "yellow";
                }
            }
            this.updateNodeCounts(astar.openSet.length, astar.closedSet.size, path.length);
        } else {
            alert("No path found!");
        }
    }
}

class Astar {
    constructor(grid, start, end, allowDiagonal = false) {
        this.grid = grid;
        this.start = start;
        this.end = end;
        this.allowDiagonal = allowDiagonal;
        this.openSet = [this.start];
        this.closedSet = new Set();
    }

    heuristic(node) {
        const dx = Math.abs(node.x - this.end.x);
        const dy = Math.abs(node.y - this.end.y);
        return this.allowDiagonal
            ? Math.sqrt(dx * dx + dy * dy)
            : dx + dy;
    }

    getNeighbors(node) {
        const neighbors = [];
        const { x, y } = node;

        const directions = [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 },
        ];

        if (this.allowDiagonal) {
            directions.push(
                { x: -1, y: -1 },
                { x: 1, y: -1 },
                { x: -1, y: 1 },
                { x: 1, y: 1 }
            );
        }

        for (const dir of directions) {
            const nx = x + dir.x;
            const ny = y + dir.y;

            if (
                nx >= 0 &&
                nx < this.grid[0].length &&
                ny >= 0 &&
                ny < this.grid.length &&
                this.grid[ny][nx] !== "wall"
            ) {
                neighbors.push({ x: nx, y: ny });
            }
        }

        return neighbors;
    }

    findPath() {
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        gScore.set(`${this.start.x},${this.start.y}`, 0);
        fScore.set(`${this.start.x},${this.start.y}`, this.heuristic(this.start));

        while (this.openSet.length > 0) {
            let current = this.openSet[0];

            for (let i = 1; i < this.openSet.length; i++) {
                const node = this.openSet[i];
                if (fScore.get(`${node.x},${node.y}`) < fScore.get(`${current.x},${current.y}`)) {
                    current = node;
                }
            }

            if (current.x === this.end.x && current.y === this.end.y) {
                return this.reconstructPath(cameFrom, current);
            }

            this.openSet.splice(this.openSet.indexOf(current), 1);
            this.closedSet.add(`${current.x},${current.y}`);

            const neighbors = this.getNeighbors(current);
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;

                if (this.closedSet.has(neighborKey)) continue;

                const gCost_to_neighbor = gScore.get(`${current.x},${current.y}`) + 1;

                if (!this.openSet.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
                    this.openSet.push(neighbor);
                } else if (gCost_to_neighbor >= (gScore.get(neighborKey) || Infinity)) {
                    continue;
                }

                cameFrom.set(neighborKey, current);
                gScore.set(neighborKey, gCost_to_neighbor);
                fScore.set(neighborKey, gCost_to_neighbor + this.heuristic(neighbor));
            }
        }

        return null;
    }

    reconstructPath(cameFrom, current) {
        const path = [current];
        while (cameFrom.has(`${current.x},${current.y}`)) {
            current = cameFrom.get(`${current.x},${current.y}`);
            path.unshift(current);
        }
        return path;
    }
}

var main = new Main();