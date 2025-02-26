document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.thoughts-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.thought-card');
    let scrollPosition = 0;
    let autoplayInterval = null;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Calculate card width including gap (20px as per CSS)
    const cardWidth = cards[0].offsetWidth + 20; // Gap is 20px from CSS
    const totalCards = cards.length;

    // Autoplay function for mobile only
    function startAutoplay() {
        if (isMobile && !autoplayInterval) {
            autoplayInterval = setInterval(() => {
                scrollPosition += cardWidth;
                if (scrollPosition >= (totalCards - 1) * cardWidth) {
                    scrollPosition = 0; // Loop back to start
                }
                carousel.scrollLeft = scrollPosition;
            }, 3000); // Autoplay every 3 seconds
        }
    }

    // Stop autoplay on interaction
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Navigation controls with proper alignment
    prevBtn.addEventListener('click', () => {
        stopAutoplay(); // Stop autoplay on manual navigation
        scrollPosition -= cardWidth;
        if (scrollPosition < 0) {
            scrollPosition = (totalCards - 1) * cardWidth; // Loop to last card
        }
        // Ensure smooth alignment with scroll-snap
        carousel.scrollLeft = scrollPosition;
        // Adjust to ensure the card aligns properly with scroll-snap
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
        // Ensure smooth alignment with scroll-snap
        carousel.scrollLeft = scrollPosition;
        // Adjust to ensure the card aligns properly with scroll-snap
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
        startAutoplay();
    }

    // Handle window resize (recheck mobile status)
    window.addEventListener('resize', () => {
        const newIsMobile = window.matchMedia('(max-width: 768px)').matches;
        if (newIsMobile && !isMobile) {
            // Switched to mobile, start autoplay
            isMobile = true;
            startAutoplay();
        } else if (!newIsMobile && isMobile) {
            // Switched to desktop, stop autoplay
            isMobile = false;
            stopAutoplay();
        }
    });

    // Ensure initial scroll position aligns correctly on mobile
    if (isMobile) {
        carousel.scrollLeft = 0; // Reset to start on mobile load
    }
});