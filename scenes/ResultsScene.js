import { createMainButton } from "../ui/Buttons.js";
import { createTitleText, createStatCard } from "../ui/Panels.js";

export class ResultsScene extends Phaser.Scene {
  constructor() {
    super("ResultsScene");
  }

  create() {
    const { width, height } = this.scale;
    const results = this.registry.get("sessionResults") || {
      score: 0,
      highestRound: 1,
      averageAccuracy: 0,
      bestCombo: 0,
      fastestTrace: 0,
      totalMistakes: 0,
      rank: "Bronze Builder",
    };

    this.add.rectangle(width / 2, height / 2, width, height, 0x071120);

    createTitleText(this, width / 2, 100, "SESSION RESULTS", 34);
    createStatCard(this, width / 2, 350, 450, 500, results.rank.toUpperCase());

    const lines = [
      `Final Score: ${results.score}`,
      `Highest Round: ${results.highestRound}`,
      `Average Accuracy: ${Number(results.averageAccuracy || 0).toFixed(1)}%`,
      `Best Combo: ${results.bestCombo}`,
      `Fastest Trace: ${results.fastestTrace ? `${results.fastestTrace.toFixed(2)}s` : "--"}`,
      `Total Mistakes: ${results.totalMistakes}`,
    ];

    lines.forEach((line, index) => {
      this.add.text(width / 2 - 165, 220 + index * 50, line, {
        fontFamily: "Arial",
        fontSize: "25px",
        color: "#f2fbff",
      }).setOrigin(0, 0.5);
    });

    createMainButton(this, width / 2, 820, "PLAY AGAIN", () => {
      this.scene.start("GameScene");
    });

    createMainButton(this, width / 2, 900, "MAIN MENU", () => {
      this.scene.start("MenuScene");
    }, 300, 58, 18);
  }
}
