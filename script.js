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
    this.update();
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
}

var keyBoardInput = {
	initialize:function() {
		this._bind_keys();
	},
  
	_bind_keys:function() {
    //called whenever a key is pressed
		window.onkeydown = function(e) {
      //checks if key is a letter
			if(e.keyCode >= 65 && e.keyCode < 91) {
        theKey.keyPressed(e.keyCode - 65);
			}
		}
	},
}

var theKey = {
  //integer representing the next letter to press
  key:Math.floor(Math.random()*25),
  
  //called whenever a letter is pressed
  keyPressed:function(tempKey) {
    //randomizes the key if correct key is pressed
    if (tempKey === this.key) {
      scoreboard.score++;
      this.key = Math.floor(Math.random()*25);
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
    this.time -= 1/60;
    
    if (this.time < 0) {
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      
      this.score = 0;
      this.time = 30;
    }
  },
  
  //drawing to screen
  draw:function() {
    game.ctx.font="30px Arial";
    game.ctx.textAlign="center";
    game.ctx.fillText("Score: " + this.score, 600, 30);
    game.ctx.fillText("Time: " + (Math.floor(this.time*10)/10).toFixed(1), 200, 30);
  },
}

window.onload = function() {
  //starts up canvas once the page finishes loading
	game.setup();
}