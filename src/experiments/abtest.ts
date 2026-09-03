const VISITOR_KEY = 'ftk_ab_visitor';
const ASSIGN_KEY = 'ftk_ab_assign';
const EVENTS_KEY = 'ftk_ab_events';
const MAX_EVENTS = 200;

export type VariantId = string;

export interface ExperimentVariant {
  id: VariantId;
  weight: number;
}

export interface ExperimentDef {
  id: string;
  description: string;
  enabled: boolean;
  variants: ExperimentVariant[];
}

export interface Assignment {
  experimentId: string;
  variant: VariantId;
  assignedAt: string;
  source: 'sticky' | 'fresh' | 'override' | 'disabled';
}

export interface AbEvent {
  experimentId: string;
  variant: VariantId;
  name: string;
  at: string;
}

function safeStorage(): Storage | null {
  try {
    if (typeof window === 'undefined') return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

function readJson<T>(key: string, fallback: T): T {
  const store = safeStorage();
  if (!store) return fallback;
  try {
    const raw = store.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  const store = safeStorage();
  if (!store) return;
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

export function getVisitorId(): string {
  const store = safeStorage();
  if (!store) return 'anonymous';
  const existing = store.getItem(VISITOR_KEY);
  if (existing) return existing;
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  store.setItem(VISITOR_KEY, id);
  return id;
}

function hashToUnit(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

function pickVariant(experiment: ExperimentDef, visitorId: string): VariantId {
  const variants = experiment.variants.filter((v) => v.weight > 0);
  if (variants.length === 0) return experiment.variants[0]?.id ?? 'a';
  const total = variants.reduce((sum, v) => sum + v.weight, 0);
  let cursor = hashToUnit(`${visitorId}:${experiment.id}`) * total;
  for (const variant of variants) {
    cursor -= variant.weight;
    if (cursor <= 0) return variant.id;
  }
  return variants[variants.length - 1].id;
}

function parseOverride(experimentId: string): VariantId | null {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('ab');
  if (!raw) return null;
  const parts = raw.split(',');
  for (const part of parts) {
    const [id, variant] = part.split(':').map((s) => s.trim());
    if (id === experimentId && variant) return variant;
  }
  return null;
}

export function getAssignments(): Record<string, Assignment> {
  return readJson<Record<string, Assignment>>(ASSIGN_KEY, {});
}

export function assignExperiment(experiment: ExperimentDef): Assignment {
  const override = parseOverride(experiment.id);
  if (override && experiment.variants.some((v) => v.id === override)) {
    const assignment: Assignment = {
      experimentId: experiment.id,
      variant: override,
      assignedAt: new Date().toISOString(),
      source: 'override',
    };
    const all = getAssignments();
    all[experiment.id] = assignment;
    writeJson(ASSIGN_KEY, all);
    return assignment;
  }

  if (!experiment.enabled) {
    return {
      experimentId: experiment.id,
      variant: experiment.variants[0]?.id ?? 'a',
      assignedAt: new Date().toISOString(),
      source: 'disabled',
    };
  }

  const existing = getAssignments()[experiment.id];
  if (existing && experiment.variants.some((v) => v.id === existing.variant)) {
    return { ...existing, source: 'sticky' };
  }

  const assignment: Assignment = {
    experimentId: experiment.id,
    variant: pickVariant(experiment, getVisitorId()),
    assignedAt: new Date().toISOString(),
    source: 'fresh',
  };
  const all = getAssignments();
  all[experiment.id] = assignment;
  writeJson(ASSIGN_KEY, all);
  return assignment;
}

export function trackAbEvent(experimentId: string, variant: VariantId, name: string): void {
  const events = readJson<AbEvent[]>(EVENTS_KEY, []);
  events.push({
    experimentId,
    variant,
    name,
    at: new Date().toISOString(),
  });
  writeJson(EVENTS_KEY, events.slice(-MAX_EVENTS));
}

export function getAbEvents(): AbEvent[] {
  return readJson<AbEvent[]>(EVENTS_KEY, []);
}

export function clearAbState(): void {
  const store = safeStorage();
  if (!store) return;
  store.removeItem(ASSIGN_KEY);
  store.removeItem(EVENTS_KEY);
}

export function summarizeEvents(): Record<string, Record<string, Record<string, number>>> {
  const out: Record<string, Record<string, Record<string, number>>> = {};
  for (const event of getAbEvents()) {
    out[event.experimentId] ??= {};
    out[event.experimentId][event.variant] ??= {};
    out[event.experimentId][event.variant][event.name] =
      (out[event.experimentId][event.variant][event.name] ?? 0) + 1;
  }
  return out;
}
