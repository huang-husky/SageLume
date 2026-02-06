// ==========================================
// 粒子背景配置文件
// 算海青藜主题色配置
// ==========================================

const ParticleConfig = {
  // 文字配置
  text: {
    content: '算海青藜',
    font: 'bold 150px "STXingkai", "KaiTi", sans-serif',
    yOffset: -30  // 文字垂直偏移
  },
  
  // 粒子配置
  particle: {
    size: { min: 1, max: 2.5 },      // 粒子大小范围
    alpha: { base: 0.4, variation: 0.3 },  // 透明度: 0.4±0.3 = 0.1~0.7
    gap: 4,                           // 采样间隔(越小粒子越密集,但性能消耗大)
    density: 25,                      // 粒子密度(影响鼠标交互响应)
    alphaThreshold: 60                // 透明度阈值(捕获文字像素)
  },
  
  // 颜色配置 - 算海青藜主题色(鹅黄草绿)
  colors: [
    '#c5e1a5', // 浅绿
    '#aed581', // 草绿  
    '#9ccc65', // 鲜绿
    '#8bc34a', // 嫩绿
    '#fff59d', // 鹅黄
    '#fff176', // 亮黄
    '#ffee58', // 柠檬黄
    '#ffeb3b'  // 金黄
  ],
  
  // 背景渐变配置
  background: {
    type: 'radial',  // 'radial' 或 'linear'
    colors: ['#1a2a1a', '#0d1117'],
    centerX: 0.5,    // 渐变中心x (0-1)
    centerY: 0.5     // 渐变中心y (0-1)
  },
  
  // 动画配置
  animation: {
    returnSpeed: 10,     // 粒子回归速度(数值越大回归越快)
    enableConnection: false,  // 是否启用粒子连线
    connectionDistance: 20,   // 连线距离
    connectionOpacity: 0.15   // 连线透明度
  },
  
  // 鼠标交互配置(已禁用,但保留配置以备后用)
  mouse: {
    enabled: false,      // ⚠️ 关闭鼠标交互
    radius: 100,
    force: 1
  }
};