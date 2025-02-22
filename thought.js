document.addEventListener('DOMContentLoaded', function() {
    // Toggle full content with enhanced UX
    const moreButtons = document.querySelectorAll('.more-btn');
    moreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling to parent .thought-card
            const card = this.closest('.thought-card');
            if (!card) {
                console.error('No parent .thought-card found for More button');
                return;
            }
            const fullContent = card.querySelector('.full-content');
            if (!fullContent) {
                console.error('No .full-content found in .thought-card');
                return;
            }
            if (fullContent.style.display === 'none' || fullContent.style.display === '') {
                fullContent.style.display = 'block';
                this.textContent = 'Collapse';
                fullContent.scrollTop = 0; // Scroll to top for better UX
            } else {
                fullContent.style.display = 'none';
                this.textContent = 'Expand';
            }
            // Prevent default scrolling behavior for better UX
            e.preventDefault();
        });
    });

    // Highlight active card and enable smooth scrolling with UX focus
    const carousel = document.querySelector('.thoughts-carousel');
    const cards = document.querySelectorAll('.thought-card');

    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Check if the click target is not a more-btn to avoid interference
            if (!e.target.classList.contains('more-btn')) {
                cards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                // Scroll to center with enhanced UX
                const cardRect = this.getBoundingClientRect();
                const carouselRect = carousel.getBoundingClientRect();
                const scrollLeft = carousel.scrollLeft + cardRect.left - carouselRect.left - (carouselRect.width - cardRect.width) / 2;
                carousel.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth',
                    block: 'nearest'
                });
                e.preventDefault();
            }
        });
    });

    // Initialize first card as active with UX focus
    if (cards.length > 0) {
        cards[0].classList.add('active');
        carousel.scrollLeft = 0; // Ensure first card is centered initially
    }

    // Add keyboard navigation for accessibility (UX/UI priority)
    carousel.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const activeCard = document.querySelector('.thought-card.active');
            if (activeCard) {
                const cardsArray = Array.from(cards);
                const currentIndex = cardsArray.indexOf(activeCard);
                let newIndex = currentIndex + (e.key === 'ArrowRight' ? 1 : -1);
                if (newIndex >= 0 && newIndex < cardsArray.length) {
                    cardsArray.forEach(c => c.classList.remove('active'));
                    cardsArray[newIndex].classList.add('active');
                    const newCardRect = cardsArray[newIndex].getBoundingClientRect();
                    const carouselRect = carousel.getBoundingClientRect();
                    const scrollLeft = carousel.scrollLeft + newCardRect.left - carouselRect.left - (carouselRect.width - newCardRect.width) / 2;
                    carousel.scrollTo({
                        left: scrollLeft,
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }
        }
    });
});