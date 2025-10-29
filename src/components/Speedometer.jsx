import React, { useMemo, useEffect, useState } from "react";

export default function Speedometer({ speed = 0, maxSpeed = 1 }) {
  const clamped = Math.min(Math.max(speed, 0), maxSpeed);
  const percent = clamped / maxSpeed;

  const [displayPercent, setDisplayPercent] = useState(percent);
  useEffect(() => {
    const duration = 150;
    const step = 1 / (duration / 16);
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

  const center = 50;
  const radius = 40;

  // New angles → start from bottom-left (225°) to bottom-right (315°)
  const angle = useMemo(() => {
    const start = (5 * Math.PI) / 4; // 225°
    const end = (7 * Math.PI) / 4;   // 315°
    return start - (start - end) * displayPercent;
  }, [displayPercent]);

  const needle = useMemo(() => {
    const x2 = center + radius * Math.cos(angle);
    const y2 = center + radius * Math.sin(angle);
    return { x2, y2 };
  }, [angle]);

  const displaySpeed = Math.round(displayPercent * 200);

  return (
    <div
      style={{
        width: 180,
        height: 180,
        position: "relative",
        background: "radial-gradient(circle at center, #0b0014 0%, #07000d 100%)",
        border: "2px solid #722461ff",
        borderRadius: "50%",
        boxShadow: "0 0 15px #2e1328ff, 0 0 30px #2c5052ff inset",
      }}
    >
      <svg viewBox="0 0 100 100" width="180" height="180">
        {/* Background arc */}
        <path
          d={`M${center - radius * 0.7},${center + radius * 0.7} 
              A${radius},${radius} 0 0 1 ${center + radius * 0.7},${center + radius * 0.7}`}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
          fill="none"
        />

        {/* Active arc */}
        {/* <path
          d={`M${center - radius * 0.7},${center + radius * 0.7} 
              A${radius},${radius} 0 0 1 ${needle.x2},${needle.y2}`}
          stroke="#ff00c8"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        /> */}

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={needle.x2}
          y2={needle.y2}
          stroke="#00f0ff"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 5px #18464aff)",
          }}
        />

        {/* Center knob */}
        <circle cx={center} cy={center} r="3" fill="#231d22ff" />

        {/* Speed text */}
        <text
          x={center}
          y={center + 30}
          fontSize="14"
          fill="#00f0ff"
          textAnchor="middle"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            filter: "drop-shadow(0 0 6px #1d5e63ff)",
          }}
        >
          {displaySpeed} km/h
        </text>

        {/* Label */}
        <text
          x={center}
          y={center + 45}
          fontSize="6"
          fill="#82246dff"
          textAnchor="middle"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: "1px",
          }}
        >
          Speedometer
        </text>
      </svg>
    </div>
  );
}
