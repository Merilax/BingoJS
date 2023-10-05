class Bingo {

    numLeft = [];
    numOut = [];

    // CONSTRUCTORS
    constructor() {
        for (let i = 0; i < 90; i++) {
            this.numLeft[i] = i + 1;
            //numOut[i] = 0; 
        }
    }

    // SETTERS
    roll() {
        while (true) {
            var localRandom = Math.floor(Math.random() * 89);
            if (this.numLeft[localRandom] != 0) {
                this.numLeft[localRandom] = 0;
                this.numOut[localRandom] = localRandom + 1;
                return (localRandom + 1);
            }
        }
    }
}
