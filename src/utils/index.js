export const createCells = (rows, columns) => {
    let cells = [];
    let cellNum = 1;

    // Simple for loop to create cells depends on the rows and columns entered
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            cells.push({
                id: `${row} - ${col}`,
                row,
                col,
                name: `Cell ${cellNum}`,  // Use the counter for the name
                active: true,
                hover: false
            });

            cellNum++;  // Increment the counter for the next cell
        }
    }

    return cells;
};
