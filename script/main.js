'use strict';
const main=() => {

    const buildDom = (html) => {
        const main = document.querySelector('main');
        main.innerHTML= html;
    };
    
    
    const buildSplashScreen =() =>{
        const splashScreen =  buildDom(`
        <section class="splash-screen">
        <img id='space-invader-logo' src='images/spaceinvaderlogo.png' alt="logo">
        <h1> SPACE INVADER - no rights reserved </h1>
        <p>PRESS ANY KEY TO START GAME </p>
        <button>Start</button>
        </section>
        `);

        // Listener inicio de juego
        const StartButton=document.querySelector('button');
        StartButton.addEventListener('click',buildGameScreen);
    };
    

    // callback() de inicio de juego
    const buildGameScreen=()=>{
        const gameScreen = buildDom(`
            <section class="background">
            <section class="header">
                <div>
                    <p>SCORE(1)</p>
                    <p id="score1"><script>game.score</script></p>
                </div>
                <div>
                    <p>HI-SCORE</p>
                    <p id="highscore"><script>game.score</script></p>
                </div>
                <div>
                    <p>SCORE(2)</p>
                    <p id="score2"><script>game.score</script></p>
                </div>
            </section>
            <section class="game-screen">
                <canvas></canvas>
            </section>
            <section class="footer">
                <div>
                    <p>3</p>
                </div>
                <div>
                    <p>CREDIT 00</p>
                </div>
            </section>
            </section>
        `);
        const width = document.querySelector('.game-screen').offsetWidth;
        const height= document.querySelector('.game-screen').offsetHeight;

        const canvasElement = document.querySelector('canvas');

        canvasElement.setAttribute('width',width);
        canvasElement.setAttribute('height', height);

       // setTimeout(buildGameOver, 10000);
        const game = new Game(canvasElement);
        game.gameOverCallback (buildGameOver);
        
        game.startLoop();
        
        const setDefenderDirection  = (event) => {
            if ( event.code === 'ArrowLeft') {
                game.defender.setDirection(-1);
            }else if (event.code==='ArrowRight'){
                game.defender.setDirection(1);
            }else if (event.code==='Space') {            
                game.bombs.push(game.defender.shot());
            }
        };
        document.addEventListener('keydown',setDefenderDirection);
        
       
        const setDefenderStop  = (event) => {
            game.defender.setDirection(0);
        };
        document.addEventListener('keyup',setDefenderStop);
        
        
        
      
    }
    //------------------------------------
    const buildGameOver =()=>{
        
        const gameScreen = buildDom(`
          <section class="gameover">
          <div>
          <h1>GAME OVER </h1>
          <h2>HALL OF FAME</h2>
          <h2>------------</h2>
          <h3> player 1 .....  1200 pts</h3>
          <h3> player 2 .....  1200 pts</h3>
          </div>

          <div id=bottom>
            <p>PRESS ANY KEY TO RESTART</p>
            <button>Restart</button>
          </div>
          </section>  
          
        `);
        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);
    
    };

    buildSplashScreen();
}
window.addEventListener('load',main);