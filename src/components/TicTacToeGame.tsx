import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type CellValue = '' | 'X' | 'O';
type Board = [CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue];

export default function TicTacToeGame({ onClose }: { onClose: () => void }) {
    const [board, setBoard] = useState<Board>(['', '', '', '', '', '', '', '', '']);
    const [isXTurn, setIsXTurn] = useState(true);
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [winner, setWinner] = useState<string | null>(null);

    const checkWinner = (currentBoard: Board): 'X' | 'O' | null => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return currentBoard[a] as 'X' | 'O';
            }
        }
        return null;
    };

    const handleCellClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board] as Board;
        newBoard[index] = isXTurn ? 'X' : 'O';
        setBoard(newBoard);

        const gameWinner = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            if (gameWinner === 'X') {
                setScoreX(prev => prev + 1);
            } else {
                setScoreO(prev => prev + 1);
            }
            setTimeout(() => {
                alert(`${gameWinner} wins!`);
            }, 100);
        }

        setIsXTurn(!isXTurn);
    };

    const resetBoard = () => {
        setBoard(['', '', '', '', '', '', '', '', '']);
        setIsXTurn(true);
        setWinner(null);
    };

    const newGame = () => {
        resetBoard();
        setScoreX(0);
        setScoreO(0);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 p-4 rounded-lg relative">
            <div className="flex w-full justify-between items-center mb-4 max-w-[850px]">
                <span className="text-white text-xl font-bold">The Great Tic Tac Toe</span>
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" onClick={onClose}>
                    <X className="mr-2 h-4 w-4" /> Close
                </Button>
            </div>

            <div className="flex gap-4 w-full max-w-[850px]">
                {/* Game Board */}
                <div className="flex-1 bg-blue-800/50 p-4 rounded-lg border-4 border-blue-600">
                    <div className="grid grid-cols-3 gap-2 max-w-[380px] mx-auto">
                        {board.map((cell, index) => (
                            <button
                                key={index}
                                onClick={() => handleCellClick(index)}
                                className={`w-[120px] h-[120px] text-5xl font-bold rounded-lg transition-all duration-200 ${cell
                                        ? 'bg-blue-300 text-blue-900'
                                        : 'bg-gray-300 hover:bg-gray-200 text-gray-700'
                                    } ${winner ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                                disabled={!!winner || !!cell}
                            >
                                {cell}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Score Panel */}
                <div className="w-[260px] space-y-3">
                    <div className="bg-blue-800/50 p-4 rounded-lg border-4 border-blue-600">
                        <div className="space-y-3">
                            <div>
                                <label className="text-white text-lg font-bold block mb-1">Player X:</label>
                                <div className="bg-white text-black text-2xl font-bold p-2 rounded text-center">
                                    {scoreX}
                                </div>
                            </div>
                            <div>
                                <label className="text-white text-lg font-bold block mb-1">Player O:</label>
                                <div className="bg-white text-black text-2xl font-bold p-2 rounded text-center">
                                    {scoreO}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="space-y-2">
                        <button
                            onClick={resetBoard}
                            className="w-full bg-gray-300 hover:bg-gray-200 text-black text-base font-bold py-3 px-4 rounded-lg transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            onClick={newGame}
                            className="w-full bg-gray-300 hover:bg-gray-200 text-black text-base font-bold py-3 px-4 rounded-lg transition-colors"
                        >
                            New Game
                        </button>
                    </div>
                </div>
            </div>

            {/* Current Turn Indicator */}
            <div className="mt-3 text-white text-base font-semibold">
                {winner ? `Winner: ${winner}!` : `Current Turn: ${isXTurn ? 'X' : 'O'}`}
            </div>
        </div>
    );
}
