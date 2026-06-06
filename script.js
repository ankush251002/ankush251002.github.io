/* =============================================
   ANKUSH PORTFOLIO — SCRIPT
   Thunder splash intro, particle canvas,
   typewriter, scroll reveal, counters, nav.
   ============================================= */

// ═══════════════════════════════════════════
// THUNDER SPLASH INTRO
// ═══════════════════════════════════════════
(function initSplash() {
    const splash       = document.getElementById('splashScreen');
    const mainContent  = document.getElementById('mainContent');
    const flashOverlay = document.getElementById('flashOverlay');
    const sparkContainer = document.getElementById('sparkContainer');
    const splashLine1  = document.getElementById('splashLine1');
    const splashLine2  = document.getElementById('splashLine2');
    const splashTagline = document.getElementById('splashTagline');
    const splashLoader = document.getElementById('splashLoader');

    if (!splash || !mainContent) return;

    // Lock scrolling during splash
    document.body.style.overflow = 'hidden';

    const lightnings = document.querySelectorAll('.lightning');
    const cracks = document.querySelectorAll('.thunder-crack');

    // Create spark particles at random positions
    function createSparks(count, centerX, centerY) {
        for (let i = 0; i < count; i++) {
            const spark = document.createElement('div');
            spark.classList.add('spark');
            const angle = Math.random() * Math.PI * 2;
            const dist = 60 + Math.random() * 200;
            spark.style.left = centerX + 'px';
            spark.style.top = centerY + 'px';
            spark.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
            spark.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
            sparkContainer.appendChild(spark);
            // Trigger animation
            requestAnimationFrame(() => spark.classList.add('fly'));
            // Remove after animation
            setTimeout(() => spark.remove(), 900);
        }
    }

    // Flash the screen white (like a lightning flash)
    function flashScreen(intensity, duration) {
        flashOverlay.style.opacity = intensity;
        setTimeout(() => {
            flashOverlay.style.transition = `opacity ${duration}ms ease-out`;
            flashOverlay.style.opacity = '0';
            setTimeout(() => {
                flashOverlay.style.transition = '';
            }, duration);
        }, 50);
    }

    // Strike a lightning bolt
    function strikeLightning(index) {
        const bolt = lightnings[index];
        if (!bolt) return;
        // Remove any existing strike class
        bolt.classList.remove('strike');
        void bolt.offsetWidth; // reflow
        bolt.classList.add('strike');
    }

    // Flash a crack line
    function flashCrack(index) {
        const crack = cracks[index];
        if (!crack) return;
        crack.classList.remove('flash');
        void crack.offsetWidth;
        crack.classList.add('flash');
    }

    // ── ANIMATION TIMELINE ──
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Phase 1: First lightning strike (0.3s)
    setTimeout(() => {
        strikeLightning(0);
        flashScreen(0.6, 200);
        flashCrack(0);
        createSparks(15, vw * 0.25, vh * 0.3);
    }, 300);

    // Phase 2: Second strike (0.8s)
    setTimeout(() => {
        strikeLightning(1);
        flashScreen(0.8, 250);
        flashCrack(1);
        flashCrack(2);
        createSparks(20, vw * 0.7, vh * 0.35);
    }, 800);

    // Phase 3: Third strike — biggest flash (1.4s)
    setTimeout(() => {
        strikeLightning(2);
        strikeLightning(0);
        flashScreen(1, 350);
        flashCrack(3);
        flashCrack(0);
        createSparks(30, vw * 0.5, vh * 0.4);
    }, 1400);

    // Phase 4: Reveal text (2s)
    setTimeout(() => {
        splashLine1.classList.add('show');
    }, 2000);

    setTimeout(() => {
        splashLine2.classList.add('show');
    }, 2200);

    setTimeout(() => {
        splashTagline.classList.add('show');
    }, 2600);

    // Phase 5: Show loader (3s)
    setTimeout(() => {
        splashLoader.classList.add('show');
        const bar = splashLoader.querySelector('.splash-loader-bar');
        if (bar) bar.classList.add('loading');
    }, 3000);

    // Phase 6: Final flash + transition out (5s)
    setTimeout(() => {
        // One last dramatic flash
        flashScreen(0.5, 300);

        // Fade out splash
        splash.classList.add('fade-out');

        // Show main content
        mainContent.classList.remove('hidden');

        // Restore scrolling
        document.body.style.overflow = '';

        // Remove splash from DOM after transition
        setTimeout(() => {
            splash.remove();
        }, 1000);
    }, 5200);
})();


// ═══════════════════════════════════════════
// PARTICLE BACKGROUND
// ═══════════════════════════════════════════
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
        particles = Array.from({ length: count }, () => new Particle());
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(animationId);
        else animate();
    });

    window.addEventListener('resize', () => { init(); });
    init();
    animate();
})();


// ═══════════════════════════════════════════
// TYPEWRITER EFFECT
// ═══════════════════════════════════════════
(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = ['Data Analyst', 'Python', 'BI Dashboard Builder', 'SQL Enthusiast', 'Insight Storyteller'];
    let phraseIndex = 0, charIndex = 0;
    let isDeleting = false, delay = 100;

    function type() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            delay = 50;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            delay = 100;
        }
        if (!isDeleting && charIndex === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }
        setTimeout(type, delay);
    }

    // Delay start until after splash
    setTimeout(type, 5500);
})();


// ═══════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════
(function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
})();


// ═══════════════════════════════════════════
// SMOOTH SCROLLING
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// ═══════════════════════════════════════════
// STICKY NAVBAR
// ═══════════════════════════════════════════
(function initStickyNav() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    });
})();


// ═══════════════════════════════════════════
// ACTIVE NAV LINK HIGHLIGHT
// ═══════════════════════════════════════════
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(section => observer.observe(section));
})();


// ═══════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════
(function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => observer.observe(el));
})();


// ═══════════════════════════════════════════
// SKILL BAR ANIMATION
// ═══════════════════════════════════════════
(function initSkillBars() {
    const bars = document.querySelectorAll('.skill-progress');
    if (!bars.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                if (width) entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
})();


// ═══════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════
(function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                const duration = 1500;
                const start = performance.now();

                function step(timestamp) {
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target);
                    if (progress < 1) requestAnimationFrame(step);
                    else el.textContent = target;
                }

                requestAnimationFrame(step);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
})();


// ═══════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    });
})();
