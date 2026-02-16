// 网站统计功能
document.addEventListener('DOMContentLoaded', function() {
    
    // 计算文章总数
    // 方法1：从页面上的文章列表直接统计
    const articles = document.querySelectorAll('.post-item');
    const articleCount = articles.length;
    
    // 更新文章数目
    const articleCountEl = document.getElementById('article-count');
    if (articleCountEl) {
        articleCountEl.textContent = articleCount;
    }
    
    // 计算总字数（估算）
    // 这里使用一个简化的估算方法：每篇文章的预计阅读时间
    let totalWords = 0;
    articles.forEach(article => {
        const metaText = article.querySelector('.post-item-meta')?.textContent || '';
        // 匹配 "预计阅读 X 分钟" 的模式
        const match = metaText.match(/预计阅读\s*(\d+)\s*分钟/);
        if (match) {
            const minutes = parseInt(match[1]);
            // 假设阅读速度为 300字/分钟
            totalWords += minutes * 300;
        }
    });
    
    // 格式化字数显示（例如：4.6k）
    const totalWordsEl = document.getElementById('total-words');
    if (totalWordsEl) {
        if (totalWords >= 1000) {
            totalWordsEl.textContent = (totalWords / 1000).toFixed(1) + 'k';
        } else {
            totalWordsEl.textContent = totalWords.toString();
        }
    }
    
    // 计算最后更新时间
    // 从文章列表中获取最新的日期
    let latestDate = null;
    articles.forEach(article => {
        const metaText = article.querySelector('.post-item-meta')?.textContent || '';
        // 匹配日期格式 YYYY-MM-DD
        const dateMatch = metaText.match(/(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
            const date = new Date(dateMatch[1]);
            if (!latestDate || date > latestDate) {
                latestDate = date;
            }
        }
        // 处理 "today" 或包含 "~today" 的情况
        if (metaText.includes('today')) {
            latestDate = new Date();
        }
    });
    
    // 更新最后更新时间
    const lastUpdateEl = document.getElementById('last-update');
    if (lastUpdateEl && latestDate) {
        const updateText = formatTimeAgo(latestDate);
        lastUpdateEl.textContent = updateText;
    }
    
    // 时间格式化函数
    function formatTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days < 1) return '今天';
        if (days === 1) return '1天前';
        if (days < 30) return days + '天前';
        if (days < 365) {
            const months = Math.floor(days / 30);
            return months + '个月前';
        }
        const years = Math.floor(days / 365);
        return years + '年前';
    }
    
    // 不蒜子加载完成后的处理（可选）
    // 监听不蒜子的加载，如果10秒后还没加载成功，显示提示
    setTimeout(function() {
        const uvEl = document.getElementById('busuanzi_value_site_uv');
        const pvEl = document.getElementById('busuanzi_value_site_pv');
        
        if (uvEl && uvEl.textContent === '-') {
            uvEl.textContent = '加载中...';
        }
        if (pvEl && pvEl.textContent === '-') {
            pvEl.textContent = '加载中...';
        }
    }, 10000);
});