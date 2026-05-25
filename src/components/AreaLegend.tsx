"use client";

import {
  CLEANING_AREAS,
  type CleaningAreaKey,
  type CleaningState,
} from "@/lib/checklist";
import styles from "./AreaLegend.module.css";

type Props = {
  areas: CleaningState;
  completed: number;
  total: number;
  canSubmit: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  onToggle: (key: CleaningAreaKey) => void;
  onSubmit: () => void;
};

const CHIP_LABELS: Record<CleaningAreaKey, string> = {
  mesa: "Mesa",
  monitor: "Monitor",
  inputs: "Periféricos",
  gabinete: "Gabinete",
  floor_area: "Chão",
  gavetas: "Gavetas",
};

export default function AreaLegend({
  areas,
  completed,
  total,
  canSubmit,
  isSubmitting,
  errorMessage,
  onToggle,
  onSubmit,
}: Props) {
  const remaining = total - completed;
  const isComplete = completed === total;

  const buttonLabel = isSubmitting
    ? "enviando…"
    : isComplete
      ? "enviar checklist"
      : `${remaining} ${remaining === 1 ? "restante" : "restantes"}`;

  return (
    <footer className={styles.legend} data-anim="footer">
      <div className={styles.chips}>
        {CLEANING_AREAS.map((area) => {
          const selected = areas[area.key];
          return (
            <button
              key={area.key}
              type="button"
              onClick={() => onToggle(area.key)}
              className={`${styles.chip} ${selected ? styles.chipDone : ""}`}
              aria-pressed={selected}
            >
              <span className={styles.chipCode}>{area.code}</span>
              <span className={styles.chipLabel}>{CHIP_LABELS[area.key]}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.actions}>
        {errorMessage && (
          <span className={styles.error} role="alert">
            {errorMessage}
          </span>
        )}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`${styles.submit} ${isComplete ? styles.submitReady : ""}`}
        >
          <span className={styles.submitLabel}>{buttonLabel}</span>
          <span className={styles.arrow} aria-hidden="true">→</span>
        </button>
      </div>
    </footer>
  );
}
