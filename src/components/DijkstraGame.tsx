import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, RotateCcw, Play } from 'lucide-react';

const GRID_SIZE = 15;
const CELL_SIZE = 40;
const CANVAS_WIDTH = GRID_SIZE * CELL_SIZE;
const CANVAS_HEIGHT = GRID_SIZE * CELL_SIZE;

// Colors from Python code
const COLORS = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GRAY: '#C8C8C8',
    GREEN: '#00FF00',   // Source
    BLUE: '#0064FF',    // Destinations
    YELLOW: '#FFFF00',  // Visited
    RED: '#FF0000',     // Path
};

type CellType = 'empty' | 'source' | 'destination' | 'visited' | 'path';

interface Cell {
    row: number;
    col: number;
    type: CellType;
    distance: number;
    label: string;
}

export default function DijkstraGame({ onClose }: { onClose: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isSelecting, setIsSelecting] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [distances, setDistances] = useState<Map<string, number>>(new Map());

    const gridRef = useRef<Cell[][]>([]);
    const selectedRef = useRef<{ row: number, col: number }[]>([]);

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
                    distance: Infinity,
                    label: '',
                };
            }
        }
        gridRef.current = grid;
    };

    const getNeighbors = (row: number, col: number): { row: number, col: number }[] => {
        const neighbors: { row: number, col: number }[] = [];
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        for (const [dr, dc] of directions) {
            const r = row + dr;
            const c = col + dc;
            if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
                neighbors.push({ row: r, col: c });
            }
        }
        return neighbors;
    };

    const dijkstra = async () => {
        if (selectedRef.current.length < 2) {
            alert('Please select at least a source and one destination!');
            return;
        }

        const grid = gridRef.current;
        const start = selectedRef.current[0];
        const destinations = new Set(selectedRef.current.slice(1).map(p => `${p.row},${p.col}`));

        // Priority queue: [distance, row, col]
        const pq: [number, number, number][] = [[0, start.row, start.col]];
        const dist = new Map<string, number>();
        const visited = new Set<string>();
        const cameFrom = new Map<string, { row: number, col: number }>();

        dist.set(`${start.row},${start.col}`, 0);

        while (pq.length > 0 && !isRunning) {
            // Sort to get minimum distance
            pq.sort((a, b) => a[0] - b[0]);
            const [d, row, col] = pq.shift()!;
            const key = `${row},${col}`;

            if (visited.has(key)) continue;
            visited.add(key);

            const cell = grid[row][col];
            if (cell.type !== 'source' && cell.type !== 'destination') {
                cell.type = 'visited';
            }

            draw();
            await new Promise(resolve => setTimeout(resolve, 20));

            // If we reached a destination, reconstruct path
            if (destinations.has(key)) {
                await reconstructPath(cameFrom, start, { row, col });
            }

            // Check neighbors
            for (const neighbor of getNeighbors(row, col)) {
                const nKey = `${neighbor.row},${neighbor.col}`;
                const newDist = d + 1; // Each block = 1 unit

                if (!dist.has(nKey) || newDist < dist.get(nKey)!) {
                    dist.set(nKey, newDist);
                    cameFrom.set(nKey, { row, col });
                    pq.push([newDist, neighbor.row, neighbor.col]);
                }
            }
        }

        setDistances(dist);
        setIsRunning(false);
        setIsSelecting(false);
    };

    const reconstructPath = async (cameFrom: Map<string, { row: number, col: number }>, start: { row: number, col: number }, end: { row: number, col: number }) => {
        const grid = gridRef.current;
        let current = end;

        while (current.row !== start.row || current.col !== start.col) {
            const key = `${current.row},${current.col}`;
            const prev = cameFrom.get(key);
            if (!prev) break;

            current = prev;
            const cell = grid[current.row][current.col];
            if (cell.type !== 'source') {
                cell.type = 'path';
                draw();
                await new Promise(resolve => setTimeout(resolve, 30));
            }
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = COLORS.WHITE;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const grid = gridRef.current;
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                const cell = grid[i][j];
                const x = j * CELL_SIZE;
                const y = i * CELL_SIZE;

                switch (cell.type) {
                    case 'source':
                        ctx.fillStyle = COLORS.GREEN;
                        break;
                    case 'destination':
                        ctx.fillStyle = COLORS.BLUE;
                        break;
                    case 'visited':
                        ctx.fillStyle = COLORS.YELLOW;
                        break;
                    case 'path':
                        ctx.fillStyle = COLORS.RED;
                        break;
                    default:
                        ctx.fillStyle = COLORS.WHITE;
                }

                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                ctx.strokeStyle = COLORS.GRAY;
                ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);

                // Draw label
                if (cell.label) {
                    ctx.fillStyle = COLORS.BLACK;
                    ctx.font = '20px Arial';
                    ctx.fillText(cell.label, x + 10, y + 25);
                }
            }
        }
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isSelecting || isRunning) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const col = Math.floor(x / CELL_SIZE);
        const row = Math.floor(y / CELL_SIZE);

        if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
            const cell = gridRef.current[row][col];

            // Check if already selected
            const alreadySelected = selectedRef.current.some(p => p.row === row && p.col === col);
            if (alreadySelected) return;

            selectedRef.current.push({ row, col });

            if (selectedRef.current.length === 1) {
                cell.type = 'source';
                cell.label = 'S';
            } else {
                cell.type = 'destination';
                cell.label = `T${selectedRef.current.length - 1}`;
            }

            draw();
        }
    };

    const reset = () => {
        initGrid();
        selectedRef.current = [];
        setDistances(new Map());
        setIsSelecting(true);
        setIsRunning(false);
        draw();
    };

    const runAlgorithm = () => {
        setIsRunning(true);
        dijkstra();
    };

    return (
        <div className="flex flex-col items-center justify-center bg-black p-4 rounded-lg relative">
            <div className="flex w-full justify-between items-center mb-4 max-w-[600px]">
                <span className="text-white text-xl font-bold">Dijkstra's Algorithm</span>
                <div className="flex gap-2">
                    {isSelecting && (
                        <Button variant="ghost" size="sm" className="text-white hover:bg-zinc-800" onClick={runAlgorithm} disabled={isRunning || selectedRef.current.length < 2}>
                            <Play className="mr-2 h-4 w-4" /> Run
                        </Button>
                    )}
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
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="bg-white block cursor-pointer"
                    onClick={handleCanvasClick}
                />
            </div>

            <div className="mt-4 text-white text-sm text-center max-w-[600px]">
                <div className="flex gap-4 justify-center mb-2">
                    <span><span className="inline-block w-4 h-4 bg-green-500 mr-1"></span>Source (S)</span>
                    <span><span className="inline-block w-4 h-4 bg-blue-500 mr-1"></span>Destinations (T1, T2...)</span>
                    <span><span className="inline-block w-4 h-4 bg-yellow-400 mr-1"></span>Visited</span>
                    <span><span className="inline-block w-4 h-4 bg-red-500 mr-1"></span>Path</span>
                </div>
                {isSelecting ? (
                    <p>Click blocks: 1st = source (S), rest = destinations (T1, T2...). Each block = 1 unit weight.</p>
                ) : (
                    <p>Algorithm complete! Red shows shortest paths. Each block = 1 unit of weight.</p>
                )}
            </div>

            {!isSelecting && distances.size > 0 && (
                <div className="mt-4 bg-zinc-900 p-4 rounded-lg max-w-[600px] w-full">
                    <h3 className="text-white font-bold mb-2">Shortest Distances from S:</h3>
                    <div className="grid grid-cols-3 gap-2 text-white text-sm">
                        {selectedRef.current.slice(1).map((dest, i) => {
                            const key = `${dest.row},${dest.col}`;
                            const dist = distances.get(key) ?? '∞';
                            return (
                                <div key={i} className="bg-zinc-800 p-2 rounded">
                                    <span className="font-bold">T{i + 1}:</span> {dist} units
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
