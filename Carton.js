class Carton {

    rows = 3;
    columns = 9;
    cellNum = [];
    cellMarked = [];
    numUsed = [];
    info = "";
    complete = true;

    // CONSTRUCTORS
    constructor() {
        // Init arrays
        for (let i = 0; i < this.columns; i++) {
            this.cellNum.push([]);
            this.cellMarked.push([]);
        }
        // Genereate unique numbers
        for (let i = 0; i < 15; i++) {
            var pass = true;
            // No duplicates check
            while (pass) {
                var localRandom = Math.floor(Math.random() * 89) + 1;
                pass = false;
                this.numUsed.forEach(x => {
                    if (localRandom === x) {
                        pass = true;
                    }
                });
                // Do not proceed if column overflows
                if (this.cellNum[Math.floor((localRandom - 1) / 10)].length == this.rows) {
                    pass = true;
                }
                if (pass == false) {
                    // Assign number to appropiate column
                    this.cellNum[Math.floor((localRandom - 1) / 10)].push(localRandom);
                    this.cellMarked[Math.floor((localRandom - 1) / 10)].push(false);

                    this.numUsed.push(localRandom);
                }
            }
        }
        // Sort
        this.cellNum.forEach(arr => {
            arr.sort();
        });
        // Fill leftover column slots with 0s and trues respectively
        for (let i = 0; i < this.columns; i++) {
            // Do not push into array while looping
            var arr = [];
            for (let j = 0; j < this.rows - this.cellNum[i].length; j++) {
                arr.push(0);
                this.cellMarked.push(true);
            }
            this.cellNum[i] = this.cellNum[i].concat(arr);
        }
        // TODO: Broken. Offset column slots to ensure only 5 numbers exist per row.
        for (let i = 0; i < this.rows; i++) {
            let count = 0;
            for (let j = 0; j < this.columns; j++) {
                if (this.cellNum[j][i] !== 0) count++;
                if (count > 5 && this.cellNum[j][2] == 0) {
                    this.cellNum[j].pop();
                    this.cellNum[j].unshift(0);
                    this.cellMarked[j].pop();
                    this.cellMarked[j].unshift(true);
                }
            }
        }
    }

    // SETTERS
    // returns true on complete card, or false
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
