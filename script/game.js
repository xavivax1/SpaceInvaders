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
         this.lives=3;
    };


    startLoop() {
        
        this.defender=new Defender(this.canvas);
        this.patrol=new Patrol( this.canvas);
           
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
       
        if (this.patrol.update(this.defender.x, this.defender.y) === false ) {
             this.isGameOver=true;
             this.onGameOver();
        }
        // CheckColisions
        //checkImpacts();

       /*  bombs    : eliminar balas perdudes */
        let shells=this.bombs.filter(b => {
               return (!b.delete);
        });
        this.bombs = shells;
        // update bombs()
        this.bombs.forEach((bomb) =>{
            bomb.update();
        });
        //
        
    };
    
    CheckImpacts(){
      let Bombs2Defender=this.bombs.filter(e => {
           if ( e.delete === false && e.direction === 1 ) 
              return (true);
      });
      if ( CheckImpactsOnDefender(this.defender.x, this.defender.y, 
                            this.defender.width, this.defender.height, 
                            Bombs2Defender) === true) 

      CheckImpactsOnInvaders();                      

              
    };


    CheckImpactsOnInvaders() {
        
    };
    CheckImpactsAmongBombs(up, down){
      // fer un filter de les bombes que pugen
      // buscar bombes que cauen coincidint en l' espai.
    };                
     
    CheckImpactsOnDefender(x,y,width,height, bombs ){
          
        bombs.forEach(e => {
           if( (e.x <= x+width && e.x >= x) &&
              (e.y >= y && e.y <= y+height) ) {             // Defender destroyed 
                this.lives--;
           }
        });
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