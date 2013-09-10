var game = {
  //declaring canvas and ctx so they can be globally accessed
  canvas:null,
  ctx:null,
  
  //use dimensions identical to size of enclosing <div>
  width:800,
  height:600,
	
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
    if (!pause.enabled && !finish.enabled) {
      this.update();
    }
    this.draw();
	},
	
  //logic
	update:function() {
    theKey.update();
    scoreboard.update();
	},
	
  //drawing to screen
	draw:function() {
    //clear screen
		this.ctx.clearRect(0, 0, game.width, game.height);
    
    if(finish.enabled) {
      finish.draw();
    }
    else if(pause.enabled) {
      pause.draw();
    }
    else {
      theKey.draw();
    }
    scoreboard.draw();
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
        //restarts game if you press backspace while the game is paused
        if (pause.enabled) {
          pause.restart();
        }
      }
      //toggles pause when space key is pressed
      if(e.keyCode === 32) {
        pause.toggle();
      }
      //passes in the letter pressed
			else if(e.keyCode >= 65 && e.keyCode < 91) {
        if (!pause.enabled) {
          theKey.keyPressed(e.keyCode - 65);
        }
			}
		}
	},
}

var pause = {
  //pauses the game if set to true
  enabled:true,
  
  //unpauses if paused, pauses if unpaused
  toggle:function() {
    theKey.key = Math.floor(Math.random()*25);
    this.enabled = !this.enabled;
  },
  
  //restarts the game
  restart:function() {
    scoreboard.score = 0;
    scoreboard.time = 30;
    theKey.key = Math.floor(Math.random()*25);
    pause.toggle();
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
    game.ctx.fillStyle="#FF0000";
    game.ctx.fillRect(300, 250, 200, 60);
    
    //draw pause menu actions
    game.ctx.font="30px Arial";
    game.ctx.fillStyle="#000000";
    game.ctx.fillText("RESUME", 400, 200);
    game.ctx.fillText("RESTART", 400, 280);
    
    //draw pause menu keys
    game.ctx.font="15px Arial";
    game.ctx.fillText("press space", 400, 220);
    game.ctx.fillText("press backspace", 400, 300);
  },
}

var finish = {
  //if true shows the finish screen
  enabled:false,
  
  //logic
  update:function() {
    
  },
  
  //drawing to screen
  draw:function() {
    
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
    //decreases timer by 1 per second
    this.time -= 1/60;
    
    //restarts game if time runs out
    if (this.time < 0) {
      //changes highscore if current score is higher
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      
      //sets score and time to starting values 
      this.score = 0;
      this.time = 30;
      theKey.key = Math.floor(Math.random()*25);
      pause.enabled = true;
    }
  },
  
  //drawing to screen
  draw:function() {
    //draw score and time to screen
    game.ctx.font="30px Arial";
    game.ctx.textAlign="center";
    game.ctx.fillText("Score: " + this.score, 150, 30);
    game.ctx.fillText("Time: " + (Math.floor(this.time*10)/10).toFixed(1), 400, 30);
    game.ctx.fillText("HighScore: " + this.highscore, 650, 30);
  },
}

window.onload = function() {
  //starts up canvas once the page finishes loading
	game.setup();
}