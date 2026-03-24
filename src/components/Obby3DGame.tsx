import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw } from 'lucide-react';

interface Platform {
    x: number;
    y: number;
    z: number;
    width: number;
    height: number;
    depth: number;
    color: string;
    isGoal?: boolean;
    level?: number;
}

export default function Obby3DGame({ onClose }: { onClose: () => void }) {
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 2, z: 0 });
    const [rotation, setRotation] = useState({ x: 20, y: 45 });
    const [currentLevel, setCurrentLevel] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const keysPressed = useRef<Set<string>>(new Set());

    // Platforms based on the Python code structure
    const platforms: Platform[] = [
        // Level 0 - Starting platform (green)
        { x: 0, y: 0, z: 0, width: 6, height: 1, depth: 6, color: '#00FF00' },
        { x: 0, y: 0, z: 8, width: 2, height: 1, depth: 2, color: '#FFFFFF', isGoal: true, level: 0 },

        // Level 1 - Green platforms
        { x: 8, y: 2, z: 2, width: 2, height: 1, depth: 2, color: '#00FF00' },
        { x: 14, y: 4, z: 6, width: 2, height: 1, depth: 2, color: '#00FF00' },
        { x: 16, y: 6, z: 10, width: 2, height: 1, depth: 2, color: '#00FF00' },
        { x: 20, y: 0, z: 20, width: 6, height: 1, depth: 6, color: '#00FF00' },
        { x: 21, y: 0, z: 21, width: 2, height: 1, depth: 2, color: '#FFFFFF', isGoal: true, level: 1 },

        // Level 2 - Orange platforms
        { x: 24, y: -2, z: 24, width: 2, height: 1, depth: 2, color: '#FFA500' },
        { x: 26, y: 0, z: 27, width: 2, height: 1, depth: 2, color: '#FFA500' },
        { x: 28, y: -1, z: 30, width: 2, height: 1, depth: 2, color: '#FFA500' },
        { x: 30, y: 0, z: 40, width: 6, height: 1, depth: 6, color: '#FFA500' },
        { x: 31, y: 0, z: 41, width: 2, height: 1, depth: 2, color: '#FFFFFF', isGoal: true, level: 2 },

        // Level 3 - Pink platforms
        { x: 28, y: 0, z: 43, width: 2, height: 1, depth: 2, color: '#FFC0CB' },
        { x: 24, y: 1, z: 44, width: 2, height: 1, depth: 2, color: '#FFC0CB' },
        { x: 19, y: -1, z: 39, width: 2, height: 1, depth: 2, color: '#FFC0CB' },
        { x: 10, y: 0, z: 29, width: 2, height: 1, depth: 2, color: '#FFC0CB' },
        { x: 5, y: 0, z: 29, width: 6, height: 1, depth: 6, color: '#FFC0CB' },
        { x: 5, y: 0, z: 29, width: 2, height: 1, depth: 2, color: '#FFFFFF', isGoal: true, level: 3 },

        // Level 4 - Yellow platforms (final)
        { x: 2, y: -1, z: 26, width: 2, height: 1, depth: 2, color: '#FFFF00' },
        { x: 0, y: 0, z: 24, width: 2, height: 1, depth: 2, color: '#FFFF00' },
        { x: -2, y: 2, z: 16, width: 2, height: 1, depth: 2, color: '#FFFF00' },
        { x: 0, y: 3, z: 10, width: 2, height: 1, depth: 2, color: '#FFFF00' },
        { x: 1, y: 6, z: 2, width: 6, height: 1, depth: 6, color: '#FFFF00' },
        { x: 1, y: 7, z: 2, width: 2, height: 1, depth: 2, color: '#FFFFFF', isGoal: true, level: 4 },
    ];

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keysPressed.current.add(e.key.toLowerCase());
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keysPressed.current.delete(e.key.toLowerCase());
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const gameLoop = setInterval(() => {
            setPlayerPos(prev => {
                let newX = prev.x;
                let newY = prev.y;
                let newZ = prev.z;

                const speed = 0.3;
                if (keysPressed.current.has('w')) newZ += speed;
                if (keysPressed.current.has('s')) newZ -= speed;
                if (keysPressed.current.has('a')) newX -= speed;
                if (keysPressed.current.has('d')) newX += speed;
                if (keysPressed.current.has(' ')) newY += 0.5;

                // Gravity
                newY -= 0.1;

                // Check collision with platforms
                let onPlatform = false;
                for (const platform of platforms) {
                    if (
                        newX >= platform.x - platform.width / 2 &&
                        newX <= platform.x + platform.width / 2 &&
                        newZ >= platform.z - platform.depth / 2 &&
                        newZ <= platform.z + platform.depth / 2 &&
                        newY <= platform.y + platform.height + 0.5 &&
                        newY >= platform.y
                    ) {
                        newY = platform.y + platform.height;
                        onPlatform = true;

                        // Check if goal platform
                        if (platform.isGoal && platform.level === currentLevel) {
                            setTimeout(() => {
                                if (platform.level === 4) {
                                    setGameWon(true);
                                } else {
                                    setCurrentLevel(prev => prev + 1);
                                }
                            }, 100);
                        }
                    }
                }

                // Reset if fall too far
                if (newY < -10) {
                    return { x: 0, y: 2, z: 0 };
                }

                return { x: newX, y: newY, z: newZ };
            });
        }, 1000 / 60);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            clearInterval(gameLoop);
        };
    }, [currentLevel]);

    const reset = () => {
        setPlayerPos({ x: 0, y: 2, z: 0 });
        setCurrentLevel(0);
        setGameWon(false);
    };

    const levelMessages = [
        'Find the white platform!',
        'Level 1 Complete! Green path unlocked!',
        'Level 2 Complete! Orange path unlocked!',
        'Level 3 Complete! Pink path unlocked!',
        'Level 4 Complete! Yellow path unlocked!',
    ];

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-sky-400 to-sky-200 p-4 rounded-lg relative overflow-hidden" style={{ height: '600px' }}>
            <div className="flex w-full justify-between items-center mb-4 max-w-[800px] z-10">
                <div>
                    <span className="text-black text-xl font-bold">3D OBBY Platformer</span>
                    <div className="text-sm text-black">Level: {currentLevel + 1}/5</div>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Reset
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white" onClick={onClose}>
                        <X className="mr-2 h-4 w-4" /> Close
                    </Button>
                </div>
            </div>

            {/* 3D Scene */}
            <div
                className="relative w-full h-full"
                style={{ perspective: '1000px' }}
            >
                <div
                    style={{
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateX(${-playerPos.x * 20}px) translateY(${playerPos.y * 20}px) translateZ(${-playerPos.z * 20}px)`,
                        transformStyle: 'preserve-3d',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    {/* Platforms */}
                    {platforms.map((platform, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: `${platform.width * 20}px`,
                                height: `${platform.height * 20}px`,
                                backgroundColor: platform.color,
                                transform: `translate3d(${platform.x * 20}px, ${-platform.y * 20}px, ${platform.z * 20}px)`,
                                transformStyle: 'preserve-3d',
                                border: '2px solid rgba(0,0,0,0.3)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                            }}
                        />
                    ))}

                    {/* Player */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '20px',
                            height: '40px',
                            backgroundColor: '#FF0000',
                            transform: `translate3d(${playerPos.x * 20}px, ${-playerPos.y * 20}px, ${playerPos.z * 20}px)`,
                            transformStyle: 'preserve-3d',
                            border: '2px solid #AA0000',
                            borderRadius: '4px',
                        }}
                    />
                </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded-lg text-sm max-w-[300px] z-10">
                <div className="font-bold mb-1">{levelMessages[currentLevel]}</div>
                <div>WASD: Move</div>
                <div>SPACE: Jump</div>
                <div>Reach white platforms to progress!</div>
            </div>

            {/* Level Complete Messages */}
            {currentLevel > 0 && !gameWon && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-bold z-20">
                    {levelMessages[currentLevel]}
                </div>
            )}

            {/* Win Screen */}
            {gameWon && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
                    <div className="text-center">
                        <h2 className="text-white text-5xl font-bold mb-4">🎉 CONGRATULATIONS! 🎉</h2>
                        <p className="text-white text-2xl mb-2">You finished the hardest OBBY!</p>
                        <p className="text-green-400 text-xl mb-6">All 5 levels complete!</p>
                        <Button onClick={reset} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-xl">
                            Play Again
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
