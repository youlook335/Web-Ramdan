import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SurahDetail = () => {
    const { id } = useParams();
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://api.alquran.cloud/v1/surah/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSurah(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching surah:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p className="text-gray-400 mt-4 text-lg"> Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link to="/Surath" className="font-bold text-lg text-blue-400 mb-4 inline-block">
                    ← Go To Back
                </Link>

                {/* سورۃ کا نام */}
                <h2 className="text-3xl font-extrabold text-center border-b border-gray-700 pb-2 mb-4">
                    {surah.number}. {surah.englishName} ({surah.name})
                </h2>

                {/* آیات */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-right">
                    {surah.ayahs.map((ayah) => (
                        <p key={ayah.number} className="mb-4 text-xl leading-loose">
                            {ayah.text}
                            <span className="text-yellow-400 ayah-number"> ({surah.number}:{ayah.numberInSurah})</span>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SurahDetail;
