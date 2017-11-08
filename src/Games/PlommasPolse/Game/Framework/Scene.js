import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";

class Scene {
  constructor(application, gameData, sceneManager) {
    this.application = application;
    this.stage = new PIXI.Container();
    this.ticker =  new PIXI.ticker.Ticker();
    this.gameData = gameData;
    this.sceneManager = sceneManager;
  }

  start() {
    this.ticker.start();
  }

  stop() {
    this.ticker.stop();
  }

  destroy() {
    this.stage.destroy();
    this.ticker.destroy();
    TWEEN.removeAll();
  }

  getStage() {
    return this.stage;
  }

  newGameData(gameData) {
  }

  newEvent(event) {
  }

  receiveGameEvent(event) {
  }

}

export default Scene;