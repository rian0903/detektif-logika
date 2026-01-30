"use client";
import { motion } from 'framer-motion';

export default function GameCard({ level, onAnswer }) {
    if (!level) return null;

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center border-4 border-blue-400"
        >
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Lengkapi Pola Ini!</h2>

            <div className="flex justify-center gap-4 mb-8 text-5xl">
                {level.sequence.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-100 rounded-xl text-gray-900 font-bold"
                    >
                        {item}
                    </motion.div>
                ))}
                <div className="p-4 bg-yellow-200 rounded-xl border-2 border-dashed border-yellow-500 animate-pulse">
                    ❓
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {level.options.map((option, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onAnswer(option)}
                        className="bg-blue-100 hover:bg-blue-200 text-4xl p-6 rounded-2xl transition-colors border-b-4 border-blue-300 active:border-b-0 active:translate-y-1 text-blue-950 font-bold"
                    >
                        {option}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
