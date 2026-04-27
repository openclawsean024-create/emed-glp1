"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const steps = [
  { id: 1, title: "基本資訊", desc: "年齡與居住地" },
  { id: 2, title: "身高體重", desc: "計算 BMI" },
  { id: 3, title: "健康狀況", desc: "既有疾病" },
  { id: 4, title: "用藥紀錄", desc: "目前藥物" },
  { id: 5, title: "保險資訊", desc: "保險計劃" },
];

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    zipCode: "",
    height: "",
    weight: "",
    diabetes: false,
    heartDisease: false,
    thyroid: false,
    kidneyDisease: false,
    pancreatitis: false,
    currentMedications: "",
    hasInsurance: "",
  });
  const [result, setResult] = useState<{ eligible: boolean; reason: string } | null>(null);

  const bmi = formData.height && formData.weight
    ? (parseFloat(formData.weight) / ((parseFloat(formData.height) / 100) ** 2)).toFixed(1)
    : null;

  const bmiCategory = bmi ? (parseFloat(bmi) >= 30 ? "肥胖" : parseFloat(bmi) >= 27 ? "過重" : "正常") : "";

  const handleSubmit = () => {
    const isEligible =
      parseInt(formData.age) >= 18 &&
      parseFloat(bmi || "0") >= 27 &&
      !formData.kidneyDisease &&
      !formData.pancreatitis;
    setResult({
      eligible: isEligible,
      reason: isEligible
        ? "您符合 GLP-1 藥物使用條件。您的 BMI 為 " + bmi + "，且無明顯禁忌症。"
        : "很抱歉，您的條件目前不符合。我們建議諮詢醫師了解其他選項。",
    });
    setCurrentStep(6);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">免費資格評估</h1>
          <p className="text-gray-600">完成以下問題，了解您是否符合 GLP-1 藥物條件</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-2">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex-1 text-center text-sm font-medium ${
                  currentStep >= s.id ? "text-emerald-600" : "text-gray-400"
                }`}
              >
                {s.title}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">基本資訊</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">年齡</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="18 歲以上"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">郵遞區號</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="美國郵遞區號"
                  />
                </div>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold"
              >
                下一步
              </button>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">身高體重</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">身高 (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="例如：170"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">體重 (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="例如：80"
                  />
                </div>
                {bmi && (
                  <div className="bg-emerald-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">您的 BMI</p>
                    <p className="text-3xl font-bold text-emerald-600">{bmi}</p>
                    <p className="text-sm text-emerald-700">{bmiCategory}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold"
                >
                  上一步
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold"
                >
                  下一步
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">健康狀況</h2>
              <p className="text-sm text-gray-500 mb-6">以下狀況可能影響用藥資格</p>
              <div className="space-y-4">
                {[
                  { key: "diabetes", label: "糖尿病" },
                  { key: "heartDisease", label: "心臟疾病" },
                  { key: "thyroid", label: "甲狀腺問題" },
                  { key: "kidneyDisease", label: "腎臟疾病" },
                  { key: "pancreatitis", label: "胰臟炎" },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData[item.key as keyof typeof formData] as boolean}
                      onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setCurrentStep(2)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold">上一步</button>
                <button onClick={() => setCurrentStep(4)} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold">下一步</button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">目前用藥</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">請列出目前正在服用的藥物（如無請填「無」）</label>
                <textarea
                  value={formData.currentMedications}
                  onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 h-32"
                  placeholder="例如：降血壓藥、維他命..."
                />
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setCurrentStep(3)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold">上一步</button>
                <button onClick={() => setCurrentStep(5)} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold">下一步</button>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">保險資訊</h2>
              <div className="space-y-4">
                {["有保險", "沒有保險", "不確定"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="insurance"
                      value={option}
                      checked={formData.hasInsurance === option}
                      onChange={(e) => setFormData({ ...formData, hasInsurance: e.target.value })}
                      className="w-5 h-5 border-gray-300 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setCurrentStep(4)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold">上一步</button>
                <button onClick={handleSubmit} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold">完成評估</button>
              </div>
            </motion.div>
          )}

          {currentStep === 6 && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center"
            >
              <div className={`text-6xl mb-4`}>{result.eligible ? "🎉" : "😔"}</div>
              <h2 className={`text-2xl font-bold mb-4 ${result.eligible ? "text-emerald-600" : "text-gray-700"}`}>
                {result.eligible ? "您符合資格！" : "目前不符合"}
              </h2>
              <p className="text-gray-600 mb-8">{result.reason}</p>
              {result.eligible && (
                <Link
                  href="/consultation"
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold"
                >
                  預約線上問診
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
