export class PatternManager {
  generatePattern(gridSize, length) {
    const totalTiles = gridSize * gridSize;
    const pattern = [];
    const used = new Set();

    let current = Phaser.Math.Between(0, totalTiles - 1);
    pattern.push(current);
    used.add(current);

    while (pattern.length < length) {
      const neighbors = this.getNeighbors(current, gridSize)
        .filter((n) => !used.has(n));

      let next;
      if (neighbors.length > 0) {
        next = Phaser.Utils.Array.GetRandom(neighbors);
      } else {
        const available = [...Array(totalTiles).keys()].filter((n) => !used.has(n));
        next = Phaser.Utils.Array.GetRandom(available);
      }

      pattern.push(next);
      used.add(next);
      current = next;
    }

    return pattern;
  }

  getNeighbors(index, gridSize) {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const neighbors = [];

    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (r === row && c === col) continue;
        if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) continue;
        neighbors.push(r * gridSize + c);
      }
    }

    return neighbors;
  }
}
