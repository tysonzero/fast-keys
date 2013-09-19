var mouseInput = {
  initialize:function() {
    game.canvas.addEventListener('mousedown', this.mouseDown);
  },
  
  mouseDown:function() {
    mouse_x = event.pageX;
    mouse_y = event.pageY;
    alert("X=" + mouse_x + " Y=" + mouse_y);
  },
}