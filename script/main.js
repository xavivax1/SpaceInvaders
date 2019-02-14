'use strict';
const main=() => {

    const buildDom = (html) => {
        const main = document.querySelector('main');
        main.innerHTML= html;
    };
   
    const buildSplashScreen =() =>{
        const splashScreen =  buildDom(`
            <section class="splash-screen">
            <img id="space-invader-logo"src="image/spaceinvaderlogo.png" alt="logo">
            <h1> SPACE INVADER - no rights reserved </h1>
         
            </section>
            <footer>
               <p>PRESS ANY KEY TO START GAME </p>
            </footer>           

        `);

        const StartButton=document.querySelector('button');
        StartButton.addEventListener('click',buildGameScreen);
    };

    const buildGameScreen=()=>{
        const gameScreen = buildDom(`
          <section class="game-screen">
              <canvas></canvas>
          </section>
        `);
        const width = document.querySelector('.game-screen').offsetWidth;
        const height= document.querySelector('.game-screen').offsetHeight;

        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width',width);
        canvasElement.setAttribute('height', height);

        setTimeout(buildGameOver, 10000);
        const game = new Game(canvasElement);
        game.gameOverCallback (buildGameOver);
        
        game.startLoop();

        /*
        const setPlayerDirection  = (event) => {
            if ( event.code === 'ArrowUp') {
                game.player.setDirection(-1);

            }else if (event.code==='ArrowDown'){
                game.player.setDirection(1);
            }
        };
        document.addEventListener('keydown',setPlayerDirection);
        */
    }

}


window.addEventListener('load',main);