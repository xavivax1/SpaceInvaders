'use strict';

class Game {
    constructor(canvas){
         this.canvas=canvas;
         this.bombs=[];
         this.isGameOver=false;
         this.ctx = this.canvas.getContext('2d');
         this.patrol;
         this.defender;
         this.score=0;
         this.lives=3;
         this.defendercrash= new Audio();
         this.defendercrash.src='./sounds/ALLYDEATH.mp3';
    };


    startLoop() {
        
        this.defender=new Defender(this.canvas);
        this.patrol=new Patrol( this.canvas, this.bombs);
           
        const loop = () => {
    
          this.updateCanvas();
          this.checkImpacts();
          this.clearCanvas();
          this.drawCanvas();
          this.updateScore();

    
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
      let Bombs2Defender=this.patrol.pbombs.filter(bomb => {
           if ( bomb.delete === false ) 
              return true;
      });
      if (Bombs2Defender.length > 0) {
        this.checkImpactsOnDefender(this.defender.x, this.defender.y, 
          this.defender.width, this.defender.height, 
          Bombs2Defender);
      }
      this.checkInvadersImpact();
     // this.checkBombsCollision();                              
    };

    checkInvadersImpact() {
      let invader;
        this.bombs.forEach(bomb=>{
          invader = this.patrol.getTargetedInvader(bomb)
              if (invader) {
                bomb.delete=true;                
                this.score+=invader.points;    
                invader.bangBang();           
              };  
          });
    };

    checkBombsCollision(){
     
      let bombsdown=this.patrol.pbombs.filter(bomb => {
        if ( bomb.delete === false ) 
           return true;           
        });
        if (bombsdown.length < 0) {
          return ;
        };
        let bomb;
        bombsdown.forEach(bd=>{
          for (let n=0;n<this.bombs.length;n++){
            bombUp=this.bombs[n];
            if ( (bombUp.x = bd.x+bd.width) && (bombUp.y === bd.y) ) {
               bombUp.delete=true;
               bd.delete=true;
            }
          }
        });
        
    };                
     
    checkImpactsOnDefender(x,y,width,height, bombs ){
          
        bombs.forEach(e => {
           if( (e.x <= x+width && e.x >= x) &&
              (e.y >= y && e.y <= y+height) ) { 
                e.delete=true;            // Defender destroyed 
                this.defendercrash.currentTime =0;
                this.defendercrash.play();
                if ( this.lives > 0 )
                  this.lives--;
                else { 
                  this.isGameOver=true; 
                  this.onGameOver();
                //flipflop durant 1s
                }
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
    
    gameUpdateScore(callback){
      this.updateScore = callback;
    };

};