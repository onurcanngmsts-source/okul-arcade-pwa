(function () {
  "use strict";

  const N = 8;

  const THEMES = [
    {
      name: "gece",
      bgTop: "#1e293b",
      bgBottom: "#0f172a",
      boardFill: "rgba(15,23,42,0.92)",
      boardStroke: "rgba(99,102,241,0.45)",
      emptyCell: "rgba(30,41,59,0.72)",
      trayBg: "rgba(15,23,42,0.58)",
      slotStroke: "rgba(148,163,184,0.28)",
      accent: "#6366f1",
      headerBg: "rgba(30,41,59,0.96)",
      pieceColors: ["#f472b6", "#60a5fa", "#4ade80", "#fbbf24", "#c084fc", "#fb923c", "#38bdf8"],
    },
    {
      name: "orman",
      bgTop: "#14532d",
      bgBottom: "#052e16",
      boardFill: "rgba(5,46,22,0.92)",
      boardStroke: "rgba(74,222,128,0.4)",
      emptyCell: "rgba(20,83,45,0.65)",
      trayBg: "rgba(5,46,22,0.55)",
      slotStroke: "rgba(134,239,172,0.3)",
      accent: "#22c55e",
      headerBg: "rgba(20,83,45,0.96)",
      pieceColors: ["#86efac", "#4ade80", "#fbbf24", "#fcd34d", "#a7f3d0", "#34d399", "#bef264"],
    },
    {
      name: "gün batımı",
      bgTop: "#9a3412",
      bgBottom: "#431407",
      boardFill: "rgba(67,20,7,0.9)",
      boardStroke: "rgba(251,146,60,0.45)",
      emptyCell: "rgba(124,45,18,0.6)",
      trayBg: "rgba(67,20,7,0.55)",
      slotStroke: "rgba(253,186,116,0.35)",
      accent: "#fb923c",
      headerBg: "rgba(124,45,18,0.96)",
      pieceColors: ["#fb7185", "#fdba74", "#fcd34d", "#f472b6", "#fb923c", "#f97316", "#fecdd3"],
    },
    {
      name: "okyanus",
      bgTop: "#164e63",
      bgBottom: "#0c4a6e",
      boardFill: "rgba(12,74,110,0.9)",
      boardStroke: "rgba(56,189,248,0.45)",
      emptyCell: "rgba(21,94,117,0.65)",
      trayBg: "rgba(8,47,73,0.55)",
      slotStroke: "rgba(125,211,252,0.3)",
      accent: "#0ea5e9",
      headerBg: "rgba(21,94,117,0.96)",
      pieceColors: ["#38bdf8", "#22d3ee", "#a5f3fc", "#67e8f9", "#7dd3fc", "#818cf8", "#c4b5fd"],
    },
    {
      name: "mor gece",
      bgTop: "#4c1d95",
      bgBottom: "#1e1b4b",
      boardFill: "rgba(30,27,75,0.92)",
      boardStroke: "rgba(196,181,253,0.4)",
      emptyCell: "rgba(76,29,149,0.55)",
      trayBg: "rgba(30,27,75,0.55)",
      slotStroke: "rgba(196,181,253,0.25)",
      accent: "#a78bfa",
      headerBg: "rgba(49,46,129,0.96)",
      pieceColors: ["#e879f9", "#c084fc", "#a78bfa", "#818cf8", "#f0abfc", "#ddd6fe", "#f472b6"],
    },
    {
      name: "neon",
      bgTop: "#042f2e",
      bgBottom: "#022c22",
      boardFill: "rgba(2,44,34,0.92)",
      boardStroke: "rgba(45,212,191,0.5)",
      emptyCell: "rgba(15,118,110,0.45)",
      trayBg: "rgba(2,44,34,0.55)",
      slotStroke: "rgba(94,234,212,0.35)",
      accent: "#2dd4bf",
      headerBg: "rgba(15,118,110,0.92)",
      pieceColors: ["#2dd4bf", "#34d399", "#a3e635", "#facc15", "#fb7185", "#38bdf8", "#c084fc"],
    },
    {
      name: "kiraz",
      bgTop: "#831843",
      bgBottom: "#500724",
      boardFill: "rgba(80,7,36,0.9)",
      boardStroke: "rgba(251,113,133,0.45)",
      emptyCell: "rgba(136,19,55,0.55)",
      trayBg: "rgba(80,7,36,0.55)",
      slotStroke: "rgba(254,205,211,0.3)",
      accent: "#fb7185",
      headerBg: "rgba(136,19,55,0.96)",
      pieceColors: ["#fb7185", "#fda4af", "#f472b6", "#fbbf24", "#fbcfe8", "#fb923c", "#fecdd3"],
    },
  ];

  let themeIndex = 0;

  const RAW = [
    [[0, 0]],
    [[0, 0], [1, 0]],
    [[0, 0], [0, 1]],
    [[0, 0], [0, 1], [0, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 0], [1, 0], [1, 1]],
    [[0, 1], [1, 0], [1, 1]],
    [[1, 0], [0, 1], [1, 1]],
    [[0, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [2, 0], [1, 1]],
    [[0, 0], [0, 1], [0, 2], [1, 1]],
    [[0, 0], [0, 1], [1, 0], [2, 0]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 0], [0, 1], [1, 1], [1, 2]],
    [[0, 1], [0, 2], [1, 0], [1, 1]],
    [[0, 0], [1, 0], [2, 0], [3, 0]],
    [[0, 0], [0, 1], [0, 2], [0, 3]],
    [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1]],
  ];

  function normCells(cells) {
    const mr = Math.min(...cells.map((c) => c[0]));
    const mc = Math.min(...cells.map((c) => c[1]));
    return cells.map(([r, c]) => [r - mr, c - mc]);
  }

  const SHAPE_CELLS = RAW.map(normCells);

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const elScore = document.getElementById("score");
  const elBest = document.getElementById("best");
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayText = document.getElementById("overlay-text");
  const btnStart = document.getElementById("btn-start");
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const elLevelNum = document.getElementById("level-num");
  const elLevelFill = document.getElementById("level-fill");
  const elLevelTarget = document.getElementById("level-target");
  const elToast = document.getElementById("toast");

  const BEST_KEY = "blokpatlat-best";
  const BEST_LEVEL_KEY = "blokpatlat-best-level";
  let best = Number(localStorage.getItem(BEST_KEY)) || 0;
  let bestLevel = Number(localStorage.getItem(BEST_LEVEL_KEY)) || 0;
  elBest.textContent = String(best);

  let dpr = 1;
  let cssW = 300;
  let cssH = 500;

  let board = [];
  let tray = [null, null, null];
  let score = 0;
  let running = false;
  let level = 1;
  let levelProgress = 0;

  let cell = 36;
  let bx = 0;
  let by = 0;
  let trayY = 0;
  let trayH = 100;
  let slotW = 100;
  let trayCell = 18;

  const particles = [];
  let lastAnimT = performance.now();
  let effectShakeUntil = 0;
  let flashAlpha = 0;
  let clearPulse = 0;

  const drag = {
    active: false,
    slot: -1,
    cells: null,
    color: null,
    grabR: 0,
    grabC: 0,
    px: 0,
    py: 0,
  };

  function theme() {
    return THEMES[themeIndex % THEMES.length];
  }

  function applyThemeToDom() {
    const t = theme();
    document.documentElement.style.setProperty("--page-bg", t.bgBottom);
    document.documentElement.style.setProperty("--header-bg", t.headerBg);
    document.documentElement.style.setProperty("--header-border", t.accent + "66");
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--hint-color", t.accent === "#6366f1" ? "#94a3b8" : "rgba(255,255,255,0.65)");
    if (metaTheme) metaTheme.setAttribute("content", t.accent);
  }

  function pointsForThisLevel(lv) {
    const base = 200 + (lv - 1) * 85;
    const bonus = Math.floor((lv - 1) / 3) * 70;
    return Math.min(1600, base + bonus);
  }

  function updateLevelBar() {
    if (!elLevelNum || !elLevelFill || !elLevelTarget) return;
    const goal = pointsForThisLevel(level);
    elLevelNum.textContent = String(level);
    const pct = goal > 0 ? Math.min(100, (levelProgress / goal) * 100) : 0;
    elLevelFill.style.width = pct + "%";
    elLevelTarget.textContent = Math.min(goal, Math.floor(levelProgress)) + " / " + goal;
  }

  let toastTimer = null;
  let toastHideTimer = null;
  function showLevelToast(newLevel) {
    if (!elToast) return;
    clearTimeout(toastTimer);
    clearTimeout(toastHideTimer);
    elToast.textContent = "Seviye " + newLevel + "!";
    elToast.removeAttribute("hidden");
    requestAnimationFrame(() => elToast.classList.add("show"));
    toastTimer = setTimeout(() => {
      elToast.classList.remove("show");
      toastHideTimer = setTimeout(() => {
        elToast.setAttribute("hidden", "");
      }, 380);
    }, 1600);
  }

  function spawnLevelUpBurst() {
    const cx = bx + (N * cell) / 2;
    const cy = by + (N * cell) / 2;
    const pal = theme().pieceColors;
    for (let i = 0; i < 52; i++) {
      const ang = (Math.PI * 2 * i) / 52 + Math.random() * 0.25;
      const sp = 130 + Math.random() * 200;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 90,
        life: 1.05,
        color: pal[i % pal.length],
        r: 3 + Math.random() * 5,
        spin: (Math.random() - 0.5) * 12,
      });
    }
    for (let j = 0; j < 16; j++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = 80 + Math.random() * 140;
      particles.push({
        x: cx + (Math.random() - 0.5) * cell * 2,
        y: cy + (Math.random() - 0.5) * cell * 2,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 40,
        life: 0.9,
        color: "#ffffff",
        r: 2 + Math.random() * 3,
        spin: 0,
      });
    }
    effectShakeUntil = performance.now() + 400;
    flashAlpha = Math.max(flashAlpha, 0.26);
    clearPulse = 1;
  }

  function processLevelProgress(gained) {
    if (gained <= 0) return;
    levelProgress += gained;
    let guard = 0;
    let jumped = false;
    while (levelProgress >= pointsForThisLevel(level) && guard++ < 80) {
      levelProgress -= pointsForThisLevel(level);
      level++;
      jumped = true;
    }
    if (jumped) {
      spawnLevelUpBurst();
      showLevelToast(level);
      try {
        navigator.vibrate([18, 45, 22, 45, 28]);
      } catch (_) {}
    }
    updateLevelBar();
  }

  function emptyBoard() {
    board = [];
    for (let r = 0; r < N; r++) {
      board[r] = [];
      for (let c = 0; c < N; c++) board[r][c] = null;
    }
  }

  function randomPiece() {
    const cells = SHAPE_CELLS[(Math.random() * SHAPE_CELLS.length) | 0];
    const palette = theme().pieceColors;
    const color = palette[(Math.random() * palette.length) | 0];
    return { cells: cells.map((x) => x.slice()), color };
  }

  function canPlace(piece, ar, ac) {
    if (!piece) return false;
    for (const [dr, dc] of piece.cells) {
      const r = ar + dr;
      const c = ac + dc;
      if (r < 0 || r >= N || c < 0 || c >= N) return false;
      if (board[r][c]) return false;
    }
    return true;
  }

  function hasAnyMove() {
    for (let s = 0; s < 3; s++) {
      const p = tray[s];
      if (!p) continue;
      for (let ar = 0; ar < N; ar++) {
        for (let ac = 0; ac < N; ac++) {
          if (canPlace(p, ar, ac)) return true;
        }
      }
    }
    return false;
  }

  function refillTray() {
    for (let t = 0; t < 30; t++) {
      tray[0] = randomPiece();
      tray[1] = randomPiece();
      tray[2] = randomPiece();
      if (hasAnyMove()) return;
    }
    endGame();
  }

  function clearLines() {
    const rows = [];
    const cols = [];
    for (let r = 0; r < N; r++) {
      if (board[r].every(Boolean)) rows.push(r);
    }
    for (let c = 0; c < N; c++) {
      let full = true;
      for (let r = 0; r < N; r++) {
        if (!board[r][c]) {
          full = false;
          break;
        }
      }
      if (full) cols.push(c);
    }
    if (!rows.length && !cols.length) return { points: 0, cleared: [] };

    const seen = new Set();
    const cleared = [];
    for (const r of rows) {
      for (let c = 0; c < N; c++) {
        const k = r + "," + c;
        if (!seen.has(k)) {
          seen.add(k);
          cleared.push({ r, c, color: board[r][c] });
        }
      }
    }
    for (const c of cols) {
      for (let r = 0; r < N; r++) {
        const k = r + "," + c;
        if (!seen.has(k)) {
          seen.add(k);
          cleared.push({ r, c, color: board[r][c] });
        }
      }
    }
    for (const tile of cleared) {
      board[tile.r][tile.c] = null;
    }
    let pts = rows.length * 80 + cols.length * 80;
    if (rows.length + cols.length > 1) pts += 40;
    return { points: pts, cleared };
  }

  function spawnBurst(cleared) {
    const cs = cell;
    for (const tile of cleared) {
      const cx = bx + tile.c * cs + cs / 2;
      const cy = by + tile.r * cs + cs / 2;
      const count = 12;
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count + Math.random() * 0.35;
        const sp = 90 + Math.random() * 140;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 50,
          life: 1,
          color: tile.color,
          r: 2.5 + Math.random() * 4,
          spin: (Math.random() - 0.5) * 8,
        });
      }
      for (let j = 0; j < 6; j++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 60 + Math.random() * 100;
        particles.push({
          x: cx + (Math.random() - 0.5) * cs * 0.4,
          y: cy + (Math.random() - 0.5) * cs * 0.4,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 30,
          life: 0.85,
          color: "#ffffff",
          r: 1.5 + Math.random() * 2,
          spin: 0,
        });
      }
    }
    effectShakeUntil = performance.now() + 340;
    flashAlpha = 0.32;
    clearPulse = 1;
  }

  function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt * 1.65;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 560 * dt;
      p.vx *= 1 - dt * 0.35;
      if (p.spin) p.r += p.spin * dt;
      if (p.life <= 0) particles.splice(i, 1);
    }
    if (clearPulse > 0) clearPulse = Math.max(0, clearPulse - dt * 2.2);
    if (flashAlpha > 0) flashAlpha = Math.max(0, flashAlpha - dt * 1.1);
  }

  function getShake() {
    const now = performance.now();
    if (now >= effectShakeUntil) return [0, 0];
    const t = (effectShakeUntil - now) / 340;
    return [(Math.random() - 0.5) * 9 * t, (Math.random() - 0.5) * 9 * t];
  }

  function placePiece(slot, ar, ac) {
    const p = tray[slot];
    if (!p || !canPlace(p, ar, ac)) return false;
    const scoreBefore = score;
    for (const [dr, dc] of p.cells) {
      board[ar + dr][ac + dc] = p.color;
    }
    tray[slot] = null;
    const { points, cleared } = clearLines();
    score += points + p.cells.length * 5;
    elScore.textContent = String(score);
    if (cleared.length) {
      themeIndex = (themeIndex + 1) % THEMES.length;
      applyThemeToDom();
      spawnBurst(cleared);
      try {
        navigator.vibrate([10, 35, 18]);
      } catch (_) {}
    } else {
      try {
        navigator.vibrate(10);
      } catch (_) {}
    }
    processLevelProgress(score - scoreBefore);
    if (!tray[0] && !tray[1] && !tray[2]) refillTray();
    else if (!hasAnyMove()) endGame();
    return true;
  }

  function endGame() {
    running = false;
    const wasRecord = score > best;
    if (wasRecord) {
      best = score;
      localStorage.setItem(BEST_KEY, String(best));
      elBest.textContent = String(best);
    }
    const reachedLevel = level;
    if (reachedLevel > bestLevel) {
      bestLevel = reachedLevel;
      localStorage.setItem(BEST_LEVEL_KEY, String(bestLevel));
    }
    overlayTitle.textContent = "Oyun bitti";
    overlayText.textContent =
      "Skor: " +
      score +
      (wasRecord && score > 0 ? " — yeni skor rekoru!" : "") +
      " Bu oyunda seviye " +
      reachedLevel +
      ". En yüksek seviye rekorun: " +
      Math.max(bestLevel, reachedLevel) +
      ".";
    overlay.hidden = false;
    btnStart.textContent = "Yeniden oyna";
  }

  function startGame() {
    overlay.hidden = true;
    emptyBoard();
    score = 0;
    elScore.textContent = "0";
    level = 1;
    levelProgress = 0;
    updateLevelBar();
    particles.length = 0;
    themeIndex = (Math.random() * THEMES.length) | 0;
    applyThemeToDom();
    running = true;
    refillTray();
  }

  function layout() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cssW = rect.width;
    cssH = rect.height;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);

    const pad = 10;
    trayH = Math.min(120, cssH * 0.24);
    const maxBoard = Math.min(cssW - pad * 2, cssH - trayH - pad * 3);
    cell = maxBoard / N;
    const boardPx = cell * N;
    bx = (cssW - boardPx) / 2;
    by = pad;
    trayY = by + boardPx + pad;
    slotW = cssW / 3;
    trayCell = Math.min(20, (slotW - 16) / 5);
  }

  function boardCellAt(px, py) {
    if (px < bx || py < by || px >= bx + N * cell || py >= by + N * cell) return null;
    const r = Math.floor((py - by) / cell);
    const c = Math.floor((px - bx) / cell);
    if (r < 0 || r >= N || c < 0 || c >= N) return null;
    return [r, c];
  }

  function shapeBounds(cells) {
    const mr = Math.min(...cells.map((x) => x[0]));
    const mc = Math.min(...cells.map((x) => x[1]));
    const xr = Math.max(...cells.map((x) => x[0]));
    const xc = Math.max(...cells.map((x) => x[1]));
    return { mr, mc, h: xr - mr + 1, w: xc - mc + 1 };
  }

  function traySlotOrigin(slot) {
    const cx = slot * slotW + slotW / 2;
    const p = tray[slot];
    if (!p) return { cx, cy: trayY + trayH / 2, tw: 0, th: 0 };
    const { w, h } = shapeBounds(p.cells);
    const tw = w * trayCell;
    const th = h * trayCell;
    return { cx, cy: trayY + trayH / 2, tw, th, piece: p };
  }

  function hitTrayShapeCell(px, py) {
    for (let s = 0; s < 3; s++) {
      const p = tray[s];
      if (!p) continue;
      const o = traySlotOrigin(s);
      const { mr, mc, w, h } = shapeBounds(p.cells);
      const left = o.cx - (w * trayCell) / 2;
      const top = o.cy - (h * trayCell) / 2;
      if (px < left - 4 || py < top - 4 || px > left + w * trayCell + 4 || py > top + h * trayCell + 4) continue;
      const cr = Math.floor((py - top) / trayCell);
      const cc = Math.floor((px - left) / trayCell);
      for (const [dr, dc] of p.cells) {
        if (dr - mr === cr && dc - mc === cc) {
          return { slot: s, grabR: dr - mr, grabC: dc - mc, piece: p };
        }
      }
    }
    return null;
  }

  function previewAnchor(px, py) {
    const cellPos = boardCellAt(px, py);
    if (!cellPos) return null;
    const [gr, gc] = cellPos;
    const ar = gr - drag.grabR;
    const ac = gc - drag.grabC;
    return { ar, ac };
  }

  function drawRoundedRect(x, y, w, h, r, fill, stroke) {
    const rad = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.lineTo(x + w - rad, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
    ctx.lineTo(x + w, y + h - rad);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
    ctx.lineTo(x + rad, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
    ctx.lineTo(x, y + rad);
    ctx.quadraticCurveTo(x, y, x + rad, y);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  function drawBlock(x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    const pad = size * 0.08;
    drawRoundedRect(x + pad, y + pad, size - pad * 2, size - pad * 2, size * 0.2, color, "rgba(255,255,255,0.35)");
    ctx.restore();
  }

  function drawShapeAt(cells, color, originX, originY, cs, alpha) {
    const { mr, mc } = shapeBounds(cells);
    for (const [dr, dc] of cells) {
      const r = dr - mr;
      const c = dc - mc;
      drawBlock(originX + c * cs, originY + r * cs, cs, color, alpha);
    }
  }

  function draw() {
    const t = performance.now();
    const dt = Math.min(0.05, (t - lastAnimT) / 1000);
    lastAnimT = t;
    updateParticles(dt);

    const th = theme();
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const g = ctx.createLinearGradient(0, 0, 0, cssH);
    g.addColorStop(0, th.bgTop);
    g.addColorStop(1, th.bgBottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cssW, cssH);

    const [sx, sy] = getShake();
    const boardCx = bx + (N * cell) / 2;
    const boardCy = by + (N * cell) / 2;
    const pulse = clearPulse > 0 ? 1 + 0.06 * Math.sin(clearPulse * Math.PI) : 1;

    ctx.save();
    ctx.translate(sx + boardCx, sy + boardCy);
    ctx.scale(pulse, pulse);
    ctx.translate(-boardCx, -boardCy);

    const boardPx = N * cell;
    drawRoundedRect(bx - 4, by - 4, boardPx + 8, boardPx + 8, 12, th.boardFill, th.boardStroke);

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const x = bx + c * cell;
        const y = by + r * cell;
        const inset = cell * 0.04;
        if (board[r][c]) {
          drawBlock(x, y, cell, board[r][c], 1);
        } else {
          ctx.fillStyle = th.emptyCell;
          ctx.fillRect(x + inset, y + inset, cell - inset * 2, cell - inset * 2);
        }
      }
    }

    if (drag.active && drag.cells) {
      const prev = previewAnchor(drag.px, drag.py);
      if (prev) {
        const ok = canPlace({ cells: drag.cells, color: drag.color }, prev.ar, prev.ac);
        for (const [dr, dc] of drag.cells) {
          const r = prev.ar + dr;
          const c = prev.ac + dc;
          if (r >= 0 && r < N && c >= 0 && c < N) {
            const x = bx + c * cell;
            const y = by + r * cell;
            drawBlock(x, y, cell, drag.color, ok ? 0.55 : 0.35);
            if (!ok) {
              ctx.save();
              ctx.globalAlpha = 0.4;
              ctx.fillStyle = "#ef4444";
              ctx.fillRect(x, y, cell, cell);
              ctx.restore();
            }
          }
        }
      }
    }

    ctx.fillStyle = th.trayBg;
    ctx.fillRect(0, trayY - 6, cssW, trayH + 12);

    for (let s = 0; s < 3; s++) {
      const x0 = s * slotW;
      ctx.strokeStyle = th.slotStroke;
      ctx.strokeRect(x0 + 4, trayY, slotW - 8, trayH);
      const p = tray[s];
      if (p) {
        const o = traySlotOrigin(s);
        const { mr, mc, w, h } = shapeBounds(p.cells);
        const left = o.cx - (w * trayCell) / 2;
        const top = o.cy - (h * trayCell) / 2;
        drawShapeAt(p.cells, p.color, left, top, trayCell, drag.active && drag.slot === s ? 0.35 : 1);
      }
    }

    if (drag.active && drag.cells && tray[drag.slot]) {
      const p = tray[drag.slot];
      const left = drag.px - cell / 2 - drag.grabC * cell;
      const top = drag.py - cell / 2 - drag.grabR * cell;
      drawShapeAt(p.cells, p.color, left, top, cell, 0.92);
    }

    ctx.restore();

    for (const pr of particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, pr.life);
      ctx.fillStyle = pr.color;
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, Math.max(0.5, pr.r * pr.life), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (flashAlpha > 0) {
      ctx.save();
      ctx.globalAlpha = flashAlpha * 0.55;
      const rg = ctx.createRadialGradient(cssW / 2, cssH * 0.35, 0, cssW / 2, cssH * 0.35, cssW * 0.85);
      rg.addColorStop(0, "#ffffff");
      rg.addColorStop(0.45, "rgba(255,255,255,0.25)");
      rg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, cssW, cssH);
      ctx.restore();
    }

    ctx.restore();
  }

  function resize() {
    layout();
    draw();
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (!running) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    if (py >= trayY - 8) {
      const hit = hitTrayShapeCell(px, py);
      if (hit) {
        drag.active = true;
        drag.slot = hit.slot;
        drag.cells = hit.piece.cells.map((x) => x.slice());
        drag.color = hit.piece.color;
        drag.grabR = hit.grabR;
        drag.grabC = hit.grabC;
        drag.px = px;
        drag.py = py;
        canvas.setPointerCapture(e.pointerId);
        try {
          navigator.vibrate(12);
        } catch (_) {}
      }
    }
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!drag.active) return;
    const rect = canvas.getBoundingClientRect();
    drag.px = e.clientX - rect.left;
    drag.py = e.clientY - rect.top;
  });

  canvas.addEventListener("pointerup", (e) => {
    if (!drag.active) return;
    const rect = canvas.getBoundingClientRect();
    drag.px = e.clientX - rect.left;
    drag.py = e.clientY - rect.top;
    const prev = previewAnchor(drag.px, drag.py);
    if (prev && canPlace({ cells: drag.cells, color: drag.color }, prev.ar, prev.ac)) {
      placePiece(drag.slot, prev.ar, prev.ac);
    }
    drag.active = false;
    drag.slot = -1;
    drag.cells = null;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (_) {}
  });

  canvas.addEventListener("pointercancel", () => {
    drag.active = false;
    drag.slot = -1;
    drag.cells = null;
  });

  window.addEventListener("resize", resize);

  btnStart.addEventListener("click", () => {
    startGame();
  });

  themeIndex = 0;
  applyThemeToDom();
  emptyBoard();
  level = 1;
  levelProgress = 0;
  updateLevelBar();
  resize();
  requestAnimationFrame(loop);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
})();
