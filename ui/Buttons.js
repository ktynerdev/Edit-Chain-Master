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
  const container = scene.add.container(x, y);

  const bg = scene.add.image(0, 0, "button-bg").setDisplaySize(width, height);

  const text = scene.add.text(0, 0, label, {
    fontFamily: "Arial Black, Arial",
    fontSize: `${fontSize}px`,
    color: "#ffffff",
  }).setOrigin(0.5);

  const hit = scene.add.rectangle(0, 0, width, height, 0xffffff, 0.001)
    .setInteractive({ useHandCursor: true });

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

  container.add([bg, text, hit]);
  return container;
}
