// Confetti animation using canvas-confetti library functionality
// This creates a confetti effect for celebrating high quiz scores

export interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

class ConfettiManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationId: number | null = null;

  private createCanvas(): void {
    // Remove existing canvas if any
    const existingCanvas = document.getElementById('confetti-canvas');
    if (existingCanvas) {
      existingCanvas.remove();
    }

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    
    document.body.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  private resizeCanvas(): void {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createParticles(options: ConfettiOptions): void {
    const {
      particleCount = 100,
      angle = 90,
      spread = 60,
      startVelocity = 45,
      decay = 0.9,
      gravity = 1,
      drift = 0,
      colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
      scalar = 1,
    } = options;

    const centerX = this.canvas!.width / 2;
    const centerY = this.canvas!.height / 2;

    for (let i = 0; i < particleCount; i++) {
      const angleInRadians = (angle + (Math.random() - 0.5) * spread) * (Math.PI / 180);
      const velocity = startVelocity + (Math.random() - 0.5) * 10;
      
      this.particles.push(new Particle({
        x: centerX,
        y: centerY,
        vx: Math.cos(angleInRadians) * velocity,
        vy: Math.sin(angleInRadians) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        decay,
        gravity,
        drift,
        scalar,
      }));
    }
  }

  private animate(): void {
    if (!this.ctx || !this.canvas) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles = this.particles.filter(particle => {
      particle.update();
      particle.draw(this.ctx!);
      return particle.isAlive();
    });

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    } else {
      this.cleanup();
    }
  }

  private cleanup(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
      this.ctx = null;
    }
    
    this.particles = [];
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
  }

  public fire(options: ConfettiOptions = {}): void {
    // Check for reduced motion preference
    if (options.disableForReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.cleanup(); // Clean up any existing animation
    this.createCanvas();
    this.createParticles(options);
    this.animate();
  }
}

class Particle {
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private color: string;
  private decay: number;
  private gravity: number;
  private drift: number;
  private scalar: number;
  private life: number;
  private size: number;
  private rotation: number;
  private rotationSpeed: number;

  constructor(options: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    decay: number;
    gravity: number;
    drift: number;
    scalar: number;
  }) {
    this.x = options.x;
    this.y = options.y;
    this.vx = options.vx;
    this.vy = options.vy;
    this.color = options.color;
    this.decay = options.decay;
    this.gravity = options.gravity;
    this.drift = options.drift;
    this.scalar = options.scalar;
    this.life = 1;
    this.size = (Math.random() * 8 + 4) * this.scalar;
    this.rotation = Math.random() * 2 * Math.PI;
    this.rotationSpeed = (Math.random() - 0.5) * 0.3;
  }

  public update(): void {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.decay;
    this.vy = (this.vy * this.decay) + this.gravity;
    this.vx += this.drift;
    this.rotation += this.rotationSpeed;
    this.life *= 0.98; // Fade out over time
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    
    // Draw confetti as rectangles
    ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
    
    ctx.restore();
  }

  public isAlive(): boolean {
    return this.life > 0.1 && this.y < window.innerHeight + 100;
  }
}

const confettiManager = new ConfettiManager();

export function triggerConfetti(options: ConfettiOptions = {}): void {
  // Default celebration confetti
  const defaultOptions: ConfettiOptions = {
    particleCount: 150,
    angle: 90,
    spread: 70,
    startVelocity: 60,
    decay: 0.9,
    gravity: 1.2,
    drift: 0,
    colors: [
      '#ff0000', // red
      '#00ff00', // green  
      '#0000ff', // blue
      '#ffff00', // yellow
      '#ff00ff', // magenta
      '#00ffff', // cyan
      '#ffa500', // orange
      '#800080', // purple
    ],
    scalar: 1,
    disableForReducedMotion: true,
  };

  const finalOptions = { ...defaultOptions, ...options };
  confettiManager.fire(finalOptions);
}

// Preset functions for different types of celebrations
export function triggerSuccess(): void {
  triggerConfetti({
    particleCount: 100,
    spread: 50,
    colors: ['#00ff00', '#32cd32', '#228b22', '#90ee90'],
  });
}

export function triggerExcellent(): void {
  // Multiple bursts for excellent scores
  triggerConfetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
  });
  
  setTimeout(() => {
    triggerConfetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
    });
  }, 200);
}

export function triggerPerfectScore(): void {
  // Epic celebration for perfect scores
  const colors = ['#ffd700', '#ffa500', '#ff4500', '#ff1493', '#9400d3'];
  
  triggerConfetti({
    particleCount: 200,
    spread: 80,
    colors,
    startVelocity: 70,
  });
  
  setTimeout(() => {
    triggerConfetti({
      particleCount: 150,
      angle: 45,
      spread: 60,
      colors,
    });
  }, 300);
  
  setTimeout(() => {
    triggerConfetti({
      particleCount: 150,
      angle: 135,
      spread: 60,
      colors,
    });
  }, 600);
}
