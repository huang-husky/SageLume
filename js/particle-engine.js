// 粒子引擎
class Particle {
  constructor(x, y, color) {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.baseX = x;
    this.baseY = y;
    this.size = Math.random() * (ParticleConfig.particle.size.max - ParticleConfig.particle.size.min) 
                + ParticleConfig.particle.size.min;
    this.color = color;
    this.density = Math.random() * ParticleConfig.particle.density + 1;
    this.alpha = ParticleConfig.particle.alpha.base + 
                 (Math.random() - 0.5) * 2 * ParticleConfig.particle.alpha.variation;
    // 确保透明度在合理范围内
    this.alpha = Math.max(0.1, Math.min(0.8, this.alpha));
  }
  
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  
  update() {
    // 粒子自动回归到原位置,不受鼠标影响
    const dx = this.x - this.baseX;
    const dy = this.y - this.baseY;
    
    this.x -= dx / ParticleConfig.animation.returnSpeed;
    this.y -= dy / ParticleConfig.animation.returnSpeed;
  }
}

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.width = 0;
    this.height = 0;
    
    this.init();
    this.setupEventListeners();
  }
  
  init() {
    this.resize();
    this.generateParticles();
    this.animate();
  }
  
  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }
  
  generateParticles() {
    this.particles = [];
    
    // 创建临时画布用于文字采样
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = this.width;
    tempCanvas.height = this.height;
    
    // 绘制文字
    tempCtx.font = ParticleConfig.text.font;
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    tempCtx.fillStyle = '#fff';
    tempCtx.fillText(
      ParticleConfig.text.content, 
      this.width / 2, 
      this.height / 2 + ParticleConfig.text.yOffset
    );
    
    // 获取像素数据
    const imageData = tempCtx.getImageData(0, 0, this.width, this.height);
    const data = imageData.data;
    const gap = ParticleConfig.particle.gap;
    
    // 采样生成粒子
    for (let y = 0; y < this.height; y += gap) {
      for (let x = 0; x < this.width; x += gap) {
        const index = (y * this.width + x) * 4;
        const alpha = data[index + 3];
        
        if (alpha > ParticleConfig.particle.alphaThreshold) {
          const color = ParticleConfig.colors[
            Math.floor(Math.random() * ParticleConfig.colors.length)
          ];
          this.particles.push(new Particle(x, y, color));
        }
      }
    }
  }
  
  drawBackground() {
    const gradient = this.ctx.createRadialGradient(
      this.width * ParticleConfig.background.centerX,
      this.height * ParticleConfig.background.centerY,
      0,
      this.width * ParticleConfig.background.centerX,
      this.height * ParticleConfig.background.centerY,
      this.width / 2
    );
    
    gradient.addColorStop(0, ParticleConfig.background.colors[0]);
    gradient.addColorStop(1, ParticleConfig.background.colors[1]);
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBackground();
    
    // 更新和绘制所有粒子
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw(this.ctx);
    }
    
    requestAnimationFrame(() => this.animate());
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.generateParticles();
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 等待字体加载完成
  document.fonts.ready.then(() => {
    new ParticleEngine('particle-canvas');
  });
});