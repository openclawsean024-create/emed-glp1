"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "月付方案",
    price: "$99",
    period: "/月",
    description: "最適合剛開始減重旅程的您",
    features: [
      "每月一次線上問診",
      "藥物處方服務",
      "進度追蹤系統",
      "醫療團隊支援",
      "營養建議",
      "副作用管理",
    ],
    notIncluded: [],
    popular: false,
  },
  {
    name: "季付方案",
    price: "$249",
    period: "/季",
    description: "最受歡迎，省最多",
    features: [
      "每3個月一次問診（含加診）",
      "藥物處方服務",
      "進度追蹤系統",
      "優先醫療團隊支援",
      "個人化營養計畫",
      "副作用管理",
      "24/7 緊急諮詢",
    ],
    notIncluded: [],
    popular: true,
  },
];

const drugPrices = [
  { name: "Ozempic (Semaglutide)", pharmacy: "$900-$1,200/月", note: "劑量不同價格有差異" },
  { name: "Wegovy (Semaglutide)", pharmacy: "$1,300-$1,600/月", note: "僅減重適應症" },
  { name: "Mounjaro (Tirzepatide)", pharmacy: "$1,000-$1,200/月", note: "有空針/筆針可選" },
  { name: "Zepbound (Tirzepatide)", pharmacy: "$1,000-$1,300/月", note: "僅減重適應症" },
];

const included = [
  { icon: "👨‍⚕️", title: "認證醫師問診", desc: "與美國認證醫師視訊諮詢" },
  { icon: "📝", title: "藥物處方", desc: "合法處方，直接送藥到府" },
  { icon: "📊", title: "進度追蹤", desc: "體重、BMI、里程碑全程記錄" },
  { icon: "💊", title: "用藥提醒", desc: "再也不會忘記注射時間" },
  { icon: "🍎", title: "營養指導", desc: "個人化飲食建議" },
  { icon: "🆘", title: "副作用支援", desc: "專業團隊即時協助" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">方案與價格</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            簡單透明的定價，沒有隱藏費用
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-emerald-500 text-white shadow-xl scale-105"
                    : "bg-white border-2 border-gray-200"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.popular && (
                  <span className="inline-block bg-white text-emerald-600 text-sm font-bold px-4 py-1 rounded-full mb-4">
                    最受歡迎
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={`${plan.popular ? "text-emerald-200" : "text-gray-500"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mb-6 ${plan.popular ? "text-emerald-100" : "text-gray-600"}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className={plan.popular ? "text-emerald-200" : "text-emerald-500"}>✓</span>
                      <span className={plan.popular ? "text-white" : "text-gray-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "bg-white text-emerald-600 hover:bg-emerald-50"
                      : "bg-emerald-500 text-white hover:bg-emerald-600"
                  }`}
                >
                  選擇此方案
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance vs Self-Pay */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">保險 vs 自費</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">使用保險</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  部分保險可能涵蓋問診費用
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  藥物費用可能全額或部分給付
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  我們會協助您了解保險福利
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">!</span>
                  需要事先授權
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">自費支付</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  無需保險核准流程
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  快速啟動治療
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  價格透明，無意外費用
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">−</span>
                  需全額自付藥物費用
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Medication Costs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">藥物費用</h2>
          <p className="text-gray-600 text-center mb-8">
            藥物費用另計，不同藥房和劑量價格有所不同
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">藥物</th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-900">藥房價格</th>
                  <th className="px-4 py-4 text-left font-semibold text-gray-900">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {drugPrices.map((drug) => (
                  <tr key={drug.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{drug.name}</td>
                    <td className="px-4 py-4 text-center text-emerald-600 font-semibold">{drug.pharmacy}</td>
                    <td className="px-4 py-4 text-gray-500 text-sm">{drug.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">
            * 實際價格可能因藥房、保險和劑量而異。優惠券和折扣選項可能適用。
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">所有方案包含</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {included.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-500 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">開始您的減重旅程</h2>
        <p className="text-emerald-100 mb-8">免費評估，看看您是否符合資格</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/assessment"
            className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            免費評估資格
          </a>
          <a
            href="/consultation"
            className="inline-block bg-emerald-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-emerald-700 transition-colors border-2 border-white/30"
          >
            預約問診
          </a>
        </div>
      </section>
    </div>
  );
}