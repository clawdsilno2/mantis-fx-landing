// Trading performance card — Mantis FX VIP
// Monochromatic face; iridescent effects live on top via CSS/SVG masks.

const MONTHS = [
  { id: "mar26", month: "Mar", year: "2026", label: "March",
    trades: 57, wins: 44, losses: 9,  be: 4,  pips: 823 },
  { id: "feb26", month: "Feb", year: "2026", label: "February",
    trades: 44, wins: 32, losses: 8,  be: 4,  pips: 556 },
  { id: "jan26", month: "Jan", year: "2026", label: "January",
    trades: 61, wins: 47, losses: 10, be: 4,  pips: 902 },
  { id: "dec25", month: "Dec", year: "2025", label: "December",
    trades: 52, wins: 39, losses: 8,  be: 5,  pips: 748 },
  { id: "nov25", month: "Nov", year: "2025", label: "November",
    trades: 48, wins: 34, losses: 9,  be: 5,  pips: 612 },
];

function winRate(m) {
  const decided = m.wins + m.losses; // exclude BE from denominator
  return decided === 0 ? 0 : Math.round((m.wins / decided) * 100);
}

function CardFace({ month, ink = "#D4AF37", paper = "#111111" }) {
  const m = month;
  const wr = winRate(m);
  // Donut dasharray — circumference for r=46
  const C = 2 * Math.PI * 46;
  const winDash = (C * wr) / 100;

  return (
    <svg
      viewBox="0 0 500 700"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <pattern id={`dots-${m.id}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.55" fill={ink} opacity="0.5" />
        </pattern>
      </defs>

      {/* Paper */}
      <rect x="0" y="0" width="500" height="700" rx="28" fill={paper} />
      <rect x="0" y="0" width="500" height="700" rx="28" fill={`url(#dots-${m.id})`} opacity="0.32" />

      {/* hairline frames */}
      <rect x="18" y="18" width="464" height="664" rx="18"
            fill="none" stroke={ink} strokeOpacity="1" strokeWidth="1.4" />
      <rect x="24" y="24" width="452" height="652" rx="14"
            fill="none" stroke={ink} strokeOpacity="0.45" strokeWidth="0.6" />

      {/* corner crosshairs */}
      {[[40,40,1,1],[460,40,-1,1],[40,660,1,-1],[460,660,-1,-1]].map(([x,y,sx,sy],i)=>(
        <g key={i} transform={`translate(${x} ${y})`}>
          <line x1="0" y1="0" x2={10*sx} y2="0" stroke={ink} strokeWidth="0.7" />
          <line x1="0" y1="0" x2="0" y2={10*sy} stroke={ink} strokeWidth="0.7" />
        </g>
      ))}

      {/* ─── Header: brand + ribbon ─── */}
      <g transform="translate(44 68)">
        <text x="0" y="0" fill={ink} fontFamily="JetBrains Mono, ui-monospace, monospace"
              fontSize="11" letterSpacing="0.32em" fontWeight="700">MANTIS FX · VIP</text>
        <line x1="0" y1="9" x2="68" y2="9" stroke={ink} strokeWidth="1.6" />
      </g>
      <g transform="translate(456 68)" textAnchor="end">
        <text x="0" y="0" fill={ink} fontFamily="JetBrains Mono, ui-monospace, monospace"
              fontSize="11" letterSpacing="0.28em" fontWeight="600" opacity="0.9">PERFORMANCE · 0{MONTHS.findIndex(x=>x.id===m.id)+1}/05</text>
      </g>

      {/* ─── Month display (centered, previous styling) ─── */}
      <g transform="translate(250 150)" textAnchor="middle">
        <text x="0" y="0" fill={ink} fontFamily="Fraunces, serif"
              fontSize="90" fontWeight="700" letterSpacing="-0.035em">{m.label}</text>
        <text x="0" y="44" fill={ink} fontFamily="Fraunces, serif"
              fontSize="90" fontWeight="500" fontStyle="italic"
              letterSpacing="-0.02em" opacity="0.78">{m.year}</text>
      </g>

      {/* ─── Central donut (win rate) ─── */}
      <g transform="translate(250 332)">
        {/* tick ring */}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i * 10 * Math.PI) / 180;
          const r1 = 70, r2 = i % 3 === 0 ? 64 : 67;
          return (
            <line key={i}
              x1={Math.cos(a)*r1} y1={Math.sin(a)*r1}
              x2={Math.cos(a)*r2} y2={Math.sin(a)*r2}
              stroke={ink} strokeWidth="0.6"
              strokeOpacity={i % 3 === 0 ? 0.8 : 0.3} />
          );
        })}
        {/* progress rings */}
        <circle r="46" fill="none" stroke={ink} strokeOpacity="0.18" strokeWidth="11" />
        <circle r="46" fill="none" stroke={ink} strokeWidth="11"
                strokeDasharray={`${winDash} ${C - winDash}`}
                strokeDashoffset={C * 0.25}
                transform="rotate(-90)"
                strokeLinecap="butt" />
        {/* inner field */}
        <circle r="36" fill={paper} />
        <circle r="36" fill={`url(#dots-${m.id})`} opacity="0.35" />
        {/* WR number */}
        <text y="6" textAnchor="middle" fill={ink}
              fontFamily="Fraunces, serif" fontSize="38" fontWeight="700"
              letterSpacing="-0.02em">{wr}%</text>
        <text y="22" textAnchor="middle" fill={ink} opacity="0.85"
              fontFamily="JetBrains Mono, monospace" fontSize="8.5" fontWeight="600"
              letterSpacing="0.3em">WIN RATIO</text>
      </g>

      {/* ─── Pips callout (right of donut) ─── */}
      <g transform="translate(456 312)" textAnchor="end">
        <text x="0" y="0" fill={ink} opacity="0.9"
              fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600"
              letterSpacing="0.28em">TOTAL PIPS</text>
        <text x="0" y="48" fill={ink} fontFamily="Fraunces, serif"
              fontSize="58" fontWeight="700" letterSpacing="-0.035em">+{m.pips}</text>
        <line x1="-90" y1="60" x2="0" y2="60" stroke={ink} strokeWidth="1" />
        <text x="0" y="78" fill={ink} opacity="0.7"
              fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="500"
              letterSpacing="0.2em">PIPS GAINED</text>
      </g>

      {/* ─── Pips callout (left of donut) ─── */}
      <g transform="translate(44 312)">
        <text x="0" y="0" fill={ink} opacity="0.9"
              fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="600"
              letterSpacing="0.28em">TOTAL TRADES</text>
        <text x="0" y="48" fill={ink} fontFamily="Fraunces, serif"
              fontSize="58" fontWeight="700" letterSpacing="-0.035em">{m.trades}</text>
        <line x1="0" y1="60" x2="90" y2="60" stroke={ink} strokeWidth="1" />
        <text x="0" y="78" fill={ink} opacity="0.7"
              fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="500"
              letterSpacing="0.2em">EXECUTED</text>
      </g>

      {/* ─── Stats strip: Wins / Losses / BE (centered) ─── */}
      <g transform="translate(250 472)" textAnchor="middle">
        <line x1="-206" y1="0" x2="206" y2="0" stroke={ink} strokeWidth="1" />
        <line x1="-206" y1="120" x2="206" y2="120" stroke={ink} strokeWidth="1" />

        {/* three columns, centered at -137, 0, +137 */}
        {[
          { label: "WINS",      value: m.wins },
          { label: "LOSSES",    value: m.losses },
          { label: "BREAKEVEN", value: m.be },
        ].map((col, i) => {
          const cx = (i - 1) * 137;
          return (
            <g key={col.label} transform={`translate(${cx} 0)`}>
              {i > 0 && <line x1="-68.5" y1="20" x2="-68.5" y2="100" stroke={ink} strokeWidth="0.6" strokeOpacity="0.7" />}
              <text x="0" y="34" fill={ink} opacity="0.9"
                    fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="600"
                    letterSpacing="0.25em">{col.label}</text>
              <text x="0" y="82" fill={ink} fontFamily="Fraunces, serif"
                    fontSize="44" fontWeight="700" letterSpacing="-0.02em">{col.value}</text>
              {/* tick bar under number reflecting ratio, centered */}
              <g transform="translate(-40.5 96)">
                {Array.from({ length: 10 }).map((_, j) => {
                  const total = m.wins + m.losses + m.be;
                  const ratio = col.value / total;
                  const active = j < Math.round(ratio * 10);
                  return (
                    <rect key={j} x={j * 9} y="0" width="5" height="5"
                          fill={ink} opacity={active ? 0.95 : 0.22} />
                  );
                })}
              </g>
            </g>
          );
        })}
      </g>

      {/* ─── Footer ─── */}
      <g transform="translate(250 624)" textAnchor="middle">
        <line x1="-150" y1="-14" x2="-56" y2="-14" stroke={ink} strokeWidth="0.8" />
        <line x1="56" y1="-14" x2="150" y2="-14" stroke={ink} strokeWidth="0.8" />
        <text y="-10" fill={ink} fontFamily="JetBrains Mono, monospace"
              fontSize="10.5" fontWeight="600" letterSpacing="0.3em">SIGNAL REPORT</text>
        <text y="14" fill={ink} opacity="0.7"
              fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="500"
              letterSpacing="0.24em">
          {m.month.toUpperCase()} 01 — {m.month.toUpperCase()} {lastDay(m)} · {m.year}
        </text>
      </g>
    </svg>
  );
}

function lastDay(m) {
  const map = { Jan: 31, Feb: 28, Mar: 31, Apr: 30, May: 31, Jun: 30,
                Jul: 31, Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31 };
  return map[m.month] || 30;
}

Object.assign(window, { CardFace, MONTHS, winRate });
