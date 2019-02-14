'use strict';
const main=() => {
    const buildDom = (html) => {
      
        const main =document.querySelector('main');
        main.innerHTML = html;
        return main;

    };
    const buildSplashScreen = () => {
       const splashScreen = buildDom(`
       <section class="splash-screen">
       <h1>Eternal enemies</h1>
       <button>Start</button>
       </section>
       
       `);

       const StartButton=document.querySelector('button');
       StartButton.addEventListener('click',buildGameScreen);

    };

      const buildGameScreen =()=>{
        const gameScreen = buildDom(`
          <section class="game-screen">
              <canvas></canvas>
          </section>
        `);
        const width=document.querySelector('.game-screen').offsetWidth;
        const height=document.querySelector('.game-screen').offsetHeight;

        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width',width);
        canvasElement.setAttribute('height',height);

        

        //setTimeout(buildGameOver, 3000);
        const game = new Game(canvasElement);
        game.gameOverCallback (buildGameOver);
        
        game.startLoop();

        const setPlayerDirection  = (event) => {
            if ( event.code === 'ArrowUp') {
                game.player.setDirection(-1);

            }else if (event.code==='ArrowDown'){
                game.player.setDirection(1);
            }
        };
        document.addEventListener('keydown',setPlayerDirection);
    };

    const buildGameOver = () => {
        const gameOverScreen9v = buildDom (`
        <section class="game-over">
        <h1<Game Over Screen </h1>
        <button>Restart</button>
        </section>
        `);

        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);
    }
    buildSplashScreen();

}


window.addEventListener('load',main);