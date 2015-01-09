var score = 0;
var submit = false;

var finish = {
    //goes to the finish screen
    start: function () {
        //changes highscore if current score is higher
        if (scoreboard.score > scoreboard.highscore) {
            scoreboard.highscore = scoreboard.score;
            score = scoreboard.score;
            submit = true;
        }
        game.status = "finish";
    },

    //continues to the menu
    skip: function () {
        scoreboard.reset();
        theKey.newKey();
        game.status = "menu";
    },

    //restarts the game
    restart: function () {
        scoreboard.reset();
        theKey.newKey();
        game.status = "play";
    },

    //drawing to screen
    draw: function () {
        //draw red play button background
        game.ctx.fillStyle = "#FF0000";
        game.ctx.fillRect(160, 480, 200, 60);
        game.ctx.fillRect(440, 480, 200, 60);

        //align following text to the center
        game.ctx.textAlign = "center";

          //draw GAME OVER header
        game.ctx.fillStyle = "#000000";
        game.ctx.font = "60px Arial";
        game.ctx.fillText("GAME OVER", 400, 140);

        //display try again if you don't beat your highscore and display highscore if you tie with or beat your highscore
        if (scoreboard.score < scoreboard.highscore) {
            game.ctx.fillStyle = "#FF0000";
            game.ctx.fillText("TRY AGAIN", 400, 400);
        } else if (scoreboard.score === scoreboard.highscore) {
            game.ctx.fillStyle = "#00FF00";
            game.ctx.fillText("HIGHSCORE!", 400, 400);
        }
        //display score and highscore
        game.ctx.fillStyle = "#000000";
        game.ctx.font = "40px Arial";
        game.ctx.fillText("SCORE: " + scoreboard.score, 400, 220);
        game.ctx.fillText("HIGHSCORE: " + scoreboard.highscore, 400, 300);

        //draw play text
        game.ctx.font = "30px Arial";
        game.ctx.fillText("PLAY", 260, 510);
        game.ctx.fillText("EXIT", 540, 510);

        //draw play instructions
        game.ctx.font = "15px Arial";
        game.ctx.fillText("press space", 260, 530);
        game.ctx.fillText("press escape", 540, 530);
    },
};
