// Quote Preloader Logic (Handled Entirely by JavaScript)
document.addEventListener('DOMContentLoaded', function() {
    // Prevent portfolio content from being visible initially
    document.body.style.overflow = 'hidden';
    
    // Create preloader container
    const quotePreloader = document.createElement('div');
    quotePreloader.id = 'quote-preloader';
    quotePreloader.style.position = 'fixed';
    quotePreloader.style.top = '0';
    quotePreloader.style.left = '0';
    quotePreloader.style.width = '100%';
    quotePreloader.style.height = '100%';
    quotePreloader.style.background = 'linear-gradient(45deg, #000000, #1a1a1a)'; // Matches --dark-gradient
    quotePreloader.style.zIndex = '9999'; // Highest z-index
    quotePreloader.style.display = 'flex';
    quotePreloader.style.justifyContent = 'center';
    quotePreloader.style.alignItems = 'center';
    quotePreloader.style.opacity = '1';
    quotePreloader.style.visibility = 'visible';
    quotePreloader.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';

    // Create preloader content container
    const quotePreloaderContent = document.createElement('div');
    quotePreloaderContent.style.textAlign = 'center';
    quotePreloaderContent.style.padding = '2rem';
    quotePreloaderContent.style.maxWidth = '90%';
    quotePreloaderContent.style.display = 'flex';
    quotePreloaderContent.style.justifyContent = 'center';
    quotePreloaderContent.style.alignItems = 'center';

    // Create quote text
    const quoteText = document.createElement('h1');
    quoteText.textContent = "Technology and medicine, united by vision, can heal the world—one algorithm at a time.";
    quoteText.style.fontFamily = '"Press Start 2P", cursive'; // Matches --fun-font
    quoteText.style.fontSize = '2.2rem';
    quoteText.style.lineHeight = '1.4';
    quoteText.style.background = 'linear-gradient(45deg, #00f3ff, #00ff88)'; // Matches --light-gradient
    quoteText.style.webkitBackgroundClip = 'text';
    quoteText.style.webkitTextFillColor = 'transparent';
    quoteText.style.textShadow = '0 0 10px #00f3ff, 0 0 20px #00f3ff, 0 0 30px rgba(0, 243, 255, 0.5)'; // Matches --neon-shadow
    quoteText.style.maxWidth = '800px';
    quoteText.style.margin = '0 auto';
    quoteText.style.opacity = '0'; // Starts hidden for animation
    quoteText.style.animation = 'fadeInQuote 1.5s ease-in-out forwards';

    // Define keyframes for quote animation
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes fadeInQuote {
            0% { opacity: 0; transform: translateY(20px); }
            50% { opacity: 1; transform: translateY(0); }
            100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
            #quote-preloader h1 {
                font-size: 1.8rem;
                max-width: 700px;
            }
        }

        @media (max-width: 768px) {
            #quote-preloader h1 {
                font-size: 1.5rem;
                max-width: 90%;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Append elements
    quotePreloaderContent.appendChild(quoteText);
    quotePreloader.appendChild(quotePreloaderContent);
    document.body.insertBefore(quotePreloader, document.body.firstChild);

    // Hide preloader after quote animation (1.5s) + additional delay (1s)
    setTimeout(function() {
        quotePreloader.style.opacity = '0';
        quotePreloader.style.visibility = 'hidden';
        quotePreloader.style.pointerEvents = 'none'; // Prevents interaction after hiding
        document.body.style.overflow = 'auto'; // Restore scrolling
        setTimeout(function() {
            quotePreloader.remove(); // Remove preloader from DOM
        }, 500); // Match transition duration
    }, 2500); // 1.5s animation + 1s delay = 2.5s total
});
