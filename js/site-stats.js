// 网站统计功能
document.addEventListener('DOMContentLoaded', function() {
    
    // 数字滚动动画函数
    function animateNumber(element, target, duration = 1000, suffix = '') {
        if (!element) return;
        
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数（easeOutQuart）
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeProgress);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // 计算文章总数
    const articles = document.querySelectorAll('.post-item');
    const articleCount = articles.length;
    
    // 更新文章数目（带动画）
    const articleCountEl = document.getElementById('article-count');
    if (articleCountEl) {
        setTimeout(() => animateNumber(articleCountEl, articleCount, 800), 100);
    }
    
    // 计算总字数（估算）
    let totalWords = 0;
    articles.forEach(article => {
        const metaText = article.querySelector('.post-item-meta')?.textContent || '';
        const match = metaText.match(/预计阅读\s*(\d+)\s*分钟/);
        if (match) {
            const minutes = parseInt(match[1]);
            totalWords += minutes * 300; // 假设阅读速度为 300字/分钟
        }
    });
    
    // 格式化字数并显示动画
    const totalWordsEl = document.getElementById('total-words');
    if (totalWordsEl) {
        setTimeout(() => {
            if (totalWords >= 1000) {
                const kValue = Math.floor(totalWords / 100) / 10; // 保留一位小数
                animateNumberWithDecimal(totalWordsEl, kValue, 'k', 1000);
            } else {
                animateNumber(totalWordsEl, totalWords, 1000);
            }
        }, 200);
    }
    
    // 带小数的数字动画
    function animateNumberWithDecimal(element, target, suffix = '', duration = 1000) {
        if (!element) return;
        
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = (start + (target - start) * easeProgress).toFixed(1);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // 计算最后更新时间
    let latestDate = null;
    articles.forEach(article => {
        const metaText = article.querySelector('.post-item-meta')?.textContent || '';
        const dateMatch = metaText.match(/(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
            const date = new Date(dateMatch[1]);
            if (!latestDate || date > latestDate) {
                latestDate = date;
            }
        }
        if (metaText.includes('today')) {
            latestDate = new Date();
        }
    });
    
    // 更新最后更新时间
    const lastUpdateEl = document.getElementById('last-update');
    if (lastUpdateEl && latestDate) {
        const updateText = formatTimeAgo(latestDate);
        setTimeout(() => {
            lastUpdateEl.style.opacity = '0';
            setTimeout(() => {
                lastUpdateEl.textContent = updateText;
                lastUpdateEl.style.transition = 'opacity 0.5s ease';
                lastUpdateEl.style.opacity = '1';
            }, 100);
        }, 500);
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
    
    // 不蒜子数据监听
    // 使用MutationObserver监听不蒜子数据变化，添加动画
    const uvEl = document.getElementById('busuanzi_value_site_uv');
    const pvEl = document.getElementById('busuanzi_value_site_pv');
    
    if (uvEl) {
        const uvObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && uvEl.textContent !== '-') {
                    const value = parseInt(uvEl.textContent);
                    if (!isNaN(value)) {
                        uvEl.textContent = '-';
                        setTimeout(() => animateNumber(uvEl, value, 1200), 300);
                        uvObserver.disconnect();
                    }
                }
            });
        });
        uvObserver.observe(uvEl, { childList: true, characterData: true, subtree: true });
    }
    
    if (pvEl) {
        const pvObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && pvEl.textContent !== '-') {
                    const value = parseInt(pvEl.textContent);
                    if (!isNaN(value)) {
                        pvEl.textContent = '-';
                        setTimeout(() => animateNumber(pvEl, value, 1400), 400);
                        pvObserver.disconnect();
                    }
                }
            });
        });
        pvObserver.observe(pvEl, { childList: true, characterData: true, subtree: true });
    }
    
    // 超时后显示加载提示
    setTimeout(function() {
        if (uvEl && uvEl.textContent === '-') {
            uvEl.textContent = '加载中...';
        }
        if (pvEl && pvEl.textContent === '-') {
            pvEl.textContent = '加载中...';
        }
    }, 10000);
});