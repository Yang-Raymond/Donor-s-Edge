import Image from 'next/image'

export default function Header() {
    return (
        <nav className="fixed top-0 w-full bg-sky-100 backdrop-blur-sm z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-4">
                        <div className="bg-sky-500 p-2 relative">
                            <Image src="/logo.svg" alt="ByYourSide Society Logo" width={50} height={50} />
                        </div>
                        <span className="text-xl font-semibold text-gray-900">ByYourSide Society</span>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#team" className="text-gray-700 hover:text-gray-900 transition font-medium">Our Team</a>
                        <a href="#initiatives" className="text-gray-700 hover:text-gray-900 transition font-medium">Our Initiatives</a>
                        <a href="#apply" className="bg-sky-500 text-white px-8 py-3 rounded-lg hover:bg-sky-600 transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">Donor's Edge</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}