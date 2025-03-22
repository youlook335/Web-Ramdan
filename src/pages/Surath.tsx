import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const QuranSurahs = () => {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data))
      .catch((error) => console.error("Error fetching surahs:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-900 to-gray-900 text-yellow-400 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-6">قرآن کی سورتیں</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {surahs.map((surah) => (
          <Link
            key={surah.number}
            to={`/surah/${surah.number}`}
            className="flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 
            text-yellow-400 rounded-lg shadow-lg p-6 transition-all duration-300 cursor-pointer"
          >
            <span className=" text-xl font-bold">{surah.number}</span>
            <span className="text-white text-lg font-semibold mt-2">{surah.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuranSurahs;
