import { useEffect, useRef, useState } from "react";

type Bubble = {
  id: number;
  x: number;
  y: number;
  radius: number;
  speed: number;
  hue: number;
};

const RelaxingCorner = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const bubblesRef = useRef<Bubble[]>([]);
  const nextIdRef = useRef(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = () => {
      const radius = 16 + Math.random() * 20;
      bubblesRef.current.push({
        id: nextIdRef.current++,
        x: Math.random() * canvas.width,
        y: canvas.height + radius,
        radius,
        speed: 0.4 + Math.random() * 1.1,
        hue: 20 + Math.floor(Math.random() * 60),
      });
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (bubblesRef.current.length < 22 && Math.random() < 0.2) spawn();
      bubblesRef.current = bubblesRef.current
        .map((b) => ({ ...b, y: b.y - b.speed }))
        .filter((b) => b.y + b.radius > -8);

      for (const b of bubblesRef.current) {
        const g = ctx.createRadialGradient(
          b.x - b.radius * 0.35,
          b.y - b.radius * 0.35,
          1,
          b.x,
          b.y,
          b.radius
        );
        g.addColorStop(0, `hsla(${b.hue},80%,70%,0.9)`);
        g.addColorStop(1, `hsla(${b.hue},70%,50%,0.15)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let popped = false;
    bubblesRef.current = bubblesRef.current.filter((b) => {
      const hit = Math.hypot(b.x - x, b.y - y) <= b.radius;
      if (hit) popped = true;
      return !hit;
    });
    if (popped) setScore((s) => s + 1);
  };

  return (
    <div className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-serif font-light text-foreground">Relaxing Corner</h2>
          <p className="text-muted-foreground">Pop gentle bubbles to unwind. Tap or click on rising bubbles.</p>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border" style={{ height: "60vh" }}>
          <canvas ref={canvasRef} onClick={onCanvasClick} className="w-full h-full cursor-pointer" />
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-sm">
            Score: {score}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelaxingCorner;


