export class DifficultyManager {
  getRoundConfig(round) {
    if (round <= 2) {
      return {
        gridSize: 3,
        patternLength: 4 + round - 1,
        previewTime: 2300,
        traceTime: 6000,
        movingBoard: false,
      };
    }

    if (round <= 4) {
      return {
        gridSize: 3,
        patternLength: 5,
        previewTime: 1900,
        traceTime: 5200,
        movingBoard: false,
      };
    }

    if (round <= 6) {
      return {
        gridSize: 3,
        patternLength: 6 + (round - 5),
        previewTime: 1900,
        traceTime: 5400,
        movingBoard: false,
      };
    }

    if (round <= 8) {
      return {
        gridSize: 3,
        patternLength: 7,
        previewTime: 1700,
        traceTime: 5000,
        movingBoard: false,
      };
    }

    return {
      gridSize: 4,
      patternLength: 7 + (round - 9),
      previewTime: 1650,
      traceTime: 5200,
      movingBoard: round >= 10,
    };
  }
}
