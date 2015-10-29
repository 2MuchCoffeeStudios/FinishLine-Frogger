
// jshint browser:true 

(function() {
	
	// Wait for DOM tree is ready for access
    document.addEventListener('DOMContentLoaded', function() {
        
        var gameLive = true;
        
        var sprites = {};
        
        var level = 1;
        
        var canvas = document.getElementById('gameScene');
        
        // make canvas full screen
        //var width = screen.availWidth;
        //var height = screen.availHeight;
        var width = 384;
        var height = 640;
        canvas.width = width;
        canvas.height = height;
        
        // get canvas 2d context
        var ctx = canvas.getContext('2d'); //https://docs.webplatform.org/wiki/tutorials/canvas/canvas_tutorial
        
        //player
        var player = {
            x:width/2 -25,
            y:height-100,
            w:20,
            h:45,
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
          x: width/2 -20, //x coordinate
          y: 440, //y coordinate
          speedX: width * 2 / 350, //speed in Y
          w: 20, //width
          h: 38 //heght         
        },
        {
          x: width/2 -20, //x coordinate
          y: 320, //y coordinate
          speedX: width * -2 / 350, //speed in Y
          w: 20, //width
          h: 38 //heght         
        },
        {
          x: width/2 -20, //x coordinate
          y: 200, //y coordinate
          speedX: width * 3 / 350, //speed in Y
          w: 20, //width
          h: 38 //heght         
        },
        {
          x: width/2 -20, //x coordinate
          y: 80, //y coordinate
          speedX: width * -2 / 350, //speed in Y
          w: 20, //width
          h: 38 //heght         
        }];
        
        var goal = {
            x:width/2 -40,
            y:10,
            w:28,
            h:50,
        };
        
        var load = function() {
            sprites.player = new Image();
            sprites.player.src = 'asset/images/car.png';

            sprites.background = new Image();
            sprites.background.src = 'asset/images/road.png';

            sprites.enemy = new Image();
            sprites.enemy.src = 'asset/images/pine.png';

            sprites.goal = new Image();
            sprites.goal.src = 'asset/images/garage.png';
        };  

        var update = function() {
            
            //check win condition
            if(player.y<=10){
                //increase lvl
                level +=1;
                //set the player back to the start
                player.x=width/2 -25;
                player.y=height-100;
                
                //set harder enemies
                for( var v=0; v<enemies.length; v++){
                    enemies[v].speedX += enemies[v].speedX/Math.abs(enemies[v].speedX); 
                }
            }
            
            //update player
            if(player.isMoving) {
              player.y = player.y - player.speed;
            }
            
            //update enemy
            for( var i=0; i<enemies.length; i++){
                if(checkCollision(enemies[i], player)) {
                    //stop the game
                    gameLive = false;

                    window.alert('Game Over!');

                    //reload page
                    window.location = "";
                }
                
                //move enemy
                enemies[i].x += enemies[i].speedX;
                
                if(enemies[i].x < 10) {
                    enemies[i].x = 11;
                    enemies[i].speedX *= -1;
                }
                if(enemies[i].x > width-50) {
                    enemies[i].x =  width-49;
                    enemies[i].speedX *= -1;
                }
                
            }
            
        };  
        
        var draw = function() {
            
            //clear the canvas
            ctx.clearRect(0,0,width,height);    

            //draw background
            ctx.drawImage(sprites.background, 0, 0);

            //draw player
            ctx.drawImage(sprites.player, player.x, player.y);

            //draw enemies
            enemies.forEach(function(element, index){
              ctx.drawImage(sprites.enemy, element.x, element.y);
            });

            //draw goal
            ctx.drawImage(sprites.goal, goal.x, goal.y);
            
            /*//draw the player
            ctx.fillStyle = "rgb(150,150,0)";
            ctx.fillRect (player.x, player.y , player.w, player.h);
            
            //draw the goal
            ctx.fillStyle = "rgb(0,250,250)";
            ctx.fillRect (goal.x, goal.y , goal.w, goal.h);
            
            //draw the enemies
            ctx.fillStyle = "rgb(0,0,250)";
            for( var i=0; i<enemies.length; i++){
                var enemy = enemies[i];
                ctx.fillRect (enemy.x, enemy.y , enemy.w, enemy.h);
            }*/
            
            ctx.font = 'italic 20pt Calibri';
            ctx.fillStyle = "#FFFFFF"; // Set color to black
            ctx.fillText("Level:" + level, 10, 40);   
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
