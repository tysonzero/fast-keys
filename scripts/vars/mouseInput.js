var mouseInput = {
  initialize:function() {
    game.canvas.addEventListener('mousedown', this.mouseDown, false);
  },
  
  mouseDown:function(evt) {
    mousePos = mouseInput.getMousePos(evt);
    alert("X=" + mousePos.x + " Y=" + mousePos.y);
  },
  
  getMousePos:function(evt) {
    var rect = game.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
}