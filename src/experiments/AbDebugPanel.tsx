import React, { useMemo, useState } from 'react';
import { EXPERIMENTS } from './config';
import { getAssignments, getVisitorId, summarizeEvents, clearAbState } from './abtest';

export const AbDebugPanel: React.FC = () => {
  const [open, setOpen] = useState(true);
  const visible = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).has('abdebug');
  }, []);

  if (!visible || !open) return null;

  const assignments = getAssignments();
  const summary = summarizeEvents();

  return (
    <div className="fixed bottom-4 right-4 z-[80] w-80 max-h-[70vh] overflow-auto rounded-2xl bg-white border border-slate-200 shadow-xl p-4 text-[11px] text-slate-700">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-[#0A2540]">A/B debug</strong>
        <button type="button" onClick={() => setOpen(false)} className="text-slate-400 font-bold">Close</button>
      </div>
      <p className="font-mono text-slate-500 break-all mb-2">visitor {getVisitorId()}</p>
      <ul className="space-y-2 mb-3">
        {Object.values(EXPERIMENTS).map((exp) => (
          <li key={exp.id} className="rounded-xl bg-[#F4F8FA] p-2">
            <div className="font-black text-[#0A2540]">{exp.id}</div>
            <div>{exp.enabled ? 'on' : 'off'} · {assignments[exp.id]?.variant ?? 'unassigned'} ({assignments[exp.id]?.source ?? '—'})</div>
          </li>
        ))}
      </ul>
      <pre className="bg-slate-50 border border-slate-200 rounded-xl p-2 overflow-auto text-[10px]">{JSON.stringify(summary, null, 2)}</pre>
      <button type="button" onClick={() => { clearAbState(); window.location.reload(); }} className="mt-2 text-[#007A82] font-bold">Reset assignment</button>
    </div>
  );
};
