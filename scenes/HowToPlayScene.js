import { createMainButton } from "../ui/Buttons.js";
import { createTitleText, createStatCard } from "../ui/Panels.js";

export class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super("HowToPlayScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x081426);

    createTitleText(this, width / 2, 100, "HOW TO PLAY", 34);
    createStatCard(this, width / 2, 320, 450, 420, "RULES");

    const rules = [
      "1. Watch the glowing pattern preview.",
      "2. Drag across the tiles in the same order.",
      "3. Keep your combo alive for bigger scores.",
      "4. Mistakes lower combo and accuracy.",
      "5. Rounds get harder gradually.",
    ];

    rules.forEach((line, index) => {
      this.add.text(width / 2 - 175, 220 + index * 52, line, {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#ebf8ff",
        wordWrap: { width: 350 },
      }).setOrigin(0, 0.5);
    });

    createMainButton(this, width / 2, 840, "BACK", () => {
      this.scene.start("MenuScene");
    });
  }
}
