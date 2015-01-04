var scoreboard = {
    score: 0, //current score
    time: 30, //time in seconds
    highscore: 0, //maximum score
    combo: 0, //current combo
    combobroken: false, //whether the combo was broken on the previous letter
    
    //resets variables to starting variables
    reset: function() {
        this.score = 0;
        this.time = 30;
        this.combo = 0;
        this.combobroken = false;
    },
    
    //variable manipulation
    update: function() {
        if (this.time < 0) {
            //goes to the finish screen if time runs out
            finish.start();
        }
        else {
            //decreases timer by 1 per second if there is still time left
            this.time -= 1/60;
        }
    },
    
    //drawing to screen
    draw: function() {
        //draw score and time to screen
        game.ctx.font = "30px Arial";
        game.ctx.textAlign = "center";
        game.ctx.fillStyle = "#000000";
        game.ctx.fillText("Score: " + this.score, 150, 30);
        game.ctx.fillText("Time: " + (Math.floor(this.time*10)/10).toFixed(1), 400, 30);
        game.ctx.fillText("HighScore: " + this.highscore, 650, 30);
        
        //draw combo to screen
        game.ctx.font = "50px Arial";
        if (this.combo) {
            game.ctx.fillStyle = "#00FF00";
            game.ctx.fillText("COMBO: " + this.combo, 400, 500);
        }
        else if (this.combobroken) {
            game.ctx.fillStyle = "#FF0000";
            game.ctx.fillText("COMBO BROKEN", 400, 500);
        }
    },
};
