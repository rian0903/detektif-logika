"use client";
import { motion } from 'framer-motion';

export default function GameCard({ level, onAnswer }) {
    if (!level) return null;

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center border-4 border-blue-400"
        >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6">Lengkapi Pola Ini!</h2>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 text-3xl sm:text-5xl">
                {level.sequence.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 sm:p-4 bg-gray-100 rounded-xl text-gray-900 font-bold shadow-inner min-w-[3rem] sm:min-w-[4rem] flex items-center justify-center transform hover:scale-105 transition-transform"
                    >
                        {item}
                    </motion.div>
                ))}
                <div className="p-3 sm:p-4 bg-yellow-200 rounded-xl border-2 border-dashed border-yellow-500 animate-pulse flex items-center justify-center min-w-[3rem] sm:min-w-[4rem]">
                    ❓
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {level.options.map((option, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onAnswer(option)}
                        className="bg-gradient-to-b from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-2xl sm:text-4xl p-4 sm:p-6 rounded-2xl transition-all border-b-4 border-blue-300 active:border-b-0 active:translate-y-1 text-blue-950 font-bold shadow-md w-full"
                    >
                        {option}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
