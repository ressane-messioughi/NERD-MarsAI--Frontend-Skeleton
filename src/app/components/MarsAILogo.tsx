import { Link } from 'react-router-dom';

export function MarsAILogo() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      {/* Custom SVG Logo */}
      <div className="relative h-12 w-auto">
        <svg
          width="180"
          height="48"
          viewBox="0 0 180 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:scale-105"
        >
          {/* Glow effect on hover */}
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Water waves at bottom (Emerald Green) */}
          <path
            d="M2 38 Q6 36 10 38 T18 38 T26 38"
            stroke="#10B981"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            className="group-hover:opacity-100 transition-opacity"
          />
          <path
            d="M2 42 Q6 40 10 42 T18 42 T26 42"
            stroke="#10B981"
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
            className="group-hover:opacity-80 transition-opacity"
          />

          {/* Transition: Water to Neural Network */}
          <circle cx="8" cy="38" r="1.5" fill="#10B981" opacity="0.7" />
          <circle cx="14" cy="34" r="1.5" fill="#10B981" opacity="0.7" />
          <circle cx="20" cy="38" r="1.5" fill="#10B981" opacity="0.7" />
          
          {/* Neural network connections (gradient) */}
          <line x1="8" y1="38" x2="14" y2="34" stroke="url(#waterGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="14" y1="34" x2="20" y2="38" stroke="url(#waterGradient)" strokeWidth="1" opacity="0.5" />
          <line x1="14" y1="34" x2="14" y2="26" stroke="url(#waterGradient)" strokeWidth="1" opacity="0.5" />

          {/* AI Neural nodes (Purple) */}
          <circle cx="10" cy="28" r="1.5" fill="#7C3AED" opacity="0.8" />
          <circle cx="14" cy="26" r="2" fill="#7C3AED" opacity="0.9" />
          <circle cx="18" cy="28" r="1.5" fill="#7C3AED" opacity="0.8" />
          <circle cx="14" cy="20" r="1.5" fill="#7C3AED" opacity="0.8" />

          {/* More neural connections */}
          <line x1="10" y1="28" x2="14" y2="26" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
          <line x1="14" y1="26" x2="18" y2="28" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
          <line x1="14" y1="26" x2="14" y2="20" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />

          {/* Notre-Dame de la Garde silhouette (simplified) */}
          <g transform="translate(8, 8)">
            {/* Basilica base */}
            <rect x="6" y="10" width="8" height="6" fill="#7C3AED" opacity="0.7" />
            {/* Bell tower */}
            <rect x="8" y="6" width="4" height="4" fill="#7C3AED" opacity="0.8" />
            {/* Statue on top */}
            <path d="M10 4 L9 6 L11 6 Z" fill="#10B981" opacity="0.9" />
            {/* Cross/Crown */}
            <circle cx="10" cy="3" r="1" fill="#10B981" opacity="0.9" />
          </g>

          {/* Text: "Festival" */}
          <text
            x="32"
            y="14"
            fill="#9CA3AF"
            fontSize="8"
            fontFamily="Inter, sans-serif"
            fontWeight="500"
            letterSpacing="1"
            textTransform="uppercase"
          >
            FESTIVAL
          </text>

          {/* Text: "MarsAI" */}
          <text
            x="32"
            y="30"
            fill="#7C3AED"
            fontSize="20"
            fontFamily="Inter, sans-serif"
            fontWeight="700"
            letterSpacing="-0.5"
          >
            mars<tspan fill="#10B981">AI</tspan>
          </text>

          {/* Tagline */}
          <text
            x="32"
            y="40"
            fill="#6B7280"
            fontSize="6"
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            opacity="0.8"
          >
            Marseille 2026
          </text>
        </svg>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  );
}