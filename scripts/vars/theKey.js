var theKey = {
  key:0, //integer representing the next letter to press
  
  //called whenever a letter is pressed
  keyPressed:function(tempKey) {
    //increases the score if correct key is pressed
    if (tempKey === this.key) {
      scoreboard.combo++;
      scoreboard.score += scoreboard.combo;
      scoreboard.combobroken = false;
    }
    else {
      //decreases score if incorrect key is pressed
      scoreboard.score--;
      
      //resets combo if incorrect key is pressed
      if (scoreboard.combo > 0) {
        scoreboard.combo = 0;
        scoreboard.combobroken = true;
      }
    }
    
    //randomizes key
    theKey.newKey();
  },
  
  //pauses the game
  pause:function() {
    game.status = "pause";
  },
  
  //gets a new key
  newKey:function() {
    this.key = Math.floor(Math.random()*25);
  },
  
  //drawing to screen
  draw:function() {
    //draw the Key
    game.ctx.font="100px Arial";
    game.ctx.textAlign="center";
    game.ctx.fillStyle="#000000";
    game.ctx.fillText(String.fromCharCode(this.key + 65), 400, 340);
  },
}