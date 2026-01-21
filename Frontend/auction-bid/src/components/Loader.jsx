import { useState } from 'react';

export const Loader = ({
  text = 'AWAITING BID',
  size = 1,
  color = '#171717',
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div
        className="relative"
        style={{
          width: `${80 * size}px`,
          height: `${80 * size}px`,
        }}
      >
        <style>
          {`
            @keyframes spin-ring {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes gentle-tap {
              0%, 100% { transform: rotate(-5deg); }
              50% { transform: rotate(5deg); }
            }

            .anim-spin {
              transform-origin: center;
              animation: spin-ring 1s linear infinite;
            }

            .anim-icon {
              transform-origin: 50% 50%;
              animation: gentle-tap 2s ease-in-out infinite;
            }
          `}
        </style>

        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Track (Background Ring) */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="4"
            opacity="0.1"
          />

          {/* Spinner (Foreground Ring) */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="264" /* 2 * PI * 42 */
            strokeDashoffset="180" /* Partial circle */
            className="anim-spin"
          />

          {/* Center Icon: Minimal Gavel */}
          <g className="anim-icon">
            {/* Handle */}
            <rect
              x="48"
              y="30"
              width="4"
              height="40"
              rx="2"
              transform="rotate(-15 50 50)"
              fill={color}
            />
            {/* Head */}
            <rect
              x="35"
              y="30"
              width="30"
              height="14"
              rx="4"
              transform="rotate(-15 50 50)"
              fill={color}
            />
          </g>
        </svg>
      </div>

      {/* Modern Typography */}
      <div className="mt-4 text-center">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse"
          style={{ color: color, opacity: 0.8 }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};
