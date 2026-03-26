export class SaveManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.defaultData = {
      bestScore: 0,
      bestRound: 0,
      bestAccuracy: 0,
      longestCombo: 0,
      fastestTrace: 9999,
      sessionsPlayed: 0,
      totalMistakes: 0,
      totalTilesTraced: 0,
    };

    this.data = this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return { ...this.defaultData };
      return { ...this.defaultData, ...JSON.parse(raw) };
    } catch (error) {
      console.error("Failed to load save data", error);
      return { ...this.defaultData };
    }
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  getData() {
    return { ...this.data };
  }

  commitSession(results) {
    this.data.bestScore = Math.max(this.data.bestScore, results.score);
    this.data.bestRound = Math.max(this.data.bestRound, results.highestRound);
    this.data.bestAccuracy = Math.max(this.data.bestAccuracy, results.averageAccuracy);
    this.data.longestCombo = Math.max(this.data.longestCombo, results.bestCombo);
    this.data.fastestTrace = Math.min(this.data.fastestTrace, results.fastestTrace || 9999);
    this.data.sessionsPlayed += 1;
    this.data.totalMistakes += results.totalMistakes;
    this.data.totalTilesTraced += results.totalTilesTraced;

    this.save();
  }

  reset() {
    this.data = { ...this.defaultData };
    this.save();
  }
}
