console.log("script.js chargé");
document.addEventListener('DOMContentLoaded', () => {

    /* ==================================
       1. Navbar Scroll & Mobile Menu
       ================================== */
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // Scroll styling
    window.addEventListener('scroll', () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const icon = hamburger.querySelector('i');
            if (!icon) return;

            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu on clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
            }

            if (hamburger) {
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    /* ==================================
       2. Scroll Spy (Active Nav Link)
       ================================== */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');

            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    /* ==================================
       3. Typing Animation
       ================================== */
    const typedTextSpan = document.querySelector('.typing');
    const cursorSpan = document.querySelector('.cursor');

    const textArray = [
        'Étudiant en informatique..',
        'Développeur logiciel & Data.',
        'Futur ingénieur en IA.'
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typedTextSpan || !cursorSpan) return;

        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }

            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (!typedTextSpan || !cursorSpan) return;

        if (charIndex > 0) {
            if (!cursorSpan.classList.contains('typing')) {
                cursorSpan.classList.add('typing');
            }

            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;

            if (textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }

            setTimeout(type, typingDelay + 500);
        }
    }

    if (typedTextSpan && cursorSpan && textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    /* ==================================
       4. Scroll Reveal & Skill Bars
       ================================== */
    const revealElements = document.querySelectorAll('.reveal');

    function animateSkillBars(container) {
        const progressBars = container.querySelectorAll('.skill-progress');

        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                bar.style.width = targetWidth;
            }
        });
    }

    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Animate skill bars if present inside revealed element
                    if (entry.target.classList.contains('skill-category')) {
                        animateSkillBars(entry.target);
                    }

                    const nestedSkillCategories = entry.target.querySelectorAll('.skill-category');
                    nestedSkillCategories.forEach(category => animateSkillBars(category));

                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        };

        const revealOptions = {
            threshold: 0.12,
            rootMargin: '0px 0px -30px 0px'
        };

        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });

        // Force immediate reveal for elements already visible on load
        setTimeout(() => {
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 30) {
                    el.classList.add('active');

                    if (el.classList.contains('skill-category')) {
                        animateSkillBars(el);
                    }

                    const nestedSkillCategories = el.querySelectorAll('.skill-category');
                    nestedSkillCategories.forEach(category => animateSkillBars(category));
                }
            });
        }, 100);
    } else {
        // Fallback if IntersectionObserver is not supported
        revealElements.forEach(el => {
            el.classList.add('active');

            if (el.classList.contains('skill-category')) {
                animateSkillBars(el);
            }

            const nestedSkillCategories = el.querySelectorAll('.skill-category');
            nestedSkillCategories.forEach(category => animateSkillBars(category));
        });
    }

    /* ==================================
       5. Contact Form Validation
       ================================== */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let isValid = true;

            // Name validation
            const nameInput = document.getElementById('name');
            if (nameInput) {
                if (nameInput.value.trim() === '') {
                    nameInput.parentElement.classList.add('invalid');
                    isValid = false;
                } else {
                    nameInput.parentElement.classList.remove('invalid');
                }
            }

            // Email validation
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput) {
                if (!emailRegex.test(emailInput.value.trim())) {
                    emailInput.parentElement.classList.add('invalid');
                    isValid = false;
                } else {
                    emailInput.parentElement.classList.remove('invalid');
                }
            }

            // Message validation
            const msgInput = document.getElementById('message');
            if (msgInput) {
                if (msgInput.value.trim() === '') {
                    msgInput.parentElement.classList.add('invalid');
                    isValid = false;
                } else {
                    msgInput.parentElement.classList.remove('invalid');
                }
            }

            // Simulate form submission
            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');

                if (!submitBtn) return;

                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();

                    const successMsg = document.getElementById('form-success');
                    if (successMsg) {
                        successMsg.classList.add('show');

                        setTimeout(() => {
                            successMsg.classList.remove('show');
                        }, 5000);
                    }
                }, 1500);
            }
        });

        // Clear error on input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.parentElement) {
                    this.parentElement.classList.remove('invalid');
                }
            });
        });
    }

    /* ==================================
       6. Dynamic Background Particles
       ================================== */
    const particlesContainer = document.getElementById('particles-bg');

    if (particlesContainer) {
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random properties
            const size = Math.random() * 200 + 50;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * -20;
            const duration = Math.random() * 10 + 15;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            particlesContainer.appendChild(particle);
        }
    }
});