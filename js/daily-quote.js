class DailyQuote {
  constructor() {
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
    const today = this.getTodayDate();
    const stored = localStorage.getItem(this.storageKey);
    const data = stored ? JSON.parse(stored) : null;

    // 如果今天已显示过且用户关闭了，就不再显示
    if (data && data.date === today && data.closed) {
      return;
    }

    // 获取句子库
    const response = await fetch('data/daily-quotes.json');
    const quotesData = await response.json();
    
    // 用今天日期作为种子选择句子
    const dateNumber = new Date(today).getTime();
    const index = Math.floor(this.seededRandom(dateNumber) * quotesData.quotes.length);
    const quote = quotesData.quotes[index];

    this.showQuote(quote, today);
  }

  showQuote(quote, date) {
    const popup = document.createElement('div');
    popup.className = 'daily-quote-popup';
    popup.innerHTML = `
      <div class="quote-content">
        <p class="quote-text">${quote}</p>
        <button class="quote-close">×</button>
      </div>
    `;

    document.body.appendChild(popup);

    // 触发动画
    setTimeout(() => popup.classList.add('show'), 100);

    // 关闭按钮
    popup.querySelector('.quote-close').addEventListener('click', () => {
      popup.classList.remove('show');
      setTimeout(() => popup.remove(), 300);
      
      // 记录今天已关闭
      localStorage.setItem(this.storageKey, JSON.stringify({
        date: date,
        closed: true
      }));
    });
  }
}

// 页面加载后初始化
window.addEventListener('load', () => {
  new DailyQuote();
});