import { createMainButton } from "../ui/Buttons.js";
import { createTitleText, createStatCard } from "../ui/Panels.js";

export class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super("HowToPlayScene");
  }

  create() {
    const { width } = this.scale;

    this.createBackground();

    createTitleText(this, width / 2, 100, "HOW TO PLAY", 34);

    createStatCard(this, width / 2, 320, 450, 420, "RULES");

    const rules = [
      "1. Watch the glowing pattern preview.",
      "2. When the preview ends, drag across the tiles in the same order.",
      "3. Keep your combo alive for bigger scores.",
      "4. Mistakes lower combo and reduce accuracy.",
      "5. Rounds get harder by changing one major factor at a time.",
      "6. Stay fast, but stay clean.",
    ];

    rules.forEach((line, index) => {
      this.add
        .text(width / 2 - 175, 210 + index * 46, line, {
          fontFamily: "Arial",
          fontSize: "24px",
          color: "#ebf8ff",
          wordWrap: { width: 350 },
        })
        .setOrigin(0, 0.5);
    });

    this.add
      .text(width / 2, 670, "Tip: Keep your finger moving steadily. The game is forgiving, but clean paths score better.", {
        fontFamily: "Arial",
        fontSize: "18px",
        color: "#9fdcff",
        align: "center",
        wordWrap: { width: 360 },
      })
      .setOrigin(0.5);

    createMainButton(this, width / 2, 840, "BACK", () => {
      this.scene.start("MenuScene");
    });
  }

  createBackground() {
    const { width, height } = this.scale;
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x081426, 0x10213d, 0x07111f, 0x040a14, 1);
    bg.fillRect(0, 0, width, height);
  }
}
