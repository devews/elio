import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { APPS } from '../data/apps.ts';

interface ThreeCanvasProps {
  onSelectApp?: (appId: string) => void;
  activeAppId?: string;
  isPaused?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  onSelectApp,
  activeAppId,
  isPaused = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const isDraggingRef = useRef(false);
  const previousPointerXRef = useRef(0);
  const rotationVelocityRef = useRef(0.003);
  const targetRotationRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b17, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.2, 7.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x8fa4d2, 0x111328, 1.2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Warm Key Light with tight shadow frustum
    const dirLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
    dirLight.position.set(5, 8, 6);
    dirLight.castShadow = !isSoftwareGl;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.normalBias = 0.02;
    scene.add(dirLight);

    // Crimson accent rim light (matching the brand palette #D21319)
    const crimsonRim = new THREE.PointLight(0xd21319, 4.5, 20);
    crimsonRim.position.set(-6, -2, -3);
    scene.add(crimsonRim);

    // Midnight Navy base glow
    const navyGlow = new THREE.PointLight(0x1b1e4a, 6, 25);
    navyGlow.position.set(0, -3, 2);
    scene.add(navyGlow);

    // Root carousel group
    const carouselGroup = new THREE.Group();
    scene.add(carouselGroup);

    // Soft contact ground shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      grad.addColorStop(0.5, 'rgba(27, 30, 74, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(9, 9);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.8,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.95;
    scene.add(shadowMesh);

    // Torus Core Glow Rail
    const torusGeo = new THREE.TorusGeometry(3.2, 0.05, 16, 64);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x1b1e4a,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0xd21319,
      emissiveIntensity: 0.35,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 2.2;
    carouselGroup.add(torusMesh);

    // Create 12 Procedural 3D Logo Cards / Badges arranged along the circle
    const count = APPS.length;
    const radius = 3.2;
    const appMeshes: THREE.Group[] = [];

    APPS.forEach((app, index) => {
      const angle = (index / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.lookAt(0, 0, 0);
      group.rotateY(Math.PI); // Face outwards

      // Procedural Canvas Texture for Logo Face
      const cv = document.createElement('canvas');
      cv.width = 512;
      cv.height = 512;
      const ctx = cv.getContext('2d');
      if (ctx) {
        // Base dark luxury container
        ctx.fillStyle = '#0e1022';
        ctx.beginPath();
        ctx.roundRect(16, 16, 480, 480, 80);
        ctx.fill();

        // Border gradient
        ctx.lineWidth = 14;
        ctx.strokeStyle = app.brandColor || '#ffffff';
        ctx.stroke();

        // Inner soft radial gradient
        const radial = ctx.createRadialGradient(256, 256, 40, 256, 256, 240);
        radial.addColorStop(0, app.bgRgba || 'rgba(255,255,255,0.15)');
        radial.addColorStop(1, 'transparent');
        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.roundRect(24, 24, 464, 464, 70);
        ctx.fill();

        // App Initial / Wordmark in luxury typography
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 96px "Cinzel", "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(app.name.toUpperCase(), 256, 256);

        // Subtitle badge
        ctx.font = '600 32px "Space Grotesk", sans-serif';
        ctx.fillStyle = app.accentColor || '#AFAEA2';
        ctx.fillText(app.shortTitle.toUpperCase(), 256, 350);

        // ELIO watermark
        ctx.font = '700 24px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#AFAEA2';
        ctx.fillText('ELIO DIRECTORY', 256, 140);
      }

      const canvasTexture = new THREE.CanvasTexture(cv);
      canvasTexture.colorSpace = THREE.SRGBColorSpace;
      canvasTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      // Multi-part 3D Model: Group of Chassis + Face Plate + Beveled Ring Accent
      // 1. Chassis
      const chassisGeo = new THREE.BoxGeometry(1.2, 1.2, 0.18);
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x111322,
        roughness: 0.25,
        metalness: 0.9,
      });
      const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
      chassisMesh.castShadow = !isSoftwareGl;
      chassisMesh.receiveShadow = !isSoftwareGl;
      group.add(chassisMesh);

      // 2. Face Plate with Texture
      const faceGeo = new THREE.PlaneGeometry(1.15, 1.15);
      const faceMat = new THREE.MeshStandardMaterial({
        map: canvasTexture,
        roughness: 0.15,
        metalness: 0.2,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      });
      const faceMesh = new THREE.Mesh(faceGeo, faceMat);
      faceMesh.position.z = 0.095;
      group.add(faceMesh);

      // 3. Beveled accent frame ring (Crimson or brand accent)
      const ringGeo = new THREE.TorusGeometry(0.72, 0.025, 8, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(app.brandColor),
        roughness: 0.1,
        metalness: 0.95,
        emissive: new THREE.Color(app.brandColor),
        emissiveIntensity: 0.4,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.z = 0.1;
      group.add(ringMesh);

      group.userData = { appId: app.id, appIndex: index, appName: app.name };
      carouselGroup.add(group);
      appMeshes.push(group);
    });

    // Raycasting for interactive hover/clicks
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousPointerXRef.current = e.clientX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousPointerXRef.current;
        rotationVelocityRef.current = deltaX * 0.004;
        carouselGroup.rotation.y += rotationVelocityRef.current;
        previousPointerXRef.current = e.clientX;
      } else {
        // Hover Raycast
        raycaster.setFromCamera(mouseVec, camera);
        const intersects = raycaster.intersectObjects(carouselGroup.children, true);
        if (intersects.length > 0) {
          let topGroup: THREE.Object3D | null = intersects[0].object;
          while (topGroup && topGroup.parent && topGroup.parent !== carouselGroup) {
            topGroup = topGroup.parent;
          }
          if (topGroup && topGroup.userData?.appId) {
            setHoveredApp(topGroup.userData.appId);
            container.style.cursor = 'pointer';
            return;
          }
        }
        setHoveredApp(null);
        container.style.cursor = 'grab';
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        container.style.cursor = 'grab';
      }

      // Check click without significant drag
      const rect = container.getBoundingClientRect();
      mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects(carouselGroup.children, true);
      if (intersects.length > 0) {
        let topGroup: THREE.Object3D | null = intersects[0].object;
        while (topGroup && topGroup.parent && topGroup.parent !== carouselGroup) {
          topGroup = topGroup.parent;
        }
        if (topGroup && topGroup.userData?.appId) {
          onSelectApp?.(topGroup.userData.appId);
        }
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Render loop with software WebGL guard
    let frameId = 0;
    const clock = new THREE.Clock();

    function tick() {
      const delta = clock.getDelta();

      if (!isDraggingRef.current) {
        // Natural smooth rotation or damp down if spun
        if (!isPaused) {
          rotationVelocityRef.current = THREE.MathUtils.damp(
            rotationVelocityRef.current,
            0.003,
            2,
            delta
          );
          carouselGroup.rotation.y += rotationVelocityRef.current;
        }
      }

      // Floating wave animation on app meshes
      const time = clock.getElapsedTime();
      appMeshes.forEach((mesh, i) => {
        const offset = Math.sin(time * 1.5 + i * 0.8) * 0.12;
        mesh.position.y = offset;

        // Hover scale feedback
        const isHovered = hoveredApp === mesh.userData.appId;
        const targetScale = isHovered ? 1.15 : 1.0;
        mesh.scale.setScalar(
          THREE.MathUtils.damp(mesh.scale.x, targetScale, 8, delta)
        );
      });

      // Gentle camera sway
      camera.position.x = Math.sin(time * 0.4) * 0.3;
      camera.position.y = 2.1 + Math.cos(time * 0.3) * 0.15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        // Safe pace for software WebGL
        frameId = window.setTimeout(tick, 45);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectApp, isPaused, hoveredApp]);

  return (
    <div className="relative w-full h-full select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* 3D Floating hint badge */}
      <div className="absolute top-4 right-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B1E4A]/80 border border-white/10 text-[11px] font-mono text-[#AFAEA2] tracking-wider uppercase backdrop-blur-sm">
        <span className="w-2 h-2 rounded-full bg-[#D21319]" />
        Drag to Orbit 3D Carousel
      </div>

      {hoveredApp && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-2 rounded-xl bg-[#090b17]/90 border border-[#D21319]/40 text-xs font-mono text-white tracking-widest uppercase flex items-center gap-3 shadow-xl">
          <span className="text-[#D21319]">●</span>
          Click to Open {APPS.find((a) => a.id === hoveredApp)?.name}
        </div>
      )}
    </div>
  );
};
