document.addEventListener('DOMContentLoaded', () => {
    const autotypeText = document.querySelector('.autotype-text');
    const cursor = document.querySelector('.cursor');
    const fullText = "Hey there! 🚀 I'm Celestine, a passionate innovator on a mission to simplify lives with tech & medicine. Welcome to my digital space—stay, explore, and let’s build something amazing together! 💡✨";
    let index = 0;
    const typingSpeed = 50; // Milliseconds per character

    function type() {
        if (index < fullText.length) {
            autotypeText.innerHTML += fullText.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            cursor.classList.add('solid');
        }
    }

    // Start typing after a 2-second delay to sync with fadeIn animation
    setTimeout(type, 2000);
});