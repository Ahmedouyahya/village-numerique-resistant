/* ========================================
   LE VILLAGE NUMÉRIQUE RÉSISTANT - NIRD
   Nuit de l'Info 2025
   Script Principal - Version Améliorée
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des modules
    initLoader();
    initCustomCursor();
    initThemeToggle();
    initNavbar();
    initBackToTop();
    initParticles();
    initStars();
    initTypingEffect();
    initCountdown();
    initCounterAnimation();
    initVillageMap();
    initCalculator();
    initQuiz();
    initSolutionsFilter();
    initTestimonialSlider();
    initSmoothScroll();
    initScrollAnimations();
    initImpactStats();
});

/* ========================================
   LOADER
   ======================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });

    setTimeout(() => {
        loader.classList.add('hidden');
    }, 3000);
}

/* ========================================
   THEME TOGGLE (DARK/LIGHT MODE)
   ======================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (!themeToggle) return;

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        if (isLight) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    if (!cursor || !follower) return;
    
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .building, .solution-card, .pillar-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100));

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ========================================
   STARS BACKGROUND
   ======================================== */
function initStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
            animation-duration: ${Math.random() * 2 + 1}s;
        `;
        starsContainer.appendChild(star);
    }
}

/* ========================================
   TYPING EFFECT
   ======================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = ['Numérique Résistant', 'Libre et Souverain', 'Inclusif et Durable', 'Open Source'];
    let phraseIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.innerHTML = currentPhrase.substring(0, charIndex - 1) + '<span class="typing-cursor">|</span>';
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.innerHTML = currentPhrase.substring(0, charIndex + 1) + '<span class="typing-cursor">|</span>';
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }
    type();
}

/* ========================================
   COUNTDOWN - TIME SINCE WINDOWS 10 END
   ======================================== */
function initCountdown() {
    const endDate = new Date('October 14, 2025 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = now - endDate; // Time SINCE the date (reversed)

        // If date hasn't passed yet (shouldn't happen but just in case)
        if (distance < 0) {
            const remaining = Math.abs(distance);
            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            updateDisplay(days, hours, minutes, seconds);
            return;
        }

        // Time since Windows 10 end of support
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateDisplay(days, hours, minutes, seconds);
    }

    function updateDisplay(days, hours, minutes, seconds) {
        const daysEl = document.getElementById('countdown-days');
        const hoursEl = document.getElementById('countdown-hours');
        const minutesEl = document.getElementById('countdown-minutes');
        const secondsEl = document.getElementById('countdown-seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(3, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ========================================
   CALCULATEUR D'ÉCONOMIES
   ======================================== */
function initCalculator() {
    const nbComputersInput = document.getElementById('nbComputers');
    const nbComputersSlider = document.getElementById('nbComputersSlider');
    const avgAgeInput = document.getElementById('avgAge');
    const avgAgeSlider = document.getElementById('avgAgeSlider');
    const officeUsersInput = document.getElementById('officeUsers');
    const officeUsersSlider = document.getElementById('officeUsersSlider');
    const calculateBtn = document.getElementById('calculateBtn');

    if (!calculateBtn) return;

    // Sync sliders
    if (nbComputersSlider) {
        nbComputersSlider.addEventListener('input', () => nbComputersInput.value = nbComputersSlider.value);
        nbComputersInput.addEventListener('input', () => nbComputersSlider.value = Math.min(nbComputersInput.value, 500));
    }
    if (avgAgeSlider) {
        avgAgeSlider.addEventListener('input', () => avgAgeInput.value = avgAgeSlider.value);
        avgAgeInput.addEventListener('input', () => avgAgeSlider.value = avgAgeInput.value);
    }
    if (officeUsersSlider) {
        officeUsersSlider.addEventListener('input', () => officeUsersInput.value = officeUsersSlider.value);
        officeUsersInput.addEventListener('input', () => officeUsersSlider.value = Math.min(officeUsersInput.value, 500));
    }

    calculateBtn.addEventListener('click', () => {
        const nbComputers = parseInt(nbComputersInput.value) || 0;
        const avgAge = parseInt(avgAgeInput.value) || 0;
        const officeUsers = parseInt(officeUsersInput.value) || 0;

        const windowsLicenseCost = 145;
        const officeLicenseCost = 150;
        const newComputerCost = 500;
        const co2PerComputer = 300;

        const windowsSavings = nbComputers * windowsLicenseCost;
        const officeSavings = officeUsers * officeLicenseCost;
        const computersToReplace = avgAge >= 5 ? Math.floor(nbComputers * 0.7) : Math.floor(nbComputers * 0.3);
        const hardwareSavings = computersToReplace * newComputerCost;
        const co2Savings = computersToReplace * co2PerComputer;
        const totalSavings = windowsSavings + officeSavings + hardwareSavings;

        animateValue('totalSavings', totalSavings, '€');
        animateValue('windowsSavings', windowsSavings, '€');
        animateValue('officeSavings', officeSavings, '€');
        animateValue('hardwareSavings', hardwareSavings, '€');
        animateValue('co2Savings', co2Savings, 'kg');

        const messageEl = document.getElementById('resultsMessage');
        if (messageEl) {
            messageEl.innerHTML = `<p>🎉 Économies potentielles : <strong>${totalSavings.toLocaleString('fr-FR')}€</strong> et <strong>${co2Savings.toLocaleString('fr-FR')} kg</strong> de CO₂ évités !</p>`;
            messageEl.classList.add('success');
        }
    });

    function animateValue(elementId, targetValue, suffix) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor((1 - Math.pow(1 - progress, 3)) * targetValue);
            element.textContent = current.toLocaleString('fr-FR') + ' ' + suffix;
            if (progress < 1) requestAnimationFrame(update);
            else element.textContent = targetValue.toLocaleString('fr-FR') + ' ' + suffix;
        }
        requestAnimationFrame(update);
    }
}

/* ========================================
   TESTIMONIAL SLIDER
   ======================================== */
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    let currentIndex = 0;
    const maxIndex = 2;

    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        track.style.transform = `translateX(-${currentIndex * 33.333}%)`;
        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    setInterval(() => goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1), 5000);
}

/* ========================================
   IMPACT STATS
   ======================================== */
function initImpactStats() {
    const statValues = document.querySelectorAll('.impact-stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => observer.observe(stat));
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav item based on scroll position
        updateActiveNavItem();
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/* ========================================
   PARTICULES DÉCORATIVES
   ======================================== */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;
    const hue = Math.random() * 60 + 200; // Blue to purple range

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        background: hsl(${hue}, 70%, 60%);
    `;

    container.appendChild(particle);
}

/* ========================================
   ANIMATION DES COMPTEURS
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

/* ========================================
   CARTE DU VILLAGE INTERACTIF
   ======================================== */
const buildingData = {
    school: {
        icon: '🏫',
        title: "L'École Libre",
        description: "Le cœur du village ! C'est ici que les jeunes résistants apprennent à utiliser les outils libres et à comprendre l'importance de la souveraineté numérique.",
        actors: ['Élèves', 'Professeurs', 'Éco-délégués', 'Direction'],
        action: "Sensibiliser aux alternatives libres"
    },
    forge: {
        icon: '⚒️',
        title: "La Forge des Communs",
        description: "L'atelier où sont créées les ressources éducatives libres. Ici, les forgerons du numérique développent et partagent des outils pour tous.",
        actors: ['Développeurs', 'Enseignants créateurs', 'Contributeurs'],
        action: "Créer et partager des ressources"
    },
    library: {
        icon: '📚',
        title: "La Bibliothèque du Savoir",
        description: "Un trésor de documentation et de tutoriels pour maîtriser Linux, LibreOffice et tous les outils libres du village.",
        actors: ['Documentalistes', 'Formateurs', 'Apprenants'],
        action: "Se former aux logiciels libres"
    },
    council: {
        icon: '🏛️',
        title: "Le Conseil du Village",
        description: "L'assemblée où se prennent les décisions importantes. Direction, académie et autorités locales y planifient la transition numérique.",
        actors: ['Direction', 'Académie', 'Collectivités', 'DNE'],
        action: "Décider et financer la transition"
    },
    workshop: {
        icon: '🔧',
        title: "L'Atelier de Réparation",
        description: "Ici, les vieux ordinateurs reprennent vie ! Grâce à Linux, le matériel 'obsolète' devient performant pour encore de nombreuses années.",
        actors: ['Techniciens', 'Bénévoles', 'Élèves en stage'],
        action: "Reconditionner le matériel"
    },
    square: {
        icon: '🎪',
        title: "La Place du Village",
        description: "Le lieu de rencontre et de partage ! Install parties, ateliers découverte et événements de sensibilisation s'y déroulent.",
        actors: ['Toute la communauté', 'Associations', 'Parents'],
        action: "Partager et échanger"
    }
};

function initVillageMap() {
    const buildings = document.querySelectorAll('.building');
    const modal = document.getElementById('buildingModal');
    const modalClose = document.getElementById('modalClose');

    buildings.forEach(building => {
        building.addEventListener('click', () => {
            const buildingType = building.getAttribute('data-building');
            openBuildingModal(buildingType);
        });
    });

    modalClose.addEventListener('click', closeBuildingModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBuildingModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBuildingModal();
        }
    });
}

function openBuildingModal(buildingType) {
    const data = buildingData[buildingType];
    if (!data) return;

    const modal = document.getElementById('buildingModal');
    document.getElementById('modalIcon').textContent = data.icon;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    
    const actorsContainer = document.getElementById('modalActors');
    actorsContainer.innerHTML = data.actors.map(actor => `<span>${actor}</span>`).join('');

    const actionsContainer = document.getElementById('modalActions');
    actionsContainer.innerHTML = `<button class="btn btn-primary"><i class="fas fa-hand-point-right"></i> ${data.action}</button>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBuildingModal() {
    const modal = document.getElementById('buildingModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ========================================
   QUIZ INTERACTIF
   ======================================== */
const quizQuestions = [
    {
        question: "Quand Microsoft cessera-t-il le support de Windows 10 ?",
        options: ["Janvier 2024", "Octobre 2025", "Décembre 2026", "Mars 2027"],
        correct: 1,
        explanation: "Microsoft mettra fin au support de Windows 10 le 14 octobre 2025."
    },
    {
        question: "Que signifie NIRD ?",
        options: [
            "Nouvelle Initiative de Réforme Digitale",
            "Numérique Inclusif, Responsable et Durable",
            "Numérisation Intégrée des Ressources Documentaires",
            "Norme d'Infrastructure Réseau Distribuée"
        ],
        correct: 1,
        explanation: "NIRD = Numérique Inclusif, Responsable et Durable"
    },
    {
        question: "Quelle alternative libre peut remplacer Microsoft Office ?",
        options: ["Google Docs", "LibreOffice", "Apple Pages", "Notion"],
        correct: 1,
        explanation: "LibreOffice est une suite bureautique libre et gratuite, compatible avec les formats Microsoft."
    },
    {
        question: "Quel est le principal avantage de Linux pour les vieux ordinateurs ?",
        options: [
            "Il est plus joli",
            "Il permet de prolonger leur durée de vie",
            "Il est obligatoire",
            "Il coûte plus cher"
        ],
        correct: 1,
        explanation: "Linux est léger et permet de faire fonctionner des ordinateurs considérés comme 'obsolètes' par Windows."
    },
    {
        question: "Où sont souvent stockées les données des élèves avec les services Big Tech ?",
        options: [
            "En France exclusivement",
            "Dans l'école",
            "Sur des serveurs aux États-Unis",
            "Nulle part"
        ],
        correct: 2,
        explanation: "Les services américains (Google, Microsoft) stockent les données sur des serveurs soumis au Cloud Act."
    },
    {
        question: "Qu'est-ce que la Forge des Communs Numériques Éducatifs ?",
        options: [
            "Un jeu vidéo",
            "Une plateforme de partage de ressources éducatives libres",
            "Une entreprise privée",
            "Un réseau social"
        ],
        correct: 1,
        explanation: "C'est une plateforme hébergée par l'Éducation Nationale pour mutualiser les ressources libres."
    },
    {
        question: "Quel navigateur est une alternative libre à Chrome ?",
        options: ["Edge", "Safari", "Firefox", "Opera"],
        correct: 2,
        explanation: "Firefox est développé par Mozilla, une fondation à but non lucratif, et respecte la vie privée."
    },
    {
        question: "Quel est l'un des trois piliers du NIRD ?",
        options: ["Rapidité", "Durabilité", "Popularité", "Simplicité"],
        correct: 1,
        explanation: "Les trois piliers sont : Inclusif, Responsable et Durable."
    },
    {
        question: "Où est né le projet NIRD ?",
        options: [
            "À Paris",
            "Au Lycée Carnot de Bruay-la-Buissière",
            "À Marseille",
            "À Bruxelles"
        ],
        correct: 1,
        explanation: "Le projet est né au Lycée Carnot de Bruay-la-Buissière dans les Hauts-de-France."
    },
    {
        question: "Quelle est l'alternative libre à Photoshop ?",
        options: ["Canva", "GIMP", "Paint", "Figma"],
        correct: 1,
        explanation: "GIMP (GNU Image Manipulation Program) est un logiciel libre de retouche d'images très puissant."
    },
    {
        question: "Combien de CO₂ évite-t-on en prolongeant la vie d'un ordinateur de 3 ans ?",
        options: ["50 kg", "150 kg", "300 kg", "500 kg"],
        correct: 2,
        explanation: "Prolonger la vie d'un ordinateur évite environ 300 kg de CO₂ liés à sa fabrication."
    },
    {
        question: "Quel est le coût moyen d'une licence Windows 11 Pro ?",
        options: ["59€", "99€", "145€", "199€"],
        correct: 2,
        explanation: "Une licence Windows 11 Pro coûte environ 145€, une économie directe avec Linux."
    },
    {
        question: "Quelle distribution Linux est spécialement conçue pour l'éducation ?",
        options: ["Ubuntu Gaming", "Primtux", "Arch Linux", "Kali Linux"],
        correct: 1,
        explanation: "Primtux est une distribution Linux française pensée pour le primaire et l'éducation."
    },
    {
        question: "Qu'est-ce que le Cloud Act américain permet ?",
        options: [
            "Protéger les données européennes",
            "Accéder aux données stockées par les entreprises US, même à l'étranger",
            "Chiffrer toutes les communications",
            "Bloquer les hackers"
        ],
        correct: 1,
        explanation: "Le Cloud Act permet aux autorités américaines d'accéder aux données des entreprises US partout dans le monde."
    },
    {
        question: "Quelle alternative libre existe pour les visioconférences ?",
        options: ["Zoom", "Teams", "BigBlueButton", "Skype"],
        correct: 2,
        explanation: "BigBlueButton est une solution libre de visioconférence, très utilisée dans l'éducation."
    }
];

// Mélanger les questions pour varier l'expérience
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let shuffledQuestions = [];

let quizState = {
    currentQuestion: 0,
    score: 0,
    lives: 3,
    answered: false,
    gameOver: false
};

function initQuiz() {
    const startBtn = document.getElementById('startQuiz');
    const nextBtn = document.getElementById('nextQuestion');
    const restartBtn = document.getElementById('restartQuiz');

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
}

function startQuiz() {
    // Mélanger et prendre 10 questions
    shuffledQuestions = shuffleArray(quizQuestions).slice(0, 10);
    
    quizState = {
        currentQuestion: 0,
        score: 0,
        lives: 3,
        answered: false,
        gameOver: false
    };

    document.getElementById('startQuiz').classList.add('hidden');
    document.getElementById('quizResult').classList.add('hidden');
    document.getElementById('restartQuiz').classList.add('hidden');
    
    updateQuizUI();
    showQuestion();
}

function showQuestion() {
    const question = shuffledQuestions[quizState.currentQuestion];
    const questionElement = document.getElementById('quizQuestion');
    const optionsElement = document.getElementById('quizOptions');
    const feedbackElement = document.getElementById('quizFeedback');

    questionElement.textContent = question.question;
    feedbackElement.innerHTML = '';
    feedbackElement.className = 'quiz-feedback';

    optionsElement.innerHTML = question.options.map((option, index) => `
        <button class="quiz-option" data-index="${index}">${option}</button>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.index)));
    });

    quizState.answered = false;
    document.getElementById('nextQuestion').classList.add('hidden');
}

function selectAnswer(selectedIndex) {
    if (quizState.answered) return;
    quizState.answered = true;

    const question = shuffledQuestions[quizState.currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const feedbackElement = document.getElementById('quizFeedback');

    options.forEach((option, index) => {
        option.classList.add('disabled');
        if (index === question.correct) {
            option.classList.add('correct');
        }
        if (index === selectedIndex && selectedIndex !== question.correct) {
            option.classList.add('incorrect');
        }
    });

    if (selectedIndex === question.correct) {
        quizState.score += 10;
        feedbackElement.textContent = `✓ Correct ! ${question.explanation}`;
        feedbackElement.classList.add('correct');
    } else {
        quizState.lives--;
        feedbackElement.textContent = `✗ Incorrect. ${question.explanation}`;
        feedbackElement.classList.add('incorrect');
    }

    updateQuizUI();

    if (quizState.lives <= 0) {
        setTimeout(endQuiz, 1500);
    } else if (quizState.currentQuestion < shuffledQuestions.length - 1) {
        document.getElementById('nextQuestion').classList.remove('hidden');
    } else {
        setTimeout(endQuiz, 1500);
    }
}

function nextQuestion() {
    quizState.currentQuestion++;
    document.getElementById('nextQuestion').classList.add('hidden');
    showQuestion();
    updateQuizUI();
}

function updateQuizUI() {
    document.getElementById('score').textContent = quizState.score;
    document.getElementById('lives').textContent = quizState.lives;
    document.getElementById('currentQuestion').textContent = quizState.currentQuestion + 1;
    
    const progress = ((quizState.currentQuestion + 1) / shuffledQuestions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function endQuiz() {
    quizState.gameOver = true;
    
    const quizCard = document.getElementById('quizCard');
    const quizResult = document.getElementById('quizResult');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultBadge = document.getElementById('resultBadge');

    quizCard.classList.add('hidden');
    quizResult.classList.remove('hidden');
    document.getElementById('nextQuestion').classList.add('hidden');
    document.getElementById('restartQuiz').classList.remove('hidden');

    const percentage = (quizState.score / (shuffledQuestions.length * 10)) * 100;

    if (percentage >= 80) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = 'Excellent Résistant !';
        resultMessage.textContent = 'Vous êtes prêt à mener la révolution numérique libre dans votre établissement !';
        resultBadge.textContent = `🎖️ Maître du Village - ${quizState.score} points`;
    } else if (percentage >= 60) {
        resultIcon.textContent = '⚔️';
        resultTitle.textContent = 'Bon Guerrier !';
        resultMessage.textContent = 'Vous avez de bonnes bases, continuez à vous former pour devenir un vrai résistant !';
        resultBadge.textContent = `🛡️ Gardien du Village - ${quizState.score} points`;
    } else if (percentage >= 40) {
        resultIcon.textContent = '📚';
        resultTitle.textContent = 'Apprenti Résistant';
        resultMessage.textContent = 'Vous découvrez le monde du libre, explorez nos ressources pour progresser !';
        resultBadge.textContent = `📖 Apprenti - ${quizState.score} points`;
    } else {
        resultIcon.textContent = '🌱';
        resultTitle.textContent = 'Nouvelle Recrue';
        resultMessage.textContent = "Bienvenue au village ! C'est le début de votre aventure vers la liberté numérique.";
        resultBadge.textContent = `🌱 Nouvelle Recrue - ${quizState.score} points`;
    }
}

function restartQuiz() {
    document.getElementById('quizCard').classList.remove('hidden');
    document.getElementById('quizResult').classList.add('hidden');
    startQuiz();
}

/* ========================================
   FILTRES DES SOLUTIONS
   ======================================== */
function initSolutionsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const solutionCards = document.querySelectorAll('.solution-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            solutionCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden-card');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden-card');
                }
            });
        });
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   ANIMATIONS AU SCROLL
   ======================================== */
function initScrollAnimations() {
    // Animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-on-scroll {
            opacity: 0;
        }
        
        .animate-on-scroll.animated {
            animation: fadeInUp 0.6s ease forwards;
        }
    `;
    document.head.appendChild(style);

    // Add animation class to elements
    const animatableElements = document.querySelectorAll(
        '.pillar-card, .solution-card, .action-step, .testimonial-card, .impact-card'
    );

    animatableElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatableElements.forEach(el => observer.observe(el));
}

/* ========================================
   UTILITAIRES
   ======================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Console Easter Egg
console.log(`
%c🏰 Village Numérique Résistant - NIRD
%cNuit de l'Info 2025

Bienvenue résistant ! Tu as trouvé notre console secrète.

🐧 "Par Tux et par la liberté !"

Rejoins-nous : https://nird.forge.apps.education.fr/
`, 
'font-size: 20px; font-weight: bold; color: #2563eb;',
'font-size: 14px; color: #10b981;'
);

/* ========================================
   KONAMI CODE EASTER EGG
   ↑ ↑ ↓ ↓ ← → ← → B A
   ======================================== */
(function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateKonamiMode() {
        // Create Tux overlay
        const overlay = document.createElement('div');
        overlay.id = 'konamiOverlay';
        overlay.innerHTML = `
            <div class="konami-content">
                <div class="tux-big">🐧</div>
                <h2>Mode Résistant Activé !</h2>
                <p>"Par Tux et par la liberté !"</p>
                <div class="konami-penguins">
                    ${'🐧'.repeat(20)}
                </div>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Vive le Libre !</button>
            </div>
        `;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 100000;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.5s ease;
        `;

        const contentStyle = document.createElement('style');
        contentStyle.textContent = `
            #konamiOverlay .konami-content {
                text-align: center;
                color: white;
            }
            #konamiOverlay .tux-big {
                font-size: 150px;
                animation: bounce 1s ease infinite;
            }
            #konamiOverlay h2 {
                font-size: 3rem;
                color: #10b981;
                margin: 1rem 0;
            }
            #konamiOverlay p {
                font-size: 1.5rem;
                color: #fbbf24;
                margin-bottom: 2rem;
            }
            #konamiOverlay .konami-penguins {
                font-size: 2rem;
                animation: wave 2s ease infinite;
                margin-bottom: 2rem;
            }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
            @keyframes wave {
                0%, 100% { transform: rotate(-5deg); }
                50% { transform: rotate(5deg); }
            }
        `;
        document.head.appendChild(contentStyle);
        document.body.appendChild(overlay);

        // Make everything rainbow temporarily
        document.body.style.animation = 'rainbow 3s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);

        // Add rainbow animation if not exists
        if (!document.getElementById('rainbowStyle')) {
            const rainbowStyle = document.createElement('style');
            rainbowStyle.id = 'rainbowStyle';
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
        }

        console.log('%c🎉 KONAMI CODE ACTIVÉ ! Tu es un vrai résistant !', 'font-size: 24px; color: #10b981; font-weight: bold;');
    }
})();
