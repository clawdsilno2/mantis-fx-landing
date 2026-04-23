// Direction 2 — EDITORIAL LEDGER
// Refined financial publication. Focus on selected week + daily Mon-Fri.

const EL = {
  paper: '#111111',
  paperDeep: '#1a1a1a',
  ink: '#f5f5f5',
  inkSoft: '#999999',
  rule: 'rgba(212,175,55,0.1)',
  ruleStrong: 'rgba(212,175,55,0.2)',
  gold: '#D4AF37',
  goldDeep: '#E8C84A',
  red: '#ef4444',
  green: '#22c55e',
};

function EditorialLedger({ weeks, winRatio, cumulative, totalPips, totalTrades, totalWins, totalLosses, overallWR, simulate }) {
  const [idx, setIdx] = React.useState(weeks.length - 1);
  const [balance, setBalance] = React.useState(10000);
  const [weekOpen, setWeekOpen] = React.useState(false);
  const w = weeks[idx];
  const wr = winRatio(w);
  const sim = simulate(balance, weeks);
  const simThisWeek = simulate(balance, weeks.slice(0, idx + 1));

  const display = '"Instrument Serif", Georgia, serif';
  const body = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const maxDayPips = Math.max(...w.days.map((d) => d.pips));

  return (
    <div style={{
      width: '100%', height: '100%', background: EL.paper, color: EL.ink,
      fontFamily: body, fontSize: 13, position: 'relative', overflow: 'auto',
      backgroundImage: 'radial-gradient(circle at 20% 0%, rgba(212,175,55,0.03), transparent 50%), radial-gradient(circle at 80% 100%, rgba(212,175,55,0.03), transparent 50%)',
    }}>
      <style>{`
        @media(max-width:768px){
          .el-masthead{grid-template-columns:1fr !important;text-align:center !important;padding:16px 20px 12px !important}
          .el-masthead>div:first-child,.el-masthead>div:last-child{display:none}
          .el-weekstrip{padding:10px 16px !important;flex-wrap:wrap;justify-content:center}
          .el-body{grid-template-columns:1fr !important;padding:16px 16px 24px !important;gap:24px !important;height:auto !important}
          .el-body>div:last-child{border-left:none !important;padding-left:0 !important;border-top:1px solid rgba(212,175,55,0.1);padding-top:20px}
        }
        @media(max-width:480px){
          .el-masthead .el-title{font-size:26px !important}
          .el-hero-pips{font-size:64px !important}
          .el-weeknum{font-size:48px !important}
        }
      `}</style>
      {/* Masthead */}
      <div className="el-masthead" style={{ padding: '22px 48px 16px', borderBottom: `2px double ${EL.ruleStrong}`,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'end' }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: EL.inkSoft }}>
          Week {w.week} report
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: EL.goldDeep, marginBottom: 4 }}>
            Mantis FX · VIP
          </div>
          <div className="el-title" style={{ fontFamily: display, fontSize: 40, fontWeight: 500, fontStyle: 'italic', letterSpacing: -0.5, lineHeight: 1 }}>
            Weekly trading report
          </div>
        </div>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: EL.inkSoft, textAlign: 'right' }}>
          {w.dateStart} · {w.dateEnd}
        </div>
      </div>

      {/* Week selector strip */}
      <div className="el-weekstrip" style={{ padding: '12px 48px', borderBottom: `1px solid ${EL.rule}`,
        display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(212,175,55,0.03)' }}>
        <span style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: EL.inkSoft }}>
          Select week
        </span>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setWeekOpen((o) => !o)}
            style={{ background: EL.paper, border: `1px solid ${EL.ruleStrong}`,
              padding: '6px 14px', fontFamily: display, fontSize: 15, fontStyle: 'italic',
              color: EL.ink, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span>Week {w.week}, {w.dateStart}–{w.dateEnd.split(' ')[1]}</span>
            <span style={{ color: EL.goldDeep }}>▾</span>
          </button>
          {weekOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 20,
              background: EL.paper, border: `1px solid ${EL.ruleStrong}`, minWidth: 260,
              maxHeight: 300, overflow: 'auto', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
              {weeks.slice().reverse().map((ww) => {
                const i = weeks.indexOf(ww);
                return (
                  <button key={ww.week} onClick={() => { setIdx(i); setWeekOpen(false); }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none',
                      background: i === idx ? 'rgba(212,175,55,0.15)' : 'transparent',
                      padding: '8px 14px', fontFamily: body, fontSize: 12, cursor: 'pointer',
                      borderBottom: `1px dotted ${EL.rule}`, color: EL.ink }}>
                    <span style={{ fontFamily: display, fontStyle: 'italic', fontSize: 14,
                      color: i === idx ? EL.goldDeep : EL.ink }}>Week {String(ww.week).padStart(2,'0')}</span>
                    <span style={{ color: EL.inkSoft, marginLeft: 10 }}>{ww.dateStart}</span>
                    <span style={{ float: 'right', fontFamily: display, fontStyle: 'italic',
                      color: EL.goldDeep, fontVariantNumeric: 'oldstyle-nums' }}>+{ww.pips}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }} />
        <EditorialNav idx={idx} total={weeks.length}
          onPrev={() => setIdx((i) => Math.max(0, i - 1))}
          onNext={() => setIdx((i) => Math.min(weeks.length - 1, i + 1))} />
      </div>

      {/* Body — 2 column */}
      <div className="el-body" style={{ padding: '24px 48px 28px', display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 44, overflow: 'auto' }}>

        {/* LEFT — lead */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minHeight: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, borderBottom: `1px solid ${EL.rule}`, paddingBottom: 12 }}>
            <div className="el-weeknum" style={{ fontFamily: display, fontSize: 78, fontWeight: 400, fontStyle: 'italic', lineHeight: 0.85 }}>
              Week {String(w.week).padStart(2, '0')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: EL.goldDeep, marginBottom: 4 }}>
                Week in review
              </div>
              <div style={{ fontFamily: display, fontSize: 22, lineHeight: 1.15, fontWeight: 500 }}>
                <em style={{ color: EL.goldDeep }}>{w.wins} winners</em> against {w.losses} loss{w.losses !== 1 && 'es'} across five sessions.
              </div>
            </div>
          </div>

          {/* Hero pips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: EL.inkSoft, marginBottom: 4 }}>
                Pips captured
              </div>
              <div className="el-hero-pips" style={{ fontFamily: display, fontSize: 112, fontWeight: 400, fontStyle: 'italic', lineHeight: 0.82,
                letterSpacing: -3, fontVariantNumeric: 'oldstyle-nums' }}>
                +{w.pips}
              </div>
            </div>
            <div style={{ borderLeft: `1px solid ${EL.rule}`, paddingLeft: 22, paddingBottom: 6 }}>
              <EditorialStatRow label="Trades shared" value={w.trades} />
              <EditorialStatRow label="Wins" value={w.wins} accent />
              <EditorialStatRow label="Losses" value={w.losses} />
              <EditorialStatRow label="Break-even" value={w.be} />
              <EditorialStatRow label="Win ratio" value={`${wr}%`} big />
            </div>
          </div>

          {/* DAILY BREAKDOWN */}
          <div style={{ borderTop: `1px solid ${EL.ruleStrong}`, paddingTop: 14, flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: display, fontSize: 20, fontStyle: 'italic', fontWeight: 500 }}>
                  Daily breakdown
                </div>
                <div style={{ fontSize: 11, color: EL.inkSoft, fontStyle: 'italic' }}>
                  Monday through Friday
                </div>
              </div>
            </div>

            {/* Daily bars — horizontal, thin */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12,
              borderBottom: `1px solid ${EL.ruleStrong}`, paddingBottom: 10 }}>
              {w.days.map((d, i) => {
                const pct = (d.pips / maxDayPips) * 100;
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 60px', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontFamily: display, fontStyle: 'italic', fontSize: 15, fontWeight: 600 }}>{d.day}</span>
                    <div style={{ height: 8, background: 'rgba(212,175,55,0.06)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${pct}%`,
                        background: EL.gold, borderRight: `2px solid ${EL.goldDeep}` }} />
                    </div>
                    <span style={{ textAlign: 'right', fontFamily: display, fontStyle: 'italic',
                      fontSize: 15, fontWeight: 600, color: EL.goldDeep, fontVariantNumeric: 'oldstyle-nums' }}>+{d.pips}</span>
                  </div>
                );
              })}
            </div>

            {/* Daily table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontVariantNumeric: 'oldstyle-nums' }}>
              <thead>
                <tr style={{ color: EL.inkSoft, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' }}>
                  <th style={{ textAlign: 'left',  padding: '6px 6px 6px 0' }}>Day</th>
                  <th style={{ textAlign: 'left',  padding: '6px 6px' }}>Date</th>
                  <th style={{ textAlign: 'right', padding: '6px 6px' }}>Trades</th>
                  <th style={{ textAlign: 'right', padding: '6px 6px' }}>Wins</th>
                  <th style={{ textAlign: 'right', padding: '6px 6px' }}>Losses</th>
                  <th style={{ textAlign: 'right', padding: '6px 6px' }}>B/E</th>
                  <th style={{ textAlign: 'right', padding: '6px 6px' }}>Win rate</th>
                  <th style={{ textAlign: 'right', padding: '6px 0 6px 6px' }}>Pips</th>
                </tr>
              </thead>
              <tbody>
                {w.days.map((d, i) => {
                  const dwr = (d.wins + d.losses) > 0 ? Math.round((d.wins / (d.wins + d.losses)) * 100) : 0;
                  return (
                    <tr key={i} style={{ borderTop: `1px dotted ${EL.rule}` }}>
                      <td style={{ padding: '6px 6px 6px 0', fontFamily: display, fontStyle: 'italic',
                        fontSize: 15, fontWeight: 600 }}>{d.day}</td>
                      <td style={{ padding: '6px 6px', color: EL.inkSoft }}>{d.date}</td>
                      <td style={{ padding: '6px 6px', textAlign: 'right' }}>{d.trades}</td>
                      <td style={{ padding: '6px 6px', textAlign: 'right', color: EL.green }}>{d.wins}</td>
                      <td style={{ padding: '6px 6px', textAlign: 'right', color: EL.red }}>{d.losses}</td>
                      <td style={{ padding: '6px 6px', textAlign: 'right', color: EL.inkSoft }}>{d.be}</td>
                      <td style={{ padding: '6px 6px', textAlign: 'right' }}>{dwr}%</td>
                      <td style={{ padding: '6px 0 6px 6px', textAlign: 'right',
                        fontFamily: display, fontStyle: 'italic', fontSize: 16, fontWeight: 600,
                        color: EL.goldDeep }}>+{d.pips}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minHeight: 0,
          borderLeft: `1px solid ${EL.rule}`, paddingLeft: 28, overflow: 'hidden' }}>

          <div>
            <div style={{ fontFamily: display, fontSize: 16, fontStyle: 'italic', lineHeight: 1.4 }}>
              “Steady disciplines compound.” <span style={{ color: EL.goldDeep }}>Week {w.week}</span> closed{' '}
              {w.days[4].pips > w.days[0].pips ? 'with momentum into Friday' : 'with a softer Friday'}.
            </div>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
              color: EL.inkSoft, marginTop: 8 }}>— Weekly note</div>
          </div>

          {/* Calculator */}
          <div style={{ background: EL.paperDeep, padding: '20px 22px', border: `1px solid ${EL.rule}` }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
              color: EL.goldDeep, marginBottom: 4 }}>Growth calculator</div>
            <div style={{ fontFamily: display, fontSize: 20, fontStyle: 'italic', fontWeight: 500, marginBottom: 14, lineHeight: 1.15 }}>
              If you risked 10% per trade…
            </div>

            <label style={{ display: 'block', fontSize: 10,
              letterSpacing: 2, textTransform: 'uppercase', color: EL.inkSoft, marginBottom: 4 }}>
              Starting balance
            </label>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1.5px solid ${EL.ink}`, paddingBottom: 4, marginBottom: 4 }}>
              <span style={{ fontFamily: display, fontSize: 24, fontStyle: 'italic', marginRight: 6 }}>$</span>
              <input type="number" min={100} step={100} value={balance}
                onChange={(e) => setBalance(Math.max(0, Number(e.target.value) || 0))}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: display, fontSize: 24, fontStyle: 'italic', color: EL.ink,
                  fontVariantNumeric: 'oldstyle-nums' }} />
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, marginTop: 8 }}>
              {[1000, 5000, 10000, 25000].map((q) => (
                <button key={q} onClick={() => setBalance(q)}
                  style={{ flex: 1, background: balance === q ? EL.ink : 'transparent',
                    color: balance === q ? EL.paper : EL.inkSoft,
                    border: `1px solid ${balance === q ? EL.ink : EL.rule}`,
                    padding: '5px 0', fontSize: 10, letterSpacing: 2,
                    textTransform: 'uppercase', cursor: 'pointer' }}>${q/1000}K</button>
              ))}
            </div>

            <EditorialCalcRow label={`End of week ${w.week}`} value={`$${Math.round(simThisWeek.final).toLocaleString()}`} />
            <EditorialCalcRow label="After all 14 weeks" value={`$${Math.round(sim.final).toLocaleString()}`} big />
            <EditorialCalcRow label="Profit" value={`+$${Math.round(sim.final - balance).toLocaleString()}`} accent />
            <EditorialCalcRow label="Return" value={`+${(((sim.final - balance) / balance) * 100).toFixed(1)}%`} accent />
          </div>

          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: EL.inkSoft,
            borderTop: `1px solid ${EL.rule}`, paddingTop: 10 }}>
            YTD · {totalTrades} trades · {overallWR}% win rate ·{' '}
            <span style={{ color: EL.goldDeep, fontWeight: 700 }}>+{totalPips.toLocaleString()} pips</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorialNav({ idx, total, onPrev, onNext }) {
  const btn = (disabled) => ({
    background: 'transparent', border: `1px solid ${EL.ruleStrong}`,
    color: disabled ? 'rgba(255,255,255,0.2)' : EL.ink,
    width: 34, height: 34, borderRadius: 17, cursor: disabled ? 'default' : 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'serif', fontSize: 16, padding: 0,
  });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
      <button onClick={onPrev} disabled={idx === 0} style={btn(idx === 0)}>‹</button>
      <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: EL.inkSoft,
        fontVariantNumeric: 'tabular-nums' }}>{String(idx+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
      <button onClick={onNext} disabled={idx === total - 1} style={btn(idx === total - 1)}>›</button>
    </div>
  );
}

function EditorialStatRow({ label, value, accent, big }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '4px 0', borderBottom: `1px dotted ${EL.rule}` }}>
      <span style={{ fontSize: 11, letterSpacing: 2,
        textTransform: 'uppercase', color: EL.inkSoft }}>{label}</span>
      <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: big ? 20 : 17,
        fontStyle: 'italic', fontWeight: 500, color: accent ? EL.goldDeep : EL.ink,
        fontVariantNumeric: 'oldstyle-nums' }}>{value}</span>
    </div>
  );
}

function EditorialCalcRow({ label, value, accent, big }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '5px 0', borderBottom: `1px dotted ${EL.rule}` }}>
      <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: EL.inkSoft }}>{label}</span>
      <span style={{ fontFamily: '"Instrument Serif", serif',
        fontSize: big ? 24 : 17, fontStyle: 'italic', fontWeight: big ? 600 : 500,
        color: accent ? EL.goldDeep : EL.ink, fontVariantNumeric: 'oldstyle-nums' }}>{value}</span>
    </div>
  );
}

window.EditorialLedger = EditorialLedger;
