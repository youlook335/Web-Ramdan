import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ParaPage = () => {
    const { paraNumber } = useParams();
    const [ayahs, setAyahs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuranText = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.alquran.cloud/v1/juz/${paraNumber}/ar.alafasy`);
                const data = await response.json();

                if (data && data.data && data.data.ayahs) {
                    setAyahs(data.data.ayahs);
                }
            } catch (error) {
                console.error("Error fetching Quran data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuranText();
    }, [paraNumber]);

    return (
        <div className="bg-gray-900 p-5">
        <div className="bg-gray-900  max-w-5xl mx-auto">
            <Link to="/Quran" className="text-blue-400 mb-4 text-lg font-bold">
                ← Go To Back
            </Link>
        </div>
        <div className="bg-gray-900 text-white flex flex-col items-center p-6">
            {/* Go To Back Button */}

            <h1 className="no-underline text-4xl font-bold mb-6 border-b-2 pb-2"> پارہ {paraNumber}</h1>
            <div className="w-full max-w-5xl bg-gray-800 p-6 shadow-lg rounded-lg">
                
                {loading ? (
                    <p className="text-center text-gray-400">لوڈ ہو رہا ہے...</p>
                ) : (

                    <div className="space-y-6 text-right">

                        {ayahs.map((ayah, index) => (
                            <p key={index} className="text-2xl leading-loose border-b border-gray-600 pb-3">
                                {ayah.text} 
                                <span className="text-yellow-400"> ({ayah.surah.number}:{ayah.numberInSurah})</span>
                            </p>
                        ))}
                        
                    </div>
                )}
            </div>
            
        </div>
        </div>
    );
};

export default ParaPage;
