import { useCallback, useMemo } from 'react';
import { EXPERIMENTS } from './config';
import { assignExperiment, trackAbEvent, type Assignment } from './abtest';

export function useExperiment(experimentId: string): Assignment & {
  track: (name: string) => void;
} {
  const assignment = useMemo(() => {
    const def = EXPERIMENTS[experimentId];
    if (!def) {
      return {
        experimentId,
        variant: 'a',
        assignedAt: new Date().toISOString(),
        source: 'disabled' as const,
      };
    }
    return assignExperiment(def);
  }, [experimentId]);

  const track = useCallback(
    (name: string) => {
      trackAbEvent(assignment.experimentId, assignment.variant, name);
    },
    [assignment.experimentId, assignment.variant]
  );

  return { ...assignment, track };
}
