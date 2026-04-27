"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const mockWeightData = [
  { date: "4/1", weight: 198 },
  { date: "4/5", weight: 196 },
  { date: "4/10", weight: 194 },
  { date: "4/15", weight: 192 },
  { date: "4/20", weight: 190 },
  { date: "4/25", weight: 188 },
];

const mockDoseHistory = [
  { date: "4/20", drug: "Ozempic", dose: "0.5mg", taken: true },
  { date: "4/13", drug: "Ozempic", dose: "0.5mg", taken: true },
  { date: "4/6", drug: "Ozempic", dose: "0.25mg", taken: true },
  { date: "3/30", drug: "Ozempic", dose: "0.25mg", taken: true },
];

const sideEffectOptions = [
  "噁心",
  "頭痛",
  "腹瀉",
  "便祕",
  "胃痛",
  "疲倦",
  "頭暈",
];

export default function DashboardPage() {
  const [sideEffects, setSideEffects] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);

  const toggleSideEffect = (effect: string) => {
    setSideEffects((prev) =>
      prev.includes(effect) ? prev.filter((e) => e !== effect) : [...prev, effect]
    );
  };

  const maxWeight = 200;
  const minWeight = 185;
  const chartHeight = 150;

  const getY = (weight: number) => {
    return chartHeight - ((weight - minWeight) / (maxWeight - minWeight)) * chartHeight;
  };

  const goalWeight = 170;
  const currentWeight = 188;
  const lostWeight = 198 - 188;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">我的儀表板</h1>
          <p className="text-gray-600">追蹤您的減重進度</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">進度概覽</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">目前體重</p>
                  <p className="text-3xl font-bold text-emerald-600">{currentWeight}</p>
                  <p className="text-sm text-gray-400">磅</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">已減重</p>
                  <p className="text-3xl font-bold text-emerald-600">{lostWeight}</p>
                  <p className="text-sm text-gray-400">磅</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">目標體重</p>
                  <p className="text-3xl font-bold text-gray-400">{goalWeight}</p>
                  <p className="text-sm text-gray-400">磅</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>進度</span>
                  <span>{Math.round((lostWeight / (198 - goalWeight)) * 100)}%</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full">
                  <div
                    className="h-4 bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (lostWeight / (198 - goalWeight)) * 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Weight Chart */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">體重趨勢</h2>
              <div className="relative h-[180px]">
                <svg className="w-full h-full" viewBox={`0 0 ${mockWeightData.length * 80} ${chartHeight + 40}`} preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                    <line
                      key={ratio}
                      x1="0"
                      y1={ratio * chartHeight}
                      x2={mockWeightData.length * 80}
                      y2={ratio * chartHeight}
                      stroke="#e5e7eb"
                      strokeDasharray="4"
                    />
                  ))}
                  {/* Line */}
                  <polyline
                    points={mockWeightData.map((d, i) => `${i * 80 + 40},${getY(d.weight)}`).join(" ")}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dots */}
                  {mockWeightData.map((d, i) => (
                    <circle key={d.date} cx={i * 80 + 40} cy={getY(d.weight)} r="5" fill="#10b981" />
                  ))}
                  {/* Labels */}
                  {mockWeightData.map((d, i) => (
                    <text
                      key={d.date}
                      x={i * 80 + 40}
                      y={chartHeight + 25}
                      textAnchor="middle"
                      className="text-xs fill-gray-500"
                    >
                      {d.date}
                    </text>
                  ))}
                </svg>
              </div>
            </motion.div>

            {/* Medication History */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">用藥記錄</h2>
                <span className="text-sm text-emerald-600 font-medium">下次劑量：5/4</span>
              </div>
              <div className="space-y-4">
                {mockDoseHistory.map((dose, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600">💉</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{dose.drug} {dose.dose}</p>
                        <p className="text-sm text-gray-500">{dose.date}</p>
                      </div>
                    </div>
                    <span className="text-emerald-500">✓ 已注射</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Side Effects Log */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">副作用記錄</h2>
                <button
                  onClick={() => setShowLogForm(!showLogForm)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  {showLogForm ? "取消" : "+ 記錄副作用"}
                </button>
              </div>

              {showLogForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-4 bg-gray-50 rounded-xl"
                >
                  <p className="text-sm text-gray-600 mb-3">今天有什麼副作用？（可複選）</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {sideEffectOptions.map((effect) => (
                      <button
                        key={effect}
                        onClick={() => toggleSideEffect(effect)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          sideEffects.includes(effect)
                            ? "bg-orange-100 text-orange-700 border-2 border-orange-400"
                            : "bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {effect}
                      </button>
                    ))}
                  </div>
                  <div className="mb-4">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="其他補充說明..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 h-24"
                    />
                  </div>
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium">
                    儲存記錄
                  </button>
                </motion.div>
              )}

              <div className="text-center py-8 text-gray-500">
                <span className="text-3xl mb-2 block">📊</span>
                <p>目前無記錄</p>
                <p className="text-sm">追蹤您的副作用狀況</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">王小明</h3>
                  <p className="text-sm text-gray-500">會員編號: EM2024001</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">療程開始</span>
                  <span className="font-medium">2024/4/1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">目前方案</span>
                  <span className="font-medium text-emerald-600">月付方案</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">下次問診</span>
                  <span className="font-medium">5/15</span>
                </div>
              </div>
            </motion.div>

            {/* Next Dose Reminder */}
            <motion.div
              className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-semibold mb-4">下次注射提醒</h3>
              <div className="text-center py-4">
                <p className="text-4xl font-bold mb-2">5/4</p>
                <p className="text-emerald-100">週日 上午 9:00</p>
              </div>
              <div className="mt-4 bg-white/20 rounded-xl p-3">
                <p className="text-sm">Ozempic 0.5mg</p>
              </div>
              <button className="w-full mt-4 bg-white/20 hover:bg-white/30 py-2 rounded-xl font-medium text-sm">
                設定提醒
              </button>
            </motion.div>

            {/* Upcoming Consultation */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-semibold text-gray-900 mb-4">即將到來的問診</h3>
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-sm text-emerald-600 font-medium">5/15 下午 2:00</p>
                <p className="text-gray-900 font-medium mt-1">Dr. Chen 醫師</p>
                <p className="text-sm text-gray-500 mt-1">第3次追蹤問診</p>
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-semibold text-gray-900 mb-4">💡 減重小技巧</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  每餐增加蛋白質攝入
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  每天喝足 8 杯水
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  避免精緻碳水化合物
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  保持充足睡眠（7-8小時）
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}