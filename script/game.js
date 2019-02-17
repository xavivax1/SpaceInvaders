'use strict';

class Game {
    constructor(canvas){
         this.canvas=canvas;
         this.bombs=[];
         this.isGameOver=false;
         //this.invader=[];
         this.ctx = this.canvas.getContext('2d');
         this.patrol;
         this.defender;
         this.score=110;
    };

    bornEnemies(){
        // create the enemy patrol
    };

    startLoop() {
        
        this.defender=new Defender(this.canvas);
        this.patrol=new Patrol( this.canvas, 55);
           
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
        this.patrol.update(this.defender.x, this.defender.y);

       /*  bombs    needs to be refactorized */
        let shells=this.bombs.filter((bomb) => {
            if (bomb.delete === true)
               return false;
        });
        
        //this.bombs = shells;
        // falta copiar this.bombs=shells
        this.bombs.forEach((bomb) =>{
            bomb.update();
        });
        //
        
    }
    
      clearCanvas() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      };
    
      drawCanvas() {
        this.defender.draw();

        this.bombs.forEach((bomb) => {
           bomb.draw();
        });
        this.patrol.draw();
      };
     gameOverCallback(callback) {
        this.onGameOver = callback;
    };



  

};