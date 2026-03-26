import { createMainButton } from "../ui/Buttons.js";
import { createTitleText, createStatCard } from "../ui/Panels.js";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;
    const saveManager = this.registry.get("saveManager");
    const stats = saveManager.getData();

    this.createBackground();

    createTitleText(this, width / 2, 120, "EDIT CHAIN MASTER", 38);
    this.add
      .text(width / 2, 168, "Trace Fast. Build Faster. Break the Pressure.", {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#d8f4ff",
      })
      .setOrigin(0.5)
      .setAlpha(0.9);

    const statCard = createStatCard(this, width / 2, 285, 430, 172, "PLAYER STATS");
    const lines = [
      `Best Score: ${stats.bestScore}`,
      `Best Round: ${stats.bestRound}`,
      `Best Accuracy: ${stats.bestAccuracy.toFixed(1)}%`,
      `Longest Combo: ${stats.longestCombo}`,
      `Sessions: ${stats.sessionsPlayed}`,
    ];

    lines.forEach((line, index) => {
      this.add
        .text(width / 2 - 165, 245 + index * 28, line, {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "#e6f6ff",
        })
        .setOrigin(0, 0.5);
    });

    const playBtn = createMainButton(this, width / 2, 540, "PLAY", () => {
      this.scene.start("GameScene");
    });

    const howBtn = createMainButton(this, width / 2, 640, "HOW TO PLAY", () => {
      this.scene.start("HowToPlayScene");
    });

    const statsBtn = createMainButton(this, width / 2, 740, "STATS", () => {
      this.scene.start("StatsScene");
    });

    const settingsBtn = createMainButton(this, width / 2, 840, "RESET STATS", () => {
      saveManager.reset();
      this.scene.restart();
    });

    [playBtn, howBtn, statsBtn, settingsBtn].forEach((btn, i) => {
      btn.setAlpha(0);
      btn.y += 24;
      this.tweens.add({
        targets: btn,
        y: btn.y - 24,
        alpha: 1,
        ease: "Back.Out",
        duration: 450,
        delay: 200 + i * 90,
      });
    });

    this.add
      .text(width / 2, height - 26, "Mobile-first prototype • Phaser 3", {
        fontFamily: "Arial",
        fontSize: "14px",
        color: "#92b9d6",
      })
      .setOrigin(0.5);
  }

  createBackground() {
    const { width, height } = this.scale;

    const bg = this.add.graphics();
    bg.fillGradientStyle(0x06111f, 0x0d1b33, 0x091120, 0x040b16, 1);
    bg.fillRect(0, 0, width, height);

    for (let i = 0; i < 40; i++) {
      const x = Phaser.Math.Between(0, width);
      const y = Phaser.Math.Between(0, height);
      const r = Phaser.Math.Between(1, 3);
      const a = Phaser.Math.FloatBetween(0.15, 0.45);
      this.add.circle(x, y, r, 0x9bdcff, a);
    }

    const plat1 = this.add.rectangle(width / 2, 205, 300, 20, 0x17345c, 0.5).setStrokeStyle(2, 0x67e8f9, 0.3);
    const plat2 = this.add.rectangle(width / 2 - 90, 380, 200, 16, 0x1a2750, 0.4).setStrokeStyle(2, 0xa78bfa, 0.22);
    const plat3 = this.add.rectangle(width / 2 + 95, 430, 180, 16, 0x1a2750, 0.4).setStrokeStyle(2, 0xa78bfa, 0.22);

    [plat1, plat2, plat3].forEach((item, idx) => {
      this.tweens.add({
        targets: item,
        y: item.y + 10,
        duration: 2200 + idx * 300,
        yoyo: true,
        repeat: -1,
        ease: "Sine.InOut",
      });
    });

    const particles = this.add.particles(0, 0, "particle-dot", {
      x: { min: 0, max: width },
      y: { min: 0, max: height },
      speedY: { min: -8, max: 8 },
      speedX: { min: -5, max: 5 },
      scale: { start: 0.18, end: 0.03 },
      alpha: { start: 0.3, end: 0.05 },
      lifespan: 5000,
      quantity: 1,
      frequency: 120,
      blendMode: "ADD",
    });
    particles.setDepth(0);
  }
}
