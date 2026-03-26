export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x0b1730);

    this.add.text(width / 2, 150, "EDIT CHAIN MASTER", {
      fontFamily: "Arial",
      fontSize: "32px",
      color: "#ffffff",
    }).setOrigin(0.5);

    this.add.text(width / 2, 230, "If you can see this, BootScene and MenuScene are working.", {
      fontFamily: "Arial",
      fontSize: "18px",
      color: "#aee8ff",
      align: "center",
      wordWrap: { width: 380 }
    }).setOrigin(0.5);

    const btn = this.add.rectangle(width / 2, 360, 220, 70, 0x2563eb)
      .setStrokeStyle(2, 0x67e8f9)
      .setInteractive();

    this.add.text(width / 2, 360, "TEST BUTTON", {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
    }).setOrigin(0.5);

    btn.on("pointerdown", () => {
      this.add.text(width / 2, 460, "Button works", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#7fffd4",
      }).setOrigin(0.5);
    });
  }
}
