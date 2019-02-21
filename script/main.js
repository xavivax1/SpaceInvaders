'use strict';
const main=() => {

    const buildDom = (html) => {
        const main = document.querySelector('main');
        main.innerHTML= html;
    };
    
    
    const buildSplashScreen =() =>{
        const splashScreen =  buildDom(`
        <section class="splash-screen">
        <img id='space-invader-logo' src='./images/spaceinvaderlogo.png' alt="logo">
        <div id="logos">
          <img src='./images/InvaderA.png' alt="A">
          <img src='./images/InvaderB.png' alt="B">
          <img src='./images/InvaderC.png' alt="C">
          <img src='./images/InvaderA1.png' alt="A">
          <img src='./images/InvaderB1.png' alt="B">
          <img src='./images/InvaderC1.png' alt="C">
        </div>
            
        
        <button id=boto>START</button>
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
                    <p id="score1"></p>
                </div>
                <div>
                    <p>HI-SCORE</p>
                    <p id="highscore"></p>
                </div>
                <div>
                    <p>SCORE(2)</p>
                    <p id="score2"></p>
                </div>
            </section>
            <section class="game-screen">
                <canvas></canvas>
            </section>
            <section class="footer">
                <div>
                    <p id="lives"></p>
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

        game.gameUpdateScore(() => {
            const scorePlayerShow = document.getElementById('score1');
            const playerLivesShow = document.getElementById('lives');
            playerLivesShow.innerHTML = game.lives;
            scorePlayerShow.innerHTML = game.score;
         });
        
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
          <div id="theOnlyDiv">
          <h1>GAME OVER </h1>
          <h3> TXI .....  3200 </h3>
          <h3> AAA .....  1200 </h3>
          <h3> FET .....  0820 </h3>
          <h3> DAD .....  0910 </h3>
          <h3> MOM .....  0200 </h3>
                   
          <button id=boto>Restart</button>
          </div>
          </section>  
          
        `);
        const restartButton = document.querySelector('button');
        restartButton.addEventListener('click', buildGameScreen);
    
    };


    buildSplashScreen();
}
window.addEventListener('load',main);