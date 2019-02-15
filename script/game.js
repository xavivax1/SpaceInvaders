'use strict';

class Game {
    constructor(canvas){
         this.canvas=canvas;
         this.bombs=[];
         this.isGameOver=false;
         this.invader=[];
         this.ctx = this.canvas.getContext('2d');
         this.defender;
    };

    bornEnemies(){
        // create the enemy patrol
    };

    startLoop() {
        
        this.defender=new Defender(this.canvas,this.bombs);
           
        const loop = () => {
    
          this.updateCanvas();
          this.clearCanvas();
          this.drawCanvas();
    
          if(!this.isGameOver) {
            window.requestAnimationFrame(loop);
          };
        };
    
        window.requestAnimationFrame(loop);
      };

      updateCanvas() {
        this.defender.update();
        /*
        this.enemies.forEach((enemy) => {
          enemy.draw();
        });
        */
       /*  bombs */
        let shells=this.bombs.filter((bomb) => {
            return !bomb.delete;
        });

        shells.forEach((bomb) =>{
            bomb.update();

        });
        this.bombs=shells;

       

        }
    
      clearCanvas() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      };
    
      drawCanvas() {
        /* draw defender() */  
        this.defender.draw();
        /*
        this.enemies.forEach((enemy) => {
          enemy.draw();
        });
        */
        this.bombs.forEach((bomb) => {
           bomb.draw();
        });
        
      };
     gameOverCallback(callback) {
        this.onGameOver = callback;
    };



  

};