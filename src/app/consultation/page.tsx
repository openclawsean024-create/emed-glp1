"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4 | 5;

const symptoms = [
  "體重過重",
  "BMI 過高",
  "食慾過盛",
  "新陳代謝問題",
  "減重困難",
  "血糖問題",
  "血壓問題",
  "膽固醇問題",
];

const healthHistoryOptions = [
  "心臟病",
  "高血壓",
  "糖尿病",
  "甲狀腺疾病",
  "腎臟疾病",
  "肝臟疾病",
  "憂鬱症/焦慮症",
  "手術史",
  "過敏史",
];

const timeSlots = [
  "5/15 (四) 上午 9:00",
  "5/15 (四) 上午 10:00",
  "5/15 (四) 下午 2:00",
  "5/15 (四) 下午 3:00",
  "5/16 (五) 上午 9:00",
  "5/16 (五) 上午 11:00",
  "5/16 (五) 下午 2:00",
  "5/17 (六) 上午 10:00",
];

export default function ConsultationPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [healthHistory, setHealthHistory] = useState<string[]>([]);
  const [allergies, setAllergies] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const totalSteps = 5;
  const progress = ((step - 1) / totalSteps) * 100;

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const toggleHistory = (h: string) => {
    setHealthHistory((prev) =>
      prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) setStep((step + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">預約問診</h1>
          <p className="text-gray-600">與認證醫師進行線上諮詢</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>步驟 {step} / {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-2 bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">您的主要症狀</h2>
                <p className="text-sm text-gray-500 mb-4">請選擇您想要諮詢的問題（可複選）</p>
                <div className="grid grid-cols-2 gap-3">
                  {symptoms.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSymptom(s)}
                      className={`p-4 rounded-xl text-left font-medium transition-all ${
                        selectedSymptoms.includes(s)
                          ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-500"
                          : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      {selectedSymptoms.includes(s) ? "✓ " : ""}{s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">健康史</h2>
                <p className="text-sm text-gray-500 mb-4">請選擇您有過的健康狀況</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {healthHistoryOptions.map((h) => (
                    <button
                      key={h}
                      onClick={() => toggleHistory(h)}
                      className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${
                        healthHistory.includes(h)
                          ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-500"
                          : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      {healthHistory.includes(h) ? "✓ " : ""}{h}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">過敏史</label>
                  <textarea
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 h-24"
                    placeholder="請列出任何藥物或食物過敏..."
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">上傳文件</h2>
                <p className="text-sm text-gray-500 mb-4">如有以下文件，請上傳（可選）</p>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                    {uploaded ? (
                      <div>
                        <span className="text-4xl mb-2 block">✓</span>
                        <p className="text-emerald-600 font-medium">已上傳</p>
                        <button
                          onClick={() => setUploaded(false)}
                          className="text-sm text-gray-500 mt-2 hover:text-gray-700"
                        >
                          重新上傳
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-4xl mb-2 block">📄</span>
                        <p className="text-gray-700 font-medium">點擊上傳或拖放文件</p>
                        <p className="text-sm text-gray-500 mt-1">近三個月內的血液檢查報告、保險卡照片等</p>
                        <button
                          onClick={() => setUploaded(true)}
                          className="mt-4 bg-emerald-50 text-emerald-600 px-6 py-2 rounded-lg font-medium hover:bg-emerald-100 transition-colors"
                        >
                          選擇檔案
                        </button>
                      </>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                    <p className="font-medium text-gray-700 mb-2">建議上傳：</p>
                    <ul className="space-y-1">
                      <li>• 近三個月的血糖檢測報告</li>
                      <li>• 膽固醇檢測報告</li>
                      <li>• 現有處方藥列表</li>
                      <li>• 保險卡正反面（若有保險）</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">選擇時間</h2>
                <p className="text-sm text-gray-500 mb-4">請選擇您偏好的問診時間</p>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`p-4 rounded-xl text-left font-medium transition-all ${
                        selectedTime === slot
                          ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-500"
                          : "bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      {selectedTime === slot ? "✓ " : ""}{slot}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  💡 問診時間約 20-30 分鐘，將透過視訊進行
                </p>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">預約成功！</h2>
                <p className="text-gray-600 mb-8">
                  您的問診已成功預約，我們已發送確認郵件至您的信箱。
                </p>

                <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">問診詳情</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">日期時間</span>
                      <span className="font-medium">{selectedTime || "5/15 (四) 下午 2:00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">醫師</span>
                      <span className="font-medium">Dr. Chen</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">類型</span>
                      <span className="font-medium">視訊問診</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">時長</span>
                      <span className="font-medium">約 20-30 分鐘</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/dashboard"
                    className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold text-center"
                  >
                    查看我的儀表板
                  </Link>
                  <Link
                    href="/"
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold text-center"
                  >
                    返回首頁
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 5 && (
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                >
                  ← 上一步
                </button>
              ) : (
                <Link href="/" className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium">
                  ← 返回首頁
                </Link>
              )}
              <button
                onClick={handleNext}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                disabled={step === 4 && !selectedTime}
              >
                {step === 4 ? "確認預約" : "下一步 →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}