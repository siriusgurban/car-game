import React, { useMemo, useEffect, useState } from "react";

export default function Speedometer({ speed = 0, maxSpeed = 1 }) {
  // Clamp and normalize
  const clamped = Math.min(Math.max(speed, 0), maxSpeed);
  const percent = clamped / maxSpeed;

  // --- Smooth animation ---
  const [displayPercent, setDisplayPercent] = useState(percent);
  useEffect(() => {
    const duration = 150; // ms
    const step = 1 / (duration / 16); // smooth frame delta
    let frame;
    const animate = () => {
      setDisplayPercent((prev) => {
        const diff = percent - prev;
        if (Math.abs(diff) < 0.01) return percent;
        return prev + diff * step;
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  

  // --- Geometry setup ---
  const center = 50;
  const radius = 40;
  const angle = useMemo(() => {
    // 135° → 45° clockwise
    const start = (3 * Math.PI) / 4;
    const end = Math.PI / 4;
    return start - (start - end) * displayPercent;
  }, [displayPercent]);

  const needle = useMemo(() => {
    const x2 = center + radius * Math.cos(angle);
    const y2 = center + radius * Math.sin(angle);
    return { x2, y2 };
  }, [angle]);

  const displaySpeed = Math.round(displayPercent * 200);

  return (
    <div style={{ width: 140, height: 140 }}>
      <svg viewBox="0 0 100 100" width="140" height="140">
        {/* Background arc */}
        <path
          d={`M${center - radius},${center} A${radius},${radius} 0 0 1 ${center + radius},${center}`}
          stroke="#333"
          strokeWidth="6"
          fill="none"
        />

        {/* Active arc */}
        <path
          d={`M${center - radius},${center} A${radius},${radius} 0 0 1 ${needle.x2},${needle.y2}`}
          stroke="gold"
          strokeWidth="6"
          fill="none"
        />

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={needle.x2}
          y2={needle.y2}
          stroke="red"
          strokeWidth="2"
        />

        {/* Center knob */}
        <circle cx={center} cy={center} r="3" fill="red" />

        {/* Tick marks */}
        {[...Array(11)].map((_, i) => {
          const a = (3 * Math.PI) / 4 - (i / 10) * (Math.PI / 2);
          const x1 = center + (radius - 5) * Math.cos(a);
          const y1 = center + (radius - 5) * Math.sin(a);
          const x2 = center + radius * Math.cos(a);
          const y2 = center + radius * Math.sin(a);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#666"
              strokeWidth="1"
            />
          );
        })}

        {/* Speed text */}
        <text
          x={center}
          y={center + 20}
          fontSize="12"
          fill="white"
          textAnchor="middle"
        >
          {displaySpeed} km/h
        </text>
      </svg>
    </div>
  );
}
