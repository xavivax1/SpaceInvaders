'use strict';

class Patrol { 
    constructor(canvas, numInvaders ){
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');
        //this.direction;   // clase filla
        this.originx;
        this.originy;
        this.speed=2;
        //this.delete=false;
        this.invader=[];
        this.numInvaders=numInvaders;
        
        this.rows=5;
        this.cols=11;
        this.xpad=15;
        this.ypad=15;
        this.invaderWidth=40;
        this.invaderHeight=45;
        this.lastx=0;
        this.lasty=0;
        // implementar un set
        this.directionVector=[ [0,1] ,[1,0] ,[0,-1] ,[-1,0] ] ;  // vectores =['down','right','up','left']
        this.lastMove=0;

        // setup array
        this.invaders=new Array(5);
    
        for (let row=0;row<this.rows;row++){
            this.invaders[row]=new Array(this.cols);
        
            for (let col=0;col<this.cols;col++) {
                if (numInvaders) {
                    let def = new Invader(this.canvas,(col+1)*this.xpad+(col)*this.invaderWidth,
                                            (row+1)*this.ypad+(row)*this.invaderHeight,
                                            this.invaderWidth, this.invaderHeight,
                                            this.getColor(row),this.getPoints(row));
                    this.invaders[row][col]=def;
                    this.lastx=row;
                    this.lasty=col;
                    numInvaders--
                };
            };  
        };  
    }
    update(targetx, targety){
        // check foe impacts update score and remove corpses by ==> should be done by game?!
        // find invaders candidate to shot, and randomly do it. ==> shoulb be done by game!
        this.shot(targetx,targety);
        // checkPatrolBoundaries and step forward
        if( this.checkPatrolBoundaries() === false ) {   // canvio de direccion
            
        }
        /*
        let nova=this.invaders.forEach(element => {

        });
        */
        

    };

    checkPatrolBoundaries(){
        let firstRow=this.invaders[0];
        let lastRow=this.invaders[4];
        let downRightInvader=lastRow[11];
        let downLeftInvader=lastRow[0];
        let topRightInvader=firstRow[11];
        let topLeftInvader=firstRow[0];

        // let' try doing the last movement
        if ( this.lastMove = 1 ) { // movement dreta 
            if (downLeftInvader.checkBoundaries( this.directionVector[0],0) === false) {
                // comprovem si podem baixar 1 posicio baixem 1 i posem lastMove=3;
                if ( downLeftInvader.checkBoundaries( 0,1) === false ) {
                    //Game Over
                    return false;
                }
                else {
                    this.lastMove=3;
                    return true
                }
            }
            
        }
        /*
        if (this.lastMove === 0 ) {
            if 
        

        }
*/
        
    }

    shot(playerx, playery){
        //1- select optimum shotters 
        //2- randomly shot to the defender appending shells to the game array
    }
    draw(){
        let nova=this.invaders.forEach(invader => {
            let nova2=invader.forEach(e =>{ 
                e.draw();
            })
        });

    };
    landing(){
        // comprova si hi ha invaders a la landing zone, if so ----> Game Over

    };

    speedUp(){   // incrementa velocitat
        
        this.speed++;
    };

    getColor(row) {
        if (row <= 2 ) return 'purple';
        if (row === 3 ) return 'red';
        else return 'orange';
    };

    getPoints(row){
        if (row <= 2 ) return 40;
        if (row === 3 ) return 30;
        else return 10;
    };
};    