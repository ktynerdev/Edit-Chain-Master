import { BootScene } from "./scenes/BootScene.js";
import { MenuScene } from "./scenes/MenuScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 540,
  height: 960,
  backgroundColor: "#08111f",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, MenuScene],
};

new Phaser.Game(config);
