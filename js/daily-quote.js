// 注入样式
const style = document.createElement('style');
style.textContent = `
.daily-quote-popup {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  width: 330px !important;
  background: linear-gradient(135deg, #f0f4e8 0%, #fffef7 100%) !important;
  border-left: 4px solid #8b9f6e !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  padding: 20px !important;
  opacity: 0 !important;
  transform: translateY(-20px) !important;
  transition: all 0.3s ease !important;
  z-index: 99999 !important;
}

.daily-quote-popup.show {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.quote-content {
  position: relative !important;
}

.quote-text {
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: #333 !important;
  margin: 0 !important;
  padding-right: 20px !important;
}

.quote-close {
  position: absolute !important;
  top: -10px !important;
  right: -10px !important;
  background: #8b9f6e !important;
  color: white !important;
  border: none !important;
  border-radius: 50% !important;
  width: 24px !important;
  height: 24px !important;
  cursor: pointer !important;
  font-size: 18px !important;
  line-height: 1 !important;
  transition: background 0.2s !important;
}

.quote-close:hover {
  background: #6d7d56 !important;
}
`;
document.head.appendChild(style);

// 句子库
const quotes = [
  "锐锋产乎钝石，明火炽乎暗木，贵珠出乎贱蚌，美玉出乎丑蹼。",
  "当筵意气凌九霄，星离雨散不终朝，分飞楚关山水遇。",
  "疏影横斜水清浅，暗香浮动月黄昏。",
  "其始来也，耀乎若白日初出照屋梁；其少进也，皎若明月舒其光。",
  "舍近谋远者，劳而无功；舍远谋近者，逸而有终。",
  "菊暗荷枯一夜霜。新苞绿叶照林光。竹篱茅舍出青黄。",
  "天行健，君子以自强不息。",
  "铅刀有干将之志，萤烛希日月之光。",
  "书应读通彻，志当存高远。",
  "天时人事日相催，冬至阳生春又来。",
  "带长铗之陆离兮，冠切云之崔嵬，被明月兮佩宝璐。",
  "春夏之交，草木际天；秋冬雪月，千里一色；风雨晦明之间，俯仰百变。",
  "必有容，德乃大；必有忍，事乃济。",
  "盘薄万古，邈然星河，凭天霓以结峰，倚斗极而横嶂。",
  "小雪晴沙不作泥，疏帘红日弄朝晖。",
  "独立小桥风满袖，平林新月人归后。",
  "尘世难逢开口笑，菊花须插满头归。",
  "鸿飞冥冥日月白，青枫叶赤天雨霜。",
  "浮家不畏风兼浪，才罢炊烟，又袅茶烟，闲对沙鸥枕手眠。",
  "天无私覆也，地无私载也，日月无私烛也，四时无私行也。行其德而万物得遂长焉。",
  "别日何易会日难，山川悠远路漫漫。",
  "不失其所者久，死而不亡者寿。",
  "屈平辞赋悬日月，楚王台榭空山丘。",
  "送君一壶酒，相别野庭边。马上过秋色，舟中到锦川。",
  "翩若惊鸿，婉若游龙。荣曜秋菊，华茂春松。",
  "[数九晴看柳，书空羡仰鸢]",
];

// 随机选择一句
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
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
  });
}

// 页面加载完成后显示
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showRandomQuote);
} else {
  showRandomQuote();
}