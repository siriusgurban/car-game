import React from "react";

export default function Speedometer({ speed = 0, maxSpeed = 0.3 }) {
  // Ensure numbers
  const safeSpeed = typeof speed === "number" ? speed : 0;
  const safeMax = typeof maxSpeed === "number" && maxSpeed > 0 ? maxSpeed : 1;

  // Clamp speed
  const clampedSpeed = Math.min(Math.max(safeSpeed, 0), safeMax);

  const center = 50;
  const radius = 40;

  // Needle angle
  const angle = (clampedSpeed / safeMax) * Math.PI;

  // Needle endpoint
  const x2 = center + radius * Math.cos(Math.PI - angle);
  const y2 = center - radius * Math.sin(Math.PI - angle);

  return (
    <div style={{ marginTop: 10, width: 150, height: 150 }}>
      <svg viewBox="0 0 100 100" width="150" height="150">
        {/* Background semicircle */}
        <path
          d={`M${center - radius},${center} A${radius},${radius} 0 0 1 ${center + radius},${center}`}
          fill="none"
          stroke="#444"
          strokeWidth="5"
        />

        {/* Speed arc */}
        <path
          d={`M${center - radius},${center} A${radius},${radius} 0 ${angle > Math.PI / 2 ? 1 : 0} 1 ${x2},${y2}`}
          fill="none"
          stroke="gold"
          strokeWidth="5"
        />

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={isNaN(x2) ? center : x2}
          y2={isNaN(y2) ? center : y2}
          stroke="red"
          strokeWidth="2"
        />

        {/* Center */}
        <circle cx={center} cy={center} r="3" fill="red" />

        {/* Speed text */}
        <text
          x={center}
          y={center + 5}
          fontSize="10"
          fill="white"
          textAnchor="middle"
        >
          {Math.round(clampedSpeed * 1000)}
        </text>
      </svg>
    </div>
  );
}
