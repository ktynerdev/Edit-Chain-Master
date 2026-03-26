export class HUD {
  constructor(scene) {
    this.scene = scene;
    this.build();
  }

  build() {
    const { width } = this.scene.scale;

    this.container = this.scene.add.container(0, 0).setDepth(15);

    this.topBar = this.scene.add.rectangle(width / 2, 54, width - 28, 92, 0x08182c, 0.88)
      .setStrokeStyle(2, 0x67e8f9, 0.18);

    this.roundText = this.makeLabel(34, 34, "ROUND 1");
    this.scoreText = this.makeLabel(34, 68, "SCORE 0");
    this.comboText = this.makeLabel(width / 2 - 48, 34, "COMBO 0");
    this.accuracyText = this.makeLabel(width / 2 - 48, 68, "ACC 100%");
    this.objectiveText = this.makeLabel(width - 206, 34, "Watch the pattern");
    this.objectiveText.setFontSize(18);
    this.pressureLabel = this.makeLabel(width - 206, 68, "PRESSURE");
    this.pressureLabel.setFontSize(16);

    this.pressureBg = this.scene.add.rectangle(width - 80, 68, 110, 14, 0x1f2b3d, 0.95).setOrigin(0.5);
    this.pressureFill = this.scene.add.rectangle(width - 80 - 55, 68, 110, 14, 0x67e8f9, 0.95).setOrigin(0, 0.5);

    this.container.add([
      this.topBar,
      this.roundText,
      this.scoreText,
      this.comboText,
      this.accuracyText,
      this.objectiveText,
      this.pressureLabel,
      this.pressureBg,
      this.pressureFill,
    ]);
  }

  makeLabel(x, y, text) {
    return this.scene.add.text(x, y, text, {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#e8f8ff",
    }).setOrigin(0, 0.5);
  }

  update({ round, score, combo, accuracy, pressure, objective }) {
    if (round !== undefined) this.roundText.setText(`ROUND ${round}`);
    if (score !== undefined) this.scoreText.setText(`SCORE ${score}`);
    if (combo !== undefined) this.comboText.setText(`COMBO ${combo}`);
    if (accuracy !== undefined) this.accuracyText.setText(`ACC ${accuracy.toFixed(1)}%`);
    if (objective !== undefined) this.objectiveText.setText(objective);
    if (pressure !== undefined) {
      const width = Phaser.Math.Clamp((pressure / 100) * 110, 0, 110);
      this.pressureFill.width = width;
      this.pressureFill.fillColor =
        pressure > 60 ? 0x67e8f9 : pressure > 30 ? 0xfbbf24 : 0xfb7185;
    }
  }

  setObjective(text) {
    this.objectiveText.setText(text);
  }

  flashWarning() {
    this.scene.tweens.add({
      targets: this.topBar,
      alpha: 0.55,
      duration: 90,
      yoyo: true,
      repeat: 1,
    });
  }
}
