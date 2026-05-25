"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./HeaderBar.module.css";

type Props = {
  name: string;
  date: string;
  completed: number;
  total: number;
  onChangeName: (value: string) => void;
  onChangeDate: (value: string) => void;
};

const padded = (n: number) => n.toString().padStart(2, "0");

export default function HeaderBar({
  name,
  date,
  completed,
  total,
  onChangeName,
  onChangeDate,
}: Props) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = counterRef.current;
      if (!el) return;
      const current = parseInt(el.textContent ?? "0", 10);
      if (current === completed) return;

      const obj = { val: current };
      gsap.to(obj, {
        val: completed,
        duration: 0.5,
        ease: "power3.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = padded(Math.round(obj.val));
          }
        },
      });
    },
    { dependencies: [completed] },
  );

  return (
    <header className={styles.header} data-anim="header">
      <div className={styles.brand}>
        <Image
          src="/logo.svg"
          alt="3STUDIO"
          width={118}
          height={25}
          priority
          className={styles.logo}
        />
        <span className={styles.subtitle}>checklist de limpeza</span>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Resp.</span>
          <input
            type="text"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="seu nome"
            maxLength={80}
            spellCheck={false}
            autoComplete="off"
            className={styles.input}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Data</span>
          <input
            type="date"
            value={date}
            onChange={(e) => onChangeDate(e.target.value)}
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.counter} aria-live="polite">
        <div className={styles.counterValue}>
          <span ref={counterRef} className={styles.counterCurrent}>
            {padded(completed)}
          </span>
          <span className={styles.counterSep}>/</span>
          <span className={styles.counterTotal}>{padded(total)}</span>
        </div>
        <span className={styles.counterLabel}>limpo</span>
      </div>
    </header>
  );
}
