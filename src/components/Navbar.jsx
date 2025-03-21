import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">BootPress</h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
                    <li><Link to="/About" className="hover:text-gray-400">About</Link></li>
                    <li><Link to="/Quran" className="hover:text-gray-400">Quran</Link></li>
                    <li><Link to="/Sehri" className="hover:text-gray-400">Sehri</Link></li>
                    <li><Link to="/Iftar" className="hover:text-gray-400">Iftar</Link></li>
                    <li><Link to="/Prayertime" className="hover:text-gray-400">Prayertime</Link></li>
                    <li><Link to="/Zakat" className="hover:text-gray-400">Zakat</Link></li>
                </ul>

                {/* Mobile Menu Button */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden mt-4 space-y-2 text-center">
                    <li><Link to="/" className="block py-2 hover:bg-gray-800">Home</Link></li>
                    <li><Link to="/About" className="block py-2 hover:bg-gray-800">About</Link></li>
                    <li><Link to="/Quran" className="block py-2 hover:bg-gray-800">Quran</Link></li>
                    <li><Link to="/Sehri" className="block py-2 hover:bg-gray-800">Sehri</Link></li>
                    <li><Link to="/iftar" className="block py-2 hover:bg-gray-800">iftar</Link></li>
                    <li><Link to="/Prayertime" className="block py-2 hover:bg-gray-800">Prayertime</Link></li>
                    <li><Link to="/Zakat" className="block py-2 hover:bg-gray-800">Zakat</Link></li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
