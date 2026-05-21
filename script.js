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
  'AI 时代，技术人的重新出发': {
    content: `<p>从 2012 年入行到现在，我的技术栈经历了几次大的变迁：Windows Mobile → iOS → Java 后端 → 现在的 AI 时代。每次变迁都伴随着焦虑，但也伴随着机会。</p>
<h3>技术栈的变迁</h3>
<p>刚入行时做的是 Windows Mobile 开发，那时候 Nokia 还活着。2012 年前后安卓和 iOS 开始崛起，我转到了 iOS。后来到了互联网公司做 Java 后端，一做就是七年多。现在回头看，每一次技术栈的切换都不是主动规划的，更多是顺势而为。</p>
<h3>AI 带来的冲击</h3>
<p>2024 年 ChatGPT 的出现让整个行业震动。我身边的同事有的焦虑，有的兴奋。我的感受是：<strong>AI 不会取代工程师，但会用 AI 的工程师会取代不会用的</strong>。</p>
<p>开始用 AI 辅助编程后，我的效率提升很明显。写代码、写文档、排查问题，AI 都能帮忙。但它不能帮你做架构决策，不能帮你理解业务，不能帮你带团队。</p>
<h3>我的选择</h3>
<p>与其焦虑被替代，不如主动拥抱。把 AI 当作工具，把省下来的时间用在更高层次的思考上：<strong>系统设计、团队管理、业务理解</strong>——这些是 AI 短期内替代不了的。</p>`
  },

  '从工程师到 Tech Lead：带团队的第一年': {
    content: `<p>2024 年，我开始带团队。从一个写代码的人，变成了要管人、管项目、管预期的人。这一年，我学到的比之前五年都多。</p>
<h3>最难的转变：从"做"到"让别人做"</h3>
<p>刚带团队时，看到组员写的代码不顺眼，总想自己上手改。后来意识到，这不是帮他，是害他。你改了，他永远不知道自己哪里有问题。<strong>忍住不写代码，是 Tech Lead 的第一课</strong>。</p>
<h3>三个核心能力</h3>
<ol>
<li><strong>任务拆解</strong>：把一个大需求拆成清晰的子任务，分配给合适的人，设定明确的截止时间</li>
<li><strong>代码审查</strong>：review 不是挑毛病，是教学。通过 review 传递编码规范和设计思路</li>
<li><strong>向上汇报</strong>：用老板听得懂的语言说技术的事。进展、风险、需要的支持，三句话讲清楚</li>
</ol>
<h3>踩过的坑</h3>
<p>有一次项目延期了，原因是我在分配任务时高估了组员的能力，也没有设中间检查点。从那以后，我养成了<strong>每周做一次进度同步</strong>的习惯，问题早发现早解决。</p>
<p>带团队最大的感悟：<strong>你的产出不再是代码，而是团队的产出</strong>。让每个人发挥最大价值，比自己写 1000 行代码更重要。</p>`
  },

  '职业转折：贵人引路': {
    content: `<p>2018 年下半年，一位之前的领导把我招到了现在的公司。这不是一次普通的跳槽，而是一次真正的职业转折。</p>
<h3>为什么说是转折</h3>
<p>之前在一家互联网公司做后端，做的事情不温不火。新公司给了我更大的平台、更复杂的系统、更有挑战的问题。从一个执行者，慢慢成长为能独当一面的人。</p>
<h3>贵人的意义</h3>
<p>回头看，职业生涯中最重要的几次机会，都和"人"有关。不是你投了多少简历，而是<strong>谁认识你、谁信任你、谁愿意给你机会</strong>。</p>
<p>所以我一直觉得：<strong>在职场中，口碑比简历重要</strong>。你做过什么、怎么做的、和人合作怎么样，这些信息会在圈子里传播。当你表现好的时候，机会自然会来。</p>
<h3>给后来者的建议</h3>
<ul>
<li>认真对待每一段工作经历，哪怕是不满意的公司</li>
<li>和靠谱的领导保持联系，不要断了人脉</li>
<li>跳槽不一定是最好的选择，有时候在对的平台上深耕更有价值</li>
</ul>`
  },

  '一封辞职邮件：离开舒适区': {
    content: `<p>2015 年，我在一家外包公司做了三年，做的事情是国外的项目——美国的、英国的。听起来很洋气，但实际问题是：<strong>技术太小众，市场上没人认识</strong>。</p>
<h3>问题在哪</h3>
<p>当时做的是 Windows Mobile 相关的开发，技术栈小众到什么程度呢？出去面试，面试官都没听说过你用的技术。没有竞争力，没有迁移性，简历上写了等于没写。</p>
<h3>那个冲动的决定</h3>
<p>有一天突然心血来潮，想出去看一看。面了几家公司，拿到了一个 offer。然后我做了一件现在想来挺冲动的事：<strong>直接给领导发了一封辞职邮件</strong>。</p>
<p>领导找我谈话，说时间不太合适，建议我再考虑考虑。他的建议是对的，但那时候年轻，就是想换。最终还是走了。</p>
<h3>这次经历教会我什么</h3>
<ul>
<li><strong>不要在一个没有成长性的岗位上待太久</strong>——舒适区待久了，竞争力会慢慢消失</li>
<li><strong>跳槽前想清楚方向</strong>——我那次跳得太冲动，方向不够清晰</li>
<li><strong>好领导的话要听</strong>——虽然当时没听，但后来明白他是为我好</li>
</ul>
<p>但我也不后悔。如果当时不走，可能后面也不会有后来的机会。<strong>有时候，行动本身就是答案</strong>。</p>`
  },

  '毕业季：实习让我提前进入职场': {
    content: `<p>2012 年大学毕业，但其实 2010 年暑假我就开始实习了。基本上大四就没怎么去上课了，直接泡在公司里。</p>
<h3>实习的起点</h3>
<p>去的是一家做国外项目的公司，美国的、英国的软件项目。岗位是实习软件工程师，做的事情是 Windows Mobile 上的应用开发。那时候安卓和 iOS 已经开始多了，但公司还有一些老项目在维护。</p>
<h3>英语好 = 多一个机会</h3>
<p>能拿到这个实习机会，英语好帮了大忙。公司做的是国外项目，文档全是英文，和客户沟通也用英语。面试的时候，面试官特别问了我的英语水平，直接说"我们优先选英语好的"。</p>
<p>这是第一次真切地感受到：<strong>英语不是一个考试科目，而是一个实实在在的竞争优势</strong>。</p>
<h3>从学生到工程师</h3>
<p>实习最大的收获不是技术，而是学会了<strong>怎么在一个团队里工作</strong>：怎么写代码别人能看懂、怎么沟通需求、怎么按时交付。这些东西，课堂上不教。</p>`
  },

  '大学教会我的最重要的事': {
    content: `<p>很多人说大学学的东西工作后用不上。对我来说，大学最重要的收获不是某个具体的知识点，而是一种思维方式。</p>
<h3>编程入门</h3>
<p>我们专业是管理学院的信息管理与信息系统，听起来和编程有关，但实际上大部分同学毕业以后都没做技术。我是少数走上编程这条路的人之一。</p>
<p>大学里编程算是入门水平，但这个"入门"给了我一个起点。后面所有的技术成长，都是在这个基础上一点点积累的。</p>
<h3>最重要的一课：不要焦虑</h3>
<p>大学里印象最深的一件事，是学生会组织一次安全动员会。我从来没搞过这种事，提前几个月就开始焦虑——要请辅导员、请老师、请各班的学长学长一起组织一次讲座。</p>
<p>焦虑了几个月，到跟前也就做了。效果还不错，参加的老师还专门跟我说组织得不错。</p>
<p>这件事教会我一个道理：<strong>焦虑是因为未知，做了就不焦虑了</strong>。后来工作中遇到没做过的事，我都会告诉自己：到跟前做了就好。</p>
<h3>大学的真实价值</h3>
<ul>
<li>给你一个起步的技能（对我来说是编程）</li>
<li>教会你和人相处（寝室六个人的故事够写一本书）</li>
<li>让你在相对安全的环境里犯错和成长</li>
</ul>`
  },

  '学生会的焦虑教会我一件事': {
    content: `<p>大一的时候加入了学生会的安检部，负责一些安全相关的组织工作。有一次接到了一个任务：组织一次运动会的安全动员会。</p>
<h3>提前几个月的焦虑</h3>
<p>我没搞过这种事。要请辅导员、请老师、组织各个班的同学来参加。一想到要在那么多人面前主持一场讲座，我就紧张得不行。</p>
<p>从接到任务那天起，就开始焦虑。脑子里反复演练各种出错的场景：人来得少了怎么办？老师不来怎么办？讲到一半忘词了怎么办？</p>
<h3>到跟前也就做了</h3>
<p>焦虑了几个月，到那天真的来了，也就做了。准备了讲稿，提前踩了点，把流程走了几遍。当天的效果比预期好很多，参加的老师还专门跟我说：组织得不错。</p>
<p>那一刻我突然明白了：<strong>焦虑的本质是对未知的恐惧，而消除恐惧最好的方式就是去做</strong>。</p>
<h3>这个道理影响了我整个职业生涯</h3>
<p>后来工作中遇到没做过的事——第一次做技术方案评审、第一次给领导汇报、第一次带项目——我都会想起那次动员会。告诉自己：到跟前做了就好。</p>
<p><strong>焦虑不会帮你准备得更好，行动才会。</strong></p>`
  },

  '那次醉酒，让我记住了自己的底线': {
    content: `<p>大一的时候，寝室六个同学决定去旁边学校附近的一个农家乐聚餐。我们带了两瓶白酒——一瓶 45 度，一瓶 54 度。</p>
<h3>年少轻狂</h3>
<p>那个年纪，谁都不服谁，觉得自己的酒量天下无敌。两瓶白酒，六个人分着喝，45 度和 54 度混着来。后果可想而知。</p>
<p>后来的事我记不太清了，只记得从农家乐出来以后，走到旁边的湖边就倒下了。据室友说，他们几个人费了好大劲才把我弄回去。</p>
<h3>毕业那天更惨</h3>
<p>如果说大一那次只是倒下，毕业那年那次才是真正的"名场面"。喝白酒喝坏了，直接钻到桌子下面，完全人事不省。后来看照片才知道，别人把烟塞到我鼻孔里，我完全不知道。</p>
<p>还有一件事更经典——一个同学过生日（应该是大一的时候），他喝醉了，还飙英语，说什么 "do you feel my heart"，语法当然是一塌糊涂。回去的时候三四个人背着他，一个人背着，几个人在后面扶着。路过的人看了都说："快看，好壮观啊！"</p>
<h3>底线</h3>
<p>这两次经历让我彻底明白了自己的底线：<strong>酒可以喝，但要知道什么时候停</strong>。后来我再也没喝到那种程度过。</p>
<p>人生中很多道理，不是别人告诉你就能学会的。得自己摔一次，才能真正记住。</p>`
  },

  '大学：从农村到城市的第一次冲击': {
    content: `<p>2008 年 9 月，我从农村来到城市上大学。专业是信息管理与信息系统，在一所大学的管理学院。</p>
<h3>那双布鞋</h3>
<p>入学那天，我穿着一双山东鲁泰的布鞋。不是因为买不起别的鞋，就是觉得穿着舒服。进了寝室，之前报到的学长来串门卖报纸，看了看我的鞋，很直接地跟我说："同学，你这个鞋子不行，换一双吧。"</p>
<p>那一刻我才意识到，原来穿什么鞋子，在城市里是一件"重要"的事。在老家，没人在意你穿什么。</p>
<h3>新鲜感和落差感</h3>
<p>刚来的时候什么都是新鲜的：校园比老家的中学大十倍，食堂有十几个窗口，图书馆里的书多到看不完。室友来自五湖四海，说的话、习惯的东西都不一样。</p>
<p>但新鲜感过后是落差感。城市里的同学见识广、条件好、说话做事都带着一种自信。而我，连坐公交车都得现学怎么刷卡。</p>
<h3>这段经历的意义</h3>
<p>回头看，这次"冲击"反而是好事。它让我很早就明白了一个道理：<strong>你来自哪里不重要，重要的是你往哪里走</strong>。</p>
<p>那双布鞋我后来确实换了，但那种"不在乎别人怎么看，只在乎自己怎么活"的心态，一直留到了今天。</p>`
  },

  'Think in Java：英文原版书的起点': {
    content: `<p>大学毕业那年左右，我买了一本书：<em>Thinking in Java</em>（Java 编程思想），全英文版。对我来说，这是一个重要的转折点。</p>
<h3>为什么买英文版</h3>
<p>说实话，当时不是因为英语好才买英文版的。是因为中文翻译版太贵了，英文版反而便宜一些。但买回来以后，发现读英文原版和读翻译版完全是两回事。</p>
<p>翻译版经常有表达不准确的地方，有些技术概念翻译过来反而更难理解。而原版书的表达更直接、更准确，读多了以后，你会发现自己开始"用英文思考"技术问题了。</p>
<h3>养成的习惯</h3>
<p>从那以后，我买技术书尽量都买英文版。从 Java 到框架到架构，能买原版的就买原版。一开始读得很慢，查字典的时间比看书的时间还长。但慢慢地，速度就上来了。</p>
<p>这个习惯一直保持到现在。电脑的默认语言也是英文，所有技术文档、Stack Overflow、GitHub 都是英文界面。</p>
<h3>英语和技术的关系</h3>
<p>很多人觉得英语和技术是两件不相干的事。对我来说，它们是<strong>互相促进</strong>的：</p>
<ul>
<li>读英文技术文档，提升英语阅读能力</li>
<li>英语好，能第一时间获取最新的技术资讯</li>
<li>写英文 commit message 和文档，提升英文写作能力</li>
</ul>
<p><strong>英语不是目的，是工具。但这个工具，会帮你打开很多门。</strong></p>`
  },

  '英语：从鹏程书店到今天': {
    content: `<p>我的英语学习经历，要从高一说起。那时候在高中学校附近有一个书店，叫鹏程书店。有一天，我在里面翻到了一套李阳疯狂英语的教材——一本书，三盒磁带。</p>
<h3>鹏程书店的那套磁带</h3>
<p>那是我第一次听到"地道"的英语。磁带里的声音、节奏、语调，对我来说完全是另一个世界。那种大声朗读、反复跟读的练习方式也非常新鲜。</p>
<p>现在我还记得很多那套教材里的句子。那种冲击感，是课本和考试给不了的。</p>
<h3>高中：英语成为强项</h3>
<p>从高二开始，英语一直是我的强项。高二高三虽然学业压力大、过得很压抑，但英语一直没有落下，相比其他同学做得还不错。</p>
<p>秘诀很简单：<strong>每天坚持读和听，不求量大，但不间断</strong>。</p>
<h3>大学：从考试到应用</h3>
<p>大学里英语从"考试科目"变成了"实用工具"。读英文原版书、看英文技术文档、实习时和国外客户沟通。英语好让我在找实习时被优先选中。</p>
<h3>工作后：英语是默认语言</h3>
<p>到现在，我的电脑系统语言是英文，手机也是英文。每天的英语习惯包括：</p>
<ul>
<li>读英文文章或书（技术类和非技术类都读）</li>
<li>练一下口语，保持语感</li>
<li>技术文档和代码注释尽量用英文写</li>
</ul>
<h3>最重要的经验</h3>
<p>英语学习没有捷径，但有一个关键：<strong>把英语变成你生活的一部分，而不是一个需要"额外花时间"的任务</strong>。当你的电脑是英文、你的技术文档是英文、你读的书是英文的时候，你不需要"学"英语，你在"用"英语。</p>`
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

// Bind click on timeline cards (event delegation)
const timeline = document.querySelector('.timeline');
if (timeline) {
  timeline.addEventListener('click', (e) => {
    const card = e.target.closest('.tl-card');
    if (!card) return;
    const item = card.closest('.tl-item');
    if (!item) return;
    const titleEl = item.querySelector('.card-title');
    if (!titleEl) return;
    const title = titleEl.textContent.trim();
    const category = item.dataset.category;
    const dateEl = item.querySelector('.tl-month');
    const dayEl = item.querySelector('.tl-day');
    const date = dateEl && dateEl.textContent ? `${dateEl.textContent}.${dayEl.textContent}` : dayEl.textContent;
    const article = articles[title];
    if (article) {
      openDrawer(title, category, date, article.content);
    } else {
      console.warn('Article not found:', title, 'Available:', Object.keys(articles));
    }
  });
} else {
  console.error('Timeline element not found');
}

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
