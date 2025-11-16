import Image from 'next/image'

export default function Header() {
    return (
        <nav className="fixed top-0 w-full bg-gray-100 backdrop-blur-sm z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-4">
                        <Image src="/logo.svg" alt="ByYourSide Society Logo" width={50} height={50} />
                        <span className="text-xl font-semibold text-gray-900">ByYourSide Society</span>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#team" className="text-gray-700 hover:text-gray-900 transition font-medium">Our Team</a>
                        <a href="#initiatives" className="text-gray-700 hover:text-gray-900 transition font-medium">Our Initiatives</a>
                        <a href="#apply" className="bg-sky-400 text-white px-6 py-2.5 rounded-md hover:bg-sky-500 transition font-medium">Get Involved</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}