export class ScoreManager {
  constructor() {
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
  }

  registerSuccess(round, traceTime, patternLength, perfect) {
    this.combo += 1;
    this.maxCombo = Math.max(this.maxCombo, this.combo);

    const roundBonus = 100 + round * 25;
    const tileBonus = patternLength * 30;
    const speedBonus = Math.max(0, Math.floor(250 - traceTime * 25));
    const perfectBonus = perfect ? 150 : 40;
    const comboBonus = this.combo * 35;

    this.score += roundBonus + tileBonus + speedBonus + perfectBonus + comboBonus;
  }

  breakCombo() {
    this.combo = 0;
  }
}
