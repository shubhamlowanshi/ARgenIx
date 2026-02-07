import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import axios from "axios";
import { startStream } from "./StreamSimulator";
import EventRow from "./EventRow";

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [latestFromDB, setLatestFromDB] = useState([]);
    const [loading, setLoading] = useState(false);

    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        console.log("API URL =", API);
    }, [API]);

    const addEvent = useCallback((e) => {
        setEvents((prev) => {
            const updated = [e, ...prev];
            return updated.slice(0, 5000);
        });
    }, []);

    useEffect(() => {
        const id = startStream(addEvent);
        return () => clearInterval(id);
    }, [addEvent]);

    const filtered = useMemo(() => {
        return events.filter((e) =>
            (e.name || "").toLowerCase().includes(search.toLowerCase())
        );
    }, [events, search]);

    const pushToServer = async () => {
        if (!filtered[0]) {
            alert("List empty hai bhai!");
            return;
        }

        const record = filtered[0];

        try {
            setLoading(true);

            await axios.post(`${API}/api/events`, {
                source: record.name,
                value: record.value,
                meta: {
                    uiId: record.id,
                    uiTime: record.time,
                },
            });

            fetchLatest();
        } catch (err) {
            alert(err.response?.data?.message || "Backend error");
        } finally {
            setLoading(false);
        }
    };

    const fetchLatest = async () => {
        try {
            const res = await axios.get(`${API}/api/events/latest`);
            setLatestFromDB(res.data);
        } catch (err) {
            console.log("Backend not connected:", err.message);
            setLatestFromDB([]);
        }
    };


    useEffect(() => {
        fetchLatest();
        const id = setInterval(fetchLatest, 3000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold tracking-wide">
                    ⚡ SentinelX Monitor
                </h1>

                <div className="text-xs bg-green-900 px-3 py-1 rounded-full animate-pulse">
                    LIVE STREAMING
                </div>
            </div>

            <div className="flex gap-4 mb-6">
                <input
                    placeholder="Search sensor..."
                    className="bg-gray-800 border border-gray-700 p-2 rounded w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    onClick={pushToServer}
                    className="bg-blue-600 hover:bg-blue-700 transition px-4 rounded flex items-center gap-2"
                >
                    {loading ? "Saving..." : "Send Latest → Backend"}
                </button>
            </div>

          
            <div className="mb-6 backdrop-blur bg-white/5 p-4 rounded-xl border border-white/10 shadow-xl">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                    🟢 Latest From DB
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Array.isArray(latestFromDB) &&
                        latestFromDB.slice(0, 4).map((e) => (

                            <div
                                key={e._id}
                                className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition text-sm flex justify-between"
                            >
                                <span>{e.source}</span>
                                <span className="text-green-400">{e.value}</span>
                                <span className="text-gray-400">
                                    {new Date(e.createdAt).toLocaleTimeString()}
                                </span>
                            </div>
                        ))}
                </div>
            </div>

        
            <div className="border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur bg-white/5">
                <div className="grid grid-cols-4 bg-black/40 p-3 font-bold text-sm tracking-wide">
                    <div>Name</div>
                    <div>Value</div>
                    <div>Time</div>
                    <div>ID</div>
                </div>

                <Virtuoso
                    style={{ height: 520 }}
                    data={filtered}
                    itemContent={(index, item) => (
                        <EventRow index={index} event={item} />
                    )}
                />
            </div>

            <p className="text-xs text-gray-400 mt-3 text-right">
                Total in memory: {filtered.length}
            </p>
        </div>
    );
};

export default Dashboard;
