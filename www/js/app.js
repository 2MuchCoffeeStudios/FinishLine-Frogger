
// jshint browser:true 

(function() {
	
	// Wait for DOM tree is ready for access
    document.addEventListener('DOMContentLoaded', function() {
        
        var gameLive = true;
        
        var canvas = document.getElementById('gameScene');
        
        // make canvas full screen
        var width = screen.availWidth;
        var height = screen.availHeight;
        canvas.width = width;
        canvas.height = height;
        
        // get canvas 2d context
        var ctx = canvas.getContext('2d'); //https://docs.webplatform.org/wiki/tutorials/canvas/canvas_tutorial
        
        //player
        var player = {
            x:width/2 -25,
            y:height-100,
            w:50,
            h:50,
            speed:2.5,
            isMoving: false
        }; 
        
        var movePlayer = function() {
          player.isMoving = true;
        }
        
        var stopPlayer = function() {
            player.isMoving = false;
        }   
        
        //event listeners to move player
        canvas.addEventListener('mousedown', movePlayer);
        canvas.addEventListener('mouseup', stopPlayer);   
        canvas.addEventListener('touchstart', movePlayer);
        canvas.addEventListener('touchend', stopPlayer);  
              
        var load = function() {

        };  

        var update = function() {
            
            //update player
            if(player.isMoving) {
              player.y = player.y - player.speed;
            }
            
        };  
        
        var draw = function() {
            
            //clear the canvas
            ctx.clearRect(0,0,width,height); 
            
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect (player.x, player.y , player.w, player.h);

            ctx.font = 'italic 40pt Calibri';
            ctx.fillStyle = "#000"; // Set color to black
            ctx.fillText("Sup Bro!", 50, 50);   
        }; 

        //gets executed multiple times per second
        var step = function() {
            
            update();
            draw();

            if(gameLive) {
              window.requestAnimationFrame(step); 
            }     
        };

        //initial kick
        load();
        step();
        
    }, false);

}());
