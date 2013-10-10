var mouseInput = {
  //creates listener
  initialize:function() {
    game.canvas.addEventListener('mousedown', this.mouseDown, false);
  },
  
  //called when mouse is clicked
  mouseDown:function(evt) {
    mousePos = mouseInput.getMousePos(evt);
    
    //interact with certain objects based on game status
    switch(game.status) {
      case "menu":
        if (mousePos.x >= 250 && mousePos.x < 550 && mousePos.y >= 350 && mousePos.y < 450) {
          menu.start();
        }
        break;
      case "play":
        pause.toggle();
        break;
      case "pause":
        if (mousePos.x >= 300 && mousePos.x < 500) {
          if (mousePos.y >= 170 && mousePos.y < 230) {
            pause.toggle();
          }
          else if (mousePos.y >= 250 && mousePos.y < 310) {
            pause.restart();
          }
          else if (mousePos.y >= 330 && mousePos.y < 390) {
            pause.exit();
          }
        }
        break;
      case "finish":
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