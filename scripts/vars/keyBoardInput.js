var keyBoardInput = {
  initialize:function() {
    this._bind_keys();
  },
  
  _bind_keys:function() {
    //called whenever a key is pressed
    window.onkeydown = function(e) {
      if(e.keyCode === 13) {
        //restarts game if you press enter while in the finish screen
        if (game.status === "finish") {
          finish.restart();
        }
        //restarts game if you press enter while the game is paused
        else if (game.status === "pause") {
          pause.restart();
        }
      }
      else if(e.keyCode == 27) {
        //exits to main menu if you press escape while the game is paused
        if (game.status === "pause") {
          pause.exit();
        }
      }
      else if(e.keyCode === 32) {
        if (game.status === "finish") {
          //goes back to menu when space key is pressed in finish
          finish.skip();
        }
        else if(game.status === "menu") {
          //starts game when space key is pressed in menu
          menu.start();
        }
        else if (game.status === "pause" || "play") {
          //toggles pause when space key is pressed in game
          pause.toggle();
        }
      }
      //passes in the letter pressed
      else if(e.keyCode >= 65 && e.keyCode < 91) {
        if (game.status === "play") {
          theKey.keyPressed(e.keyCode - 65);
        }
      }
    }
  },
}