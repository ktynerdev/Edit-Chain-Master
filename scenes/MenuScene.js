import { createMainButton } from "../ui/Buttons.js";
import { createTitleText, createStatCard } from "../ui/Panels.js";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;
    const stats = this.registry.get("saveData") || {
      bestScore: 0,
      bestRound: 0,
      bestAccuracy: 0,
      longestCombo: 0,
      sessionsPlayed: 0,
    };

    this.add.rectangle(width / 2, height / 2, width, height, 0x0b1730);

    createTitleText(this, width / 2, 120, "EDIT CHAIN MASTER", 38);

    this.add.text(width / 2, 168, "Trace Fast. Build Faster. Break the Pressure.", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#d8f4ff",
    }).setOrigin(0.5);

    createStatCard(this, width / 2, 285, 430, 172, "PLAYER STATS");

    const lines = [
      `Best Score: ${stats.bestScore}`,
      `Best Round: ${stats.bestRound}`,
      `Best Accuracy: ${Number(stats.bestAccuracy || 0).toFixed(1)}%`,
      `Longest Combo: ${stats.longestCombo}`,
      `Sessions: ${stats.sessionsPlayed}`,
    ];

    lines.forEach((line, index) => {
      this.add.text(width / 2 - 165, 245 + index * 28, line, {
        fontFamily: "Arial",
        fontSize: "20px",
        color: "#e6f6ff",
      }).setOrigin(0, 0.5);
    });

    createMainButton(this, width / 2, 540, "PLAY", () => {
      this.scene.start("GameScene");
    });

    createMainButton(this, width / 2, 640, "HOW TO PLAY", () => {
      this.scene.start("HowToPlayScene");
    });

    createMainButton(this, width / 2, 740, "STATS", () => {
      this.scene.start("StatsScene");
    });

    createMainButton(this, width / 2, 840, "RESET STATS", () => {
      this.registry.set("saveData", {
        bestScore: 0,
        bestRound: 0,
        bestAccuracy: 0,
        longestCombo: 0,
        sessionsPlayed: 0,
      });
      this.scene.restart();
    }, 300, 60, 18);
  }
}
