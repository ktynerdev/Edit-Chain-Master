import { SaveManager } from "../systems/SaveManager.js";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.createTextures();
  }

  create() {
    this.registry.set("saveManager", new SaveManager("edit-chain-master-save"));
    this.registry.set("sessionResults", null);

    this.input.addPointer(2);

    this.scene.start("MenuScene");
  }

  createTextures() {
    if (!this.textures.exists("particle-dot")) {
      const g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0xffffff, 1);
      g.fillCircle(8, 8, 8);
      g.generateTexture("particle-dot", 16, 16);
      g.destroy();
    }

    if (!this.textures.exists("tile-bg")) {
      const g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillGradientStyle(0x17345c, 0x1e4a7f, 0x0f203a, 0x143055, 1);
      g.fillRoundedRect(0, 0, 96, 96, 18);
      g.lineStyle(3, 0x67e8f9, 0.35);
      g.strokeRoundedRect(1.5, 1.5, 93, 93, 18);
      g.generateTexture("tile-bg", 96, 96);
      g.destroy();
    }

    if (!this.textures.exists("hud-pill")) {
      const g = this.make.graphics({ x: 0, y: 0, add: false });
      g.fillStyle(0x0a1a31, 0.85);
      g.fillRoundedRect(0, 0, 180, 56, 22);
      g.lineStyle(2, 0x7dd3fc, 0.18);
      g.strokeRoundedRect(1, 1, 178, 54, 22);
      g.generateTexture("hud-pill", 180, 56);
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
      g.fillGradientStyle(0x1e40af, 0x2563eb, 0x0f172a, 0x1e3a8a, 1);
      g.fillRoundedRect(0, 0, 340, 72, 24);
      g.lineStyle(3, 0x67e8f9, 0.28);
      g.strokeRoundedRect(1.5, 1.5, 337, 69, 24);
      g.generateTexture("button-bg", 340, 72);
      g.destroy();
    }
  }
}
