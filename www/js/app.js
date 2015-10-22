
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
        };
        
        var stopPlayer = function() {
            player.isMoving = false;
        };   
        
        //event listeners to move player
        canvas.addEventListener('mousedown', movePlayer);
        canvas.addEventListener('mouseup', stopPlayer);   
        canvas.addEventListener('touchstart', movePlayer);
        canvas.addEventListener('touchend', stopPlayer);  
        
        var enemies = [
        {
          x: 100, //x coordinate
          y: 100, //y coordinate
          speedY: 2, //speed in Y
          w: 40, //width
          h: 40 //heght
        },
        {
          x: 100, //x coordinate
          y: 100, //y coordinate
          speedY: 2, //speed in Y
          w: 40, //width
          h: 40 //heght         
        },
        {
          x: 100, //x coordinate
          y: 100, //y coordinate
          speedY: 2, //speed in Y
          w: 40, //width
          h: 40 //heght         
        },
        {
          x: 100, //x coordinate
          y: 100, //y coordinate
          speedY: 2, //speed in Y
          w: 40, //width
          h: 40 //heght         
        },
        {
          x: 100, //x coordinate
          y: 100, //y coordinate
          speedY: 2, //speed in Y
          w: 40, //width
          h: 40 //heght         
        }];
        
        var goal = {
            x:width/2 -50,
            y:10,
            w:100,
            h:50,
        };
        
        var load = function() {

        };  

        var update = function() {
            
            if(player.y<=10){
                window.alert  ("DECAPITATION!!!!");
            }
            
            //update player
            if(player.isMoving) {
              player.y = player.y - player.speed;
            }            
        };  
        
        var draw = function() {
            
            //clear the canvas
            ctx.clearRect(0,0,width,height); 
            
            //draw the player
            ctx.fillStyle = "rgb(150,150,0)";
            ctx.fillRect (player.x, player.y , player.w, player.h);
            
            //draw the goal
            ctx.fillStyle = "rgb(0,250,250)";
            ctx.fillRect (goal.x, goal.y , goal.w, goal.h);
            
            //draw the enemies
            ctx.fillStyle = "rgb(150,150,0)";
            for( var i=0; i<enemies.length; i++){
                var enemy = enemies[i];
                ctx.fillRect (enemy.x, enemy.y , enemy.w, enemy.h);
            }
            
            ctx.font = 'italic 40pt Calibri';
            ctx.fillStyle = "#000"; // Set color to black
            ctx.fillText("Get Over Here Bro!", 50, 50);   
        }; 
        
        //check the collision between two rectangles
        var checkCollision = function(rect1, rect2) {
            var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
            var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
            return closeOnWidth && closeOnHeight;
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
