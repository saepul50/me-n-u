/* ============================================
   ANNIVERSARY WEBSITE — SCRIPT.JS
   With photos, videos, and interactive love animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const startScreen    = document.getElementById('start-screen');
  const startBtn       = document.getElementById('start-btn');
  const mainContent    = document.getElementById('main-content');
  const audio          = document.getElementById('bg-music');
  const musicToggle    = document.getElementById('music-toggle');
  const scrollProgress = document.getElementById('scroll-progress');
  const heartsCanvas   = document.getElementById('hearts-canvas');
  const ctx            = heartsCanvas.getContext('2d');

  const RELATIONSHIP_START = new Date('2025-02-14T00:00:00');

  const LOVE_MESSAGES = [
    'nisul', 'nangisan', 'endek 💕',
    'my 💖', 'mboh 🥰', '"Oke" ✨',
    'Seng 🌸'
  ];

  const LYRICS = [
    { time: 30.0, text: "I watch the sunrise on the coastline," },
    { time: 33.9, text: "As we both grow old." },
    { time: 37.5, text: "I can't put into words what I feel," },
    { time: 41.6, text: "All I know is we are going back home." },
    { time: 45.4, text: "So please don't let me go," },
    { time: 49.2, text: "Don't let me go..." },
    { time: 53.2, text: "And if it's right, I don't care how long it takes," },
    { time: 60.7, text: "As long as I'm right here with you," },
    { time: 64.2, text: "A smile won't leave my face." },
    { time: 68.1, text: "Save your tears, it'll be alright," },
    { time: 72.1, text: "All that I know is you're here, with me." },
    { time: 79.9, text: "I look to the sunrise while we grow old, oh-oh..." },
    { time: 87.7, text: "I can't put it into words, oh-oh..." },
    { time: 91.8, text: "I'd like to live every memory of you" },
    { time: 95.5, text: "One more time before you disappear into the wind." },
    { time: 99.5, text: "And all the time that we spent," },
    { time: 103.3, text: "Waiting for the moment when the light would take us," },
    { time: 107.2, text: "Those were the best moments of my life." },
    { time: 111.0, text: "I don't care how long it takes," },
    { time: 118.7, text: "As long as I'm right here with you," },
    { time: 122.3, text: "A smile won't leave my face." },
    { time: 126.1, text: "It'll be alright, just don't cry," },
    { time: 130.2, text: "Cause you're here, you're with me..." },
    { time: 134.0, text: "I can't put it into words..." }
  ];

  /* ========== STATE ========== */
  let isPlaying = false;
  let hearts = [];
  let mouseX = 0, mouseY = 0;
  let lastTrailTime = 0;
  let longPressTimer = null;
  let isMobile = window.matchMedia('(max-width: 768px)').matches;
  let lastLyricTime = -1;

  /* ========== CUSTOM CURSOR ========== */
  const customCursor = document.createElement('div');
  customCursor.className = 'custom-cursor';
  customCursor.textContent = '💙';
  if (!isMobile) document.body.appendChild(customCursor);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMobile) {
      customCursor.style.left = mouseX + 'px';
      customCursor.style.top = mouseY + 'px';
      customCursor.classList.add('active'); // show only after first move
    }
    const now = Date.now();
    if (now - lastTrailTime > 45) {
      createSparkle(mouseX, mouseY);
      lastTrailTime = now;
    }
  });

  /* ========== SPARKLE TRAIL ========== */
  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    const size = 3 + Math.random() * 6;
    const colors = ['#60a5fa', '#8fd3ff', '#2563eb', '#38bdf8', '#dff4ff'];
    sparkle.style.cssText = `
      left:${x + (Math.random()-0.5)*20}px;
      top:${y + (Math.random()-0.5)*20}px;
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      box-shadow:0 0 ${size}px ${colors[Math.floor(Math.random()*colors.length)]};
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
  }

  /* ========== CLICK BURST ========== */
  document.addEventListener('click', (e) => {
    if (e.target.closest('.photo-grid-item') || e.target.closest('.lightbox') || e.target.closest('.music-toggle') || e.target.closest('.start-button') || e.target.closest('.video-play-overlay')) {
      return;
    }
    createClickBurst(e.clientX, e.clientY);
    createRipple(e.clientX, e.clientY);
  });

  function createClickBurst(x, y) {
    const emojis = ['❤️', '💙', '💖', '💕', '💗', '✨', '🌸', '💫'];
    const count = 6 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'burst-heart';
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = (Math.PI * 2 / count) * i + (Math.random()-0.5)*0.5;
      const dist = 40 + Math.random() * 80;
      heart.style.cssText = `
        left:${x}px; top:${y}px;
        font-size:${14 + Math.random()*14}px;
        --bx:${Math.cos(angle)*dist}px;
        --by:${Math.sin(angle)*dist}px;
        --br:${(Math.random()-0.5)*360}deg;
      `;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1400);
    }
  }

  function createRipple(x, y) {
    const r = document.createElement('div');
    r.className = 'love-ripple';
    r.style.left = x + 'px'; r.style.top = y + 'px';
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 1000);
  }

  /* ========== DOUBLE CLICK ========== */
  document.addEventListener('dblclick', (e) => {
    if (e.target.closest('.photo-grid-item') || e.target.closest('.lightbox') || e.target.closest('.music-toggle') || e.target.closest('.start-button') || e.target.closest('.video-play-overlay')) {
      return;
    }

    const msg = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)];
    const popup = document.createElement('div');
    popup.className = 'love-popup';
    popup.textContent = msg;
    popup.style.left = e.clientX + 'px';
    popup.style.top = e.clientY + 'px';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2500);
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createClickBurst(
        e.clientX + (Math.random()-0.5)*60,
        e.clientY + (Math.random()-0.5)*60
      ), i * 150);
    }
  });

  /* ========== LONG PRESS ========== */
  const loveMeter = document.createElement('div');
  loveMeter.className = 'love-meter';
  document.body.appendChild(loveMeter);

  function startLongPress(x, y) {
    loveMeter.style.left = x + 'px'; loveMeter.style.top = y + 'px';
    loveMeter.classList.add('active');
    longPressTimer = setTimeout(() => {
      loveMeter.classList.remove('active');
      createLoveExplosion(x, y);
    }, 1000);
  }
  function endLongPress() {
    clearTimeout(longPressTimer);
    loveMeter.classList.remove('active');
  }

  document.addEventListener('mousedown', (e) => startLongPress(e.clientX, e.clientY));
  document.addEventListener('mouseup', endLongPress);
  document.addEventListener('touchstart', (e) => {
    const t = e.touches[0]; startLongPress(t.clientX, t.clientY);
  }, { passive: true });
  document.addEventListener('touchend', endLongPress, { passive: true });

  function createLoveExplosion(x, y) {
    const glow = document.createElement('div');
    glow.className = 'love-explosion';
    glow.style.left = x + 'px'; glow.style.top = y + 'px';
    document.body.appendChild(glow);
    setTimeout(() => glow.remove(), 1000);
    for (let w = 0; w < 3; w++) {
      setTimeout(() => createClickBurst(x+(Math.random()-0.5)*30, y+(Math.random()-0.5)*30), w*200);
    }
    const popup = document.createElement('div');
    popup.className = 'love-popup';
    popup.textContent = '💙 luv u 💙';
    popup.style.left = x + 'px'; popup.style.top = (y-30) + 'px';
    popup.style.fontSize = '1.4rem';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2500);
  }

  /* ========== CARD PARALLAX ========== */
  function initCardParallax() {
    document.querySelectorAll('.story-card').forEach(card => {
      const glow = document.createElement('div');
      glow.className = 'card-glow';
      card.appendChild(glow);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width/2) / (rect.width/2);
        const dy = (e.clientY - rect.top - rect.height/2) / (rect.height/2);
        card.style.transform = `perspective(800px) rotateX(${dy*-5}deg) rotateY(${dx*5}deg) scale(1.02)`;
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';
      });

      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ========== STARS ========== */
  function createStars() {
    const container = document.querySelector('.particles-container');
    for (let i = 0; i < 25; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random()*100 + 'vw';
      star.style.top = Math.random()*100 + 'vh';
      star.style.setProperty('--twinkle-dur', (2+Math.random()*4)+'s');
      star.style.animationDelay = Math.random()*5 + 's';
      const s = 2+Math.random()*3;
      star.style.width = s+'px'; star.style.height = s+'px';
      container.appendChild(star);
    }
  }

  function createStartStars() {
    for (let i = 0; i < 60; i++) {
      const star = document.createElement('div');
      star.className = 'start-star';
      star.style.left = Math.random()*100+'%';
      star.style.top = Math.random()*100+'%';
      star.style.animationDelay = Math.random()*3+'s';
      star.style.animationDuration = (1.5+Math.random()*2.5)+'s';
      const s = 1+Math.random()*3;
      star.style.width = s+'px'; star.style.height = s+'px';
      startScreen.appendChild(star);
    }
  }

  /* ========== SAKURA PETALS ========== */
  function createSakuraPetals() {
    const container = document.querySelector('.particles-container');
    const petals = ['🌸', '🩷', '✿', '❀', '🪻'];
    setInterval(() => {
      if (document.querySelectorAll('.sakura-petal').length > 8) return;
      const petal = document.createElement('span');
      petal.className = 'sakura-petal';
      petal.textContent = petals[Math.floor(Math.random()*petals.length)];
      petal.style.left = Math.random()*100+'vw';
      petal.style.fontSize = (0.8+Math.random()*1.2)+'rem';
      petal.style.animationDuration = (10+Math.random()*10)+'s';
      petal.style.setProperty('--sway', (60+Math.random()*120)*(Math.random()>0.5?1:-1)+'px');
      container.appendChild(petal);
      setTimeout(() => petal.remove(), parseFloat(petal.style.animationDuration)*1000);
    }, 3000);
  }

  /* ========== LIGHTBOX ========== */
  function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Tutup foto">✕</button>
      <button class="lightbox-nav-btn lightbox-prev" aria-label="Foto sebelumnya">‹</button>
      <img class="lightbox-img" src="" alt="Foto" />
      <button class="lightbox-nav-btn lightbox-next" aria-label="Foto berikutnya">›</button>
    `;
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-prev');
    const lbNext = lightbox.querySelector('.lightbox-next');
    const galleryItems = Array.from(document.querySelectorAll('.photo-grid-item'));
    const galleryImages = galleryItems.map(item => item.querySelector('img'));

    let currentIndex = 0;

    function openLightbox(index) {
      if (!galleryImages.length) return;
      currentIndex = (index + galleryImages.length) % galleryImages.length;
      const currentImg = galleryImages[currentIndex];
      if (currentImg) {
        lbImg.src = currentImg.src;
        lbImg.alt = currentImg.alt || 'Foto';
        lightbox.classList.add('active');
        document.body.classList.add('lightbox-open');
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.classList.remove('lightbox-open');
    }

    galleryItems.forEach((item, index) => {
      const img = item.querySelector('img');

      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(index);
      });

      if (img) {
        img.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openLightbox(index);
        });
      }
    });

    lbClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    lbPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentIndex - 1);
    });

    lbNext.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(currentIndex + 1);
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        e.stopPropagation();
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        openLightbox(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        openLightbox(currentIndex + 1);
      }
    });
  }

  /* ========== VIDEO AUTOPLAY ON SCROLL ========== */
  function initVideoAutoplay() {
    const videos = document.querySelectorAll('.story-video[data-autoplay]');

    // IntersectionObserver: play when visible, pause when not
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        const overlay = video.parentElement.querySelector('.video-play-overlay');
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          const tryPlay = () => {
            video.play().then(() => {
              if (overlay) overlay.classList.add('hidden');
            }).catch(() => {
              // Retry once after metadata loads
              video.addEventListener('loadedmetadata', () => {
                video.play().then(() => {
                  if (overlay) overlay.classList.add('hidden');
                }).catch(() => {});
              }, { once: true });
            });
          };
          tryPlay();
        } else {
          video.pause();
          if (overlay) overlay.classList.remove('hidden');
        }
      });
    }, { threshold: [0.2] });

    // Click overlay to play/pause
    document.querySelectorAll('.video-play-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        const video = overlay.parentElement.querySelector('video');
        if (!video) return;
        if (video.paused) {
          video.play().then(() => overlay.classList.add('hidden')).catch(() => {});
        } else {
          video.pause();
          overlay.classList.remove('hidden');
        }
      });
    });

    // Click on video to pause
    videos.forEach(video => {
      video.addEventListener('click', (e) => {
        e.stopPropagation();
        const overlay = video.parentElement.querySelector('.video-play-overlay');
        if (!video.paused) {
          video.pause();
          if (overlay) overlay.classList.remove('hidden');
        } else {
          video.play().then(() => { if (overlay) overlay.classList.add('hidden'); }).catch(() => {});
        }
      });

      // Trim end: loop back before last N seconds
      const trimEnd = parseFloat(video.dataset.trimEnd);
      if (trimEnd > 0) {
        video.addEventListener('timeupdate', () => {
          if (video.duration && video.currentTime >= video.duration - trimEnd) {
            video.currentTime = 0;
          }
        });
      }

      videoObserver.observe(video);
    });
  }

  /* ========== LETTER ANIMATION ========== */
  function initLetterAnimation() {
    document.querySelectorAll('.section-title').forEach(title => {
      const text = title.textContent;
      title.innerHTML = '';
      let ci = 0;
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        span.style.animationDelay = (0.5 + ci * 0.03) + 's';
        if (text[i] !== ' ') ci++;
        title.appendChild(span);
      }
    });
  }

  /* ========== PRELOAD ALL MEDIA + LOADING SCREEN ========== */
  const loadingScreen  = document.getElementById('loading-screen');
  const loadingBar     = document.getElementById('loading-bar');
  const loadingPercent = document.getElementById('loading-percent');

  function preloadAllMedia(onComplete) {
    const imageSrcs = [
      'assets/images/oii.jpeg',
      'assets/images/oii1.jpeg',
      'assets/images/oii2.jpeg',
      'assets/images/oii3.jpeg',
      'assets/images/oii4.jpeg',
      'assets/images/oii.jpeg' 
    ];
    const videoEls = Array.from(document.querySelectorAll('.story-video'));

    const total = imageSrcs.length + videoEls.length;
    let loaded = 0;

    function tick() {
      loaded++;
      const pct = Math.round((loaded / total) * 100);
      loadingBar.style.width = pct + '%';
      loadingPercent.textContent = pct + '%';
      if (loaded >= total) {
        // Semua media sudah siap — sembunyikan layar loading
        setTimeout(() => {
          loadingScreen.classList.add('fade-out');
          setTimeout(() => {
            loadingScreen.classList.remove('active', 'fade-out');
            loadingScreen.style.display = 'none';
            onComplete();
          }, 800);
        }, 300);
      }
    }

    // Memuat foto
    imageSrcs.forEach(src => {
      const img = new Image();
      img.onload  = tick;
      img.onerror = tick; // не блокируем если файл не найден
      img.src = src;
    });

    // Memuat video (menunggu canplaythrough)
    videoEls.forEach(video => {
      video.preload = 'auto';
      if (video.readyState >= 3) { // уже готово
        tick();
        return;
      }
      const onReady = () => {
        video.removeEventListener('canplaythrough', onReady);
        video.removeEventListener('error', onReady);
        tick();
      };
      video.addEventListener('canplaythrough', onReady, { once: true });
      video.addEventListener('error', onReady, { once: true });
      video.load();
    });
  }

  /* ========== START BUTTON ========== */
  startBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    // Sembunyikan layar awal, tampilkan layar loading
    startScreen.classList.add('hidden');
    setTimeout(() => { startScreen.style.display = 'none'; }, 900);

    loadingScreen.classList.add('active');

    // Mulai memuat semua media dan tunggu sampai selesai
    preloadAllMedia(() => {
      // Semua media siap → tampilkan konten
      mainContent.classList.add('visible');
      playMusic();
      musicToggle.classList.add('visible');
      initScrollObserver();
      initHeartsCanvas();
      updateTimer();
      setInterval(updateTimer, 1000);
      createSakuraPetals();
      createStars();
      initLetterAnimation();
      initLightbox();
      initVideoAutoplay();
      setTimeout(initCardParallax, 500);
    });
  });

  /* ========== MUSIC ========== */
  function playMusic() {
    audio.volume = 0.35;
    audio.play().then(() => {
      isPlaying = true;
      musicToggle.classList.add('playing');
    }).catch(err => console.log('Auto-play blocked:', err));
  }

  musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audio.pause(); isPlaying = false;
      musicToggle.classList.remove('playing');
    } else {
      audio.play(); isPlaying = true;
      musicToggle.classList.add('playing');
    }
  });

  /* ========== FLOATING LYRICS LOGIC ========== */
  audio.addEventListener('timeupdate', () => {
    const ct = audio.currentTime;
    // Find the lyric that should be shown now
    const currentLyric = LYRICS.find(l => ct >= l.time && ct < l.time + 0.5);
    
    if (currentLyric && currentLyric.time !== lastLyricTime) {
      lastLyricTime = currentLyric.time;
      showFloatingLyric(currentLyric.text);
    }
    
    // Reset if audio is restarted or jumped back
    if (ct < lastLyricTime) lastLyricTime = -1;
  });

  function showFloatingLyric(text) {
    const lyricEl = document.createElement('div');
    lyricEl.className = 'floating-lyric';
    lyricEl.textContent = text;
    
    // Use random top/left directly to ensure bounds
    const startX = 15 + Math.random() * 50; // 15% to 65%
    const startY = 20 + Math.random() * 60; // 20% to 80%
    
    lyricEl.style.left = startX + '%';
    lyricEl.style.top = startY + '%';
    
    // Generate small relative drifting shifts
    const x1 = 0, y1 = 0;
    const x2 = (Math.random() - 0.5) * 15;
    const y2 = (Math.random() - 0.5) * 15;
    const x3 = x2 + (Math.random() - 0.5) * 15;
    const y3 = y2 + (Math.random() - 0.5) * 15;
    const x4 = x3 + (Math.random() - 0.5) * 15;
    const y4 = y3 + (Math.random() - 0.5) * 15;

    // Random rotations
    const r1 = (Math.random() - 0.5) * 15;
    const r2 = (Math.random() - 0.5) * 10;
    const r3 = (Math.random() - 0.5) * 10;
    const r4 = (Math.random() - 0.5) * 15;

    // Set CSS variables
    lyricEl.style.setProperty('--move-x1', `${x1}px`);
    lyricEl.style.setProperty('--move-y1', `${y1}px`);
    lyricEl.style.setProperty('--move-x2', `${x2}px`);
    lyricEl.style.setProperty('--move-y2', `${y2}px`);
    lyricEl.style.setProperty('--move-x3', `${x3}px`);
    lyricEl.style.setProperty('--move-y3', `${y3}px`);
    lyricEl.style.setProperty('--move-x4', `${x4}px`);
    lyricEl.style.setProperty('--move-y4', `${y4}px`);

    lyricEl.style.setProperty('--rot1', `${r1}deg`);
    lyricEl.style.setProperty('--rot2', `${r2}deg`);
    lyricEl.style.setProperty('--rot3', `${r3}deg`);
    lyricEl.style.setProperty('--rot4', `${r4}deg`);
    
    document.body.appendChild(lyricEl);
    setTimeout(() => lyricEl.remove(), 8000);
  }

  /* ========== SCROLL PROGRESS ========== */
  window.addEventListener('scroll', () => {
    const progress = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (progress > 0 ? (window.scrollY / progress) * 100 : 0) + '%';
  });

  /* ========== SCROLL OBSERVER ========== */
  function initScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // For photo grid items with delay
          const delay = entry.target.dataset.delay;
          if (delay) {
            setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
          } else {
            entry.target.classList.add('visible');
          }
        }
      });
    }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

    document.querySelectorAll(
      '.story-card, .photo-grid-title, .photo-grid-item, .video-card, .timer-title, .timer-container, .final-content, .final-photo-wrapper'
    ).forEach(el => observer.observe(el));
  }

  /* ========== TIMER ========== */
  function updateTimer() {
    const diff = Date.now() - RELATIONSHIP_START.getTime();
    if (diff < 0) return;
    const ts = Math.floor(diff / 1000);
    animateTimerValue('timer-days',  Math.floor(ts / 86400));
    animateTimerValue('timer-hours', Math.floor((ts % 86400) / 3600));
    animateTimerValue('timer-mins',  Math.floor((ts % 3600) / 60));
    animateTimerValue('timer-secs',  ts % 60);
  }

  function animateTimerValue(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    const s = String(val);
    if (el.textContent !== s) {
      el.textContent = s;
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
    }
  }

  /* ========== HEARTS CANVAS ========== */
  function initHeartsCanvas() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setInterval(spawnHeart, 1200);
    animateHeartsLoop();
  }

  function resizeCanvas() {
    heartsCanvas.width = window.innerWidth;
    heartsCanvas.height = window.innerHeight;
  }

  function spawnHeart() {
    if (hearts.length > 25) return;
    hearts.push({
      x: Math.random() * heartsCanvas.width,
      y: heartsCanvas.height + 20,
      size: 10 + Math.random() * 18,
      speedY: 0.4 + Math.random() * 1.0,
      speedX: (Math.random()-0.5) * 0.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobbleAmp: 0.3 + Math.random() * 0.7,
      opacity: 0.15 + Math.random() * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random()-0.5) * 0.02,
      color: ['#2563eb','#60a5fa','#38bdf8','#3b82f6','#8fd3ff','#7dd3fc'][Math.floor(Math.random()*6)]
    });
  }

  function drawHeart(x, y, size, rotation, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 0.6;
    ctx.fillStyle = color;
    ctx.beginPath();
    const s = size / 15;
    ctx.moveTo(0, -s*3);
    ctx.bezierCurveTo(-s*7.5, -s*12, -s*15, -s*1.5, 0, s*9);
    ctx.bezierCurveTo(s*15, -s*1.5, s*7.5, -s*12, 0, -s*3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animateHeartsLoop() {
    ctx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
    hearts = hearts.filter(h => {
      h.y -= h.speedY;
      h.wobble += h.wobbleSpeed;
      h.x += h.speedX + Math.sin(h.wobble) * h.wobbleAmp;
      h.rotation += h.rotSpeed;
      h.opacity -= 0.0008;
      if (h.y < -40 || h.opacity <= 0) return false;
      // Attract toward cursor
      const dx = mouseX - h.x, dy = mouseY - h.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 200 && dist > 0) {
        h.x += dx * 0.003;
        h.y += dy * 0.003;
      }
      drawHeart(h.x, h.y, h.size, h.rotation, h.color, h.opacity);
      return true;
    });
    requestAnimationFrame(animateHeartsLoop);
  }

  /* ========== MOBILE SHAKE ========== */
  let lastShakeTime = 0, lastAccel = { x:0, y:0, z:0 };
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const delta = Math.abs(acc.x-lastAccel.x) + Math.abs(acc.y-lastAccel.y) + Math.abs(acc.z-lastAccel.z);
      lastAccel = { x:acc.x||0, y:acc.y||0, z:acc.z||0 };
      if (delta > 25 && Date.now() - lastShakeTime > 800) {
        lastShakeTime = Date.now();
        createLoveExplosion(window.innerWidth/2, window.innerHeight/2);
      }
    });
  }

  /* ========== INIT ========== */
  createStartStars();
});
