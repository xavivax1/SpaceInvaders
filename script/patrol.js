'use strict';

class Patrol { 
    constructor(canvas ){
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
        
        
        // setup invaders array
        this.invaders=new Array(5);
    
        for (let row=0;row<this.rows;row++){
            this.invaders[row]=new Array(this.cols);
        
            for (let col=0;col<this.cols;col++) {
                let def = new Invader(this.canvas,(col+1)*this.xpad+(col)*this.invaderWidth,
                                        (row+1)*this.ypad+(row)*this.invaderHeight,
                                        this.invaderWidth, this.invaderHeight,
                                        this.getColor(row),this.getPoints(row));
                def.setDirection(0,1);
                /*
                if (row < 2) 
                    def.imagePlayer.src='./images/InvaderA.png';
                if (row ===2 || row === 3) {
                    def.imagePlayer.ser='/images/InvaderB.png';
                }   
                if (row === 4 ){
                    def.imagePlayer.ser='/images/InvaderC.png'
                }
                this.invaders[row][col]=def;
                */
        
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
        }

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

    shot(playerx, playery){
        let AliveInvader=selectAliveInvader();
        let numShots=0;
        
        //1- select optimum shotters 

        //2- randomly shot to the defender appending shells to the game array
        //let bomb= new Bomb(this.canvas,-1,this.x+this.width/2, this.y-1);
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
        return(this.invaders.filter( e => e.isAlive() ));
    };  
    
    findBottomInvader(){
    let bottomy=0;
        this.invaders.forEach(i => {
            i.forEach(e =>{ 
                if (e.y > bottomy)
                   bottomy=e.y;
            });
        });
        return bottomy;

    };

    findRightInvader(){
        let Right=0;
        this.invaders.forEach(i => {
            i.forEach(e =>{ 
                if (e.x+width > Right)
                Right=e.x+width;
            });
        });
        return Right;
    };

    findLeftInvader(){
        let Left=300;
        this.invaders.forEach(i => {
            i.forEach(e =>{ 
                if (e.x< Left)
                Left=e.x;
            });
        });
        return Right;
    };

};    