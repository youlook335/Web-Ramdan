import { useState, useEffect } from "react";
import axios from "axios";

function SehriIftarTime() {
  const [city, setCity] = useState("Karachi");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    async function fetchTimes() {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Pakistan&method=2`
        );
        setPrayerTimes(response.data.data.timings);
        updateRemainingTime(response.data.data.timings.Maghrib);
      } catch (error) {
        console.error("Error fetching prayer times", error);
      }
    }
    fetchTimes();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (prayerTimes) {
        updateRemainingTime(prayerTimes.Maghrib);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  function updateRemainingTime(maghribTime) {
    const now = new Date();
    const [hours, minutes] = maghribTime.split(":").map(Number);
    const maghrib = new Date();
    maghrib.setHours(hours, minutes, 0);
    const diff = maghrib - now;

    if (diff > 0) {
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setRemainingTime(`Iftar in ${mins} min ${secs} sec`);
    } else {
      setRemainingTime("It's time for Iftar!");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-6">
        
        {/* Live Clock */}
        <div className="absolute top-5 right-5 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-md text-lg font-semibold">
          {currentTime.toLocaleTimeString()}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">🌙 Ramadan Timings</h1>

        {/* City Input */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 border rounded-lg mb-6 shadow-md w-80 text-center text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter city name"
        />

        {/* Prayer Timings Box */}
        {prayerTimes && (
          <div className="bg-white bg-opacity-20 text-white backdrop-blur-lg p-6 rounded-lg shadow-lg w-80 border border-white border-opacity-30">
            <p className="text-xl font-semibold text-yellow-300">Sehri: {prayerTimes.Fajr}</p>
            <p className="text-xl font-semibold text-green-300">Iftar: {prayerTimes.Maghrib}</p>
            <p className="text-lg text-red-400 mt-3 font-medium">{remainingTime}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default SehriIftarTime;
