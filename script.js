var game = {
  //declaring canvas and ctx so they can be globally accessed
  canvas:null,
  ctx:null,
  
  //use dimensions identical to size of enclosing <div>
  width:800,
  height:600,
  
  //pauses the game when pause is true
  pause:true,
	
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
  if (!this.pause) {
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
		this.ctx.clearRect(0, 0, game.width, game.height);
    
    theKey.draw();
    scoreboard.draw();
	},
  
  togglePause:function() {
    this.pause = !this.pause;
  },
}

var keyBoardInput = {
	initialize:function() {
		this._bind_keys();
	},
  
	_bind_keys:function() {
    //called whenever a key is pressed
		window.onkeydown = function(e) {
      //checks if key is a letter
      if(e.keyCode === 32) {
        game.togglePause();
      }
			else if(e.keyCode >= 65 && e.keyCode < 91) {
        if (!game.pause) {
          theKey.keyPressed(e.keyCode - 65);
        }
			}
		}
	},
}

var theKey = {
  //integer representing the next letter to press
  key:Math.floor(Math.random()*25),
  
  //called whenever a letter is pressed
  keyPressed:function(tempKey) {
    //randomizes the key if correct key is pressed and increases score
    if (tempKey === this.key) {
      scoreboard.score++;
      this.key = Math.floor(Math.random()*25);
    }
    else {
      //decreases score if incorrect key is pressed
      scoreboard.score--;
    }
  },
  
  //logic
  update:function() {
    
  },
  
  //drawing to screen
  draw:function() {
    game.ctx.font="100px Arial";
    game.ctx.textAlign="center";
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
    }
  },
  
  //drawing to screen
  draw:function() {
    //draw score and time to screen
    game.ctx.font="30px Arial";
    game.ctx.textAlign="center";
    game.ctx.fillText("HighScore: " + this.highscore, 150, 30);
    game.ctx.fillText("Time: " + (Math.floor(this.time*10)/10).toFixed(1), 400, 30);
    game.ctx.fillText("Score: " + this.score, 650, 30);
  },
}

window.onload = function() {
  //starts up canvas once the page finishes loading
	game.setup();
}