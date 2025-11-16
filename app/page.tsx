import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-[500px] flex items-center" style={{
        backgroundImage: 'url(/banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-sky-500/40 backdrop-blur-[2px]"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            BYYOURSIDE SOCIETY
          </h1>
          <p className="text-2xl md:text-3xl text-white font-medium drop-shadow-md">
            Assisting and empowering the underpriveledged for a brighter tomorrow.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">ABOUT US</h2>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
            ByYourSide Society is a youth-led compassionate initiative dedicated to uplifting the less fortunate in Vancouver and the lower mainland. Committed to fostering positive transformation, it brings hope, support, and change to the local community, embodying solidarity and progress for all.
          </p>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="py-20 px-6 bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">INITIATIVES</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Operation Hunger */}
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition border-t-4 border-sky-400">
              <div className="text-5xl mb-6">🍽️</div>
              <h3 className="text-3xl font-bold text-sky-600 mb-4">OPERATION HUNGER</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Providing nutritious meals and food resources to those facing food insecurity in our community.
              </p>
              <a href="#" className="inline-block bg-sky-500 text-white px-8 py-3 rounded-full hover:bg-sky-600 transition font-medium">
                LEARN MORE
              </a>
            </div>

            {/* Project Warmth */}
            <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition border-t-4 border-sky-400">
              <div className="text-5xl mb-6">👕</div>
              <h3 className="text-3xl font-bold text-sky-600 mb-4">PROJECT WARMTH</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Distributing warm clothing and essential items to help community members stay safe during cold weather.
              </p>
              <a href="#" className="inline-block bg-sky-500 text-white px-8 py-3 rounded-full hover:bg-sky-600 transition font-medium">
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6 bg-sky-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            "EDUCATION IS THE MOST POWERFUL WEAPON WHICH YOU CAN USE TO CHANGE THE WORLD"
          </blockquote>
          <p className="text-2xl font-medium">— NELSON MANDELA</p>
        </div>
      </section>

      {/* Partner Organizations Section */}
      <section id="organizations" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">PARTNER ORGANIZATIONS</h2>
          <p className="text-xl text-gray-700 mb-12 text-center max-w-4xl mx-auto">
            WE COLLABORATE WITH LEADING ORGANIZATIONS TO MAXIMIZE OUR IMPACT IN THE COMMUNITY.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
              <div className="aspect-[4/3] bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center p-6">
                <span className="text-5xl">🏘️</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white font-bold text-lg text-center">Collingwood Neighbourhood House</h3>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
              <div className="aspect-[4/3] bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center p-6">
                <span className="text-5xl">🍲</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white font-bold text-lg text-center">Greater Vancouver Food Bank</h3>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
              <div className="aspect-[4/3] bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center p-6">
                <span className="text-5xl">👥</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white font-bold text-lg text-center">Big Brothers of Greater Vancouver</h3>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
              <div className="aspect-[4/3] bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center p-6">
                <span className="text-5xl">⛪</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white font-bold text-lg text-center">The Salvation Army</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 px-6 bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">OUR INSTAGRAM</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <a 
              href="https://www.instagram.com/byyoursidesociety" 
              target="_blank" 
              rel="noopener noreferrer"
              className="aspect-square rounded-lg hover:scale-105 transition cursor-pointer overflow-hidden shadow-lg"
            >
              <img src="/BYSSPic1.jpg" alt="ByYourSide Society Event" className="w-full h-full object-cover" />
            </a>
            <a 
              href="https://www.instagram.com/byyoursidesociety" 
              target="_blank" 
              rel="noopener noreferrer"
              className="aspect-square rounded-lg hover:scale-105 transition cursor-pointer overflow-hidden shadow-lg"
            >
              <img src="/BYSSPic2.jpg" alt="ByYourSide Society Event" className="w-full h-full object-cover" />
            </a>
            <a 
              href="https://www.instagram.com/byyoursidesociety" 
              target="_blank" 
              rel="noopener noreferrer"
              className="aspect-square rounded-lg hover:scale-105 transition cursor-pointer overflow-hidden shadow-lg"
            >
              <img src="/BYSSPic3.jpg" alt="ByYourSide Society Event" className="w-full h-full object-cover" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
