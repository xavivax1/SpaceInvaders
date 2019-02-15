'use strict';

class Bomb {
    constructor(canvas, direction,x,y){
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');
        this.color='red';
        this.direction=direction;   // clase filla
        this.x=x;
        this.y=y;
        this.speed=5;
        this.delete=false
    }
    checkBoundaries(y){
        if (y > this.canvas.height) 
           return false;
        else 
            return true;   
    };

    update(){
        if (this.checkBoundaries(this.y)) {
            this.y=this.y+this.speed*this.direction;
        }else this.delete=true;
    };

    draw(){
        this.ctx.fillStyle = this.color;
        /*
        this.ctx.fillRect(this.x, this.y,
                          this.x+2, this.y-4);
                       */
        this.ctx.beginPath();                 
        this.ctx.arc(this.x,this.y-4,3,0, 2*Math.PI);  
        this.ctx.fillStyle = "yellow";
        this.ctx.fill();  
        this.ctx.stroke();   
    };

    
   
}