// ===== 测试用完整代码 =====
console.log('✅ daily-quote.js 文件已加载');

class DailyQuote {
  constructor() {
    console.log('✅ DailyQuote 构造函数执行');
    this.storageKey = 'dailyQuoteData';
    this.init();
  }

  // 获取今天的日期字符串（用作种子）
  getTodayDate() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }

  // 基于日期的伪随机数生成
  seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  async init() {
    console.log('✅ init 方法开始执行');
    
    const today = this.getTodayDate();
    console.log('📅 今天日期:', today);
    
    const stored = localStorage.getItem(this.storageKey);
    console.log('💾 localStorage内容:', stored);
    
    const data = stored ? JSON.parse(stored) : null;
    console.log('📦 解析后的数据:', data);

    // 如果今天已显示过且用户关闭了，就不再显示
    if (data && data.date === today && data.closed) {
      console.log('⚠️ 今天已经关闭过，不再显示');
      return;
    }

    console.log('🔍 开始获取句子库...');
    
    try {
      // 获取句子库
      const response = await fetch('data/daily-quotes.json');
      console.log('📡 fetch响应状态:', response.status);
      
      const quotesData = await response.json();
      console.log('📚 句子库数据:', quotesData);
      
      // 用今天日期作为种子选择句子
      const dateNumber = new Date(today).getTime();
      const index = Math.floor(this.seededRandom(dateNumber) * quotesData.quotes.length);
      const quote = quotesData.quotes[index];
      
      console.log('🎯 选中的句子索引:', index);
      console.log('💬 选中的句子:', quote);
      
      this.showQuote(quote, today);
    } catch (error) {
      console.error('❌ 获取句子时出错:', error);
    }
  }

  showQuote(quote, date) {
    console.log('✅ showQuote 方法执行');
    console.log('💬 要显示的句子:', quote);
    
    const popup = document.createElement('div');
    popup.className = 'daily-quote-popup';
    popup.innerHTML = `
      <div class="quote-content">
        <p class="quote-text">${quote}</p>
        <button class="quote-close">×</button>
      </div>
    `;

    document.body.appendChild(popup);
    console.log('📌 弹窗已添加到DOM');

    // 触发动画
    setTimeout(() => {
      popup.classList.add('show');
      console.log('✨ 动画class已添加');
    }, 100);

    // 关闭按钮
    popup.querySelector('.quote-close').addEventListener('click', () => {
      console.log('🔘 关闭按钮被点击');
      popup.classList.remove('show');
      setTimeout(() => popup.remove(), 300);
      
      // 记录今天已关闭
      localStorage.setItem(this.storageKey, JSON.stringify({
        date: date,
        closed: true
      }));
      console.log('💾 已保存关闭状态到localStorage');
    });
  }
}

// 页面加载后初始化
console.log('⏳ 等待页面加载完成...');

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOMContentLoaded 事件触发');
    new DailyQuote();
  });
} else {
  console.log('✅ DOM已就绪，直接执行');
  new DailyQuote();
}