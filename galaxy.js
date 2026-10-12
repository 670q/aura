// galaxy.js - Three.js 3D Interactive Romantic Galaxy Engine for Anas & Aura
class AuraGalaxyEngine {
  constructor() {
    this.container = document.getElementById('webgl-canvas-container');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    // Interactive Raycaster
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.hoveredNode = null;
    this.interactiveNodes = [];
    this.floatingTextSprites = [];

    // Animation & Objects
    this.galaxyPoints = null;
    this.heartPoints = null;
    this.heartCoreLight = null;
    this.heartParticlesData = [];
    this.shootingStars = [];
    this.clock = new THREE.Clock();

    // Cinematic Tour Mode
    this.isCinematicTour = false;
    this.tourStep = 0;
    this.tourTimer = null;

    // Default Camera Anchor
    this.defaultCamPos = new THREE.Vector3(0, 130, 240);
    this.defaultCamTarget = new THREE.Vector3(0, 10, 0);
    this.currentCamTween = null;
  }

  init() {
    // 1. Scene Setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030008, 0.0012);

    // 2. Camera Setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 3000);
    this.camera.position.copy(this.defaultCamPos);

    // 3. Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.container.appendChild(this.renderer.domElement);

    // 4. Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 25;
    this.controls.maxDistance = 550;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.3;
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.6;
    this.controls.target.copy(this.defaultCamTarget);

    // 5. Lighting
    this.setupLighting();

    // 6. Build Celestial Systems
    this.buildGalaxyParticles();
    this.buildPulsingParticleHeart();
    this.buildOrbitingRomanticTexts();
    this.buildInteractiveNodes();
    this.buildBackgroundStarfield();

    // 7. Event Listeners
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));
    window.addEventListener('click', (e) => this.onPointerClick(e));
    window.addEventListener('touchend', (e) => this.onTouchEnd(e), { passive: true });

    // 8. Start Animation Loop
    this.animate();
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xff69b4, 0.85);
    this.scene.add(ambientLight);

    // Core Heart Point Light (Neon Pink & Violet)
    this.heartCoreLight = new THREE.PointLight(0xff1493, 3.5, 250);
    this.heartCoreLight.position.set(0, 18, 0);
    this.scene.add(this.heartCoreLight);

    const warmAccentLight = new THREE.PointLight(0xffd1dc, 2.0, 300);
    warmAccentLight.position.set(0, -20, 0);
    this.scene.add(warmAccentLight);
  }

  createGlowTexture(colorHex = '#ffffff') {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, colorHex);
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(0.5, 'rgba(255, 77, 141, 0.45)');
    grad.addColorStop(0.8, 'rgba(168, 85, 247, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // 1. Spiral Galaxy of Love (26,000+ Glowing Particles)
  buildGalaxyParticles() {
    const count = 26000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const galaxyRadius = 240;
    const arms = 4;
    const spin = 1.35;
    const randomness = 0.55;
    const randomnessPower = 3.5;

    const colorInside = new THREE.Color('#fff0f5');
    const colorMid = new THREE.Color('#ff2d75');
    const colorArms = new THREE.Color('#e0218a');
    const colorOutside = new THREE.Color('#9333ea');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 1.7) * galaxyRadius;
      const armIndex = i % arms;
      const armAngle = (armIndex / arms) * Math.PI * 2;
      const spinAngle = r * (spin / 100);

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * (randomness * 0.45) * r;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      positions[i3] = Math.cos(armAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(armAngle + spinAngle) * r + randomZ;

      const mixedColor = new THREE.Color();
      const normR = r / galaxyRadius;

      if (normR < 0.25) {
        mixedColor.copy(colorInside).lerp(colorMid, normR / 0.25);
      } else if (normR < 0.65) {
        mixedColor.copy(colorMid).lerp(colorArms, (normR - 0.25) / 0.4);
      } else {
        mixedColor.copy(colorArms).lerp(colorOutside, (normR - 0.65) / 0.35);
      }

      mixedColor.r += (Math.random() - 0.5) * 0.08;
      mixedColor.b += (Math.random() - 0.5) * 0.08;

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      sizes[i] = Math.random() < 0.06 ? (Math.random() * 3.5 + 2.0) : (Math.random() * 1.8 + 0.8);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 2.2,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: this.createGlowTexture('#ffffff'),
      transparent: true,
      opacity: 0.95
    });

    this.galaxyPoints = new THREE.Points(geometry, material);
    this.scene.add(this.galaxyPoints);
  }

  // 2. 3D Pulsing Particle Heart at Galaxy Center
  buildPulsingParticleHeart() {
    const heartCount = 3800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(heartCount * 3);
    const colors = new Float32Array(heartCount * 3);

    this.heartParticlesData = [];
    const scale = 1.35;

    for (let i = 0; i < heartCount; i++) {
      const i3 = i * 3;
      const t = Math.PI * 2 * Math.random();
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

      const maxZ = Math.sqrt(Math.max(0.1, 1 - Math.abs(y / 18))) * 7.5;
      const z = (Math.random() - 0.5) * 2 * maxZ;

      const spread = Math.random();
      const spreadFactor = 0.35 + 0.65 * spread;

      const px = x * scale * spreadFactor;
      const py = y * scale * spreadFactor;
      const pz = z * scale * spreadFactor;

      positions[i3] = px;
      positions[i3 + 1] = py + 18;
      positions[i3 + 2] = pz;

      this.heartParticlesData.push({
        baseX: px,
        baseY: py + 18,
        baseZ: pz,
        origSpread: spreadFactor,
        phase: Math.random() * Math.PI * 2
      });

      const heartCol = new THREE.Color();
      if (spreadFactor > 0.85) {
        heartCol.set('#ffffff');
      } else if (spreadFactor > 0.4) {
        heartCol.set('#ff2d75');
      } else {
        heartCol.set('#ff007f');
      }

      colors[i3] = heartCol.r;
      colors[i3 + 1] = heartCol.g;
      colors[i3 + 2] = heartCol.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const heartMaterial = new THREE.PointsMaterial({
      size: 3.4,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: this.createGlowTexture('#ff80ab'),
      transparent: true,
      opacity: 0.98
    });

    this.heartPoints = new THREE.Points(geometry, heartMaterial);
    this.scene.add(this.heartPoints);

    // Glowing Heart Halo Aura Mesh
    const haloGeo = new THREE.RingGeometry(24, 30, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xff2d75,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    this.heartHalo = new THREE.Mesh(haloGeo, haloMat);
    this.heartHalo.rotation.x = Math.PI / 2;
    this.heartHalo.position.set(0, 18, 0);
    this.scene.add(this.heartHalo);
  }

  // 3. Dynamic 3D Floating Romantic Text Billboards (English & Dedicated to Anas & Aura)
  buildOrbitingRomanticTexts() {
    const romanticPhrases = [
      { text: "Anas ❤️ Aura", sub: "Forever & Always", r: 80, angle: 0, y: 18, col: "#ff2d75" },
      { text: "You Are My Galaxy", sub: "My Entire Universe", r: 115, angle: 1.1, y: 26, col: "#ffffff" },
      { text: "Endless Love", sub: "Beyond Infinity", r: 145, angle: 2.2, y: 12, col: "#e0218a" },
      { text: "Aura, My Everything", sub: "Light of My Life", r: 95, angle: 3.3, y: 34, col: "#ffd1dc" },
      { text: "My Heart Beats For You", sub: "With Every Breath", r: 128, angle: 4.4, y: 22, col: "#a855f7" },
      { text: "Two Souls, One Heart", sub: "Anas & Aura Eternal", r: 165, angle: 5.4, y: 16, col: "#ff69b4" }
    ];

    this.floatingTextSprites = [];

    romanticPhrases.forEach((phrase, idx) => {
      const sprite = this.createTextBillboard(phrase.text, phrase.sub, phrase.col);
      sprite.userData = {
        radius: phrase.r,
        baseAngle: phrase.angle,
        speed: 0.08 + idx * 0.015,
        baseY: phrase.y,
        bobSpeed: 1.2 + idx * 0.2,
        phase: idx * 1.5,
        originalScale: sprite.scale.clone(),
        isTextNode: true,
        text: phrase.text
      };

      this.scene.add(sprite);
      this.floatingTextSprites.push(sprite);
      this.interactiveNodes.push(sprite);
    });
  }

  // High-DPI Glowing 2D Canvas Sprite for Romantic Billboards
  createTextBillboard(mainText, subText, accentColor = '#ff2d75') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 190;
    const ctx = canvas.getContext('2d');

    // Rounded Glassmorphic Pill Background
    ctx.fillStyle = 'rgba(12, 3, 20, 0.72)';
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 4;

    const roundRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    ctx.shadowColor = accentColor;
    ctx.shadowBlur = 24;
    roundRect(16, 16, 480, 158, 28);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 12;

    // Main English Romantic Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Outfit", "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(mainText, 256, 75);

    // Subtitle
    ctx.fillStyle = accentColor;
    ctx.font = '600 21px "Playfair Display", Georgia, serif';
    ctx.fillText(`✨ ${subText} ✨`, 256, 125);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(30, 11, 1);
    return sprite;
  }

  // 4. Interactive Celestial Nodes Orbiting within Galaxy
  buildInteractiveNodes() {
    ROMANTIC_MEMORIES.forEach((memory, idx) => {
      const nodeGroup = new THREE.Group();

      const orbitRadius = 70 + idx * 19;
      const orbitAngle = (idx / ROMANTIC_MEMORIES.length) * Math.PI * 2;
      const orbitSpeed = 0.06 + (idx % 3) * 0.015;
      const nodeAltitude = 12 + Math.sin(idx * 2) * 16;

      const coreMesh = this.createDistinctive3DMesh(memory.id, memory.color);
      nodeGroup.add(coreMesh);

      const haloGeo = new THREE.IcosahedronGeometry(4.2, 1);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(memory.color),
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeGroup.add(haloMesh);

      const pinSprite = this.createNodePinSprite(memory.title, memory.tag, memory.color);
      pinSprite.position.set(0, 7.5, 0);
      nodeGroup.add(pinSprite);

      nodeGroup.userData = {
        memoryId: memory.id,
        memoryData: memory,
        orbitRadius: orbitRadius,
        baseAngle: orbitAngle,
        orbitSpeed: orbitSpeed,
        baseY: nodeAltitude,
        isInteractiveNode: true,
        coreMesh: coreMesh,
        haloMesh: haloMesh,
        originalScale: new THREE.Vector3(1, 1, 1)
      };

      this.scene.add(nodeGroup);
      this.interactiveNodes.push(nodeGroup);
    });
  }

  createDistinctive3DMesh(id, colorHex) {
    const col = new THREE.Color(colorHex);
    let geo;

    switch (id) {
      case 1:
        geo = new THREE.DodecahedronGeometry(3.0, 1);
        break;
      case 2:
        geo = new THREE.OctahedronGeometry(3.2, 0);
        break;
      case 3:
        geo = new THREE.SphereGeometry(2.6, 24, 24);
        break;
      case 4:
        geo = new THREE.BoxGeometry(3.5, 2.5, 2.0);
        break;
      case 5:
        geo = new THREE.ConeGeometry(2.8, 4.5, 6);
        break;
      case 6:
        geo = new THREE.TetrahedronGeometry(3.2, 0);
        break;
      case 7:
        geo = new THREE.IcosahedronGeometry(3.0, 0);
        break;
      case 8:
      default:
        geo = new THREE.SphereGeometry(2.8, 32, 32);
        break;
    }

    const mat = new THREE.MeshStandardMaterial({
      color: col,
      emissive: col,
      emissiveIntensity: 0.65,
      roughness: 0.2,
      metalness: 0.85
    });

    const mesh = new THREE.Mesh(geo, mat);

    if (id === 3) {
      const ringGeo = new THREE.RingGeometry(3.6, 5.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: col,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      mesh.add(ring);
    }

    return mesh;
  }

  createNodePinSprite(title, tag, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 340;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(20, 6, 32, 0.8)';
    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.roundRect(10, 10, 320, 80, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = colorHex;
    ctx.font = 'bold 18px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`✨ ${tag} ✨`, 170, 38);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Outfit", sans-serif';
    ctx.fillText(title, 170, 68);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending
    });

    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(16, 5, 1);
    return sprite;
  }

  // 5. Deep Space Background Starfield
  buildBackgroundStarfield() {
    const count = 4000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#ffd1dc'),
      new THREE.Color('#ff80ab'),
      new THREE.Color('#b388ff')
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 700 + Math.random() * 400;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.0,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });

    const starfield = new THREE.Points(geometry, material);
    this.scene.add(starfield);
  }

  // 6. Shooting Star / Comet System
  spawnShootingStar(isCustomWish = false, customWishText = '') {
    const startX = (Math.random() - 0.5) * 350;
    const startY = 100 + Math.random() * 80;
    const startZ = (Math.random() - 0.5) * 350;

    const dirX = (Math.random() - 0.5) * 220;
    const dirY = -(80 + Math.random() * 60);
    const dirZ = (Math.random() - 0.5) * 220;

    const headGeo = new THREE.SphereGeometry(isCustomWish ? 2.5 : 1.4, 16, 16);
    const headMat = new THREE.MeshBasicMaterial({
      color: isCustomWish ? 0xffffff : 0xff69b4,
      transparent: true,
      opacity: 1.0
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(startX, startY, startZ);
    this.scene.add(head);

    const tailPoints = [];
    for (let i = 0; i < 20; i++) {
      tailPoints.push(new THREE.Vector3(startX, startY, startZ));
    }
    const tailGeo = new THREE.BufferGeometry().setFromPoints(tailPoints);
    const tailMat = new THREE.LineBasicMaterial({
      color: isCustomWish ? 0xffd700 : 0xff2d75,
      transparent: true,
      opacity: 0.9,
      linewidth: 3,
      blending: THREE.AdditiveBlending
    });
    const tail = new THREE.Line(tailGeo, tailMat);
    this.scene.add(tail);

    if (window.romanticAudio) {
      window.romanticAudio.playShootingStarSound();
    }

    const starObj = {
      head,
      tail,
      tailPoints,
      currentPos: new THREE.Vector3(startX, startY, startZ),
      velocity: new THREE.Vector3(dirX, dirY, dirZ).normalize().multiplyScalar(isCustomWish ? 3.8 : 4.5),
      life: 0,
      maxLife: 1.6,
      isWish: isCustomWish,
      wishText: customWishText
    };

    this.shootingStars.push(starObj);
  }

  // 7. Raycasting & Interaction
  onPointerMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.checkHoverIntersection();
  }

  checkHoverIntersection() {
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const targetObjects = [];
    this.interactiveNodes.forEach(node => {
      if (node.isSprite) {
        targetObjects.push(node);
      } else if (node.isGroup) {
        node.children.forEach(c => targetObjects.push(c));
      }
    });

    const intersects = this.raycaster.intersectObjects(targetObjects, false);

    if (intersects.length > 0) {
      let hit = intersects[0].object;
      let nodeGroup = hit.parent && hit.parent.userData && hit.parent.userData.isInteractiveNode ? hit.parent : hit;

      if (this.hoveredNode !== nodeGroup) {
        this.resetHoveredNode();
        this.hoveredNode = nodeGroup;
        document.body.style.cursor = 'pointer';

        if (window.romanticAudio) {
          window.romanticAudio.playNodeHoverSound();
        }

        if (nodeGroup.isGroup) {
          new TWEEN.Tween(nodeGroup.scale)
            .to({ x: 1.35, y: 1.35, z: 1.35 }, 250)
            .easing(TWEEN.Easing.Back.Out)
            .start();
        } else if (nodeGroup.isSprite && nodeGroup.userData.originalScale) {
          const orig = nodeGroup.userData.originalScale;
          new TWEEN.Tween(nodeGroup.scale)
            .to({ x: orig.x * 1.25, y: orig.y * 1.25, z: orig.z }, 250)
            .easing(TWEEN.Easing.Back.Out)
            .start();
        }

        const title = nodeGroup.userData.memoryData ? nodeGroup.userData.memoryData.title : (nodeGroup.userData.text || "✨ Love Note ✨");
        if (window.auraUI) {
          window.auraUI.showHoverTooltip(title);
        }
      }
    } else {
      if (this.hoveredNode) {
        this.resetHoveredNode();
      }
    }
  }

  resetHoveredNode() {
    if (!this.hoveredNode) return;
    document.body.style.cursor = 'default';

    if (this.hoveredNode.isGroup) {
      new TWEEN.Tween(this.hoveredNode.scale)
        .to({ x: 1, y: 1, z: 1 }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    } else if (this.hoveredNode.isSprite && this.hoveredNode.userData.originalScale) {
      const orig = this.hoveredNode.userData.originalScale;
      new TWEEN.Tween(this.hoveredNode.scale)
        .to({ x: orig.x, y: orig.y, z: orig.z }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
    }

    if (window.auraUI) {
      window.auraUI.hideHoverTooltip();
    }
    this.hoveredNode = null;
  }

  onPointerClick(e) {
    if (e.target.closest('#welcome-screen') || e.target.closest('#memory-modal') || e.target.closest('#controls-dock') || e.target.closest('#music-player-card') || e.target.closest('#wish-modal') || e.target.closest('#instructions-modal')) {
      return;
    }

    if (this.hoveredNode) {
      this.handleNodeClick(this.hoveredNode);
    }
  }

  onTouchEnd(e) {
    if (e.changedTouches && e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      this.checkHoverIntersection();
      if (this.hoveredNode) {
        this.handleNodeClick(this.hoveredNode);
      }
    }
  }

  handleNodeClick(node) {
    if (window.romanticAudio) {
      window.romanticAudio.playNodeClickSound();
    }

    if (node.userData && node.userData.memoryData) {
      const mem = node.userData.memoryData;
      const targetPos = new THREE.Vector3();
      node.getWorldPosition(targetPos);

      const camOffset = targetPos.clone().normalize().multiplyScalar(24);
      camOffset.y += 10;

      this.animateCameraTo(
        targetPos.clone().add(camOffset),
        targetPos,
        1400,
        () => {
          if (window.auraUI) {
            window.auraUI.openMemoryModal(mem);
          }
        }
      );
    } else if (node.userData && node.userData.isTextNode) {
      const text = node.userData.text;
      if (window.auraUI) {
        window.auraUI.openRomanticTextModal(text);
      }
    }
  }

  // 8. Camera Animations
  animateCameraTo(destPos, destTarget, duration = 1200, onComplete = null) {
    if (this.currentCamTween) {
      this.currentCamTween.stop();
    }

    const startPos = this.camera.position.clone();
    const startTarget = this.controls.target.clone();

    this.controls.enabled = false;

    this.currentCamTween = new TWEEN.Tween({
      px: startPos.x, py: startPos.y, pz: startPos.z,
      tx: startTarget.x, ty: startTarget.y, tz: startTarget.z
    })
      .to({
        px: destPos.x, py: destPos.y, pz: destPos.z,
        tx: destTarget.x, ty: destTarget.y, tz: destTarget.z
      }, duration)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate((obj) => {
        this.camera.position.set(obj.px, obj.py, obj.pz);
        this.controls.target.set(obj.tx, obj.ty, obj.tz);
      })
      .onComplete(() => {
        this.controls.enabled = true;
        this.currentCamTween = null;
        if (onComplete) onComplete();
      })
      .start();
  }

  // Camera Presets
  viewFullGalaxy() {
    this.isCinematicTour = false;
    this.animateCameraTo(new THREE.Vector3(0, 150, 250), new THREE.Vector3(0, 5, 0), 1600);
  }

  viewCenterHeart() {
    this.isCinematicTour = false;
    this.animateCameraTo(new THREE.Vector3(0, 32, 68), new THREE.Vector3(0, 18, 0), 1500);
  }

  viewLoveMessages() {
    this.isCinematicTour = false;
    this.animateCameraTo(new THREE.Vector3(80, 55, 120), new THREE.Vector3(0, 15, 0), 1600);
  }

  toggleCinematicTour() {
    this.isCinematicTour = !this.isCinematicTour;
    if (this.isCinematicTour) {
      this.tourStep = 0;
      this.runNextTourStep();
    } else {
      if (this.tourTimer) clearTimeout(this.tourTimer);
      this.viewFullGalaxy();
    }
    return this.isCinematicTour;
  }

  runNextTourStep() {
    if (!this.isCinematicTour) return;

    const steps = [
      { pos: new THREE.Vector3(0, 40, 75), target: new THREE.Vector3(0, 18, 0), dur: 2200, hold: 3200 },
      { pos: new THREE.Vector3(120, 30, 80), target: new THREE.Vector3(60, 15, 0), dur: 2500, hold: 3000 },
      { pos: new THREE.Vector3(0, 220, 40), target: new THREE.Vector3(0, 0, 0), dur: 2800, hold: 3500 },
      { pos: new THREE.Vector3(-110, 45, 90), target: new THREE.Vector3(-20, 10, 0), dur: 2500, hold: 3000 },
      { pos: new THREE.Vector3(0, 130, 240), target: new THREE.Vector3(0, 10, 0), dur: 2600, hold: 3500 }
    ];

    const cur = steps[this.tourStep % steps.length];
    this.animateCameraTo(cur.pos, cur.target, cur.dur, () => {
      if (!this.isCinematicTour) return;
      this.tourTimer = setTimeout(() => {
        this.tourStep++;
        this.runNextTourStep();
      }, cur.hold);
    });
  }

  // 9. Main Animation Loop
  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    TWEEN.update();
    this.controls.update();

    // 1. Rotate Galaxy
    if (this.galaxyPoints) {
      this.galaxyPoints.rotation.y = elapsedTime * 0.045;
    }

    // 2. Animate Pulsing Particle Heart (Lub-Dub Heartbeat Rhythm)
    if (this.heartPoints && this.heartParticlesData.length > 0) {
      const beatCycle = 1.25;
      const cycleTime = elapsedTime % beatCycle;

      let pulseScale = 1.0;
      let lightIntensity = 2.8;

      if (cycleTime < 0.12) {
        const p = Math.sin((cycleTime / 0.12) * Math.PI);
        pulseScale = 1.0 + p * 0.16;
        lightIntensity = 2.8 + p * 2.5;
      } else if (cycleTime > 0.22 && cycleTime < 0.36) {
        const p = Math.sin(((cycleTime - 0.22) / 0.14) * Math.PI);
        pulseScale = 1.0 + p * 0.10;
        lightIntensity = 2.8 + p * 1.8;
      }

      const floatY = Math.sin(elapsedTime * 1.8) * 1.8;

      const posAttr = this.heartPoints.geometry.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < this.heartParticlesData.length; i++) {
        const i3 = i * 3;
        const d = this.heartParticlesData[i];

        const shimmer = Math.sin(elapsedTime * 3.0 + d.phase) * 0.2;

        arr[i3] = d.baseX * pulseScale + shimmer;
        arr[i3 + 1] = (d.baseY - 18) * pulseScale + 18 + floatY;
        arr[i3 + 2] = d.baseZ * pulseScale;
      }
      posAttr.needsUpdate = true;

      if (this.heartCoreLight) {
        this.heartCoreLight.intensity = lightIntensity;
        this.heartCoreLight.position.y = 18 + floatY;
      }

      if (this.heartHalo) {
        this.heartHalo.scale.set(pulseScale * 1.1, pulseScale * 1.1, 1);
        this.heartHalo.rotation.z = elapsedTime * 0.15;
      }
    }

    // 3. Orbit Floating Romantic Texts
    this.floatingTextSprites.forEach((sprite) => {
      const d = sprite.userData;
      const currentAngle = d.baseAngle + elapsedTime * d.speed;
      const x = Math.cos(currentAngle) * d.radius;
      const z = Math.sin(currentAngle) * d.radius;
      const y = d.baseY + Math.sin(elapsedTime * d.bobSpeed + d.phase) * 3.5;

      sprite.position.set(x, y, z);
    });

    // 4. Orbit Interactive Memory Nodes
    this.interactiveNodes.forEach((node) => {
      if (node.isGroup && node.userData.isInteractiveNode) {
        const d = node.userData;
        const currentAngle = d.baseAngle + elapsedTime * d.orbitSpeed;
        const x = Math.cos(currentAngle) * d.orbitRadius;
        const z = Math.sin(currentAngle) * d.orbitRadius;
        const y = d.baseY + Math.sin(elapsedTime * 1.6 + d.baseAngle) * 3.2;

        node.position.set(x, y, z);

        if (d.coreMesh) {
          d.coreMesh.rotation.y = elapsedTime * 0.8;
          d.coreMesh.rotation.x = elapsedTime * 0.5;
        }
        if (d.haloMesh) {
          d.haloMesh.rotation.y = -elapsedTime * 0.6;
        }
      }
    });

    // 5. Shooting Stars / Comets Update
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const star = this.shootingStars[i];
      star.life += delta;

      star.currentPos.add(star.velocity);
      star.head.position.copy(star.currentPos);

      star.tailPoints.unshift(star.currentPos.clone());
      if (star.tailPoints.length > 18) {
        star.tailPoints.pop();
      }
      star.tail.geometry.setFromPoints(star.tailPoints);

      const progress = star.life / star.maxLife;
      star.head.material.opacity = 1 - progress;
      star.tail.material.opacity = 1 - progress;

      if (star.life >= star.maxLife) {
        this.scene.remove(star.head);
        this.scene.remove(star.tail);
        star.head.geometry.dispose();
        star.tail.geometry.dispose();
        this.shootingStars.splice(i, 1);
      }
    }

    if (Math.random() < 0.006) {
      this.spawnShootingStar(false);
    }

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

window.auraGalaxy = new AuraGalaxyEngine();
