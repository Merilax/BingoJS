class Carton {

    rows = 3;
    columns = 9;
    cellNum = [];
    cellMarked = [];
    info = "";
    complete = true;

    // CONSTRUCTORS
    constructor() {
        // Init arrays.
        for (let i = 0; i < this.columns; i++) {
            this.cellNum.push([]);
            this.cellMarked.push([]);
        }
        // Genereate unique numbers.
        for (let i = 0; i < this.columns; i++) {
            let numUsed = [];
            for (let j = 0; j < this.rows; j++) {
                // No duplicates check.
                let repeat = true;
                while (repeat) {
                    let localRandom = Math.round(
                        (Math.random() * 9 + 1) + i * 10
                    );
                    repeat = false;
                    numUsed.forEach(x => {
                        if (localRandom === x) repeat = true;
                    });
                    if (!repeat) {
                        // Assign number to appropiate column.
                        this.cellNum[i].push(localRandom);
                        this.cellMarked[i].push(false);
                        numUsed.push(localRandom);
                    }
                }
            }
        }
        // Sort
        this.cellNum.forEach(arr => {
            arr.sort((a, b) => a - b);
        });
        console.log(this.cellNum)
        // Fill slots with empty spaces so that only 5 numbers exist per row.
        for (let i = 0; i < this.rows; i++) {
            let posUsed = [];
            for (let j = 0; j < this.columns - 5; j++) {
                let repeat = true;
                while (repeat) {
                    let localRandom = Math.round(Math.random() * (this.columns - 1));
                    repeat = false;
                    posUsed.forEach(x => {
                        if (localRandom === x) repeat = true;
                    });
                    if (!repeat) {
                        // Assign empty space (0) and true to cell.
                        this.cellNum[localRandom][i] = 0;
                        this.cellMarked[localRandom][i] = true;
                        posUsed.push(localRandom);
                    }
                }
            }
        }
    }

    // SETTERS
    // returns true on complete card, or false.
    setCell(num) {
        // Find number and set to marked.
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.cellNum[i][j] == num) {
                    this.cellMarked[i][j] = true;
                }
            }
        }
        // Check for unmarked cells, otherwise keep flag true and return
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (this.cellMarked[i][j] == false) {
                    this.complete = false;
                }
            }

        }
        if (this.complete) {
            return true;
        }
        this.complete = true;
        return false;
    }
}
