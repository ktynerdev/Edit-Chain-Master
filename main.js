import { BootScene } from "./scenes/BootScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { HowToPlayScene } from "./scenes/HowToPlayScene.js";
import { StatsScene } from "./scenes/StatsScene.js";
import { GameScene } from "./scenes/GameScene.js";
import { ResultsScene } from "./scenes/ResultsScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 540,
  height: 960,
  backgroundColor: "#071120",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  input: {
    activePointers: 3,
  },
  scene: [
    BootScene,
    MenuScene,
    HowToPlayScene,
    StatsScene,
    GameScene,
    ResultsScene,
  ],
};

new Phaser.Game(config);
