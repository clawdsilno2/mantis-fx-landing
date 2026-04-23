// Mantis FX VIP — 14 weeks of mock results, with daily (Mon-Fri) breakdown.
// Win ratio = wins / (wins + losses); BE excluded from denominator.

// Build a week: distribute trades across Mon-Fri, with win/loss/BE per day.
// Each day: { day: 'Mon', date: 'Jan 13', trades, wins, losses, be, pips }
function makeDays(startMonthDay, year, dayData) {
  // startMonthDay like 'Jan 13' — we'll just increment the day number
  const [mon, dayStr] = startMonthDay.split(' ');
  const startDay = parseInt(dayStr, 10);
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return dayData.map((d, i) => ({
    day: names[i],
    date: `${mon} ${String(startDay + i).padStart(2, '0')}`,
    ...d,
  }));
}

// Build weeks from per-day arrays. Totals derive from days.
function week(weekNo, dateStart, dateEnd, days) {
  const totals = days.reduce((a, d) => ({
    trades: a.trades + d.trades, wins: a.wins + d.wins,
    losses: a.losses + d.losses, be: a.be + d.be, pips: a.pips + d.pips,
  }), { trades: 0, wins: 0, losses: 0, be: 0, pips: 0 });
  return { week: weekNo, dateStart, dateEnd, ...totals, days };
}

// Daily mock data per week — Mon-Fri, plausible mix.
const WEEKS = [
  week(1,  'Jan 13', 'Jan 17', makeDays('Jan 13', 2026, [
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 78 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 54 },
    { trades: 2, wins: 1, losses: 0, be: 1, pips: 41 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 72 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 42 },
  ])),
  week(2,  'Jan 20', 'Jan 24', makeDays('Jan 20', 2026, [
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 68 },
    { trades: 3, wins: 3, losses: 0, be: 0, pips: 94 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 21 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 76 },
    { trades: 3, wins: 2, losses: 0, be: 1, pips: 83 },
  ])),
  week(3,  'Jan 27', 'Jan 31', makeDays('Jan 27', 2026, [
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 62 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 18 },
    { trades: 1, wins: 1, losses: 0, be: 0, pips: 38 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 55 },
    { trades: 2, wins: 1, losses: 0, be: 1, pips: 45 },
  ])),
  week(4,  'Feb 03', 'Feb 07', makeDays('Feb 03', 2026, [
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 72 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 68 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 24 },
    { trades: 3, wins: 2, losses: 0, be: 1, pips: 114 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 116 },
  ])),
  week(5,  'Feb 10', 'Feb 14', makeDays('Feb 10', 2026, [
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 12 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 18 },
    { trades: 2, wins: 1, losses: 0, be: 1, pips: 44 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 48 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 34 },
  ])),
  week(6,  'Feb 17', 'Feb 21', makeDays('Feb 17', 2026, [
    { trades: 3, wins: 3, losses: 0, be: 0, pips: 118 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 74 },
    { trades: 3, wins: 3, losses: 0, be: 0, pips: 126 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 84 },
    { trades: 3, wins: 2, losses: 0, be: 1, pips: 110 },
  ])),
  week(7,  'Feb 24', 'Feb 28', makeDays('Feb 24', 2026, [
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 84 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 68 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 38 },
    { trades: 3, wins: 2, losses: 0, be: 1, pips: 96 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 82 },
  ])),
  week(8,  'Mar 03', 'Mar 07', makeDays('Mar 03', 2026, [
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 8 },
    { trades: 1, wins: 1, losses: 0, be: 0, pips: 32 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 18 },
    { trades: 2, wins: 1, losses: 0, be: 1, pips: 42 },
    { trades: 1, wins: 1, losses: 0, be: 0, pips: 42 },
  ])),
  week(9,  'Mar 10', 'Mar 14', makeDays('Mar 10', 2026, [
    { trades: 3, wins: 3, losses: 0, be: 0, pips: 124 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 76 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 98 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 82 },
    { trades: 3, wins: 2, losses: 0, be: 1, pips: 98 },
  ])),
  week(10, 'Mar 17', 'Mar 21', makeDays('Mar 17', 2026, [
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 72 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 24 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 62 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 88 },
    { trades: 2, wins: 1, losses: 0, be: 1, pips: 59 },
  ])),
  week(11, 'Mar 24', 'Mar 28', makeDays('Mar 24', 2026, [
    { trades: 3, wins: 3, losses: 0, be: 0, pips: 112 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 74 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 88 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 68 },
    { trades: 2, wins: 1, losses: 0, be: 1, pips: 79 },
  ])),
  week(12, 'Mar 31', 'Apr 04', makeDays('Mar 31', 2026, [
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 72 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 24 },
    { trades: 2, wins: 1, losses: 1, be: 0, pips: 32 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 68 },
    { trades: 2, wins: 1, losses: 0, be: 1, pips: 68 },
  ])),
  week(13, 'Apr 07', 'Apr 11', makeDays('Apr 07', 2026, [
    { trades: 3, wins: 3, losses: 0, be: 0, pips: 128 },
    { trades: 4, wins: 3, losses: 1, be: 0, pips: 112 },
    { trades: 3, wins: 3, losses: 0, be: 0, pips: 124 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 96 },
    { trades: 3, wins: 2, losses: 0, be: 1, pips: 129 },
  ])),
  week(14, 'Apr 14', 'Apr 18', makeDays('Apr 14', 2026, [
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 88 },
    { trades: 3, wins: 3, losses: 0, be: 0, pips: 112 },
    { trades: 2, wins: 2, losses: 0, be: 0, pips: 94 },
    { trades: 3, wins: 2, losses: 1, be: 0, pips: 72 },
    { trades: 2, wins: 1, losses: 0, be: 1, pips: 81 },
  ])),
];

const winRatio = (w) => {
  const denom = w.wins + w.losses;
  return denom === 0 ? 0 : Math.round((w.wins / denom) * 100);
};
const cumulative = (weeks) => {
  let sum = 0;
  return weeks.map((w) => { sum += w.pips; return sum; });
};
const totalPips = WEEKS.reduce((a, w) => a + w.pips, 0);
const totalTrades = WEEKS.reduce((a, w) => a + w.trades, 0);
const totalWins = WEEKS.reduce((a, w) => a + w.wins, 0);
const totalLosses = WEEKS.reduce((a, w) => a + w.losses, 0);
const overallWR = Math.round((totalWins / (totalWins + totalLosses)) * 100);

function simulate(balance, weeks) {
  let bal = balance;
  const series = [{ label: 'Start', value: bal }];
  for (const w of weeks) {
    for (let i = 0; i < w.wins; i++) bal *= 1.10;
    for (let i = 0; i < w.losses; i++) bal *= 0.90;
    series.push({ label: `W${w.week}`, value: bal });
  }
  return { final: bal, series };
}

window.MANTIS = { WEEKS, winRatio, cumulative, totalPips, totalTrades, totalWins, totalLosses, overallWR, simulate };
