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
      const worldX = tile.parentContainer ? tile.parentContainer.x + tile.x : tile.x;
      const worldY = tile.parentContainer ? tile.parentContainer.y + tile.y : tile.y;
      const dx = pointer.x - worldX;
      const dy = pointer.y - worldY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const snapRange = 46;

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
