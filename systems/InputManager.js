export class InputManager {
  constructor(scene, config) {
    this.scene = scene;
    this.onTraceStart = config.onTraceStart;
    this.onTileEnter = config.onTileEnter;
    this.onTraceEnd = config.onTraceEnd;
    this.getTiles = config.getTiles;

    this.isTracing = false;

    this.pointerDownHandler = this.handlePointerDown.bind(this);
    this.pointerMoveHandler = this.handlePointerMove.bind(this);
    this.pointerUpHandler = this.handlePointerUp.bind(this);

    scene.input.on("pointerdown", this.pointerDownHandler);
    scene.input.on("pointermove", this.pointerMoveHandler);
    scene.input.on("pointerup", this.pointerUpHandler);
    scene.input.on("pointerupoutside", this.pointerUpHandler);
  }

  handlePointerDown(pointer) {
    this.isTracing = true;
    if (this.onTraceStart) this.onTraceStart(pointer);
    this.checkTile(pointer);
  }

  handlePointerMove(pointer) {
    if (!this.isTracing || !pointer.isDown) return;
    this.checkTile(pointer);
  }

  handlePointerUp(pointer) {
    if (!this.isTracing) return;
    this.isTracing = false;
    if (this.onTraceEnd) this.onTraceEnd(pointer);
  }

  checkTile(pointer) {
    const tiles = this.getTiles();
    if (!tiles || tiles.length === 0) return;

    let bestTile = null;
    let bestDistance = Infinity;

    tiles.forEach((tile) => {
      const dx = pointer.x - (tile.gridX + (tile.parentContainer?.x || 0));
      const dy = pointer.y - (tile.gridY + (tile.parentContainer?.y || 0));
      const dist = Math.sqrt(dx * dx + dy * dy);

      const radius = tile.width ? tile.width * 0.45 : 42;
      const snapRange = Math.max(radius, 42);

      if (dist < snapRange && dist < bestDistance) {
        bestDistance = dist;
        bestTile = tile;
      }
    });

    if (bestTile && this.onTileEnter) {
      this.onTileEnter(bestTile);
    }
  }

  destroy() {
    this.scene.input.off("pointerdown", this.pointerDownHandler);
    this.scene.input.off("pointermove", this.pointerMoveHandler);
    this.scene.input.off("pointerup", this.pointerUpHandler);
    this.scene.input.off("pointerupoutside", this.pointerUpHandler);
  }
}
