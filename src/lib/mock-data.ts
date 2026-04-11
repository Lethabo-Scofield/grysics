export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  status: 'matched' | 'discrepancy' | 'pending';
  source: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  score: number;
  status: 'qualified' | 'nurture' | 'disqualified';
  source: string;
  revenue: string;
}

export interface ReportRow {
  metric: string;
  thisWeek: string;
  lastWeek: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

export const mockTransactions: Transaction[] = [
  { id: 'TXN-001', date: '2026-04-01', description: 'AWS Cloud Services', amount: 12450.00, category: 'Infrastructure', status: 'matched', source: 'Stripe' },
  { id: 'TXN-002', date: '2026-04-01', description: 'Salesforce License', amount: 8900.00, category: 'Software', status: 'matched', source: 'QuickBooks' },
  { id: 'TXN-003', date: '2026-04-02', description: 'Marketing Campaign - Google Ads', amount: 5200.00, category: 'Marketing', status: 'discrepancy', source: 'Bank Statement' },
  { id: 'TXN-004', date: '2026-04-03', description: 'Office Supplies', amount: 340.50, category: 'Operations', status: 'matched', source: 'Expensify' },
  { id: 'TXN-005', date: '2026-04-03', description: 'Contractor Payment - Design', amount: 3500.00, category: 'Services', status: 'matched', source: 'Stripe' },
  { id: 'TXN-006', date: '2026-04-04', description: 'Travel - Client Meeting NYC', amount: 1875.20, category: 'Travel', status: 'discrepancy', source: 'Corporate Card' },
  { id: 'TXN-007', date: '2026-04-05', description: 'Slack Enterprise', amount: 2100.00, category: 'Software', status: 'matched', source: 'QuickBooks' },
  { id: 'TXN-008', date: '2026-04-06', description: 'Client Revenue - Acme Corp', amount: 45000.00, category: 'Revenue', status: 'matched', source: 'Stripe' },
  { id: 'TXN-009', date: '2026-04-07', description: 'Insurance Premium', amount: 1200.00, category: 'Insurance', status: 'pending', source: 'Bank Statement' },
  { id: 'TXN-010', date: '2026-04-08', description: 'Payroll - April Week 1', amount: 67500.00, category: 'Payroll', status: 'matched', source: 'Gusto' },
];

export const mockLeads: Lead[] = [
  { id: 'LD-001', name: 'Sarah Chen', company: 'TechVentures Inc', email: 's.chen@techventures.io', score: 92, status: 'qualified', source: 'Inbound', revenue: '$120K' },
  { id: 'LD-002', name: 'Marcus Rivera', company: 'DataFlow Systems', email: 'm.rivera@dataflow.com', score: 87, status: 'qualified', source: 'LinkedIn', revenue: '$85K' },
  { id: 'LD-003', name: 'Emily Watson', company: 'Retail Analytics Co', email: 'e.watson@retailanalytics.com', score: 45, status: 'nurture', source: 'Webinar', revenue: '$40K' },
  { id: 'LD-004', name: 'James Park', company: 'CloudFirst Solutions', email: 'j.park@cloudfirst.dev', score: 78, status: 'qualified', source: 'Referral', revenue: '$200K' },
  { id: 'LD-005', name: 'Anna Kowalski', company: 'BioMed Research', email: 'a.kowalski@biomed.org', score: 23, status: 'disqualified', source: 'Cold Email', revenue: '$15K' },
  { id: 'LD-006', name: 'David Okonkwo', company: 'FinServ Global', email: 'd.okonkwo@finservglobal.com', score: 95, status: 'qualified', source: 'Inbound', revenue: '$350K' },
  { id: 'LD-007', name: 'Lisa Tanaka', company: 'E-Commerce Plus', email: 'l.tanaka@ecomplus.com', score: 61, status: 'nurture', source: 'Trade Show', revenue: '$55K' },
  { id: 'LD-008', name: 'Robert Kim', company: 'AI Dynamics', email: 'r.kim@aidynamics.ai', score: 88, status: 'qualified', source: 'LinkedIn', revenue: '$150K' },
];

export const mockReportData: ReportRow[] = [
  { metric: 'Total Revenue', thisWeek: '$487,250', lastWeek: '$423,800', change: '+15.0%', trend: 'up' },
  { metric: 'New Customers', thisWeek: '34', lastWeek: '28', change: '+21.4%', trend: 'up' },
  { metric: 'Churn Rate', thisWeek: '1.2%', lastWeek: '1.8%', change: '-33.3%', trend: 'up' },
  { metric: 'Avg Deal Size', thisWeek: '$14,330', lastWeek: '$15,135', change: '-5.3%', trend: 'down' },
  { metric: 'Pipeline Value', thisWeek: '$2.1M', lastWeek: '$1.8M', change: '+16.7%', trend: 'up' },
  { metric: 'Support Tickets', thisWeek: '127', lastWeek: '145', change: '-12.4%', trend: 'up' },
  { metric: 'NPS Score', thisWeek: '72', lastWeek: '68', change: '+5.9%', trend: 'up' },
  { metric: 'Active Users', thisWeek: '8,432', lastWeek: '7,891', change: '+6.9%', trend: 'up' },
];

export const exampleGoals = [
  'Reconcile Q1 transactions',
  'Process and qualify sales leads',
  'Generate weekly revenue report',
];
