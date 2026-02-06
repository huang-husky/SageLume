// 几何背景动画 - 测试版
console.log('🚀 geometry-background.js 开始加载');

class GeometryBackground {
  constructor(canvasId) {
    console.log('🎨 初始化几何背景...');
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error('❌ 找不到canvas:', canvasId);
      return;
    }
    console.log('✅ Canvas找到:', this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.points = [];
    this.maxPoints = 50;
    this.mouse = { x: null, y: null };
    this.frameCount = 0;  // 用于调试
    
    // 算海青藜主题色
    this.colors = [
      'rgba(197, 225, 165, 0.3)', 
      'rgba(174, 213, 129, 0.3)', 
      'rgba(156, 204, 101, 0.3)', 
      'rgba(139, 195, 74, 0.3)',  
      'rgba(255, 245, 157, 0.3)', 
      'rgba(255, 241, 118, 0.3)', 
      'rgba(255, 238, 88, 0.3)',  
      'rgba(255, 235, 59, 0.3)'   
    ];
    
    this.init();
  }
  
  init() {
    console.log('⚙️ 开始初始化...');
    this.resize();
    this.createPoints();
    this.setupMouseEvents();
    console.log('✅ 初始化完成,开始动画');
    this.animate();
  }
  
  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    console.log('📐 Canvas尺寸:', this.width, 'x', this.height);
  }
  
  createPoints() {
    this.points = [];
    for (let i = 0; i < this.maxPoints; i++) {
      this.points.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 2,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
    console.log('✅ 创建了', this.points.length, '个粒子');
  }
  
  drawPoint(point) {
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = point.color;
    this.ctx.fill();
  }
  
  drawLine(p1, p2, distance, maxDistance) {
    const opacity = 0.2 * (1 - distance / maxDistance);
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(197, 225, 165, ${opacity})`;
    this.ctx.lineWidth = 1;
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }
  
  drawMouseLine(p1, p2, distance, maxDistance) {
    const opacity = 0.8 * (1 - distance / maxDistance);
    const gradient = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    gradient.addColorStop(0, `rgba(255, 241, 118, ${opacity})`);
    gradient.addColorStop(0.5, `rgba(197, 225, 165, ${opacity})`);
    gradient.addColorStop(1, `rgba(139, 195, 74, ${opacity})`);
    
    this.ctx.beginPath();
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 3; 
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }
  
  updatePoint(point) {
    point.x += point.vx;
    point.y += point.vy;
    
    if (point.x < 0 || point.x > this.width) point.vx *= -1;
    if (point.y < 0 || point.y > this.height) point.vy *= -1;
    
    point.x = Math.max(0, Math.min(this.width, point.x));
    point.y = Math.max(0, Math.min(this.height, point.y));
  }
  
  animate() {
    this.frameCount++;
    
    // 清除画布(半透明产生拖尾)
    this.ctx.fillStyle = 'rgba(13, 17, 23, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // 更新和绘制所有粒子
    for (let i = 0; i < this.points.length; i++) {
      this.updatePoint(this.points[i]);
      this.drawPoint(this.points[i]);
      
      // 普通连线
      for (let j = i + 1; j < this.points.length; j++) {
        const dx = this.points[i].x - this.points[j].x;
        const dy = this.points[i].y - this.points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          this.drawLine(this.points[i], this.points[j], distance, maxDistance);
        }
      }
    }
    
    // 鼠标互动连线
    if (this.mouse.x !== null && this.mouse.y !== null) {
      const mouseRange = 150;
      const nearPoints = [];
      
      // 找出鼠标附近的所有粒子
      for (let i = 0; i < this.points.length; i++) {
        const dx = this.points[i].x - this.mouse.x;
        const dy = this.points[i].y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRange) {
          nearPoints.push(this.points[i]);
        }
      }
      
      // 鼠标附近的粒子相互连线
      for (let i = 0; i < nearPoints.length; i++) {
        for (let j = i + 1; j < nearPoints.length; j++) {
          const dx = nearPoints[i].x - nearPoints[j].x;
          const dy = nearPoints[i].y - nearPoints[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRange) {
            this.drawMouseLine(nearPoints[i], nearPoints[j], distance, mouseRange);
          }
        }
      }
    }
    
    requestAnimationFrame(() => this.animate());
  }
  
  setupMouseEvents() {
    console.log('🖱️ 设置鼠标事件监听');
    
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    this.canvas.addEventListener('mouseleave', () => {
      console.log('🖱️ 鼠标离开');
      this.mouse.x = null;
      this.mouse.y = null;
    });
    
    // log
    this.canvas.addEventListener('click', (e) => {
      console.log('🖱️ Canvas被点击!', e.clientX, e.clientY);
    });
  }
}

// 初始化log
console.log('📦 geometry-background.js 已加载');
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM加载完成');
    new GeometryBackground('geometry-bg-canvas');
  });
} else {
  console.log('📄 DOM已经加载');
  new GeometryBackground('geometry-bg-canvas');
}