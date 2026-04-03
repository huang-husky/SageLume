/* coding-particles.js
 * 温柔花瓣飘落特效 — 奶白底色 · 玫红渐变 · 一端尖一端圆的花瓣形
 * 用于 blog/coding/ 各 Day 页面
 */
(function () {
  'use strict';

  const canvas = document.getElementById('coding-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const PETAL_COUNT = 28;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function makePetal(randomY) {
    const rx = rand(10, 18);   // 花瓣长轴（水平方向，旋转后任意角度）
    const ry = rand(3.5, 6);   // 花瓣短轴
    return {
      x:          rand(0, canvas.width),
      y:          randomY ? rand(-canvas.height * 0.2, canvas.height) : rand(-80, -8),
      rx,
      ry,
      angle:      rand(0, Math.PI * 2),
      angleSpeed: rand(-0.013, 0.013),
      speedY:     rand(0.4, 1.1),
      speedX:     rand(-0.25, 0.25),
      swayAmp:    rand(0.3, 1.0),
      swayFreq:   rand(0.006, 0.016),
      swayPhase:  rand(0, Math.PI * 2),
      opacity:    rand(0.32, 0.72),
      hueShift:   rand(-14, 14),
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

  /**
   * 花瓣路径：右端收尖（花梢），左端圆润（花基）
   * 控制点刻意不对称，让形状清晰区别于椭圆
   */
  function petalPath(rx, ry) {
    ctx.beginPath();
    ctx.moveTo(rx, 0);                                            // 右端：尖梢
    ctx.bezierCurveTo( rx * 0.35, -ry * 1.05,                   // 上弧：右侧控制点靠近尖端
                      -rx * 0.50, -ry * 1.05, -rx, 0);          // 上弧：左侧控制点贴近圆端
    ctx.bezierCurveTo(-rx * 0.50,  ry * 1.05,                   // 下弧：左侧控制点
                       rx * 0.35,  ry * 1.05,  rx, 0);          // 下弧：回到尖梢
    ctx.closePath();
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.globalAlpha = p.opacity;

    const { rx, ry, hueShift: h } = p;

    // ── 奶白底色：宣纸质感 ────────────────────────────────────────
    petalPath(rx, ry);
    ctx.fillStyle = 'rgba(255, 250, 245, 0.96)';
    ctx.fill();

    // ── 径向渐变：中心玫红 → 浅粉 → 奶白边缘 ────────────────────
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    grad.addColorStop(0,    `rgba(${(208 + h) | 0}, ${Math.max(0, 38 - h) | 0}, ${(88 + h * 0.4) | 0}, 0.93)`);
    grad.addColorStop(0.35, `rgba(${(236 + h * 0.5) | 0}, ${(108 + h * 0.3) | 0}, ${(146 + h * 0.3) | 0}, 0.76)`);
    grad.addColorStop(0.65, 'rgba(252, 198, 216, 0.48)');
    grad.addColorStop(1,    'rgba(255, 245, 250, 0.06)');
    petalPath(rx, ry);
    ctx.fillStyle = grad;
    ctx.fill();

    // ── 中轴脉络高光（沿长轴方向）────────────────────────────────
    ctx.globalAlpha = p.opacity * 0.22;
    ctx.strokeStyle = 'rgba(255, 230, 238, 0.95)';
    ctx.lineWidth   = ry * 0.22;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo( rx * 0.65, 0);
    ctx.lineTo(-rx * 0.65, 0);
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
