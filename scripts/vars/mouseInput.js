var mouseInput = {
  //creates listener
  initialize:function() {
    game.canvas.addEventListener('mousedown', this.mouseDown, false);
  },
  
  //called when mouse is clicked
  mouseDown:function(evt) {
    mousePos = mouseInput.getMousePos(evt);
    alert("X=" + mousePos.x + " Y=" + mousePos.y);
    
    //interact with certain objects based on game status
    switch(game.status) {
      case "menu":
        break;
      case "play":
        break;
      case "pause":
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