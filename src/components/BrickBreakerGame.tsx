import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw } from 'lucide-react';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Colors from Python code
const COLORS = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    DARKBLUE: '#245ABE',
    LIGHTBLUE: '#00B0F0',
    RED: '#FF0000',
    ORANGE: '#FF6400',
    YELLOW: '#FFFF00',
    GREEN: '#90EE90',
};

interface Brick {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    alive: boolean;
}

interface Ball {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
}

interface Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function BrickBreakerGame({ onClose }: { onClose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const animationRef = useRef<number>();

    const gameState = useRef({
        paddle: { x: 450, y: 560, width: 200, height: 10 } as Paddle,
        ball: { x: 345, y: 355, radius: 10, vx: 3, vy: -3 } as Ball,
        bricks: [] as Brick[],
        keys: { left: false, right: false },
    });

    useEffect(() => {
        initGame();
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') gameState.current.keys.left = true;
            if (e.key === 'ArrowRight') gameState.current.keys.right = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') gameState.current.keys.left = false;
            if (e.key === 'ArrowRight') gameState.current.keys.right = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        animationRef.current = requestAnimationFrame(gameLoop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const initGame = () => {
        const bricks: Brick[] = [];

        // Red bricks (line 45-50)
        for (let i = 0; i < 7; i++) {
            bricks.push({
                x: 60 + i * 100,
                y: 60,
                width: 80,
                height: 30,
                color: COLORS.RED,
                alive: true,
            });
        }

        // Yellow bricks (line 52-57)
        for (let i = 0; i < 7; i++) {
            bricks.push({
                x: 60 + i * 100,
                y: 100,
                width: 80,
                height: 30,
                color: COLORS.YELLOW,
                alive: true,
            });
        }

        // Green bricks (line 59-64)
        for (let i = 0; i < 7; i++) {
            bricks.push({
                x: 60 + i * 100,
                y: 140,
                width: 80,
                height: 30,
                color: COLORS.GREEN,
                alive: true,
            });
        }

        gameState.current.bricks = bricks;
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { paddle, ball, bricks, keys } = gameState.current;

        // Move paddle (line 87-91)
        if (keys.left) {
            paddle.x -= 20;
            if (paddle.x < 0) paddle.x = 0;
        }
        if (keys.right) {
            paddle.x += 20;
            if (paddle.x + paddle.width > CANVAS_WIDTH) paddle.x = CANVAS_WIDTH - paddle.width;
        }

        // Move ball
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Ball collision with walls (line 98-124)
        if (ball.x >= CANVAS_WIDTH - ball.radius) ball.vx = -Math.abs(ball.vx);
        if (ball.x <= ball.radius) ball.vx = Math.abs(ball.vx);
        if (ball.y <= 40 + ball.radius) ball.vy = Math.abs(ball.vy);

        // Ball collision with bottom (game over) (line 102-121)
        if (ball.y >= CANVAS_HEIGHT - ball.radius) {
            setGameOver(true);
            return;
        }

        // Ball collision with paddle (line 127-131)
        if (
            ball.y + ball.radius >= paddle.y &&
            ball.y - ball.radius <= paddle.y + paddle.height &&
            ball.x >= paddle.x &&
            ball.x <= paddle.x + paddle.width
        ) {
            ball.vy = -Math.abs(ball.vy);
            ball.y = paddle.y - ball.radius;
        }

        // Ball collision with bricks (line 134-161)
        for (const brick of bricks) {
            if (!brick.alive) continue;

            if (
                ball.x + ball.radius >= brick.x &&
                ball.x - ball.radius <= brick.x + brick.width &&
                ball.y + ball.radius >= brick.y &&
                ball.y - ball.radius <= brick.y + brick.height
            ) {
                brick.alive = false;
                ball.vy = -ball.vy;
                setScore(prev => prev + 1);

                // Check win condition (line 139)
                const remainingBricks = bricks.filter(b => b.alive).length;
                if (remainingBricks === 4) { // 21 - 17 = 4 (line 139 checks for 17)
                    setGameWon(true);
                    return;
                }
                break;
            }
        }

        // Draw everything
        ctx.fillStyle = COLORS.DARKBLUE;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw top line (line 165)
        ctx.strokeStyle = COLORS.WHITE;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 38);
        ctx.lineTo(CANVAS_WIDTH, 38);
        ctx.stroke();

        // Draw score (line 168-170)
        ctx.fillStyle = COLORS.WHITE;
        ctx.font = '34px Arial';
        ctx.fillText(`Score: ${score}`, 350, 30);

        // Draw bricks
        for (const brick of bricks) {
            if (brick.alive) {
                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                ctx.strokeStyle = COLORS.BLACK;
                ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
            }
        }

        // Draw paddle
        ctx.fillStyle = COLORS.LIGHTBLUE;
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

        // Draw ball
        ctx.fillStyle = COLORS.WHITE;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        if (!gameOver && !gameWon) {
            animationRef.current = requestAnimationFrame(gameLoop);
        }
    };

    const resetGame = () => {
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        gameState.current.paddle = { x: 450, y: 560, width: 200, height: 10 };
        gameState.current.ball = { x: 345, y: 355, radius: 10, vx: 3, vy: -3 };
        initGame();
        animationRef.current = requestAnimationFrame(gameLoop);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-black p-4 rounded-lg relative">
            <div className="flex w-full justify-between items-center mb-4 max-w-[800px]">
                <span className="text-white text-xl font-bold">Breakout Arcade Game</span>
                <div className="flex gap-2">
                    <Button variant="ghost" className="text-white hover:bg-zinc-800" onClick={resetGame}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Restart
                    </Button>
                    <Button variant="ghost" className="text-white hover:bg-zinc-800" onClick={onClose}>
                        <X className="mr-2 h-4 w-4" /> Close
                    </Button>
                </div>
            </div>

            <div className="relative border-4 border-zinc-800 rounded-sm">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="bg-black block"
                />

                {gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <div className="text-center">
                            <h2 className="text-white text-6xl font-bold mb-4">GAME OVER</h2>
                            <p className="text-white text-2xl mb-6">Final Score: {score}</p>
                            <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-xl">
                                Play Again
                            </Button>
                        </div>
                    </div>
                )}

                {gameWon && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <div className="text-center">
                            <h2 className="text-white text-5xl font-bold mb-2">Level Complete!</h2>
                            <h3 className="text-white text-4xl font-bold mb-2">Congratulations!</h3>
                            <p className="text-white text-2xl mb-6">Score: {score}</p>
                            <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-xl">
                                Play Again
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 text-white text-sm">
                Use <kbd className="px-2 py-1 bg-zinc-700 rounded">←</kbd> and <kbd className="px-2 py-1 bg-zinc-700 rounded">→</kbd> arrow keys to move the paddle
            </div>
        </div>
    );
}
