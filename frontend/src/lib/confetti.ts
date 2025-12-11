import confetti from 'canvas-confetti';

/**
 * Celebrate successful transactions with confetti
 */
export function celebrateSuccess() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Burst from left
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    
    // Burst from right
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
}

/**
 * Single burst confetti for smaller celebrations
 */
export function miniCelebration() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

/**
 * Firework effect for level-up celebrations
 */
export function fireworks() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#667eea', '#764ba2', '#f093fb']
    });
    
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#667eea', '#764ba2', '#f093fb']
    });
  }, 200);
}

/**
 * Emoji rain for achievements
 */
export function emojiRain(emoji: string = '🎉') {
  const scalar = 2;
  const unicorn = confetti.shapeFromText({ text: emoji, scalar });

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0.5,
    decay: 0.96,
    startVelocity: 20,
    shapes: [unicorn],
    scalar,
    zIndex: 9999
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30
    });

    confetti({
      ...defaults,
      particleCount: 5,
      flat: true
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}
