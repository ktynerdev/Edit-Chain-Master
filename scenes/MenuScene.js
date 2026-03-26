export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x10213d);

    this.add.text(width / 2, 160, "EDIT CHAIN MASTER", {
      fontFamily: "Arial",
      fontSize: "34px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(width / 2, 230, "SMOKE TEST", {
      fontFamily: "Arial",
      fontSize: "22px",
      color: "#7dd3fc",
    }).setOrigin(0.5);

    const button = this.add.rectangle(width / 2, 360, 240, 80, 0x2563eb)
      .setStrokeStyle(3, 0x67e8f9)
      .setInteractive();

    const label = this.add.text(width / 2, 360, "TAP ME", {
      fontFamily: "Arial",
      fontSize: "28px",
      color: "#ffffff",
    }).setOrigin(0.5);

    button.on("pointerdown", () => {
      label.setText("WORKING");
      this.add.text(width / 2, 470, "If you see this, Phaser and scenes are working.", {
        fontFamily: "Arial",
        fontSize: "20px",
        color: "#a7f3d0",
        align: "center",
        wordWrap: { width: 360 },
      }).setOrigin(0.5);
    });
  }
}
