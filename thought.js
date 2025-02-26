document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.thoughts-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.thought-card');
    let currentIndex = 0;
    let autoplayInterval = null;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const cardWidth = cards[0].offsetWidth + 20; // Include 20px gap from CSS
    const totalCards = cards.length;

    // Smoothly slide to a specific index
    function slideToIndex(index) {
        currentIndex = (index + totalCards) % totalCards; // Ensure looping
        carousel.style.transition = 'transform 0.5s ease-in-out'; // Smooth sliding effect
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Reset transition after animation to maintain manual scrolling
        setTimeout(() => {
            carousel.style.transition = ''; // Remove transition for manual scrolling
        }, 500); // Match the transition duration
    }

    // Autoplay function for mobile with a futuristic, sliding effect
    function startAutoplay() {
        if (isMobile && !autoplayInterval) {
            autoplayInterval = setInterval(() => {
                slideToIndex(currentIndex + 1); // Slide to next card
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

    // Navigation controls with smooth sliding
    prevBtn.addEventListener('click', () => {
        stopAutoplay(); // Stop autoplay on manual navigation
        slideToIndex(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        stopAutoplay(); // Stop autoplay on manual navigation
        slideToIndex(currentIndex + 1);
    });

    // Pause autoplay on hover/touch (for mobile)
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('touchstart', stopAutoplay); // Pause on touch for mobile
    carousel.addEventListener('touchend', startAutoplay); // Resume after touch ends

    // Start autoplay on mobile load
    if (isMobile) {
        // Initialize carousel with transform for smooth sliding
        carousel.style.display = 'flex'; // Ensure flex display for transform
        carousel.style.transform = `translateX(0)`; // Start at the first card
        startAutoplay();
    }

    // Handle window resize (recheck mobile status)
    window.addEventListener('resize', () => {
        const newIsMobile = window.matchMedia('(max-width: 768px)').matches;
        if (newIsMobile && !isMobile) {
            // Switched to mobile, start autoplay
            isMobile = true;
            carousel.style.display = 'flex';
            carousel.style.transform = `translateX(0)`; // Reset position
            startAutoplay();
        } else if (!newIsMobile && isMobile) {
            // Switched to desktop, stop autoplay and reset
            isMobile = false;
            stopAutoplay();
            carousel.style.transform = ''; // Remove transform for desktop scrolling
            carousel.style.transition = ''; // Remove transition for desktop
        }
    });

    // Ensure manual scrolling works on desktop and mobile (after autoplay)
    carousel.addEventListener('scroll', () => {
        if (!isMobile) return; // Only adjust on mobile if needed
        stopAutoplay(); // Pause autoplay on manual scroll
        const scrollLeft = carousel.scrollLeft;
        currentIndex = Math.round(scrollLeft / cardWidth);
        setTimeout(startAutoplay, 3000); // Resume autoplay after 3 seconds
    });
});