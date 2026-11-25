// Formatting helpers — Indian numbering, ₹ INR, percentages, dates

export const fmtINR = n => (n < 0 ? '−₹' : '₹') + Math.round(Math.abs(n)).toLocaleString('en-IN')

// ₹19.6L, ₹1.06Cr, ₹62K
export function fmtCompact(n) {
  const neg = n < 0
  const v = Math.abs(n)
  let out
  if (v >= 1e7) out = (v / 1e7).toFixed(2).replace(/\.?0+$/, '') + 'Cr'
  else if (v >= 1e5) out = (v / 1e5).toFixed(2).replace(/\.?0+$/, '') + 'L'
  else if (v >= 1e3) out = (v / 1e3).toFixed(1).replace(/\.?0+$/, '') + 'K'
  else out = Math.round(v).toString()
  return (neg ? '−₹' : '₹') + out
}

export function fmtPct(n, dp = 1) {
  return (n >= 0 ? '+' : '') + n.toFixed(dp) + '%'
}

// Whole-number share of part in whole, 0 when whole is 0 — a brand-new
// household with nothing entered yet would otherwise show "NaN%".
export const sharePct = (part, whole) => whole > 0 ? Math.round((part / whole) * 100) : 0

export function fmtDate(d) {
  if (!d) return ''
  const dt = typeof d === 'string' ? new Date(d) : d
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return dt.getDate() + ' ' + m[dt.getMonth()] + ' ' + dt.getFullYear()
}
