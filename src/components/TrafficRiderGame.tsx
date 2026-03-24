import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw } from 'lucide-react';

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 500;

// Colors from Python code
const COLORS = {
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    GREEN: '#00E100',
    GREY: '#808080',
};

interface Car {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    img: HTMLImageElement | null;
}

export default function TrafficRiderGame({ onClose }: { onClose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [distance, setDistance] = useState(600);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const animationRef = useRef<number>();
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const gameState = useRef({
        playerCar: { x: 120, y: 400, width: 60, height: 80, speed: 0, img: null } as Car,
        cars: [] as Car[],
        keys: { left: false, right: false, up: false, down: false },
        speed: 1,
        playerImg: null as HTMLImageElement | null,
        carImg: null as HTMLImageElement | null,
    });

    useEffect(() => {
        // Load car images
        const playerImg = new Image();
        const carImg = new Image();

        let loadedCount = 0;
        const checkLoaded = () => {
            loadedCount++;
            if (loadedCount === 2) {
                gameState.current.playerImg = playerImg;
                gameState.current.carImg = carImg;
                setImagesLoaded(true);
                initGame();
                animationRef.current = requestAnimationFrame(gameLoop);
            }
        };

        playerImg.onload = checkLoaded;
        carImg.onload = checkLoaded;
        playerImg.onerror = () => {
            console.error('Failed to load player car image');
            checkLoaded();
        };
        carImg.onerror = () => {
            console.error('Failed to load traffic car image');
            checkLoaded();
        };

        playerImg.src = '/traffic-rider/carh.png';
        carImg.src = '/traffic-rider/carhh.png';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') gameState.current.keys.left = true;
            if (e.key === 'ArrowRight') gameState.current.keys.right = true;
            if (e.key === 'ArrowUp') gameState.current.keys.up = true;
            if (e.key === 'ArrowDown') gameState.current.keys.down = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') gameState.current.keys.left = false;
            if (e.key === 'ArrowRight') gameState.current.keys.right = false;
            if (e.key === 'ArrowUp') gameState.current.keys.up = false;
            if (e.key === 'ArrowDown') gameState.current.keys.down = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const initGame = () => {
        const cars: Car[] = [];
        const { carImg } = gameState.current;

        // Car1 (line 45-47)
        cars.push({
            x: Math.random() * 200,
            y: -100,
            width: 60,
            height: 80,
            speed: Math.random() * 50 + 100,
            img: carImg,
        });

        // Car2 (line 49-51)
        cars.push({
            x: 200,
            y: -100,
            width: 60,
            height: 80,
            speed: Math.random() * 50 + 100,
            img: carImg,
        });

        gameState.current.cars = cars;
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { playerCar, cars, keys, playerImg, carImg } = gameState.current;
        let { speed } = gameState.current;

        // Player movement (line 103-114)
        if (keys.left) {
            playerCar.x -= 5;
            setDistance(prev => Math.max(0, prev - 1));
        }
        if (keys.right) {
            playerCar.x += 5;
            setDistance(prev => Math.max(0, prev - 1));
        }
        if (keys.up) {
            speed += 0.05;
            setDistance(prev => Math.max(0, prev - 1));
        }
        if (keys.down) {
            speed -= 0.05;
        }

        gameState.current.speed = Math.max(0.5, Math.min(speed, 5));

        // Keep player in bounds (line 116-120)
        if (playerCar.x >= 220) playerCar.x -= 2;
        if (playerCar.x < 2) playerCar.x += 2;

        // Move traffic cars (line 122-129)
        for (const car of cars) {
            car.y += gameState.current.speed;

            if (car.y > CANVAS_HEIGHT) {
                car.speed = Math.random() * 40 + 100;
                car.x = Math.random() * 200;
                car.y = -100;
            }

            // Collision detection (line 131-140)
            if (
                playerCar.x < car.x + car.width &&
                playerCar.x + playerCar.width > car.x &&
                playerCar.y < car.y + car.height &&
                playerCar.y + playerCar.height > car.y
            ) {
                setGameOver(true);
                return;
            }
        }

        // Check win condition (line 163-179)
        if (distance <= 0) {
            setGameWon(true);
            return;
        }

        // Draw everything
        ctx.fillStyle = COLORS.GREEN;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw road (line 147-156)
        ctx.fillStyle = COLORS.GREY;
        ctx.fillRect(2, 0, 100, CANVAS_HEIGHT);
        ctx.fillRect(100, 0, 100, CANVAS_HEIGHT);
        ctx.fillRect(203, 0, 95, CANVAS_HEIGHT);

        // Draw lane lines (line 149-156)
        ctx.strokeStyle = COLORS.WHITE;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(200, 0);
        ctx.lineTo(200, CANVAS_HEIGHT);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(100, CANVAS_HEIGHT);
        ctx.stroke();

        // Draw distance (line 159-161) - adjusted position for smaller canvas
        ctx.fillStyle = COLORS.WHITE;
        ctx.font = '20px Arial';
        ctx.fillText(`Meters: ${distance}`, 10, 30);

        // Draw traffic cars
        for (const car of cars) {
            if (carImg && carImg.complete) {
                ctx.drawImage(carImg, car.x, car.y, car.width, car.height);
            } else {
                ctx.fillStyle = '#FF0000';
                ctx.fillRect(car.x, car.y, car.width, car.height);
            }
        }

        // Draw player car
        if (playerImg && playerImg.complete) {
            ctx.drawImage(playerImg, playerCar.x, playerCar.y, playerCar.width, playerCar.height);
        } else {
            ctx.fillStyle = '#0000FF';
            ctx.fillRect(playerCar.x, playerCar.y, playerCar.width, playerCar.height);
        }

        if (!gameOver && !gameWon) {
            animationRef.current = requestAnimationFrame(gameLoop);
        }
    };

    const resetGame = () => {
        setDistance(600);
        setGameOver(false);
        setGameWon(false);
        gameState.current.playerCar = { x: 120, y: 400, width: 60, height: 80, speed: 0, img: gameState.current.playerImg };
        gameState.current.speed = 1;
        initGame();
        animationRef.current = requestAnimationFrame(gameLoop);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-black p-4 rounded-lg relative">
            <div className="flex w-full justify-between items-center mb-4 max-w-[300px]">
                <span className="text-white text-lg font-bold">Traffic Rider</span>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-zinc-800" onClick={resetGame}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-zinc-800" onClick={onClose}>
                        <X className="h-4 w-4" />
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
                            <h2 className="text-white text-4xl font-bold mb-4">GAME OVER</h2>
                            <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                                Play Again
                            </Button>
                        </div>
                    </div>
                )}

                {gameWon && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <div className="text-center">
                            <h2 className="text-white text-4xl font-bold mb-4">Congrats!</h2>
                            <p className="text-white text-lg mb-4">You covered 600 meters!</p>
                            <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                                Play Again
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 text-white text-xs text-center">
                <kbd className="px-2 py-1 bg-zinc-700 rounded">←→</kbd> Move •
                <kbd className="px-2 py-1 bg-zinc-700 rounded mx-1">↑</kbd> Speed Up •
                <kbd className="px-2 py-1 bg-zinc-700 rounded">↓</kbd> Slow Down
            </div>
        </div>
    );
}
