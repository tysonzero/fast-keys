var mouseInput = {
  //creates mouse listener
  initialize:function() {
    game.canvas.addEventListener('mousedown', this.mouseDown, false);
  },
  
  //called when mouse is clicked
  mouseDown:function(evt) {
    mousePos = mouseInput.getMousePos(evt);
    
    //interact with certain objects based on game status and mouse position
    switch(game.status) {
      case "menu":
        if (mousePos.x >= 250 && mousePos.x < 550 && mousePos.y >= 350 && mousePos.y < 450) {
          //within rect(250, 350, 300, 100)
          menu.start();
        }
        break;
      case "play":
        //within canvas
        theKey.pause();
        break;
      case "pause":
        if (mousePos.x >= 300 && mousePos.x < 500) {
          if (mousePos.y >= 170 && mousePos.y < 230) {
            //within rect(300, 170, 200, 60)
            pause.play();
          }
          else if (mousePos.y >= 250 && mousePos.y < 310) {
            //within rect(300, 250, 200, 60)
            pause.restart();
          }
          else if (mousePos.y >= 330 && mousePos.y < 390) {
            //within rect(300, 330, 200, 60)
            pause.exit();
          }
        }
        break;
      case "finish":
        if (mousePos.y >= 450 && mousePos.y < 550) {
          if (mousePos.x >= 60 && mousePos.x < 360) {
            //within rect(60, 450, 300, 100)
            finish.restart();
          }
          else if (mousePos.x >= 440 && mousePos.x < 740) {
            //within rect(440, 450, 300, 100)
            finish.skip();
          }
        }
        break;
    }
  },
  
  //returns mouse position within canvas
  getMousePos:function(evt) {
    var rect = game.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  },
}