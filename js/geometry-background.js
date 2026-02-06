// ==========================================
// 几何背景动画 - 算海青藜主题
// 作为背景层,低透明度
// ==========================================

class GeometryBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.points = [];
    this.maxPoints = 100;
    
    // 算海青藜主题色(降低透明度)
    this.colors = [
      'rgba(197, 225, 165, 0.15)', // 浅绿
      'rgba(174, 213, 129, 0.15)', // 草绿
      'rgba(156, 204, 101, 0.15)', // 鲜绿
      'rgba(139, 195, 74, 0.15)',  // 嫩绿
      'rgba(255, 245, 157, 0.15)', // 鹅黄
      'rgba(255, 241, 118, 0.15)', // 亮黄
      'rgba(255, 238, 88, 0.15)',  // 柠檬黄
      'rgba(255, 235, 59, 0.15)'   // 金黄
    ];
    
    this.init();
  }
  
  init() {
    this.resize();
    this.createPoints();
    this.animate();
    
    window.addEventListener('resize', () => {
      this.resize();
      this.createPoints();
    });
  }
  
  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }
  
  createPoints() {
    this.points = [];
    for (let i = 0; i < this.maxPoints; i++) {
      this.points.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }
  
  drawPoint(point) {
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = point.color;
    this.ctx.fill();
  }
  
  drawLine(p1, p2, distance, maxDistance) {
    const opacity = 0.1 * (1 - distance / maxDistance);
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(197, 225, 165, ${opacity})`;
    this.ctx.lineWidth = 0.5;
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  }
  
  updatePoint(point) {
    point.x += point.vx;
    point.y += point.vy;
    
    // 边界反弹
    if (point.x < 0 || point.x > this.width) point.vx *= -1;
    if (point.y < 0 || point.y > this.height) point.vy *= -1;
    
    // 限制在边界内
    point.x = Math.max(0, Math.min(this.width, point.x));
    point.y = Math.max(0, Math.min(this.height, point.y));
  }
  
  animate() {
    // 使用半透明背景清除,产生拖尾效果
    this.ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // 更新和绘制所有点
    for (let i = 0; i < this.points.length; i++) {
      this.updatePoint(this.points[i]);
      this.drawPoint(this.points[i]);
      
      // 连接附近的点
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
    
    requestAnimationFrame(() => this.animate());
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  new GeometryBackground('geometry-bg-canvas');
});