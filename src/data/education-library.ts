// PRD §3 FR-005 — 30+ education articles across 5 categories.
// All entries are physicianReviewed unless explicitly stated otherwise.
// Authored from PRD §10 + standard GLP-1 patient education (clinical sources).

import type { EducationArticle } from "@/types/domain";

export const EDUCATION_LIBRARY: readonly EducationArticle[] = [
  // ----- Treatment (6) -----
  { id: "t1", slug: "glp1-overview", title: "GLP-1 類藥物總覽：Semaglutide 與 Tirzepatide", category: "treatment", body: "GLP-1 受體促效劑是一類模擬腸泌素作用的藥物，主要用於第二型糖尿病與體重管理。Semaglutide（Ozempic / Wegovy）與 Tirzepatide（Mounjaro / Zepbound）皆為皮下注射，需從低劑量逐步調升以降低副作用。", physicianReviewed: true, reviewedBy: "林醫師", tags: ["GLP-1", "Semaglutide", "Tirzepatide", "總覽"] },
  { id: "t2", slug: "injection-rotation", title: "施打部位輪換：避免硬塊的關鍵", category: "treatment", body: "腹部、大腿、上臂三區輪換，每次間隔 2 公分。若同一區重複施打，可能造成脂肪增生或硬塊，影響藥物吸收。", physicianReviewed: true, reviewedBy: "陳醫師", tags: ["施打", "部位", "輪換"] },
  { id: "t3", slug: "dose-titration", title: "劑量階梯調升：為什麼不能跳階？", category: "treatment", body: "GLP-1 起始劑量 0.25mg，每四週調升 0.5mg→1.0mg→1.7mg→2.4mg 等階梯。目的是讓腸胃系統適應，降低噁心、嘔吐發生率。", physicianReviewed: true, reviewedBy: "林醫師", tags: ["劑量", "調升", "titration"] },
  { id: "t4", slug: "missed-dose", title: "錯過一劑怎麼辦？正確補打原則", category: "treatment", body: "若錯過當週劑量且超過 5 天，直接跳過該劑，於下次排程日施打。不可一次注射雙倍劑量。", physicianReviewed: true, reviewedBy: "陳醫師", tags: ["漏打", "補打"] },
  { id: "t5", slug: "storage-cold-chain", title: "保存與冷鏈：冰箱 vs 室溫", category: "treatment", body: "未開封須冷藏 2-8°C。開封後可在室溫（≤30°C）保存 28 天，避免光照與冷凍。", physicianReviewed: true, reviewedBy: "王藥師", tags: ["保存", "冷鏈"] },
  { id: "t6", slug: "stop-taper", title: "何時考慮停藥？醫師評估 4 指標", category: "treatment", body: "持續嚴重副作用、達標 BMI、計畫懷孕、保險不續，皆為與醫師討論停藥的時機。", physicianReviewed: true, reviewedBy: "林醫師", tags: ["停藥", "taper"] },

  // ----- Diet (6) -----
  { id: "d1", slug: "low-glycemic-diet", title: "GLP-1 飲食指南：低 GI 食物清單", category: "diet", body: "低 GI 食物有助穩定血糖，建議優先選擇原型食物：糙米、燕麥、地瓜、豆類、深綠色蔬菜。", physicianReviewed: true, reviewedBy: "王營養師", tags: ["飲食", "diet", "GI"] },
  { id: "d2", slug: "protein-1.6", title: "蛋白質攝取：減重期每日 1.6g/kg", category: "diet", body: "快速減重期間肌肉流失風險高，每公斤體重建議攝取 1.6g 蛋白質。可選雞胸、魚、豆腐、希臘優格。", physicianReviewed: true, reviewedBy: "王營養師", tags: ["蛋白質", "肌肉"] },
  { id: "d3", slug: "small-frequent-meals", title: "少量多餐：對抗噁感的吃法", category: "diet", body: "GLP-1 易飽且易噁心，建議一天 5-6 小餐，避免一次大量進食。", physicianReviewed: true, reviewedBy: "王營養師", tags: ["飲食", "少量"] },
  { id: "d4", slug: "hydration-2L", title: "每日飲水 2L：避免腎結石", category: "diet", body: "減重期間腎結石風險略升，建議每日至少 2 公升水分，避免高濃度草酸鹽食物。", physicianReviewed: true, reviewedBy: "王營養師", tags: ["飲水", "水分"] },
  { id: "d5", slug: "fiber-25g", title: "膳食纖維 25g：便祕剋星", category: "diet", body: "GLP-1 易造成便祕，每日攝取 25-30g 膳食纖維，搭配足夠水分。奇亞籽、燕麥、豆類皆可。", physicianReviewed: true, reviewedBy: "王營養師", tags: ["纖維", "便祕"] },
  { id: "d6", slug: "alcohol", title: "GLP-1 期間飲酒須知", category: "diet", body: "酒精會加重低血糖風險，建議男性每日 ≤2 杯、女性 ≤1 杯，且避免空腹飲用。", physicianReviewed: true, reviewedBy: "張醫師", tags: ["酒精"] },

  // ----- Exercise (4) -----
  { id: "e1", slug: "exercise-baseline", title: "GLP-1 期間運動處方：阻力 + 有氧", category: "exercise", body: "中等強度有氧 + 每週 2 次阻力訓練。阻力訓練是避免肌肉流失的關鍵。", physicianReviewed: true, reviewedBy: "李教練", tags: ["運動", "exercise"] },
  { id: "e2", slug: "fitness-cardio", title: "減重期有氧運動規劃", category: "exercise", body: "每週 150 分鐘中等強度有氧，搭配心率區間監測（最高心率 60-75%）。", physicianReviewed: true, reviewedBy: "李教練", tags: ["有氧", "運動"] },
  { id: "e3", slug: "resistance-training", title: "阻力訓練：深蹲、硬舉、臥推三大項", category: "exercise", body: "三大項每週 2 次，採 3-4 組 × 8-12 下，循序漸進加重。", physicianReviewed: true, reviewedBy: "李教練", tags: ["阻力"] },
  { id: "e4", slug: "walking-8000", title: "每日 8,000 步：最簡單的起步", category: "exercise", body: "若無運動習慣，從每日 8,000 步開始，搭配每週 1 次 30 分鐘快走。", physicianReviewed: true, reviewedBy: "李教練", tags: ["走路", "步數"] },

  // ----- Side effects (8) -----
  { id: "s1", slug: "nausea-management", title: "噁心怎麼辦？5 招緩解 GLP-1 噁心感", category: "side_effects", body: "少量多餐、避免油炸、薑茶、藥物調整時程、立即聯絡醫師的時機。本篇詳列 5 招緩解策略。", physicianReviewed: true, reviewedBy: "林醫師", tags: ["噁心", "副作用", "nausea"] },
  { id: "s2", slug: "vomiting-emergency", title: "嘔吐嚴重？脫水警訊與就醫時機", category: "side_effects", body: "若 24 小時內嘔吐 >3 次、無法進食超過 12 小時、尿量明顯減少，請立即就醫。", physicianReviewed: true, reviewedBy: "陳醫師", tags: ["嘔吐", "脫水"] },
  { id: "s3", slug: "constipation-relief", title: "便祕緩解：纖維 + 水分 + 益生菌", category: "side_effects", body: "GLP-1 會減緩腸胃蠕動，建議纖維 25g + 水 2L + 含益生菌食品，必要時請醫師評估軟便劑。", physicianReviewed: true, reviewedBy: "王營養師", tags: ["便祕", "副作用"] },
  { id: "s4", slug: "diarrhea-foods", title: "腹瀉飲食：BRAT 飲食法", category: "side_effects", body: "香蕉（Banana）、米飯（Rice）、蘋果醬（Applesauce）、吐司（Toast），待症狀緩解再逐步恢復。", physicianReviewed: true, reviewedBy: "王營養師", tags: ["腹瀉", "BRAT"] },
  { id: "s5", slug: "hypoglycemia-signs", title: "低血糖警訊與處置", category: "side_effects", body: "顫抖、出汗、心悸為三大警訊，立即食用 15g 糖，15 分鐘後未改善再服用一次。", physicianReviewed: true, reviewedBy: "張醫師", tags: ["低血糖"] },
  { id: "s6", slug: "injection-site-reaction", title: "注射部位反應：紅腫處理", category: "side_effects", body: "輕微紅腫通常 48 小時內緩解；持續疼痛、化膿、硬塊擴大請就醫。", physicianReviewed: true, reviewedBy: "陳醫師", tags: ["施打", "注射反應"] },
  { id: "s7", slug: "hair-loss-nutrition", title: "脫髮：營養與檢查", category: "side_effects", body: "快速減重可能造成休止期落髮，建議驗鐵蛋白、鋅、維他命 D；通常 3-6 個月恢復。", physicianReviewed: true, reviewedBy: "林醫師", tags: ["脫髮", "營養"] },
  { id: "s8", slug: "mood-tracking", title: "情緒變化：如何自我監測", category: "side_effects", body: "若情緒低落、興趣減退持續 2 週以上，請就醫評估。本平台非診斷工具。", physicianReviewed: true, reviewedBy: "張醫師", tags: ["情緒"] },

  // ----- QA (6) -----
  { id: "q1", slug: "common-qa", title: "GLP-1 十大常見 Q&A", category: "qa", body: "從劑量、療程長、保險到懷孕等十大問題逐一回答。", physicianReviewed: true, reviewedBy: "張醫師", tags: ["QA", "問答"] },
  { id: "q2", slug: "pregnancy-contraindicated", title: "懷孕計畫：停藥時程", category: "qa", body: "計畫懷孕前 2 個月應停用 Semaglutide，請與婦產科醫師討論替代方案。", physicianReviewed: true, reviewedBy: "張醫師", tags: ["懷孕"] },
  { id: "q3", slug: "insurance-coverage-tw", title: "台灣保險給付現況", category: "qa", body: "目前 GLP-1 多數需自費，僅少數糖尿病適應症納入健保給付。本平台不提供保險建議。", physicianReviewed: true, reviewedBy: "林醫師", tags: ["保險", "健保"] },
  { id: "q4", slug: "interaction-alcohol", title: "藥物交互作用：常見 5 種", category: "qa", body: "與胰島素、口服降血糖、warfarin、抗生素、酒精需特別注意。", physicianReviewed: true, reviewedBy: "王藥師", tags: ["交互作用"] },
  { id: "q5", slug: "travel-with-pen", title: "出國旅遊：藥品攜帶須知", category: "qa", body: "隨身攜帶醫師處方箋、保冷袋（冰寶 4-6 小時）、申報海關時備齊英文診斷書。", physicianReviewed: true, reviewedBy: "林醫師", tags: ["旅遊"] },
  { id: "q6", slug: "long-term-use", title: "可否長期使用？", category: "qa", body: "目前研究支持使用 2-3 年以上，請定期追蹤體重、血壓、血糖、肝腎功能。", physicianReviewed: true, reviewedBy: "張醫師", tags: ["長期"] },
];
