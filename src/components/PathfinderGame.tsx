import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw, Play } from 'lucide-react';

const GRID_SIZE = 50;
const CELL_SIZE = 800 / GRID_SIZE;

// Colors from Python code
const COLORS = {
    RED: '#FF0000',      // Closed
    GREEN: '#00FF00',    // Open
    WHITE: '#FFFFFF',    // Empty
    BLACK: '#000000',    // Barrier
    ORANGE: '#FFA500',   // Start
    PURPLE: '#800080',   // Path
    TURQUOISE: '#40E0D0', // End
    GREY: '#808080',     // Grid lines
};

type CellType = 'empty' | 'start' | 'end' | 'barrier' | 'open' | 'closed' | 'path';

interface Cell {
    row: number;
    col: number;
    type: CellType;
    g: number;
    h: number;
    f: number;
    neighbors: Cell[];
    parent: Cell | null;
}

export default function PathfinderGame({ onClose }: { onClose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawMode, setDrawMode] = useState<'barrier' | 'erase'>('barrier');

    const gridRef = useRef<Cell[][]>([]);
    const startRef = useRef<Cell | null>(null);
    const endRef = useRef<Cell | null>(null);

    useEffect(() => {
        initGrid();
        draw();
    }, []);

    const initGrid = () => {
        const grid: Cell[][] = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            grid[i] = [];
            for (let j = 0; j < GRID_SIZE; j++) {
                grid[i][j] = {
                    row: i,
                    col: j,
                    type: 'empty',
                    g: Infinity,
                    h: 0,
                    f: Infinity,
                    neighbors: [],
                    parent: null,
                };
            }
        }
        gridRef.current = grid;
    };

    const heuristic = (cell1: Cell, cell2: Cell) => {
        return Math.abs(cell1.row - cell2.row) + Math.abs(cell1.col - cell2.col);
    };

    const updateNeighbors = (grid: Cell[][]) => {
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                const cell = grid[i][j];
                cell.neighbors = [];

                if (i < GRID_SIZE - 1 && grid[i + 1][j].type !== 'barrier') {
                    cell.neighbors.push(grid[i + 1][j]);
                }
                if (i > 0 && grid[i - 1][j].type !== 'barrier') {
                    cell.neighbors.push(grid[i - 1][j]);
                }
                if (j < GRID_SIZE - 1 && grid[i][j + 1].type !== 'barrier') {
                    cell.neighbors.push(grid[i][j + 1]);
                }
                if (j > 0 && grid[i][j - 1].type !== 'barrier') {
                    cell.neighbors.push(grid[i][j - 1]);
                }
            }
        }
    };

    const reconstructPath = async (current: Cell) => {
        while (current.parent) {
            current = current.parent;
            if (current.type !== 'start') {
                current.type = 'path';
                draw();
                await new Promise(resolve => setTimeout(resolve, 20));
            }
        }
    };

    const aStarAlgorithm = async () => {
        const start = startRef.current;
        const end = endRef.current;
        if (!start || !end) {
            alert('Please set both start and end points!');
            return;
        }

        const grid = gridRef.current;
        updateNeighbors(grid);

        const openSet: Cell[] = [start];
        const openSetHash = new Set([start]);

        start.g = 0;
        start.f = heuristic(start, end);

        while (openSet.length > 0 && !isRunning) {
            // Find cell with lowest f score
            let current = openSet[0];
            let currentIndex = 0;
            for (let i = 1; i < openSet.length; i++) {
                if (openSet[i].f < current.f) {
                    current = openSet[i];
                    currentIndex = i;
                }
            }

            openSet.splice(currentIndex, 1);
            openSetHash.delete(current);

            if (current === end) {
                await reconstructPath(end);
                end.type = 'end';
                setIsRunning(false);
                return;
            }

            for (const neighbor of current.neighbors) {
                const tempG = current.g + 1;

                if (tempG < neighbor.g) {
                    neighbor.parent = current;
                    neighbor.g = tempG;
                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;

                    if (!openSetHash.has(neighbor)) {
                        openSet.push(neighbor);
                        openSetHash.add(neighbor);
                        if (neighbor.type === 'empty') {
                            neighbor.type = 'open';
                        }
                    }
                }
            }

            draw();
            await new Promise(resolve => setTimeout(resolve, 10));

            if (current.type !== 'start') {
                current.type = 'closed';
            }
        }

        setIsRunning(false);
        alert('No path found!');
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = COLORS.WHITE;
        ctx.fillRect(0, 0, 800, 800);

        const grid = gridRef.current;
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                const cell = grid[i][j];
                const x = j * CELL_SIZE;
                const y = i * CELL_SIZE;

                switch (cell.type) {
                    case 'start':
                        ctx.fillStyle = COLORS.ORANGE;
                        break;
                    case 'end':
                        ctx.fillStyle = COLORS.TURQUOISE;
                        break;
                    case 'barrier':
                        ctx.fillStyle = COLORS.BLACK;
                        break;
                    case 'open':
                        ctx.fillStyle = COLORS.GREEN;
                        break;
                    case 'closed':
                        ctx.fillStyle = COLORS.RED;
                        break;
                    case 'path':
                        ctx.fillStyle = COLORS.PURPLE;
                        break;
                    default:
                        ctx.fillStyle = COLORS.WHITE;
                }

                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }

        // Draw grid lines
        ctx.strokeStyle = COLORS.GREY;
        ctx.lineWidth = 1;
        for (let i = 0; i <= GRID_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(800, i * CELL_SIZE);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, 800);
            ctx.stroke();
        }
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || isRunning) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const col = Math.floor(x / CELL_SIZE);
        const row = Math.floor(y / CELL_SIZE);

        if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
            const cell = gridRef.current[row][col];

            if (e.button === 0) { // Left click
                if (!startRef.current && cell.type === 'empty') {
                    cell.type = 'start';
                    startRef.current = cell;
                } else if (!endRef.current && cell.type === 'empty' && cell !== startRef.current) {
                    cell.type = 'end';
                    endRef.current = cell;
                } else if (cell.type === 'empty') {
                    cell.type = 'barrier';
                }
            }

            draw();
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || isRunning) return;
        handleCanvasClick(e);
    };

    const reset = () => {
        initGrid();
        startRef.current = null;
        endRef.current = null;
        setIsRunning(false);
        draw();
    };

    const runAlgorithm = () => {
        setIsRunning(true);
        aStarAlgorithm();
    };

    return (
        <div className="flex flex-col items-center justify-center bg-black p-4 rounded-lg relative">
            <div className="flex w-full justify-between items-center mb-4 max-w-[800px]">
                <span className="text-white text-xl font-bold">A* Pathfinder Visualizer</span>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-zinc-800" onClick={runAlgorithm} disabled={isRunning}>
                        <Play className="mr-2 h-4 w-4" /> Run A*
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-zinc-800" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Reset
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-zinc-800" onClick={onClose}>
                        <X className="mr-2 h-4 w-4" /> Close
                    </Button>
                </div>
            </div>

            <div className="relative border-4 border-zinc-800 rounded-sm">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={800}
                    className="bg-white block cursor-crosshair"
                    onClick={handleCanvasClick}
                    onMouseDown={() => setIsDrawing(true)}
                    onMouseUp={() => setIsDrawing(false)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setIsDrawing(false)}
                />
            </div>

            <div className="mt-4 text-white text-sm text-center max-w-[800px]">
                <div className="flex gap-4 justify-center mb-2">
                    <span><span className="inline-block w-4 h-4 bg-orange-500 mr-1"></span>Start</span>
                    <span><span className="inline-block w-4 h-4 bg-cyan-400 mr-1"></span>End</span>
                    <span><span className="inline-block w-4 h-4 bg-black border border-white mr-1"></span>Barrier</span>
                    <span><span className="inline-block w-4 h-4 bg-purple-600 mr-1"></span>Path</span>
                </div>
                <p>Click to set start (orange), then end (cyan), then draw barriers. Press "Run A*" to find path!</p>
            </div>
        </div>
    );
}
