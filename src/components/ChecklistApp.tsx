"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { supabase } from "@/lib/supabase";
import {
  INITIAL_CLEANING_STATE,
  TOTAL_AREAS,
  countCompleted,
  type CleaningAreaKey,
  type CleaningState,
} from "@/lib/checklist";
import HeaderBar from "./HeaderBar";
import WorkstationPlan from "./WorkstationPlan";
import AreaLegend from "./AreaLegend";
import styles from "./ChecklistApp.module.css";

type Status = "idle" | "submitting" | "success" | "error";

function todayISO(): string {
  const d = new Date();
  const tzOffsetMs = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - tzOffsetMs).toISOString().slice(0, 10);
}

export default function ChecklistApp() {
  const [responsibleName, setResponsibleName] = useState("");
  const [cleaningDate, setCleaningDate] = useState("");
  const [areas, setAreas] = useState<CleaningState>(INITIAL_CLEANING_STATE);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const appRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set after mount: Date depende do TZ do client, set no render causa hydration mismatch.
    setCleaningDate((prev) => prev || todayISO());
  }, []);

  useGSAP(
    () => {
      if (status !== "idle") return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from('[data-anim="header"]', {
        y: -16,
        opacity: 0,
        duration: 0.55,
      })
        .from(
          '[data-anim="frame"]',
          { opacity: 0, duration: 0.5 },
          "-=0.3",
        )
        .from(
          '[data-anim="area"]',
          {
            opacity: 0,
            y: 10,
            duration: 0.45,
            stagger: 0.07,
          },
          "-=0.25",
        )
        .from(
          '[data-anim="footer"]',
          { y: 16, opacity: 0, duration: 0.5 },
          "-=0.4",
        );
    },
    { scope: appRef, dependencies: [status] },
  );

  const completed = countCompleted(areas);
  const trimmedName = responsibleName.trim();
  const canSubmit =
    trimmedName.length >= 2 &&
    cleaningDate.length === 10 &&
    completed === TOTAL_AREAS &&
    status !== "submitting";

  function toggleArea(key: CleaningAreaKey) {
    if (status === "submitting") return;
    setAreas((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setStatus("submitting");
    setErrorMessage(null);

    const { error } = await supabase.from("checklists").insert({
      responsible_name: trimmedName,
      cleaning_date: cleaningDate,
      ...areas,
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("success");
  }

  function handleReset() {
    setResponsibleName("");
    setCleaningDate(todayISO());
    setAreas(INITIAL_CLEANING_STATE);
    setStatus("idle");
    setErrorMessage(null);
  }

  if (status === "success") {
    return <SuccessView name={trimmedName} onReset={handleReset} />;
  }

  return (
    <main ref={appRef} className={styles.app}>
      <HeaderBar
        name={responsibleName}
        date={cleaningDate}
        completed={completed}
        total={TOTAL_AREAS}
        onChangeName={setResponsibleName}
        onChangeDate={setCleaningDate}
      />
      <WorkstationPlan areas={areas} onToggle={toggleArea} />
      <AreaLegend
        areas={areas}
        completed={completed}
        total={TOTAL_AREAS}
        canSubmit={canSubmit}
        isSubmitting={status === "submitting"}
        errorMessage={errorMessage}
        onToggle={toggleArea}
        onSubmit={handleSubmit}
      />
    </main>
  );
}

function SuccessView({
  name,
  onReset,
}: {
  name: string;
  onReset: () => void;
}) {
  return (
    <main className={styles.success}>
      <div className={styles.successCard}>
        <span className={styles.successLabel}>checklist · enviado</span>
        <h1 className={styles.successTitle}>obrigado, {name}.</h1>
        <p className={styles.successText}>
          As 6 áreas foram registradas no histórico de limpeza da workstation.
        </p>
        <button className={styles.successButton} onClick={onReset}>
          enviar outro →
        </button>
      </div>
    </main>
  );
}
