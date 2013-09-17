var finish = {
  //goes to the finish screen
  start:function() {
    game.status = "finish";
    
    //changes highscore if current score is higher
    if (scoreboard.score > scoreboard.highscore) {
      scoreboard.highscore = scoreboard.score;
    }
  },
  
  //continues to the menu
  skip:function() {
    scoreboard.reset();
    
    game.status = "menu";
  },
  
  //restarts the game
  restart:function() {
    scoreboard.reset();
  
    theKey.key = Math.floor(Math.random()*25);
    pause.toggle();
    
    game.status = "play";
  },
  
  //drawing to screen
  draw:function() {
    //align following text to the center
    game.ctx.textAlign="center";
     
     //draw GAME OVER header
    game.ctx.fillStyle="#000000";
    game.ctx.font="60px Arial";
    game.ctx.fillText("GAME OVER", 400, 140);
    
    //display try again if you don't beat your highscore
    if (scoreboard.score < scoreboard.highscore) {
      game.ctx.fillStyle="#FF0000";
      game.ctx.fillText("TRY AGAIN", 400, 400);
    }
    //display highscore if you tie with or beat your highscore
    else if (scoreboard.score === scoreboard.highscore) {
      game.ctx.fillStyle="#00FF00";
      game.ctx.fillText("HIGHSCORE!", 400, 400);
    }
    
    //display score and highscore
    game.ctx.fillStyle="#000000";
    game.ctx.font="40px Arial";
    game.ctx.fillText("SCORE: " + scoreboard.score, 400, 220);
    game.ctx.fillText("HIGHSCORE: " + scoreboard.highscore, 400, 300);
    
    //display instructions
    game.ctx.font="30px Arial";
    game.ctx.fillText("PRESS SPACE TO CONTINUE", 400, 520);
    game.ctx.fillText("PRESS ENTER TO RESTART", 400, 560);
  },
}