import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GRID_SIZE, INITIAL_SPEED, SPEED_INCREMENT } from '../constants';
import { GameState } from '../types';
import { Trophy, RefreshCw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<GameState>({
    snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }],
    food: { x: 5, y: 5 },
    direction: 'UP',
    score: 0,
    isGameOver: false,
    highScore: parseInt(localStorage.getItem('snake-high-score') || '0', 10),
  });

  const [isPaused, setIsPaused] = useState(false);
  const directionRef = useRef<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('UP');

  const generateFood = useCallback((snake: { x: number; y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setGame({
      snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }],
      food: generateFood([]),
      direction: 'UP',
      score: 0,
      isGameOver: false,
      highScore: parseInt(localStorage.getItem('snake-high-score') || '0', 10),
    });
    directionRef.current = 'UP';
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') directionRef.current = 'UP';
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') directionRef.current = 'DOWN';
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (game.isGameOver || isPaused) return;

    const interval = setInterval(() => {
      setGame(prev => {
        const newSnake = [...prev.snake];
        const head = { ...newSnake[0] };

        switch (directionRef.current) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Boundary check
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          return { ...prev, isGameOver: true };
        }

        // Self collision
        if (newSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
          return { ...prev, isGameOver: true };
        }

        newSnake.unshift(head);

        // Food check
        if (head.x === prev.food.x && head.y === prev.food.y) {
          const newScore = prev.score + 10;
          const newHighScore = Math.max(newScore, prev.highScore);
          if (newHighScore > prev.highScore) {
            localStorage.setItem('snake-high-score', newHighScore.toString());
          }
          return {
            ...prev,
            snake: newSnake,
            food: generateFood(newSnake),
            score: newScore,
            highScore: newHighScore,
          };
        }

        newSnake.pop();
        return { ...prev, snake: newSnake };
      });
    }, Math.max(50, INITIAL_SPEED - (game.score / 10) * SPEED_INCREMENT));

    return () => clearInterval(interval);
  }, [game.isGameOver, game.score, isPaused, generateFood]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width / GRID_SIZE;

    // Clear background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines (subtle)
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
    ctx.beginPath();
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, canvas.height);
      ctx.moveTo(0, i * size);
      ctx.lineTo(canvas.width, i * size);
    }
    ctx.stroke();

    // Draw snake
    game.snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00FFFF' : '#FF00FF';
      // Glow effect for head
      if (index === 0) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00FFFF';
      } else {
        ctx.shadowBlur = 0;
      }
      
      ctx.fillRect(segment.x * size + 1, segment.y * size + 1, size - 2, size - 2);
    });

    // Draw food
    ctx.fillStyle = '#39FF14';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#39FF14';
    ctx.fillRect(game.food.x * size + 2, game.food.y * size + 2, size - 4, size - 4);
    ctx.shadowBlur = 0;

  }, [game]);

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex justify-between w-full max-w-[400px] border-b border-[#00FFFF] pb-2 mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#FF00FF] animate-pulse" />
          <span className="text-xl uppercase tracking-tighter text-glow-cyan" data-text={`SCORE: ${game.score.toString().padStart(4, '0')}`}>
            SCORE: {game.score.toString().padStart(4, '0')}
          </span>
        </div>
        <div className="flex items-center gap-2 opacity-70">
          <Trophy className="w-4 h-4 text-[#FFD700]" />
          <span className="text-xl uppercase tracking-tighter" data-text={`BEST: ${game.highScore.toString().padStart(4, '0')}`}>
            BEST: {game.highScore.toString().padStart(4, '0')}
          </span>
        </div>
      </div>

      <div className="relative group">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-[#00FFFF] border-glow-cyan cursor-none transition-transform duration-300 group-hover:scale-[1.01]"
        />
        
        {/* CRT Overlay on Canvas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

        <AnimatePresence>
          {(game.isGameOver || isPaused) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm"
            >
              <h2 className={`text-4xl mb-6 tracking-widest chromatic ${game.isGameOver ? 'text-[#FF00FF]' : 'text-[#00FFFF]'}`} data-text={game.isGameOver ? 'CORE_FAILURE' : 'SYSTEM_PAUSED'}>
                {game.isGameOver ? 'CORE_FAILURE' : 'SYSTEM_PAUSED'}
              </h2>
              <button
                onClick={game.isGameOver ? resetGame : () => setIsPaused(false)}
                className="group relative px-8 py-3 border border-current hover:bg-current transition-colors duration-300"
              >
                <span className={`flex items-center gap-2 group-hover:invert ${game.isGameOver ? 'text-[#FF00FF]' : 'text-[#00FFFF]'}`}>
                  <RefreshCw className="w-5 h-5" />
                  {game.isGameOver ? 'REBOOT_SEQUENCE' : 'RESUME_PROCESS'}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-xs uppercase tracking-[0.2em] opacity-40 animate-pulse">
        [ ARROWS_TO_NAVIGATE ] [ SPACE_TO_PAUSE ]
      </div>
    </div>
  );
}
