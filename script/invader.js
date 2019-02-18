'use strict';

class Invader { 
    constructor(canvas, x,y,width,height, color, points ){
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');
        this.color=color;
        this.points=points;
        this.directionx=0;   // clase filla
        this.directiony=0;
        this.x=x;
        this.y=y;
        this.speed_x= 0.4;
        this.speed_y=3;
        this.width=width;
        this.height=height;
        this.isAlive=true;
        this.imagePlayer = new Image();
        this.imagePlayer.src='./SpaceInvaders/images/space-invaders.png';
    }
    setDirection(x,y){
        this.directionx=x;
        this.directiony=y;
    }
    
    //
   // checkBoundaries(){                 // return false if boundaries reached true otherwise
    boundariesReached() {
        if ( ( this.directionx === 1 ) && 
             (this.x+this.width + this.directionx * this.speed_x > this.canvas.width - 10) ){
            return true;
        }
        else if ( ( this.directionx === -1 ) && 
            (this.x+this.directionx * this.speed_x < 0 ) ){
            return true;
        }
        else if ( ( this.directiony === 1 ) && 
                (this.y+this.height + this.directiony * this.speed_y + 50 > this.canvas.height ) ){
            return true;
        }
        return false;
    };

    update(){
        this.y=this.y+this.speed_y*this.directiony;
        this.x=this.x+this.speed_y*this.directionx;
    };

    draw(){
        //this.ctx.drawImage(this.imagePlayer, this.x, this.y,this.width, this.height);
       
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y,this.width, this.height);
    };

    getPoints(){
        return( this.points);
    };

    bangBang(){
        this.isAlive=false;
    }
   
}