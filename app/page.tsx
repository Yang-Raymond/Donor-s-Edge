import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-green-700">GARDENBANK</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-green-700 transition">ABOUT</a>
              <a href="#initiatives" className="text-gray-700 hover:text-green-700 transition">INITIATIVES</a>
              <a href="#schools" className="text-gray-700 hover:text-green-700 transition">SCHOOLS</a>
              <a href="#contact" className="text-gray-700 hover:text-green-700 transition">CONTACT</a>
              <a href="#apply" className="bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition">APPLY NOW</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            GARDENBANK CONSERVATION SOCIETY
          </h1>
          <p className="text-2xl md:text-3xl text-green-700 font-medium">
            ROOTING FOR THE EARTH, ONE GARDEN AT A TIME.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">ABOUT US</h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
            GARDENBANK IS A NON-PROFIT ORGANIZATION BASED IN THE GREATER VANCOUVER AREA AIMING TO TACKLE FOOD DISPARITY 
            AND PROMOTE SUSTAINABILITY. OUR LOCAL INITIATIVES INCLUDE THE CONSTRUCTION OF SCHOOL GARDENS OR DONATIONS OF 
            COMMUNITY RESOURCES.
          </p>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">INITIATIVES</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Environmental */}
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-6">🌱</div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">ENVIRONMENTAL</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our environmental projects aim to integrate climate conservation into service and education worldwide.
              </p>
              <a href="#" className="inline-block bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition font-medium">
                LEARN MORE
              </a>
            </div>
            
            {/* Humanitarian */}
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-6">🤝</div>
              <h3 className="text-3xl font-bold text-green-700 mb-4">HUMANITARIAN</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our humanitarian projects aim to spread awareness and support those in need within our communities.
              </p>
              <a href="#" className="inline-block bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition font-medium">
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            "THE GREATEST THREAT TO OUR PLANET IS THE BELIEF THAT SOMEONE ELSE WILL SAVE IT"
          </blockquote>
          <p className="text-2xl font-medium">— ROBERT SWAN</p>
        </div>
      </section>

      {/* Schools Section */}
      <section id="schools" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">GARDENBANK SCHOOLS</h2>
          <p className="text-xl text-gray-700 mb-12 text-center max-w-4xl mx-auto">
            SINCE OUR ESTABLISHMENT IN 2019, WE HAVE STARTED CHAPTERS AT 10 DIFFERENT HIGH-SCHOOLS ACROSS THE LOWER MAINLAND.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
                <div className="aspect-[4/3] bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
                  <span className="text-6xl">🌿</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white font-bold text-xl">School Chapter {i}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">OUR INSTAGRAM</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-green-300 to-green-500 rounded-lg hover:scale-105 transition cursor-pointer flex items-center justify-center">
                <span className="text-4xl">📸</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
