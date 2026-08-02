export default function TradeIQHero() {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 720 280"
        className="w-full"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          <linearGradient id="fadeIn" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="15%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="85%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Convergence glow at the meeting point */}
        <circle cx="530" cy="140" r="70" fill="url(#glow)" className="animate-pulse-slow" />

        {/* RSI line */}
        <path
          d="M 20 90 C 100 60, 180 130, 260 100 S 400 60, 460 110 S 500 140, 530 140"
          fill="none"
          stroke="var(--buy)"
          strokeOpacity="0.85"
          strokeWidth="2"
          style={{ stroke: "var(--buy)" }}
          className="wave wave-1"
        />
        {/* MACD line */}
        <path
          d="M 20 150 C 110 170, 170 100, 250 140 S 380 190, 450 150 S 500 138, 530 140"
          fill="none"
          strokeWidth="2"
          style={{ stroke: "var(--amber)" }}
          className="wave wave-2"
        />
        {/* EMA line */}
        <path
          d="M 20 190 C 120 200, 200 160, 270 175 S 410 130, 470 140 S 505 140, 530 140"
          fill="none"
          strokeWidth="2"
          style={{ stroke: "var(--sell)" }}
          className="wave wave-3"
        />

        {/* Convergence point */}
        <circle cx="530" cy="140" r="4.5" fill="var(--amber)" />
        <circle cx="530" cy="140" r="9" fill="none" stroke="var(--amber)" strokeWidth="1.2" opacity="0.6">
          <animate attributeName="r" values="9;22;9" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
        </circle>

        {/* Resolved signal line extending right */}
        <line x1="530" y1="140" x2="700" y2="140" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 4" />
        <text x="545" y="100" className="numeric" fontSize="12" fill="var(--amber)" letterSpacing="0.5">
          2-of-3 confluence
        </text>
      </svg>

      <style>{`
        .wave {
          stroke-dasharray: 6 4;
          animation: drift 9s linear infinite;
        }
        .wave-2 { animation-duration: 11s; animation-direction: reverse; }
        .wave-3 { animation-duration: 13s; }
        @keyframes drift {
          to { stroke-dashoffset: -200; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave { animation: none; }
          .animate-pulse-slow { animation: none; }
        }
      `}</style>
    </div>
  );
}
