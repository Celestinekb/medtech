document.addEventListener('DOMContentLoaded', () => {
    const visionPhrases = document.querySelectorAll('.vision-phrase');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    visionPhrases.forEach(phrase => {
        observer.observe(phrase);
    });
});