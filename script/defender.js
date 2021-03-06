'use strict';

class Defender {
    constructor(canvas){
        this.height = 25;
        this.width = 80;
        this.canvas= canvas;
        this.ctx=this.canvas.getContext('2d');
        this.x = this.canvas.height/2;
        this.y = this.canvas.height - 10 - this.height;
        this.speed=5;
        this.direction = 0;
        this.lives= 3;
        this.imagePlayer = new Image();
        this.imagePlayer.src='./images/defender.png';
        this.sonido= new Audio();
        this.sonido.src='./sounds/INVADERSHOT.mp3';
    }

    setDirection(a){
        this.direction=a;
    }
    checkBoundaries( a ){
        if (  (a < 0 ) || (a + this.width > this.canvas.width) ) {
            return false;
        }
        return true;
    };

    update(){
       if ( this.checkBoundaries(this.x + this.direction * this.speed) )
            this.x=this.x + this.speed * this.direction;
    };

    draw(){
        this.ctx.fillStyle = 'purple';
        this.ctx.drawImage(this.imagePlayer, this.x, this.y,this.width, this.height);
     //  this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
    };

    shot(){
        this.sonido.currentTime =0;
        this.sonido.play();
        let bomb= new Bomb(this.canvas,-1,this.x+this.width/2, this.y-1);
        return(bomb);
    };

    checkCollisions(){ 

    };
    
   
    

    loseLive() {
        this.lives--;
    }
};