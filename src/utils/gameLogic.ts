import { TileType, PathCoord } from '../types';

const GRID_SIZE = 7;
const TILES_COUNT = 49;

export function generateSpiralPath(): PathCoord[] {
  const path: PathCoord[] = [];
  let r = 0, c = 0, dr = 0, dc = 1;
  const visited: boolean[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false));

  for (let i = 0; i < TILES_COUNT; i++) {
    path[i] = { r, c };
    visited[r][c] = true;

    const nr = r + dr;
    const nc = c + dc;

    if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && !visited[nr][nc]) {
      r = nr;
      c = nc;
    } else {
      if (dr === 0 && dc === 1) { dr = 1; dc = 0; }
      else if (dr === 1 && dc === 0) { dr = 0; dc = -1; }
      else if (dr === 0 && dc === -1) { dr = -1; dc = 0; }
      else if (dr === -1 && dc === 0) { dr = 0; dc = 1; }
      r += dr;
      c += dc;
    }
  }

  return path;
}

export function generateBoardMap(): TileType[] {
  const boardMap: TileType[] = new Array(TILES_COUNT).fill('blank');
  
  const availableIndices = [];
  for (let i = 1; i < TILES_COUNT - 1; i++) {
    availableIndices.push(i);
  }

  for (let i = availableIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
  }

  for (let i = 0; i < 16; i++) {
    boardMap[availableIndices[i]] = 'lucky';
  }
  for (let i = 16; i < 32; i++) {
    boardMap[availableIndices[i]] = 'trap';
  }

  return boardMap;
}

export function calculateNewPosition(current: number, steps: number): number {
  let target = current + steps;

  if (target >= 48) {
    target = 48 - (target - 48);
  }

  return target;
}

export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}
