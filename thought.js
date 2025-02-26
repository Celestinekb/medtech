document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.thoughts-carousel');
    const cards = document.querySelectorAll('.thought-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let cardWidth = cards[0].offsetWidth + 20; // Include gap from CSS
    let currentIndex = 0;
    let currentTranslate = 0;
    let startX = 0;

    // Update carousel position
    function setPositionByIndex() {
        currentTranslate = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    }

    // Next button click
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            setPositionByIndex();
        }
    });

    // Previous button click
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            setPositionByIndex();
        }
    });

    // Swipe support for mobile
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        carousel.style.transition = 'none';
    });

    carousel.addEventListener('touchmove', (e) => {
        const diff = e.touches[0].clientX - startX;
        carousel.style.transform = `translateX(${currentTranslate + diff}px)`;
    });

    carousel.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (diff < -50 && currentIndex < cards.length - 1) {
            currentIndex++; // Swipe left
        } else if (diff > 50 && currentIndex > 0) {
            currentIndex--; // Swipe right
        }
        setPositionByIndex();
        carousel.style.transition = 'transform 0.5s ease';
    });

    // Adjust card width on resize
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + 20;
        setPositionByIndex();
    });

    // Set initial position
    setPositionByIndex();
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.thoughts-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.thought-card');
    let scrollPosition = 0;
    let autoplayInterval = null;
    const cardWidth = cards[0].offsetWidth + 20; // Include gap
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // Autoplay function for mobile only
    function startAutoplay() {
        if (isMobile && !autoplayInterval) {
            autoplayInterval = setInterval(() => {
                scrollPosition += cardWidth;
                if (scrollPosition >= carousel.scrollWidth - carousel.clientWidth) {
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

    // Navigation controls
    prevBtn.addEventListener('click', () => {
        stopAutoplay(); // Stop autoplay on manual navigation
        scrollPosition -= cardWidth;
        if (scrollPosition < 0) {
            scrollPosition = carousel.scrollWidth - carousel.clientWidth; // Loop to end
        }
        carousel.scrollLeft = scrollPosition;
    });

    nextBtn.addEventListener('click', () => {
        stopAutoplay(); // Stop autoplay on manual navigation
        scrollPosition += cardWidth;
        if (scrollPosition >= carousel.scrollWidth - carousel.clientWidth) {
            scrollPosition = 0; // Loop back to start
        }
        carousel.scrollLeft = scrollPosition;
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
});
