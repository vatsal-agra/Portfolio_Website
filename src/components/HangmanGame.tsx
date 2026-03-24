import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw } from 'lucide-react';

const WORDS = [
    'JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'PYTHON', 'PROGRAMMING',
    'DEVELOPER', 'COMPUTER', 'ALGORITHM', 'DATABASE', 'NETWORK',
    'SOFTWARE', 'HARDWARE', 'INTERNET', 'WEBSITE', 'APPLICATION'
];

const MAX_WRONG = 6;

export default function HangmanGame({ onClose }: { onClose: () => void }) {
    const [word, setWord] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
    const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);

    const guessLetter = (letter: string) => {
        if (guessedLetters.has(letter) || wrongGuesses >= MAX_WRONG || isWon()) return;

        const newGuessed = new Set(guessedLetters);
        newGuessed.add(letter);
        setGuessedLetters(newGuessed);

        if (!word.includes(letter)) {
            setWrongGuesses(prev => prev + 1);
        }
    };

    const isWon = () => {
        return word.split('').every(letter => guessedLetters.has(letter));
    };

    const isLost = () => {
        return wrongGuesses >= MAX_WRONG;
    };

    const resetGame = () => {
        setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
        setGuessedLetters(new Set());
        setWrongGuesses(0);
    };

    const renderWord = () => {
        return word.split('').map((letter, i) => (
            <span key={i} className="inline-block w-10 h-12 mx-1 border-b-4 border-white text-center text-3xl font-bold text-white">
                {guessedLetters.has(letter) ? letter : ''}
            </span>
        ));
    };

    const renderHangman = () => {
        return (
            <svg width="200" height="250" className="mx-auto">
                {/* Gallows */}
                <line x1="10" y1="230" x2="150" y2="230" stroke="white" strokeWidth="4" />
                <line x1="50" y1="230" x2="50" y2="20" stroke="white" strokeWidth="4" />
                <line x1="50" y1="20" x2="130" y2="20" stroke="white" strokeWidth="4" />
                <line x1="130" y1="20" x2="130" y2="50" stroke="white" strokeWidth="4" />

                {/* Head */}
                {wrongGuesses >= 1 && <circle cx="130" cy="70" r="20" stroke="white" strokeWidth="4" fill="none" />}

                {/* Body */}
                {wrongGuesses >= 2 && <line x1="130" y1="90" x2="130" y2="150" stroke="white" strokeWidth="4" />}

                {/* Left Arm */}
                {wrongGuesses >= 3 && <line x1="130" y1="110" x2="100" y2="130" stroke="white" strokeWidth="4" />}

                {/* Right Arm */}
                {wrongGuesses >= 4 && <line x1="130" y1="110" x2="160" y2="130" stroke="white" strokeWidth="4" />}

                {/* Left Leg */}
                {wrongGuesses >= 5 && <line x1="130" y1="150" x2="110" y2="190" stroke="white" strokeWidth="4" />}

                {/* Right Leg */}
                {wrongGuesses >= 6 && <line x1="130" y1="150" x2="150" y2="190" stroke="white" strokeWidth="4" />}
            </svg>
        );
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 via-pink-700 to-pink-800 p-6 rounded-lg relative min-h-[600px]">
            <div className="flex w-full justify-between items-center mb-4 max-w-[700px]">
                <span className="text-white text-2xl font-bold">Hangman Game</span>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-pink-700" onClick={resetGame}>
                        <RotateCcw className="mr-2 h-4 w-4" /> New Word
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-pink-700" onClick={onClose}>
                        <X className="mr-2 h-4 w-4" /> Close
                    </Button>
                </div>
            </div>

            <div className="bg-pink-900/50 p-6 rounded-lg border-4 border-pink-600 max-w-[700px] w-full">
                {/* Hangman Drawing */}
                <div className="mb-6">
                    {renderHangman()}
                </div>

                {/* Word Display */}
                <div className="mb-6 flex justify-center flex-wrap">
                    {renderWord()}
                </div>

                {/* Game Status */}
                <div className="text-center mb-4">
                    {isWon() && (
                        <div className="text-white text-3xl font-bold mb-4">
                            🎉 CONGRATS! YOU WON! 🎉
                        </div>
                    )}
                    {isLost() && (
                        <div className="text-white text-3xl font-bold mb-4">
                            😢 YOU LOST! The word was: {word}
                        </div>
                    )}
                    <div className="text-white text-xl">
                        Wrong Guesses: {wrongGuesses} / {MAX_WRONG}
                    </div>
                </div>

                {/* Alphabet Buttons */}
                <div className="grid grid-cols-7 gap-2 max-w-[600px] mx-auto">
                    {alphabet.map(letter => (
                        <button
                            key={letter}
                            onClick={() => guessLetter(letter)}
                            disabled={guessedLetters.has(letter) || isWon() || isLost()}
                            className={`w-12 h-12 text-lg font-bold rounded transition-all ${guessedLetters.has(letter)
                                    ? word.includes(letter)
                                        ? 'bg-green-500 text-white cursor-not-allowed'
                                        : 'bg-red-500 text-white cursor-not-allowed'
                                    : 'bg-gray-200 hover:bg-gray-300 text-black cursor-pointer'
                                } ${(isWon() || isLost()) && 'cursor-not-allowed opacity-50'}`}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
