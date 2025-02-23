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