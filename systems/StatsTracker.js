export class StatsTracker {
  constructor() {
    this.totalCorrectTiles = 0;
    this.totalMistakes = 0;
    this.totalTilesTraced = 0;
    this.roundAccuracies = [];
    this.traceTimes = [];
    this.bestCombo = 0;
  }

  recordCorrectTile() {
    this.totalCorrectTiles += 1;
    this.totalTilesTraced += 1;
  }

  recordMistake() {
    this.totalMistakes += 1;
    this.totalTilesTraced += 1;
  }

  getLiveAccuracy() {
    const total = this.totalCorrectTiles + this.totalMistakes;
    if (total === 0) return 100;
    return (this.totalCorrectTiles / total) * 100;
  }

  finalizeRound(roundAccuracy, traceTime, tilesTraced) {
    this.roundAccuracies.push(roundAccuracy);
    this.traceTimes.push(traceTime);

    if (tilesTraced) {
      this.totalTilesTraced += 0;
    }
  }

  buildSessionResults({ score, round, combo }) {
    const averageAccuracy =
      this.roundAccuracies.length > 0
        ? this.roundAccuracies.reduce((a, b) => a + b, 0) / this.roundAccuracies.length
        : this.getLiveAccuracy();

    const fastestTrace =
      this.traceTimes.length > 0
        ? Math.min(...this.traceTimes)
        : 0;

    const highestRound = round;
    const bestCombo = combo;
    const rank = this.getRank(score, averageAccuracy, highestRound);

    return {
      score,
      highestRound,
      averageAccuracy,
      bestCombo,
      fastestTrace,
      totalMistakes: this.totalMistakes,
      totalTilesTraced: this.totalTilesTraced,
      rank,
    };
  }

  getRank(score, accuracy, round) {
    if (score >= 3500 && accuracy >= 85 && round >= 10) return "Legendary Storm Editor";
    if (score >= 2600 && accuracy >= 80) return "Elite Chain Master";
    if (score >= 1800 && accuracy >= 72) return "Gold Architect";
    if (score >= 1000 && accuracy >= 65) return "Silver Editor";
    return "Bronze Builder";
  }
}
