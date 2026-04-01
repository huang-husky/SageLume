#!/usr/bin/env node
/**
 * count-words.js — 统计 blog 各文章字数，自动更新 blog/index.html 的 data-words
 *
 * 用法：
 *   node count-words.js            → 预览结果（不写入文件）
 *   node count-words.js --write    → 写入 blog/index.html
 */

const fs   = require('fs');
const path = require('path');

const BLOG_DIR   = path.join(__dirname, 'blog');
const INDEX_FILE = path.join(BLOG_DIR, 'index.html');
const WRITE_MODE = process.argv.includes('--write');

// ─── 每个 blog/index.html 条目对应的本地目录 ────────────────────────────────
// series: true  → 递归统计子文章（系列/专题）
// series: false → 只统计该目录下的 index.html（单篇文章）
const ENTRY_MAP = {
  '/blog/post1/':         { dir: 'post1',         series: false },
  '/blog/post2/':         { dir: 'post2',         series: false },
  '/blog/post3/':         { dir: 'post3',         series: false },
  '/blog/post4/':         { dir: 'post4',         series: false },
  '/blog/post5/':         { dir: 'post5',         series: false },
  '/blog/project/':       { dir: 'project',       series: false },
  '/blog/english/':       { dir: 'english',       series: true  },
  '/blog/coding/':        { dir: 'coding',        series: true  },
  '/blog/discrete-math/': { dir: 'discrete-math', series: true  },
  '/blog/yanshan/':       { dir: 'yanshan',       series: true  },
};

// ─── 工具函数 ────────────────────────────────────────────────────────────────

/** 清理 HTML，返回纯文本 */
function stripHtml(html) {
  return html
    .replace(/<pre[\s\S]*?<\/pre>/gi, '')     // 去掉代码块（不计入代码字数）
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&[a-z]+;/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 统计字数：汉字按字符数，英文按单词数 */
function countWords(text) {
  const chinese = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g) || []).length;
  const english = (text.match(/\b[a-zA-Z]{2,}\b/g) || []).length;
  return chinese + english;
}

/**
 * 读取一个 HTML 文件，提取 <main>...</main> 区域并返回字数。
 * <main> 标签不嵌套，用字符串截取比正则更可靠。
 * 如果找不到 <main>（纯导航/目录页），返回 null。
 */
function getFileWordCount(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const html = fs.readFileSync(filePath, 'utf-8');

  // 找 <main 起始位置（忽略大小写）
  const startIdx = html.search(/<main[\s>]/i);
  if (startIdx === -1) return null;

  // 找 </main> 结束位置
  const endTag = '</main>';
  const endIdx = html.toLowerCase().indexOf(endTag, startIdx);
  const content = endIdx !== -1
    ? html.slice(startIdx, endIdx + endTag.length)
    : html.slice(startIdx); // 没找到就取到末尾

  return countWords(stripHtml(content));
}

/** 递归找目录下所有 index.html，跳过第一层（系列根目录的 index.html） */
function findSubArticles(dir) {
  const results = [];
  function walk(d, depth) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(full, depth + 1);
      } else if (entry.name === 'index.html' && depth > 0) {
        results.push(full);
      }
    }
  }
  walk(dir, 0);
  return results;
}

/** 计算某条目的总字数 */
function calcEntryWords(dir, isSeries) {
  const absDir = path.join(BLOG_DIR, dir);
  if (!fs.existsSync(absDir)) {
    console.warn(`  [警告] 目录不存在：${absDir}`);
    return 0;
  }

  if (!isSeries) {
    return getFileWordCount(path.join(absDir, 'index.html')) ?? 0;
  }

  // 系列：递归统计所有子文章
  const files = findSubArticles(absDir);
  let total = 0;
  for (const f of files) {
    const w = getFileWordCount(f);
    if (w !== null) total += w; // null = hub/目录页，跳过
  }
  return total;
}

// ─── 解析并更新 blog/index.html ──────────────────────────────────────────────

/** 在 <article> 开标签里更新或添加 data-words 属性 */
function setDataWords(articleOpenTag, words) {
  if (/data-words="[^"]*"/.test(articleOpenTag)) {
    return articleOpenTag.replace(/data-words="[^"]*"/, `data-words="${words}"`);
  }
  // 在末尾 > 之前插入
  return articleOpenTag.replace(/>$/, ` data-words="${words}">`);
}

function main() {
  const indexHtml = fs.readFileSync(INDEX_FILE, 'utf-8');

  // 匹配每个 post-item 块（<article class="post-item"...> ... </article>）
  // 用回调替换
  let updated = indexHtml;
  let changeCount = 0;

  // 逐条匹配 post-item
  updated = updated.replace(
    /(<article\b[^>]*class="[^"]*post-item[^"]*"[^>]*>)([\s\S]*?)(<\/article>)/gi,
    (fullMatch, openTag, inner, closeTag) => {

      // 从内部的 href 判断是哪个条目
      const hrefMatch = inner.match(/href="[^"]*?(\/blog\/[^"]+\/)"/);
      if (!hrefMatch) return fullMatch;

      const hrefKey = hrefMatch[1]; // e.g. /blog/english/
      const entry = ENTRY_MAP[hrefKey];
      if (!entry) return fullMatch; // 未登记的条目，跳过

      const words = calcEntryWords(entry.dir, entry.series);
      const oldMatch = openTag.match(/data-words="(\d+)"/);
      const oldWords = oldMatch ? parseInt(oldMatch[1]) : null;

      // 打印信息
      const label = hrefKey.replace('/blog/', '').replace('/', '');
      if (oldWords === null) {
        console.log(`  ✚ ${label.padEnd(16)} ${words} 字  （新增）`);
      } else if (oldWords !== words) {
        console.log(`  ↻ ${label.padEnd(16)} ${oldWords} → ${words} 字`);
      } else {
        console.log(`  ✓ ${label.padEnd(16)} ${words} 字  （无变化）`);
      }

      changeCount++;
      const newOpenTag = setDataWords(openTag, words);
      return newOpenTag + inner + closeTag;
    }
  );

  console.log('');
  if (!WRITE_MODE) {
    console.log('预览模式（dry-run），未写入文件。');
    console.log('运行  node count-words.js --write  以写入。');
  } else {
    fs.writeFileSync(INDEX_FILE, updated, 'utf-8');
    console.log(`已更新 blog/index.html（共处理 ${changeCount} 个条目）。`);
  }
}

main();
