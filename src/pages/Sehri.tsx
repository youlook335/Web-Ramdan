import { useState, useEffect } from "react";
import axios from "axios";

const Sehri: React.FC = () => {
  const [city, setCity] = useState<string>("Karachi");
  const [country, setCountry] = useState<string>("Pakistan");
  const [sehriTime, setSehriTime] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    async function fetchTime() {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`
        );
        setSehriTime(response.data.data.timings.Fajr);
      } catch (error) {
        console.error("Error fetching prayer times", error);
      }
    }
    fetchTime();
  }, [city, country]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (sehriTime) {
        const [sehriHours, sehriMinutes] = sehriTime.split(":").map(Number);
        const sehriDate = new Date();
        sehriDate.setHours(sehriHours, sehriMinutes, 0);
        const diff = sehriDate.getTime() - new Date().getTime();
        if (diff > 0) {
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setTimeRemaining(`${hours} گھنٹے ${minutes} منٹ ${seconds} سیکنڈ باقی ہیں`);
        } else {
          setTimeRemaining("سحری کا وقت ختم ہو چکا ہے");
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sehriTime]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold">🌙 Sehri Time</h1>
      <p className="text-lg">Today’s Date: {currentTime.toDateString()}</p>
      <p className="text-lg">Current Time: {currentTime.toLocaleTimeString()}</p>
      <p className="text-lg text-yellow-400">{timeRemaining}</p>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 border rounded-lg shadow-md text-gray-900 w-40 text-center"
          placeholder="Enter city"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-3 border rounded-lg shadow-md text-gray-900 w-40 text-center"
          placeholder="Enter country"
        />
      </div>
      <div className="mt-4 bg-white text-gray-900 p-4 rounded-lg shadow-md w-80">
        <p className="text-xl font-semibold text-yellow-600">Sehri Time: {sehriTime}</p>
      </div>
    </div>
  );
};

export default Sehri; 