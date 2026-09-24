// Illustrated south-coast sunset used behind the home page hero
export default function HeroScene() {
  return (
    <svg className="hero__scene" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b4f5c" />
          <stop offset="0.55" stopColor="#e8683f" />
          <stop offset="1" stopColor="#f2b544" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f8a8a" />
          <stop offset="1" stopColor="#07343d" />
        </linearGradient>
      </defs>
      <rect width="1440" height="800" fill="url(#sky)" />
      <circle cx="1040" cy="470" r="120" fill="#f9d77e" opacity="0.9" />
      <path d="M0 520h1440v280H0z" fill="url(#sea)" />
      <path
        d="M0 540c80-14 160-14 240 0s160 14 240 0 160-14 240 0 160 14 240 0 160-14 240 0 160 14 240 0v30H0z"
        fill="#f9d77e"
        opacity="0.25"
      />
      <path d="M0 640c90-24 180-24 270 0s180 24 270 0 180-24 270 0 180 24 270 0 180-24 360 0v160H0z" fill="#07343d" opacity="0.55" />
      <path d="M0 720c120-30 260-40 420-20s300 30 460 10 360-40 560-10v100H0z" fill="#f6efe4" />
      {/* Palm tree */}
      <g fill="#062a31" transform="translate(1440 0) scale(-1 1)">
        <path d="M205 720c-6-110 8-210 52-300l10 4c-40 90-52 186-46 296z" />
        <path d="M260 420c-50-30-120-30-170 10 55-16 110-10 160 16z" />
        <path d="M262 418c-10-55-60-95-120-100 50 20 90 55 108 106z" />
        <path d="M264 420c30-50 90-72 150-60-55 5-105 30-138 70z" />
        <path d="M262 424c60-10 115 20 140 70-35-35-85-55-138-58z" />
        <path d="M258 424c-40 20-70 60-78 110 20-40 50-72 88-96z" />
      </g>
      {/* Stilt fisherman */}
      <g stroke="#062a31" strokeWidth="5" strokeLinecap="round" fill="none" transform="translate(-280 0)">
        <path d="M1180 700l0-110M1180 610l-26 20M1180 610l30 12" />
        <path d="M1196 596l0-40M1196 570l26-8M1222 562l60 90" strokeWidth="3" />
      </g>
      <circle cx="916" cy="548" r="10" fill="#062a31" />
    </svg>
  )
}
