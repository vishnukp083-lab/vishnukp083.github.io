gsap.registerPlugin(MotionPathPlugin);

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slightly delayed follow for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });

        // Parallax Effect
        const moveX = (window.innerWidth / 2 - posX) * 0.02;
        const moveY = (window.innerHeight / 2 - posY) * 0.02;

        gsap.to('.logo-wrapper', {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: 'power2.out'
        });

        // Fabric sheen effect
        gsap.to('.fabric-bg', {
            backgroundPosition: `${posX / 20}px ${posY / 20}px`,
            duration: 1
        });
    });

    // Hover interactive elements
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // --- Master Timeline Animation ---
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 1. Initial Scissors Animation ("Cutting" open the scene)
    // We want them to end up looking like a "V"
    tl.from('.scissor-blade', {
        rotation: 0, // Start closed (vertical)
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        transformOrigin: "0 10px" // Pivot point
    })
        .to('.left-blade', { rotation: -30, duration: 1.5, ease: "power4.out" }, "-=0.5")
        .to('.right-blade', { rotation: 30, duration: 1.5, ease: "power4.out" }, "<")

        // Animate handles if added
        .to('.handle', { opacity: 1, duration: 1 }, "<")

        // 2. Text Reveal
        .to('.logo-text', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2
        }, "-=0.5")

        // 3. Thread Stitching Animation
        // Reveal the path progressively
        .fromTo('#stitch-path',
            { strokeDasharray: "5, 5", strokeDashoffset: 1000 },
            { strokeDashoffset: 0, duration: 3, ease: "none" }
        )

        // Animate Needle ALONG the path simultaneously
        .to('#needle', {
            motionPath: {
                path: "#stitch-path",
                align: "#stitch-path",
                alignOrigin: [0, 1],
                autoRotate: true
            },
            duration: 3,
            ease: "none"
        }, "<") // Run at same time as path drawing

        // 4. Final Polish
        .to('.tagline', { opacity: 1, y: 0, duration: 1 }, "-=1")
        .to('.cta-container', { opacity: 1, y: 0, duration: 1 }, "-=0.5")

        // 5. MORPH: Crossfade Scissors to real 'V' text for legibility
        .to('.symbol-group', { opacity: 0, duration: 1 }, "+=0.5") // Wait half a sec then fade out scissors
        .to('.v-text', { opacity: 1, duration: 1 }, "<"); // Fade in V text at same time

    // Optional: Subtle float for the needle after animation
    gsap.to('#needle', {
        y: "+=5",
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 5 // Start after main animation
    });

    // --- DOWNLOAD FEATURE ---
    document.getElementById('download-btn').addEventListener('click', () => {
        const svg = document.querySelector('.logo-svg');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgData = new XMLSerializer().serializeToString(svg);

        // We need to inline styles because generic <img> rendering ignores external CSS
        // The most critical ones are fonts and fills
        const styleRules = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;500&family=Great+Vibes&display=swap');
                .logo-text { font-family: 'Cinzel', serif; fill: #D4AF37; }
                .main-text { font-weight: 700; letter-spacing: 4px; font-size: 64px; }
                .sub-text { font-weight: 300; letter-spacing: 14px; fill: #D4AF37; font-size: 20px; text-transform: uppercase; }
                .prefix-text { font-family: 'Great Vibes', cursive; fill: #D4AF37; font-size: 32px; }
                .v-text { opacity: 1; } /* Ensure V is visible in download regardless of animation state */
                .symbol-group { display: none; } /* Hide the scissors in static image if we want just the text, OR keep them if preferred. Let's keep strict text legibility for download. */
            </style>
        `;

        // Inject styles into SVG data
        const svgWithStyle = svgData.replace('<defs>', '<defs>' + styleRules);

        const img = new Image();
        const svgBlob = new Blob([svgWithStyle], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        // Set specific high-res size
        canvas.width = 1200;
        canvas.height = 800;

        img.onload = () => {
            // Draw Black Background
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the SVG centered
            // The SVG viewBox is 0 0 600 400. We scale it up 2x.
            ctx.drawImage(img, 0, 0, 1200, 800);

            // Trigger Download
            const a = document.createElement('a');
            a.download = 'The_Vastra_Studio_Logo.png';
            a.href = canvas.toDataURL('image/png');
            a.click();

            URL.revokeObjectURL(url);
        };

        img.src = url;
    });
});
