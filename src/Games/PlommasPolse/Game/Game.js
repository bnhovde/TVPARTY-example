import SceneManager from "./Framework/SceneManager";
import SplashScreen from "./Scenes/SplashScreen";
import Description from "./Scenes/Description";
import TWEEN from "@tweenjs/tween.js";

/* Assets */
import theme from "./assets/plonsters.ogg"
import GameScene from "./Scenes/GameScene";

class Game {
  constructor(pixiApplication, {gameData}) {

    // Setup the animation loop for tweeing.
    function animate(time) {
      requestAnimationFrame(animate);
      TWEEN.update(time);
    }
    requestAnimationFrame(animate);

    this.sceneManager = new SceneManager(pixiApplication);
    this.sceneManager.gameData = gameData;

    this.sceneManager.addScene("splashScreen", new SplashScreen(pixiApplication, gameData, this.sceneManager));
    this.sceneManager.addScene("description", new Description(pixiApplication, gameData, this.sceneManager));
    this.sceneManager.addScene("gameScene", new GameScene(pixiApplication, gameData, this.sceneManager));
    this.sceneManager.changeScene("splashScreen");

  }

  newGameData(gameData) {
    if(this.sceneManager) {
      this.sceneManager.newGameData(gameData);
    }
  }

  newEvent(event) {
    if(this.sceneManager) {
      this.sceneManager.newEvent(event);
    }
  }
}

export default Game;