document.addEventListener('DOMContentLoaded', () => {
    const autotypeText = document.querySelector('.autotype-text');
    const cursor = document.querySelector('.cursor');
    const fullText = "Hey there! I'm Celestine, a passionate innovator on a mission to simplify lives with tech & medicine. Welcome to my digital space—stay, explore, and let’s build something amazing together! 💡✨";
    let index = 0;
    const typingSpeed = 20; // 30ms per character

    function type() {
        if (index < fullText.length) {
            autotypeText.textContent += fullText.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            cursor.classList.add('stopped'); // Stops cursor blinking
        }
    }

    setTimeout(type, 2000); // Starts typing after a 2s delay
});
