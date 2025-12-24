document.addEventListener('DOMContentLoaded', () => {

    // Scroll Reveal Configuration
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)' // smooth ease
    });

    // Reveal Hero Elements
    sr.reveal('.hero .mono-text', { delay: 100 });
    sr.reveal('.hero .big-heading', { delay: 200, interval: 100 });
    sr.reveal('.hero .hero-description', { delay: 400 });
    sr.reveal('.hero .btn-main', { delay: 500 });

    // Reveal Sections
    sr.reveal('.section-heading', { delay: 100, origin: 'left' });
    sr.reveal('.about-text', { delay: 200 });
    sr.reveal('.tech-graphic', { delay: 300, origin: 'right' });

    // Reveal Timeline & Projects
    sr.reveal('.timeline-item', { interval: 200 });
    sr.reveal('.project-card', { delay: 200 });
    sr.reveal('.mini-card', { interval: 100 });
    sr.reveal('.cert-item', { interval: 100 });

    // Hover Animation for Vastra Preview (Using GSAP)
    const vastraPreview = document.querySelector('.vastra-preview');
    if (vastraPreview) {
        vastraPreview.addEventListener('mouseenter', () => {
            gsap.to(vastraPreview, {
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(100, 255, 218, 0.2)",
                duration: 0.3
            });
        });
        vastraPreview.addEventListener('mouseleave', () => {
            gsap.to(vastraPreview, {
                scale: 1,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                duration: 0.3
            });
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)'; // Hide on scroll down
        } else {
            navbar.style.transform = 'translateY(0)'; // Show on scroll up
        }
        lastScroll = currentScroll;
    });

});
