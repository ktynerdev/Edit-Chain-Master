export function createTitleText(scene, x, y, text, size = 36) {
  const shadow = scene.add.text(x + 2, y + 4, text, {
    fontFamily: "Arial Black, Arial",
    fontSize: `${size}px`,
    color: "#0d1a31",
  }).setOrigin(0.5);

  const title = scene.add.text(x, y, text, {
    fontFamily: "Arial Black, Arial",
    fontSize: `${size}px`,
    color: "#f8fcff",
    stroke: "#23518f",
    strokeThickness: 8,
  }).setOrigin(0.5);

  scene.tweens.add({
    targets: [shadow, title],
    scaleX: { from: 0.96, to: 1.02 },
    scaleY: { from: 0.96, to: 1.02 },
    duration: 1800,
    yoyo: true,
    repeat: -1,
    ease: "Sine.InOut",
  });

  return title;
}

export function createStatCard(scene, x, y, width, height, title) {
  const container = scene.add.container(x, y);
  const shadow = scene.add.rectangle(4, 8, width, height, 0x000000, 0.28);
  const bg = scene.add.rectangle(0, 0, width, height, 0x08182c, 0.92)
    .setStrokeStyle(3, 0x67e8f9, 0.18);

  const titleText = scene.add.text(-width / 2 + 22, -height / 2 + 24, title, {
    fontFamily: "Arial Black, Arial",
    fontSize: "24px",
    color: "#b8eeff",
  }).setOrigin(0, 0.5);

  container.add([shadow, bg, titleText]);
  return container;
}
