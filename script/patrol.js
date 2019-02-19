'use strict';

class Patrol { 
    constructor(canvas,bombs){
        this.canvas=canvas;
        this.ctx=canvas.getContext('2d');
        this.originx;
        this.originy;
        this.speed=2;
        this.rows=5;
        this.cols=11;
        this.xpad=15;
        this.ypad=15;
        this.invaderWidth=40;
        this.invaderHeight=45;
        this.vDown=[0,1];
        this.vLeft=[-1,0];
        this.vRight=[1,0];
        this.vector=[1,0];    // comencem anant a la dreta
        this.lastMove='Right';
        this.bombs=bombs;

        
        // setup invaders array
        this.invaders=new Array(5);
        this.aliveInvaders=[];
    
        for (let row=0;row<this.rows;row++){
            this.invaders[row]=new Array(this.cols);
        
            for (let col=0;col<this.cols;col++) {
                let def = new Invader(this.canvas,(col+1)*this.xpad+(col)*this.invaderWidth,
                                        (row+1)*this.ypad+(row)*this.invaderHeight,
                                        this.invaderWidth, this.invaderHeight,
                                        this.getColor(row),this.getPoints(row),
                                        row, col);
                def.setDirection(0,1);
                this.invaders[row][col]=def;
            };  
        };  
    };

    setDirection(texto){
        switch(texto){
            case 'Left':
                this.lastMove=texto;
               this.vector=this.vLeft;
            break;   
            case 'Right':
                this.lastMove=texto;
                this.vector=this.vRight;
            break;   
            case 'Down':
                this.lastMove=texto;
                this.vector=this.vDown;
            break;   
        }
    }
    
    update(targetx, targety){
        this.setDirection(this.lastMove);
        this.invaders.forEach(i => {
            i.forEach(e =>{ 
                e.setDirection(this.vector[0], this.vector[1]);
            });
        });
        if (this.patrolBoundariesReached() === true ) {                     
            let prevMove=this.lastMove;
           if (this.lastMove === 'Left' || this.lastMove === 'Right' ) {            // RIGHT or LEFT
                this.setDirection('Down');
               
               if (this.patrolBoundariesReached() === true ) {
                  return false;                             // Game Over (landing zone)
               }   
               else {
                    this.invaders.forEach(i => {
                        i.forEach(e =>{ 
                            e.setDirection(this.vector[0],this.vector[1]);
                            e.update();
                        });
                    });
                    if ( prevMove === 'Left' ) {                // start shifting the opposite direction
                        this.setDirection('Right');
                    }    
                    else {
                        this.setDirection('Left');
                    }    
               }   
           }
           else 
                return (false);                          // limit inferior de Y
           
        } else {
            this.invaders.forEach(i => {
                i.forEach(e =>{ 
                    e.setDirection(this.vector[0], this.vector[1]);
                    e.update();
                });
            });
        };
        this.shot(targetx);

    };

    patrolBoundariesReached() {
        let lastRow=this.invaders[4];
        let downRightInvader=lastRow[10];
        let downLeftInvader=lastRow[0];

        if ( this.lastMove === 'Right' ) { // shifting right
            downRightInvader.setDirection(this.vector[0],this.vector[1]);
            if (downRightInvader.boundariesReached() === true) {
                return true;                
            }
            
        } else if (this.lastMove === 'Left') {   // shifting left
            downLeftInvader.setDirection(this.vector[0],this.vector[1]);
            if (downLeftInvader.boundariesReached() === true) {
                return true;
            }
        }else if (this.lastMove === 'Down') {   // shifting down
            downLeftInvader.setDirection(this.vector[0],this.vector[1]);
            if (downLeftInvader.boundariesReached()=== true ) {
                return true;
            }
        }
        return false;
        
    };

    
    draw(){
        this.invaders.forEach(i => {
            i.forEach(e =>{ 
                if (e.isAlive === true )
                    e.draw();
            });
        });
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
     

    selectAliveInvader(){

     var tmpaliveInvader=[]   
             
        this.invaders.forEach(i => {
            i.forEach(e =>{ 
                if (e.isAlive == true) {
                    tmpaliveInvader.push(e);
                }
                
            });
        });
        this.aliveInvaders=tmpaliveInvader;
        
    };  
    

    shot(playerx){
         //1- select optimum shotters 
        this.selectAliveInvader();

        let sniperTeam=this.getRangeShotters(this.getNearestColumn(playerx));
        let shots=0;
        let sniper;
        //2- randomly shot to the defender appending shells to the game array
        if (sniperTeam.length <= 10 )
           shots = 2;
        else shots = 4;

        for (let n=0; n<shots; n++){
            sniper = Math.floor(Math.random()* sniperTeam.length);
            let e=sniperTeam[sniper];
            this.bombs.push( new Bomb(this.canvas,1,e.x+e.width/2, e.y + 1));
        }
        
        
    };
    /* ---------------------------------------------------------------
        getNearestColumn(x):

        Returns the nearest column to the x position on this.invaders
        bidimensional array.
    ----------------------------------------------------------------*/
    getNearestColumn(x){
        //let alive=this.selectAliveInvader();
        let column=99;
        let minim=99;
        this.aliveInvaders.forEach(e =>{
            let result= Math.min(  Math.abs(x-e.x),  Math.abs(e.x+e.width -x ));
            if (result < minim ) {
                minim = result;
                column = e.col;
            }
        });
        return column;
    };
 /* ---------------------------------------------------------------
    getRangeShotters(col):
    receives the col nearest to de actual defender position.
    returns an array containing this column invaders and the invaders of 
    the two nearest columns.
    ----------------------------------------------------------------- */
    getRangeShotters(col){                  
        
        //let aliveInvaders=this.selectAliveInvader();
        let rangeShotters=this.aliveInvaders.filter( e => {
            if ( Math.abs(e.col - col) <= 1 ) 
               return true;
        }); 
        return rangeShotters;          

    };
    /* ---------------------------------------------------------------
    findPatrolBottom():
         return the bottom position of the patrol
    ----------------------------------------------------------------- */

    findPatrolBottom(){
    let alive=this.selectAliveInvader();   
    let bottomy=0;

        alive.forEach(i => {
            i.forEach(e =>{ 
                if (e.y > bottomy)
                   bottomy=e.y;
            });
        });
        return bottomy;
    };
 /* ---------------------------------------------------------------
    findPatrolRight():
         returns the most right position of the patrol
    ----------------------------------------------------------------- */
    findPatrolRight(){
    let alive=this.selectAliveInvader();       
    let Right=0;
        alive.forEach(i => {
            i.forEach(e =>{ 
                if (e.x+width > Right)
                Right=e.x+width;
            });
        });
        return Right;
    };
 /* ---------------------------------------------------------------
    findPatrolLeft():
         return the most left position of the patrol
    ----------------------------------------------------------------- */
    findPatrolLeft(){
    let alive=this.selectAliveInvader();    
    let Left=300;
        alive.forEach(i => {
            i.forEach(e =>{ 
                if (e.x< Left)
                Left=e.x;
            });
        });
        return Left;
    };

};    