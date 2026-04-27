"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const drugs = [
  {
    id: "ozempic",
    name: "Ozempic",
    generic: "Semaglutide",
    use: "血糖控制 + 減重",
    dose: "每週注射一次",
    price: "$900-$1,200/月",
    color: "bg-blue-500",
  },
  {
    id: "wegovy",
    name: "Wegovy",
    generic: "Semaglutide",
    use: "減重專用",
    dose: "每週注射一次",
    price: "$1,300-$1,600/月",
    color: "bg-indigo-500",
  },
  {
    id: "mounjaro",
    name: "Mounjaro",
    generic: "Tirzepatide",
    use: "雙重作用 (GLP-1 + GIP)",
    dose: "每週注射一次",
    price: "$1,000-$1,200/月",
    color: "bg-purple-500",
  },
  {
    id: "zepbound",
    name: "Zepbound",
    generic: "Tirzepatide",
    use: "減重專用",
    dose: "每週注射一次",
    price: "$1,000-$1,300/月",
    color: "bg-pink-500",
  },
];

const steps = [
  {
    num: "1",
    title: "評估資格",
    desc: "填寫健康問卷，了解您是否符合用藥條件",
  },
  {
    num: "2",
    title: "線上問診",
    desc: "與認證醫師視訊諮詢，取得個人化治療方案",
  },
  {
    num: "3",
    title: "開始減重",
    desc: "在家輕鬆開始療程，專業團隊持續追蹤",
  },
];

const faqs = [
  {
    q: "誰適合使用 GLP-1 藥物？",
    a: "BMI ≥ 30 或 BMI ≥ 27 且有體重相關健康問題（如高血壓、糖尿病）的成年人。我們的醫師會根據您的健康狀況評估是否適合。",
  },
  {
    q: "這些藥物安全嗎？",
    a: "GLP-1 藥物已獲 FDA 批准用於減重。在專業醫療監督下使用是安全的。如有副作用，醫師會協助調整劑量或更換藥物。",
  },
  {
    q: "保險有給付嗎？",
    a: "部分保險計劃涵蓋 GLP-1 藥物。我們會在評估過程中協助您了解保險福利，並提供自費選項。",
  },
  {
    q: "多久可以看到效果？",
    a: "多數使用者在 4-8 週內開始看到體重下降。完整療程通常持續 6-12 個月，配合生活型態改變效果更佳。",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              GLP-1 減重藥物
              <br />
              <span className="text-emerald-600">在家輕鬆獲得</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl text-gray-600 mb-8">
              在家就醫，專業減重
              <br />
              透過遠距醫療，輕鬆獲得 GLP-1 減重藥物處方
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assessment"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                免費評估資格
              </Link>
              <Link
                href="/medications"
                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-gray-200 transition-all"
              >
                了解藥物選項
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 items-center text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👥</span>
              <span className="font-semibold">全美 50,000+ 患者信任</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              <span>HIPAA 合規</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              <span>FDA 核准藥物</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              <span>認證醫師</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">如何運作</h2>
            <p className="text-xl text-gray-600">三個簡單步驟，開始您的減重之旅</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="bg-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center text-xl font-bold mb-6">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Drug Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">GLP-1 藥物選項</h2>
            <p className="text-xl text-gray-600">認識四種主要減重藥物</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drugs.map((drug, i) => (
              <motion.div
                key={drug.id}
                id={drug.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={`${drug.color} h-2`} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{drug.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{drug.generic}</p>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500">用途：</span>
                      <span className="text-gray-700 font-medium">{drug.use}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">劑型：</span>
                      <span className="text-gray-700 font-medium">{drug.dose}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">費用：</span>
                      <span className="text-emerald-600 font-semibold">{drug.price}</span>
                    </div>
                  </div>
                  <Link
                    href={`/medications#${drug.id}`}
                    className="mt-6 block text-center bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 rounded-xl font-medium transition-colors"
                  >
                    了解更多
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">常見問題</h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            準備好開始了嗎？
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            免費評估，看看 GLP-1 藥物是否適合您
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            開始免費評估
          </Link>
        </div>
      </section>
    </div>
  );
}