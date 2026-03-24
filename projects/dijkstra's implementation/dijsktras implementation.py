import pygame
import heapq
import sys
import threading
import tkinter as tk
from tkinter import ttk

# --- CONFIG ---
ROWS, COLS = 15, 15
BLOCK_SIZE = 40
WIDTH, HEIGHT = COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE
FPS = 60

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (200, 200, 200)
GREEN = (0, 255, 0)
BLUE = (0, 100, 255)
YELLOW = (255, 255, 0)
RED = (255, 0, 0)

pygame.init()
pygame.display.set_caption("Dijkstra Pathfinding Visualizer")
screen = pygame.display.set_mode((WIDTH, HEIGHT + 70))
font = pygame.font.SysFont(None, 28)
clock = pygame.time.Clock()

# ---------------- GRID + NODE ----------------
class Node:
    def __init__(self, row, col):
        self.row = row
        self.col = col
        self.color = WHITE
        self.rect = pygame.Rect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)

    def draw(self, screen):
        pygame.draw.rect(screen, self.color, self.rect)
        pygame.draw.rect(screen, GRAY, self.rect, 1)

def make_grid():
    return [[Node(i, j) for j in range(COLS)] for i in range(ROWS)]

def get_neighbors(node):
    # 4-directional movement
    directions = [(1,0), (-1,0), (0,1), (0,-1)]
    for dr, dc in directions:
        r, c = node.row + dr, node.col + dc
        if 0 <= r < ROWS and 0 <= c < COLS:
            yield (r, c)

def draw_grid(grid, labels):
    for row in grid:
        for node in row:
            node.draw(screen)
    # draw labels on selected positions
    for pos, label in labels.items():
        r, c = pos
        text = font.render(label, True, BLACK)
        screen.blit(text, (c * BLOCK_SIZE + 10, r * BLOCK_SIZE + 8))

def draw_info(text):
    pygame.draw.rect(screen, BLACK, (0, HEIGHT, WIDTH, 70))
    for i, line in enumerate(text.split("\n")):
        label = font.render(line, True, WHITE)
        screen.blit(label, (10, HEIGHT + 10 + 25 * i))

# ---------------- DIJKSTRA ----------------
def reconstruct_path(came_from, start, end, grid):
    node = end
    while node != start and node in came_from:
        r, c = node
        grid[r][c].color = RED
        node = came_from[node]
    pygame.display.update()

def dijkstra(grid, start, destinations):
    pq = [(0, start)]
    dist = {start: 0}
    came_from = {}
    visited = set()

    while pq:
        d, curr = heapq.heappop(pq)
        if curr in visited:
            continue
        visited.add(curr)

        r, c = curr
        n = grid[r][c]
        if n.color not in (GREEN, BLUE):
            n.color = YELLOW
        pygame.display.update()
        pygame.time.delay(10)

        if curr in destinations:
            reconstruct_path(came_from, start, curr, grid)

        for nbr in get_neighbors(n):
            nd = d + 1  # Each block = 1 unit
            if nbr not in dist or nd < dist[nbr]:
                dist[nbr] = nd
                came_from[nbr] = curr
                heapq.heappush(pq, (nd, nbr))

    return dist

# ---------------- DISTANCES WINDOW (TKINTER) ----------------
def _tk_distances_window(source_label, labels, distances):
    root = tk.Tk()
    root.title("Shortest Distances")
    root.geometry("420x420+850+100")
    root.configure(bg="#1E1E1E")

    title = tk.Label(root, text=f"Distances from {source_label}:", fg="white", bg="#1E1E1E",
                     font=("Segoe UI", 14, "bold"))
    title.pack(pady=(12, 6))

    container = ttk.Frame(root)
    container.pack(fill="both", expand=True, padx=12, pady=6)

    # Treeview for neat list
    columns = ("target", "distance")
    tree = ttk.Treeview(container, columns=columns, show="headings", height=12)
    tree.heading("target", text="Target")
    tree.heading("distance", text="Distance (units)")
    tree.column("target", anchor="center", width=120)
    tree.column("distance", anchor="center", width=160)
    tree.pack(fill="both", expand=True, side="left")

    # Scrollbar
    scrollbar = ttk.Scrollbar(container, orient="vertical", command=tree.yview)
    tree.configure(yscrollcommand=scrollbar.set)
    scrollbar.pack(side="right", fill="y")

    # Populate
    # Sort by T index (T1, T2, ...) while skipping S
    targets = [(pos, lab) for pos, lab in labels.items() if lab != source_label]
    def _key(t):
        lab = t[1]
        if lab.startswith("T"):
            try:
                return int(lab[1:])
            except:
                return 10**9
        return 10**9
    targets.sort(key=_key)

    for pos, lab in targets:
        d = distances.get(pos, "∞")
        tree.insert("", "end", values=(lab, d))

    note = tk.Label(root, text="Each block = 1 unit of weight",
                    fg="#FFC966", bg="#1E1E1E", font=("Segoe UI", 10, "italic"))
    note.pack(pady=(6, 8))

    btn = ttk.Button(root, text="Close", command=root.destroy)
    btn.pack(pady=(0, 10))

    # Use a nice ttk theme if available
    try:
        style = ttk.Style()
        if "vista" in style.theme_names():
            style.theme_use("vista")
    except:
        pass

    root.mainloop()

def open_distance_window(source_label, labels, distances):
    # Launch the Tk window on a separate thread so pygame stays responsive
    t = threading.Thread(target=_tk_distances_window, args=(source_label, labels, distances), daemon=True)
    t.start()

# ---------------- MAIN ----------------
def main():
    grid = make_grid()
    selecting = True
    selected = []
    labels = {}

    while True:
        clock.tick(FPS)
        screen.fill(WHITE)
        draw_grid(grid, labels)

        if selecting:
            info = (
                "Click blocks (1st = source, rest = destinations)"
                "\nPress ENTER when done."
                "\nEach block = 1 unit of weight."
            )
        else:
            info = "Press R to reset or ESC to quit.\nEach block = 1 unit of weight."
        draw_info(info)
        pygame.display.update()

        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            # ESC to quit
            if e.type == pygame.KEYDOWN and e.key == pygame.K_ESCAPE:
                pygame.quit()
                sys.exit()

            # Left-click to select blocks during selection phase
            if selecting and pygame.mouse.get_pressed()[0]:
                pos = pygame.mouse.get_pos()
                if pos[1] < HEIGHT:
                    r, c = pos[1] // BLOCK_SIZE, pos[0] // BLOCK_SIZE
                    if (r, c) not in selected:
                        selected.append((r, c))
                        n = grid[r][c]
                        if len(selected) == 1:
                            n.color = GREEN
                            labels[(r, c)] = "S"
                        else:
                            n.color = BLUE
                            labels[(r, c)] = f"T{len(selected) - 1}"

            if e.type == pygame.KEYDOWN:
                # Run algorithm and open distances window
                if selecting and e.key == pygame.K_RETURN and len(selected) > 1:
                    selecting = False
                    start = selected[0]
                    destinations = set(selected[1:])
                    dist = dijkstra(grid, start, destinations)
                    open_distance_window("S", labels, dist)

                # Reset grid
                if not selecting and e.key == pygame.K_r:
                    grid = make_grid()
                    selected = []
                    labels = {}
                    selecting = True

if __name__ == "__main__":
    main()
