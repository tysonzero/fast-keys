var game = {
  //declaring canvas and ctx so they can be globally accessed
  canvas:null,
  ctx:null,
  
  //use dimensions identical to size of enclosing <div>
  width:800,
  height:600,
  
  //stores the current status
  status:"menu",
	
	setup:function() {
    //get canvas created in html so it can be accessed
		this.canvas = document.getElementById('game_canvas');
    
    //set canvas size equal to predefined dimensions
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    //create context to allow drawing onto the canvas
    this.ctx = this.canvas.getContext('2d');
    
    //allows keyboard input
    keyBoardInput.initialize();
    
    //calls run() every 1/60th of a second
    this.timer = setInterval(function(){game.run()}, 16 + 2/3);	
	},
  
  //run every 1/60th of a second
  run:function() {
    this.update();
    this.draw();
	},
	
  //logic
	update:function() {
    switch(this.status) {
      case "play":
        theKey.update();
        scoreboard.update();
        break;
    }
	},
	
  //drawing to screen
	draw:function() {
    //clear screen
		this.ctx.clearRect(0, 0, game.width, game.height);
    
    //draws objects to screen based on status
    switch(this.status) {
      case "menu":
        menu.draw();
        break;
      case "play":
        theKey.draw();
        scoreboard.draw();
        break;
      case "pause":
        pause.draw();
        scoreboard.draw();
        break;
      case "finish":
        finish.draw();
        break;
    }
	},
}

var keyBoardInput = {
	initialize:function() {
		this._bind_keys();
	},
  
	_bind_keys:function() {
    //called whenever a key is pressed
		window.onkeydown = function(e) {
      
      if(e.keyCode === 8) {
        //restarts game if you press backspace while in the finish screen
        if (game.status === "finish") {
          finish.restart();
        }
        //restarts game if you press backspace while the game is paused
        else if (game.status === "pause") {
          pause.restart();
        }
      }
      else if(e.keyCode == 27) {
        //exits to main menu if you press escape while the game is paused
        if (game.status === "pause") {
          pause.exit();
        }
      }
      //toggles pause when space key is pressed
      else if(e.keyCode === 32) {
        if (game.status === "finish") {
          finish.skip();
        }
        else if(game.status === "menu") {
          menu.start();
        }
        else if (game.status === "pause" || "play") {
          pause.toggle();
        }
      }
      //passes in the letter pressed
			else if(e.keyCode >= 65 && e.keyCode < 91) {
        if (game.status === "play") {
          theKey.keyPressed(e.keyCode - 65);
        }
			}
		}
	},
}

var menu = {
  //starts the game
  start:function() {
    game.status="play";
  },
  
  //logic
  update:function() {
  
  },

  //drawing to screen
  draw:function() {
    //draw red play button background
    game.ctx.fillStyle="#FF0000";
    game.ctx.fillRect(250, 350, 300, 100);
    
    //draw black lines either side of title
    game.ctx.fillStyle="#000000";
    game.ctx.fillRect(120, 210, 540, 10);
    game.ctx.fillRect(140, 110, 540, 10);
    
    //center align all following text
    game.ctx.textAlign="center";
    
    //draw title
    game.ctx.font="italic 100px Arial";
    game.ctx.fillText("FAST KEYS", 400, 200);
    
    //draw play text
    game.ctx.font="60px Arial";
    game.ctx.fillText("PLAY", 400, 410);
    
    //draw play instructions
    game.ctx.font="20px Arial";
    game.ctx.fillText("press space", 400, 440);
  },
}

var pause = {
  //unpauses if paused, pauses if unpaused
  toggle:function() {
    theKey.key = Math.floor(Math.random()*25);
    
    if (game.status === "play") {
      game.status = "pause";
    }
    else if (game.status === "pause") {
      game.status = "play";
    }
  },
  
  //restarts the game
  restart:function() {
    scoreboard.score = 0;
    scoreboard.time = 30;
    theKey.key = Math.floor(Math.random()*25);
    pause.toggle();
    
    game.status = "play";
  },
  
  //exits to the menu
  exit:function() {
    scoreboard.score = 0;
    scoreboard.time = 30;
    theKey.key = Math.floor(Math.random()*25);
    
    game.status = "menu";
  },
  
  //logic
  update:function() {
    
  },
  
  //drawing to screen
  draw:function() {
    //draw outer pause menu box
    game.ctx.fillStyle="#000000";
    game.ctx.fillRect(280, 100, 240, 400);
    
    //draw pause menu title
    game.ctx.font="45px Arial";
    game.ctx.textAlign="center";
    game.ctx.fillStyle="#FFFFFF";
    game.ctx.fillText("PAUSED", 400, 150);
    
    //draw pause menu buttons
    game.ctx.fillStyle="#FF0000";
    game.ctx.fillRect(300, 170, 200, 60);
    game.ctx.fillRect(300, 250, 200, 60);
    game.ctx.fillRect(300, 330, 200, 60);
    
    //draw pause menu actions
    game.ctx.font="30px Arial";
    game.ctx.fillStyle="#000000";
    game.ctx.fillText("RESUME", 400, 200);
    game.ctx.fillText("RESTART", 400, 280);
    game.ctx.fillText("EXIT", 400, 360);
    
    //draw pause menu keys
    game.ctx.font="15px Arial";
    game.ctx.fillText("press space", 400, 220);
    game.ctx.fillText("press backspace", 400, 300);
    game.ctx.fillText("press escape", 400, 380);
  },
}

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
    scoreboard.score = 0; //current score
    scoreboard.time = 30; //time in seconds
    
    game.status = "menu";
  },
  
  //restarts the game
  restart:function() {
    scoreboard.score = 0;
    scoreboard.time = 30;
    theKey.key = Math.floor(Math.random()*25);
    pause.toggle();
    
    game.status = "play";
  },
  
  //logic
  update:function() {
    
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
    game.ctx.fillText("PRESS BACKSPACE TO RESTART", 400, 560);
  },
}

var theKey = {
  //integer representing the next letter to press
  key:Math.floor(Math.random()*25),
  
  //called whenever a letter is pressed
  keyPressed:function(tempKey) {
    //increases the score if correct key is pressed
    if (tempKey === this.key) {
      scoreboard.score++;
    }
    else {
      //decreases score if incorrect key is pressed
      scoreboard.score--;
    }
    
    //randomizes key
    this.key = Math.floor(Math.random()*25);
  },
  
  //logic
  update:function() {
    
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

var scoreboard = {
  score:0, //current score
  time:30, //time in seconds
  highscore:0, //maximum score
  
  //logic
  update:function() {
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
  draw:function() {
    //draw score and time to screen
    game.ctx.font="30px Arial";
    game.ctx.textAlign="center";
    game.ctx.fillStyle="#000000";
    game.ctx.fillText("Score: " + this.score, 150, 30);
    game.ctx.fillText("Time: " + (Math.floor(this.time*10)/10).toFixed(1), 400, 30);
    game.ctx.fillText("HighScore: " + this.highscore, 650, 30);
  },
}

window.onload = function() {
  //starts up canvas once the page finishes loading
	game.setup();
}