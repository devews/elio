import React, { useRef, useEffect, useState } from 'react';

interface TransparentVideoProps {
  src: string;
  className?: string;
}

export const TransparentVideo: React.FC<TransparentVideoProps> = ({
  src,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animId = 0;

    const render = () => {
      if (video.readyState >= 2 && !video.paused && !video.ended) {
        const w = canvas.width;
        const h = canvas.height;

        ctx.drawImage(video, 0, 0, w, h);
        const frame = ctx.getImageData(0, 0, w, h);
        const l = frame.data.length;

        // Pixel-level black background keying:
        // Any pixel with low luminance (black background) becomes transparent
        // Smooth alpha threshold between 12 and 38 to prevent harsh aliasing
        for (let i = 0; i < l; i += 4) {
          const r = frame.data[i];
          const g = frame.data[i + 1];
          const b = frame.data[i + 2];
          const maxVal = Math.max(r, g, b);

          if (maxVal < 14) {
            frame.data[i + 3] = 0; // Completely transparent
          } else if (maxVal < 42) {
            // Soft feathered edge
            const alpha = (maxVal - 14) / (42 - 14);
            frame.data[i + 3] = Math.floor(alpha * 255);
          }
        }
        ctx.putImageData(frame, 0, 0);
      }
      animId = requestAnimationFrame(render);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      render();
    };

    video.addEventListener('play', handlePlay);

    // Initial trigger
    video.play().catch(() => {
      // Autoplay handled
    });

    return () => {
      cancelAnimationFrame(animId);
      video.removeEventListener('play', handlePlay);
    };
  }, [src]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Hidden source video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="hidden"
      />

      {/* Rendered transparent canvas */}
      <canvas
        ref={canvasRef}
        width={720}
        height={720}
        className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] select-none pointer-events-none"
      />
    </div>
  );
};
