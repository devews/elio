import React, { useRef, useEffect } from 'react';

interface SpinePoint {
  x: number;
  y: number;
  angle: number;
}

interface TailLobe {
  length: number;
  spreadAngle: number;
  width: number;
  history: { x: number; y: number }[];
}

class ButterflyKoi {
  x: number;
  y: number;
  angle: number;
  speed: number;
  baseCruiseSpeed: number;
  targetMaxSpeed: number;
  scale: number;
  tailPhase: number;
  type: 'orange-white' | 'pure-white' | 'black-gold';
  spine: SpinePoint[];
  numSegments = 14;
  segmentLength: number;
  lobes: TailLobe[];
  wanderAngle: number;
  wanderTimer: number;
  cursorOffsetAngle: number;
  cursorDistance: number;

  constructor(
    x: number,
    y: number,
    type: 'orange-white' | 'pure-white' | 'black-gold',
    baseCruiseSpeed: number,
    targetMaxSpeed: number,
    cursorOffsetAngle: number,
    cursorDistance: number,
    scale = 1.0
  ) {
    this.x = x;
    this.y = y;
    this.angle = Math.random() * Math.PI * 2;
    this.wanderAngle = this.angle;
    this.wanderTimer = Math.floor(Math.random() * 120);

    // Each fish has its own unique, slightly lowered graceful speeds
    this.baseCruiseSpeed = baseCruiseSpeed;
    this.targetMaxSpeed = targetMaxSpeed;
    this.speed = baseCruiseSpeed;

    this.cursorOffsetAngle = cursorOffsetAngle;
    this.cursorDistance = cursorDistance;

    this.scale = scale;
    this.tailPhase = Math.random() * 10;
    this.type = type;

    this.segmentLength = 6.2 * this.scale;
    this.spine = [];
    for (let i = 0; i < this.numSegments; i++) {
      this.spine.push({
        x: this.x - Math.cos(this.angle) * i * this.segmentLength,
        y: this.y - Math.sin(this.angle) * i * this.segmentLength,
        angle: this.angle,
      });
    }

    // Flowing silk veil tail lobes
    this.lobes = [
      { length: 55 * this.scale, spreadAngle: -0.28, width: 8 * this.scale, history: [] },
      { length: 75 * this.scale, spreadAngle: -0.12, width: 12 * this.scale, history: [] },
      { length: 85 * this.scale, spreadAngle: 0.0, width: 14 * this.scale, history: [] },
      { length: 75 * this.scale, spreadAngle: 0.12, width: 12 * this.scale, history: [] },
      { length: 55 * this.scale, spreadAngle: 0.28, width: 8 * this.scale, history: [] },
    ];
  }

  update(
    mouseX: number,
    mouseY: number,
    hasMouse: boolean,
    allKoi: ButterflyKoi[],
    w: number,
    h: number
  ) {
    let desiredAngle = this.angle;
    let targetSpeed = this.baseCruiseSpeed;

    // 1. Random independent wandering when idling
    this.wanderTimer--;
    if (this.wanderTimer <= 0) {
      this.wanderTimer = 100 + Math.floor(Math.random() * 160);
      // Pick a new random independent direction
      this.wanderAngle += (Math.random() - 0.5) * 2.2;
    }
    desiredAngle = this.wanderAngle;

    // 2. Swim towards direction of cursor with non-overlapping offset
    if (hasMouse) {
      // Each fish targets a distinct personal pocket around the cursor
      const targetX =
        mouseX +
        Math.cos(this.cursorOffsetAngle + this.tailPhase * 0.15) *
          this.cursorDistance;
      const targetY =
        mouseY +
        Math.sin(this.cursorOffsetAngle + this.tailPhase * 0.15) *
          this.cursorDistance;

      const dx = targetX - this.x;
      const dy = targetY - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 35) {
        desiredAngle = Math.atan2(dy, dx);
        targetSpeed = this.targetMaxSpeed;
      }
    }

    // 3. Mutual Anti-Overlap & Separation (Steer around each other)
    const personalSpace = 135 * this.scale;
    for (const other of allKoi) {
      if (other === this) continue;
      const ox = this.x - other.x;
      const oy = this.y - other.y;
      const sepDist = Math.hypot(ox, oy);

      if (sepDist < personalSpace && sepDist > 0) {
        // Strong repulsion away from neighbor fish to prevent overlapping
        const avoidAngle = Math.atan2(oy, ox);
        desiredAngle = avoidAngle;
      }
    }

    // 4. Boundary avoidance at screen edges
    const margin = 80;
    if (this.x < margin) desiredAngle = 0;
    else if (this.x > w - margin) desiredAngle = Math.PI;
    if (this.y < margin) desiredAngle = Math.PI / 2;
    else if (this.y > h - margin) desiredAngle = -Math.PI / 2;

    // Smooth, graceful turning rate (no harsh snapping)
    let angleDiff = desiredAngle - this.angle;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    this.angle += angleDiff * 0.045;

    // Smooth speed transition
    this.speed += (targetSpeed - this.speed) * 0.05;

    // Forward motion
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Swimming wave phase scales proportionately with swim speed
    this.tailPhase += 0.04 * this.speed;

    // 5. Spine Kinematics
    this.spine[0].x = this.x;
    this.spine[0].y = this.y;
    this.spine[0].angle = this.angle;

    for (let i = 1; i < this.numSegments; i++) {
      const prev = this.spine[i - 1];
      const curr = this.spine[i];

      const wave =
        Math.sin(this.tailPhase - i * 0.45) * (i * 0.45 * this.scale);
      const targetX =
        prev.x -
        Math.cos(prev.angle) * this.segmentLength +
        Math.cos(prev.angle + Math.PI / 2) * wave;
      const targetY =
        prev.y -
        Math.sin(prev.angle) * this.segmentLength +
        Math.sin(prev.angle + Math.PI / 2) * wave;

      curr.x += (targetX - curr.x) * 0.6;
      curr.y += (targetY - curr.y) * 0.6;
      curr.angle = Math.atan2(prev.y - curr.y, prev.x - curr.x);
    }

    // 6. Tail ribbon lobes history
    const tailBase = this.spine[this.numSegments - 1];
    this.lobes.forEach((lobe, lIdx) => {
      const lobeAngle =
        tailBase.angle +
        lobe.spreadAngle +
        Math.sin(this.tailPhase - lIdx * 0.25) * 0.18;
      const tipX = tailBase.x - Math.cos(lobeAngle) * lobe.length;
      const tipY = tailBase.y - Math.sin(lobeAngle) * lobe.length;

      lobe.history.unshift({ x: tipX, y: tipY });
      if (lobe.history.length > 10) {
        lobe.history.pop();
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    const s = this.scale;

    const bodyWidths = [
      12 * s, 15 * s, 16.5 * s, 17 * s, 16 * s, 15 * s, 13 * s,
      11.5 * s, 9.5 * s, 8 * s, 6.5 * s, 5 * s, 4 * s, 3 * s,
    ];

    // 1. Pectoral Butterfly Fins
    const shoulder = this.spine[2];
    const finFlutter = Math.sin(this.tailPhase) * 0.2;

    ctx.save();
    for (const side of [-1, 1]) {
      const finAngle = shoulder.angle + side * (Math.PI / 2.2 + finFlutter);
      const finLength = 46 * s;
      const finSpread = 22 * s;

      ctx.beginPath();
      ctx.moveTo(shoulder.x, shoulder.y);
      const tipX = shoulder.x + Math.cos(finAngle) * finLength;
      const tipY = shoulder.y + Math.sin(finAngle) * finLength;
      const cpX =
        shoulder.x +
        Math.cos(finAngle) * finLength * 0.6 +
        Math.cos(finAngle + Math.PI / 2) * finSpread * side;
      const cpY =
        shoulder.y +
        Math.sin(finAngle) * finLength * 0.6 +
        Math.sin(finAngle + Math.PI / 2) * finSpread * side;

      ctx.quadraticCurveTo(cpX, cpY, tipX, tipY);
      ctx.quadraticCurveTo(shoulder.x, shoulder.y, shoulder.x, shoulder.y);

      if (this.type === 'orange-white') {
        ctx.fillStyle = 'rgba(240, 110, 40, 0.7)';
      } else if (this.type === 'pure-white') {
        ctx.fillStyle = 'rgba(245, 248, 255, 0.75)';
      } else {
        ctx.fillStyle = 'rgba(215, 155, 25, 0.75)';
      }
      ctx.fill();
    }
    ctx.restore();

    // 2. Veil Tail Ribbons
    const tailBase = this.spine[this.spine.length - 1];
    ctx.save();
    this.lobes.forEach((lobe) => {
      if (lobe.history.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(tailBase.x, tailBase.y);

      for (let i = 0; i < lobe.history.length; i++) {
        const pt = lobe.history[i];
        ctx.lineTo(pt.x, pt.y);
      }

      ctx.lineWidth = lobe.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (this.type === 'orange-white') {
        ctx.strokeStyle = 'rgba(235, 95, 30, 0.75)';
      } else if (this.type === 'pure-white') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      } else {
        ctx.strokeStyle = 'rgba(225, 165, 35, 0.75)';
      }

      ctx.stroke();
    });
    ctx.restore();

    // 3. Fish Body Silhouette
    ctx.save();
    ctx.beginPath();

    // Left flank
    for (let i = 0; i < this.numSegments; i++) {
      const pt = this.spine[i];
      const normAngle = pt.angle + Math.PI / 2;
      const lx = pt.x + Math.cos(normAngle) * bodyWidths[i];
      const ly = pt.y + Math.sin(normAngle) * bodyWidths[i];
      if (i === 0) ctx.moveTo(lx, ly);
      else ctx.lineTo(lx, ly);
    }

    // Snout
    const head = this.spine[0];
    const snoutX = head.x + Math.cos(head.angle) * 12 * s;
    const snoutY = head.y + Math.sin(head.angle) * 12 * s;
    ctx.lineTo(snoutX, snoutY);

    // Right flank
    for (let i = this.numSegments - 1; i >= 0; i--) {
      const pt = this.spine[i];
      const normAngle = pt.angle - Math.PI / 2;
      const rx = pt.x + Math.cos(normAngle) * bodyWidths[i];
      const ry = pt.y + Math.sin(normAngle) * bodyWidths[i];
      ctx.lineTo(rx, ry);
    }
    ctx.closePath();

    if (this.type === 'orange-white') {
      const bodyGrad = ctx.createLinearGradient(
        head.x,
        head.y,
        tailBase.x,
        tailBase.y
      );
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.35, '#e84518');
      bodyGrad.addColorStop(0.7, '#ff7438');
      bodyGrad.addColorStop(1, '#ffffff');
      ctx.fillStyle = bodyGrad;
    } else if (this.type === 'pure-white') {
      const bodyGrad = ctx.createLinearGradient(
        head.x,
        head.y,
        tailBase.x,
        tailBase.y
      );
      bodyGrad.addColorStop(0, '#ffffff');
      bodyGrad.addColorStop(0.6, '#edf2fa');
      bodyGrad.addColorStop(1, '#d8e2f0');
      ctx.fillStyle = bodyGrad;
    } else {
      const bodyGrad = ctx.createLinearGradient(
        head.x,
        head.y,
        tailBase.x,
        tailBase.y
      );
      bodyGrad.addColorStop(0, '#1c1c22');
      bodyGrad.addColorStop(0.4, '#d9941a');
      bodyGrad.addColorStop(0.7, '#18181e');
      bodyGrad.addColorStop(1, '#f0b028');
      ctx.fillStyle = bodyGrad;
    }

    ctx.fill();
    ctx.restore();
  }
}

export const KoiPondOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const koiListRef = useRef<ButterflyKoi[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, hasMoved: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const w = canvas.width;
    const h = canvas.height;

    // Three distinct butterfly koi:
    // 1. Orange-white: base cruise 1.7, follow speed 2.6, offset angle 0, radius 85px
    // 2. Pure-white: base cruise 2.1, follow speed 3.1, offset angle 2.09, radius 120px
    // 3. Black-gold: base cruise 1.45, follow speed 2.2, offset angle 4.18, radius 145px
    koiListRef.current = [
      new ButterflyKoi(
        w * 0.25,
        h * 0.35,
        'orange-white',
        1.7,
        2.6,
        0,
        85,
        1.0
      ),
      new ButterflyKoi(
        w * 0.7,
        h * 0.25,
        'pure-white',
        2.1,
        3.1,
        (Math.PI * 2) / 3,
        120,
        0.95
      ),
      new ButterflyKoi(
        w * 0.45,
        h * 0.65,
        'black-gold',
        1.45,
        2.2,
        (Math.PI * 4) / 3,
        145,
        1.02
      ),
    ];

    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.hasMoved = true;
    };

    window.addEventListener('pointermove', handlePointerMove);

    const tick = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const koiList = koiListRef.current;
      koiList.forEach((koi) => {
        koi.update(
          mouseRef.current.x,
          mouseRef.current.y,
          mouseRef.current.hasMoved,
          koiList,
          width,
          height
        );
        koi.draw(ctx);
      });

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30 select-none"
    />
  );
};
