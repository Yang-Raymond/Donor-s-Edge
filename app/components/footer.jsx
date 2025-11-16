export default function Footer() {
    return (
        <footer id="contact" className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">CONTACT US</h3>
              <p className="text-gray-300">INFO@BYYOURSSIDE.ORG</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">QUICK LINKS</h3>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-300 hover:text-sky-400 transition">ABOUT</a>
                <a href="#initiatives" className="block text-gray-300 hover:text-sky-400 transition">INITIATIVES</a>
                <a href="#schools" className="block text-gray-300 hover:text-sky-400 transition">PARTNER SCHOOLS</a>
                <a href="#apply" className="block text-gray-300 hover:text-sky-400 transition">APPLY NOW</a>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-3xl hover:text-sky-400 transition">📷</a>
                <a href="#" className="text-3xl hover:text-sky-400 transition">📘</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="mb-2">BYYOURSIDE SOCIETY - SUPPORTING STUDENTS, BUILDING FUTURES</p>
            <p className="text-sm">
              © 2025 BYYOURSIDE SOCIETY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    )
}