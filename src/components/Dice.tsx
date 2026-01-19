import { useEffect, useRef } from 'react';

interface DiceProps {
  isRolling: boolean;
  result: number | null;
  onRollComplete?: () => void;
}

const ROTATIONS: Record<number, string> = {
  1: 'rotateX(0) rotateY(0)',
  2: 'rotateX(-90deg)',
  3: 'rotateY(-90deg)',
  4: 'rotateY(90deg)',
  5: 'rotateX(90deg)',
  6: 'rotateY(180deg)'
};

export function Dice({ isRolling, result, onRollComplete }: DiceProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const onRollCompleteRef = useRef(onRollComplete);

  useEffect(() => {
    onRollCompleteRef.current = onRollComplete;
  }, [onRollComplete]);

  useEffect(() => {
    if (isRolling && cubeRef.current) {
      cubeRef.current.style.transform = 'translateZ(-40px)';
    } else if (!isRolling && result && cubeRef.current) {
      cubeRef.current.style.transform = `translateZ(-40px) ${ROTATIONS[result]}`;

      const timer = setTimeout(() => {
        onRollCompleteRef.current?.();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isRolling, result]);

  return (
    <div className="scene cursor-pointer">
      <div
        ref={cubeRef}
        className={`cube ${isRolling ? 'rolling' : ''}`}
      >
        <div className="cube__face cube__face--front f1">
          <div className="dot"></div>
        </div>
        <div className="cube__face cube__face--top face-grid f2">
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="cube__face cube__face--right face-grid f3">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="cube__face cube__face--left face-grid f4">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="cube__face cube__face--bottom face-grid f5">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="cube__face cube__face--back face-grid f6">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
}
