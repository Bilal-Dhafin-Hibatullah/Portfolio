// ============ TYPING EFFECT ============
const typedTextEl = document.querySelector('.typed-text');
const words = ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Content Creator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 400);
    } else {
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
}

typeEffect();

// ============ NAVBAR SCROLL ============
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============ HAMBURGER MENU ============
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Tutup menu saat link diklik
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============ COUNTER ANIMATION ============
const counters = document.querySelectorAll('.counter');

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 60;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// ============ SKILL BARS ANIMATION ============
function animateSkillBars() {
    document.querySelectorAll('.progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// ============ SCROLL FADE IN ============
const fadeElements = document.querySelectorAll(
    '.about-text, .about-stats, .skill-card, .project-card, .contact-info, .contact-form'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger counter saat about terlihat
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
            }

            // Trigger skill bars saat skills terlihat
            if (entry.target.classList.contains('skill-card')) {
                animateSkillBars();
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// ============ CONTACT FORM ============
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
    btn.style.background = '#27ae60';
    btn.style.borderColor = '#27ae60';
    btn.style.color = '#fff';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        this.reset();
    }, 2500);
});

// ============ SMOOTH SCROLL FOR SAFARI ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});