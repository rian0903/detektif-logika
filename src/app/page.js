"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { generateLevels } from '@/data/levels';
import GameCard from '@/components/GameCard';
import Leaderboard from '@/components/Leaderboard';
import { database } from '@/lib/firebaseConfig';
import { ref, push, serverTimestamp } from 'firebase/database';

export default function GamePola() {
    const [levels, setLevels] = useState([]);
    const [step, setStep] = useState(0); // 0: Start, 1: Playing, 2: Result
    const [currentLevel, setCurrentLevel] = useState(0);
    const [name, setName] = useState("");
    const [score, setScore] = useState(0);

    const [isWin, setIsWin] = useState(false);

    useEffect(() => {
        setLevels(generateLevels(100));
    }, []);

    const handleAnswer = (selectedOption) => {
        const correctOption = levels[currentLevel].answer;

        if (selectedOption === correctOption) {
            // Correct Answer
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            setScore(prev => prev + 100);

            if (currentLevel + 1 < levels.length) {
                setTimeout(() => {
                    setCurrentLevel(currentLevel + 1);
                }, 1000); // Wait a bit before next level
            } else {
                finishGame();
            }
        } else {
            // Wrong Answer
            gameOver();
        }
    };

    const finishGame = async () => {
        setIsWin(true);
        setStep(2);
        const finalScore = score + 100; // Add last level points
        // Save to Firebase
        if (name) {
            await saveScore(name, finalScore);
        }
    };

    const gameOver = async () => {
        setIsWin(false);
        setStep(2);
        // Save to Firebase
        if (name) {
            await saveScore(name, score);
        }
    }

    const saveScore = async (playerName, finalScore) => {
        try {
            const scoresRef = ref(database, 'leaderboard');
            await push(scoresRef, {
                name: playerName,
                score: finalScore,
                createdAt: serverTimestamp()
            });
        } catch (err) {
            console.error("Failed to save score:", err);
        }
    };

    const resetGame = () => {
        setStep(1); // Restart directly to playing or start screen? Let's go to 1 (playing) since name is kept? No, reset often clears name. Let's keep 0.
        // Actually the original code cleared name.
        setStep(0);
        setCurrentLevel(0);
        setScore(0);
        setName("");
        setIsWin(false);
        setLevels(generateLevels(100)); // Regenerate levels on reset for extra randomness!
    };

    if (levels.length === 0) return <div className="min-h-screen flex items-center justify-center bg-blue-500 text-white font-bold text-2xl">Loading...</div>;

    // UI Start Screen
    if (step === 0) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white p-4">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center"
            >
                <span className="text-6xl mb-4 block">🕵️‍♂️</span>
                <h1 className="text-4xl font-black mb-6">DETEKTIF POLA</h1>
                <p className="mb-8 text-blue-100">Latih logikamu dengan menebak pola!</p>
            </motion.div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-xs"
            >
                <input
                    type="text"
                    placeholder="Masukkan Namamu..."
                    className="p-4 rounded-xl text-black w-full shadow-lg border-4 border-blue-600 focus:border-yellow-400 focus:outline-none mb-4 text-center font-bold text-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    onClick={() => name.trim() && setStep(1)}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 px-8 py-4 rounded-2xl font-black text-blue-900 transition-all transform hover:scale-105 shadow-xl border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1"
                >
                    MULAI PETUALANGAN!
                </button>
            </motion.div>
        </div>
    );

    // UI Result Screen
    if (step === 2) return (
        <div className={`flex flex-col items-center justify-center min-h-screen ${isWin ? 'bg-green-500' : 'bg-red-500'} text-white p-4`}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center mb-8"
            >
                <h1 className="text-5xl font-black mb-2">{isWin ? 'SELAMAT! 🎉' : 'GAME OVER 💀'}</h1>
                <p className="text-2xl">{isWin ? 'Kamu menyelesaikan semua misi!' : 'Yah, Jawabanmu Salah! 😢'}</p>
                <div className={`mt-6 bg-white ${isWin ? 'text-green-600' : 'text-red-600'} px-8 py-4 rounded-2xl inline-block shadow-lg`}>
                    <p className="text-sm font-bold uppercase tracking-wider">Skor Akhir</p>
                    <p className="text-6xl font-black">{isWin ? score + 100 : score}</p>
                </div>
            </motion.div>

            <div className="w-full max-w-md mb-8">
                <Leaderboard />
            </div>

            <button
                onClick={resetGame}
                className={`bg-white ${isWin ? 'text-green-600' : 'text-red-600'} font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors`}
            >
                Main Lagi 🔄
            </button>
        </div>
    );

    // UI Playing
    return (
        <main className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 text-6xl">🧩</div>
                <div className="absolute bottom-20 right-20 text-6xl">🎨</div>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="mb-8 flex items-center gap-4">
                    <div className="bg-white px-6 py-2 rounded-full shadow-md font-bold text-gray-900">
                        Level {currentLevel + 1} / {levels.length}
                    </div>
                    <div className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md font-bold">
                        Skor: {score}
                    </div>
                </div>

                <GameCard
                    level={levels[currentLevel]}
                    onAnswer={handleAnswer}
                />
            </div>
        </main>
    );
}
