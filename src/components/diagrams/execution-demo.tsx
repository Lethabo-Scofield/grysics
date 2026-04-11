'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const workflows = [
  {
    id: 'reconciliation',
    goal: 'Reconcile Q1 transactions across Stripe and QuickBooks',
    steps: [
      { label: 'Connecting to Stripe API', status: 'done' },
      { label: 'Fetching 847 transactions', status: 'done' },
      { label: 'Connecting to QuickBooks', status: 'done' },
      { label: 'Cross-referencing records', status: 'done' },
      { label: 'Identifying 3 discrepancies', status: 'done' },
      { label: 'Generating reconciliation report', status: 'done' },
    ],
    result: {
      summary: 'Q1 Reconciliation Complete',
      metrics: [
        { label: 'Transactions processed', value: '847' },
        { label: 'Matched records', value: '844' },
        { label: 'Discrepancies found', value: '3' },
        { label: 'Variance identified', value: '$12,450' },
        { label: 'Time to complete', value: '2m 14s' },
      ],
    },
  },
  {
    id: 'leads',
    goal: 'Process and qualify this week\'s inbound sales leads',
    steps: [
      { label: 'Pulling leads from CRM', status: 'done' },
      { label: 'Enriching company data via Clearbit', status: 'done' },
      { label: 'Scoring 42 leads', status: 'done' },
      { label: 'Qualifying against ICP criteria', status: 'done' },
      { label: 'Routing to sales reps', status: 'done' },
      { label: 'Updating CRM records', status: 'done' },
    ],
    result: {
      summary: 'Lead Processing Complete',
      metrics: [
        { label: 'Leads processed', value: '42' },
        { label: 'Qualified', value: '18' },
        { label: 'Nurture', value: '15' },
        { label: 'Disqualified', value: '9' },
        { label: 'Est. pipeline value', value: '$1.2M' },
      ],
    },
  },
  {
    id: 'reporting',
    goal: 'Generate the weekly revenue and performance report',
    steps: [
      { label: 'Connecting to data warehouse', status: 'done' },
      { label: 'Querying revenue metrics', status: 'done' },
      { label: 'Pulling customer analytics', status: 'done' },
      { label: 'Calculating week-over-week trends', status: 'done' },
      { label: 'Generating executive summary', status: 'done' },
      { label: 'Formatting report output', status: 'done' },
    ],
    result: {
      summary: 'Weekly Report Generated',
      metrics: [
        { label: 'Revenue this week', value: '$487,250' },
        { label: 'Growth vs last week', value: '+15.0%' },
        { label: 'New customers', value: '34' },
        { label: 'Churn rate', value: '1.2%' },
        { label: 'NPS score', value: '72' },
      ],
    },
  },
];

const tabs = [
  { id: 'reconciliation', label: 'Financial Reconciliation' },
  { id: 'leads', label: 'Lead Processing' },
  { id: 'reporting', label: 'Revenue Report' },
];

export default function ExecutionDemo() {
  const [activeTab, setActiveTab] = useState('reconciliation');
  const workflow = workflows.find((w) => w.id === activeTab)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-neutral-950 rounded-xl sm:rounded-2xl border border-neutral-800/50 overflow-hidden"
      >
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-800/50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-neutral-600 ml-2">grysics execution engine</span>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <p className="text-[10px] sm:text-xs font-mono text-neutral-600 mb-1.5">GOAL</p>
            <p className="text-sm sm:text-base text-white/80 font-light">&quot;{workflow.goal}&quot;</p>
          </div>

          <div className="mb-4 sm:mb-6">
            <p className="text-[10px] sm:text-xs font-mono text-neutral-600 mb-3">EXECUTION STEPS</p>
            <div className="space-y-2">
              {workflow.steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/50 font-mono">{step.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-800/50 pt-4 sm:pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-xs sm:text-sm font-medium text-green-400 font-mono">{workflow.result.summary}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              {workflow.result.metrics.map((metric) => (
                <div key={metric.label} className="bg-white/[0.03] rounded-lg p-3">
                  <p className="text-base sm:text-lg font-serif italic text-white mb-0.5">{metric.value}</p>
                  <p className="text-[9px] sm:text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
