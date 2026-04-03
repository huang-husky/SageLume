/* coding-particles.js
 * 温柔赛博朋克花瓣飘落特效
 * 用于 blog/coding/ 各 Day 页面
 */
(function () {
  'use strict';

  const canvas = document.getElementById('coding-bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const PETAL_COUNT = 32;

  const COLORS = [
    [240, 171, 252],   // 紫粉
    [249, 168, 212],   // 粉
    [196, 181, 253],   // 薰衣草
    [253, 164, 175],   // 玫红
    [255, 228, 230],   // 浅粉白
  ];

  function rand(a, b) { return a + Math.random() * (b - a); }
  function randInt(a, b) { return Math.floor(rand(a, b)); }

  function makePetal(randomY) {
    const [r, g, b] = COLORS[randInt(0, COLORS.length)];
    return {
      x:            rand(0, canvas.width),
      y:            randomY ? rand(-canvas.height * 0.2, canvas.height) : rand(-80, -8),
      rx:           rand(4, 10),        // 椭圆长轴
      ry:           rand(2, 5),         // 椭圆短轴
      angle:        rand(0, Math.PI * 2),
      angleSpeed:   rand(-0.018, 0.018),
      speedY:       rand(0.5, 1.4),
      speedX:       rand(-0.3, 0.3),
      swayAmp:      rand(0.4, 1.1),
      swayFreq:     rand(0.007, 0.018),
      swayPhase:    rand(0, Math.PI * 2),
      opacity:      rand(0.18, 0.52),
      r, g, b,
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

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];

      p.x     += p.speedX + Math.sin(frame * p.swayFreq + p.swayPhase) * p.swayAmp;
      p.y     += p.speedY;
      p.angle += p.angleSpeed;

      // 飞出屏幕后重置到顶部
      if (p.y > canvas.height + 20 || p.x < -50 || p.x > canvas.width + 50) {
        petals[i] = makePetal(false);
        petals[i].x = rand(0, canvas.width);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;

      // 主花瓣
      ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
      ctx.shadowColor = `rgba(${p.r},${p.g},${p.b},0.7)`;
      ctx.shadowBlur  = 10;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.rx, p.ry, 0, 0, Math.PI * 2);
      ctx.fill();

      // 高光小点（朦胧反光）
      ctx.globalAlpha  = p.opacity * 0.55;
      ctx.fillStyle    = `rgba(255,240,255,0.9)`;
      ctx.shadowBlur   = 0;
      ctx.beginPath();
      ctx.ellipse(-p.rx * 0.25, -p.ry * 0.2, p.rx * 0.3, p.ry * 0.25, -0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    raf = requestAnimationFrame(tick);
  }

  // 页面不可见时暂停，恢复时继续（省电）
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(tick);
    }
  });

  window.addEventListener('resize', resize);

  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); tick(); });
  } else {
    init();
    tick();
  }
})();
