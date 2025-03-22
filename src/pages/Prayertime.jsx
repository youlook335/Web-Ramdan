import React, { useState, useEffect } from "react";

const PrayerTimes = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [city, setCity] = useState("Karachi");
    const [country, setCountry] = useState("Pakistan");

    const prayerDurations = {
        Fajr: "Sunrise",
        Dhuhr: "Asr",
        Asr: "Maghrib",
        Maghrib: "Isha",
        Isha: "Midnight"
    };

    const fetchPrayerTimes = async () => {
        try {
            const hanafiResponse = await fetch(
                `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1`
            );
            const jafriaResponse = await fetch(
                `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=5`
            );

            const hanafiData = await hanafiResponse.json();
            const jafriaData = await jafriaResponse.json();

            setPrayerTimes({
                Hanafi: hanafiData.data.timings,
                Jafria: jafriaData.data.timings
            });
        } catch (error) {
            console.error("Error fetching prayer times:", error);
        }
    };

    useEffect(() => {
        fetchPrayerTimes();
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [city, country]);

    const calculateRemainingTime = (time) => {
        const [hours, minutes] = time.split(":" ).map(Number);
        let prayerTime = new Date();
        prayerTime.setHours(hours, minutes, 0);

        if (prayerTime < currentTime) {
            prayerTime.setDate(prayerTime.getDate() + 1);
        }

        const diff = prayerTime - currentTime;
        const remainingHours = Math.floor(diff / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((diff / (1000 * 60)) % 60);
        const remainingSeconds = Math.floor((diff / 1000) % 60);

        return `${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s remaining`;
    };

    const convertTo12HourFormat = (time) => {
        let [hours, minutes] = time.split(":" ).map(Number);
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
    };

    if (!prayerTimes) {
        return <h1 className="text-white text-center mt-10">⏳ Loading...</h1>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="flex justify-center mb-6">
                <input 
                    type="text" 
                    className="p-2 bg-gray-800 text-white rounded" 
                    placeholder="Enter City" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                />
                <input 
                    type="text" 
                    className="p-2 bg-gray-800 text-white rounded ml-4" 
                    placeholder="Enter Country" 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)} 
                />
            </div>
            <h1 className="text-center text-3xl font-bold mb-6">
                🕒 Current Time: {convertTo12HourFormat(currentTime.toLocaleTimeString("en-US", { hour12: false }))}
            </h1>
            <div>
                <h2 className="text-2xl font-bold text-center text-green-500 mb-4">Jafria Prayer Times</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(prayerTimes.Jafria).map(([name, time]) => (
                        <div key={name} className="bg-gray-800 p-4 rounded-lg text-center shadow-lg">
                            <h3 className="text-lg font-semibold text-yellow-400">{name}</h3>
                            <p className="text-2xl font-bold">{convertTo12HourFormat(time)}</p>
                            <p className="text-gray-300">{calculateRemainingTime(time)}</p>
                            <p className="text-sm text-gray-400 mt-2">
                                {prayerDurations[name] ? `⏳ ${time} - ${prayerDurations[name]}` : ""}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">Hanafi Prayer Times</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(prayerTimes.Hanafi).map(([name, time]) => (
                        <div key={name} className="bg-gray-800 p-4 rounded-lg text-center shadow-lg">
                            <h3 className="text-lg font-semibold text-yellow-400">{name}</h3>
                            <p className="text-2xl font-bold">{convertTo12HourFormat(time)}</p>
                            <p className="text-gray-300">{calculateRemainingTime(time)}</p>
                            <p className="text-sm text-gray-400 mt-2">
                                {prayerDurations[name] ? `⏳ ${time} - ${prayerDurations[name]}` : ""}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrayerTimes;