'use strict';

class Game {
    constructor(canvas){
         this.canvas=canvas;
         this.bombs=[];
         this.isGameOver=false;
         this.ctx = this.canvas.getContext('2d');
         this.patrol;
         this.defender;
         this.score=110;
         this.lives=3;
         this.defendercrash= new Audio();
         this.defendercrash.src='./sounds/ALLYDEATH.mp3';
    };


    startLoop() {
        
        this.defender=new Defender(this.canvas);
        this.patrol=new Patrol( this.canvas, this.bombs);
           
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
        this.checkImpacts();

       /*  bombs    : eliminar balas perdudes */
        
        let pshells=this.patrol.pbombs.filter(p => {
              return(!p.delete);
        });
        this.patrol.pbombs=pshells;

        let shells=this.bombs.filter(b => {
               return (!b.delete);
        });
        this.bombs = shells;
        // update patrol bombs
        this.patrol.pbombs.forEach(pb=>{
            pb.update();
        });
        // update bombs()
        this.bombs.forEach((bomb) =>{
            bomb.update();
        });
        //
        
    };
    
    checkImpacts(){
      let Bombs2Defender=this.patrol.pbombs.filter(e => {
           if ( e.delete === false ) 
              return (true);
      });
      this.checkImpactsOnDefender(this.defender.x, this.defender.y, 
                            this.defender.width, this.defender.height, 
                            Bombs2Defender);
          // decrementar vidas --> game Over
           
          // si no gameOver flipflop destroyed defender & Crash sound
      

      this.checkInvadersImpact();                      

              
    };


    checkInvadersImpact() {
      let Bombs2Patrol=this.bombs.filter(b=>{
              if (b.delete === false)
      });
        
    };
    checkBombsCollision(up, down){
      // fer un filter de les bombes que pugen
      // buscar bombes que cauen coincidint en l' espai.
    };                
     
    checkImpactsOnDefender(x,y,width,height, bombs ){
          
        bombs.forEach(e => {
           if( (e.x <= x+width && e.x >= x) &&
              (e.y >= y && e.y <= y+height) ) {             // Defender destroyed 
                this.defendercrash.currentTime =0;
                this.defendercrash.play();
                if ( this.lives > 0 )
                  this.lives--;
                else this.GameOver=true; 
               }
        });
    };

      clearCanvas() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      };
    
      drawCanvas() {
        this.defender.draw();

        this.patrol.pbombs.forEach( pb=>{
          pb.draw();
        });
        this.bombs.forEach((bomb) => {
           bomb.draw();
        });
        this.patrol.draw();
      };
     gameOverCallback(callback) {
        this.onGameOver = callback;
    };



  

};