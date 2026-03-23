// 文章标签过滤功能
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    
    const topicTags = document.querySelectorAll('.topic-tag');
    topicTags.forEach(tag => {
      tag.addEventListener('click', function(e) {
        e.preventDefault();
        
        topicTags.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const topic = this.getAttribute('data-topic');
        
        if (topic === 'all') {
          showAllPosts();
        } else {
          filterByTopic(topic);
        }
        
        document.querySelector('.post-list-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  });

  function showAllPosts() {
    const postList = document.getElementById('post-list');
    if (!postList) return;
    const posts = postList.querySelectorAll('.post-item');
    posts.forEach(post => post.style.display = 'block');
  }

  // 直接比对 data-tags，按钮 data-topic 和文章 data-tags 保持一致即可
  function filterByTopic(topic) {
    const postList = document.getElementById('post-list');
    if (!postList) return;
    const posts = postList.querySelectorAll('.post-item');
    posts.forEach(post => {
      const tags = post.getAttribute('data-tags') || '';
      post.style.display = tags === topic ? 'block' : 'none';
    });
  }

})();