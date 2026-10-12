// artworks.js - Romantic Memories & Vector Artworks Dedicated to Aura from Anas
const ROMANTIC_MEMORIES = [
  {
    id: 1,
    title: "The First Spark",
    subtitle: "The Moment Our Souls Connected",
    tag: "Love Milestone #1",
    dateText: "The Dawn of Eternal Love • Anas & Aura",
    color: "#ff2d75",
    note: `From the very first moment you walked into my life, Aura, the entire universe shifted. I realized that all the stars in the night sky had simply been waiting for your smile to know what true brightness meant. You are not a coincidence; you are the most precious blessing my destiny has ever granted me. My heart beats only for you, yesterday, today, and through all of eternity. Forever yours, Anas.`,
    svgArt: `
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" class="memory-svg">
        <defs>
          <radialGradient id="artGrad1" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stop-color="#ff2d75" stop-opacity="0.85"/>
            <stop offset="45%" stop-color="#8a2be2" stop-opacity="0.5"/>
            <stop offset="85%" stop-color="#120424" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#05010a"/>
          </radialGradient>
          <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#artGrad1)"/>
        <!-- Starfield -->
        <g opacity="0.7">
          <circle cx="90" cy="110" r="1.5" fill="#fff"/>
          <circle cx="510" cy="130" r="1.8" fill="#ffd1dc"/>
          <circle cx="450" cy="480" r="1.2" fill="#fff"/>
          <circle cx="120" cy="470" r="2" fill="#ff7eb3"/>
          <circle cx="280" cy="90" r="2.5" fill="#fff" filter="url(#glow1)"/>
          <circle cx="520" cy="330" r="1.5" fill="#ffd1dc"/>
        </g>
        <!-- Orbital nebula rings -->
        <ellipse cx="300" cy="320" rx="210" ry="110" fill="none" stroke="rgba(255, 45, 117, 0.45)" stroke-width="2" transform="rotate(-15 300 320)" stroke-dasharray="10 8"/>
        <ellipse cx="300" cy="320" rx="160" ry="80" fill="none" stroke="rgba(179, 102, 255, 0.55)" stroke-width="2.5" transform="rotate(20 300 320)"/>
        <!-- Giant Central Glowing Heart -->
        <path d="M300,200 C270,130 180,130 180,220 C180,300 270,360 300,410 C330,360 420,300 420,220 C420,130 330,130 300,200 Z"
              fill="rgba(255, 45, 117, 0.28)" stroke="#ff4d8d" stroke-width="4" filter="url(#glow1)"/>
        <path d="M300,220 C275,160 200,160 200,230 C200,295 275,345 300,385 C325,345 400,295 400,230 C400,160 325,160 300,220 Z"
              fill="none" stroke="#fff" stroke-width="2" opacity="0.85"/>
        <!-- Romantic Couple Silhouettes (Anas & Aura) -->
        <g fill="#ffffff" filter="url(#glow1)">
          <!-- Anas Silhouette -->
          <circle cx="278" cy="295" r="15"/>
          <path d="M278,314 C262,326 256,368 272,378 C282,378 290,358 288,328 Z"/>
          <!-- Aura Silhouette -->
          <circle cx="320" cy="302" r="14"/>
          <path d="M320,318 C334,328 338,368 322,378 C312,378 306,353 310,328 Z"/>
          <!-- Hands Clasp -->
          <path d="M284,338 Q300,348 314,340" stroke="#ffd1dc" stroke-width="4" fill="none"/>
        </g>
        <!-- Inscribed Names -->
        <text x="300" y="470" font-family="'Outfit', sans-serif" font-weight="700" font-size="22" fill="#ffd1dc" text-anchor="middle" letter-spacing="4" filter="url(#glow1)">ANAS &amp; AURA</text>
        <text x="300" y="500" font-family="'Playfair Display', serif" font-style="italic" font-size="16" fill="#ff80ab" text-anchor="middle">Bound by Destiny</text>
      </svg>
    `
  },
  {
    id: 2,
    title: "The Cosmic Rose",
    subtitle: "A Blooming Promise Across the Stars",
    tag: "Love Milestone #2",
    dateText: "Pure Elegance & Infinite Grace",
    color: "#ff3399",
    note: `Just as a rose blooms in spring to fill the world with fragrance and splendor, your presence in my life blossoms every single day, wiping away every sorrow. I fashioned this celestial crystal rose amidst the stars, so it will bloom forever in our galaxy, glowing with the gentle radiance of your eyes. You are the softest, most captivating melody in my universe, Aura. With all my devotion, Anas.`,
    svgArt: `
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" class="memory-svg">
        <defs>
          <radialGradient id="artGrad2" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stop-color="#ff1493" stop-opacity="0.85"/>
            <stop offset="40%" stop-color="#6a0dad" stop-opacity="0.5"/>
            <stop offset="80%" stop-color="#140224" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#040008"/>
          </radialGradient>
          <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="9" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#artGrad2)"/>
        <!-- Starlight -->
        <circle cx="150" cy="180" r="2" fill="#fff"/>
        <circle cx="480" cy="140" r="1.8" fill="#ffd1dc"/>
        <circle cx="430" cy="450" r="2.2" fill="#ff69b4" filter="url(#glow2)"/>
        <!-- Rose Stem -->
        <path d="M300,320 Q290,420 300,490" stroke="#7928ca" stroke-width="6" fill="none" filter="url(#glow2)"/>
        <path d="M295,400 Q240,380 230,410 Q260,420 295,405" fill="#a855f7" opacity="0.85"/>
        <path d="M300,430 Q360,410 370,440 Q340,450 300,435" fill="#a855f7" opacity="0.85"/>
        <!-- Crystal Rose Petals -->
        <g filter="url(#glow2)" transform="translate(300, 250)">
          <path d="M0,0 C-70,-60 -110,40 -20,80 C30,90 90,60 90,0 C90,-60 20,-80 0,0 Z" fill="rgba(255, 20, 147, 0.65)" stroke="#ff77aa" stroke-width="2.5"/>
          <path d="M0,0 C70,-60 110,40 20,80 C-30,90 -90,60 -90,0 C-90,-60 -20,-80 0,0 Z" fill="rgba(217, 27, 122, 0.55)" stroke="#ff99bb" stroke-width="2"/>
          <circle cx="0" cy="10" r="35" fill="#ff007f" opacity="0.85"/>
          <path d="M-25,10 Q0,-35 25,10 Q0,40 -25,10 Z" fill="#ffffff" opacity="0.95" filter="url(#glow2)"/>
          <ellipse cx="0" cy="8" rx="15" ry="22" fill="#ffb6c1"/>
        </g>
        <circle cx="300" cy="260" r="130" fill="none" stroke="rgba(255, 182, 193, 0.45)" stroke-dasharray="6 8" stroke-width="2"/>
        <text x="300" y="535" font-family="'Outfit', sans-serif" font-weight="600" font-size="18" fill="#ffd1dc" text-anchor="middle" letter-spacing="3">FOR AURA, WITH LOVE FROM ANAS</text>
      </svg>
    `
  },
  {
    id: 3,
    title: "Planet of Sweet Memories",
    subtitle: "Every Laugh & Glance Preserved in Orbit",
    tag: "Love Milestone #3",
    dateText: "Timeless Moments We Cherish",
    color: "#a855f7",
    note: `Every laugh we've shared, every gentle whisper, and every dream we've whispered under the night sky orbits here like an incandescent world that never dims. Having you beside me, Aura, gives me the peace I sought my entire life. Your voice transforms my chaos into quiet harmony. You are my compass and my solace. Always, Anas.`,
    svgArt: `
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" class="memory-svg">
        <defs>
          <radialGradient id="artGrad3" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stop-color="#b366ff" stop-opacity="0.85"/>
            <stop offset="40%" stop-color="#ff2d75" stop-opacity="0.5"/>
            <stop offset="85%" stop-color="#0f021e" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#020006"/>
          </radialGradient>
          <filter id="glow3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#artGrad3)"/>
        <!-- Ringed World -->
        <circle cx="300" cy="290" r="115" fill="#581c87" filter="url(#glow3)"/>
        <circle cx="300" cy="290" r="110" fill="url(#artGrad3)"/>
        <path d="M210,260 Q300,230 390,270 Q300,300 210,260 Z" fill="rgba(255, 105, 180, 0.45)"/>
        <path d="M200,300 Q300,330 400,290 Q300,350 200,300 Z" fill="rgba(230, 200, 255, 0.45)"/>
        <!-- Planetary Rings -->
        <g filter="url(#glow3)">
          <ellipse cx="300" cy="290" rx="230" ry="60" fill="none" stroke="rgba(255, 105, 180, 0.9)" stroke-width="8" transform="rotate(-22 300 290)"/>
          <ellipse cx="300" cy="290" rx="210" ry="52" fill="none" stroke="rgba(255, 255, 255, 0.95)" stroke-width="3" transform="rotate(-22 300 290)"/>
          <ellipse cx="300" cy="290" rx="180" ry="44" fill="none" stroke="rgba(168, 85, 247, 0.75)" stroke-width="5" transform="rotate(-22 300 290)"/>
        </g>
        <!-- Heart Satellite -->
        <g transform="translate(440, 170)" filter="url(#glow3)">
          <path d="M0,8 C-10,-5 -22,-5 -22,8 C-22,20 -5,28 0,38 C5,28 22,20 22,8 C22,-5 10,-5 0,8 Z" fill="#ff79b0"/>
          <circle cx="0" cy="18" r="3" fill="#fff"/>
        </g>
        <text x="300" y="515" font-family="'Outfit', sans-serif" font-weight="700" font-size="20" fill="#ffffff" text-anchor="middle" letter-spacing="3">ANAS &amp; AURA'S SANCTUARY</text>
      </svg>
    `
  },
  {
    id: 4,
    title: "Sacred Love Letter",
    subtitle: "Sealed With My Very Heartbeat",
    tag: "Love Milestone #4",
    dateText: "A Vow Written Across the Stars",
    color: "#ff4d8d",
    note: `To my queen and soulmate, Aura:
If the entire world asked me why I love you so deeply, I would say: because in you, I found authenticity in a world of pretenses, and a serene sanctuary amidst all storms. When I am with you, I am home. I promise to be your shield, your companion, your unwavering protector, and your deepest admirer as long as breath stirs within my chest. Nothing in this universe could ever measure up to your worth in my heart. Your Anas.`,
    svgArt: `
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" class="memory-svg">
        <defs>
          <radialGradient id="artGrad4" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stop-color="#ff3366" stop-opacity="0.85"/>
            <stop offset="45%" stop-color="#800080" stop-opacity="0.5"/>
            <stop offset="85%" stop-color="#110321" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#020007"/>
          </radialGradient>
          <filter id="glow4" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#artGrad4)"/>
        <!-- Star Envelope -->
        <g filter="url(#glow4)" transform="translate(150, 160)">
          <rect x="0" y="50" width="300" height="200" rx="16" fill="rgba(30, 8, 48, 0.9)" stroke="#ff70a6" stroke-width="3"/>
          <path d="M0,50 L150,160 L300,50" fill="none" stroke="#ff9ebb" stroke-width="3"/>
          <path d="M0,250 L120,145" stroke="#ff70a6" stroke-width="2" opacity="0.6"/>
          <path d="M300,250 L180,145" stroke="#ff70a6" stroke-width="2" opacity="0.6"/>
          <!-- Letter Paper -->
          <rect x="30" y="5" width="240" height="130" rx="8" fill="#ffffff" opacity="0.97"/>
          <line x1="50" y1="35" x2="250" y2="35" stroke="#ff2d75" stroke-width="3" stroke-linecap="round"/>
          <line x1="50" y1="60" x2="220" y2="60" stroke="#b366ff" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="50" y1="85" x2="235" y2="85" stroke="#ff70a6" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Wax Seal Heart with "A+A" -->
          <circle cx="150" cy="160" r="30" fill="#ff1493" stroke="#ffd1dc" stroke-width="3"/>
          <path d="M150,150 C143,140 132,140 132,152 C132,164 145,170 150,177 C155,170 168,164 168,152 C168,140 157,140 150,150 Z" fill="#ffffff"/>
        </g>
        <text x="300" y="475" font-family="'Outfit', sans-serif" font-weight="700" font-size="20" fill="#ffd700" text-anchor="middle" letter-spacing="3">DEAR AURA, FOREVER YOURS ANAS</text>
      </svg>
    `
  },
  {
    id: 5,
    title: "Gem of Eternal Devotion",
    subtitle: "Rarer Than Every Diamond in the Cosmos",
    tag: "Love Milestone #5",
    dateText: "Unbreakable & Everlasting",
    color: "#ff66cc",
    note: `My love for you, Aura, is like an immaculate diamond crystal forged in the core of a star: impervious to time, unblemished, and endlessly luminous. Every day I spend loving you adds a new brilliant facet to my soul. You are my treasure and the greatest gift life could ever bestow upon me. I will guard our love as my highest devotion. All my heart, Anas.`,
    svgArt: `
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" class="memory-svg">
        <defs>
          <radialGradient id="artGrad5" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stop-color="#ff66cc" stop-opacity="0.85"/>
            <stop offset="45%" stop-color="#7928ca" stop-opacity="0.55"/>
            <stop offset="85%" stop-color="#120120" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#020006"/>
          </radialGradient>
          <filter id="glow5" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="9" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#artGrad5)"/>
        <!-- Crystal Facet -->
        <g filter="url(#glow5)" transform="translate(300, 270)">
          <polygon points="-70,-90 70,-90 120,-30 0,140 -120,-30" fill="rgba(255, 105, 180, 0.4)" stroke="#ffffff" stroke-width="3"/>
          <polygon points="-70,-90 0,-120 70,-90 0,-30" fill="rgba(255, 192, 203, 0.65)" stroke="#fff" stroke-width="2"/>
          <polygon points="-70,-90 0,-30 -120,-30" fill="rgba(217, 27, 122, 0.75)" stroke="#ffb6c1" stroke-width="2"/>
          <polygon points="70,-90 0,-30 120,-30" fill="rgba(255, 45, 117, 0.75)" stroke="#ffb6c1" stroke-width="2"/>
          <polygon points="-120,-30 0,-30 0,140" fill="rgba(168, 85, 247, 0.7)" stroke="#ffffff" stroke-width="2.5"/>
          <polygon points="120,-30 0,-30 0,140" fill="rgba(255, 20, 147, 0.7)" stroke="#ffffff" stroke-width="2.5"/>
          <path d="M0,-10 C-15,-25 -30,-25 -30,-8 C-30,10 -8,22 0,35 C8,22 30,10 30,-8 C30,-25 15,-25 0,-10 Z" fill="#ffffff" opacity="0.95" filter="url(#glow5)"/>
        </g>
        <line x1="300" y1="110" x2="300" y2="450" stroke="#fff" stroke-width="2" opacity="0.6" filter="url(#glow5)"/>
        <line x1="110" y1="270" x2="490" y2="270" stroke="#fff" stroke-width="2" opacity="0.6" filter="url(#glow5)"/>
        <text x="300" y="510" font-family="'Outfit', sans-serif" font-weight="700" font-size="20" fill="#ffd1dc" text-anchor="middle" letter-spacing="4">THE DIAMOND VOW • ANAS &amp; AURA</text>
      </svg>
    `
  },
  {
    id: 6,
    title: "Wings of Our Future",
    subtitle: "Soaring Together Above Every Horizon",
    tag: "Love Milestone #6",
    dateText: "Hand in Hand, Defying Gravity",
    color: "#ff758c",
    note: `When I hold your hand, Aura, I feel like our spirits take flight above every earthly boundary. I dream of building a cozy, joyful world with you, filled with endless laughter, gentle mornings, and unconditional affection. You were the only wish I ever prayed for, and today I thank the heavens that you are my living, breathing reality. Always holding your hand, Anas.`,
    svgArt: `
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" class="memory-svg">
        <defs>
          <radialGradient id="artGrad6" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stop-color="#ff758c" stop-opacity="0.85"/>
            <stop offset="45%" stop-color="#9333ea" stop-opacity="0.5"/>
            <stop offset="85%" stop-color="#140121" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#030009"/>
          </radialGradient>
          <filter id="glow6" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#artGrad6)"/>
        <!-- Cosmic Dove of Peace and Devotion -->
        <g filter="url(#glow6)" transform="translate(300, 270)">
          <path d="M-10,0 C-80,-110 -180,-70 -190,-10 C-150,10 -70,-20 -10,0 Z" fill="rgba(255, 182, 193, 0.75)" stroke="#ffffff" stroke-width="3"/>
          <path d="M10,0 C80,-120 190,-80 200,-20 C160,0 80,-30 10,0 Z" fill="rgba(255, 105, 180, 0.75)" stroke="#ffffff" stroke-width="3"/>
          <ellipse cx="0" cy="15" rx="18" ry="45" fill="#ffffff" filter="url(#glow6)"/>
          <path d="M0,60 L-25,120 L0,100 L25,120 Z" fill="rgba(255, 117, 140, 0.95)" stroke="#fff" stroke-width="2"/>
          <circle cx="0" cy="-35" r="14" fill="#ffffff"/>
          <path d="M0,-48 C-5,-56 -12,-56 -12,-48 C-12,-40 -3,-35 0,-28 C3,-35 12,-40 12,-48 C12,-56 5,-56 0,-48 Z" fill="#ff2d75"/>
        </g>
        <text x="300" y="490" font-family="'Outfit', sans-serif" font-weight="700" font-size="20" fill="#ffffff" text-anchor="middle" letter-spacing="3">SOARING TOGETHER • ANAS &amp; AURA</text>
      </svg>
    `
  },
  {
    id: 7,
    title: "Aura's Guiding Star",
    subtitle: "The Beacon That Always Leads Me Home",
    tag: "Love Milestone #7",
    dateText: "The Light That Never Fades",
    color: "#ff4081",
    note: `No matter how turbulent the days may be or how deep the night grows, I look towards you and immediately find clarity and unwavering certainty. You are my North Star, the luminous beacon that guides me to goodness, beauty, and warmth. Your name 'Aura' means that radiant halo of celestial light—and you are truly the light that surrounds my heart every waking second. Ever yours, Anas.`,
    svgArt: `
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" class="memory-svg">
        <defs>
          <radialGradient id="artGrad7" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stop-color="#ff4081" stop-opacity="0.9"/>
            <stop offset="45%" stop-color="#7c4dff" stop-opacity="0.55"/>
            <stop offset="85%" stop-color="#110224" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#020008"/>
          </radialGradient>
          <filter id="glow7" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#artGrad7)"/>
        <!-- Starburst -->
        <g filter="url(#glow7)" transform="translate(300, 280)">
          <polygon points="0,-170 15,-30 170,0 30,15 0,170 -15,30 -170,0 -30,-15" fill="rgba(255, 255, 255, 0.98)" stroke="#ff80ab" stroke-width="2"/>
          <polygon points="0,-100 12,-20 100,0 20,12 0,100 -12,20 -100,0 -20,-12" fill="rgba(255, 64, 129, 0.75)" transform="rotate(45)"/>
          <circle cx="0" cy="0" r="45" fill="#ffffff" filter="url(#glow7)"/>
          <circle cx="0" cy="0" r="25" fill="#ff1744"/>
          <text x="0" y="8" font-family="'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle" letter-spacing="1">AURA</text>
        </g>
        <circle cx="300" cy="280" r="210" fill="none" stroke="rgba(255, 215, 0, 0.4)" stroke-width="1.5" stroke-dasharray="8 6"/>
        <text x="300" y="525" font-family="'Outfit', sans-serif" font-weight="700" font-size="20" fill="#ffd700" text-anchor="middle" letter-spacing="3">MY NORTH STAR • ANAS LOVES AURA</text>
      </svg>
    `
  },
  {
    id: 8,
    title: "Crystal of Our Tomorrow",
    subtitle: "A Vision of Endless Happiness Together",
    tag: "Love Milestone #8",
    dateText: "Our Story is Just Beginning",
    color: "#e040fb",
    note: `When I look into our future, all I see is you smiling next to me—sharing every triumph, comforting every challenge, and weaving our dreams together into reality. Our love is not a passing season; it is an enduring covenant that I will cherish forever. Making you the happiest soul on earth is my greatest mission and joy. I love you beyond words, my Aura. Forever and always, Anas.`,
    svgArt: `
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" class="memory-svg">
        <defs>
          <radialGradient id="artGrad8" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stop-color="#e040fb" stop-opacity="0.85"/>
            <stop offset="45%" stop-color="#ff1744" stop-opacity="0.5"/>
            <stop offset="85%" stop-color="#0f011c" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#020005"/>
          </radialGradient>
          <filter id="glow8" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="9" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#artGrad8)"/>
        <!-- Crystal Stand -->
        <path d="M240,460 L360,460 L330,420 L270,420 Z" fill="#7928ca" stroke="#fff" stroke-width="2" filter="url(#glow8)"/>
        <!-- Orb -->
        <circle cx="300" cy="270" r="130" fill="none" stroke="rgba(255, 255, 255, 0.85)" stroke-width="4" filter="url(#glow8)"/>
        <circle cx="300" cy="270" r="126" fill="rgba(224, 64, 251, 0.28)"/>
        <ellipse cx="300" cy="270" rx="90" ry="40" fill="none" stroke="#ff80ab" stroke-width="3" transform="rotate(-30 300 270)" filter="url(#glow8)"/>
        <path d="M300,220 C280,190 240,190 240,225 C240,260 300,295 300,315 C300,295 360,260 360,225 C360,190 320,190 300,220 Z"
              fill="#ff4081" stroke="#fff" stroke-width="2" filter="url(#glow8)"/>
        <path d="M220,180 A 110 110 0 0 1 370,170" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.85"/>
        <text x="300" y="525" font-family="'Outfit', sans-serif" font-weight="700" font-size="20" fill="#ffd1dc" text-anchor="middle" letter-spacing="4">OUR ETERNAL TOMORROW • ANAS &amp; AURA</text>
      </svg>
    `
  }
];
