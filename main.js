// main.js - UI Management, Modals, Audio Sync & User Interactions for Anas & Aura
class AuraUIManager {
  constructor() {
    // UI Elements
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.btnEnterGalaxy = document.getElementById('btn-enter-galaxy');
    this.hudContainer = document.getElementById('hud-container');

    // Memory Modal Elements
    this.memoryModal = document.getElementById('memory-modal');
    this.btnBackMemory = document.getElementById('btn-back-memory');
    this.memoryTitle = document.getElementById('modal-memory-title');
    this.memoryTag = document.getElementById('modal-memory-tag');
    this.memorySubtitle = document.getElementById('modal-memory-subtitle');
    this.memoryDate = document.getElementById('modal-memory-date');
    this.memoryNote = document.getElementById('modal-memory-note');
    this.memoryArtContainer = document.getElementById('modal-art-container');
    this.btnChangePhoto = document.getElementById('btn-change-photo');
    this.photoFileInput = document.getElementById('photo-file-input');

    // Tooltip
    this.hoverTooltip = document.getElementById('hover-tooltip');

    // Text Modal
    this.textModal = document.getElementById('text-modal');
    this.textModalContent = document.getElementById('text-modal-content');
    this.btnBackText = document.getElementById('btn-back-text');

    // Wish Modal
    this.wishModal = document.getElementById('wish-modal');
    this.btnOpenWish = document.getElementById('btn-open-wish');
    this.btnSubmitWish = document.getElementById('btn-submit-wish');
    this.btnCloseWish = document.getElementById('btn-close-wish');
    this.wishInput = document.getElementById('wish-input');
    this.wishesList = document.getElementById('wishes-list');

    // Audio Elements
    this.btnMusicToggle = document.getElementById('btn-music-toggle');
    this.volumeSlider = document.getElementById('volume-slider');
    this.visualizerBars = document.querySelectorAll('.visualizer-bar');
    this.btnUploadAudio = document.getElementById('btn-upload-audio');
    this.audioFileInput = document.getElementById('audio-file-input');

    // Dock Buttons
    this.btnFullGalaxy = document.getElementById('btn-full-galaxy');
    this.btnCenterHeart = document.getElementById('btn-center-heart');
    this.btnLoveMessages = document.getElementById('btn-love-messages');
    this.btnCinematicTour = document.getElementById('btn-cinematic-tour');
    this.btnAutoRotate = document.getElementById('btn-auto-rotate');
    this.btnHelp = document.getElementById('btn-help');
    this.instructionsModal = document.getElementById('instructions-modal');
    this.btnCloseHelp = document.getElementById('btn-close-help');

    // State
    this.currentMemoryId = null;
    this.customPhotos = {};
    this.savedWishes = [];
  }

  init() {
    this.bindEvents();
    this.setupAudioVisualizer();
    this.setupStardustCursor();
  }

  bindEvents() {
    // 1. Landing Screen Entry
    if (this.btnEnterGalaxy) {
      this.btnEnterGalaxy.addEventListener('click', () => this.enterGalaxy());
    }

    // 2. Memory Modal Back
    if (this.btnBackMemory) {
      this.btnBackMemory.addEventListener('click', () => this.closeMemoryModal());
    }

    // Light dismiss for modals
    [this.memoryModal, this.textModal, this.wishModal, this.instructionsModal].forEach(modal => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeAllModals();
        }
      });
    });

    // 3. Photo Upload / Customization for Memory
    if (this.btnChangePhoto && this.photoFileInput) {
      this.btnChangePhoto.addEventListener('click', () => this.photoFileInput.click());
      this.photoFileInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
    }

    // 4. Text Modal Back
    if (this.btnBackText) {
      this.btnBackText.addEventListener('click', () => {
        this.textModal.classList.remove('active');
        if (window.auraGalaxy) window.auraGalaxy.viewFullGalaxy();
      });
    }

    // 5. Wish Modal
    if (this.btnOpenWish) {
      this.btnOpenWish.addEventListener('click', () => {
        this.wishModal.classList.add('active');
        if (this.wishInput) this.wishInput.focus();
      });
    }

    if (this.btnCloseWish) {
      this.btnCloseWish.addEventListener('click', () => this.wishModal.classList.remove('active'));
    }

    if (this.btnSubmitWish) {
      this.btnSubmitWish.addEventListener('click', () => this.submitWish());
    }

    // 6. Audio Toggle & Controls
    if (this.btnMusicToggle) {
      this.btnMusicToggle.addEventListener('click', () => {
        if (window.romanticAudio) {
          const isPlaying = window.romanticAudio.toggle();
          this.updateMusicButtonState(isPlaying);
        }
      });
    }

    if (this.volumeSlider) {
      this.volumeSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (window.romanticAudio) {
          window.romanticAudio.setVolume(val);
        }
      });
    }

    if (this.btnUploadAudio && this.audioFileInput) {
      this.btnUploadAudio.addEventListener('click', () => this.audioFileInput.click());
      this.audioFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && window.romanticAudio) {
          window.romanticAudio.loadCustomAudioFile(file);
          this.updateMusicButtonState(true);
        }
      });
    }

    // 7. Dock Presets
    if (this.btnFullGalaxy) {
      this.btnFullGalaxy.addEventListener('click', () => {
        if (window.auraGalaxy) window.auraGalaxy.viewFullGalaxy();
      });
    }

    if (this.btnCenterHeart) {
      this.btnCenterHeart.addEventListener('click', () => {
        if (window.auraGalaxy) window.auraGalaxy.viewCenterHeart();
      });
    }

    if (this.btnLoveMessages) {
      this.btnLoveMessages.addEventListener('click', () => {
        if (window.auraGalaxy) window.auraGalaxy.viewLoveMessages();
      });
    }

    if (this.btnCinematicTour) {
      this.btnCinematicTour.addEventListener('click', () => {
        if (window.auraGalaxy) {
          const active = window.auraGalaxy.toggleCinematicTour();
          this.btnCinematicTour.classList.toggle('active', active);
        }
      });
    }

    if (this.btnAutoRotate) {
      this.btnAutoRotate.addEventListener('click', () => {
        if (window.auraGalaxy && window.auraGalaxy.controls) {
          window.auraGalaxy.controls.autoRotate = !window.auraGalaxy.controls.autoRotate;
          this.btnAutoRotate.classList.toggle('active', window.auraGalaxy.controls.autoRotate);
        }
      });
    }

    if (this.btnHelp) {
      this.btnHelp.addEventListener('click', () => {
        this.instructionsModal.classList.add('active');
      });
    }

    if (this.btnCloseHelp) {
      this.btnCloseHelp.addEventListener('click', () => {
        this.instructionsModal.classList.remove('active');
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  // 1. Enter Galaxy Transition
  enterGalaxy() {
    if (window.romanticAudio) {
      window.romanticAudio.playCelestialEnter();
      window.romanticAudio.play();
      this.updateMusicButtonState(true);
    }

    this.welcomeScreen.classList.add('fade-out');
    setTimeout(() => {
      this.welcomeScreen.style.display = 'none';
      if (this.hudContainer) {
        this.hudContainer.classList.add('visible');
      }
    }, 900);

    if (window.auraGalaxy) {
      window.auraGalaxy.animateCameraTo(
        new THREE.Vector3(0, 140, 240),
        new THREE.Vector3(0, 10, 0),
        2000
      );
    }
  }

  // 2. Open Memory Modal with rich animation
  openMemoryModal(mem) {
    this.currentMemoryId = mem.id;
    this.memoryTitle.textContent = mem.title;
    this.memoryTag.textContent = mem.tag;
    this.memorySubtitle.textContent = mem.subtitle;
    this.memoryDate.textContent = `💫 ${mem.dateText}`;
    this.memoryNote.textContent = mem.note;

    if (this.customPhotos[mem.id]) {
      this.memoryArtContainer.innerHTML = `<img src="${this.customPhotos[mem.id]}" alt="${mem.title}" class="memory-custom-photo" />`;
    } else {
      this.memoryArtContainer.innerHTML = mem.svgArt;
    }

    this.memoryModal.classList.add('active');
  }

  closeMemoryModal() {
    this.memoryModal.classList.remove('active');
    if (window.auraGalaxy) {
      window.auraGalaxy.viewFullGalaxy();
    }
  }

  handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file || !this.currentMemoryId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      this.customPhotos[this.currentMemoryId] = dataUrl;
      this.memoryArtContainer.innerHTML = `<img src="${dataUrl}" alt="Anas & Aura Memory Photo" class="memory-custom-photo" />`;
    };
    reader.readAsDataURL(file);
  }

  // 3. Open Romantic Floating Text Modal
  openRomanticTextModal(phrase) {
    const romanticQuotes = {
      "Anas ❤️ Aura": "A love written across the stars long before our paths crossed. You are my greatest adventure and my safest haven, Aura. With all my soul, Anas.",
      "You Are My Galaxy": "You are not merely a single star in my sky; you are my entire breathtaking cosmos. Everywhere I turn, your light illuminates my path. Forever yours, Anas.",
      "Endless Love": "Each day I discover infinite new reasons to love you even more. A bond that knows no bounds, no limits, and will never fade across all eternity. Always, Anas.",
      "Aura, My Everything": "Your name signifies that radiant, majestic cosmic halo—and you are truly the radiant light that surrounds my entire existence with joy and peace. Devotedly, Anas.",
      "My Heart Beats For You": "Every single pulse of this heart carries your name. You are my rhythm, my melody, and my reason to smile every morning. Love always, Anas.",
      "Two Souls, One Heart": "We are two souls intertwined across space and time, beating as one single eternal heart. Bound together forever, Anas & Aura."
    };

    const quote = romanticQuotes[phrase] || "You are the most beautiful blessing in my universe, and being with you is my eternal joy. Forever yours, Anas.";

    this.textModalContent.innerHTML = `
      <div class="text-modal-badge">✨ A Whisper of Love from Anas to Aura ✨</div>
      <h2 class="text-modal-title">${phrase}</h2>
      <p class="text-modal-quote">${quote}</p>
      <div class="text-modal-signature">With all my love &amp; devotion, Anas ❤️ Aura</div>
    `;

    this.textModal.classList.add('active');
  }

  // 4. Submit Wish & Launch Comet
  submitWish() {
    const text = this.wishInput ? this.wishInput.value.trim() : '';
    if (!text) return;

    this.savedWishes.push(text);
    this.renderWishesList();

    if (window.auraGalaxy) {
      window.auraGalaxy.spawnShootingStar(true, text);
    }

    this.wishInput.value = '';
    this.wishModal.classList.remove('active');

    this.showToast(`✨ Your cosmic wish was launched across our galaxy: "${text}"`);
  }

  renderWishesList() {
    if (!this.wishesList) return;
    this.wishesList.innerHTML = this.savedWishes.map((w) => `
      <div class="wish-item">
        <span class="wish-icon">💫</span>
        <span class="wish-text">${w}</span>
      </div>
    `).join('');
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'aura-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('visible');
    }, 50);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  closeAllModals() {
    [this.memoryModal, this.textModal, this.wishModal, this.instructionsModal].forEach(m => {
      if (m) m.classList.remove('active');
    });
  }

  // 5. Tooltip tracking
  showHoverTooltip(text) {
    if (!this.hoverTooltip) return;
    this.hoverTooltip.textContent = text;
    this.hoverTooltip.classList.add('visible');
  }

  hideHoverTooltip() {
    if (!this.hoverTooltip) return;
    this.hoverTooltip.classList.remove('visible');
  }

  // 6. Audio Visualizer Pulse
  setupAudioVisualizer() {
    if (window.romanticAudio) {
      window.romanticAudio.onVisualizerUpdate((isPlaying) => {
        this.updateMusicButtonState(isPlaying);
      });
    }
  }

  updateMusicButtonState(isPlaying) {
    if (this.btnMusicToggle) {
      this.btnMusicToggle.classList.toggle('playing', isPlaying);
      const icon = this.btnMusicToggle.querySelector('.music-icon');
      if (icon) {
        icon.textContent = isPlaying ? '⏸️' : '🎵';
      }
    }
    if (this.visualizerBars) {
      this.visualizerBars.forEach(bar => {
        bar.classList.toggle('active', isPlaying);
      });
    }
  }

  // 7. Interactive Stardust Cursor Effect
  setupStardustCursor() {
    const canvas = document.createElement('canvas');
    canvas.id = 'stardust-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '50';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const colors = ['#ff2d75', '#ff80ab', '#ffffff', '#b388ff', '#ffd1dc'];

    window.addEventListener('pointermove', (e) => {
      if (this.hoverTooltip && this.hoverTooltip.classList.contains('visible')) {
        this.hoverTooltip.style.left = `${e.clientX + 16}px`;
        this.hoverTooltip.style.top = `${e.clientY + 16}px`;
      }

      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 2.8 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          decay: Math.random() * 0.025 + 0.015
        });
      }
      if (particles.length > 90) particles.splice(0, 15);
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(render);
    };

    render();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.auraUI = new AuraUIManager();
  window.auraUI.init();

  if (window.auraGalaxy) {
    window.auraGalaxy.init();
  }
});
