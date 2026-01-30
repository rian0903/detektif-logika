"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
        <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md border-2 border-white/50">
            <h3 className="text-xl sm:text-2xl font-black text-blue-600 mb-4 text-center items-center flex justify-center gap-2">
                👑 <span>JUARA LOGIKA</span> 👑
            </h3>
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                {scores.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">Belum ada juara. Jadilah yang pertama!</p>
                ) : (
                    scores.map((entry, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={entry.id}
                            className={`flex justify-between items-center p-3 rounded-lg border shadow-sm ${index === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-300' :
                                index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-50 border-gray-300' :
                                    index === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-300' :
                                        'bg-white border-gray-100'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full font-bold shadow-sm ${index === 0 ? 'bg-yellow-400 text-yellow-900 border-2 border-yellow-200' :
                                    index === 1 ? 'bg-gray-300 text-gray-800 border-2 border-gray-100' :
                                        index === 2 ? 'bg-orange-300 text-orange-900 border-2 border-orange-200' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                    {index + 1}
                                </div>
                                <span className="font-bold text-gray-700 text-sm sm:text-base truncate max-w-[8rem] sm:max-w-[10rem]">{entry.name}</span>
                            </div>
                            <span className="font-mono font-bold text-blue-600 text-sm sm:text-base whitespace-nowrap">{entry.score} Pts</span>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
