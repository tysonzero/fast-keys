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
	},
	
  //drawing to screen
	draw:function() {
    theKey.draw();
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
			if(e.keyCode >= 65 && e.keyCode <= 90) {
        
			}
		}
		
    //called whenever a key is released
		window.onkeyup = function(e) {
      //checks if key is a letter
			if(e.keyCode >= 65 && e.keyCode <= 90) {
        
			}
		}
	},
}

var theKey = {
  //integer representing the next letter to press
  key:0,

  //logic
  update:function() {
    
  },
  
  //drawing to screen
  draw:function() {
    
  },
}

window.onload = function() {
  //starts up canvas once the page finishes loading
	game.setup();
}