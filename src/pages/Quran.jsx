import { Link } from "react-router-dom";

const QuranPage = () => {
    const paraList = [
        "ٱلْفَاتِحَةُ", "سَيَقُولُ", "تِلْكَ ٱلرُّسُلُ", "لَنْ تَنَالُواْ", "وَٱلْمُحْصَنَاتُ",
        "لَا يُحِبُّ ٱللَّهُ", "وَإِذَا سَمِعُواْ", "وَلَوْ أَنَّنَا", "قَدْ أَفْلَحَ", "يَعْتَذِرُونَ",
        "يَعْلَمُونَ", "وَمَا مِن دَآبَّةٍ", "وَمَآ أُبَرِّئُ", "رُّبَمَا", "سُبْحَانَ ٱلَّذِى",
        "قَالَ أَلَمْ", "ٱقْتَرَبَتِ ٱلسَّاعَةُ", "قَدْ أَفْلَحَ", "وَقَالَ ٱلَّذِينَ", "أَمَّنْ خَلَقَ",
        "ٱتْلُ مَآ أُوحِىَ", "وَمَن يَقْنُتْ", "وَمَالِىَ", "فَمَنْ أَظْلَمُ", "إِلَيْهِ يُرَدُّ",
        "حٰمٓ ٱلسَّجْدَةُ", "قَالَ فَمَا خَطْبُكُمْ", "قَدْ سَمِعَ ٱللَّهُ", "تَبٰرَكَ ٱلَّذِى", "عَمَّ يَتَسَآءَلُونَ"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-900 via-gray-900 to-black text-white flex flex-col items-center p-6">
            
            {/* Animated Header */}
            <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text bg-gradient-to-r from-yellow-400 to-green-500 animate-pulse">
                 قرآن - پارے منتخب کریں
            </h1>

            {/* Grid Layout for Cards (5 per row) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl w-full">
                {paraList.map((para, index) => (
                    <Link
                        key={index}
                        to={`/para/${index + 1}`}
                        className="bg-white bg-opacity-10 backdrop-blur-lg border border-gray-700 text-white py-6 px-6 rounded-xl shadow-xl 
                        text-xl font-semibold text-center transition-all duration-300 hover:bg-green-600 hover:scale-105 hover:shadow-2xl"
                    >
                        <span className="block text-3xl font-bold text-yellow-400">{index + 1}</span>
                        <span className="text-2xl font-arabic">{para}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuranPage;
