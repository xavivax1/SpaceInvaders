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
        this.speed_x=5;
        this.speed_y=2;
        this.width=width;
        this.height=height;
        this.isDead=false;
    }
    setDirection(x,y){
        this.directionx=x;
        this.directiony=y;
    }
    //
    checkBoundaries(vx, vy){

        if ( (this.x+this.witdh + vx * this.speed_x > this.canvas.height - 80) ||
             (this.y+this.height + vy * this.speed_y > this.canvas.width) ||
             (this.x+vy * this.steep_x )< 0 ) {
            return false;
        }
        return true;
    };

/*    update(){
        if (this.checkBoundaries(this.x,this.y)) {
            this.y=this.y+this.speed_y*this.direction_Y;
            this.x=this.x+this.speed_y*this.direction_X;
        }else this.delete=true;
    };
*/

    update(x,y){ // patrol informa las nuevas posiones directamente
        this.x=x;
        this.y=y; 
    };
    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y,this.width, this.height);
    };

    getPoints(){
        return( this.points);
    };

    bangBang(){
        this.isDead=true;
    }
   
}