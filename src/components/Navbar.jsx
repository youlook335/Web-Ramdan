import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get Current Page

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/About" },
        { name: "Quran", path: "/Quran" },
        { name: "Sehri", path: "/Sehri" },
        { name: "Iftar", path: "/Iftar" },
        { name: "Prayertime", path: "/Prayertime" },
        { name: "Surath", path: "/Surath" },
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg text-white py-4 z-50">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-2xl font-bold tracking-wide text-yellow-400">BootPress</h1>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.path} 
                                    className={`relative text-lg font-medium px-4 py-2 transition-all duration-300 ${
                                        location.pathname === link.path ? "text-yellow-400" : "text-white"
                                    } group`}
                                >
                                    {link.name}
                                    {/* Underline Effect on Hover */}
                                    <span className="absolute left-0 bottom-0 w-full h-1 rounded bg-[#0d6efd] transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`absolute top-full left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
                    <ul className="text-center py-4 space-y-2">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link 
                                    to={link.path} 
                                    className={`block py-3 text-lg font-medium transition-all duration-300 ${
                                        location.pathname === link.path ? "text-yellow-400" : "text-white hover:text-yellow-400"
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* ✅ Page Content (Navbar کے نیچے نظر آئے گا) */}
            <div className="pt-20 bg-gray-900">
            </div>
        </>
    );
};

export default Navbar;
