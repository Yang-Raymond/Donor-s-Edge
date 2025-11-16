import Link from "next/link";
import { FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer id="contact" className="py-16 px-6 bg-sky-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">CONTACT US</h3>
              <p className="text-gray-100">byyoursidesociety@gmail.com</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">QUICK LINKS</h3>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-100 hover:text-white transition">ABOUT</a>
                <a href="#initiatives" className="block text-gray-100 hover:text-white transition">INITIATIVES</a>
                <a href="#organizations" className="block text-gray-100 hover:text-white transition">PARTNER ORGANIZATIONS</a>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdfMCZMJendPzbibU-I_YAZBHymW2lKr6-pmZihGRlGcp_GIQ/viewform" target="_blank" rel="noopener noreferrer" className="block text-gray-100 hover:text-white transition">APPLY NOW</a>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <Link href="https://www.instagram.com/byyoursidesociety" className="text-xl hover:text-white transition">
                  <p className="flex items-center gap-2">
                    <FaInstagram className="text-2xl" />
                    <span>Instagram</span>
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-sky-500 pt-8 text-center bg-sky-700">
            <p className="mb-2">BYYOURSIDE SOCIETY - Assisting and empowering the underpriveledged for a brighter tomorrow.</p>
            <p className="text-sm">
              © 2025 BYYOURSIDE SOCIETY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    )
}