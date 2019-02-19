'use strict';

class Invader { 
    constructor(canvas, x,y,width,height, color, points, row, col ){
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');
        this.color=color;
        this.points=points;
        this.directionx=0;   // clase filla
        this.directiony=0;
        this.x=x;
        this.y=y;
        this.speed_x= 2;
        this.speed_y=16;
        this.width=width;
        this.height=height;
        this.isAlive=true;
        this.imagePlayer = new Image();
        this.imagePlayer.src='./images/InvaderC1.png';
        this.imagePlayer1 = new Image();
        this.imagePlayer1.src='./images/InvaderB1.png';
        this.imageCnt=0;
        this.row=row;
        this.col=col;

        switch (row){
            case 0:
            case 1:
                this.imagePlayer1.src='./images/InvaderC1.png';
                this.imagePlayer.src='./images/InvaderC.png';
            break;
            case 2:
            case 3:
                this.imagePlayer1.src='./images/InvaderB1.png';
                this.imagePlayer.src='./images/InvaderB.png'; 
            break;  
            case 4:
                this.imagePlayer1.src='./images/InvaderA1.png';
                this.imagePlayer.src='./images/InvaderA.png'; 
            break;          

        }
       
    }
    setDirection(x,y){
        this.directionx=x;
        this.directiony=y;
    };
    
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
        this.x=this.x+this.speed_x*this.directionx;
    };

    draw(){
        //this.ctx.color=this.color;
        
        this.imageCnt++;
        if (this.imageCnt%20===0) {
            this.imageCnt=0;
            if (this.sprite===true) {
                this.sprite=false;
            }else this.sprite=true;
        }    
        if ( this.sprite === true ) {
            this.ctx.drawImage(this.imagePlayer1, this.x, this.y,this.width, this.height);
        }
        else {
            this.ctx.drawImage(this.imagePlayer, this.x, this.y,this.width, this.height);
        }
                   
    };
       

    getPoints(){     
        return( this.points);
    };
 
    bangBang(){
        this.isAlive=false;
    }
   
}