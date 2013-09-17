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
