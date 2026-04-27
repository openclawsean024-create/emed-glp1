import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">eM</span>
              </div>
              <span className="text-xl font-semibold text-white">eMed</span>
            </div>
            <p className="text-sm text-gray-400">
              專業的 GLP-1 減重醫療平台，讓您在家就能獲得專業醫療服務。
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">服務</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/assessment" className="hover:text-emerald-400">資格評估</Link></li>
              <li><Link href="/medications" className="hover:text-emerald-400">藥物資訊</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400">方案價格</Link></li>
              <li><Link href="/consultation" className="hover:text-emerald-400">預約問診</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">藥物</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/medications#ozempic" className="hover:text-emerald-400">Ozempic</Link></li>
              <li><Link href="/medications#wegovy" className="hover:text-emerald-400">Wegovy</Link></li>
              <li><Link href="/medications#mounjaro" className="hover:text-emerald-400">Mounjaro</Link></li>
              <li><Link href="/medications#zepbound" className="hover:text-emerald-400">Zepbound</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">聯絡</h3>
            <ul className="space-y-2 text-sm">
              <li>📧 support@emedhealth.com</li>
              <li>📞 1-800-emed-health</li>
              <li className="pt-2">
                <span className="inline-flex items-center text-emerald-400">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  HIPAA 合規
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © 2026 eMed Health. All rights reserved. | 您的健康，我們守護
        </div>
      </div>
    </footer>
  );
}