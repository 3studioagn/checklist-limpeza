"use client";

import { type KeyboardEvent } from "react";
import type { CleaningAreaKey, CleaningState } from "@/lib/checklist";
import styles from "./WorkstationPlan.module.css";

type Props = {
  areas: CleaningState;
  onToggle: (key: CleaningAreaKey) => void;
};

type HitBox = { x: number; y: number; w: number; h: number };

const VIEW_W = 1240;
const VIEW_H = 720;

const HIT_AREAS: Record<CleaningAreaKey, HitBox> = {
  floor_area: { x: 60, y: 180, w: 310, h: 420 },
  gabinete: { x: 150, y: 240, w: 140, h: 260 },
  mesa: { x: 420, y: 180, w: 760, h: 400 },
  monitor: { x: 610, y: 220, w: 380, h: 110 },
  inputs: { x: 470, y: 350, w: 530, h: 130 },
  gavetas: { x: 490, y: 490, w: 660, h: 70 },
};

const KEY_COLS = 14;
const KEY_ROWS = 4;
const KEY_W = 22;
const KEY_H = 18;
const KEY_GAP = 4;
const KEY_ORIGIN_X = 478;
const KEY_ORIGIN_Y = 358;

function HitArea({ k }: { k: CleaningAreaKey }) {
  const b = HIT_AREAS[k];
  return (
    <rect
      x={b.x}
      y={b.y}
      width={b.w}
      height={b.h}
      className={styles.hitArea}
    />
  );
}

export default function WorkstationPlan({ areas, onToggle }: Props) {
  function handleKey(e: KeyboardEvent<SVGGElement>, key: CleaningAreaKey) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle(key);
    }
  }

  const areaProps = (key: CleaningAreaKey, label: string) => ({
    role: "button" as const,
    tabIndex: 0,
    "aria-pressed": areas[key],
    "aria-label": `${areas[key] ? "Desmarcar" : "Marcar"} ${label}`,
    onClick: () => onToggle(key),
    onKeyDown: (e: KeyboardEvent<SVGGElement>) => handleKey(e, key),
    className: `${styles.areaGroup} ${areas[key] ? styles.selected : ""}`,
    "data-anim": "area",
  });

  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        xmlns="http://www.w3.org/2000/svg"
        role="group"
        aria-label="Planta técnica da workstation"
      >
        <rect
          x="20"
          y="20"
          width={VIEW_W - 40}
          height={VIEW_H - 40}
          className={styles.frame}
          data-anim="frame"
        />

        <text x="44" y="60" className={styles.frameLabel}>
          PLAN · 1:25
        </text>
        <text
          x={VIEW_W - 44}
          y="60"
          className={styles.frameLabel}
          textAnchor="end"
        >
          N ↑
        </text>

        {/* E · FLOOR */}
        <g {...areaProps("floor_area", "área do piso")}>
          <HitArea k="floor_area" />
          <rect
            x="80"
            y="200"
            width="280"
            height="380"
            className={styles.floorZone}
          />
          <text x="96" y="568" className={styles.zoneLabel}>
            ZONA DO CHÃO
          </text>
          <circle cx="78" cy="582" r="2.5" className={styles.areaDot} />
          <line
            x1="78"
            y1="584"
            x2="56"
            y2="612"
            className={styles.guideLine}
          />
          <text x="44" y="636" className={styles.label}>
            E · CHÃO
          </text>
          <text x="44" y="652" className={styles.sublabel}>
            piso + cabos
          </text>
        </g>

        {/* D · GABINETE */}
        <g {...areaProps("gabinete", "gabinete")}>
          <HitArea k="gabinete" />
          <rect
            x="160"
            y="260"
            width="120"
            height="240"
            className={styles.gabinete}
          />
          <circle cx="220" cy="280" r="3" className={styles.gabineteDot} />
          <text
            x="220"
            y="388"
            className={styles.shapeLabel}
            textAnchor="middle"
          >
            D
          </text>
          <line
            x1="158"
            y1="280"
            x2="56"
            y2="232"
            className={styles.guideLine}
          />
          <text x="44" y="220" className={styles.label}>
            D · GABINETE
          </text>
          <text x="44" y="236" className={styles.sublabel}>
            painéis externos
          </text>
        </g>

        {/* A · MESA */}
        <g {...areaProps("mesa", "mesa")}>
          <HitArea k="mesa" />
          <rect
            x="420"
            y="200"
            width="760"
            height="380"
            className={styles.mesaShape}
          />
          <circle cx="1182" cy="218" r="2.5" className={styles.areaDot} />
          <line
            x1="1184"
            y1="216"
            x2={VIEW_W - 56}
            y2="172"
            className={styles.guideLine}
          />
          <text
            x={VIEW_W - 44}
            y="160"
            className={styles.label}
            textAnchor="end"
          >
            A · MESA
          </text>
          <text
            x={VIEW_W - 44}
            y="176"
            className={styles.sublabel}
            textAnchor="end"
          >
            superfície
          </text>
        </g>

        {/* B · MONITOR */}
        <g {...areaProps("monitor", "monitor")}>
          <HitArea k="monitor" />
          <rect
            x="620"
            y="252"
            width="360"
            height="58"
            className={styles.shape}
          />
          <text
            x="800"
            y="288"
            className={styles.shapeLabel}
            textAnchor="middle"
          >
            B
          </text>
          {/* Pé do monitor */}
          <line
            x1="780"
            y1="310"
            x2="770"
            y2="326"
            className={styles.monitorStem}
          />
          <line
            x1="820"
            y1="310"
            x2="830"
            y2="326"
            className={styles.monitorStem}
          />
          <line
            x1="762"
            y1="326"
            x2="838"
            y2="326"
            className={styles.monitorStem}
          />
          <circle cx="800" cy="250" r="2.5" className={styles.areaDot} />
          <line
            x1="800"
            y1="248"
            x2="800"
            y2="148"
            className={styles.guideLine}
          />
          <text x="800" y="136" className={styles.label} textAnchor="middle">
            B · MONITOR
          </text>
          <text x="800" y="152" className={styles.sublabel} textAnchor="middle">
            tela + base
          </text>
        </g>

        {/* C · INPUTS (teclado + mouse) */}
        <g {...areaProps("inputs", "teclado e mouse")}>
          <HitArea k="inputs" />
          <g>
            {Array.from({ length: KEY_ROWS }).map((_, row) =>
              Array.from({ length: KEY_COLS }).map((_, col) => (
                <rect
                  key={`k-${row}-${col}`}
                  x={KEY_ORIGIN_X + col * (KEY_W + KEY_GAP)}
                  y={KEY_ORIGIN_Y + row * (KEY_H + KEY_GAP)}
                  width={KEY_W}
                  height={KEY_H}
                  rx="2"
                  className={styles.key}
                />
              )),
            )}
          </g>
          <ellipse
            cx="930"
            cy="408"
            rx="22"
            ry="40"
            className={styles.mouse}
          />
          <circle cx="980" cy="408" r="2.5" className={styles.areaDot} />
          <line
            x1="982"
            y1="408"
            x2={VIEW_W - 56}
            y2="408"
            className={styles.guideLine}
          />
          <text
            x={VIEW_W - 44}
            y="404"
            className={styles.label}
            textAnchor="end"
          >
            C · PERIFÉRICOS
          </text>
          <text
            x={VIEW_W - 44}
            y="420"
            className={styles.sublabel}
            textAnchor="end"
          >
            teclado + mouse
          </text>
        </g>

        {/* F · GAVETAS */}
        <g {...areaProps("gavetas", "gavetas")}>
          <HitArea k="gavetas" />
          {[0, 1, 2].map((i) => {
            const x = 500 + i * 220;
            return (
              <g key={`d-${i}`}>
                <rect
                  x={x}
                  y="496"
                  width="200"
                  height="56"
                  className={styles.drawer}
                />
                <circle
                  cx={x + 100}
                  cy="524"
                  r="2.5"
                  className={styles.drawerDot}
                />
              </g>
            );
          })}
          <line
            x1="800"
            y1="552"
            x2="800"
            y2="612"
            className={styles.guideLine}
          />
          <text x="800" y="632" className={styles.label} textAnchor="middle">
            F · GAVETAS
          </text>
          <text x="800" y="648" className={styles.sublabel} textAnchor="middle">
            interno + puxadores
          </text>
        </g>
      </svg>
    </div>
  );
}
