// Clean card row — gold glow hover, 3D tilt, no rainbow
function Card({ month, index }) {
  const cardRef = React.useRef(null);
  const rafRef = React.useRef(0);
  const target = React.useRef({ x: 0.5, y: 0.5, a: 0 });
  const current = React.useRef({ x: 0.5, y: 0.5, a: 0 });

  React.useEffect(() => {
    let t0 = performance.now();
    const tick = (now) => {
      const dt = Math.min(48, now - t0); t0 = now;
      const k = 1 - Math.pow(0.84, dt / 16);
      const c = current.current, g = target.current;
      c.x += (g.x - c.x) * k;
      c.y += (g.y - c.y) * k;
      c.a += (g.a - c.a) * k;

      const phase = index * 0.6;
      const idle = g.a < 0.01 ? 2 : 0;
      const fx = idle ? Math.sin(now / 2600 + phase) * idle * 0.5 : 0;
      const fy = idle ? Math.cos(now / 2100 + phase) * idle * 0.5 : 0;

      const el = cardRef.current;
      if (el) {
        const rx = (0.5 - c.y) * 14 + fy;
        const ry = (c.x - 0.5) * 14 + fx;
        const tz = c.a * 20;
        el.style.transform = `translateZ(${tz}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        el.style.setProperty("--active", c.a.toFixed(3));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index]);

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    target.current = {
      x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
      y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
      a: 1,
    };
  };
  const onLeave = () => { target.current = { x: 0.5, y: 0.5, a: 0 }; };

  return (
    <div
      ref={cardRef}
      className="perf-card-wrap"
      onPointerMove={onMove}
      onPointerEnter={() => { target.current.a = 1; }}
      onPointerLeave={onLeave}
    >
      <div className="perf-card-glow" />
      <div className="perf-card-inner">
        <CardFace month={month} ink="#D4AF37" paper="#111111" />
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <style>{`
        .perf-row {
          display: flex;
          gap: 24px;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          perspective: 2200px;
          transform-style: preserve-3d;
        }
        .perf-card-wrap {
          width: 250px;
          height: 350px;
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
          --active: 0;
        }
        .perf-card-glow {
          position: absolute;
          inset: -40px;
          border-radius: 30px;
          background: radial-gradient(ellipse at center, rgba(212,175,55,0.25), transparent 70%);
          filter: blur(30px);
          opacity: calc(var(--active) * 0.7);
          transform: translateZ(-30px);
          pointer-events: none;
          z-index: -1;
        }
        .perf-card-inner {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(212,175,55,0.12);
          box-shadow:
            0 24px 40px -16px rgba(0,0,0,0.6),
            0 8px 16px -8px rgba(0,0,0,0.4);
          transition: border-color 0.3s;
        }
        .perf-card-wrap:hover .perf-card-inner {
          border-color: rgba(212,175,55,0.3);
        }
        @media(max-width:1100px) {
          .perf-row { flex-wrap: wrap; }
          .perf-card-wrap { width: 220px; height: 308px; }
        }
        @media(max-width:600px) {
          .perf-card-wrap { width: 280px; height: 392px; }
        }
      `}</style>
      <div className="perf-row">
        {MONTHS.map((m, i) => (
          <Card key={m.id} month={m} index={i} />
        ))}
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("perf-root")).render(<App />);
