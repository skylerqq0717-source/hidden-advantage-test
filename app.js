const DRAFT_KEY = "hidden-advantage-draft-v2";

const dimensions = {
  D1: { name: "洞察拆解", tip: "你是否习惯先看见问题的骨架，再决定怎么解决？", color: "#ed836d" },
  D2: { name: "学习整合", tip: "你能不能把学到的东西，带到下一个新问题里？", color: "#e4b66e" },
  D3: { name: "表达影响", tip: "你能不能让一个好想法被别人听懂、记住并行动？", color: "#8cb8ad" },
  D4: { name: "关系连接", tip: "你是否能听见话语背后的情绪和顾虑？", color: "#b39ac7" },
  D5: { name: "组织执行", tip: "你能不能把模糊想法推进成一个可用的结果？", color: "#86a9cb" },
  D6: { name: "创意适应", tip: "当旧办法不够好时，你会不会试出另一条路？", color: "#e29a70" }
};

const questions = [
  ["D1", "面对一句“帮我把这个做好”的模糊要求，我会先追问目标、对象和交付标准。"],
  ["D1", "在工作群或家庭群信息很多时，我能较快抓住真正需要解决的那一件事。"],
  ["D1", "看到一个受欢迎的产品或账号，我会自然去琢磨它为什么有效。"],
  ["D1", "遇到互相矛盾的说法，我会区分事实、推测和情绪，再做判断。"],
  ["D1", "我能把一段很乱的聊天整理成清晰的下一步行动。"],
  ["D1", "事情出了问题时，我更想找到流程中的卡点，而不是先找责任人。"],
  ["D1", "面对复杂问题，我通常能提出几个有顺序的排查路径。"],
  ["D1", "我经常在还没搞清楚背景前，就急着给出结论。", true],
  ["D2", "学新工具时，我会先弄懂“从输入到结果”的完整流程。"],
  ["D2", "我能用自己的话把一个刚学会的概念讲给完全不了解的人。"],
  ["D2", "我会把一个领域的经验迁移到另一个领域，比如把做饭流程用到项目管理。"],
  ["D2", "收到具体反馈后，我会调整方法，而不只是纠结自己被否定。"],
  ["D2", "我常因为好奇，主动查资料把一个问题追到更深。"],
  ["D2", "当教程很多、质量参差不齐时，我能筛选出值得信任的学习材料。"],
  ["D2", "接到陌生任务时，我会先做一个小实验，而不是等全部想明白再开始。"],
  ["D2", "一旦第一次尝试不顺，我通常就不想再学了。", true],
  ["D3", "开会或讨论时，我通常能先说结论，再补充理由。"],
  ["D3", "我能把复杂信息整理成别人一看就明白的表达。"],
  ["D3", "我提出建议时，会根据对方真正关心的点调整说法。"],
  ["D3", "需要别人配合时，我能讲清楚为什么需要，以及具体希望对方做什么。"],
  ["D3", "意见僵持时，我能把双方分歧重新表述成一个可讨论的问题。"],
  ["D3", "即使没有正式准备，我也能比较自然地介绍自己的项目或想法。"],
  ["D3", "我能把一段普通经历讲出起因、转折和结果。"],
  ["D3", "我脑子里想得很清楚，但经常讲出来别人还是听不懂。", true],
  ["D4", "我能察觉到对方语气或状态的变化，即使对方没有明说。"],
  ["D4", "面对不同年龄或背景的人，我会主动调整解释方式。"],
  ["D4", "冲突发生时，我能先复述对方的担忧，再说自己的立场。"],
  ["D4", "别人遇到选择或难题时，愿意来听听我的看法。"],
  ["D4", "在小组合作中，我会留意有没有人一直没有被听见。"],
  ["D4", "我能在拒绝别人时把边界说清楚，同时尽量不让对方难堪。"],
  ["D4", "和客户或同事沟通后，我常能说出对方没有直接讲出的顾虑。"],
  ["D4", "别人一开口，我就急着给方案，很少先把对方听完。", true],
  ["D5", "任务一多时，我会先排优先级，而不是谁催得急就先做谁。"],
  ["D5", "我答应的事情通常会记下来，并在可能延期前提前说明。"],
  ["D5", "面对大任务，我能把第一步拆到今天就能开始。"],
  ["D5", "即使没有人盯着，我也能把重要但枯燥的事情做完。"],
  ["D5", "我有一套自己能够长期坚持的文件、日程或待办管理方式。"],
  ["D5", "需求临时改变时，我能较快地重新安排下一步。"],
  ["D5", "对一个新想法，我通常能先做出一个可用的最小版本。"],
  ["D5", "我经常同时开很多头，最后留下不少没收尾的事情。", true],
  ["D6", "日常生活中遇到不顺手的流程，我会忍不住想“能不能换一种做法”。"],
  ["D6", "面对同一个目标，我通常能想出两种以上的实现路径。"],
  ["D6", "我喜欢把现成的工具或资源重新组合，做出新的用法。"],
  ["D6", "我愿意先发布一个小范围可用版本，再根据反馈改进。"],
  ["D6", "当目标人群改变时，我能重新设计表达方式或产品形式。"],
  ["D6", "计划被打乱时，我通常还能从限制条件里找到新的可能。"],
  ["D6", "我能把自己的经历提炼成对别人有用的内容或方法。"],
  ["D6", "即使原来的办法已经不太有效，我也更愿意继续照旧。", true]
];

const resultTypes = {
  D1: {
    name: "线索猎手", combo: "洞察拆解型", slogan: "别人看到一团乱，你先看到了问题的骨架。",
    mechanism: "你习惯先把问题重新定义，再寻找解决办法。",
    scene: "当工作群信息混在一起、需求说不清楚或事情出了岔子时，你往往能找到真正的卡点。",
    blindspot: "容易分析太久，迟迟不开始行动；也可能因为看见问题太多，而显得不够乐观。",
    experiment: "找一个最近觉得混乱的问题，用一页纸写出“目标—现状—卡点—三个可能方案—下一步”。"
  },
  D2: {
    name: "知识炼金师", combo: "学习整合型", slogan: "你不是单纯记得快，而是会把旧知识变成新解法。",
    mechanism: "你擅长理解底层逻辑，并把一个领域的经验迁移到另一个问题。",
    scene: "你可能不是每个领域都最专业，但容易把零散经验拼成一套自己的方法。",
    blindspot: "容易沉迷学习和准备，知识越来越多，但作品和结果没有同步增加。",
    experiment: "选一个最近收藏的教程，今天只做一个最小练习，并把它讲给一个完全不了解的人。"
  },
  D3: {
    name: "表达放大器", combo: "表达影响型", slogan: "你能把脑中的好东西，变成别人愿意听懂、记住并行动的东西。",
    mechanism: "你会根据受众的关心点重新组织信息，而不是只把自己的想法倒出去。",
    scene: "你适合把复杂内容讲清楚，把普通经历讲出重点，也比较容易推动共识。",
    blindspot: "容易过度关注别人是否喜欢，或者表达很多，却没有真正推进事情。",
    experiment: "把一个最近学到的东西写成 100 字版本，只保留一个结论、一个例子和一个行动建议。"
  },
  D4: {
    name: "人心连接者", combo: "关系连接型", slogan: "你读懂的常常不只是对方说了什么，还有对方为什么这样说。",
    mechanism: "你会留意语气、顾虑和关系中的微妙变化，因此更容易建立信任。",
    scene: "别人遇到选择、冲突或情绪问题时，可能会愿意来听听你的看法。",
    blindspot: "容易照顾别人太多，忽略自己的边界；也可能为了维持关系而迟迟不表达不同意见。",
    experiment: "下一次有人向你倾诉时，先问两个澄清问题，再给建议，观察对方真正需要的是什么。"
  },
  D5: {
    name: "可靠推进器", combo: "组织执行型", slogan: "灵感很多的人不少，能把事情推进到落地的人很稀缺。",
    mechanism: "你擅长把模糊目标拆成步骤，把承诺变成进度，把想法做成可用版本。",
    scene: "你可能不是团队里最会讲的人，但常常是让事情真正往前走的人。",
    blindspot: "容易承担过多责任，也可能过度追求可控，面对不确定性时不够愿意试错。",
    experiment: "从一个拖延中的项目里删掉 80% 的复杂要求，只做一个今天可以交付的最小版本。"
  },
  D6: {
    name: "可能性实验家", combo: "创意适应型", slogan: "你擅长从“不顺手”里找到新做法。",
    mechanism: "你容易注意到日常中的不合理，并愿意用小实验验证另一条路径。",
    scene: "你适合处理新项目、内容创意和没有现成答案的问题。",
    blindspot: "容易被新鲜感吸引，开始很多项目，却缺少持续打磨和收尾。",
    experiment: "找一个每天觉得麻烦的流程，设计一个更省一步的版本，并让一个真实的人试用。"
  }
};

const comboNames = {
  "D1-D2": ["深挖型成长者", "你会把问题追到底，再把经验带到新领域。"],
  "D1-D3": ["复杂问题翻译官", "你擅长把别人说不清的事变成可理解的方案。"],
  "D1-D4": ["共情型洞察家", "你既能看见问题，也能看见问题背后的人。"],
  "D1-D5": ["问题解决推进器", "你不只发现卡点，还会推动它被解决。"],
  "D1-D6": ["新解实验家", "你擅长发现旧方法失效，并试出新路径。"],
  "D2-D3": ["知识传播者", "你能把学到的东西变成别人愿意吸收的内容。"],
  "D2-D4": ["教练型伙伴", "你擅长理解别人，并帮助别人建立自己的方法。"],
  "D2-D5": ["学以致用派", "你不会只收藏资料，而是能把知识变成结果。"],
  "D2-D6": ["跨界造物者", "你总能把不同领域的东西重新组合。"],
  "D3-D4": ["人群影响者", "你能让别人听懂，也能让别人愿意相信。"],
  "D3-D5": ["项目带动者", "你能把想法讲出去，也能把人组织起来。"],
  "D3-D6": ["内容产品化者", "你擅长把创意包装成别人愿意消费的内容。"],
  "D4-D5": ["团队稳定器", "你让合作关系更顺，也让事情更稳地推进。"],
  "D4-D6": ["社群点火者", "你能把人的兴趣和情绪变成行动。"],
  "D5-D6": ["从0到1造物者", "你擅长把一个模糊念头做成第一个可用版本。"]
};

const characterProfiles = {
  MULTI: {
    name: "万花筒猫",
    label: "场景切换型多面手",
    note: "随场景切换武器，既能观察全局，也能马上换一种做法。",
    species: "cat",
    motion: "orbit",
    body: "#f3b65f",
    accent: "#ed836d",
    shadow: "#8f5d59",
    prop: "kaleidoscope"
  },
  "D1-D2": {
    name: "探矿猫",
    label: "深挖型成长者",
    note: "先找到问题的矿脉，再把挖到的经验带去下一个领域。",
    species: "cat",
    motion: "float",
    body: "#8ca7b7",
    accent: "#e4b66e",
    shadow: "#536c78",
    prop: "magnifier"
  },
  "D1-D3": {
    name: "纸飞机狐",
    label: "复杂问题翻译官",
    note: "把一团乱麻折成别人一看就懂、还能接住的下一步。",
    species: "fox",
    motion: "sway",
    body: "#ed836d",
    accent: "#f6d39a",
    shadow: "#a84f4a",
    prop: "paper"
  },
  "D1-D4": {
    name: "月光鹿",
    label: "共情型洞察家",
    note: "一边看见问题的骨架，一边听见人心里没有说出口的部分。",
    species: "deer",
    motion: "float",
    body: "#c8a9cf",
    accent: "#8cb8ad",
    shadow: "#795e80",
    prop: "moon"
  },
  "D1-D5": {
    name: "修路熊",
    label: "问题解决推进器",
    note: "发现卡点之后，马上把路标、工具和第一步都安排好。",
    species: "bear",
    motion: "bounce",
    body: "#c28b68",
    accent: "#86a9cb",
    shadow: "#795040",
    prop: "toolbelt"
  },
  "D1-D6": {
    name: "机关鼹鼠",
    label: "新解实验家",
    note: "旧路堵住时，你会钻到问题底下，摸出一条新通道。",
    species: "mole",
    motion: "peek",
    body: "#9a7d91",
    accent: "#e29a70",
    shadow: "#5f4c5b",
    prop: "gear"
  },
  "D2-D3": {
    name: "星尘鹦鹉",
    label: "知识传播者",
    note: "把刚学会的东西重新编排成别人愿意听、记得住的故事。",
    species: "parrot",
    motion: "wing",
    body: "#78b7ad",
    accent: "#e4b66e",
    shadow: "#39776f",
    prop: "radio"
  },
  "D2-D4": {
    name: "茶杯水獭",
    label: "教练型伙伴",
    note: "先接住对方，再陪对方把自己的方法慢慢长出来。",
    species: "otter",
    motion: "sway",
    body: "#a98573",
    accent: "#e9c3a1",
    shadow: "#705146",
    prop: "heart"
  },
  "D2-D5": {
    name: "工坊河狸",
    label: "学以致用派",
    note: "不把知识放在收藏夹里，而是马上做成能用的工具。",
    species: "beaver",
    motion: "hammer",
    body: "#b9784f",
    accent: "#86a9cb",
    shadow: "#704534",
    prop: "books"
  },
  "D2-D6": {
    name: "拼图变色龙",
    label: "跨界造物者",
    note: "把不同领域的零件拼在一起，做出原本没有的用法。",
    species: "chameleon",
    motion: "orbit",
    body: "#86b99c",
    accent: "#d88bd2",
    shadow: "#4e8068",
    prop: "puzzle"
  },
  "D3-D4": {
    name: "麦克风小鸟",
    label: "人群影响者",
    note: "让别人听懂你的话，也让别人愿意把心里的门打开。",
    species: "bird",
    motion: "wing",
    body: "#80a9d0",
    accent: "#ed836d",
    shadow: "#4e6d91",
    prop: "megaphone"
  },
  "D3-D5": {
    name: "指挥企鹅",
    label: "项目带动者",
    note: "把想法说清楚，把人聚起来，再把节奏稳稳往前带。",
    species: "penguin",
    motion: "bounce",
    body: "#345c67",
    accent: "#e4b66e",
    shadow: "#193b43",
    prop: "flag"
  },
  "D3-D6": {
    name: "霓虹狐",
    label: "内容产品化者",
    note: "给创意装上好看的外壳，也给它找到真实的使用场景。",
    species: "fox",
    motion: "sway",
    body: "#e18a67",
    accent: "#9c82d8",
    shadow: "#9a5047",
    prop: "palette"
  },
  "D4-D5": {
    name: "围巾大象",
    label: "团队稳定器",
    note: "让每个人都被看见，也让合作不至于在细节里散掉。",
    species: "elephant",
    motion: "float",
    body: "#9da8ba",
    accent: "#ed836d",
    shadow: "#657081",
    prop: "scarf"
  },
  "D4-D6": {
    name: "火花小羊",
    label: "社群点火者",
    note: "把人的兴趣和情绪接成一条线，让“想做”变成“现在就做”。",
    species: "sheep",
    motion: "spark",
    body: "#e8d7bc",
    accent: "#ed836d",
    shadow: "#a88f78",
    prop: "spark"
  },
  "D5-D6": {
    name: "纸箱机器人",
    label: "从0到1造物者",
    note: "不等完美图纸，先把第一个能工作的版本做出来。",
    species: "robot",
    motion: "rocket",
    body: "#86a9cb",
    accent: "#e4b66e",
    shadow: "#4d718f",
    prop: "rocket"
  }
};

function characterHead(profile) {
  const fill = profile.body;
  const shadow = profile.shadow;
  switch (profile.species) {
    case "fox": return `<path fill="${fill}" d="M85 92 52 42l8 72c12-12 24-19 35-22Zm130 0 33-50-8 72c-12-12-24-19-35-22Z"/><path fill="${shadow}" d="m60 42 25 42-25 18Zm180 0-25 42 25 18Z"/><path fill="${fill}" d="M83 86c0-43 27-66 67-66s67 23 67 66-25 78-67 78-67-35-67-78Z"/>`;
    case "deer": return `<path fill="${shadow}" d="M88 57 67 24m20 29L57 36m145 21 21-33m-20 28 30-20" stroke="${shadow}" stroke-width="9" stroke-linecap="round" fill="none"/><path fill="${fill}" d="M85 92c0-42 28-68 65-68s65 26 65 68-24 72-65 72-65-30-65-72Z"/>`;
    case "bear": return `<circle fill="${fill}" cx="88" cy="55" r="28"/><circle fill="${fill}" cx="212" cy="55" r="28"/><circle fill="${shadow}" cx="88" cy="55" r="12"/><circle fill="${shadow}" cx="212" cy="55" r="12"/><path fill="${fill}" d="M75 92c0-42 29-68 75-68s75 26 75 68-28 72-75 72-75-30-75-72Z"/>`;
    case "mole": return `<path fill="${fill}" d="M75 93c0-45 30-69 75-69s75 24 75 69-31 71-75 71-75-26-75-71Z"/><path fill="${shadow}" d="M120 36c10-21 50-21 60 0-21 11-39 11-60 0Z"/>`;
    case "parrot": return `<path fill="${fill}" d="M82 100c-5-51 22-76 62-76 48 0 73 31 67 78-5 43-32 64-70 64-36 0-55-23-59-66Z"/><path fill="${profile.accent}" d="M196 51c35 12 40 35 17 56l-28-18Z"/><path fill="${shadow}" d="M106 29c-2-21 22-32 34-12l-16 22Z"/>`;
    case "otter": return `<circle fill="${fill}" cx="88" cy="58" r="26"/><circle fill="${fill}" cx="212" cy="58" r="26"/><path fill="${fill}" d="M75 94c0-42 29-70 75-70s75 28 75 70-30 70-75 70-75-28-75-70Z"/><path fill="${shadow}" d="M133 106c9-8 25-8 34 0-1 19-33 19-34 0Z"/>`;
    case "beaver": return `<path fill="${fill}" d="M78 93c0-43 29-69 72-69s72 26 72 69-29 72-72 72-72-29-72-72Z"/><path fill="${shadow}" d="M80 122 57 151l33 15 21-27Zm160 0 23 29-33 15-21-27Z"/>`;
    case "chameleon": return `<path fill="${fill}" d="M75 93c0-43 29-69 75-69s75 26 75 69-29 72-75 72-75-29-75-72Z"/><path fill="none" stroke="${profile.accent}" stroke-width="13" stroke-linecap="round" d="M214 36c32-26 50 16 19 26-20 7-23-12-8-17"/>`;
    case "bird": return `<path fill="${fill}" d="M75 93c0-46 30-69 75-69s75 23 75 69-30 72-75 72-75-26-75-72Z"/><path fill="${profile.accent}" d="m216 88 51 20-51 20Z"/><path fill="${shadow}" d="M114 27c4-25 32-28 43-7l-19 19Z"/>`;
    case "penguin": return `<path fill="${fill}" d="M75 94c0-45 28-70 75-70s75 25 75 70-28 71-75 71-75-26-75-71Z"/><path fill="#f7f0e6" d="M105 111c0-34 18-51 45-51s45 17 45 51-18 45-45 45-45-11-45-45Z"/><path fill="${profile.accent}" d="m150 105-12 12 12 11 12-11Z"/>`;
    case "elephant": return `<path fill="${fill}" d="M70 95c0-44 31-71 80-71s80 27 80 71-31 70-80 70-80-26-80-70Z"/><path fill="${fill}" d="M83 106c-48-19-60 31-28 47 28 13 49-5 50-23"/><path fill="${shadow}" d="M227 108c42 3 51 28 30 45-23 18-44 2-43-20"/>`;
    case "sheep": return `<path fill="${fill}" d="M77 93c0-44 30-70 73-70s73 26 73 70-29 71-73 71-73-27-73-71Z"/><circle fill="${fill}" cx="77" cy="69" r="23"/><circle fill="${fill}" cx="223" cy="69" r="23"/><path fill="${shadow}" d="M104 39c10-19 25-25 38-10 13-15 28-9 38 10-24 11-52 11-76 0Z"/>`;
    case "robot": return `<rect fill="${fill}" x="71" y="25" width="158" height="141" rx="38"/><path fill="${shadow}" d="M150 25V6" stroke="${shadow}" stroke-width="9" stroke-linecap="round"/><circle fill="${profile.accent}" cx="150" cy="5" r="10"/><rect fill="#f7f0e6" x="91" y="52" width="118" height="63" rx="25"/>`;
    default: return `<path fill="${fill}" d="M75 92c0-43 29-68 75-68s75 25 75 68-29 72-75 72-75-29-75-72Z"/><path fill="${fill}" d="M87 65 57 28l8 70Zm126 0 30-37-8 70Z"/>`;
  }
}

function characterProp(profile) {
  const a = profile.accent;
  const s = profile.shadow;
  const props = {
    magnifier: `<g class="character-prop"><circle cx="232" cy="190" r="25" fill="none" stroke="${a}" stroke-width="10"/><path d="m250 208 27 27" stroke="${s}" stroke-width="11" stroke-linecap="round"/></g>`,
    paper: `<g class="character-prop"><path fill="${a}" d="m221 168 71 20-45 57-25-77Z"/><path d="m235 184 35 13-28 9" fill="none" stroke="${s}" stroke-width="6" stroke-linecap="round"/></g>`,
    moon: `<g class="character-prop"><path fill="${a}" d="M240 170c-30 11-29 55 4 62-39 13-59-48-23-66 7-4 13-3 19 4Z"/></g>`,
    toolbelt: `<g class="character-prop"><path d="M65 183h170" stroke="${a}" stroke-width="14" stroke-linecap="round"/><path fill="${s}" d="m108 179 17-20 17 20v25h-34Zm50 0 17-20 17 20v25h-34Z"/></g>`,
    gear: `<g class="character-prop"><circle fill="${a}" cx="236" cy="195" r="29"/><circle fill="${s}" cx="236" cy="195" r="10"/><path d="M236 158v14m0 45v14m37-36h-14m-45 0h-14" stroke="${s}" stroke-width="8" stroke-linecap="round"/></g>`,
    radio: `<g class="character-prop"><rect fill="${a}" x="211" y="164" width="67" height="49" rx="12"/><circle fill="${s}" cx="231" cy="188" r="10"/><path d="M250 181h18m-18 13h18M229 161l-10-26" stroke="${s}" stroke-width="6" stroke-linecap="round"/></g>`,
    heart: `<g class="character-prop"><path fill="${a}" d="M246 171c-22-24-59 4 0 53 59-49 22-77 0-53Z"/></g>`,
    books: `<g class="character-prop"><rect fill="${a}" x="210" y="183" width="77" height="19" rx="5" transform="rotate(-10 210 183)"/><rect fill="${s}" x="214" y="202" width="75" height="19" rx="5" transform="rotate(8 214 202)"/><path d="M224 185h45m-38 26h43" stroke="#f7f0e6" stroke-width="4" stroke-linecap="round"/></g>`,
    puzzle: `<g class="character-prop"><path fill="${a}" d="M217 170h30c-6 18 24 17 18 0h27v29c-18-6-18 24 0 18v28h-30c7-19-24-19-18 0h-27v-29c18 7 18-24 0-18Z"/></g>`,
    megaphone: `<g class="character-prop"><path fill="${a}" d="m216 178 68-25v69l-68-25Z"/><path d="m216 183-16-8v28l16-6m-1 21 13 23" fill="none" stroke="${s}" stroke-width="8" stroke-linecap="round"/></g>`,
    flag: `<g class="character-prop"><path d="M230 158v80" stroke="${s}" stroke-width="8" stroke-linecap="round"/><path fill="${a}" d="M234 162h59l-20 23 20 22h-59Z"/></g>`,
    palette: `<g class="character-prop"><path fill="${a}" d="M238 170c-35-9-61 24-43 52 10 16 29 16 40 4 11-13 24 10 39-13 17-28-9-39-36-43Z"/><circle fill="${s}" cx="223" cy="198" r="6"/><circle fill="${s}" cx="244" cy="184" r="6"/><circle fill="${s}" cx="263" cy="196" r="6"/></g>`,
    scarf: `<g class="character-prop"><path fill="${a}" d="M76 159c40 18 108 18 148 0v24c-41 20-107 20-148 0Z"/><path fill="${a}" d="M190 179h29l-1 63-27-15Z"/></g>`,
    spark: `<g class="character-prop"><path fill="${a}" d="m250 160 8 25 26 3-20 17 6 27-21-14-23 14 8-27-20-17 27-3Z"/></g>`,
    rocket: `<g class="character-prop"><path fill="${a}" d="M247 157c28 14 34 44 12 66l-25-23c-4-18 0-31 13-43Z"/><path fill="${s}" d="m238 196-18 22 27-7Zm20 9 7 27 13-30Z"/><circle fill="#f7f0e6" cx="256" cy="181" r="7"/></g>`,
    kaleidoscope: `<g class="character-prop"><path fill="${a}" d="m214 170 53 15-12 43-53-15Z"/><path d="m224 181 31 9m-34 3 30 9" stroke="${s}" stroke-width="5" stroke-linecap="round"/><circle fill="#f7f0e6" cx="267" cy="185" r="9"/></g>`
  };
  return props[profile.prop] || "";
}

function renderCharacterSvg(profile) {
  const fill = profile.body;
  const accent = profile.accent;
  const shadow = profile.shadow;
  const face = profile.species === "robot"
    ? `<circle class="character-eye" fill="${accent}" cx="126" cy="82" r="10"/><circle class="character-eye" fill="${accent}" cx="174" cy="82" r="10"/><path d="M126 100h48" stroke="${shadow}" stroke-width="7" stroke-linecap="round"/>`
    : `<ellipse class="character-eye" fill="${shadow}" cx="124" cy="91" rx="7" ry="10"/><ellipse class="character-eye" fill="${shadow}" cx="176" cy="91" rx="7" ry="10"/><path fill="${accent}" d="M143 111q7 8 14 0-7-8-14 0Z"/><path d="M138 124q12 10 24 0" fill="none" stroke="${shadow}" stroke-width="5" stroke-linecap="round"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" class="character-svg" viewBox="0 0 300 260" role="img" aria-label="${profile.name}，${profile.label}">
    <ellipse class="character-ground" fill="${shadow}" opacity=".2" cx="150" cy="236" rx="85" ry="13"/>
    <circle class="character-halo" fill="${accent}" opacity=".16" cx="150" cy="113" r="112"/>
    <path fill="${shadow}" d="M106 170c-7 18-4 39 10 51l19-31Zm88 0c7 18 4 39-10 51l-19-31Z"/>
    <path fill="${fill}" d="M82 156c0-34 29-49 68-49s68 15 68 49-29 61-68 61-68-27-68-61Z"/>
    ${characterHead(profile)}
    <path fill="${accent}" opacity=".28" d="M102 150c15 17 81 17 96 0-2 33-21 51-48 51s-46-18-48-51Z"/>
    ${face}
    <circle fill="${accent}" opacity=".48" cx="103" cy="114" r="8"/><circle fill="${accent}" opacity=".48" cx="197" cy="114" r="8"/>
    ${characterProp(profile)}
  </svg>`;
}

function renderCharacter(profile) {
  return `<div class="character-figure motion-${profile.motion}" style="--character-accent:${profile.accent}">${renderCharacterSvg(profile)}</div>`;
}

const answerLabels = ["完全不像我", "不太像我", "不确定 / 一般", "比较像我", "非常像我"];
const state = { screen: "password", code: null, current: 0, answers: [], result: null, shared: false,
  remaining: 0, attempt: null, fingerprint: null, busy: false };
const $ = (selector) => document.querySelector(selector);

function saveDraft() {
  if (!state.attempt) return;
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ attempt: state.attempt,
    answers: state.answers, current: state.current, fingerprint: state.fingerprint })); }
  catch { showToast("当前浏览器无法保存进度，请保持此页面打开直到完成。"); }
}
function clearDraft() { try { sessionStorage.removeItem(DRAFT_KEY); } catch {} }
function restoreDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY));
    if (!draft || !/^[a-f0-9]{64}$/.test(draft.attempt?.token) ||
      !/^[a-f0-9-]{36}$/.test(draft.attempt?.id) || !Array.isArray(draft.answers) ||
      draft.answers.length > 48 || draft.answers.some(x => x !== null && (!Number.isInteger(x) || x < 1 || x > 5)) ||
      !Number.isInteger(draft.current) || draft.current < 0 || draft.current >= 48) return false;
    state.attempt = draft.attempt; state.answers = draft.answers;
    state.current = draft.current; state.fingerprint = draft.fingerprint;
    return Boolean(draft.attempt.started);
  } catch { return false; }
}
async function fingerprint(code) {
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(code))))
    .map(x => x.toString(16).padStart(2, "0")).join("");
}
function newAttempt() {
  return { id: crypto.randomUUID(), token: Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(x => x.toString(16).padStart(2, "0")).join(""), started: false };
}
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.toggle("active", el.id === id));
  state.screen = id.replace("screen-", "");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function showToast(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}
function normalizeCode(value) { return value.trim().toUpperCase(); }
function updateRemaining() {
  const left = state.remaining;
  $("#remaining-text").textContent = `本密码还可以测试 ${left} 次`;
  $("#start-button").textContent = state.attempt ? "继续本次测试 →" : "开始测试 →";
  $("#start-button").disabled = left <= 0 && !state.attempt;
}

function renderQuestion() {
  const [dimension, text] = questions[state.current];
  const meta = dimensions[dimension];
  $("#question-number").textContent = String(state.current + 1).padStart(2, "0");
  $("#question-text").textContent = text;
  $("#question-dimension").textContent = meta.name;
  $("#dimension-tip").textContent = meta.tip;
  const progress = Math.round((state.current / questions.length) * 100);
  $("#progress-copy").textContent = `${progress}%`;
  $("#progress-bar").style.width = `${progress}%`;
  const options = $("#answer-options"); options.innerHTML = "";
  answerLabels.forEach((label, index) => {
    const button = document.createElement("button"); button.className = "answer-option"; button.type = "button";
    button.innerHTML = `<b>${index + 1}</b><span>${label}</span>`;
    if (state.answers[state.current] === index + 1) button.classList.add("selected");
    button.setAttribute("aria-pressed", String(state.answers[state.current] === index + 1));
    button.addEventListener("click", () => { if (state.busy) return; state.answers[state.current] = index + 1; saveDraft(); renderQuestion(); });
    options.appendChild(button);
  });
  $("#next-button").disabled = !state.answers[state.current];
  $("#next-button").innerHTML = state.current === questions.length - 1 ? "查看结果 <span>↗</span>" : "下一题 <span>→</span>";
  $("#back-button").disabled = state.current === 0;
  const dots = $("#mini-dots"); dots.innerHTML = "";
  for (let i = 0; i < 24; i++) { const dot = document.createElement("span"); if (i < Math.floor(state.current / 2)) dot.classList.add("done"); if (i === Math.floor(state.current / 2)) dot.classList.add("current"); dots.appendChild(dot); }
}

function getType(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0], secondary = sorted[1][0];
  const range = sorted[0][1] - sorted[sorted.length - 1][1];
  if (range <= 8) return { primary, secondary, name: "场景切换型多面手", slogan: "你不是只有一个天赋，而是会根据场景切换武器。", combo: "多面手型", balanced: true, characterKey: "MULTI" };
  const pair = [primary, secondary].sort().join("-");
  const combo = comboNames[pair] || [resultTypes[primary].name, resultTypes[primary].slogan];
  return { primary, secondary, name: combo[0], slogan: combo[1], combo: resultTypes[primary].combo, characterKey: pair };
}
function getResult(record) {
  if (record.version !== 1 || !/^[a-f0-9-]{36}$/i.test(record.id) ||
    Object.keys(dimensions).some(key => !Number.isFinite(record.scores?.[key]) || record.scores[key] < 0 || record.scores[key] > 100)) {
    throw new Error("结果数据暂时无法读取，请联系客服。");
  }
  const scores = Object.fromEntries(Object.keys(dimensions).map(key => [key, record.scores[key]]));
  const type = getType(scores); const base = resultTypes[type.primary];
  return { id: record.id, scores, type, base, createdAt: record.createdAt, version: 1 };
}

function renderResult(result) {
  state.result = result;
  const { scores, type, base } = result;
  const character = characterProfiles[type.characterKey] || characterProfiles.MULTI;
  $("#result-title").textContent = type.name;
  $("#result-slogan").textContent = type.slogan;
  $("#result-summary").textContent = type.balanced ? "你的六个维度比较均衡，不容易被单一标签限制。真正的优势可能来自你在不同场景下的切换能力。" : `你的主优势是「${base.name}」，副优势是「${resultTypes[type.secondary].name}」。你更容易在这两种能力交会的地方，找到自己的独特价值。`;
  $("#result-mechanism").textContent = type.balanced ? "你的优势更像一组可以切换的工具，而不是一把固定的刀。" : base.mechanism;
  $("#result-scene").textContent = type.balanced ? "当环境发生变化时，你可能比自己想象中更能调整做法；但也要小心“什么都能做”让别人看不见你的核心标签。" : base.scene;
  $("#result-blindspot").textContent = type.balanced ? "容易因为选项太多而犹豫。建议先选一个场景，把最有用的两项优势组合起来。" : base.blindspot;
  $("#result-experiment").textContent = type.balanced ? "选一个你最近想尝试的方向，只使用你分数最高的两个维度设计一个小项目，7 天后看结果。" : base.experiment;
  $("#character-art").innerHTML = renderCharacter(character);
  $("#character-label").textContent = character.label;
  $("#character-name").textContent = character.name;
  $("#character-note").textContent = character.note;
  $("#result-character").setAttribute("aria-label", `${character.name}：${character.note}`);
  const bars = $("#score-bars"); bars.innerHTML = "";
  Object.entries(dimensions).forEach(([key, meta]) => { const row = document.createElement("div"); row.className = "score-row"; row.innerHTML = `<label>${meta.name}</label><div class="score-track"><div class="score-fill" style="width:${scores[key]}%;background:${meta.color}"></div></div><span class="score-value">${Math.round(scores[key])}</span>`; bars.appendChild(row); });
  $("#retake-button").textContent = state.code ? (state.remaining > 0 ? `再测一次（剩余 ${state.remaining} 次）` : "次数已用完 · 更换密码") : "我也来测一测";
  showScreen("screen-result");
}

function buildResultLink(result) { const url = new URL(window.location.href); url.search = ""; url.hash = ""; url.searchParams.set("result", result.id); return url.toString(); }
function wrapText(ctx, text, maxWidth) { const chars = Array.from(text); const lines = []; let line = ""; chars.forEach((char) => { const next = line + char; if (ctx.measureText(next).width > maxWidth && line) { lines.push(line); line = char; } else line = next; }); if (line) lines.push(line); return lines; }
function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines) { const lines = wrapText(ctx, text, maxWidth).slice(0, maxLines || 99); lines.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight)); return y + lines.length * lineHeight; }
function loadSvgImage(svg) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("角色图片生成失败"));
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
}
async function createResultBlob(result) {
  const canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1860; const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f6f1e9"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 620); gradient.addColorStop(0, "#17383b"); gradient.addColorStop(1, "#315b5e"); ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, 620);
  ctx.fillStyle = "#e4b66e"; ctx.beginPath(); ctx.arc(980, 110, 220, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#ed836d"; ctx.beginPath(); ctx.arc(70, 550, 150, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#f6f1e9"; ctx.font = "700 26px sans-serif"; ctx.fillText("隐藏优势发现测评", 70, 78); ctx.font = "800 56px sans-serif"; ctx.fillText(result.type.name, 70, 250); ctx.font = "600 27px sans-serif"; drawWrapped(ctx, result.type.slogan, 70, 315, 650, 42, 2);
  const character = characterProfiles[result.type.characterKey] || characterProfiles.MULTI;
  const characterImage = await loadSvgImage(renderCharacterSvg(character));
  ctx.drawImage(characterImage, 760, 68, 250, 218);
  ctx.fillStyle = "#f6f1e9"; ctx.font = "700 20px sans-serif"; ctx.fillText(character.name, 778, 318);
  ctx.font = "500 23px sans-serif"; drawWrapped(ctx, $("#result-mechanism").textContent, 70, 445, 820, 36, 3);
  ctx.fillStyle = "#102a2e"; ctx.font = "800 26px sans-serif"; ctx.fillText("六维优势画像", 70, 720);
  const keys = Object.keys(dimensions); keys.forEach((key, index) => { const y = 780 + index * 78; ctx.font = "600 22px sans-serif"; ctx.fillText(dimensions[key].name, 70, y); ctx.fillStyle = "#dfe5df"; ctx.fillRect(265, y - 21, 630, 18); ctx.fillStyle = dimensions[key].color; ctx.fillRect(265, y - 21, 630 * result.scores[key] / 100, 18); ctx.fillStyle = "#d76658"; ctx.font = "800 22px sans-serif"; ctx.fillText(String(Math.round(result.scores[key])), 925, y); ctx.fillStyle = "#102a2e"; });
  ctx.fillStyle = "#102a2e"; ctx.font = "800 26px sans-serif"; ctx.fillText("你可能忽略的地方", 70, 1300); ctx.font = "500 23px sans-serif"; drawWrapped(ctx, $("#result-blindspot").textContent, 70, 1360, 900, 37, 3);
  ctx.font = "800 26px sans-serif"; ctx.fillText("给你一个 7 天小实验", 70, 1525); ctx.font = "500 23px sans-serif"; drawWrapped(ctx, $("#result-experiment").textContent, 70, 1585, 900, 37, 4);
  ctx.fillStyle = "#456063"; ctx.font = "500 18px sans-serif"; ctx.fillText("结果是线索，不是给人生盖章。请在行动里继续验证。", 70, 1790);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.96));
}
async function saveResultImage() {
  if (!state.result) return;
  const button = $("#save-image-button"); button.disabled = true;
  try {
    const blob = await createResultBlob(state.result);
    if (!blob) throw new Error("图片生成失败，请重试。");
    if (state.imageUrl) URL.revokeObjectURL(state.imageUrl);
    state.imageUrl = URL.createObjectURL(blob);
    $("#result-image-preview").src = state.imageUrl;
    $("#image-download").href = state.imageUrl;
    $("#image-modal").hidden = false;
    $("#image-download").focus();
  } catch (error) { showToast(error.message); }
  finally { button.disabled = false; }
}
async function copyResultLink() {
  try { await navigator.clipboard.writeText(buildResultLink(state.result)); showToast("结果链接已复制，持有链接的人可查看这份结果"); }
  catch {
    const input = document.createElement("textarea"); input.value = buildResultLink(state.result); document.body.appendChild(input); input.select();
    const copied = document.execCommand("copy"); input.remove();
    if (copied) showToast("结果链接已复制"); else { $("#share-url").value = buildResultLink(state.result); $("#share-fallback").hidden = false; $("#share-url").select(); }
  }
}
function clearResultUrl() { const url = new URL(location.href); url.search = ""; url.hash = ""; history.replaceState(null, "", url); }
function goHome() {
  if (state.busy) return;
  state.code = null; state.result = null; state.shared = false;
  clearResultUrl(); $("#password-input").value = ""; $("#password-error").textContent = "";
  showScreen("screen-password");
}
async function verifyCode(event) {
  event.preventDefault(); if (state.busy) return;
  const button = $("#password-form button"); const error = $("#password-error");
  const code = normalizeCode($("#password-input").value);
  if (!code) { error.textContent = "请输入测评密码。"; return; }
  state.busy = true; button.disabled = true; button.textContent = "正在验证…"; error.textContent = "";
  try {
    const response = await AssessmentAPI.verify(code); const hash = await fingerprint(code);
    if (state.fingerprint !== hash) { state.attempt = null; state.answers = []; state.current = 0; clearDraft(); }
    state.code = code; state.fingerprint = hash; state.remaining = response.remaining;
    updateRemaining(); showScreen("screen-start");
  } catch (e) { error.textContent = e.message; }
  finally { state.busy = false; button.disabled = false; button.textContent = "验证密码"; }
}
async function startTest() {
  if (state.busy || !state.code) return;
  state.busy = true; $("#start-button").disabled = true; $("#start-error").textContent = "";
  if (!state.attempt) { state.attempt = newAttempt(); state.answers = []; state.current = 0; }
  saveDraft();
  try {
    const response = await AssessmentAPI.start(state.code, state.attempt);
    state.attempt.started = true; state.remaining = response.remaining; saveDraft();
    renderQuestion(); showScreen("screen-test");
  } catch (e) {
    if (e.code === "QUOTA_EXHAUSTED") { state.attempt = null; state.remaining = 0; clearDraft(); }
    $("#start-error").textContent = e.message;
  } finally { state.busy = false; updateRemaining(); }
}
async function nextQuestion() {
  if (state.busy || !state.answers[state.current]) return;
  if (state.current < questions.length - 1) { state.current++; saveDraft(); renderQuestion(); return; }
  if (state.answers.length !== 48 || state.answers.some(x => !Number.isInteger(x) || x < 1 || x > 5)) return;
  state.busy = true; $("#next-button").disabled = true; $("#next-button").textContent = "正在生成结果…";
  $("#submit-error").textContent = "";
  try {
    const result = getResult(await AssessmentAPI.finish(state.attempt, state.answers));
    clearDraft(); state.attempt = null; state.shared = false;
    history.replaceState(null, "", buildResultLink(result)); renderResult(result);
  } catch (e) { $("#submit-error").textContent = e.message; renderQuestion(); }
  finally { state.busy = false; }
}
async function loadSharedResult(id) {
  showScreen("screen-loading"); $("#loading-message").textContent = "正在读取测评结果…"; $("#retry-result").hidden = true;
  try {
    if (!/^[a-f0-9-]{36}$/i.test(id)) throw new Error("结果链接不完整，请联系分享者重新发送。");
    state.shared = true; renderResult(getResult(await AssessmentAPI.result(id)));
  } catch (e) { $("#loading-message").textContent = e.message; $("#retry-result").hidden = false; }
}
$("#password-form").addEventListener("submit", verifyCode);
$("#start-button").addEventListener("click", startTest);
$("#next-button").addEventListener("click", nextQuestion);
$("#back-button").addEventListener("click", () => { if (!state.busy && state.current > 0) { state.current--; saveDraft(); renderQuestion(); } });
$("#save-image-button").addEventListener("click", saveResultImage);
$("#copy-link-button").addEventListener("click", copyResultLink);
$("#retake-button").addEventListener("click", async () => {
  if (!state.code || state.remaining <= 0) { goHome(); return; }
  clearResultUrl(); state.answers = []; state.current = 0; state.attempt = null;
  updateRemaining(); showScreen("screen-start");
});
$("#gift-button").addEventListener("click", () => { $("#gift-modal").hidden = false; });
document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "home" || action === "reset-access") { event.preventDefault(); goHome(); }
  if (action === "close-modal") $("#gift-modal").hidden = true;
  if (action === "close-image") { $("#image-modal").hidden = true; $("#save-image-button").focus(); }
});
document.addEventListener("keydown", event => { if (event.key === "Escape") { $("#gift-modal").hidden = true; $("#image-modal").hidden = true; } });
$("#retry-result").addEventListener("click", () => loadSharedResult(new URLSearchParams(location.search).get("result")));
const shared = new URLSearchParams(window.location.search).get("result");
if (shared) loadSharedResult(shared);
else if (restoreDraft()) { renderQuestion(); showScreen("screen-test"); showToast("已恢复本次进度，不会重复扣次数"); }
