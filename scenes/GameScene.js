import { DifficultyManager } from "../systems/DifficultyManager.js";
import { PatternManager } from "../systems/PatternManager.js";
import { InputManager } from "../systems/InputManager.js";
import { ScoreManager } from "../systems/ScoreManager.js";
import { StatsTracker } from "../systems/StatsTracker.js";
import { HUD } from "../ui/HUD.js";
import { createMainButton } from "../ui/Buttons.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.round = 1;
    this.maxRounds = 10;
    this.sessionEnded = false;
    this.currentRoundState = "intro";
    this.previewActive = false;
    this.roundFailed = false;
    this.traceStartTime = 0;
    this.gridTiles = [];
    this.pathGraphics = this.add.graphics();

    this.createBackground();

    this.difficultyManager = new DifficultyManager();
    this.patternManager = new PatternManager();
    this.scoreManager = new ScoreManager();
    this.statsTracker = new StatsTracker();
    this.hud = new HUD(this);

    this.createTopLayer();
    this.startRound();
  }

  createBackground() {
    const { width, height } = this.scale;
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x05101d, 0x0d1a32, 0x071120, 0x040a14, 1);
    bg.fillRect(0, 0, width, height);

    this.energyGlow = this.add.circle(width / 2, 210, 180, 0x60a5fa, 0.08);
    this.stormGlow = this.add.circle(width / 2, 180, 260, 0xa78bfa, 0.05);

    this.tweens.add({
      targets: [this.energyGlow, this.stormGlow],
      alpha: { from: 0.05, to: 0.12 },
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });

    for (let i = 0; i < 28; i++) {
      const line = this.add.rectangle(
        Phaser.Math.Between(0, width),
        Phaser.Math.Between(120, height - 160),
        Phaser.Math.Between(50, 180),
        2,
        0x67e8f9,
        Phaser.Math.FloatBetween(0.03, 0.10)
      );
      line.angle = Phaser.Math.Between(-50, 50);
    }
  }

  createTopLayer() {
    const { width, height } = this.scale;

    this.roundBanner = this.add.container(width / 2, 180).setDepth(20);
    const bannerBg = this.add.image(0, 0, "panel-card").setDisplaySize(380, 120).setAlpha(0.95);
    const bannerTitle = this.add.text(0, -14, "ROUND 1", {
      fontFamily: "Arial Black, Arial",
      fontSize: "34px",
      color: "#f8fbff",
      stroke: "#1b3d73",
      strokeThickness: 6,
    }).setOrigin(0.5);
    const bannerSub = this.add.text(0, 28, "Watch the pattern", {
      fontFamily: "Arial",
      fontSize: "20px",
      color: "#a7eaff",
    }).setOrigin(0.5);

    this.roundBanner.add([bannerBg, bannerTitle, bannerSub]);
    this.roundBanner.titleText = bannerTitle;
    this.roundBanner.subText = bannerSub;
    this.roundBanner.setVisible(false);

    this.pauseBtn = createMainButton(this, width / 2, height - 54, "QUIT RUN", () => {
      this.endSession();
    }, 260, 58, 20);
    this.pauseBtn.setAlpha(0.92);
  }

  startRound() {
    this.pathGraphics.clear();
    this.clearGrid();

    const roundConfig = this.difficultyManager.getRoundConfig(this.round);
    this.currentRoundConfig = roundConfig;
    this.currentPattern = this.patternManager.generatePattern(roundConfig.gridSize, roundConfig.patternLength);
    this.playerPath = [];
    this.visitedSet = new Set();
    this.wrongSelections = 0;
    this.roundFailed = false;
    this.previewActive = true;
    this.currentRoundState = "preview";

    this.hud.update({
      round: this.round,
      score: this.scoreManager.score,
      combo: this.scoreManager.combo,
      accuracy: this.statsTracker.getLiveAccuracy(),
      pressure: 100,
      objective: "Watch the pattern",
    });

    this.buildGrid(roundConfig.gridSize);
    this.showRoundBanner(`ROUND ${this.round}`, `Grid ${roundConfig.gridSize}x${roundConfig.gridSize} • Pattern ${roundConfig.patternLength}`);

    this.time.delayedCall(850, () => {
      this.playPatternPreview();
    });
  }

  buildGrid(gridSize) {
    const { width } = this.scale;
    const boardSize = gridSize === 3 ? 330 : 380;
    const tileGap = 12;
    const tileSize = (boardSize - tileGap * (gridSize - 1)) / gridSize;
    const startX = width / 2 - boardSize / 2 + tileSize / 2;
    const startY = 335;

    this.boardContainer = this.add.container(0, 0).setDepth(5);

    const shadow = this.add.rectangle(width / 2 + 6, startY + boardSize / 2 + 6, boardSize + 36, boardSize + 36, 0x000000, 0.28);
    const boardFrame = this.add.rectangle(width / 2, startY + boardSize / 2, boardSize + 36, boardSize + 36, 0x08182c, 0.96)
      .setStrokeStyle(4, 0x67e8f9, 0.22);

    this.boardContainer.add([shadow, boardFrame]);

    this.gridTiles = [];

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col;
        const x = startX + col * (tileSize + tileGap);
        const y = startY + row * (tileSize + tileGap);

        const tile = this.add.container(x, y);
        tile.setSize(tileSize, tileSize);

        const bg = this.add.image(0, 0, "tile-bg")
          .setDisplaySize(tileSize, tileSize)
          .setAlpha(0.95);

        const gloss = this.add.rectangle(0, -tileSize * 0.2, tileSize * 0.7, tileSize * 0.18, 0xffffff, 0.10);
        const indexText = this.add.text(0, 0, `${index + 1}`, {
          fontFamily: "Arial Black, Arial",
          fontSize: `${Math.floor(tileSize * 0.22)}px`,
          color: "#dff7ff",
        }).setOrigin(0.5).setAlpha(0.32);

        tile.add([bg, gloss, indexText]);

        tile.bg = bg;
        tile.index = index;
        tile.gridX = x;
        tile.gridY = y;
        tile.isHighlighted = false;
        tile.isPlayerSelected = false;
        tile.setDepth(6);

        this.gridTiles.push(tile);
        this.boardContainer.add(tile);
      }
    }

    if (this.currentRoundConfig.movingBoard) {
      this.tweens.add({
        targets: this.boardContainer,
        x: 10,
        duration: 1600,
        yoyo: true,
        repeat: -1,
        ease: "Sine.InOut",
      });
    }

    if (this.inputManager) {
      this.inputManager.destroy();
    }

    this.inputManager = new InputManager(this, {
      onTraceStart: this.handleTraceStart.bind(this),
      onTileEnter: this.handleTileEnter.bind(this),
      onTraceEnd: this.handleTraceEnd.bind(this),
      getTiles: () => this.gridTiles,
    });
  }

  playPatternPreview() {
    this.showRoundBanner(`ROUND ${this.round}`, "Watch the pattern");
    const previewSteps = this.currentPattern.map((tileIndex, i) => ({
      delay: i * 420,
      tileIndex,
    }));

    previewSteps.forEach((step) => {
      this.time.delayedCall(step.delay, () => {
        const tile = this.gridTiles[step.tileIndex];
        if (!tile) return;
        this.highlightTile(tile, 0x67e8f9, 0.95, 1.08);
        this.time.delayedCall(250, () => {
          if (this.previewActive) {
            this.resetTileVisual(tile);
          }
        });
      });
    });

    const totalPreviewDuration = this.currentRoundConfig.previewTime;
    this.time.delayedCall(totalPreviewDuration, () => {
      this.previewActive = false;
      this.currentRoundState = "trace";
      this.traceStartTime = this.time.now;
      this.showRoundBanner(`ROUND ${this.round}`, "Trace the pattern");
      this.hud.setObjective("Drag through the tiles in order");
      this.roundEndAt = this.time.now + this.currentRoundConfig.traceTime;
    });
  }

  handleTraceStart() {
    if (this.currentRoundState !== "trace" || this.roundFailed) return;
    this.pathGraphics.clear();
  }

  handleTileEnter(tile) {
    if (this.currentRoundState !== "trace" || this.roundFailed || this.previewActive) return;
    if (this.visitedSet.has(tile.index)) return;

    this.visitedSet.add(tile.index);
    this.playerPath.push(tile.index);
    tile.isPlayerSelected = true;

    const expectedIndex = this.currentPattern[this.playerPath.length - 1];
    const isCorrect = tile.index === expectedIndex;

    if (isCorrect) {
      this.highlightTile(tile, 0xa7f3d0, 1, 1.06);
      this.drawPathToTile(tile);
      this.statsTracker.recordCorrectTile();
    } else {
      this.wrongSelections += 1;
      this.statsTracker.recordMistake();
      this.highlightTile(tile, 0xfb7185, 1, 1.03);
      this.cameras.main.shake(90, 0.0025);
      this.scoreManager.breakCombo();
      this.hud.flashWarning();
    }

    this.hud.update({
      round: this.round,
      score: this.scoreManager.score,
      combo: this.scoreManager.combo,
      accuracy: this.statsTracker.getLiveAccuracy(),
      pressure: this.getPressurePercent(),
      objective: "Trace the pattern",
    });

    if (this.playerPath.length >= this.currentPattern.length) {
      this.completeRound();
    }
  }

  drawPathToTile(tile) {
    const p = this.playerPath;
    if (p.length === 1) {
      this.pathGraphics.clear();
      this.pathGraphics.lineStyle(10, 0x67e8f9, 0.72);
      this.pathGraphics.beginPath();
      this.pathGraphics.moveTo(tile.gridX + this.boardContainer.x, tile.gridY + this.boardContainer.y);
      this.pathGraphics.strokePath();
      return;
    }

    const prevTile = this.gridTiles[p[p.length - 2]];
    this.pathGraphics.lineStyle(10, 0x67e8f9, 0.72);
    this.pathGraphics.beginPath();
    this.pathGraphics.moveTo(prevTile.gridX + this.boardContainer.x, prevTile.gridY + this.boardContainer.y);
    this.pathGraphics.lineTo(tile.gridX + this.boardContainer.x, tile.gridY + this.boardContainer.y);
    this.pathGraphics.strokePath();
  }

  handleTraceEnd() {
    if (this.currentRoundState !== "trace" || this.roundFailed) return;
  }

  completeRound() {
    this.currentRoundState = "resolve";

    const traceTime = (this.time.now - this.traceStartTime) / 1000;
    const orderPerfect = this.currentPattern.every((value, index) => value === this.playerPath[index]);
    const roundAccuracy = Math.max(
      0,
      (this.currentPattern.length - this.wrongSelections) / this.currentPattern.length
    ) * 100;

    this.statsTracker.finalizeRound(roundAccuracy, traceTime, this.currentPattern.length, this.wrongSelections);

    if (orderPerfect && this.wrongSelections === 0) {
      this.scoreManager.registerSuccess(this.round, traceTime, this.currentPattern.length, true);
      this.flashBoardSuccess();
    } else if (orderPerfect) {
      this.scoreManager.registerSuccess(this.round, traceTime, this.currentPattern.length, false);
    } else {
      this.scoreManager.breakCombo();
      this.roundFailed = true;
    }

    this.hud.update({
      round: this.round,
      score: this.scoreManager.score,
      combo: this.scoreManager.combo,
      accuracy: this.statsTracker.getLiveAccuracy(),
      pressure: 0,
      objective: orderPerfect ? "Pattern complete" : "Pattern failed",
    });

    this.showRoundSummary(orderPerfect, traceTime, roundAccuracy);
  }

  showRoundSummary(success, traceTime, accuracy) {
    const { width, height } = this.scale;
    const overlay = this.add.container(width / 2, height / 2).setDepth(30);

    const dim = this.add.rectangle(0, 0, width, height, 0x000000, 0.46);
    const panel = this.add.image(0, 0, "panel-card").setDisplaySize(430, 340);
    const title = this.add.text(0, -116, success ? "ROUND CLEAR" : "ROUND FAILED", {
      fontFamily: "Arial Black, Arial",
      fontSize: "30px",
      color: success ? "#d1fae5" : "#ffe4ea",
      stroke: "#11203a",
      strokeThickness: 6,
    }).setOrigin(0.5);

    const lines = [
      `Round: ${this.round}`,
      `Accuracy: ${accuracy.toFixed(1)}%`,
      `Trace Time: ${traceTime.toFixed(2)}s`,
      `Score: ${this.scoreManager.score}`,
      `Combo: ${this.scoreManager.combo}`,
      `Mistakes: ${this.wrongSelections}`,
    ];

    overlay.add([dim, panel, title]);

    lines.forEach((line, i) => {
      const t = this.add.text(-150, -50 + i * 36, line, {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#f3fbff",
      }).setOrigin(0, 0.5);
      overlay.add(t);
    });

    const nextLabel = this.round >= this.maxRounds ? "FINISH" : "NEXT ROUND";
    const nextBtn = createMainButton(this, 0, 110, nextLabel, () => {
      overlay.destroy();
      this.advanceRound();
    }, 240, 62, 20);
    overlay.add(nextBtn);

    this.roundSummaryOverlay = overlay;
  }

  advanceRound() {
    if (this.round >= this.maxRounds) {
      this.endSession();
      return;
    }

    this.round += 1;
    this.startRound();
  }

  endSession() {
    if (this.sessionEnded) return;
    this.sessionEnded = true;

    const results = this.statsTracker.buildSessionResults({
      score: this.scoreManager.score,
      round: this.round,
      combo: this.scoreManager.maxCombo,
    });

    const saveManager = this.registry.get("saveManager");
    saveManager.commitSession(results);

    this.registry.set("sessionResults", results);
    this.scene.start("ResultsScene");
  }

  flashBoardSuccess() {
    this.gridTiles.forEach((tile, index) => {
      this.time.delayedCall(index * 60, () => {
        this.highlightTile(tile, 0x67e8f9, 1, 1.1);
        this.time.delayedCall(120, () => this.resetTileVisual(tile));
      });
    });
  }

  highlightTile(tile, color, alpha = 1, scale = 1.04) {
    tile.bg.setTint(color);
    tile.bg.setAlpha(alpha);
    this.tweens.killTweensOf(tile);
    this.tweens.add({
      targets: tile,
      scaleX: scale,
      scaleY: scale,
      duration: 110,
      yoyo: true,
      ease: "Sine.Out",
    });
  }

  resetTileVisual(tile) {
    tile.bg.clearTint();
    tile.bg.setAlpha(0.95);
  }

  clearGrid() {
    if (this.boardContainer) {
      this.boardContainer.destroy();
      this.boardContainer = null;
    }
  }

  getPressurePercent() {
    if (!this.roundEndAt || this.currentRoundState !== "trace") return 100;
    const remaining = Math.max(0, this.roundEndAt - this.time.now);
    return Phaser.Math.Clamp((remaining / this.currentRoundConfig.traceTime) * 100, 0, 100);
  }

  update() {
    if (this.currentRoundState === "trace" && !this.roundFailed) {
      const pressure = this.getPressurePercent();

      this.hud.update({
        round: this.round,
        score: this.scoreManager.score,
        combo: this.scoreManager.combo,
        accuracy: this.statsTracker.getLiveAccuracy(),
        pressure,
        objective: "Trace the pattern",
      });

      if (pressure <= 0) {
        this.roundFailed = true;
        this.scoreManager.breakCombo();
        const traceTime = (this.time.now - this.traceStartTime) / 1000;
        const roundAccuracy = this.statsTracker.getLiveAccuracy();
        this.statsTracker.finalizeRound(roundAccuracy, traceTime, this.playerPath.length, this.wrongSelections);
        this.showRoundSummary(false, traceTime, roundAccuracy);
        this.currentRoundState = "resolve";
      }
    }
  }
}
