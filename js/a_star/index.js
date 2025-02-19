function paintComponent() {
    const grid = document.getElementById('grid');
    const girds_parent = grid.parentNode;
    const size = 20; 

    const numCols = Math.floor(girds_parent.offsetWidth / size) - 1;
    const numRows = Math.floor(girds_parent.offsetHeight / size) -1;

    grid.style.setProperty('--num-cols', numCols);
    grid.style.setProperty('--num-rows', numRows);

    grid.innerHTML = '';

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const square = document.createElement('div');
            square.style.width = size + 'px';
            square.style.height = size + 'px';
            square.classList.add('square');
            grid.appendChild(square);
        }
    }
}

paintComponent();

window.addEventListener('resize', paintComponent);