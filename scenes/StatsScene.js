import { createMainButton } from "../ui/Buttons.js";
import { createTitleText, createStatCard } from "../ui/Panels.js";

export class StatsScene extends Phaser.Scene {
  constructor() {
    super("StatsScene");
  }

  create() {
    const { width, height } = this.scale;
    const data = this.registry.get("saveData") || {
      bestScore: 0,
      bestRound: 0,
      bestAccuracy: 0,
      longestCombo: 0,
      sessionsPlayed: 0,
    };

    this.add.rectangle(width / 2, height / 2, width, height, 0x07111f);

    createTitleText(this, width / 2, 100, "LIFETIME STATS", 34);
    createStatCard(this, width / 2, 350, 450, 420, "CAREER");

    const lines = [
      `Best Score: ${data.bestScore}`,
      `Best Round: ${data.bestRound}`,
      `Best Accuracy: ${Number(data.bestAccuracy || 0).toFixed(1)}%`,
      `Longest Combo: ${data.longestCombo}`,
      `Sessions: ${data.sessionsPlayed}`,
    ];

    lines.forEach((line, index) => {
      this.add.text(width / 2 - 165, 220 + index * 56, line, {
        fontFamily: "Arial",
        fontSize: "25px",
        color: "#f2fbff",
      }).setOrigin(0, 0.5);
    });

    createMainButton(this, width / 2, 860, "BACK", () => {
      this.scene.start("MenuScene");
    });
  }
}
