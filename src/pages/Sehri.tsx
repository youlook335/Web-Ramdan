import { useState, useEffect } from "react";
import axios from "axios";

const Sehri: React.FC = () => {
  const [city, setCity] = useState<string>("Karachi");
  const [sehriTime, setSehriTime] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchTime() {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Pakistan&method=2`
        );
        setSehriTime(response.data.data.timings.Fajr);
      } catch (error) {
        console.error("Error fetching prayer times", error);
      }
    }
    fetchTime();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold">🌙 Sehri Time</h1>
      <p className="text-lg">Today’s Date: {currentTime.toDateString()}</p>
      <p className="text-lg">Current Time: {currentTime.toLocaleTimeString()}</p>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="p-3 border rounded-lg mt-4 shadow-md text-gray-900 w-80 text-center"
        placeholder="Enter city name"
      />
      <div className="mt-4 bg-white text-gray-900 p-4 rounded-lg shadow-md w-80">
        <p className="text-xl font-semibold text-yellow-600">Sehri Time: {sehriTime}</p>
      </div>
    </div>
  );
};

export default Sehri;
