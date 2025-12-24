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

    // --- Architecture Diagram Animation ---
    const archSvg = document.getElementById('arch-svg');
    if (archSvg) {
        const archTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        const packet = document.getElementById('packet');
        const statusText = document.getElementById('arch-status');

        // Reset state
        gsap.set('#node-ec2', { opacity: 0.3 });
        gsap.set('#hosting-light', { fill: '#222' });

        // 1. Dev -> Terraform
        archTl.set(statusText, { textContent: "Validating Terraform Script..." })
            .fromTo(packet,
                { opacity: 1, cx: 50, cy: 150 },
                { cx: 300, cy: 150, duration: 1.5, ease: "power1.inOut" }
            )
            .to('#node-terraform polygon', { scale: 1.2, stroke: "#fff", duration: 0.2, yoyo: true, repeat: 1 })

            // 2. Terraform -> Logic Check
            .set(statusText, { textContent: "Checking AWS Tags: Name=appstudy..." })
            .to(packet, { cx: 500, cy: 150, duration: 1, ease: "power1.inOut" })
            .to('#node-logic rect', { stroke: "#fff", duration: 0.2, yoyo: true, repeat: 3 }) // Pulse logic

            // 3. Logic Success -> Found EC2
            .set(statusText, { textContent: "Instance Found! Deploying..." })
            .to('#node-logic text', { fill: "#64ffda", scale: 1.2, duration: 0.2 }) // Green ?
            .to(packet, { cx: 700, cy: 150, duration: 1, ease: "power1.inOut" })

            // 4. EC2 Activation
            .to('#node-ec2', { opacity: 1, duration: 0.5 })
            .set(statusText, { textContent: "Hosting: The Vastra Studio (Active)" })
            .to('#hosting-light', { fill: "#00ff00", duration: 0.2 })
            .to('#node-ec2 rect', { stroke: "#fff", strokeWidth: 4, duration: 0.5, yoyo: true, repeat: 1 })

            // 5. Cleanup for loop
            .to(packet, { opacity: 0, duration: 0.5 });
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
