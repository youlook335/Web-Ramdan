import { useState, useEffect } from "react";
import axios from "axios";

const Iftar: React.FC = () => {
  const [city, setCity] = useState<string>("Karachi");
  const [iftarTime, setIftarTime] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchTime() {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Pakistan&method=2`
        );
        setIftarTime(response.data.data.timings.Maghrib);
        updateRemainingTime(response.data.data.timings.Maghrib);
      } catch (error) {
        console.error("Error fetching prayer times", error);
      }
    }
    fetchTime();
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (iftarTime) {
        updateRemainingTime(iftarTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [iftarTime]);

  function updateRemainingTime(maghribTime: string) {
    const now = new Date();
    const [hours, minutes] = maghribTime.split(":").map(Number);
    const maghrib = new Date();
    maghrib.setHours(hours, minutes, 0);
    const diff = maghrib.getTime() - now.getTime();

    if (diff > 0) {
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      setRemainingTime(`Iftar in ${mins} min ${secs} sec`);
    } else {
      setRemainingTime("It's time for Iftar!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold">🌙 Iftar Time</h1>
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
        <p className="text-xl font-semibold text-green-600">Iftar Time: {iftarTime}</p>
        <p className="text-lg text-red-500 mt-3 font-medium">{remainingTime}</p>
      </div>
    </div>
  );
};

export default Iftar;
