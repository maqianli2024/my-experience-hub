// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

// ==================== Theme toggle ====================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.dataset.theme = savedTheme;

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  updateNavbar();
});

// ==================== Filter timeline ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const tlItems = document.querySelectorAll('.tl-item');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    tlItems.forEach((item) => {
      const match = filter === 'all' || item.dataset.category === filter;
      if (match) {
        item.classList.remove('hidden');
        item.classList.remove('visible');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            item.classList.add('visible');
          });
        });
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ==================== Scroll reveal ====================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.05 }
);

// Observe timeline items with stagger
document.querySelectorAll('.tl-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 80}ms`;
  item.classList.add('fade-in');
  revealObserver.observe(item);
});

// Observe other elements
document.querySelectorAll('.stat-item, .about-content, .section-header').forEach((el) => {
  el.classList.add('fade-in');
  revealObserver.observe(el);
});

// ==================== Counter animation ====================
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1500;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-number').forEach((el) => counterObserver.observe(el));

// ==================== Card glow follow mouse ====================
document.querySelectorAll('.tl-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
  });
});

// ==================== Navbar behavior ====================
// Close mobile menu on scroll
let scrollTimer;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    navLinks.classList.remove('open');
  }, 100);
}, { passive: true });

// Navbar solidify on scroll
const navbar = document.querySelector('.navbar');
function updateNavbar() {
  const isDark = document.documentElement.dataset.theme !== 'light';
  if (window.scrollY > 50) {
    navbar.style.background = isDark ? 'rgba(11,11,16,0.92)' : 'rgba(250,251,252,0.95)';
    navbar.style.borderBottomColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
  } else {
    navbar.style.background = '';
    navbar.style.borderBottomColor = '';
  }
}
window.addEventListener('scroll', updateNavbar, { passive: true });

// ==================== Reduced motion ====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.querySelectorAll('.aurora-blob').forEach((blob) => {
    blob.style.animation = 'none';
  });
}

// ==================== Article Content ====================
const articles = {
  '从零搭建个人网站的完整指南': {
    content: `<div class="media-video">
  <video src="https://www.w3schools.com/html/mov_bbb.mp4" preload="metadata" poster="https://picsum.photos/seed/github/800/450"></video>
  <div class="video-overlay" onclick="playVideo(this)">
    <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
  </div>
</div>
<p class="drawer-media-caption">GitHub Pages 部署演示视频</p>
<p>想要一个属于自己的网站，但不想花钱买域名和服务器？完全可以。借助 GitHub Pages，你可以零成本搭建一个专业级的个人网站。</p>
<h3>为什么选择 GitHub Pages</h3>
<p>GitHub Pages 提供免费的静态网站托管，自带 HTTPS、全球 CDN，推代码自动部署。对于个人博客、作品集、文档站点来说，它是最佳起点。</p>
<img src="https://picsum.photos/seed/pages-setup/800/400" alt="GitHub Pages 设置界面" loading="lazy">
<p class="drawer-media-caption">GitHub Pages 设置界面截图</p>
<h3>三步完成部署</h3>
<ol>
<li><strong>创建仓库</strong>：在 GitHub 新建一个仓库，命名格式为 <code>用户名.github.io</code></li>
<li><strong>编写网站</strong>：用 HTML/CSS/JS 创建 <code>index.html</code>，推送到仓库</li>
<li><strong>开启 Pages</strong>：进入仓库 Settings → Pages，选择 main 分支</li>
</ol>
<pre><code># 初始化并推送
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/用户名/用户名.github.io.git
git push -u origin main</code></pre>
<p>等待 1-2 分钟，访问 <code>https://用户名.github.io</code> 即可看到你的网站。</p>
<h3>进阶优化</h3>
<ul>
<li>使用自定义域名（可选，需购买域名）</li>
<li>添加 Jekyll 或 Hugo 实现静态博客</li>
<li>配置 GitHub Actions 实现自动化构建</li>
<li>接入 Google Analytics 追踪访问数据</li>
</ul>
<p>关键原则：<strong>先上线，再迭代</strong>。不要追求完美，先让网站跑起来，后续慢慢优化。</p>`
  },

  '从哑巴英语到流利口语的突破路径': {
    content: `<div class="media-audio">
  <div class="audio-icon" onclick="toggleAudio(this)">
    <svg class="audio-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    <svg class="audio-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
  </div>
  <div class="audio-info">
    <div class="audio-title">跟读练习：TED Talk Excerpt</div>
    <div class="audio-progress" onclick="seekAudio(event, this)"><div class="audio-progress-bar"></div></div>
    <div class="audio-time"><span class="audio-current">0:00</span><span class="audio-duration">0:30</span></div>
    <audio preload="none" src="https://www.w3schools.com/html/horse.mp3"></audio>
  </div>
</div>
<p>学了十几年英语，考试分数不低，但一开口就卡壳？这是绝大多数中国英语学习者的共同痛点。问题不在你的语言天赋，而在学习方法。</p>
<h3>核心理念：不要背单词，要背句子</h3>
<p>孤立的单词没有生命力。你需要的是<strong>语块</strong>——一个完整的表达单元。比如 "I'm looking forward to" 比单独记 "look forward to" 有效十倍。</p>
<h3>三个突破阶段</h3>
<ol>
<li><strong>输入期（1-3个月）</strong>：每天听 30 分钟英文播客或 YouTube，不要求听懂每个词，培养语感</li>
<li><strong>模仿期（3-6个月）</strong>：跟读 TED 演讲，模仿语调和节奏，录音对比</li>
<li><strong>输出期（持续）</strong>：找语伴练习，或用 AI 对话工具模拟真实场景</li>
</ol>
<h3>最容易被忽视的关键</h3>
<p>口语的核心不是词汇量，而是<strong>反应速度</strong>。你需要把常用表达练到"不需要思考就能说出来"的程度。这需要大量重复，而不是大量输入。</p>`
  },

  '极简生活实践：断舍离一年后的感悟': {
    content: `<p>一年前，我决定做一次彻底的断舍离。扔掉了衣柜里 80% 的衣服，清空了书架上只翻过前言的书，删掉了手机里 200 多个从未打开的 App。</p>
<h3>过程比结果更重要</h3>
<p>断舍离最难的不是扔东西，而是面对"万一以后用到"的恐惧。事实证明，扔掉的那些东西，99% 再也没被想起过。</p>
<h3>三个核心收获</h3>
<ul>
<li><strong>决策效率提升</strong>：衣服少了，早上不再纠结穿什么；物品少了，找东西的时间趋近于零</li>
<li><strong>心理负担减轻</strong>：每一件多余的东西都是一个微小的心理债务，积少成多会消耗大量精力</li>
<li><strong>消费观改变</strong>：从"买更多"变成"买更好"，单件预算提高但总支出反而下降</li>
</ul>
<h3>给想开始的人的建议</h3>
<p>不要一次性扔完，每周处理一个区域。先从最容易的地方开始（比如过期药品、旧杂志），建立信心后再攻克衣柜和书架。</p>`
  },

  '如何写一份让人想约面试的简历': {
    content: `<p>HR 平均看一份简历的时间是 7 秒。你的简历不是工作经历的罗列，而是一份 7 秒内能打动人的个人广告。</p>
<h3>STAR 法则：让经历会说话</h3>
<p>每一条经历都应该包含：<strong>S</strong>ituation（背景）、<strong>T</strong>ask（任务）、<strong>A</strong>ction（行动）、<strong>R</strong>esult（结果）。</p>
<h3>三个致命错误</h3>
<ol>
<li><strong>只写职责不写成果</strong>：❌"负责用户增长" → ✅"主导用户增长策略，3 个月内 DAU 提升 40%"</li>
<li><strong>堆砌技术名词</strong>：不要写"精通 Java、Python、Go"，写你用这些技术解决了什么问题</li>
<li><strong>一份简历投所有岗位</strong>：针对每个岗位定制简历，突出最相关的 2-3 段经历</li>
</ol>
<h3>格式也很重要</h3>
<ul>
<li>控制在 1 页以内（应届生）或 2 页以内（资深）</li>
<li>用数字量化成果：提升 X%、节省 X 小时、覆盖 X 万用户</li>
<li>最近的经历放最前面，时间倒序排列</li>
</ul>`
  },

  'Git 工作流：从混乱到有序': {
    content: `<p>多人协作时，Git 是最强大的版本管理工具，也是最容易制造混乱的工具。一个清晰的工作流规范能让团队效率翻倍。</p>
<h3>分支策略</h3>
<p>推荐使用简化版 Git Flow：</p>
<ul>
<li><code>main</code>：始终可部署的稳定版本</li>
<li><code>develop</code>：开发主线，功能合并到这里</li>
<li><code>feature/xxx</code>：每个功能一个分支，完成后合并到 develop</li>
<li><code>hotfix/xxx</code>：紧急修复，从 main 拉出，修复后同时合并回 main 和 develop</li>
</ul>
<h3>Rebase vs Merge</h3>
<p>个人分支用 <code>rebase</code> 保持提交历史线性干净；公共分支用 <code>merge</code> 保留合并记录。不要对已推送的提交做 rebase。</p>
<h3>Commit Message 规范</h3>
<p>好的提交信息应该回答"为什么做这个改动"，而不是"改了什么"。推荐格式：<code>type: 简短描述</code>，如 <code>fix: 修复登录页面表单验证失败</code>。</p>`
  },

  '英文阅读提速：告别逐词翻译': {
    content: `<p>读英文时，脑子里先翻译成中文再理解？这是阅读速度慢的根本原因。你需要训练自己用英文思维理解英文。</p>
<h3>意群阅读法</h3>
<p>不要一个词一个词地读，而是按<strong>意群</strong>（meaning group）扫视。比如这句话：</p>
<p>"The company / has announced / a new strategy / to expand / into emerging markets."</p>
<p>五个意群，五次眼动，而不是十三个单词的逐词扫描。</p>
<h3>两个实用训练</h3>
<ol>
<li><strong>限时阅读</strong>：给自己设定时间压力，强迫眼睛不停留，容忍部分不理解</li>
<li><strong>英文-英文释义</strong>：查英英词典而非英汉词典，用英文解释英文</li>
</ol>
<h3>推荐书单（中级水平）</h3>
<ul>
<li><em>Atomic Habits</em> — 语言简洁，实用性强</li>
<li><em>The Psychology of Money</em> — 故事驱动，容易读下去</li>
<li><em>Steve Jobs</em> by Walter Isaacson — 传记类，有上下文帮助理解</li>
</ul>`
  },

  '向上管理：和老板高效沟通的方法': {
    content: `<p>向上管理不是拍马屁，是一种专业能力。本质是：让你的上级更高效地了解你的工作，从而给你更好的支持。</p>
<h3>核心原则：对齐预期</h3>
<p>接到任务时，确认三个问题：</p>
<ol>
<li><strong>目标是什么</strong>：这个任务要解决什么问题？成功的标准是什么？</li>
<li><strong>截止时间</strong>：什么时候需要？有没有中间节点？</li>
<li><strong>资源支持</strong>：需要哪些人配合？有什么权限需要申请？</li>
</ol>
<h3>汇报的黄金结构</h3>
<p><strong>结论先行</strong>：先说结果和风险，再说过程。老板最关心的是"事情怎么样了"，而不是"你做了什么"。</p>
<p>模板：<strong>进展 + 风险 + 需要的支持</strong>。每次汇报控制在 3 分钟以内。</p>
<h3>避坑指南</h3>
<ul>
<li>不要只带问题不带方案——至少准备 2 个可行方案让老板选</li>
<li>不要等出了问题才汇报——主动同步进度，让老板有掌控感</li>
<li>不要用"我以为"来解释——确认不清楚的事，而不是猜测</li>
</ul>`
  },

  'Docker 容器化入门实战': {
    content: `<p>"在我电脑上能跑啊！"——Docker 就是来解决这个问题的。它把你的应用和运行环境打包在一起，确保在任何机器上都能一致运行。</p>
<h3>Docker 的核心概念</h3>
<ul>
<li><strong>镜像（Image）</strong>：应用的只读模板，包含代码、运行时、依赖</li>
<li><strong>容器（Container）</strong>：镜像的运行实例，可以启动、停止、删除</li>
<li><strong>Dockerfile</strong>：构建镜像的"配方"，定义每一步安装什么</li>
</ul>
<h3>最小可行 Dockerfile</h3>
<p>一个 Node.js 应用只需要 5 行就能容器化：</p>
<p><code>FROM node:18</code> → <code>WORKDIR /app</code> → <code>COPY . .</code> → <code>RUN npm install</code> → <code>CMD ["node", "index.js"]</code></p>
<h3>Docker Compose：多服务编排</h3>
<p>当你的应用需要数据库、缓存等多个服务时，用 <code>docker-compose.yml</code> 定义所有服务的关系，一条命令全部启动。</p>
<p>关键习惯：<strong>始终用 .dockerignore 排除 node_modules 和 .env</strong>，避免镜像臃肿和泄露敏感信息。</p>`
  },

  '一个人旅行的 10 个小技巧': {
    content: `<img src="https://picsum.photos/seed/travel-solo/800/400" alt="独行旅途风景" loading="lazy">
<p class="drawer-media-caption">独自旅行途中拍摄的风景</p>
<p>独自旅行不是孤独，是自由。走过 15 个城市后，我总结了这些让旅程更顺畅的实用技巧。</p>
<h3>行前准备</h3>
<ol>
<li><strong>只带一个登机箱</strong>：托运行李是旅行焦虑的主要来源，轻装上阵才能说走就走</li>
<li><strong>提前下载离线地图</strong>：Google Maps 支持离线区域下载，没网也能导航</li>
<li><strong>住宿选青旅或民宿</strong>：独行者最容易交到朋友的地方</li>
</ol>
<h3>旅途中</h3>
<ul>
<li>每天只规划 1-2 个核心景点，留出随性探索的空间</li>
<li>午饭选当地人排队的馆子，而不是 Tripadvisor 上的网红店</li>
<li>随身带一个便携充电宝，手机是你唯一的导航和通讯工具</li>
</ul>
<h3>安全第一</h3>
<ul>
<li>重要证件拍照备份，存云端</li>
<li>晚上 10 点后避免独自走小巷</li>
<li>到新城市先确认最近的医院和大使馆位置</li>
</ul>
<p>最重要的一条：<strong>不要因为一个人就不敢出发</strong>。独自旅行会让你更了解自己。</p>`
  },

  '技术面试准备清单与心态调整': {
    content: `<p>技术面试是一场综合能力的考验，不只是考你会不会写代码。准备充分 + 心态稳定 = 通过率翻倍。</p>
<h3>三大模块准备</h3>
<ol>
<li><strong>算法（40%权重）</strong>：LeetCode 刷 150 题左右，重点掌握数组、链表、树、动态规划、BFS/DFS</li>
<li><strong>系统设计（30%权重）</strong>：熟悉分布式系统基础概念（缓存、消息队列、负载均衡），练习画架构图</li>
<li><strong>行为面试（30%权重）</strong>：准备 5-8 个 STAR 故事，覆盖团队协作、冲突处理、技术决策</li>
</ol>
<h3>面试中的技巧</h3>
<ul>
<li>不要沉默思考超过 30 秒——边想边说，让面试官看到你的思考过程</li>
<li>先确认需求再动手——"这个函数的输入范围是什么？需要处理边界情况吗？"</li>
<li>写完代码先自己 review——找一遍边界条件和时间复杂度</li>
</ul>
<h3>心态调整</h3>
<p>面试失败是常态，不是你不够好，而是匹配度问题。每次面试后写复盘笔记，记录哪些问题没答好，下次改进。<strong>面试是一个技能，练得越多越强</strong>。</p>`
  },

  '读书笔记方法论：从读过到读懂': {
    content: `<p>读完一本书，过两周就忘了？问题不在记忆力，在于你没有一个有效的笔记体系。</p>
<h3>三层笔记法</h3>
<ol>
<li><strong>摘录层</strong>：标注触动你的原文句子（不要全划线，每章最多 3-5 句）</li>
<li><strong>转述层</strong>：用自己的话重新写一遍，确认你真的理解了</li>
<li><strong>关联层</strong>：这个观点和你已有的哪些知识/经验有关联？能用在哪里？</li>
</ol>
<h3>费曼技巧的应用</h3>
<p>读完一个章节后，假装要给一个完全不了解这个领域的人讲解。如果你说不清楚，说明你还没真正理解。回去重读那个部分。</p>
<h3>工具推荐</h3>
<ul>
<li><strong>Obsidian</strong>：双向链接笔记，适合构建知识网络</li>
<li><strong>Readwise</strong>：自动同步 Kindle 和微信读书的标注</li>
<li><strong>卡片笔记法</strong>：每条笔记是一个独立的知识卡片，通过标签关联</li>
</ul>
<p>记住：<strong>笔记的目的不是记录，而是思考</strong>。一条深思熟虑的笔记胜过一百条复制粘贴。</p>`
  },

  '技术文档写作的英文表达技巧': {
    content: `<p>写好英文技术文档不只是英语好就行。结构清晰、逻辑严密、表达简洁，三者缺一不可。</p>
<h3>结构模板</h3>
<p>一篇好的技术文档通常包含：</p>
<ol>
<li><strong>Overview</strong>：一句话说明这是什么、解决什么问题</li>
<li><strong>Prerequisites</strong>：使用前需要什么环境/知识</li>
<li><strong>Getting Started</strong>：最快的上手路径</li>
<li><strong>Deep Dive</strong>：深入讲解核心概念</li>
<li><strong>Troubleshooting</strong>：常见问题和解决方案</li>
</ol>
<h3>常用句式模板</h3>
<ul>
<li>"This guide walks you through..." — 引导读者</li>
<li>"Before you begin, make sure..." — 前置条件</li>
<li>"If you encounter X, try Y" — 问题解决</li>
<li>"For more details, refer to..." — 引用扩展</li>
</ul>
<h3>避坑指南</h3>
<ul>
<li>不要用长句——一个句子只表达一个意思</li>
<li>不要用被动语态——"Run the command" 比 "The command should be run" 更直接</li>
<li>代码示例要能直接复制运行——不要省略关键步骤</li>
</ul>`
  }
};

// ==================== Drawer Logic ====================
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');
const drawerBadge = document.getElementById('drawerBadge');
const drawerDate = document.getElementById('drawerDate');
const drawerTitle = document.getElementById('drawerTitle');
const drawerContent = document.getElementById('drawerContent');

const categoryNames = { tech: '技术', life: '生活', career: '职业', english: '英语' };

function openDrawer(title, category, date, content) {
  drawerBadge.textContent = categoryNames[category] || category;
  drawerBadge.className = `drawer-badge ${category}`;
  drawerDate.textContent = date;
  drawerTitle.textContent = title;
  drawerContent.innerHTML = content;
  drawer.classList.add('open');
  drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
});

// Bind click on timeline cards
document.querySelectorAll('.tl-item').forEach((item) => {
  const card = item.querySelector('.tl-card');
  const title = item.querySelector('.card-title').textContent;
  const category = item.dataset.category;
  const dateEl = item.querySelector('.tl-month');
  const dayEl = item.querySelector('.tl-day');
  const date = `${dateEl.textContent}.${dayEl.textContent}`;

  card.addEventListener('click', () => {
    const article = articles[title];
    if (article) {
      openDrawer(title, category, date, article.content);
    }
  });
});

// ==================== Media: Lightbox ====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.addEventListener('click', (e) => {
  const img = e.target.closest('.drawer-content img');
  if (img && !img.closest('.media-audio')) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  }
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

// ==================== Media: Video ====================
function playVideo(overlay) {
  const video = overlay.previousElementSibling;
  video.play();
  overlay.classList.add('hidden');
  video.addEventListener('ended', () => overlay.classList.remove('hidden'), { once: true });
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      overlay.classList.add('hidden');
    } else {
      video.pause();
      overlay.classList.remove('hidden');
    }
  });
}

// ==================== Media: Audio ====================
function toggleAudio(icon) {
  const wrapper = icon.closest('.media-audio');
  const audio = wrapper.querySelector('audio');
  const playIcon = icon.querySelector('.audio-play');
  const pauseIcon = icon.querySelector('.audio-pause');
  const progressBar = wrapper.querySelector('.audio-progress-bar');
  const currentTimeEl = wrapper.querySelector('.audio-current');

  if (audio.paused) {
    audio.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  } else {
    audio.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  }

  audio.ontimeupdate = () => {
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${pct}%`;
    const m = Math.floor(audio.currentTime / 60);
    const s = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTimeEl.textContent = `${m}:${s}`;
  };

  audio.onended = () => {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    progressBar.style.width = '0%';
    currentTimeEl.textContent = '0:00';
  };
}

function seekAudio(e, progressEl) {
  const audio = progressEl.closest('.media-audio').querySelector('audio');
  if (!audio.duration) return;
  const rect = progressEl.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  audio.currentTime = pct * audio.duration;
}

// ==================== Effect: Particle Constellation ====================
(function initParticles() {
  if (prefersReducedMotion.matches) return;
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [], mouse = { x: -1000, y: -1000 };
  const PARTICLE_COUNT = 50;
  const CONNECT_DIST = 150;
  const MOUSE_RADIUS = 200;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.2
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const isDark = document.documentElement.dataset.theme !== 'light';
    const lineColor = isDark ? '255,255,255' : '0,0,0';
    const dotColor = isDark ? '59,130,246' : '37,99,235';

    // Update positions
    for (const p of particles) {
      // Gentle mouse attraction
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        p.vx += dx / dist * 0.02;
        p.vy += dy / dist * 0.02;
      }
      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      // Wrap around
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.15;
          ctx.strokeStyle = `rgba(${lineColor},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      ctx.fillStyle = `rgba(${dotColor},${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  init();
  draw();
})();

// ==================== Effect: Click Ripple ====================
(function initRipple() {
  if (prefersReducedMotion.matches) return;
  const canvas = document.getElementById('rippleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let ripples = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  document.addEventListener('click', (e) => {
    ripples.push({
      x: e.clientX,
      y: e.clientY,
      r: 0,
      maxR: 120,
      opacity: 0.15,
      speed: 2.5
    });
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isDark = document.documentElement.dataset.theme !== 'light';
    const color = isDark ? '59,130,246' : '37,99,235';

    ripples = ripples.filter((rp) => {
      rp.r += rp.speed;
      rp.opacity *= 0.975;
      if (rp.opacity < 0.005) return false;

      ctx.strokeStyle = `rgba(${color},${rp.opacity})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.stroke();

      // Second inner ring
      if (rp.r > 20) {
        ctx.strokeStyle = `rgba(${color},${rp.opacity * 0.5})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      }

      return true;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();
