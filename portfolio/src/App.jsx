import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["关于", "技能", "项目", "经历", "联系"];

const SKILLS = {
  "AI 产品能力": [
    { name: "Agent / Multi-Agent 架构", level: 95 },
    { name: "RAG 知识库设计", level: 92 },
    { name: "Prompt Engineering", level: 95 },
    { name: "LLM 产品化落地", level: 90 },
    { name: "AIGC 产品设计", level: 88 },
  ],
  "产品管理": [
    { name: "需求分析 / PRD 撰写", level: 96 },
    { name: "用户研究 / 竞品分析", level: 93 },
    { name: "产品路线图规划", level: 90 },
    { name: "数据驱动决策", level: 85 },
    { name: "跨团队协同", level: 92 },
  ],
  "设计 & 技术工具": [
    { name: "UI / 视觉设计", level: 93 },
    { name: "Figma / 高保真原型", level: 92 },
    { name: "Dify / LangGraph", level: 85 },
    { name: "Claude Code / Cursor", level: 82 },
    { name: "SD / Midjourney / Flux", level: 80 },
  ],
};

const PROJECTS = [
  {
    id: 1,
    name: "湾区通 · GBA Travel Assistant",
    period: "2024–2025",
    tags: ["Multi-Agent", "RAG", "旅游AI"],
    summary: "面向粤港澳大湾区的 AI 旅行规划助手，基于火山引擎（豆包）API 构建，设计 5 层多智能体架构（L0–L5，410+ Agents），系统提示词覆盖交通、景点、餐饮、购物、酒店、行程规划全域，配合 React Demo 与完整 PRD。",
    highlights: ["410+ Agents 多层编排", "5大知识库 RAG 架构", "意图识别准确率目标 ≥92%"],
    color: "#8B1A1A",
  },
  {
    id: 2,
    name: "HopeTrip AI 旅行规划助手",
    period: "2024.10–2025.06",
    tags: ["AI助手", "自然语言搜索", "行程生成"],
    summary: "主导 HopeTrip 平台 AI 能力从 0 到 1 产品化落地，定义自然语言搜索、AI 退改签决策助手、叙事式行程推荐三个方向，整合五大跨境巴士运营商资源，打造大湾区唯一深度接入全部五家运营商的垂直平台。",
    highlights: ["整合5大运营商", "搜索→下单压缩至3步", "搜索转化率目标提升 ≥15%"],
    color: "#8B1A1A",
  },
  {
    id: 3,
    name: "拾梦 AI · 古风同人内容创作平台",
    period: "2026.03–2026.04",
    tags: ["AIGC", "内容平台", "商业化"],
    summary: "面向古装剧粉丝与古风爱好者的 AI 内容创作平台，基于 455+ 条用户数据完成需求验证，设计免费生成 + 同人故事连载双留存机制，预测第 4–5 个月达盈亏平衡（月付费用户 3,500–4,000 人）。",
    highlights: ["455+条用户数据验证", "收藏/评论比3.76（均值0.5-1.0）", "预测月营收6–7万元"],
    color: "#8B1A1A",
  },
  {
    id: 4,
    name: "云脑 · 儿童认知训练系统",
    period: "2025.08–2026.02",
    tags: ["医疗AI", "B端SaaS", "儿童ADHD"],
    summary: "面向 3–12 岁儿童 ADHD 群体的数字化认知干预平台，构建评测—游戏化训练—脑波神经反馈—数据报告完整闭环，国内首个打通脑波+认知训练软硬一体化的产品，规划 50+ 款训练游戏，儿童满意度 4.6/5。",
    highlights: ["50+款训练游戏", "首年目标签约50家机构", "UI评审通过率100%"],
    color: "#8B1A1A",
  },
  {
    id: 5,
    name: "AI 提示词工程平台",
    period: "2025.01–2025.04",
    tags: ["Prompt工程", "LangChain", "企业工具"],
    summary: "面向专业提示词从业者的一体化平台，覆盖生成、优化迭代、效果评测、资产管理、RAG 知识库沉淀五大环节，采用 LangChain + qwen-max + 阿里云 Embedding + Chroma + BGE-Reranker 技术方案，设计 27 个埋点节点。",
    highlights: ["双库RAG检索策略", "27个数据埋点节点", "全团队提效落地"],
    color: "#8B1A1A",
  },
  {
    id: 6,
    name: "HKG 机场快线小程序",
    period: "2024.09–2024.12",
    tags: ["微信小程序", "跨境支付", "作品集"],
    summary: "专为大陆赴港旅客设计的机场快线购票微信小程序，解决支付隔离、语言障碍、发票缺失三大系统性摩擦，构建 TAM/SAM/SOM 三层市场模型，输出 BRD、PRD、MRD、用研报告、竞品分析完整文档体系。",
    highlights: ["香港年旅客量5310万人次", "大陆旅客占比75%", "完整6大文档交付"],
    color: "#8B1A1A",
  },
];

const HOPETRIP_PRODUCTS = {
  "通用系统": ["24-hopetrip APP（港版）", "供应商APP"],
  "小程序": ["港澳快线", "港澳快船", "西九文化区小程序", "香港机场快线", "香港太平山顶", "粤港快船", "中港直通巴", "中环摩天轮"],
  "OTA小程序": ["昂坪360缆车", "澳门开篷巴士", "港澳景点门票", "上葡京自助山", "维港游船", "香港观光巴士"],
  "合作项目": ["澳门開蓬觀光巴士", "港澳快線", "亚洲酒店小程序24年改版", "永东包车", "港澳七座车"],
};

const EXPERIENCES = [
  {
    company: "深圳市盼游国际旅行社",
    role: "AI 产品经理 & UI 设计师",
    period: "2019.10 — 2025.07",
    desc: "担任 AI 产品经理，独立承接从需求分析、信息架构、交互原型到视觉设计的全链路工作，直接向 CEO 汇报，支撑约 50 人团队的产品设计。基于用户咨询数据与客服工单分析，主动识别并定义自然语言搜索、退改签决策助手、个性化叙事式行程推荐三个 AI 集成方向，完成携程、同程、支付宝等主流平台竞品调研报告，为公司 AI 路线图立项提供依据，三项功能均已落地上线。同时承担产品经理与 UI 设计师双职能，覆盖信息架构、交互逻辑至视觉规范的完整链路，消除跨角色沟通损耗，有效压缩评审轮次与返工成本。在公司文档体系缺失的早期阶段，主动建立覆盖用户研究、竞品分析、PRD、MVP 计划书等的完整文档规范，持续沿用至今，显著提升跨团队协作效率。",
    tags: ["跨境旅游", "多产品线", "AI产品化", "0→1交付"],
  },
  {
    company: "深圳星系之力科技",
    role: "产品经理 & UI 设计师",
    period: "2013.07 — 2019.09",
    desc: "兼具产品经理与 UI 设计师双重能力，独立完成金融类产品从 0 到 1 全流程搭建，覆盖需求分析、信息架构、交互及视觉设计，支撑金融、区块链多条产品线，含 APP、钱包、官网等形态。从视觉设计转岗产品，独立完成竞品调研、用户旅程与核心原型设计，主导钱包支付、资产管理、数据可视化、金融游戏化等场景。负责核心模块定义，协同研发落地并把控视觉还原，以双职能优势提升沟通与项目并行效率。",
    tags: ["金融科技", "区块链", "角色转型", "双职能"],
  },
  {
    company: "深圳大学",
    role: "本科 · 视觉传达",
    period: "2023 — 2025",
    desc: "视觉传达设计专业，奠定了扎实的视觉设计与审美基础，为后续 PM + UI 双角色发展提供根基。",
    tags: ["视觉传达", "设计基础"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function SectionTitle({ zh, en, accent }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="mb-16" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all 0.7s cubic-bezier(.4,0,.2,1)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
        <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 600, color: "#1a1208", letterSpacing: "-0.5px" }}>{zh}</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(13px,1.5vw,16px)", color: "#b5a48a", letterSpacing: "3px", textTransform: "uppercase" }}>{en}</span>
      </div>
      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "32px", height: "2px", background: accent || "#C0392B" }} />
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent || "#C0392B" }} />
        <div style={{ flex: 1, height: "1px", background: "#e8e0d4" }} />
      </div>
    </div>
  );
}

function SkillBar({ name, level, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: "18px", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-16px)", transition: `all 0.6s cubic-bezier(.4,0,.2,1) ${delay}ms` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "13px", color: "#4a3f2f", letterSpacing: "0.3px" }}>{name}</span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: "#b5a48a" }}>{level}%</span>
      </div>
      <div style={{ height: "3px", background: "#ede7dc", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: inView ? `${level}%` : "0%", background: "linear-gradient(90deg, #C0392B, #e8625a)", borderRadius: "2px", transition: `width 1.2s cubic-bezier(.4,0,.2,1) ${delay + 200}ms` }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(32px)",
        transition: `all 0.7s cubic-bezier(.4,0,.2,1) ${index * 100}ms`,
        background: hovered ? "#fff" : "#faf8f4",
        border: `1px solid ${hovered ? "#C0392B" : "#e8e0d4"}`,
        borderRadius: "4px",
        padding: "28px 28px 24px",
        cursor: "default",
        boxShadow: hovered ? "0 8px 32px rgba(192,57,43,0.10)" : "0 1px 4px rgba(0,0,0,0.04)",
        transition2: "box-shadow 0.3s, border 0.3s, background 0.3s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <h3 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "17px", fontWeight: 600, color: "#1a1208", lineHeight: 1.4, margin: 0 }}>{project.name}</h3>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: "#b5a48a", whiteSpace: "nowrap", marginLeft: "12px", marginTop: "3px" }}>{project.period}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
        {project.tags.map(t => (
          <span key={t} style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "11px", padding: "2px 8px", border: "1px solid #C0392B", color: "#C0392B", borderRadius: "2px", letterSpacing: "0.3px" }}>{t}</span>
        ))}
      </div>
      <p style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "13px", lineHeight: 1.8, color: "#5a4e3e", margin: "0 0 14px" }}>{project.summary}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {project.highlights.map(h => (
          <span key={h} style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "12px", color: "#7a6a56", display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ width: "4px", height: "4px", background: "#C0392B", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("关于");
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id === "about" ? "关于" : id === "skills" ? "技能" : id === "projects" ? "项目" : id === "experience" ? "经历" : "联系");
  };

  const sectionMap = { "关于": "about", "技能": "skills", "项目": "projects", "经历": "experience", "联系": "contact" };

  return (
    <div style={{ fontFamily: "'Noto Sans SC', sans-serif", background: "#f7f4ee", minHeight: "100vh", color: "#1a1208" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f7f4ee; }
        ::-webkit-scrollbar-thumb { background: #C0392B; border-radius: 2px; }
        ::selection { background: rgba(192,57,43,0.15); }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(247,244,238,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e8e0d4" : "none",
        transition: "all 0.4s ease",
        padding: "0 max(24px, 5vw)",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "18px", fontWeight: 600, color: "#1a1208", letterSpacing: "1px" }}>闫宏斐</span>
          <div style={{ display: "flex", gap: "32px" }}>
            {NAV_ITEMS.map(item => (
              <button key={item} onClick={() => scrollTo(sectionMap[item])} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Noto Sans SC', sans-serif", fontSize: "13px",
                color: activeNav === item ? "#C0392B" : "#5a4e3e",
                letterSpacing: "1.5px",
                borderBottom: activeNav === item ? "1px solid #C0392B" : "1px solid transparent",
                paddingBottom: "2px",
                transition: "all 0.2s",
              }}>{item}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px max(24px,5vw) 60px", position: "relative", overflow: "hidden" }}>
        {/* Background decoration */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: "320px", height: "320px", border: "1px solid rgba(192,57,43,0.12)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "15%", right: "8%", width: "200px", height: "200px", border: "1px solid rgba(192,57,43,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "3%", width: "1px", height: "200px", background: "linear-gradient(180deg, transparent, rgba(192,57,43,0.2), transparent)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(40px)", transition: "all 1s cubic-bezier(.4,0,.2,1) 0.1s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ width: "32px", height: "1px", background: "#C0392B" }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "4px", color: "#C0392B", textTransform: "uppercase" }}>AI Product Manager</span>
            </div>
            <h1 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "clamp(48px,8vw,88px)", fontWeight: 700, lineHeight: 1.1, color: "#1a1208", marginBottom: "16px", letterSpacing: "-1px" }}>
              闫宏斐
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px,2.5vw,26px)", color: "#8a7a68", marginBottom: "32px", fontStyle: "italic", letterSpacing: "0.5px" }}>
              AI产品经理 · UI设计师 · AI实践者 · 13年经验
            </p>
            <p style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "clamp(14px,1.6vw,17px)", lineHeight: 1.9, color: "#5a4e3e", maxWidth: "580px", marginBottom: "48px" }}>
              拥有产品经理 + UI设计师双重背景，对 Agent、AIGC、大语言模型、RAG 有深入理解与实战经验，能将前沿 AI 技术有效转化为真实的产品价值。
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("projects")} style={{
                background: "#C0392B", color: "#fff", border: "none", padding: "14px 36px", borderRadius: "2px",
                fontFamily: "'Noto Sans SC', sans-serif", fontSize: "13px", letterSpacing: "2px", cursor: "pointer",
                transition: "all 0.2s",
              }}>查看项目</button>
              <button onClick={() => scrollTo("contact")} style={{
                background: "transparent", color: "#C0392B", border: "1px solid #C0392B", padding: "14px 36px", borderRadius: "2px",
                fontFamily: "'Noto Sans SC', sans-serif", fontSize: "13px", letterSpacing: "2px", cursor: "pointer",
                transition: "all 0.2s",
              }}>联系我</button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ marginTop: "80px", display: "grid", gridTemplateColumns: "repeat(4, auto)", justifyContent: "start", gap: "48px", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(20px)", transition: "all 1s cubic-bezier(.4,0,.2,1) 0.5s" }}>
            {[["13", "年工作经验"], ["20+", "产品线交付"], ["3", "AI产品方向"], ["6+", "年AI实践"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 300, color: "#C0392B", lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "12px", color: "#8a7a68", marginTop: "4px", letterSpacing: "1px" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px max(24px,5vw)", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle zh="关于我" en="About" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "15px", lineHeight: 2, color: "#4a3f2f", marginBottom: "20px" }}>
                拥有<strong style={{ color: "#C0392B" }}>产品经理 + UI 设计师</strong>双重背景，前视觉设计师出身，在约 50 人团队规模的跨境旅游平台，以一人之力支撑旗下二十余个产品线的全部产品设计工作，直接向 CEO 汇报。
              </p>
              <p style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "15px", lineHeight: 2, color: "#4a3f2f", marginBottom: "20px" }}>
                对 Agent、AIGC、大语言模型、RAG 有深入理解与实战经验，熟悉大语言模型原理、Prompt Engineering、RAG 知识库架构，能独立使用 Dify 搭建 Agent 工作流并快速验证产品原型。
              </p>
              <p style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "15px", lineHeight: 2, color: "#4a3f2f" }}>
                在微信公众号、人人都是产品经理等社区发表多篇行业深度文章，涵盖大模型训练超参数解析、AIGC 产品深度测评等议题，多篇文章上过首页推荐并被官方公众号转载。
              </p>
            </div>
            <div>
              <div style={{ background: "#f7f4ee", borderRadius: "4px", padding: "32px" }}>
                {[
                  ["求职意向", "AI 产品经理"],
                  ["工作经验", "13 年"],
                  ["联系方式", "363856804@qq.com"],
                  ["个人背景", "产品 + UI 双线"],
                  ["内容媒体", "AI产品经理一只"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", padding: "12px 0", borderBottom: "1px solid #e8e0d4" }}>
                    <span style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "12px", color: "#b5a48a", width: "80px", flexShrink: 0, letterSpacing: "1px", marginTop: "1px" }}>{k}</span>
                    <span style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "14px", color: "#1a1208", fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Agent 架构", "RAG 设计", "Prompt Engineering", "Dify", "LangGraph", "AIGC", "跨境旅游", "多产品线管理", "0→1 产品"].map(tag => (
                  <span key={tag} style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "12px", padding: "4px 12px", background: "#f7f4ee", border: "1px solid #e8e0d4", color: "#5a4e3e", borderRadius: "2px" }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px max(24px,5vw)", background: "#f7f4ee" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle zh="技能图谱" en="Skills" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px" }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat}>
                <h3 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "15px", fontWeight: 600, color: "#1a1208", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "6px", height: "6px", background: "#C0392B", borderRadius: "50%", display: "inline-block" }} />
                  {cat}
                </h3>
                {items.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 80} />)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px max(24px,5vw)", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle zh="项目经历" en="Projects" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "60px" }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>

          {/* HopeTrip Product Lines */}
          <div style={{ marginTop: "48px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <h3 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "18px", fontWeight: 600, color: "#1a1208" }}>盼游国际 · 全产品线</h3>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: "#b5a48a", fontStyle: "italic" }}>HopeTrip International — 20+ Products</span>
              <button onClick={() => setExpandedProducts(!expandedProducts)} style={{ background: "none", border: "1px solid #e8e0d4", borderRadius: "2px", padding: "4px 12px", cursor: "pointer", color: "#8a7a68", fontSize: "12px", fontFamily: "'Noto Sans SC', sans-serif", marginLeft: "auto" }}>
                {expandedProducts ? "收起" : "展开详情"}
              </button>
            </div>
            <p style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "13px", color: "#8a7a68", marginBottom: "20px", lineHeight: 1.8 }}>
              以一人之力独立完成旗下全部产品线的产品设计工作，覆盖通用系统、小程序、OTA 小程序、合作项目四大类别，累计独立交付项目超 20 个。
            </p>
            {expandedProducts && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                {Object.entries(HOPETRIP_PRODUCTS).map(([cat, items]) => (
                  <div key={cat} style={{ background: "#f7f4ee", borderRadius: "4px", padding: "24px" }}>
                    <h4 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "14px", fontWeight: 600, color: "#1a1208", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "4px", height: "4px", background: "#C0392B", borderRadius: "50%", display: "inline-block" }} />
                      {cat}
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {items.map(item => (
                        <span key={item} style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "12px", padding: "3px 10px", background: "#fff", border: "1px solid #e8e0d4", color: "#5a4e3e", borderRadius: "2px" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px max(24px,5vw)", background: "#f7f4ee" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionTitle zh="工作经历" en="Experience" />
          <div style={{ position: "relative" }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: "14px", top: "24px", bottom: "24px", width: "1px", background: "linear-gradient(180deg, #C0392B, #e8e0d4)" }} />
            {EXPERIENCES.map((exp, i) => {
              const [ref, inView] = useInView();
              return (
                <div key={exp.company} ref={ref} style={{ paddingLeft: "52px", paddingBottom: i < EXPERIENCES.length - 1 ? "48px" : 0, position: "relative", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-20px)", transition: `all 0.7s cubic-bezier(.4,0,.2,1) ${i * 150}ms` }}>
                  <div style={{ position: "absolute", left: "8px", top: "4px", width: "13px", height: "13px", border: "2px solid #C0392B", borderRadius: "50%", background: i === 0 ? "#C0392B" : "#f7f4ee" }} />
                  <div style={{ background: "#fff", borderRadius: "4px", padding: "28px 28px 24px", border: "1px solid #e8e0d4" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px", flexWrap: "wrap", gap: "8px" }}>
                      <div>
                        <h3 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "17px", fontWeight: 600, color: "#1a1208" }}>{exp.company}</h3>
                        <p style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "13px", color: "#C0392B", marginTop: "3px", letterSpacing: "0.5px" }}>{exp.role}</p>
                      </div>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: "#b5a48a", fontStyle: "italic" }}>{exp.period}</span>
                    </div>
                    <p style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "13px", lineHeight: 1.8, color: "#5a4e3e", margin: "14px 0" }}>{exp.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {exp.tags.map(t => (
                        <span key={t} style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "11px", padding: "2px 8px", background: "#f7f4ee", border: "1px solid #e8e0d4", color: "#7a6a56", borderRadius: "2px" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px max(24px,5vw)", background: "#1a1208" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "4px", color: "#C0392B", textTransform: "uppercase" }}>Get In Touch</span>
          </div>
          <h2 style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 600, color: "#f7f4ee", marginBottom: "16px" }}>期待与您合作</h2>
          <p style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "15px", lineHeight: 1.9, color: "#b5a48a", maxWidth: "480px", margin: "0 auto 48px" }}>
            正在寻找 AI 产品经理机会，欢迎有合适岗位的团队联系我。
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap", marginBottom: "48px" }}>
            {[["邮箱", "363856804@qq.com"], ["电话", "18234115369"], ["公众号 / 人人都是产品经理", "AI产品经理一只"]].map(([k, v]) => (
              <div key={k} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: "#5a4e3e", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>{k}</div>
                <div style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: "14px", color: "#f7f4ee" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ width: "48px", height: "1px", background: "#C0392B", margin: "0 auto" }} />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "24px max(24px,5vw)", background: "#140e05", textAlign: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: "#5a4e3e", letterSpacing: "2px" }}>
          © 2026 闫宏斐 · AI Product Manager
        </span>
      </footer>
    </div>
  );
}
