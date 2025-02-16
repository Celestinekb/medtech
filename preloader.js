// Quote Preloader Logic 
(function() {
    // Immediately hide all portfolio content
    document.documentElement.style.visibility = 'hidden'; // Hide entire HTML content
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Create preloader container
    const quotePreloader = document.createElement('div');
    quotePreloader.id = 'quote-preloader';
    quotePreloader.style.position = 'fixed';
    quotePreloader.style.top = '0';
    quotePreloader.style.left = '0';
    quotePreloader.style.width = '100%';
    quotePreloader.style.height = '100%';
    quotePreloader.style.background = '#ffffff'; // White background
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
    quoteText.textContent = "Healthy living starts with innovative thinking—where code meets care, possibilities are endless.";
    
    // Use portfolio's --text-font (Roboto Mono) via CSS custom property
    quoteText.style.fontFamily = 'var(--text-font, "Roboto Mono", monospace)'; // Fallback to Roboto Mono if --text-font is not defined
    quoteText.style.fontSize = '1.5rem'; // Matches typical body text size
    quoteText.style.lineHeight = '1.6';
    quoteText.style.color = '#000000'; // Black text for contrast on white background
    quoteText.style.maxWidth = '800px';
    quoteText.style.margin = '0 auto';
    quoteText.style.opacity = '1'; // No animation, loads immediately

    // Define responsive adjustments
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @media (max-width: 1024px) {
            #quote-preloader h1 {
                font-size: 1.3rem;
                max-width: 700px;
            }
        }

        @media (max-width: 768px) {
            #quote-preloader h1 {
                font-size: 1.1rem;
                max-width: 90%;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Append elements
    quotePreloaderContent.appendChild(quoteText);
    quotePreloader.appendChild(quotePreloaderContent);
    document.body.insertBefore(quotePreloader, document.body.firstChild);

    // Ensure preloader is visible immediately
    document.documentElement.style.visibility = 'visible'; // Show preloader immediately

    // Hide preloader after exactly 3 seconds
    setTimeout(function() {
        quotePreloader.style.opacity = '0';
        quotePreloader.style.visibility = 'hidden';
        quotePreloader.style.pointerEvents = 'none'; // Prevents interaction after hiding
        document.body.style.overflow = 'auto'; // Restore scrolling
        setTimeout(function() {
            quotePreloader.remove(); // Remove preloader from DOM
        }, 500); // Match transition duration
    }, 4000); // Display for exactly 3 seconds
})();
