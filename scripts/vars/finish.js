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
    theKey.newKey();
    game.status = "menu";
  },
  
  //restarts the game
  restart:function() {
    scoreboard.reset();
    theKey.newKey();
    pause.toggle();
    
    game.status = "play";
  },
  
  //drawing to screen
  draw:function() {
    //draw red play button background
    game.ctx.fillStyle="#FF0000";
    game.ctx.fillRect(60, 450, 300, 100);
    game.ctx.fillRect(440, 450, 300, 100);
    
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
    
    //draw play text
    game.ctx.font="60px Arial";
    game.ctx.fillText("MENU", 210, 510);
    game.ctx.fillText("RESTART", 590, 510);
    
    //draw play instructions
    game.ctx.font="20px Arial";
    game.ctx.fillText("press space", 210, 540);
    game.ctx.fillText("press enter", 590, 540);
  },
}