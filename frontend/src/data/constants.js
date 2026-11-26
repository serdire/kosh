// Shared constants — asset class metadata, display orders, urgency thresholds

export const CLASS_META = {
  mf:        { label: 'Mutual Funds',       color: 'var(--accent)' },
  stocks:    { label: 'Stocks',             color: '#2563EB' },
  metals:    { label: 'Gold & Silver',      color: '#B4781E' },
  fixed:     { label: 'FD / RD',            color: '#64748B' },
  insurance: { label: 'Insurance & Plans',  color: '#0D9488' },
  nps:       { label: 'NPS',               color: '#5B6FA6' },
}

export const ED_ORDER = ['mf', 'stocks', 'fixed', 'nps', 'insurance', 'metals']
export const ED_COL = {
  mf: 'var(--accent)', stocks: '#2563EB', fixed: '#64748B', nps: '#5B6FA6', insurance: '#0D9488', metals: '#B4781E'
}
export const ED_LABEL = {
  mf: 'Mutual funds', stocks: 'Stocks', fixed: 'FD / RD', nps: 'NPS', insurance: 'Insurance', metals: 'Gold & silver'
}

// NPS asset class labels and colors (used in Investments.jsx NPSTable)
export const AC_LABEL = { E: 'Equity', C: 'Corp Bond', G: 'Govt Sec', A: 'Alternative' }
export const AC_COLOR = { E: 'var(--accent)', C: '#5B6FA6', G: '#64748B', A: '#B4781E' }

// Outflow type display (used in Dashboard.jsx upcoming outflows widget)
export const OUTFLOW_COLOR = { sip: 'var(--accent)', insurance: '#0D9488', loan: '#B9382C' }
export const OUTFLOW_LABEL = { sip: 'SIP debit', insurance: 'Insurance premium', loan: 'Loan EMI' }

// Urgency thresholds — days before due date that we highlight in warning colour
export const INSURANCE_URGENCY_DAYS = 14
export const FIXED_URGENCY_DAYS = 90
