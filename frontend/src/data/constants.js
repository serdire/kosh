// Shared constants — asset class metadata, display orders, urgency thresholds

export const CLASS_META = {
  mf:        { label: 'Mutual Funds',       color: 'var(--accent)' },
  stocks:    { label: 'Stocks',             color: '#00f0ff' },
  metals:    { label: 'Gold & Silver',      color: '#ffbe3b' },
  fixed:     { label: 'FD / RD',            color: '#a855f7' },
  insurance: { label: 'Insurance & Plans',  color: '#ff5e3a' },
  nps:       { label: 'NPS',               color: '#00f5a0' },
}

export const ED_ORDER = ['mf', 'stocks', 'fixed', 'nps', 'insurance', 'metals']
export const ED_COL = {
  mf: 'var(--accent)', stocks: '#00f0ff', fixed: '#a855f7', nps: '#00f5a0', insurance: '#ff5e3a', metals: '#ffbe3b'
}
export const ED_LABEL = {
  mf: 'Mutual funds', stocks: 'Stocks', fixed: 'FD / RD', nps: 'NPS', insurance: 'Insurance', metals: 'Gold & silver'
}

// NPS asset class labels and colors (used in Investments.jsx NPSTable)
export const AC_LABEL = { E: 'Equity', C: 'Corp Bond', G: 'Govt Sec', A: 'Alternative' }
export const AC_COLOR = { E: 'var(--accent)', C: '#a855f7', G: '#00f0ff', A: '#ffbe3b' }

// Outflow type display (used in Dashboard.jsx upcoming outflows widget)
export const OUTFLOW_COLOR = { sip: 'var(--accent)', insurance: '#ff5e3a', loan: '#ff3366' }
export const OUTFLOW_LABEL = { sip: 'SIP debit', insurance: 'Insurance premium', loan: 'Loan EMI' }

// Urgency thresholds — days before due date that we highlight in warning colour
export const INSURANCE_URGENCY_DAYS = 14
export const FIXED_URGENCY_DAYS = 90
