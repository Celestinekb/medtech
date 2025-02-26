document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.thoughts-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.thought-card');
    let scrollPosition = 0;
    let autoplayInterval = null;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const cardWidth = cards[0].offsetWidth + 20; // Include 20px gap from CSS
    const totalCards = cards.length;

    // Autoplay function for mobile with smooth scrolling
    function startAutoplay() {
        if (isMobile && !autoplayInterval) {
            autoplayInterval = setInterval(() => {
                scrollPosition += cardWidth;
                if (scrollPosition >= (totalCards - 1) * cardWidth) {
                    scrollPosition = 0; // Loop back to start
                }
                carousel.scrollLeft = scrollPosition;
                // Add a subtle neon glow effect during transition for a futuristic feel
                carousel.style.boxShadow = `0 0 20px ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()}, 0 0 40px ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim()}`;
                setTimeout(() => {
                    carousel.style.boxShadow = ''; // Reset glow after transition
                }, 500);
            }, 4000); // Autoplay every 4 seconds for a smooth, deliberate pace
        }
    }

    // Stop autoplay on interaction
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Navigation controls with smooth scrolling
    prevBtn.addEventListener('click', () => {
        stopAutoplay(); // Stop autoplay on manual navigation
        scrollPosition -= cardWidth;
        if (scrollPosition < 0) {
            scrollPosition = (totalCards - 1) * cardWidth; // Loop to last card
        }
        carousel.scrollLeft = scrollPosition;
        // Ensure alignment with scroll-snap
        setTimeout(() => {
            carousel.scrollLeft = scrollPosition; // Double-check alignment
        }, 100);
    });

    nextBtn.addEventListener('click', () => {
        stopAutoplay(); // Stop autoplay on manual navigation
        scrollPosition += cardWidth;
        if (scrollPosition >= totalCards * cardWidth) {
            scrollPosition = 0; // Loop back to first card
        }
        carousel.scrollLeft = scrollPosition;
        // Ensure alignment with scroll-snap
        setTimeout(() => {
            carousel.scrollLeft = scrollPosition; // Double-check alignment
        }, 100);
    });

    // Pause autoplay on hover/touch (for mobile)
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('touchstart', stopAutoplay); // Pause on touch for mobile
    carousel.addEventListener('touchend', startAutoplay); // Resume after touch ends

    // Start autoplay on mobile load
    if (isMobile) {
        carousel.scrollLeft = 0; // Reset to start on mobile load
        startAutoplay();
    }

    // Handle window resize (recheck mobile status)
    window.addEventListener('resize', () => {
        const newIsMobile = window.matchMedia('(max-width: 768px)').matches;
        if (newIsMobile && !isMobile) {
            // Switched to mobile, start autoplay
            isMobile = true;
            carousel.scrollLeft = 0; // Reset position
            startAutoplay();
        } else if (!newIsMobile && isMobile) {
            // Switched to desktop, stop autoplay
            isMobile = false;
            stopAutoplay();
            carousel.scrollLeft = 0; // Reset for desktop scrolling
        }
    });

    // Ensure manual scrolling works on desktop and mobile (after autoplay)
    carousel.addEventListener('scroll', () => {
        if (!isMobile) return; // Only adjust on mobile if needed
        stopAutoplay(); // Pause autoplay on manual scroll
        scrollPosition = carousel.scrollLeft;
        const currentIndex = Math.round(scrollPosition / cardWidth);
        scrollPosition = currentIndex * cardWidth; // Snap to nearest card
        setTimeout(() => {
            carousel.scrollLeft = scrollPosition; // Ensure proper alignment
            startAutoplay(); // Resume autoplay after 3 seconds
        }, 3000);
    });
});