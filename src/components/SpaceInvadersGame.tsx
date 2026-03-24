
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, X } from 'lucide-react';

const ASSETS = {
    player: '/src/assets/space invaders image/space-invaders.png',
    background: '/src/assets/space invaders image/background.png',
    enemy: '/src/assets/space invaders image/alien (1).png',
    bullet: '/src/assets/space invaders image/bullet.png',
    playBtn: '/src/assets/space invaders image/play.png',
    upgradeBtn: '/src/assets/space invaders image/2X SPEED (2).png',
    maxedBtn: '/src/assets/space invaders image/maxed.png',
    icon: '/src/assets/space invaders image/rocket.png',
};

const AUDIO = {
    background: '/src/assets/space invaders image/background.wav',
    laser: '/src/assets/space invaders image/laser.wav',
    explosion: '/src/assets/space invaders image/explosion.wav',
};

// Python Source Constants & Globals simulation
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Fonts simulation (using Canvas font strings)
const FONT_L = "80px Arial";
const FONT_E = "60px Arial";
const FONT_STD = "32px Arial";
const FONT_OVER = "64px Arial";
const COLOR_GREEN = "#00e100"; // (0, 225, 0)
const COLOR_RED = "#ff0000";

interface GameState {
    mode: 'MENU' | 'GAME' | 'GAMEOVER' | 'WIN';
    level: number;
    glvl: number;
    coins: number;
    numEnemies: number;
    targetScore: number;
    finalTarget: number;

    // Game Entities
    playerX: number;
    playerY: number;
    playerXChange: number;

    enemies: { x: number, y: number, dx: number, dy: number, img: HTMLImageElement }[];

    bulletX: number;
    bulletY: number;
    bulletYChange: number; // Speed
    bulletState: "ready" | "fire";

    scoreValue: number;

    // Images
    images: Record<string, HTMLImageElement>;
    // Audio
    audio: Record<string, HTMLAudioElement>;
    loaded: boolean;
    audioLoaded: boolean;
}

export default function SpaceInvadersGame({ onClose }: { onClose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Mutable state ref to strictly follow the python persistent variable pattern
    const state = useRef<GameState>({
        mode: 'MENU',
        level: 1,
        glvl: 1,
        coins: 450, // Line 29
        numEnemies: 6, // Line 36
        targetScore: 10, // Line 20 'Targets'
        finalTarget: 10, // Line 26 'final_target'

        playerX: 370,
        playerY: 480,
        playerXChange: 0,

        enemies: [],

        bulletX: 0,
        bulletY: 480,
        bulletYChange: 10, // Line 25 'by_change'
        bulletState: "ready",

        scoreValue: 0,

        images: {},
        audio: {},
        loaded: false,
        audioLoaded: false
    });

    // Force re-render for UI only if needed (mostly canvas driven)
    const [, setTick] = useState(0);

    useEffect(() => {
        // Load Image Assets
        let loadedCount = 0;
        const totalAssets = Object.keys(ASSETS).length;

        Object.entries(ASSETS).forEach(([key, src]) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                state.current.images[key] = img;
                loadedCount++;
                if (loadedCount === totalAssets) {
                    state.current.loaded = true;
                    // Start Loop
                    requestAnimationFrame(gameLoop);
                }
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
                loadedCount++;
                if (loadedCount === totalAssets) {
                    state.current.loaded = true;
                    requestAnimationFrame(gameLoop);
                }
            };
        });

        // Load Audio Assets
        Object.entries(AUDIO).forEach(([key, src]) => {
            const audio = new Audio(src);
            audio.preload = 'auto';
            state.current.audio[key] = audio;
            if (key === 'background') {
                audio.loop = true;
                audio.volume = 0.3; // Lower volume for background music
            }
        });
        state.current.audioLoaded = true;

        // Cleanup: Stop all audio when component unmounts
        return () => {
            Object.values(state.current.audio).forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        };
    }, []);

    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (state.current.mode === 'GAME') {
                if (e.key === 'ArrowLeft' || e.key === 'a') state.current.playerXChange = -4;
                if (e.key === 'ArrowRight' || e.key === 'd') state.current.playerXChange = 4;
                if (e.key === ' ') {
                    if (state.current.bulletState === "ready") {
                        state.current.bulletX = state.current.playerX;
                        state.current.bulletState = "fire";
                        // Play laser sound
                        if (state.current.audio.laser) {
                            state.current.audio.laser.currentTime = 0;
                            state.current.audio.laser.play().catch(e => console.log('Audio play failed:', e));
                        }
                    }
                }
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (state.current.mode === 'GAME') {
                if (['ArrowLeft', 'a', 'ArrowRight', 'd'].includes(e.key)) {
                    state.current.playerXChange = 0;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const initLevel1 = () => {
        const s = state.current;

        // Reset Entity Positions (Line 47 lvl1 start)
        s.playerX = 370;
        s.playerXChange = 0;
        s.bulletY = 480;
        s.bulletState = "ready";
        s.scoreValue = 0;

        // Play background music
        if (s.audio.background) {
            s.audio.background.currentTime = 0;
            s.audio.background.play().catch(e => console.log('Background music play failed:', e));
        }

        // Init Enemies (Line 79)
        s.enemies = [];
        for (let i = 0; i < s.numEnemies; i++) {
            s.enemies.push({
                x: Math.random() * 736,
                y: Math.random() * 100 + 50, // random.randint(50, 150)
                dx: 2, // ex_change
                dy: 50, // ey_change
                img: s.images.enemy
            });
        }

        s.mode = 'GAME';
    };

    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const s = state.current;

        // Clear Screen
        if (s.images.background) {
            ctx.drawImage(s.images.background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        } else {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        if (s.mode === 'MENU') {
            renderMenu(ctx, s);
        } else if (s.mode === 'GAME') {
            updateGame(ctx, s);
        } else if (s.mode === 'GAMEOVER') {
            renderGameOver(ctx, s);
        } else if (s.mode === 'WIN') {
            renderWin(ctx, s);
        }

        requestAnimationFrame(gameLoop);
    };

    const renderMenu = (ctx: CanvasRenderingContext2D, s: GameState) => {
        // Level Text (Line 286)
        ctx.font = FONT_L;
        ctx.fillStyle = COLOR_GREEN;
        ctx.fillText("Level : " + s.level, 250, 150);

        // Enemies Text (Line 291)
        ctx.font = FONT_E;
        ctx.fillText("Enemies : " + s.numEnemies, 220, 250);

        // Coins Text (Line 303)
        ctx.font = FONT_STD;
        ctx.fillText("Coins : " + s.coins, 230, 350);

        // Play Button Rect (Line 294: 362, 493, 81, 81)
        ctx.fillStyle = COLOR_RED;
        ctx.fillRect(362, 493, 81, 81);
        // Play Image (Line 297: 370, 500)
        if (s.images.playBtn) ctx.drawImage(s.images.playBtn, 370, 500);

        // Upgrade/Speed Button Rect (Line 299: 260, 490, 81, 81)
        ctx.fillRect(260, 490, 81, 81);
        // Upgrade Image (Line 301: 270, 500)
        const upgradeImg = s.bulletYChange > 25 ? s.images.maxedBtn : s.images.upgradeBtn;
        if (upgradeImg) ctx.drawImage(upgradeImg, 270, 500);
    };

    const updateGame = (ctx: CanvasRenderingContext2D, s: GameState) => {
        // Player Movement
        s.playerX += s.playerXChange;
        if (s.playerX <= 0) s.playerX = 0;
        if (s.playerX >= 736) s.playerX = 735; // Line 173

        // Draw Player
        if (s.images.player) ctx.drawImage(s.images.player, s.playerX, s.playerY);

        // Bullet Movement
        if (s.bulletY <= 0) {
            s.bulletY = 480;
            s.bulletState = "ready";
        }
        if (s.bulletState === "fire") {
            if (s.images.bullet) ctx.drawImage(s.images.bullet, s.bulletX + 16, s.bulletY + 10);
            s.bulletY -= s.bulletYChange;
        }

        // Enemy Logic
        for (let i = 0; i < s.enemies.length; i++) {
            const enemy = s.enemies[i];

            // Game Over Check (Line 192)
            if (enemy.y > 440) {
                s.mode = 'GAMEOVER';
                return;
            }

            enemy.x += enemy.dx;

            if (enemy.x <= 0) {
                enemy.dx = 2; // Line 203
                enemy.y += enemy.dy;
            } else if (enemy.x >= 736) {
                enemy.dx = -2; // Line 207
                enemy.y += enemy.dy;
            }

            // Collision (Line 134 distance <= 27)
            const dist = Math.sqrt(Math.pow(enemy.x - s.bulletX, 2) + Math.pow(enemy.y - s.bulletY, 2));
            if (dist <= 27 && s.bulletState === "fire") { // Added state check for sanity
                s.bulletY = 480;
                s.bulletState = "ready";
                s.scoreValue += 1;
                s.coins += 10;
                // Play explosion sound
                if (s.audio.explosion) {
                    s.audio.explosion.currentTime = 0;
                    s.audio.explosion.play().catch(e => console.log('Explosion sound play failed:', e));
                }
                // Respawn
                enemy.x = Math.random() * 736;
                enemy.y = Math.random() * 100 + 50;
            }

            if (s.images.enemy) ctx.drawImage(s.images.enemy, enemy.x, enemy.y);
        }

        // Check Win Condition (Line 176)
        if (s.scoreValue === s.finalTarget) {
            s.glvl += 1;
            s.level += 1;
            s.numEnemies += 3;
            s.targetScore += 5; // Targets += 5
            s.finalTarget = s.targetScore; // Wait, Python logic: 'score_value == final_target'. And Targets is display.
            // In python: Targets starts at 10. final_target starts at 10.
            // Line 182: Targets += 5. Line 329: final_target += 5.
            // So they stay synced.

            s.mode = 'MENU';
        }

        // Text UI
        ctx.font = FONT_STD;
        ctx.fillStyle = COLOR_GREEN;
        ctx.fillText("score : " + s.scoreValue, 10, 40); // texty + 30 approx
        ctx.fillText("target : " + s.targetScore, 640, 40);
        ctx.fillText("Coins : " + s.coins, 340, 40);
    };

    const renderGameOver = (ctx: CanvasRenderingContext2D, s: GameState) => {
        ctx.font = FONT_OVER;
        ctx.fillStyle = COLOR_GREEN;
        ctx.fillText("GAMEOVER", 200, 300);
        // Stop background music
        if (s.audio.background) {
            s.audio.background.pause();
        }
    };

    const renderWin = (ctx: CanvasRenderingContext2D, s: GameState) => {
        ctx.font = FONT_OVER;
        ctx.fillStyle = COLOR_GREEN;
        ctx.fillText("YOU WIN!!!!!", 200, 300);
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
        const y = (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);
        const s = state.current;

        if (s.mode === 'MENU') {
            // Play Button Detection (Rect: 362, 493, 81, 81) (Line 317)
            if (x >= 362 && x <= 362 + 81 && y >= 493 && y <= 493 + 81) {
                if (s.glvl === 1) {
                    initLevel1();
                } else if (s.glvl === 5) {
                    s.mode = 'WIN'; // final_gamme
                } else {
                    // Line 327
                    // num_of_enemies += 3 (Already done in Win check? No, Win check usually happens inside game loop)
                    // Wait, Python code: 'home_page' loop calls `lvl1()`.
                    // The increment logic `num_enemy += 3` happens in Line 181 (at end of level).
                    // But there is ALSO logic in `elif` block of MouseClick (Line 327)?
                    // Ah, Line 327 `else: ` block seems to be dead code if `glvl` increments are handled in game?
                    // Wait, strict reading:
                    // `if glvl == 1: lvl1()`
                    // `elif glvl == 5: final_gamme()`
                    // `else: num_of_enemies += 3 ...lvl1()`
                    // So for levels 2, 3, 4, it ADDS 3 enemies AGAIN on click? 
                    // In lvl1 loop (Line 181): `num_enemy += 3`.
                    // So if you finish level 1, num_enemy becomes 9. You go to Menu.
                    // You click Play (glvl=2). It hits `else `. `num_of_enemies += 3`. Total 12.
                    // This double increment seems persistent. I WILL REPLICATE IT.

                    // Wait, Python `num_of_enemies` vs `num_enemy`. 
                    // Line 36: `num_of_enemies = 6`. Line 40: `num_enemy = 6`.
                    // Line 79: `range(num_of_enemies)`.
                    // Line 181: `num_enemy += 3` (Display var?).
                    // Line 327: `num_of_enemies += 3`.
                    // It seems `num_enemy` is for display text, `num_of_enemies` is for logic loop.
                    // I should track them separately if needed, but in my state `numEnemies` is used for both loops.
                    // I'll replicate the Double Increment if that's what the code does.

                    s.numEnemies += 3;
                    // ex_change logic update
                    // ex_change[0] += 5000 ?? and ex_change = 5?
                    // This seems handled in initLevel1 loop where I set dx.
                    initLevel1();
                }
            }

            // Upgrade Button Detection (Rect: 260, 490, 81, 81) (Line 335)
            if (x >= 260 && x <= 260 + 81 && y >= 490 && y <= 490 + 81) {
                if (s.coins >= 500) { // Line 336
                    s.bulletYChange += 7; // Line 337
                    s.coins -= 650; // Line 338 (Yes, 650 cost but 500 check. Replicated.)
                }
            }
        } else if (s.mode === 'GAMEOVER' || s.mode === 'WIN') {
            // Click to reset to level 1?
            // Python code just exits. I'll make it reset to Level 1 Menu.
            s.mode = 'MENU';
            s.glvl = 1;
            s.level = 1;
            s.coins = 450;
            s.numEnemies = 6;
            s.bulletYChange = 10;
            s.targetScore = 10;
            s.finalTarget = 10;
        }
    };

    const handleClose = () => {
        // Stop all audio before closing
        Object.values(state.current.audio).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
        onClose();
    };

    return (
        <div className="flex flex-col items-center justify-center bg-black p-4 rounded-lg relative">
            <div className="flex w-full justify-between items-center mb-4 max-w-[800px]">
                <span className="text-white">Python Replica v1.0</span>
                <Button variant="ghost" className="text-white hover:bg-zinc-800" onClick={handleClose}>
                    <X className="mr-2 h-4 w-4" /> Close
                </Button>
            </div>
            <div className="relative border-4 border-zinc-800 rounded-sm cursor-pointer">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="bg-black block"
                    onClick={handleCanvasClick}
                />
            </div>
        </div>
    );
}

