declare module 'canvas-confetti' {
  interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: any[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
    flat?: boolean;
  }

  interface Confetti {
    (options?: Options): Promise<null>;
    reset(): void;
    shapeFromText(options: { text: string; scalar?: number }): any;
  }

  const confetti: Confetti;
  export default confetti;
}
