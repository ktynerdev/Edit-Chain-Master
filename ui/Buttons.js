export function createMainButton(
  scene,
  x,
  y,
  label,
  onClick,
  width = 340,
  height = 72,
  fontSize = 24
) {
  const container = scene.add.container(x, y).setDepth(25);

  const bg = scene.add.image(0, 0, "button-bg").setDisplaySize(width, height);
  const glow = scene.add.rectangle(0, 0, width + 8, height + 8, 0x67e8f9, 0.06)
    .setStrokeStyle(2, 0x67e8f9, 0.12);

  const text = scene.add.text(0, 0, label, {
    fontFamily: "Arial Black, Arial",
    fontSize: `${fontSize}px`,
    color: "#f9fdff",
    stroke: "#183563",
    strokeThickness: 6,
  }).setOrigin(0.5);

  container.add([glow, bg, text]);
  container.setSize(width, height);

  const hit = scene.add.rectangle(0, 0, width, height, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
  container.add(hit);

  hit.on("pointerdown", () => {
    scene.tweens.add({
      targets: container,
      scaleX: 0.97,
      scaleY: 0.97,
      duration: 70,
      yoyo: true,
      onComplete: () => {
        if (onClick) onClick();
      },
    });
  });

  hit.on("pointerover", () => {
    scene.tweens.add({
      targets: glow,
      alpha: 0.14,
      duration: 120,
    });
  });

  hit.on("pointerout", () => {
    scene.tweens.add({
      targets: glow,
      alpha: 0.06,
      duration: 120,
    });
  });

  return container;
}
