import React from 'react';

interface AppLogoProps {
  id: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  glow?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  id,
  size = 'md',
  className = '',
  glow = false,
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
    hero: 'w-48 h-48 md:w-56 md:h-56',
  };

  const currentSizeClass = sizeMap[size] || sizeMap.md;

  const renderIcon = () => {
    switch (id) {
      case 'spotify':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="50" r="48" fill="#1DB954" />
            <path
              d="M71.2 64.2C70.1 66 67.8 66.5 66 65.4C54.7 58.5 40.5 56.9 23.8 60.7C21.8 61.2 19.8 59.9 19.3 57.9C18.8 55.9 20.1 53.9 22.1 53.4C40.4 49.3 56.1 51.1 68.7 58.9C70.5 60 72.3 62.4 71.2 64.2ZM77.3 52.1C75.9 54.3 72.9 55 70.7 53.6C57.8 45.7 38.2 43.4 22.9 48.1C20.4 48.9 17.7 47.4 17 44.9C16.2 42.4 17.7 39.7 20.2 38.9C37.7 33.6 59.3 36.2 74.1 45.4C76.2 46.8 78.7 49.9 77.3 52.1ZM78 39.5C62.2 30.1 36.2 29.3 21.1 33.9C18.7 34.6 16.1 33.3 15.4 30.9C14.7 28.5 16 25.9 18.4 25.2C35.8 19.9 64.6 20.9 82.8 31.7C85 33 85.7 35.9 84.4 38.1C83.1 40.3 79.9 40.6 78 39.5Z"
              fill="#0F111A"
            />
          </svg>
        );

      case 'youtube':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <rect width="100" height="100" rx="26" fill="#0C0D18" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path
              d="M87.5 35.8C86.7 32.7 84.3 30.3 81.2 29.5C75.6 28 50 28 50 28C50 28 24.4 28 18.8 29.5C15.7 30.3 13.3 32.7 12.5 35.8C11 41.4 11 50 11 50C11 50 11 58.6 12.5 64.2C13.3 67.3 15.7 69.7 18.8 70.5C24.4 72 50 72 50 72C50 72 75.6 72 81.2 70.5C84.3 69.7 86.7 67.3 87.5 64.2C89 58.6 89 50 89 50C89 50 89 41.4 87.5 35.8Z"
              fill="#FF0000"
            />
            <polygon points="42,42 63,50 42,58" fill="#FFFFFF" />
          </svg>
        );

      case 'pinterest':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="50" r="48" fill="#E60023" />
            <path
              d="M50 16C31.2 16 16 31.2 16 50C16 64.4 25 76.7 37.7 81.5C37.4 78.8 37.2 74.6 37.8 72C38.4 69.6 41.6 56.1 41.6 56.1C41.6 56.1 40.6 54.1 40.6 51.1C40.6 46.4 43.3 42.9 46.7 42.9C49.6 42.9 51 45.1 51 47.7C51 50.6 49.1 54.9 48.1 59.1C47.3 62.5 49.8 65.3 53.2 65.3C59.3 65.3 64 58.9 64 49.6C64 41.5 58.2 35.8 49.4 35.8C39.2 35.8 33.2 43.4 33.2 52.1C33.2 55.2 34.4 58.5 35.9 60.3C36.2 60.7 36.3 61.1 36.2 61.5C36 62.3 35.4 64.7 35.3 65.2C35.1 66 34.5 66.2 33.8 65.9C29.2 63.8 26.3 57.1 26.3 51.7C26.3 39.7 35 28.7 50.7 28.7C63.3 28.7 73.1 37.7 73.1 49.8C73.1 62.4 65.2 72.5 54.2 72.5C50.5 72.5 47 70.6 45.8 68.3L43.5 77.1C42.7 80.2 40.4 84.1 38.9 86.6C42.4 87.7 46.1 88.3 50 88.3C71.2 88.3 88.4 71.1 88.4 49.9C88.4 28.8 71.2 16 50 16Z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'discord':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <rect width="100" height="100" rx="26" fill="#5865F2" />
            <path
              d="M72.5 29C67.6 26.7 62.3 25.1 56.8 24.2C56.7 24.4 56.5 24.8 56.4 25.1C50.6 24.2 44.8 24.2 39 25.1C38.9 24.7 38.7 24.4 38.6 24.2C33.1 25.1 27.8 26.8 22.9 29.1C13 43.8 10.3 58.1 11.6 72.2C18.1 77 24.4 79.9 30.6 81.8C32.1 79.7 33.5 77.4 34.6 75C32.4 74.2 30.2 73.1 28.2 71.8C28.7 71.4 29.2 71 29.7 70.6C41.8 76.2 55 76.2 67 70.6C67.5 71 68 71.4 68.5 71.8C66.5 73.1 64.3 74.2 62.1 75C63.2 77.4 64.6 79.7 66.1 81.8C72.3 79.9 78.6 77 85.1 72.2C86.7 55.9 82.2 41.8 72.5 29ZM35.7 63.3C32 63.3 28.9 59.9 28.9 55.7C28.9 51.5 31.9 48.1 35.7 48.1C39.6 48.1 42.6 51.5 42.5 55.7C42.5 59.9 39.5 63.3 35.7 63.3ZM59.7 63.3C56 63.3 52.9 59.9 52.9 55.7C52.9 51.5 55.9 48.1 59.7 48.1C63.5 48.1 66.6 51.5 66.5 55.7C66.5 59.9 63.5 63.3 59.7 63.3Z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'instagram':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="ig-grad" x1="15%" y1="95%" x2="90%" y2="5%">
                <stop offset="0%" stopColor="#FED373" />
                <stop offset="15%" stopColor="#F15245" />
                <stop offset="50%" stopColor="#D92E7F" />
                <stop offset="85%" stopColor="#9B36B7" />
                <stop offset="100%" stopColor="#515ECF" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" rx="26" fill="url(#ig-grad)" />
            <rect x="22" y="22" width="56" height="56" rx="16" fill="none" stroke="#FFFFFF" strokeWidth="6" />
            <circle cx="50" cy="50" r="14" fill="none" stroke="#FFFFFF" strokeWidth="6" />
            <circle cx="67" cy="33" r="3.5" fill="#FFFFFF" />
          </svg>
        );

      case 'whatsapp':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <circle cx="50" cy="50" r="48" fill="#25D366" />
            <path
              d="M50 17C31.8 17 17 31.8 17 50C17 56.4 18.8 62.4 22 67.6L18 82L33 78.1C38 80.9 43.8 82.5 50 82.5C68.2 82.5 83 67.7 83 49.5C83 31.3 68.2 17 50 17ZM69.5 62.8C68.7 65.1 65.5 66.9 63 67.2C61.3 67.4 59.1 67.5 51.5 64.4C41.8 60.4 35.6 50.5 35.1 49.8C34.6 49.1 31.2 44.6 31.2 39.9C31.2 35.2 33.6 32.9 34.5 32C35.2 31.3 36.3 31 37.3 31C37.6 31 37.9 31 38.2 31C39.1 31.1 39.5 31.2 40.1 32.7C40.8 34.4 42.5 38.6 42.7 39C42.9 39.4 43.1 39.9 42.8 40.5C42.5 41.1 42.3 41.4 41.8 42C41.3 42.6 40.9 43 40.4 43.6C39.9 44.1 39.4 44.7 40 45.7C40.6 46.7 42.7 50.1 45.8 52.9C49.8 56.5 53.1 57.6 54.1 58.1C55.1 58.6 55.7 58.5 56.3 57.8C56.9 57.1 58.8 54.8 59.5 53.8C60.2 52.8 61 53 61.9 53.3C62.8 53.6 67.7 56 68.7 56.5C69.7 57 70.3 57.3 70.6 57.8C70.9 58.3 70.9 60.5 69.5 62.8Z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'netflix':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <rect width="100" height="100" rx="26" fill="#0C0D18" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <path d="M28 20H40V80H28V20Z" fill="#B81D24" />
            <path d="M60 20H72V80H60V20Z" fill="#B81D24" />
            <path d="M28 20L72 80H60L28 25V20Z" fill="#E50914" />
          </svg>
        );

      case 'figma':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <rect width="100" height="100" rx="26" fill="#181926" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <g transform="translate(18, 14) scale(0.64)">
              {/* Top left red */}
              <path d="M25 0H50V25H25C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50V0Z" fill="#F24E1E" />
              {/* Top right orange */}
              <path d="M50 0H75C88.8071 0 100 11.1929 100 25C100 38.8071 88.8071 50 75 50H50V0Z" fill="#FF7262" />
              {/* Middle left purple */}
              <path d="M25 50H50V100H25C11.1929 100 0 88.8071 0 75C0 61.1929 11.1929 50 25 50Z" fill="#A259FF" />
              {/* Middle right blue circle */}
              <circle cx="75" cy="75" r="25" fill="#1ABCFE" />
              {/* Bottom left green teardrop */}
              <path d="M0 125C0 111.193 11.1929 100 25 100H50V125C50 138.807 38.8071 150 25 150C11.1929 150 0 138.807 0 125Z" fill="#0ACF83" />
            </g>
          </svg>
        );

      case 'canva':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <defs>
              <linearGradient id="canva-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00C4CC" />
                <stop offset="100%" stopColor="#7D2AE8" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#canva-grad)" />
            <path
              d="M58 34C48 34 38 42 38 52C38 61 44 67 54 67C60 67 65 64 68 60L63 56C61 58 58 60 54 60C48 60 44 56 44 51C44 45 49 41 57 41C61 41 64 43 66 45L70 40C67 36 63 34 58 34Z"
              fill="#FFFFFF"
            />
          </svg>
        );

      case 'notion':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <rect width="100" height="100" rx="26" fill="#111222" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <g transform="translate(18, 16) scale(0.64)">
              <path
                d="M6.3 11.6L24.8 2.2C27.1 1 29 0.4 31.6 0.4C37.2 0.4 39.4 4.3 39.4 9.5V14.6L77.6 3.6C81.8 2.4 86 4.3 87.7 8.1L98.5 32.5C99.5 34.8 100 37.3 100 39.8V89.2C100 95.1 95.3 99.8 89.4 99.8C86.7 99.8 84 98.7 82 96.8L64.4 79.5L16.2 99.1C13.8 100 11.2 100.2 8.7 99.6C3.4 98.4 0 93.6 0 88.1V22.2C0 17.5 2.5 13.5 6.3 11.6Z"
                fill="#FFFFFF"
              />
              <path
                d="M33 22V65L55 24H68V78H55V35L33 78H22V22H33Z"
                fill="#0D0E1A"
              />
            </g>
          </svg>
        );

      case 'onedrive':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <rect width="100" height="100" rx="26" fill="#0C1226" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <defs>
              <linearGradient id="od-blue1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#28A8EA" />
                <stop offset="100%" stopColor="#0078D4" />
              </linearGradient>
              <linearGradient id="od-blue2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#50E6FF" />
                <stop offset="100%" stopColor="#107C41" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M48 32C42.8 32 38.3 35.3 36.5 40C35.1 39.4 33.6 39 32 39C25.4 39 20 44.4 20 51C20 57.6 25.4 63 32 63H65C72.2 63 78 57.2 78 50C78 43.1 72.7 37.4 66 37C64.6 31.9 59.9 28 54.3 28C52.1 28 50 28.6 48 32Z"
              fill="url(#od-blue1)"
            />
            <path
              d="M58 42C54 42 50.5 44.5 49 48.2C47.9 47.7 46.7 47.4 45.4 47.4C40.2 47.4 36 51.6 36 56.8C36 62 40.2 66.2 45.4 66.2H71.6C77.3 66.2 82 61.6 82 55.9C82 50.4 77.8 45.9 72.4 45.6C71.3 41.5 67.6 38.4 63.1 38.4C61.4 38.4 59.7 38.9 58 42Z"
              fill="#28A8EA"
            />
          </svg>
        );

      case 'uber':
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
            <rect width="100" height="100" rx="26" fill="#000000" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <text
              x="50"
              y="59"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="sans-serif"
              fontWeight="900"
              fontSize="24"
              letterSpacing="-0.5"
            >
              Uber
            </text>
          </svg>
        );

      default:
        return (
          <div className="w-full h-full bg-[#1B1E4A] rounded-2xl flex items-center justify-center text-white font-bold">
            {id.slice(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center transition-transform duration-300 ${currentSizeClass} ${className}`}>
      {glow && (
        <div
          className="absolute -inset-2 rounded-3xl blur-xl opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              id === 'spotify'
                ? 'rgba(29, 185, 84, 0.5)'
                : id === 'youtube'
                ? 'rgba(255, 0, 0, 0.5)'
                : id === 'pinterest'
                ? 'rgba(230, 0, 35, 0.5)'
                : id === 'discord'
                ? 'rgba(88, 101, 242, 0.5)'
                : id === 'instagram'
                ? 'rgba(225, 48, 108, 0.5)'
                : id === 'whatsapp'
                ? 'rgba(37, 211, 102, 0.5)'
                : id === 'netflix'
                ? 'rgba(229, 9, 20, 0.5)'
                : id === 'figma'
                ? 'rgba(162, 89, 255, 0.5)'
                : id === 'canva'
                ? 'rgba(0, 196, 204, 0.5)'
                : id === 'notion'
                ? 'rgba(255, 255, 255, 0.3)'
                : id === 'onedrive'
                ? 'rgba(40, 168, 234, 0.5)'
                : 'rgba(210, 19, 25, 0.4)',
          }}
        />
      )}
      <div className="relative w-full h-full flex items-center justify-center transform transition-transform group-hover:scale-105">
        {renderIcon()}
      </div>
    </div>
  );
};
