// Naomi Musalaba Portfolio Interactivity & Animations
// Typewriter Animation
const typewriterText = document.getElementById('typewriter-text');
const roles = ["Developer", "Problem Solver", "Innovator"];
let typeIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
    const currentRole = roles[typeIndex];
    if (isDeleting) {
        typewriterText.textContent = currentRole.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            typeIndex = (typeIndex + 1) % roles.length;
            setTimeout(typeWriter, 700);
        } else {
            setTimeout(typeWriter, 60);
        }
    } else {
        typewriterText.textContent = currentRole.substring(0, charIndex++);
        if (charIndex > currentRole.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1200);
        } else {
            setTimeout(typeWriter, 110);
        }
    }
}
if(typewriterText) typeWriter();

// Mobile Nav Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Project cards toggle
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    const header = card.querySelector('.project-header');
    const content = card.querySelector('.project-content');
    
    // Initially hide content
    content.style.display = 'none';
    
    // Toggle content on header click
    header.addEventListener('click', () => {
        const isExpanded = content.style.display === 'block';
        content.style.display = isExpanded ? 'none' : 'block';
        card.classList.toggle('expanded', !isExpanded);
        
        // Close other open cards
        if (!isExpanded) {
            projectCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.querySelector('.project-content').style.display = 'none';
                    otherCard.classList.remove('expanded');
                }
            });
        }
    });
});
if(navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth Scroll for Nav Links
const navAnchors = document.querySelectorAll('nav a[href^="#"]');
navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
            navLinks.classList.remove('active');
        }
    });
});

// Intersection Observer Animations
function revealOnScroll(selector, className) {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add(className);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    elements.forEach(el => observer.observe(el));
}
window.addEventListener('DOMContentLoaded', () => {
    revealOnScroll('.about-section', 'visible');
    revealOnScroll('.project-card', 'visible');
    revealOnScroll('.contact-section', 'visible');
});

// Slide-in Animation for Project Cards
function alternateSlideIn() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
        if(i % 2 === 0) card.classList.add('slide-in-left');
    });
}
alternateSlideIn();

// Flip Card Animation for Hackathons
const hackathonCards = document.querySelectorAll('.flip-card');
hackathonCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
    card.addEventListener('keypress', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
            card.classList.toggle('flipped');
        }
    });
});

// Contact Form Validation
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.elements['name'].value.trim();
        const email = this.elements['email'].value.trim();
        const message = this.elements['message'].value.trim();
        const msgDiv = this.querySelector('.form-message');
        if(!name || !email || !message) {
            msgDiv.textContent = 'Please fill out all fields.';
            msgDiv.style.color = '#e74c3c';
            return;
        }
        if(!/^\S+@\S+\.\S+$/.test(email)) {
            msgDiv.textContent = 'Please enter a valid email address.';
            msgDiv.style.color = '#e74c3c';
            return;
        }
        msgDiv.textContent = 'Message sent! Thank you.';
        msgDiv.style.color = 'var(--teal)';
        this.reset();
    });
}
