/* coding-particles.js
 * 温柔花瓣飘落特效 — 奶白底色 · 玫红渐变
 * 用于 blog/coding/ 各 Day 页面
 */
(function () {
  'use strict';

  const canvas = document.getElementById('coding-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const PETAL_COUNT = 28;

  function rand(a, b) { return a + Math.random() * (b - a); }
  function randInt(a, b) { return Math.floor(rand(a, b)); }

  function makePetal(randomY) {
    const rx = rand(6, 14);
    const ry = rand(3, 7);
    return {
      x:          rand(0, canvas.width),
      y:          randomY ? rand(-canvas.height * 0.2, canvas.height) : rand(-80, -8),
      rx,
      ry,
      angle:      rand(0, Math.PI * 2),
      angleSpeed: rand(-0.014, 0.014),
      speedY:     rand(0.4, 1.2),
      speedX:     rand(-0.25, 0.25),
      swayAmp:    rand(0.3, 1.0),
      swayFreq:   rand(0.006, 0.016),
      swayPhase:  rand(0, Math.PI * 2),
      opacity:    rand(0.25, 0.65),
      // 每片花瓣色调微偏，让渐变不完全一样
      hueShift:   rand(-18, 18),
    };
  }

  let petals = [];
  let frame  = 0;
  let raf    = null;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    petals = Array.from({ length: PETAL_COUNT }, () => makePetal(true));
  }

  /** 花瓣路径：两段贝塞尔，两端尖、中部宽，形如落樱 */
  function petalPath(rx, ry) {
    ctx.beginPath();
    ctx.moveTo(0, -ry);
    ctx.bezierCurveTo( rx * 1.3, -ry * 0.5,  rx * 1.3,  ry * 0.5,  0,  ry);
    ctx.bezierCurveTo(-rx * 1.3,  ry * 0.5, -rx * 1.3, -ry * 0.5,  0, -ry);
  }

  /** 绘制单片花瓣：奶白底 + 玫红→浅粉径向渐变 + 中轴脉络高光 */
  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.opacity;

    const { rx, ry, hueShift: h } = p;

    // ── 底色：奶白，像被晨露浸润的宣纸 ────────────────────────────
    petalPath(rx, ry);
    ctx.fillStyle = 'rgba(255, 250, 245, 0.92)';
    ctx.fill();

    // ── 渐变：玫红中心 → 浅粉 → 奶白边缘 ─────────────────────────
    const grad = ctx.createRadialGradient(
      rx * 0.08, 0, rx * 0.05,
      rx * 0.15, 0, rx * 1.05
    );
    grad.addColorStop(0,    `rgba(${210 + h | 0}, ${Math.max(0, 40 - h * 0.3) | 0}, ${(90 + h * 0.5) | 0}, 0.90)`);
    grad.addColorStop(0.28, `rgba(${235 + h | 0}, ${(100 + h * 0.2) | 0},           ${(140 + h * 0.3) | 0}, 0.72)`);
    grad.addColorStop(0.62, 'rgba(250, 190, 210, 0.48)');
    grad.addColorStop(1,    'rgba(255, 245, 248, 0.08)');
    petalPath(rx, ry);
    ctx.fillStyle = grad;
    ctx.fill();

    // ── 脉络：中轴浅高光，丝丝缕缕的纹理感 ───────────────────────
    ctx.globalAlpha = p.opacity * 0.28;
    ctx.strokeStyle = 'rgba(255, 228, 235, 0.95)';
    ctx.lineWidth   = ry * 0.18;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(0, -ry * 0.72);
    ctx.lineTo(0,  ry * 0.72);
    ctx.stroke();

    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];

      p.x     += p.speedX + Math.sin(frame * p.swayFreq + p.swayPhase) * p.swayAmp;
      p.y     += p.speedY;
      p.angle += p.angleSpeed;

      if (p.y > canvas.height + 20 || p.x < -50 || p.x > canvas.width + 50) {
        petals[i] = makePetal(false);
        petals[i].x = rand(0, canvas.width);
      }

      drawPetal(p);
    }

    raf = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); }
    else                  { raf = requestAnimationFrame(tick); }
  });

  window.addEventListener('resize', resize);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); tick(); });
  } else {
    init();
    tick();
  }
})();
