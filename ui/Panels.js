export function createTitleText(scene, x, y, text, size = 36) {
  return scene.add.text(x, y, text, {
    fontFamily: "Arial Black, Arial",
    fontSize: `${size}px`,
    color: "#f8fcff",
    stroke: "#23518f",
    strokeThickness: 8,
  }).setOrigin(0.5);
}

export function createStatCard(scene, x, y, width, height, title) {
  const container = scene.add.container(x, y);

  const bg = scene.add.rectangle(0, 0, width, height, 0x08182c, 0.92)
    .setStrokeStyle(3, 0x67e8f9, 0.18);

  const titleText = scene.add.text(-width / 2 + 22, -height / 2 + 24, title, {
    fontFamily: "Arial Black, Arial",
    fontSize: "24px",
    color: "#b8eeff",
  }).setOrigin(0, 0.5);

  container.add([bg, titleText]);
  return container;
}
