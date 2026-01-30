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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 overflow-hidden relative">
            {/* Background shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] text-6xl opacity-10 animate-bounce delay-700">🧩</div>
                <div className="absolute top-[20%] right-[20%] text-8xl opacity-10 animate-pulse">⚡</div>
                <div className="absolute bottom-[10%] left-[20%] text-7xl opacity-10 animate-spin-slow">🎲</div>
            </div>

            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center z-10"
            >
                <span className="text-6xl sm:text-8xl mb-4 sm:mb-6 block drop-shadow-lg">🕵️‍♂️</span>
                <h1 className="text-4xl sm:text-6xl font-black mb-4 sm:mb-6 drop-shadow-md tracking-tight">DETEKTIF POLA</h1>
                <p className="mb-8 sm:mb-12 text-blue-100 text-lg sm:text-2xl font-medium max-w-lg mx-auto">Latih logikamu, pecahkan misteri angka, dan jadilah juara!</p>
            </motion.div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-xs sm:max-w-md z-10"
            >
                <input
                    type="text"
                    placeholder="Masukkan Namamu..."
                    className="p-4 sm:p-5 rounded-2xl text-gray-800 w-full shadow-2xl border-4 border-blue-400 focus:border-yellow-400 focus:outline-none mb-6 text-center font-bold text-lg sm:text-xl placeholder-gray-400 transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && name.trim() && setStep(1)}
                />
                <button
                    onClick={() => name.trim() && setStep(1)}
                    className="w-full bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 px-8 py-4 sm:py-5 rounded-2xl font-black text-blue-900 text-lg sm:text-xl transition-all transform hover:scale-105 shadow-xl border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1"
                >
                    MULAI PETUALANGAN!
                </button>
            </motion.div>
        </div>
    );

    // UI Result Screen
    if (step === 2) return (
        <div className={`flex flex-col items-center justify-center min-h-screen ${isWin ? 'bg-gradient-to-br from-green-500 to-green-700' : 'bg-gradient-to-br from-red-500 to-red-700'} text-white p-4 overflow-hidden relative`}>
            {/* Background particles for result */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 text-4xl">✨</div>
                <div className="absolute bottom-10 right-10 text-4xl">🌟</div>
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center mb-6 sm:mb-8 z-10 max-w-2xl px-4"
            >
                <h1 className="text-4xl sm:text-6xl font-black mb-2 sm:mb-4 drop-shadow-md">{isWin ? 'SELAMAT! 🎉' : 'GAME OVER 💀'}</h1>
                <p className="text-xl sm:text-2xl font-medium opacity-90 mb-6">{isWin ? 'Kamu menyelesaikan semua misi!' : 'Yah, Jawabanmu Salah! 😢'}</p>

                <div className={`bg-white ${isWin ? 'text-green-600' : 'text-red-600'} px-6 sm:px-10 py-4 sm:py-6 rounded-3xl inline-block shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300`}>
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-1 text-gray-400">Skor Akhir</p>
                    <p className="text-5xl sm:text-7xl font-black tracking-tighter">{isWin ? score + 100 : score}</p>
                </div>
            </motion.div>

            <div className="w-full max-w-md mb-8 z-10">
                <Leaderboard />
            </div>

            <button
                onClick={resetGame}
                className={`z-10 bg-white ${isWin ? 'text-green-600' : 'text-red-600'} font-bold px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-xl hover:bg-gray-50 transition-all transform hover:scale-105 border-b-4 ${isWin ? 'border-green-200' : 'border-red-200'} active:border-b-0 active:translate-y-1 text-lg sm:text-xl`}
            >
                Main Lagi 🔄
            </button>
        </div>
    );

    // UI Playing
    return (
        <main className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 text-6xl sm:text-8xl rotate-12">🧩</div>
                <div className="absolute bottom-20 right-20 text-6xl sm:text-8xl -rotate-12">🎨</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[20rem] opacity-5">🕵️</div>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center max-w-4xl mx-auto">
                <div className="w-full flex justify-between items-center max-w-lg mb-6 sm:mb-10 px-2 sm:px-0">
                    <div className="bg-white/80 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-lg border border-white/50 flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase">Level</span>
                        <span className="text-lg sm:text-2xl font-black text-blue-600">{currentLevel + 1} <span className="text-gray-400 text-sm font-medium">/ {levels.length}</span></span>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                        <span className="text-xs sm:text-sm font-bold opacity-80 uppercase">Skor</span>
                        <span className="text-lg sm:text-2xl font-black">{score}</span>
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
