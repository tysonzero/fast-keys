var menu = {
    //starts the game
    start: function () {
        scoreboard.reset();
        theKey.newKey();
        game.status = "play";
    },

    //drawing to screen
    draw: function () {
        //draw red play button background
        game.ctx.fillStyle = "#FF0000";
        game.ctx.fillRect(250, 350, 300, 100);

        //draw black lines either side of title
        game.ctx.fillStyle = "#000000";
        game.ctx.fillRect(142, 110, 540, 10);
        game.ctx.fillRect(125, 210, 540, 10);

        //center align all following text
        game.ctx.textAlign = "center";

        //draw title
        game.ctx.font = "italic 100px Arial";
        game.ctx.fillText("FAST KEYS", 400, 200);

        //draw play text
        game.ctx.font = "60px Arial";
        game.ctx.fillText("PLAY", 400, 410);

        //draw play instructions
        game.ctx.font = "20px Arial";
        game.ctx.fillText("press space", 400, 440);
    },
};
