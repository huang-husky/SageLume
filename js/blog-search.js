// 文章标签过滤功能
(function() {
  'use strict';

  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    const postList = document.getElementById('post-list');
    
    // 专题标签点击过滤
    const topicTags = document.querySelectorAll('.topic-tag');
    topicTags.forEach(tag => {
      tag.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 移除所有active状态
        topicTags.forEach(t => t.classList.remove('active'));
        // 添加当前active状态
        this.classList.add('active');
        
        const topic = this.getAttribute('data-topic');
        
        if (topic === 'all') {
          // 显示所有文章
          showAllPosts();
        } else {
          // 根据专题过滤
          filterByTopic(topic);
        }
        
        // 平滑滚动到文章列表
        document.querySelector('.post-list-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  });

  // 显示所有文章
  function showAllPosts() {
    const postList = document.getElementById('post-list');
    if (!postList) return;
    
    const posts = postList.querySelectorAll('.post-item');
    posts.forEach(post => {
      post.style.display = 'block';
    });
  }

  // 根据专题过滤
  function filterByTopic(topic) {
    const postList = document.getElementById('post-list');
    if (!postList) return;
    
    const posts = postList.querySelectorAll('.post-item');
    const topicKeywords = {
      'math': ['数学', '线性代数'],
      'discrete': ['离散数学', '离散'],
      'finance': ['金融', '投资', '理财'],
      'zazhi': ['杂识']
    };
    
    const keywords = topicKeywords[topic] || [];
    
    posts.forEach(post => {
      const tags = post.getAttribute('data-tags')?.toLowerCase() || '';
      const title = post.querySelector('.post-item-title')?.textContent.toLowerCase() || '';
      
      const match = keywords.some(keyword => 
        tags.includes(keyword.toLowerCase()) || 
        title.includes(keyword.toLowerCase())
      );
      
      post.style.display = match ? 'block' : 'none';
    });
  }
})();