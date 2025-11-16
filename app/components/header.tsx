export default function Header() {
    return (
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
    )
}