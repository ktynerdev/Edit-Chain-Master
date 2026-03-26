import { createMainButton } from "../ui/Buttons.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x05101d);

    this.add.text(width / 2, 120, "GAME SCENE TEST", {
      fontFamily: "Arial Black, Arial",
      fontSize: "34px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(width / 2, 180, "If you can see this, menu navigation is working.", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#a7eaff",
      align: "center",
      wordWrap: { width: 360 }
    }).setOrigin(0.5);

    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = width / 2 - 110 + col * 110;
      const y = 360 + row * 110;

      this.add.rectangle(x, y, 88, 88, 0x17345c)
        .setStrokeStyle(3, 0x67e8f9, 0.4);

      this.add.text(x, y, `${i + 1}`, {
        fontFamily: "Arial Black, Arial",
        fontSize: "28px",
        color: "#e6f6ff",
      }).setOrigin(0.5);
    }

    createMainButton(this, width / 2, 820, "SHOW RESULTS", () => {
      this.registry.set("sessionResults", {
        score: 1200,
        highestRound: 4,
        averageAccuracy: 88.6,
        bestCombo: 3,
        fastestTrace: 2.41,
        totalMistakes: 2,
        rank: "Silver Editor",
      });
      this.scene.start("ResultsScene");
    });

    createMainButton(this, width / 2, 900, "MAIN MENU", () => {
      this.scene.start("MenuScene");
    }, 300, 58, 18);
  }
}
