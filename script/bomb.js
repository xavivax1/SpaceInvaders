'use strict';

class Bomb {
    constructor(canvas, direction,x,y){
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');
        if (direction < 0)
            this.color='orange';
        else 
            this.color='green';
        this.direction=direction;   // clase filla
        this.x=x;
        this.y=y;
        this.speed=5;
        this.delete=false
    }
    checkBoundaries(y){
        if ( (y < 0) || (y > this.canvas.height) ){
           return false;
        }   
         
        return true;   
    };

    update(){
        if (this.checkBoundaries(this.y)===true) {
            this.y=this.y+this.speed*this.direction;
        }else this.delete=true;
    };

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();                 

        if (this.direction === -1) {
            this.ctx.arc(this.x,this.y-4,6,0, 2*Math.PI);  
        } else {
            this.ctx.arc(this.x,this.y-4,4,0, 2*Math.PI);  
        }
        this.ctx.fill();  
        this.ctx.stroke();   

    };

    
   
}