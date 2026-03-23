// 当整个页面的DOM内容都加载完毕后执行
document.addEventListener("DOMContentLoaded", function () {
  // 找到我们存放文章正文的容器
  // 我们在 page.html 中为正文区域的div设置了 .post-content class
  const content = document.querySelector(".post-content");

  // 如果页面上没有这个容器（比如在首页），则不执行任何操作
  if (!content) {
    return;
  }

  // 定义一个函数，用于将一种标题标签替换为另一种
  // 例如：changeHeadingTag(content, 'h1', 'h2') 会把内容里所有的h1都变成h2
  const changeHeadingTag = (container, fromTag, toTag) => {
    const headings = container.querySelectorAll(fromTag);
    headings.forEach((oldHeading) => {
      const newHeading = document.createElement(toTag);
      // 复制所有内容和属性（比如id）
      newHeading.innerHTML = oldHeading.innerHTML;
      for (const attr of oldHeading.attributes) {
        newHeading.setAttribute(attr.name, attr.value);
      }
      // 在DOM中进行替换
      oldHeading.parentNode.replaceChild(newHeading, oldHeading);
    });
  };

  // --- 核心执行逻辑 ---
  //
  // 为了避免连锁反应（比如h1->h2, 然后新的h2又被h2->h3的规则影响），
  // 我们必须从最深的标题级别开始，倒序进行替换。
  //
  // 比如，一个 ## 标题，Zola生成了 <h2>，我们希望它变成 <h3>。
  // 一个 # 标题，Zola生成了 <h1>，我们希望它变成 <h2>。
  // 我们先处理所有 <h2>，把它们变成 <h3>。然后再去处理所有 <h1>，把它们变成 <h2>。
  // 这样，新生成的 <h2> 就不会被错误地再次提升为 <h3>。
  //
  // 这里我们支持到h5 -> h6的降级
  changeHeadingTag(content, "h5", "h6");
  changeHeadingTag(content, "h4", "h5");
  changeHeadingTag(content, "h3", "h4");
  changeHeadingTag(content, "h2", "h3");
  changeHeadingTag(content, "h1", "h2");
});
