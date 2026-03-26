import { createMainButton } from "../ui/Buttons.js";
import { createTitleText, createStatCard } from "../ui/Panels.js";

export class StatsScene extends Phaser.Scene {
  constructor() {
    super("StatsScene");
  }

  create() {
    const { width } = this.scale;
    const saveManager = this.registry.get("saveManager");
    const data = saveManager.getData();

    this.createBackground();

    createTitleText(this, width / 2, 100, "LIFETIME STATS", 34);
    createStatCard(this, width / 2, 350, 450, 520, "CAREER");

    const lines = [
      `Best Score: ${data.bestScore}`,
      `Best Round: ${data.bestRound}`,
      `Best Accuracy: ${data.bestAccuracy.toFixed(1)}%`,
      `Longest Combo: ${data.longestCombo}`,
      `Fastest Trace: ${data.fastestTrace === 9999 ? "--" : `${data.fastestTrace.toFixed(2)}s`}`,
      `Total Sessions: ${data.sessionsPlayed}`,
      `Total Mistakes: ${data.totalMistakes}`,
      `Total Tiles Traced: ${data.totalTilesTraced}`,
    ];

    lines.forEach((line, index) => {
      this.add
        .text(width / 2 - 165, 220 + index * 50, line, {
          fontFamily: "Arial",
          fontSize: "26px",
          color: "#f2fbff",
        })
        .setOrigin(0, 0.5);
    });

    createMainButton(this, width / 2, 860, "BACK", () => {
      this.scene.start("MenuScene");
    });
  }

  createBackground() {
    const { width, height } = this.scale;
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x07111f, 0x10203e, 0x091121, 0x040914, 1);
    bg.fillRect(0, 0, width, height);
  }
}
