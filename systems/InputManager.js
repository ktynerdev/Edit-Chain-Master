export class InputManager {
  constructor(scene, config) {
    this.scene = scene;
    this.onTraceStart = config.onTraceStart;
    this.onTileEnter = config.onTileEnter;
    this.onTraceEnd = config.onTraceEnd;
    this.getTiles = config.getTiles;

    this.isTracing = false;
    this.lastTileIndex = null;

    this.pointerDownHandler = this.handlePointerDown.bind(this);
    this.pointerMoveHandler = this.handlePointerMove.bind(this);
    this.pointerUpHandler = this.handlePointerUp.bind(this);

    this.scene.input.on("pointerdown", this.pointerDownHandler);
    this.scene.input.on("pointermove", this.pointerMoveHandler);
    this.scene.input.on("pointerup", this.pointerUpHandler);
    this.scene.input.on("pointerupoutside", this.pointerUpHandler);
  }

  handlePointerDown(pointer) {
    this.isTracing = true;
    this.lastTileIndex = null;

    if (this.onTraceStart) {
      this.onTraceStart(pointer);
    }

    this.checkTile(pointer);
  }

  handlePointerMove(pointer) {
    if (!this.isTracing || !pointer.isDown) return;
    this.checkTile(pointer);
  }

  handlePointerUp(pointer) {
    if (!this.isTracing) return;

    this.isTracing = false;
    this.lastTileIndex = null;

    if (this.onTraceEnd) {
      this.onTraceEnd(pointer);
    }
  }

  checkTile(pointer) {
    const tiles = this.getTiles();
    if (!tiles || tiles.length === 0) return;

    let bestTile = null;
    let bestDistance = Infinity;

    for (const tile of tiles) {
      const parentX = tile.parentContainer ? tile.parentContainer.x : 0;
      const parentY = tile.parentContainer ? tile.parentContainer.y : 0;

      const worldX = parentX + tile.x;
      const worldY = parentY + tile.y;

      const dx = pointer.x - worldX;
      const dy = pointer.y - worldY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const snapRange = Math.max((tile.width || 96) * 0.42, 46);

      if (distance < snapRange && distance < bestDistance) {
        bestDistance = distance;
        bestTile = tile;
      }
    }

    if (!bestTile) return;

    if (this.lastTileIndex === bestTile.index) return;
    this.lastTileIndex = bestTile.index;

    if (this.onTileEnter) {
      this.onTileEnter(bestTile, pointer);
    }
  }

  destroy() {
    this.scene.input.off("pointerdown", this.pointerDownHandler);
    this.scene.input.off("pointermove", this.pointerMoveHandler);
    this.scene.input.off("pointerup", this.pointerUpHandler);
    this.scene.input.off("pointerupoutside", this.pointerUpHandler);
  }
}
