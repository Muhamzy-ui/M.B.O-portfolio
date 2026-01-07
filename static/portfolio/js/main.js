gsap.registerPlugin(TextPlugin);

window.addEventListener('load', async () => {
    // 1. DATA-FRAGMENTS ENGINE (Hexagons & Squares)
    await tsParticles.load("tsparticles", {
        fpsLimit: 120,
        particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            // Using your branding colors
            color: { value: ["#b794f4", "#70d6ff", "#ffffff"] },
            shape: { 
                type: ["polygon", "square"], // Professional geometric shapes
                options: {
                    polygon: { sides: 6 } // Hexagons
                }
            },
            opacity: {
                value: { min: 0.1, max: 0.5 }, // Subtler for a cleaner look
                animation: { enable: true, speed: 1, sync: false }
            },
            size: { 
                value: { min: 1, max: 3 } 
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "top-right", // Moves like data floating up
                random: false,
                straight: false,
                outModes: { default: "out" }
            },
            // Connecting lines for a "Network" feel
            links: {
                enable: true,
                distance: 150,
                color: "#70d6ff",
                opacity: 0.2,
                width: 1
            }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" } // "Grabs" the data on hover
            }
        }
    });

    const tl = gsap.timeline();

    // const tl = gsap.timeline();

    // 2. THE COUNT-UP & LOADING LINE
    const counterElement = document.querySelector(".loader-num");
    let countObj = { val: 0 };

    tl.to(countObj, {
        val: 50,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
            counterElement.innerText = Math.floor(countObj.val);
        }
    });

    tl.to("#loader-fill", { 
        width: "100%", 
        duration: 2, 
        ease: "power2.inOut" 
    }, 0);

    // 3. EXIT PRELOADER
    tl.to("#preloader", { 
        y: "-100%", 
        duration: 0.8, 
        ease: "power4.inOut", 
        delay: 0.3 
    });

    // 4. REVEAL HERO CONTENT (Added padding-top logic via JS for safety)
    gsap.set(".hero-inner", { paddingTop: "100px" }); // Extra space from header

    tl.from(".hero-name", { 
        y: 80, 
        opacity: 0, 
        duration: 1, 
        ease: "power4.out" 
    }, "-=0.3");

    tl.to("#typewriter-text", {
        duration: 2.5,
        text: "Hi, I’m M.B.O, a Full-Stack Web Developer and Cybersecurity Enthusiast.\nI build secure, modern web applications using Django, Python, and JavaScript.\nI’m passionate about clean code, strong security, and great user experiences.",
        ease: "none"
    });

    tl.from(".reveal-up:not(.hero-name)", { 
        y: 20, 
        opacity: 0, 
        duration: 0.6, 
        stagger: 0.15 
    }, "-=0.5");
});

const card = document.getElementById('profileCard');
if(card) {
    card.addEventListener('click', (e) => {
        // Prevent clicking the "Contact" button from toggling the card
        if(!e.target.classList.contains('contact-mini-btn')) {
            card.classList.toggle('is-active');
        }
    });
}

gsap.registerPlugin(ScrollTrigger);

// Timeline for the About section scroll effect
const aboutTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#about",
        start: "top 80%", // Starts when section is 80% down the screen
        end: "top 30%",
        scrub: 1.5,      // Smoothly follows the scroll
    }
});

// 1. Slide everything from the sides
aboutTimeline.from(".slide-left", {
    x: -300,
    opacity: 0,
    ease: "power3.out"
}, 0);

aboutTimeline.from(".slide-right", {
    x: 300,
    opacity: 0,
    ease: "power3.out"
}, 0);

// 2. Animate the underline (Grows from 0 to 100% width)
aboutTimeline.to(".title-underline", {
    width: "100%",
    duration: 1,
    ease: "power2.inOut"
}, ">-0.5"); // Starts slightly before the slid
// e finishes

// Check if the screen is mobile
let isMobile = window.innerWidth < 992;

const aboutEntrance = gsap.timeline({
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 85%",
        end: "top 30%",
        scrub: 1,
    }
});

aboutEntrance.from(".slide-from-left", {
    x: isMobile ? -50 : -300, // Move less on mobile
    opacity: 0,
    duration: 1
});

aboutEntrance.from(".slide-from-right", {
    x: isMobile ? 50 : 300, // Move less on mobile
    opacity: 0,
    duration: 1
}, 0);

// Add this to your existing ScrollTrigger code

// 1. Title & Underline Animation
gsap.to(".title-underline", {
    width: "80px", // Final width of centered line
    duration: 1.2,
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 85%",
        toggleActions: "play none none reverse"
    }
});

// 2. Long Card "Entrance" Animation
gsap.from(".glass-bio-container", {
    y: 50,           // Moves up slightly
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".glass-bio-container",
        start: "top 90%",
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const isMobile = window.innerWidth < 768;

    try {
        TagCanvas.Start('skillCanvas', 'skillList', {
            // Visuals
            textColour: null,
            outlineMethod: 'none',
            imageMode: 'both',
            imagePosition: 'top',
            imageScale: isMobile ? 1.2 : 1.2, // Smaller icons on mobile
            
            // The "Tile" Look
            bgColour: 'rgba(255, 255, 255, 0.08)', // Dark glass background
            bgRadius: 10,                          // Rounded corners for tiles
            bgOutline: 'rgba(255, 255, 255, 0.15)', // Subtle border
            bgOutlineThickness: 1,
            padding: 10,                           // Space between icon and its background
            
            // Movement & Physics
            maxSpeed: 0.01,
            freezeActive: true,
            shuffleTags: true,
            shape: 'sphere',
            zoom: isMobile ? 0.85 : 0.85,           // Zoom out on mobile to fit screen
            wheelZoom: false,
            noSelect: true,
            initial: [0.1, -0.1],
            depth: 0.7,
            reverse: true,                         // Spins more naturally
            dragControl: true,
            clickToFront: 600,
            fadeIn: 1000
        });
    } catch (e) {
        document.getElementById('canvas-wrapper').style.display = 'none';
    }
});

const wrapper = document.getElementById('canvas-wrapper');
const canvas = document.getElementById('skillCanvas');

// Only run parallax if it's not a touch device
if (window.innerWidth > 1024) {
    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Very subtle rotation
        const rotateX = -mouseY / 35; 
        const rotateY = mouseX / 35;
        
        canvas.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        canvas.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}

// Function to handle the scroll reveal
const revealOnScroll = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Target all experience cards
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach(card => observer.observe(card));
};

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', revealOnScroll);


document.addEventListener("DOMContentLoaded", () => {
    const cards = [...document.querySelectorAll(".project-card-stacked")];

    if (!cards.length) return;

    function resetCards() {
        cards.forEach(card => {
            card.classList.remove("active", "behind-1", "behind-2");
            card.style.opacity = "0";
        });
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const index = cards.indexOf(entry.target);
                resetCards();

                // Active card
                cards[index].classList.add("active");
                cards[index].style.opacity = "1";

                // Stack behind
                if (cards[index + 1]) {
                    cards[index + 1].classList.add("behind-1");
                    cards[index + 1].style.opacity = "0.8";
                }

                if (cards[index + 2]) {
                    cards[index + 2].classList.add("behind-2");
                    cards[index + 2].style.opacity = "0.6";
                }
            });
        },
        { threshold: 0.6 }
    );

    cards.forEach(card => observer.observe(card));
});


        // function toggleSidebar() {
        //     const sidebar = document.getElementById('mobileSidebar');
        //     sidebar.classList.toggle('active');
        //     document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
        // }
function toggleSidebar() {
    const sidebar = document.getElementById('mobileSidebar');
    sidebar.classList.toggle('active');
    
    // Toggle body scroll
    if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// AUTO-CLOSE LOGIC
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    const sidebar = document.getElementById('mobileSidebar');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Wait a tiny bit so the user feels the click before it closes
            setTimeout(() => {
                sidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 300); 
        });
    });
});