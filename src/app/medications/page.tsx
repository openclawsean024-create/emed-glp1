import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GLP-1 藥物選項 | eMed",
  description: "認識四種主要 GLP-1 減重藥物：Ozempic、Wegovy、Mounjaro、Zepbound",
};

const drugs = [
  {
    id: "ozempic",
    name: "Ozempic",
    generic: "Semaglutide（司美魯肽）",
    manufacturer: "Novo Nordisk",
    approval: "FDA 核准（2017）",
    use: "血糖控制 + 減重",
    mechanism: "GLP-1 受體激動劑，抑制食欲，延緩胃排空",
    dosing: "每週注射一次，劑量漸進式調整",
    sideEffects: "惡心、嘔吐、腹瀉、便祕",
    price: "$900-$1,200/月",
    color: "bg-blue-500",
    textColor: "text-blue-600",
    gradient: "from-blue-50 to-blue-100",
    icon: "💉",
  },
  {
    id: "wegovy",
    name: "Wegovy",
    generic: "Semaglutide（司美魯肽）",
    manufacturer: "Novo Nordisk",
    approval: "FDA 核准（2021）",
    use: "減重專用",
    mechanism: "GLP-1 受體激動劑，直接作用於飽足中樞",
    dosing: "每週注射一次，劑量最高 2.4mg",
    sideEffects: "惡心、腹瀉、頭痛、疲勞",
    price: "$1,300-$1,600/月",
    color: "bg-indigo-500",
    textColor: "text-indigo-600",
    gradient: "from-indigo-50 to-indigo-100",
    icon: "💉",
  },
  {
    id: "mounjaro",
    name: "Mounjaro",
    generic: "Tirzepatide（替爾泊肽）",
    manufacturer: "Eli Lilly",
    approval: "FDA 核准（2022）",
    use: "血糖控制 + 減重（雙重作用）",
    mechanism: "GLP-1 + GIP 雙受體激動劑，減重效果更顯著",
    dosing: "每週注射一次，劑量漸進至 15mg",
    sideEffects: "惡心、嘔吐、食慾下降、腹瀉",
    price: "$1,000-$1,200/月",
    color: "bg-purple-500",
    textColor: "text-purple-600",
    gradient: "from-purple-50 to-purple-100",
    icon: "💉",
  },
  {
    id: "zepbound",
    name: "Zepbound",
    generic: "Tirzepatide（替爾泊肽）",
    manufacturer: "Eli Lilly",
    approval: "FDA 核准（2023）",
    use: "減重專用",
    mechanism: "GLP-1 + GIP 雙受體激動劑，最強效減重選項",
    dosing: "每週注射一次，劑量最高 15mg",
    sideEffects: "惡心、嘔吐、腹瀉、疲勞",
    price: "$1,000-$1,300/月",
    color: "bg-pink-500",
    textColor: "text-pink-600",
    gradient: "from-pink-50 to-pink-100",
    icon: "💉",
  },
];

export default function MedicationsPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">GLP-1 藥物選項</h1>
          <p className="text-xl text-gray-600">認識四種主要減重藥物，找到適合您的方案</p>
        </div>
      </section>

      {/* Drug Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {drugs.map((drug) => (
              <div
                key={drug.id}
                id={drug.id}
                className={`bg-gradient-to-br ${drug.gradient} rounded-2xl overflow-hidden shadow-lg`}
              >
                <div className={`${drug.color} h-3`} />
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${drug.color} w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}>
                      {drug.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{drug.name}</h2>
                      <p className="text-gray-500">{drug.generic}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/60 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">藥廠</p>
                      <p className="font-medium text-gray-900">{drug.manufacturer}</p>
                    </div>
                    <div className="bg-white/60 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">核准</p>
                      <p className="font-medium text-gray-900">{drug.approval}</p>
                    </div>
                    <div className="bg-white/60 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">用途</p>
                      <p className={`font-medium ${drug.textColor}`}>{drug.use}</p>
                    </div>
                    <div className="bg-white/60 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">費用</p>
                      <p className="font-semibold text-emerald-600">{drug.price}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">作用機制</p>
                      <p className="text-sm text-gray-600">{drug.mechanism}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">用法用量</p>
                      <p className="text-sm text-gray-600">{drug.dosing}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">常見副作用</p>
                      <p className="text-sm text-gray-600">{drug.sideEffects}</p>
                    </div>
                  </div>

                  <Link
                    href="/assessment"
                    className={`mt-6 block text-center ${drug.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
                  >
                    免費評估是否適合
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">藥物比較</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">藥物</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">主成分</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">作用</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">頻率</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">費用/月</th>
                </tr>
              </thead>
              <tbody>
                {drugs.map((drug) => (
                  <tr key={drug.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">{drug.name}</td>
                    <td className="py-4 px-4 text-gray-600">{drug.generic}</td>
                    <td className={`py-4 px-4 font-medium ${drug.textColor}`}>{drug.use}</td>
                    <td className="py-4 px-4 text-gray-600">每週一次</td>
                    <td className="py-4 px-4 font-semibold text-emerald-600">{drug.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">想了解哪種藥物適合您？</h2>
          <p className="text-emerald-100 mb-8">完成免費評估，讓醫師為您推薦</p>
          <Link href="/assessment" className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
            開始免費評估
          </Link>
        </div>
      </section>
    </div>
  );
}
