export default function Footer() {
    return (
        <footer id="contact" className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">CONTACT US</h3>
              <p className="text-gray-300">ADMIN@GARDENBANKSOCIETY.ORG</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">QUICK LINKS</h3>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-300 hover:text-white transition">ABOUT</a>
                <a href="#initiatives" className="block text-gray-300 hover:text-white transition">ACTIVITIES</a>
                <a href="#schools" className="block text-gray-300 hover:text-white transition">OUR TEAM</a>
                <a href="#apply" className="block text-gray-300 hover:text-white transition">APPLY NOW</a>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-3xl hover:text-green-400 transition">📷</a>
                <a href="#" className="text-3xl hover:text-green-400 transition">📘</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="mb-2">LOGO: KEVIN LIU | IT TEAM: LAYLA JOHNSON, CINDY LIU</p>
            <p className="text-sm">
              GARDENBANK IS LEGALLY INCORPORATED UNDER THE SOCIETIES ACT OF BRITISH COLUMBIA. NON-PROFIT NUMBER: S0071965
            </p>
          </div>
        </div>
      </footer>
    )
}