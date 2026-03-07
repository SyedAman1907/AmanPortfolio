/**
 * Premium Portfolio Logic
 * Handling animations, typing effects, and scroll interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Management
    const menuToggle = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // 2. Typing Effect for Hero Roles
    const rolesElement = document.getElementById('roles');
    const roles = ['Google Student Ambassador', 'CS Undergraduate @ RGM', 'Java Developer', 'Full-Stack Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            rolesElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            rolesElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // 2. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger nested animations (like progress bars or counters)
                if (entry.target.classList.contains('skills-grid')) {
                    // Flashcards are styled to animate independently on float and hover
                }
                if (entry.target.classList.contains('about-content')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 3. Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. (Removed Progress Bar Function - Not applicable for flashcards)


    // 5. Stat Counters Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200;
            
            const updateCount = () => {
                const currentCount = +counter.innerText;
                const increment = target / speed;

                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            if (count === 0) updateCount();
        });
    }

    // 6. Footer Dynamic Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // 7. Form Handling (Demo)
    // Initialize EmailJS
    (function() {
        // REPLACE with your Public Key from EmailJS Account
        emailjs.init("YOUR_PUBLIC_KEY");
    })();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'En route...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Parameters: service_id, template_id, form_element
            emailjs.sendForm('service_azuq6bf', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    alert('Proposal Sent Successfully! Syed Aman will contact you soon.');
                    contactForm.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, function(error) {
                    alert('FAILED... ' + JSON.stringify(error));
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                });
        });
    }

    // 8. Background Mouse Movement Effect (Subtle)
    const glowBg = document.querySelector('.glow-bg');
    if (glowBg) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            glowBg.style.setProperty('--mouse-x', x);
            glowBg.style.setProperty('--mouse-y', y);
        });
    }



    // 11. Project Expansion Logic
    const projectCards = document.querySelectorAll('.project-card[data-expandable]');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            projectCards.forEach(otherCard => {
                if (otherCard !== card) otherCard.classList.remove('expanded');
            });
            card.classList.toggle('expanded');
        });
    });



    // 13. Mouse Parallax for Cards (Antigravity Style)
    const cards = document.querySelectorAll('.edu-card, .cert-card, .experience-item, .project-card');
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;

            const angleX = (cardY - mouseY) / 30; // Subtle tilt
            const angleY = (mouseX - cardX) / 30;

            if (card.classList.contains('active')) {
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
            }
        });
    });

    // Reset card tilt when mouse leaves
    window.addEventListener('mouseout', () => {
        cards.forEach(card => {
            card.style.transform = '';
        });
    });





    // Cursor hover effects on links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
});

