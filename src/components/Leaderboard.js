"use client";
import { useEffect, useState } from 'react';
import { database } from '@/lib/firebaseConfig';
import { ref, query, orderByChild, limitToLast, onValue } from 'firebase/database';

export default function Leaderboard() {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const scoresRef = query(ref(database, 'leaderboard'), orderByChild('score'), limitToLast(10));

        // Listen for data changes
        const unsubscribe = onValue(scoresRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Firebase returns objects with keys, convert to array and sort
                const scoresArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort descending locally because limitToLast returns ascending order from Firebase
                scoresArray.sort((a, b) => b.score - a.score);
                setScores(scoresArray);
            } else {
                setScores([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p className="text-center text-white">Loading Leaderboard...</p>;

    return (
        <div className="bg-white/90 p-6 rounded-2xl shadow-xl max-w-md w-full backdrop-blur-sm">
            <h3 className="text-2xl font-black text-blue-600 mb-4 text-center">👑 JUARA LOGIKA 👑</h3>
            <div className="space-y-3">
                {scores.length === 0 ? (
                    <p className="text-center text-gray-500">Belum ada juara. Jadilah yang pertama!</p>
                ) : (
                    scores.map((entry, index) => (
                        <div
                            key={entry.id}
                            className={`flex justify-between items-center p-3 rounded-lg ${index === 0 ? 'bg-yellow-100 border border-yellow-300' : 'bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${index === 0 ? 'bg-yellow-400 text-yellow-900' :
                                        index === 1 ? 'bg-gray-300 text-gray-800' :
                                            index === 2 ? 'bg-orange-300 text-orange-900' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {index + 1}
                                </span>
                                <span className="font-bold text-gray-700">{entry.name}</span>
                            </div>
                            <span className="font-mono font-bold text-blue-600">{entry.score} Poin</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
