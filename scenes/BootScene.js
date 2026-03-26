export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.createTextures();
  }

  create() {
    this.registry.set("saveData", {
      bestScore: 0,
      bestRound: 0,
      bestAccuracy: 0,
      longestCombo: 0,
      sessionsPlayed: 0,
    });

    this.registry.set("sessionResults", null);
    this.scene.start("MenuScene");
  }

  createTextures() {
    if (!this.textures.exists("tile-bg")) {
      const g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0x17345c, 1);
      g.fillRoundedRect(0, 0, 96, 96, 18);
      g.lineStyle(3, 0x67e8f9, 0.35);
      g.strokeRoundedRect(1.5, 1.5, 93, 93, 18);
      g.generateTexture("tile-bg", 96, 96);
      g.destroy();
    }

    if (!this.textures.exists("panel-card")) {
      const g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0x081425, 0.92);
      g.fillRoundedRect(0, 0, 440, 260, 28);
      g.lineStyle(3, 0x8b5cf6, 0.18);
      g.strokeRoundedRect(1.5, 1.5, 437, 257, 28);
      g.generateTexture("panel-card", 440, 260);
      g.destroy();
    }

    if (!this.textures.exists("button-bg")) {
      const g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0x2563eb, 1);
      g.fillRoundedRect(0, 0, 340, 72, 24);
      g.lineStyle(3, 0x67e8f9, 0.28);
      g.strokeRoundedRect(1.5, 1.5, 337, 69, 24);
      g.generateTexture("button-bg", 340, 72);
      g.destroy();
    }
  }
}
